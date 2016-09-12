
import {firebaseApp, firebaseDb} from '../firebase';

const usersRef = firebaseDb.child('users');

/**
 * @param email {String}
 * @param password {String}
 * @returns {Promise} with a firebase user object
 */
export const signIn = (email, password) => {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password);
};

/**
 * @param email {String}
 * @param password {String}
 * @returns {Promise} with a firebase user object
 */
export const signUp = (email, password) => {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
};
