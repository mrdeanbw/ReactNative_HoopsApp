import firebase, {firebaseDb} from '../data/firebase';

import * as emailAuth from '../data/auth/email';
import * as facebookAuth from '../data/auth/facebook';

import * as eventsActions from './events';
import * as usersActions from './users';
import * as invitesActions from './invites';
import * as requestsActions from './requests';
import * as notificationsActions from './notifications';
import * as navigationActions from './navigation';

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch({type: 'USER_SIGN_IN'});

    emailAuth.signIn(email, password)
      .then((user) => {
        dispatch(signInSuccess('email'));
      }).catch((err) => {
        dispatch(signInFailure(err));
      });
  };
};

/**
 * @param method {String} 'facebook' or 'email'
 */
export const signInSuccess = (method) => {
  return dispatch => {
    let uid = firebase.auth().currentUser.uid;
    dispatch(listenToUser());

    dispatch({
      type: 'USER_SIGN_IN_SUCCESS',
      uid,
      method,
    });
  };
};

export const signInFailure = (err) => ({
  type: 'USER_SIGN_IN_FAILURE',
  err,
});

/**
 * @param email {String} - User's email address
 * @param password {String} - User's password
 * @param extraData {Object} - Object of extra data to store against the new user
 */
export const signUp = (email, password, extraData) => {
  return (dispatch) => {
    dispatch({type: 'USER_SIGN_UP'});

    emailAuth.signUp(email, password)
      .then((user) => {
        savePersonalData({
          ...extraData,
          dob: new Date(extraData.dob).valueOf(), //convert date to epoch timestamp
          email,
        }, (err) => {
          if(err) {
            dispatch(signUpFailure(err));
          }else {
            dispatch(signUpSuccess('email'));
          }
        });
      });
  };
};

const savePersonalData = (data, callback) => {
  let uid = firebase.auth().currentUser.uid;

  //nullify undefined keys
  data = {
    name: null,
    username: null,
    gender: null,
    dob: null,
    email: null,
    phone: null,
    city: null,

    ...data,
  };

  firebaseDb.update({
    [`users/${uid}/publicProfile`]: {
      name: data.name,
      username: data.username,
      gender: data.gender,
      city: data.city,
    },
    [`users/${uid}/restrictedProfile`]: {
      dob: data.dob,
    },
    [`users/${uid}/contactInfo`]: {
      email: data.email,
      phone: data.phone,
    },
    [`usernames/${data.username}`]: uid, //for uniqueness validation
  }, callback);
};

export const signUpSuccess = (method) => {
  return signInSuccess(method);
};

export const signUpFailure = (err) => ({
  type: 'USER_SIGN_UP_FAILURE',
  err,
});

export const facebookSignUp = () => {
  return dispatch => {
    facebookAuth.signIn().then((user) => {
      return facebookAuth.getUserData();
    }).then((facebookUser) => {
      dispatch({
        type: 'FACEBOOK_USER_DATA',
        facebookUser,
      });
      dispatch(signUpSuccess('facebook'));
    }).catch((err) => {
      dispatch(signUpFailure(err));
    });
  };
};
export const facebookSignIn = facebookSignUp;

export const facebookSaveExtra = (extraData) => {
  return dispatch => {
    savePersonalData({
      ...extraData,
      dob: new Date(extraData.dob).valueOf(),
    }, (err) => {
      if(err) {
        dispatch({
          type: 'FACEBOOK_EXTRA_DATA_ERROR',
          err,
        });
      } else {
        dispatch({
          type: 'FACEBOOK_EXTRA_DATA_SAVED',
        });
        dispatch(navigationActions.reset({key: 'selectMode'}));
      }
    });
  };
};

/**
 * Log out the current user session
 */
export const logOut = () => {
  return dispatch => {
    firebase.auth().signOut().then(() => {
      dispatch({
        type: 'USER_LOGGED_OUT',
      });
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

export const toggleMode = () => {
  return (dispatch, getState) => {
    let currentMode = getState().user.mode;
    let nextMode = currentMode === 'ORGANIZE' ? 'PARTICIPATE' : 'ORGANIZE';
    dispatch(setMode(nextMode));
  };
};

/*
 * Set the user's availability
 */
export const setAvailability = (value) => {
  return (dispatch, getState) => {
    //Update local state first
    dispatch({
      type: 'USER_SET_AVAILABILITY',
      value,
    });

    //Update the database
    firebaseDb.child(`users/${getState().user.uid}/availability`).set(value);
  };
};

const listenToUser = () => {
  return (dispatch, getState) => {
    let uid = firebase.auth().currentUser.uid;

    firebaseDb.child(`users/${uid}`).on('value', (snapshot) => {
      let user = snapshot.val() || {};

      dispatch({
        type: 'USER_CHANGE',
        user,
      });

      let state = getState();
      let nav = state.navigation;
      if(!state.user.username) {
        //There registration isn't complete.
        if(nav.routes[nav.index].key !== 'signupFacebookExtra') {
          dispatch(navigationActions.reset({key: 'signupFacebookExtra'}));
          return;
        }
      }

      if(user.organizing) {
        for(let id in user.organizing) {
          dispatch(eventsActions.load(id));
        }
      }
      if(user.friends) {
        for(let id in user.friends) {
          dispatch(usersActions.load(id));
        }
      }
      if(user.invites) {
        for(let id in user.invites) {
          dispatch(invitesActions.load(id));
        }
      }
      if(user.requests) {
        for(let id in user.requests) {
          dispatch(requestsActions.load(id));
        }
      }
      if(user.friendRequests) {
        for(let id in user.friendRequests) {
          dispatch(usersActions.loadFriendRequest(id));
        }
      }
    });

    firebaseDb.child(`userNotifications/${uid}`).on('child_added', (snapshot) => {
      dispatch(notificationsActions.load(snapshot.key));
    });
  };
};

export const registerWithStore = (store) => {
  /*
   * Listen to firebase auth changes (e.g when re-signing in a user saved locally)
   * and dispatch an event so that stores can react to it
   */
  firebase.auth().onAuthStateChanged((user) => {
    //There is a bug where errors in this handler are silently swallowed. Be careful.
    if(user) {
      store.dispatch({type: 'FIREBASE_AUTH_INIT', uid: user.uid});
      store.dispatch(listenToUser());
      store.dispatch(navigationActions.reset({key: 'selectMode'}));
    }else{
      store.dispatch({type: 'FIREBASE_AUTH_INIT', uid: null});
    }
  }, error => {
    console.warn(error); //eslint-disable-line no-console
  });
};

/**
 * removeFriend is instant. Adding a friend has to be via a friend-request
 * which can be found in actions/users.js#sendFriendRequests(ids)
 */
export const removeFriend = (user) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid;
    firebaseDb.update({
      [`users/${uid}/friends/${user.id}`]: null,
      [`users/${user.id}/friends/${uid}`]: null,
    }, (err) => {
      if(err) {
        dispatch({
          type: 'FRIEND_REMOVE_ERROR',
          err,
        });
      } else {
        dispatch({
          type: 'FRIEND_REMOVE',
          id: user.id,
        });
      }
    });
  };
};
