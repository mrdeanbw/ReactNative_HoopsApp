import {handleActions} from 'redux-actions';

/**
 * Take a data object from the database and convert it to one that is
 * friendly to our views
 */
export const convertStructure = (data) => {
  data = {
    //defaults
    availability: true,
    organizing: {},
    invites: {},
    requests: {},
    savedEvents: {},
    friends: {},
    friendRequests: {},

    interests: {},

    stripeAccount: null,

    name: null,
    username: null,
    gender: null,
    city: null,
    email: null,
    phone: null,
    dob: null,

    //overwrite with actual data
    ...data,
  };

  //flatten scoped data
  if(data.publicProfile) {
    data.name = data.publicProfile.name;
    data.username = data.publicProfile.username;
    data.gender = data.publicProfile.gender;
    data.city = data.publicProfile.city;
    data.interests = data.publicProfile.interests;
    delete data.publicProfile;
  }

  //flatten scoped data
  if(data.contactInfo) {
    data.email = data.contactInfo.email;
    data.phone = data.contactInfo.phone;
    delete data.contactInfo;
  }

  //flatten scoped data
  if(data.restrictedProfile) {
    data.dob = data.restrictedProfile.dob;
    delete data.restrictedProfile;
  }

  return data;
};

const initialState = {
  uid: null,
  signInMethod: null,
  facebookUser: null,

  ...convertStructure({}),

  //Signing in
  isSigningIn: false,
  signInError: null,

  //Signing up
  isSigningUp: false,
  signUpError: null,

  mode: null,
};

export default handleActions({

  FIREBASE_AUTH_INIT: (state, action) => {
    return {
      ...state,
      uid: action.uid,
    };
  },

  USER_SIGN_IN: (state, action) => {
    return {
      ...state,
      isSigningIn: true,
    };
  },

  USER_SIGN_IN_SUCCESS: (state, action) => {
    return {
      ...state,
      uid: action.uid,
      signInMethod: action.method,
    };
  },

  USER_SIGN_IN_FAILURE: (state, action) => {
    return {
      ...state,
      uid: null,

      ...convertStructure({}),

      isSigningIn: false,
      signInError: action.err,
    };
  },

  USER_SIGN_UP: (state, action) => {
    return {
      ...state,
      isSigningUp: true,
    };
  },

  USER_SIGN_UP_SUCCESS: (state, action) => {
    return {
      ...state,
      uid: action.uid,
      isSigningUp: false,
      signUpError: null,
    };
  },

  FACEBOOK_USER_DATA: (state, action) => {
    return {
      ...state,
      facebookUser: action.facebookUser,
    };
  },

  USER_SIGN_UP_FAILURE: (state, action) => {
    return {
      ...state,
      uid: false,
      isSigningUp: false,
      signUpError: action.err,
    };
  },

  USER_LOGGED_OUT: (state, action) => {
    return initialState;
  },

  SET_UI_MODE: (state, action) => {
    return {
      ...state,
      mode: action.mode,
    };
  },

  USER_CHANGE: (state, action) => {
    return {
      ...state,
      ...convertStructure(action.user),
    };
  },

  USER_SET_AVAILABILITY: (state, action) => {
    return {
      ...state,
      availability: action.value,
    };
  },

}, initialState);
