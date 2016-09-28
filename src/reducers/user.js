import {handleActions} from 'redux-actions';

const emptyUserObject = {
  name: null,
  username: null,
  gender: null,
  dob: null,

  availability: true,
  organizing: {}, //Events that this user organizes
  invites: {},
  requests: {},
  savedEvents: {},
  friends: {},
};

const initialState = {
  uid: null,

  ...emptyUserObject,

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
    let extra = action.extra || {};
    return {
      ...state,
      uid: action.uid,
      email: extra.email,
      name: extra.name,
      username: extra.username,
      dob: extra.dob,
      gender: extra.gender,
      isSigningIn: false,
      signInError: null,
    };
  },

  USER_SIGN_IN_FAILURE: (state, action) => {
    return {
      ...state,
      uid: null,

      ...emptyUserObject,

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
      ...{
        /*
         * we need to merge new data with the emptyUserObject
         * so that undefined keys are reset.
         * For example `savedEvents` changes from {E1:true} to undefined.
         */
        ...emptyUserObject,
        ...action.user,
      },
    };
  },

  USER_SET_AVAILABILITY: (state, action) => {
    return {
      ...state,
      availability: action.value,
    };
  },

}, initialState);
