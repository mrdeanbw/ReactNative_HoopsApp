
import {firebaseDb} from './firebase';

import * as actions from '../actions';

export const startAll = (dispatch) => {
  firebaseDb.child('events').on('value', (snapshot) => {
    dispatch(actions.events.valueChange(snapshot.val()));
  });
};
