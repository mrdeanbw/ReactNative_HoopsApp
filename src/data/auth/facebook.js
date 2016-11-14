
import firebase, {firebaseApp} from '../firebase';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const provider = firebase.auth.FacebookAuthProvider;

const loginPermissions = ['email', 'public_profile', 'user_birthday', 'user_location'];
const userUri = '/me?fields=id,name,last_name,email,gender,birthday,location,picture.type(large)';

/**
 * @returns {Promise} with firebase user
 */
export const signIn = () => {
  return LoginManager.logInWithReadPermissions(loginPermissions)
    .then((loginResult) => {
      if(loginResult.isCancelled) {
        return null;
      }else{
        //return a Promise to get the access token
        return AccessToken.getCurrentAccessToken();
      }
    }).then((token) => {
      let credential = provider.credential(token.accessToken);
      //return a promise to sign into firebase
      return firebaseApp.auth().signInWithCredential(credential);
    });
};

export const getUserData = () => {
  return new Promise((resolve, reject) => {
    let request = new GraphRequest(userUri, null, (err, graphResult) => {
      if(err) {
        reject(err);
      }

      resolve(graphResult);
    });
    new GraphRequestManager().addRequest(request).start();
  });
};
