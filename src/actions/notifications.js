
import {firebaseDb} from '../data/firebase';

export const load = (id) => {
  return dispatch => {
    firebaseDb.child(`notifications/${id}`).on('value', (snapshot) => {
      dispatch({
        type: 'NOTIFICATION_LOADED',
        notifications: {
          [id]: {
            ...snapshot.val(),
            id,
          },
        },
      });
    });
  };
};
