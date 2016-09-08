
import {firebaseApp} from '../firebase';

export const signIn = (email, password) => {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password);
};

export const signUp = (email, password) => {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
};
