
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
