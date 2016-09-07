import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA-4UQyJ2wfj9OfgX4zkTQeFscFxGQ_agE",
  authDomain: "localhost",
  databaseURL: "https://hoops-21a72.firebaseio.com",
  storageBucket: "hoops-21a72.appspot.com",
};

export default firebase.initializeApp(firebaseConfig);

export const registerWithStore = (store) => {
  /*
   * Listen to firebase auth changes (e.g when re-signing in a user saved locally)
   * and dispatch an event so that stores can react to it
   */
  firebase.auth().onAuthStateChanged((user) => {
    store.dispatch({type: 'FIREBASE_AUTH', uid: user.uid});
  }, error => {
    console.warn(error);
  });

}
