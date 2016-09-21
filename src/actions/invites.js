
import {firebaseDb} from '../data/firebase';

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

export const load = (ids) => {
  return dispatch => {
    ids.forEach(id => {
      firebaseDb.child(`invites/${id}`).on('value', (snapshot) => {
        dispatch({
          type: 'INVITES_LOADED',
          invites: {
            [id]: snapshot.val()
          },
        });
      });
    });
  };
};
