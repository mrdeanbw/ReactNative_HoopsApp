
import {firebaseDb} from '../data/firebase';

const usersRef = firebaseDb.child('users');

export const load = (userIds) => {

  return dispatch => {

    userIds.map((id) => {
      usersRef.child(id).on('value', (snapshot) => {
        let value = snapshot.val();

        if(!value) {
          //User is not defined, probably a bad id was attempted
        }else{
          let user = {
            ...value,
            id: snapshot.key,
          };

          dispatch({type: 'USERS_LOADED', users: {[id]: user}});
        }
      });
    });

  };
};
