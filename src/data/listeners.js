
import {firebaseDb} from './firebase';

import * as actions from '../actions';

export const startAll = (dispatch) => {


  firebaseDb.child('events').on('value', (snapshot) => {
    let events = snapshot.val();
    dispatch(actions.events.valueChange(events));

    for(let id in events) {
      let event = events[id];
      if(event.invites) {
        //TODO listen to users of events
      }
    }
  });
};
