
import {firebaseApp, firebaseDb} from './firebase';

const usersRef = firebaseDb.child('users');

/**
 * Write data to the user object. This operation is descructive, data already
 * set in the DB will be overwritten.
 *
 * @param data {Object}
 * @returns {Promise}
 */
export const write = (data) => {
  let user = firebaseApp.auth().currentUser;

  if(!user) {
    throw new Error('No user found, attempting to save user data to database');
  }

  return usersRef.child(user.uid).set(data).then(() => {
    //Return the data that was just saved
    return data;
  });
}

/**
 * @returns {Promise}
 */
export const read = () => {
  let user = firebaseApp.auth().currentUser;

  if(!user){
    throw new Error('No user found, attempting to get user data from database');
  }

  return usersRef.child(user.uid).once('value').then((data) => {
    return data.val();
  });
}

export const listenToOrganizer = (addCallback, removeCallback) => {
  let user = firebaseApp.auth().currentUser;

  let userRef = usersRef.child(user.uid);
  userRef.child('organizing').on('child_added', (snapshot) => {
    addCallback(snapshot.key);
  });
  userRef.child('organizing').on('child_removed', (oldSnapshot) => {
    removeCallback(oldSnapshot.key);
  });
};

export const listenToParticipant = (addCallback, removeCallback) => {
  let user = firebaseApp.auth().currentUser;

  let userRef = usersRef.child(user.uid);
  userRef.child('participating').on('child_added', (snapshot) => {
    addCallback(snapshot.key);
  });
  userRef.child('participating').on('child_removed', (oldSnapshot) => {
    removeCallback(oldSnapshot.key);
  });
};
