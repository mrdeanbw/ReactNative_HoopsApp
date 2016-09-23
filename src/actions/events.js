
import {firebaseDb, firebaseStorage} from '../data/firebase';

import * as usersActions from './users';
import * as invitesActions from './invites';
import * as requestsActions from './requests';

const eventsRef = firebaseDb.child('events');

const listening = {};

/**
 * @param promises {Object} object of promises
 * @returns {Promise}
 *
 * Promise that returns an object of responses, or null in the case of an error
 */
const allPromises = (promises) => {
  let keys = Object.keys(promises);
  promises = keys.map((key) => {
    let promise = promises[key];
    return new Promise((resolve, reject) => {
      promise.then((result) => {
        resolve(result);
      }).catch((err) => {
        resolve(null);
      });
    });
  });

  return Promise.all(promises).then((results) => {
    //convert from results array to keyed object
    let obj = {};
    results.map((result, i) => {
      let key = keys[i];
      obj[key] = result;
    });
    return obj;
  });
};

export const load = (id) => {
  return (dispatch, getState) => {
    if(listening[id] === true){
      return;
    }
    listening[id] = true;
    let state = getState();
    eventsRef.child(id).on('value', (snapshot) => {
      let event = snapshot.val();

      let onLoaded = (event) => {
        dispatch({type: 'EVENTS_LOADED', events: {[id] : event}});
      }

      allPromises({
        image: firebaseStorage.ref(`events/${event.image}`).getDownloadURL(),
        cover: firebaseStorage.ref(`events/${event.coverImage}`).getDownloadURL(),
      }).then((values) => {
        event.imageSrc = values.image || undefined;
        event.coverSrc = values.cover || undefined;
        onLoaded(event);
      });

      //Load invites if I am the organizer
      if(event.organizer === state.user.uid) {
        if(event.invites) {
          for(let inviteId in event.invites) {
            dispatch(invitesActions.load(inviteId));
          }
        }
        if(event.requests) {
          for(let requestId in event.requests) {
            dispatch(requestsActions.load(requestId));
          }
        }
      } else {
        if(event.organizer) {
          dispatch(usersActions.load(event.organizer));
        }
      }
    });
  };
};

export const remove = (id) => {
  return {
    type: 'EVENT_REMOVED',
    id,
  };
};

export const save = (eventData) => {
  return (dispatch, getState) => {
    let ref = eventsRef.push();
    let newKey = ref.key;
    let uid = getState().user.uid;

    firebaseDb.update({
      [`events/${newKey}`]: {
        ...eventData,
        id: newKey,
      },
      [`users/${uid}/organizing/${newKey}`]: true,
    }, (err) => {
      if(err) {
        dispatch({
          type: 'EVENT_ADD_ERROR',
          err,
        });
      } else {
        dispatch({
          type: 'EVENT_ADDED',
          eventData,
        });
      }
    });
  };
};

export const inviteUsers = (userIds, eventId) => {
  return dispatch => {
    userIds.forEach((userId) => {
      dispatch(invitesActions.create(userId, eventId));
    });

  };
};
