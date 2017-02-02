import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

/**
 * Take a data object from the database and convert it to one that is
 * friendly to our views
 */
export const convertStructure = (data) => {
  data = {
    //defaults
    availability: null,
    organizing: {},
    invites: {},
    requests: {},
    savedEvents: {},
    friends: {},
    friendRequests: {},

    interests: {},

    stripeAccount: null,

    //used to hold data gathered from facebook
    facebookUser: {},

    name: null,
    image: null,
    imageUrl: null,
    username: null,
    gender: null,
    city: null,
    email: null,
    phone: null,
    dob: null,

    //overwrite with actual data
    ...data,
  }

  //flatten scoped data
  if(data.publicProfile) {
    data.name = data.publicProfile.name
    data.image = data.publicProfile.image
    data.imageUrl = data.publicProfile.imageUrl

    let imageSrc = null
    if (data.publicProfile.imageUrl) {
      imageSrc = data.publicProfile.imageUrl
    } else if (data.publicProfile.facebookImageSrc) {
      imageSrc = data.publicProfile.facebookImageSrc
    }

    data.imageSrc = imageSrc
    data.username = data.publicProfile.username
    data.gender = data.publicProfile.gender
    data.city = data.publicProfile.city
    data.interests = data.publicProfile.interests
    data.availability = data.publicProfile.availability
    delete data.publicProfile
  }

  //flatten scoped data
  if(data.contactInfo) {
    data.email = data.contactInfo.email
    data.phone = data.contactInfo.phone
    delete data.contactInfo
  }

  //flatten scoped data
  if(data.restrictedProfile) {
    data.dob = data.restrictedProfile.dob
    delete data.restrictedProfile
  }

  return data
}

const initialState = {
  uid: null,
  signInMethod: null,

  facebookUser: null,
  isFacebookUserLoading: false,

  ...convertStructure({}),

  //Signing in
  isSigningIn: false,
  signInError: null,

  //Signing up
  isSigningUp: false,
  signUpError: null,

  mode: null,
}

export default handleActions({

  'persist/REHYDRATE': (state, action) => {
    return {
      ...initialState,
      ...action.payload.user,
      isSigningIn: false,
      isSigningUp: false,
      isFacebookUserLoading: false,
    }
  },

  [actionTypes.FIREBASE_AUTH_INIT]: (state, action) => {
    return {
      ...state,
      uid: action.uid,
    }
  },

  [actionTypes.USER_SIGN_IN_FORM_EDIT]: (state, action) => {
    return {
      ...state,
      signInError: null,
    }
  },

  [actionTypes.USER_SIGN_IN]: (state, action) => {
    return {
      ...state,
      isSigningIn: true,
    }
  },

  [actionTypes.USER_DATA_FIRST_LOAD]: (state, action) => {
    return {
      ...state,
      isSigningUp: false,
      isSigningIn: false,
    }
  },

  [actionTypes.USER_SIGN_IN_SUCCESS]: (state, action) => {
    return {
      ...state,
      uid: action.uid,
      signInMethod: action.method,
      //isSigningIn: false, //we also need to wait for user data to load
    }
  },

  [actionTypes.USER_SIGN_IN_FAILURE]: (state, action) => {
    return {
      ...state,
      uid: null,

      ...convertStructure({}),

      isSigningIn: false,
      signInError: action.err,
    }
  },

  [actionTypes.USER_SIGN_UP]: (state, action) => {
    return {
      ...state,
      isSigningUp: true,
    }
  },

  [actionTypes.USER_SIGN_UP_SUCCESS]: (state, action) => {
    return {
      ...state,
      uid: action.uid,
      //isSigningUp: false, //we also need to wait for user data to load
      signUpError: null,
    }
  },

  [actionTypes.FACEBOOK_USER_DATA_START]: (state, action) => {
    return {
      ...state,
      isFacebookUserLoading: true,
    }
  },

  [actionTypes.FACEBOOK_USER_DATA]: (state, action) => {
    return {
      ...state,
      facebookUser: action.facebookUser,
      isFacebookUserLoading: false,
    }
  },

  [actionTypes.USER_SIGN_UP_FAILURE]: (state, action) => {
    return {
      ...state,
      uid: false,
      isSigningUp: false,
      signUpError: action.err,
    }
  },

  [actionTypes.USER_LOGGED_OUT]: (state, action) => {
    return initialState
  },

  [actionTypes.SET_UI_MODE]: (state, action) => {
    return {
      ...state,
      mode: action.mode,
    }
  },

  [actionTypes.USER_CHANGE]: (state, action) => {
    return {
      ...state,
      ...convertStructure(action.user),
    }
  },

  [actionTypes.USER_SET_AVAILABILITY]: (state, action) => {
    return {
      ...state,
      availability: action.value,
    }
  },

}, initialState)
