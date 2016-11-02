
import {firebaseDb, firebaseStorage, uploadImage} from '../data/firebase';

import * as usersActions from './users';
import * as invitesActions from './invites';
import * as requestsActions from './requests';
import * as paymentsActions from './payments';
import * as notificationsActions from './notifications';

import {getPlace} from '../data/google-places';

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

export const loadAddress = (event) => {
  return dispatch => {
    let googlePlaceId = event.addressGooglePlaceId;
    if(!googlePlaceId){
      return;
    }

    dispatch({type: 'EVENTS_GOOGLE_PLACE_START', id: event.id});

    getPlace(googlePlaceId).then(result => {
      result = result.result;
      dispatch({type: 'EVENTS_GOOGLE_PLACE_SUCCESS', id: event.id, result});
    }).catch(err => {
      dispatch({type: 'EVENTS_GOOGLE_PLACE_ERROR', id: event.id, err});
    });
  };
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
      if(!event) {
        return;
      }

      let onLoaded = (event) => {
        dispatch(loadAddress(event));
        dispatch({type: 'EVENTS_LOADED', events: {[id] : event}});
      };

      /*
       * Other images can be added to this `promises` object. Then the allPromises
       * utility will fetch all of them.
       */
      let promises = {};
      if(event.image) {
        promises.image = firebaseStorage.ref(event.image).getDownloadURL();
      }

      allPromises(promises).then((values) => {
        event.imageSrc = values.image || undefined;
        onLoaded(event);
      });

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

      //Load organizer if it is not me
      if(event.organizer !== state.user.uid) {
        dispatch(usersActions.load(event.organizer));
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

export const create = (eventData) => {
  return (dispatch, getState) => {
    let ref = eventsRef.push();
    let newKey = ref.key;
    let uid = getState().user.uid;

    var chain = [];
    if(eventData.picture) {
      //upload images first:
      chain.push(uploadImage(eventData.picture, `events/${newKey}/main.jpeg`));
    } else {
      chain.push(null);
    }

    if(eventData.addressGooglePlaceId) {
      chain.push(
        getPlace(eventData.addressGooglePlaceId).then(result => {
          return result.result && result.result.geometry;
        })
      );
    }else{
      chain.push(null);
    }

    Promise.all(chain).then((result) => {
      let imageRef = result[0] ? result[0].ref : null;
      let coords = result[1] ? result[1].location : null;

      eventData = {
        ...eventData,
        //Replace the original eventData.image with our firebase reference
        image: imageRef,
        organizer: uid,
        id: newKey,
      };

      if(coords) {
        eventData.addressCoords = {
          lat: coords.lat,
          lon: coords.lng, //GooglePlaces uses `lng`, but elasticsearch needs `lon`
        };
      }

      firebaseDb.update({
        [`events/${newKey}`]: eventData,
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
          dispatch(notificationsActions.scheduleDeadlineAlert({
            ...eventData,
          }));
        }
      });

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

export const join = (eventId) => {
  return (dispatch, getState) => {
    let state = getState();
    let event = state.events.eventsById[eventId];

    if(event.entryFee === 0) {
      dispatch(requestJoin(event));
    } else {
      dispatch(paymentsActions.pay(event));
    }
  };
};

export const requestJoin = (event) => {
  return (dispatch, getState) => {
    if(event.entryFee !== 0) {
      throw new Error('App cannot create a request to join a paid event. The payment server must do this');
    }

    let state = getState();
    let uid = state.user.uid;

    let requestRef = firebaseDb.child('requests').push();
    let requestKey = requestRef.key;

    firebaseDb.update({
      [`events/${event.id}/requests/${requestKey}`]: true,
      [`users/${uid}/requests/${requestKey}`]: true,
      [`requests/${requestKey}`]: {
        eventId: event.id,
        userId: uid,
        status: event.privacy === 'public' ? 'confirmed' : 'pending',
        date: new Date(),
      }
    }, (err) => {
      if(err) {
        dispatch({
          type: 'EVENT_JOIN_ERROR',
          err,
        });
      } else {
        dispatch({
          type: 'EVENT_JOINED',
        });
      }
    });
  };
};

/**
 * Update either the request or the invite status
 */
export const quit = (eventId) => {
  return (dispatch, getState) => {
    let state = getState();
    let uid = state.user.uid;

    //Look for requests matching this event
    let request = Object.keys(state.user.requests).map(requestId => {
      return state.requests.requestsById[requestId];
    }).find(requestObj => requestObj.eventId === eventId);

    //Look for invites matching this event
    let invite = Object.keys(state.user.invites).map(inviteId => {
      return state.invites.invitesById[inviteId];
    }).find(inviteObj => inviteObj.eventId === eventId);

    let resultHandler = (err) => {
      if(err) {
        dispatch({
          type: 'EVENT_QUIT_ERROR',
          err,
        });
      }else{
        dispatch({
          type: 'EVENT_QUIT',
          eventId,
        });
      }
    };

    if(request) {

      //Delete the request, N.B we will have no record of it ever existing
      firebaseDb.update({
        [`requests/${request.id}`]: null,
        [`users/${uid}/requests/${request.id}`]: null,
        [`events/${eventId}/requests/${request.id}`]: null,
      }).then(resultHandler);

    } else if (invite) {

      //Set the invite status to 'rejected'
      firebaseDb.update({
        [`invites/${invite.id}/status`]: 'rejected',
      }).then(resultHandler);

    } else {
      throw new Error(`User ${uid} has no requests or invites for event ${eventId}`);
    }
  };
};

export const save = (eventId) => {
  return (dispatch, getState) => {
    let state = getState();
    let uid = state.user.uid;
    firebaseDb.update({
      [`users/${uid}/savedEvents/${eventId}`]: true,
    });
  };
};

export const unsave = (eventId) => {
  return (dispatch, getState) => {
    let state = getState();
    let uid = state.user.uid;
    firebaseDb.update({
      [`users/${uid}/savedEvents/${eventId}`]: null,
    });
  };
};

export const getAll = () => {
  return dispatch => {
    firebaseDb.child(`events`).on('value', snapshot => {
      dispatch({
        type: 'EVENTS_LOAD_ALL',
        events: snapshot.val(),
      });
    });
  };
};
