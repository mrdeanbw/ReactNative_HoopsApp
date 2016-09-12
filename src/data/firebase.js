import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA-4UQyJ2wfj9OfgX4zkTQeFscFxGQ_agE",
  authDomain: "localhost",
  databaseURL: "https://hoops-21a72.firebaseio.com",
  storageBucket: "hoops-21a72.appspot.com",
};

export default firebase;

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const registerWithStore = (store) => {
  /*
   * Listen to firebase auth changes (e.g when re-signing in a user saved locally)
   * and dispatch an event so that stores can react to it
   */
  let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //There is a bug where errors in this handler are silently swallowed. Be careful.
    if(user) {
      store.dispatch({type: 'FIREBASE_AUTH_INIT', uid: user.uid});
    }else{
      store.dispatch({type: 'FIREBASE_AUTH_INIT', uid: null});
    }

    //Only listen to the first auth state
    unsubscribe();
  }, error => {
    console.warn(error);
  });

};

export const firebaseDb = firebaseApp.database().ref();
