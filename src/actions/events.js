
import {firebaseDb} from '../data/firebase';

import * as usersActions from './users';

const eventsRef = firebaseDb.child('events');

export const load = (id) => {
  return (dispatch) => {
    eventsRef.child(id).on('value', (snapshot) => {
      let event = snapshot.val();
      dispatch({type: 'EVENTS_LOADED', events: {[id] : event}});

      let userIds = event.invites.map((invite) => {
        return invite.user;
      });
      dispatch(usersActions.loadMany(userIds));
    });
  };
};

export const remove = (id) => {
  return {
    type: 'EVENT_REMOVED',
    id,
  };
};
