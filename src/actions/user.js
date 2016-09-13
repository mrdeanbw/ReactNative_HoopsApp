
import firebase from '../data/firebase';

import * as emailAuth from '../data/auth/email';
import * as facebookAuth from '../data/auth/facebook';
import * as userDb from '../data/user';

import * as eventsActions from './events';

export const signIn = (email, password) => {
  let uid;
  return (dispatch) => {
    dispatch({type: 'USER_SIGN_IN'});

    emailAuth.signIn(email, password)
      .then((user) => {
        uid = user.uid;
        return userDb.read();
      }).then((userData) => {
        let user = {
          uid,
          extra: userData,
        };
        dispatch(signInSuccess(user));
      }).catch((err) => {
        dispatch(signInFailure(err));
      });
  };
};

/**
 * @param user {Object}
 * @param user.uid {String} user id
 * @param user.extra {Object} additional user data such as email, date-of-birth...
 */
export const signInSuccess = (user) => {
  return dispatch => {
    listenToEvents()(dispatch);

    dispatch({
      type: 'USER_SIGN_IN_SUCCESS',
      uid: user.uid,
      extra: user.extra,
    });
  };
};

export const signInFailure = (err) => ({
  type: 'USER_SIGN_IN_FAILURE',
  err,
});

export const facebookSignIn = () => {
  let uid;
  return dispatch => {
    facebookAuth.signIn()
      .then((user) => {
        uid = user.uid;
        return userDb.read();
      }).then((userData) => {
        let user = {
          uid,
          extra: userData,
        };
        dispatch(signInSuccess(user));
      }).catch((err) => {
        dispatch(signInFailure(err));
      });
  };
};

/**
 * @param email {String} - User's email address
 * @param password {String} - User's password
 * @param extraData {Object} - Object of extra data to store against the new user
 */
export const signUp = (email, password, extraData) => {
  let uid;
  return (dispatch) => {
    dispatch({type: 'USER_SIGN_UP'});

    emailAuth.signUp(email, password)
      .then((user) => {
        uid = user.uid;
        extraData = {
          ...extraData,
          email,
        };
        return userDb.write(extraData);
      }).then((userData) => {
        let user = {
          uid,
          extra: userData,
        };
        dispatch(signUpSuccess(user));
      }).catch((err) => {
        dispatch(signUpFailure(err));
      });
  };
};

export const signUpSuccess = (user) => {
  return signInSuccess(user);
};

export const signUpFailure = (err) => ({
  type: 'USER_SIGN_UP_FAILURE',
  err,
});

export const facebookSignUp = () => {
  let uid;
  return dispatch => {
    facebookAuth.signIn().then((user) => {
      uid = user.uid;
      return facebookAuth.getUserData();
    }).then((facebookUser) => {
      return userDb.write({
        name: facebookUser.name,
        email: facebookUser.email,
        gender: facebookUser.gender,
        dob: facebookUser.birthday,
      });
    }).then((userData) => {
      //TODO `facebookUser` contains personal data extracted from facebook, save it.
      let user = {
        uid,
        extra: userData,
      };
      dispatch(signUpSuccess(user));
    }).catch((err) => {
      dispatch(signUpFailure(err));
    });
  };
};


/*
 * Set the UI mode to ORGANIZE or PARTICIPATE
 */
export const setMode = (mode) => ({
  type: 'SET_UI_MODE',
  mode,
});

const listenToEvents = () => {
  return dispatch => {
    userDb.listenToOrganizer((id) => {
      dispatch({
        type: 'EVENT_ADD_ORGANIZER',
        id,
      });
      dispatch(eventsActions.load(id));
    }, (id) => {
      dispatch({
        type: 'EVENT_REMOVE_ORGANIZER',
        id,
      });
    });

    userDb.listenToParticipant((id) => {
      dispatch({
        type: 'EVENT_ADD_PARTICIPANT',
        id,
      });
      dispatch(eventsActions.load(id));
    }, (id) => {
      dispatch({
        type: 'EVENT_REMOVE_PARTICIPANT',
        id,
      });
    });
  };
};

export const registerWithStore = (store) => {
  /*
   * Listen to firebase auth changes (e.g when re-signing in a user saved locally)
   * and dispatch an event so that stores can react to it
   */
  let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //There is a bug where errors in this handler are silently swallowed. Be careful.
    if(user) {
      store.dispatch({type: 'FIREBASE_AUTH_INIT', uid: user.uid});
      listenToEvents()(store.dispatch);
    }else{
      store.dispatch({type: 'FIREBASE_AUTH_INIT', uid: null});
    }

    //Only listen to the first auth state
    unsubscribe();
  }, error => {
    console.warn(error);
  });

};
