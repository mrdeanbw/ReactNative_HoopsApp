import * as userActions from './user';
import * as interestsActions from './interests';
import * as usersActions from './users';
import * as eventsActions from './events';
import * as networkActions from './network';

export const startup = (email, password) => {
  return (dispatch) => {
    dispatch({type: 'STARTUP'});

    dispatch(userActions.registerWithStore());
    dispatch(interestsActions.load());
    dispatch(networkActions.registerWithStore());

    /**
     * For now, we download all user and event data.
     * This is a short term solution, eventually some kind of search engine will
     * be connected to for looking up this data.
     */
    dispatch(usersActions.getAll());
    dispatch(eventsActions.getAll());
  };
};
