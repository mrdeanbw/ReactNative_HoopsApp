
import {firebaseDb} from '../data/firebase';
/*
 * Always watch for changes to interests
 */
export const load = () => {
  return dispatch => {
    firebaseDb.child('interests').on('value', (snapshot) => {
      let interests = snapshot.val();

      //Give each interest an id property
      for(let id in interests) {
        interests[id] = {
          ...interests[id],
          id,
        };
      }

      dispatch({
        type: 'INTERESTS_LOAD_ALL',
        interests,
      });
    });
  };
};
