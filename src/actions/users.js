
import {firebaseDb} from '../data/firebase';

const usersRef = firebaseDb.child('users');

export const load = (id) => {
  return dispatch => {
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
  };
};

export const loadMany = (userIds) => {

  return dispatch => {

    userIds.map((id) => {
      dispatch(load(id));
    });

  };
};
