
import {firebaseDb} from '../data/firebase';

import * as eventsActions from './events';
import * as usersActions from './users';

const inviteRef = firebaseDb.child('invites');

export const create = (userId, eventId) => {
  return dispatch => {
    let ref = inviteRef.push();
    let inviteKey = ref.key;
    let inviteData =  {
      userId,
      eventId,
      status: "pending",
      date: new Date(),
    };

    firebaseDb.update({
      [`invites/${inviteKey}`]: inviteData,
      [`events/${eventId}/invites/${inviteKey}`]: true,
      [`users/${userId}/invites/${inviteKey}`]: true,
    }, (err) => {
      if(err) {
        dispatch({
          type: 'INVITE_ADD_ERROR',
          err,
        });
      } else {
        dispatch({
          type: 'INVITE_ADDED',
          inviteData,
        });
      }
    });
  };
};

export const load = (id) => {
  return (dispatch, getState) => {
    let state = getState();
    firebaseDb.child(`invites/${id}`).on('value', (snapshot) => {
      let invite = snapshot.val();
      /**
       * TODO: what if we have the event in local storage,
       * but it's not being listened to with firebaseDb.on() ?
       */
      if(invite.eventId && !state.events.eventsById[invite.eventId]) {
        dispatch(eventsActions.load(invite.eventId));
      }
      if(invite.userId) {
        dispatch(usersActions.load(invite.userId));
      }

      dispatch({
        type: 'INVITES_LOADED',
        invites: {
          [id]: {
            ...snapshot.val(),
            id,
          },
        },
      });
    });
  };
};

export const accept = (invite) => {
  return (dispatch, getState) => {
    let state = getState();
    let uid = state.user.uid;
    firebaseDb.update({
      [`invites/${invite.id}/status`]: 'confirmed',
      [`users/${uid}/participating/${invite.eventId}`]: true,
    });
  };
};

export const decline = (invite) => {
  return (dispatch, getState) => {
    let state = getState();
    let uid = state.user.uid;
    firebaseDb.update({
      [`invites/${invite.id}/status`]: 'rejected',
      [`users/${uid}/participating/${invite.eventId}`]: null,
    });
  };
};
