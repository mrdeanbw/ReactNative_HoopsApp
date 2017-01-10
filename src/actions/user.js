import firebase, {firebaseDb, firebaseStorage, uploadImage} from '../data/firebase';
import DBHelper, {clearAllListeners} from '../data/database-helper';
const database = DBHelper('user');

import * as emailAuth from '../data/auth/email';
import * as facebookAuth from '../data/auth/facebook';
import {getPlace} from '../data/google-places';

import * as eventsActions from './events';
import * as usersActions from './users';
import * as invitesActions from './invites';
import * as requestsActions from './requests';
import * as notificationsActions from './notifications';
import * as navigationActions from './navigation';

import FCM from 'react-native-fcm';

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

export const signInFormEdit = () => ({
  type: 'USER_SIGN_IN_FORM_EDIT',
});

/**
 * @param method {String} 'facebook' or 'email'
 */
export const signInSuccess = (method) => {
  let uid = firebase.auth().currentUser.uid;
  return dispatch => {
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
      }).catch(err => {
        dispatch(signUpFailure(err));
      });
  };
};

const savePersonalData = (data, callback) => {
  let uid = firebase.auth().currentUser.uid;

  let firebaseSave = (data) => {
    //nullify undefined keys
    data = {
      name: null,
      username: null,
      gender: null,
      dob: null,
      email: null,
      phone: null,
      city: null,
      cityGooglePlaceId: null,
      cityCoords: null,
      image: null,
      facebookImageSrc: null,

      ...data,
    };

    uploadImage(data.image, `users/${uid}/${new Date().toISOString()}`)
      .then((response) => {

        firebaseDb.update({
          [`users/${uid}/publicProfile`]: {
            image: response ? response.ref : null,
            facebookImageSrc: data.facebookImageSrc,
            name: data.name,
            username: data.username,
            gender: data.gender,
            city: data.city,
            cityGooglePlaceId: data.cityGooglePlaceId,
            cityCoords: data.cityCoords,
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
      });
  };

  //Add city coordinates by looking up data.cityGooglePlaceId
  getPlace(data.cityGooglePlaceId).then(result => {
    if(result.result && result.result.geometry) {
      data.cityCoords = result.result.geometry.location;
    }

    //Now save to firebase
    firebaseSave(data);
  }).catch(err => {
    //something went wrong getting the coordinates, still save the user.
    console.warn(err); //eslint-disable-line no-console
    firebaseSave(data);
  });


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
    dispatch({type: 'USER_SIGN_UP'});
    //We need to make sure that the USER_SIGN_UP action is sent before
    //any of facebook SDK's native views intercept our react-native app.
    //setTimeout is ugly but does the job here.
    setTimeout(() => {
      facebookAuth.signIn().then((user) => {
        dispatch(signUpSuccess('facebook'));
      }).catch((err) => {
        dispatch(signUpFailure(err));
      });
    }, 300);
  };
};

export const facebookSignIn = () => {
  return dispatch => {
    dispatch({type: 'USER_SIGN_IN'});
    //We need to make sure that the USER_SIGN_IN action is sent before
    //any of facebook SDK's native views intercept our react-native app.
    //setTimeout is ugly but does the job here.
    setTimeout(() => {
      facebookAuth.signIn().then((user) => {
        dispatch(signInSuccess('facebook'));
      }).catch((err) => {
        dispatch(signInFailure(err));
      });
    }, 300);
  };
};

export const loadFacebookData = () => {
  return dispatch => {
    dispatch({
      type: 'FACEBOOK_USER_DATA_START',
    });
    facebookAuth.getUserData().then(facebookUser => {
      dispatch({
        type: 'FACEBOOK_USER_DATA',
        facebookUser,
      });
    }).catch(err => {
      console.warn(err); //eslint-disable-line no-console
    });
  };
};

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
      clearAllListeners();
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

export const setInterests = (interests) => {
  return dispatch => {
    let uid = firebase.auth().currentUser.uid;
    firebaseDb.child(`users/${uid}/publicProfile/interests`).set(interests);
  };
};

export const updateProfile = (data) => {
  return (dispatch, getState) => {
    let uid = firebase.auth().currentUser.uid;

    uploadImage(data.image, `users/${uid}/${new Date().toISOString()}`).then((response) => {
      let imageRef = response ? response.ref : null;

      let update = {};
      if(data.name) {
        update[`users/${uid}/publicProfile/name`] = data.name;
      }
      if(imageRef) {
        update[`users/${uid}/publicProfile/image`] = imageRef;
      }
      if(data.gender) {
        update[`users/${uid}/publicProfile/gender`] = data.gender;
      }
      if(data.city) {
        update[`users/${uid}/publicProfile/city`] = data.city;
      }
      if(data.cityGooglePlaceId) {
        update[`users/${uid}/publicProfile/cityGooglePlaceId`] = data.cityGooglePlaceId;
      }
      if(data.interests) {
        update[`users/${uid}/publicProfile/interests`] = data.interests;
      }
      if(data.dob) {
        update[`users/${uid}/restrictedProfile/dob`] = new Date(data.dob).valueOf();
      }

      firebaseDb.update(update);
    });
  };
};

/*
 * Set the user's availability
 */
export const toggleAvailability = () => {
  return (dispatch, getState) => {
    let value = !getState().user.availability;

    //Update local state first
    dispatch({
      type: 'USER_SET_AVAILABILITY',
      value,
    });

    //Update the database
    let uid = getState().user.uid;
    firebaseDb.child(`users/${uid}/publicProfile/availability`).set(value);
  };
};

const listenToUser = () => {
  return (dispatch, getState) => {
    let uid = firebase.auth().currentUser.uid;

    let previousUser = {};
    let firstLoad = true;
    database.addListener(`users/${uid}`, 'value', (snapshot) => {
      let user = snapshot.val() || {};

      let state = getState();

      //On first load, the store needs to stop showing the sign in loading icon
      if(firstLoad) {
        dispatch({type: 'USER_DATA_FIRST_LOAD'});
        firstLoad = false;
      }

      var previousName = previousUser.publicProfile ? previousUser.publicProfile.name : null;
      var name = user.publicProfile ? user.publicProfile.name : null;
      if(!previousName) {
        //Only do routing when the name wasn't previously set
        //It may now be, or not.
        if(!name) {
          //Name isn't defined. We need to ask for extra data
          dispatch(navigationActions.reset({key: 'signupFacebookExtra'}));
        } else if(Object.keys(user.publicProfile.interests || {}).length === 0) {
          //Go to interests selection
          dispatch(navigationActions.reset({key: 'selectInterests'}));
        } else if(!state.user.mode) {
          //Go to select-mode page
          dispatch(navigationActions.reset({key: 'selectMode'}));
        }
      }

      //If we have just got a name for the first time, init notifications
      if(!previousName && name) {
        dispatch(FCMInit());
      }

      var newImage = user.publicProfile ? user.publicProfile.image : null;
      if(newImage && newImage !== state.user.image) {
        //If there is an image, and we don't already know
        firebaseStorage.ref(user.publicProfile.image).getDownloadURL().then(uri => {
          dispatch({
            type: 'USER_IMAGE_CHANGE',
            imageSrc: uri,
            error: null,
          });
        }).catch(err => {
          dispatch({
            type: 'USER_IMAGE_CHANGE',
            imageSrc: undefined,
            error: err,
          });
        });
      } else if(user.publicProfile && user.publicProfile.facebookImageSrc) {
        dispatch({
          type: 'USER_IMAGE_CHANGE',
          imageSrc: user.publicProfile.facebookImageSrc,
        });
      }

      dispatch({
        type: 'USER_CHANGE',
        user,
      });

      /*
       * Load connected resources
       */
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
      if(user.savedEvents) {
        for(let id in user.savedEvents) {
          dispatch(eventsActions.load(id));
        }
      }

      previousUser = {...user};
    });

    database.addListener(`userNotifications/${uid}`, 'child_added', (snapshot) => {
      dispatch(notificationsActions.load(snapshot.key));
    });
  };
};

export const registerWithStore = () => {
  return dispatch => {
    /*
     * Listen to firebase auth changes (e.g when re-signing in a user saved locally)
     * and dispatch an event so that stores can react to it
     */
    firebase.auth().onAuthStateChanged((user) => {
      //There is a bug where errors in this handler are silently swallowed. Be careful.
      if(user) {
        dispatch({type: 'FIREBASE_AUTH_INIT', uid: user.uid});
        dispatch(listenToUser());
      }else{
        dispatch({type: 'FIREBASE_AUTH_INIT', uid: null});
        dispatch(navigationActions.reset({key: 'walkthrough'}));
      }
    }, error => {
      console.warn(error); //eslint-disable-line no-console
    });


  };
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

export const FCMInit = () => {
  return dispatch => {
    FCM.requestPermissions();

    /*
     * Listen for updates to the FCM token
     */
    FCM.getFCMToken().then(token => {
      // store fcm token in your server
      dispatch(setFCMToken(token));
    });

    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      dispatch(notificationsActions.receivePush(notif));
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      // fcm token may not be available on first load, catch it here
      dispatch(setFCMToken(token));
    });
  };
};

export const setFCMToken = (token) => {
  return (dispatch, getState) => {
    if(token) {
      let uid = getState().user.uid;
      firebaseDb.child(`users/${uid}/FCMToken`).set(token);
    }
  };
};
