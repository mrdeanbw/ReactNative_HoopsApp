import {handleActions} from 'redux-actions';

const initialState = {
  uid: null,
  isSigningIn: false,
  signInError: null,
};

export default handleActions({
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
      isSigningIn: false,
      signInError: null,
    };
  },

  USER_SIGN_IN_FAILURE: (state, action) => {
    return {
      ...state,
      uid: null,
      isSigningIn: false,
      signInError: action.err,
    };
  },

}, initialState);
