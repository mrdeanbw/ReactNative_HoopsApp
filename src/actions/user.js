
import * as emailAuth from '../data/auth/email';
import * as facebookAuth from '../data/auth/facebook';

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch({type: 'USER_SIGN_IN'});

    emailAuth.signIn(email, password)
      .then((response) => {
        dispatch(signInSuccess(response.uid));
      }).catch((err) => {
        dispatch(signInFailure(err));
      });
  };
};

export const signInSuccess = (uid) => ({
  type: 'USER_SIGN_IN_SUCCESS',
  uid,
});

export const signInFailure = (err) => ({
  type: 'USER_SIGN_IN_FAILURE',
  err,
});

export const facebookSignIn = () => {
  return dispatch => {
    facebookAuth.signIn().then((response) => {
      dispatch(signInSuccess(response.uid));
    }).catch((err) => {
      dispatch(signInFailure(err));
    });
  };
};

export const signUp = (email, password) => {
  return (dispatch) => {
    dispatch({type: 'USER_SIGN_UP'});

    emailAuth.signUp(email, password)
      .then((response) => {
        //TODO save extra data from sign up form
        dispatch(signUpSuccess(response.uid));
      }).catch((err) => {
        dispatch(signUpFailure(err));
      });
  };
};

export const signUpSuccess = (uid) => {
  return signInSuccess(uid);
};

export const signUpFailure = (err) => ({
  type: 'USER_SIGN_UP_FAILURE',
  err,
});

export const facebookSignUp = () => {
  let uid;
  return dispatch => {
    facebookAuth.signIn().then((response) => {
      uid = response.uid;
      return facebookAuth.getUserData();
    }).then((user) => {
      //TODO `user` contains personal data extracted from facebook
      dispatch(signUpSuccess(uid));
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
