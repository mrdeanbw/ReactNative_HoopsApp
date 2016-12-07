
import {firebaseDb} from '../data/firebase';
import DBHelper from '../data/database-helper';
const database = DBHelper('invites');

import * as eventsActions from './events';
import * as usersActions from './users';
import * as paymentsActions from './payments';

const inviteRef = firebaseDb.child('invites');

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

export const removeInvite = (invite) => {
  return dispatch => {
    firebaseDb.child(`events/${invite.eventId}/invites/${invite.id}`).remove();
    firebaseDb.child(`users/${invite.userId}/invites/${invite.id}`).remove();

    // Deleting an object that has a listener breaks
    database.removeListeners(`invites/${invite.id}`);
    firebaseDb.child(`invites/${invite.id}`).remove();  
  };
};

export const load = (id) => {
  return dispatch => {
    database.addListener(`invites/${id}`, 'value', (snapshot) => {
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

export const markSeen = (invites) => {
  return dispatch => {
    let update = {};
    invites.forEach(invite => {
      update[`invites/${invite.id}/seen`] = true;
    });
    firebaseDb.update(update);
  };
};