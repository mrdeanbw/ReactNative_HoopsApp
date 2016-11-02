
import {firebaseDb} from '../data/firebase';

import * as eventsActions from './events';
import * as usersActions from './users';
import * as paymentsActions from './payments';

const inviteRef = firebaseDb.child('invites');

const listening = {};

export const create = (userId, eventId) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid;
    let ref = inviteRef.push();
    let inviteKey = ref.key;
    let inviteData =  {
      userId,
      fromId: uid,
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
  return dispatch => {
    if(listening[id] === true){
      return;
    }
    listening[id] = true;
    firebaseDb.child(`invites/${id}`).on('value', (snapshot) => {
      let invite = snapshot.val();
      /**
       * TODO: what if we have the event in local storage,
       * but it's not being listened to with firebaseDb.on() ?
       */
      if(invite.eventId) {
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
    if(invite.event.entryFee === 0 || invite.event.paymentMethod !== 'app') {
      firebaseDb.update({
        [`invites/${invite.id}/status`]: 'confirmed',
      });
    } else {
      dispatch(paymentsActions.pay(invite.event, invite));
    }
  };
};

export const decline = (invite) => {
  return dispatch => {
    firebaseDb.update({
      [`invites/${invite.id}/status`]: 'rejected',
    });
  };
};
