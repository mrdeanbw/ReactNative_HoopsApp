import FCM from 'react-native-fcm'

import firebase, {firebaseDb, uploadImage} from '../data/firebase'
import DBHelper, {clearAllListeners} from '../data/database-helper'
const database = DBHelper('user')

import * as emailAuth from '../data/auth/email'
import * as facebookAuth from '../data/auth/facebook'
import {getPlace} from '../data/google-places'

import actionTypes, {
  eventActions, usersActions,
  requestActions, notificationActions,
  navigationActions
} from './'


export const signIn = (email, password) => {
  return async(dispatch) => {
    dispatch({type: actionTypes.USER_SIGN_IN})

    try {
      await emailAuth.signIn(email, password)
      dispatch(signInSuccess('email'))
    } catch(err) {
      dispatch(signInFailure(err))
    }
  }
}

export const signInFormEdit = () => ({
  type: actionTypes.USER_SIGN_IN_FORM_EDIT,
})

/**
 * @param method {String} 'facebook' or 'email'
 */
export const signInSuccess = (method) => {
  const uid = firebase.auth().currentUser.uid
  return dispatch => {
    dispatch({
      type: actionTypes.USER_SIGN_IN_SUCCESS,
      uid,
      method,
    })
  }
}

export const signInFailure = (err) => ({
  type: actionTypes.USER_SIGN_IN_FAILURE,
  err,
})

/**
 * @param email {String} - User's email address
 * @param password {String} - User's password
 * @param extraData {Object} - Object of extra data to store against the new user
 */
export const signUp = (email, password, extraData) => {
  return async(dispatch) => {
    dispatch({
      type: actionTypes.USER_SIGN_UP
    })

    try {
      await emailAuth.signUp(email, password)
      await savePersonalData({
        ...extraData,
        dob: new Date(extraData.dob).valueOf(), //convert date to epoch timestamp
        email,
      })
      dispatch(signUpSuccess('email'))
    } catch(err) {
      dispatch(signUpFailure(err))
    }
  }
}

const savePersonalData = async function(data, callback) {
  const uid = firebase.auth().currentUser.uid
  const profilePath = `users/${uid}`
  const profileData = {...data}

  // Location
  const cityResult = await getPlace(data.cityGooglePlaceId)
  if (cityResult.result && cityResult.result.geometry) {
    profileData['cityCoords'] = cityResult.result.geometry.location
  }

  // Image
  if (data.image) {
    const imageUrl = await uploadImage(data.image, `users/${uid}/${new Date().toISOString()}`)
    profileData['image'] = imageUrl
  } else {
    profileData['image'] = null
  }

  // Update Firebase
  const userRef = firebaseDb.child(profilePath)
  await userRef.update(profileData, callback)
}

export const signUpSuccess = (method) => {
  return signInSuccess(method)
}

export const signUpFailure = (err) => ({
  type: actionTypes.USER_SIGN_UP_FAILURE,
  err,
})

export const facebookSignUp = () => {
  return dispatch => {
    dispatch({type: actionTypes.USER_SIGN_UP})
    //We need to make sure that the USER_SIGN_UP action is sent before
    //any of facebook SDK's native views intercept our react-native app.
    //setTimeout is ugly but does the job here.
    setTimeout(() => {
      facebookAuth.signIn().then((user) => {
        dispatch(signUpSuccess('facebook'))
      }).catch((err) => {
        dispatch(signUpFailure(err))
      })
    }, 300)
  }
}

export const facebookSignIn = () => {
  return dispatch => {
    dispatch({type: actionTypes.USER_SIGN_IN})
    //We need to make sure that the USER_SIGN_IN action is sent before
    //any of facebook SDK's native views intercept our react-native app.
    //setTimeout is ugly but does the job here.
    setTimeout(() => {
      facebookAuth.signIn().then((user) => {
        dispatch(signInSuccess('facebook'))
      }).catch((err) => {
        dispatch(signInFailure(err))
      })
    }, 300)
  }
}

export const loadFacebookData = () => {
  return async(dispatch) => {
    dispatch({type: actionTypes.FACEBOOK_USER_DATA_START})

    try {
      const facebookUser = await facebookAuth.getUserData()

      dispatch({
        type: actionTypes.FACEBOOK_USER_DATA,
        facebookUser,
      })
    } catch(err) {
      dispatch({type: actionTypes.FACEBOOK_USER_ERROR})
      console.warn(err) //eslint-disable-line no-console
    }
  }
}

export const facebookSaveExtra = (extraData) => {
  return dispatch => {
    savePersonalData({
      ...extraData,
      dob: new Date(extraData.dob).valueOf(),
    }, (err) => {
      if(err) {
        dispatch({
          type: actionTypes.FACEBOOK_EXTRA_DATA_ERROR,
          err,
        })
      } else {
        dispatch({
          type: actionTypes.FACEBOOK_EXTRA_DATA_SAVED,
        })
      }
    })
  }
}

/**
 * Log out the current user session
 */
export const logOut = () => {
  return dispatch => {
    firebase.auth().signOut().then(() => {
      clearAllListeners()
      dispatch({
        type: actionTypes.USER_LOGGED_OUT,
      })
    })
  }
}



export const setInterests = (interests) => {
  return dispatch => {
    let uid = firebase.auth().currentUser.uid
    firebaseDb.child(`users/${uid}/interests`).set(interests)
  }
}

export const updateProfile = (data) => {
  return (dispatch, getState) => {
    savePersonalData(data)
  }
}

/*
 * Set the user's availability
 */
export const toggleAvailability = () => {
  return (dispatch, getState) => {
    let value = !getState().user.availability

    //Update local state first
    dispatch({
      type: actionTypes.USER_SET_AVAILABILITY,
      value,
    })

    //Update the database
    let uid = getState().user.uid
    firebaseDb.child(`users/${uid}/availability`).set(value)
  }
}

const listenToUser = () => {
  return (dispatch, getState) => {
    const currentUser = firebase.auth().currentUser
    const uid = currentUser.uid
    const providerId = currentUser.providerData[0].providerId

    let previousUser = {}
    let firstLoad = true

    database.addListener(`users/${uid}`, 'value', (snapshot) => {
      let user = snapshot.val() || {}
      let state = getState()

      //On first load, the store needs to stop showing the sign in loading icon
      if(firstLoad) {
        dispatch({type: actionTypes.USER_DATA_FIRST_LOAD})
        firstLoad = false
      }

      var previousName = previousUser.name ? previousUser.name : null
      var name = user.name ? user.name : null

      if(!previousName) {
        //Only do routing when the name wasn't previously set
        //It may now be, or not.
        if(!name && providerId !== 'password') {
          //Name isn't defined. We need to ask for extra data
          dispatch(navigationActions.reset({key: 'signupFacebookExtra'}))
        } else if(Object.keys(user.interests || {}).length === 0) {
          //Go to interests selection
          dispatch(navigationActions.reset({key: 'selectInterests'}))
        } else if(!state.app.mode) {
          //Go to select-mode page
          dispatch(navigationActions.reset({key: 'selectMode'}))
        } else {
          //Go to home page
          dispatch(navigationActions.reset({key: 'tabs'}))
        }
      }

      //If we have just got a name for the first time, init notifications
      if(!previousName && name) {
        dispatch(FCMInit())
      }

      dispatch({
        type: actionTypes.USER_CHANGE,
        user,
      })

      /*
       * Load connected resources
       */
      if(user.organizing) {
        for(let id in user.organizing) {
          dispatch(eventActions.load(id))
        }
      }
      if(user.friends) {
        for(let id in user.friends) {
          dispatch(usersActions.load(id))
        }
      }
      // todo: Invites loaded as part of the startup routine
      // if(user.invites) {
      //   for(let id in user.invites) {
      //     dispatch(inviteActions.load(id))
      //   }
      // }
      if(user.requests) {
        for(let id in user.requests) {
          dispatch(requestActions.load(id))
        }
      }
      if(user.friendRequests) {
        for(let id in user.friendRequests) {
          dispatch(usersActions.loadFriendRequest(id))
        }
      }
      if(user.savedEvents) {
        for(let id in user.savedEvents) {
          dispatch(eventActions.load(id))
        }
      }

      previousUser = {...user}
    })

    database.addListener(`userNotifications/${uid}`, 'child_added', (snapshot) => {
      dispatch(notificationActions.load(snapshot.key))
    })
  }
}

export const registerWithStore = () => {
  return dispatch => {
    /*
     * Listen to firebase auth changes (e.g when re-signing in a user saved locally)
     * and dispatch an event so that stores can react to it
     */
    firebase.auth().onAuthStateChanged((user) => {
      //There is a bug where errors in this handler are silently swallowed. Be careful.
      if(user) {
        dispatch({type: actionTypes.FIREBASE_AUTH_INIT, uid: user.uid})
        dispatch(listenToUser())
      }else{
        dispatch({type: actionTypes.FIREBASE_AUTH_INIT, uid: null})
        dispatch(navigationActions.reset({key: 'walkthrough'}))
      }
    }, error => {
      console.warn(error) //eslint-disable-line no-console
    })


  }
}

/**
 * removeFriend is instant. Adding a friend has to be via a friend-request
 * which can be found in actions/users.js#sendFriendRequests(ids)
 */
export const removeFriend = (user) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid
    firebaseDb.update({
      [`users/${uid}/friends/${user.id}`]: null,
      [`users/${user.id}/friends/${uid}`]: null,
    }, (err) => {
      if(err) {
        dispatch({
          type: actionTypes.FRIEND_REMOVE_ERROR,
          err,
        })
      } else {
        dispatch({
          type: actionTypes.FRIEND_REMOVE,
          id: user.id,
        })
      }
    })
  }
}

export const FCMInit = () => {
  return dispatch => {
    FCM.requestPermissions()

    /*
     * Listen for updates to the FCM token
     */
    FCM.getFCMToken().then(token => {
      // store fcm token in your server
      dispatch(setFCMToken(token))
    })

    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      dispatch(notificationActions.receivePush(notif))
    })
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      // fcm token may not be available on first load, catch it here
      dispatch(setFCMToken(token))
    })
  }
}

export const setFCMToken = (token) => {
  return (dispatch, getState) => {
    if(token) {
      let uid = getState().user.uid
      firebaseDb.child(`users/${uid}/FCMToken`).set(token)
    }
  }
}
