
import firebase from '../data/firebase';

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch({type: 'USER_SIGN_IN'});

    firebase.auth().signInWithEmailAndPassword(email, password)
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

export const signUp = (email, password) => {
  return (dispatch) => {
    dispatch({type: 'USER_SIGN_UP'});

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
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

/*
 * Set the UI mode to ORGANIZE or PARTICIPATE
 */
export const setMode = (mode) => ({
  type: 'SET_UI_MODE',
  mode,
});
