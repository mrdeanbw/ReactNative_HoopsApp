
import {firebaseDb, firebaseStorage} from '../data/firebase';

const usersRef = firebaseDb.child('users');

const listening = {};

export const load = (id) => {
  return dispatch => {
    if(listening[id] === true){
      return;
    }
    listening[id] = true;
    usersRef.child(id).on('value', (snapshot) => {
      let value = snapshot.val();

      if(!value) {
        //User is not defined, probably a bad id was attempted
      }else{
        let user = {
          ...value,
          id: snapshot.key,
        };

        if(user.publicProfile && user.publicProfile.image) {
          firebaseStorage.ref(user.publicProfile.image).getDownloadURL().then(uri => {
            user.publicProfile.imageSrc = uri;
            dispatch({type: 'USERS_LOADED', users: {[id]: user}});
          }).catch(err => {
            dispatch({type: 'USERS_LOADED', users: {[id]: user}, imageErr: err});
          });
        } else {
          dispatch({type: 'USERS_LOADED', users: {[id]: user}});
        }
      }
    });
  };
};

export const loadMany = (userIds) => {

  return dispatch => {

    userIds.map((id) => {
      dispatch(load(id));
    });

  };
};

export const sendFriendRequests = (userIds) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid;
    userIds.forEach((userId) => {
      let friendRequest = firebaseDb.child('friendRequests').push();
      let notification = firebaseDb.child('notifications').push();

      firebaseDb.update({
        [`friendRequests/${friendRequest.key}`]: {
          fromId: uid,
          toId: userId,
          status: 'pending',
        },
        [`users/${uid}/friendRequests/${friendRequest.key}`]: true,
        [`users/${userId}/friendRequests/${friendRequest.key}`]: true,
      });
    });
  };
};

export const loadFriendRequest = (id) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid;

    firebaseDb.child(`friendRequests/${id}`).on('value', (snapshot) => {
      let friendRequest = snapshot.val();
      dispatch({
        type: 'FRIEND_REQUESTS_LOADED',
        friendRequests: {
          [id]: {
            ...friendRequest,
            id,
          },
        },
      });

      if(friendRequest.fromId === uid) {
        //Friend request is from me, to a user.
        dispatch(load(friendRequest.toId));
      } else {
        //Friend request is from a user, to me.
        dispatch(load(friendRequest.fromId));
      }
    });
  };
};

export const getAll = () => {
  return dispatch => {
    firebaseDb.child(`users`).on('value', snapshot => {
      dispatch({
        type: 'USERS_LOAD_ALL',
        users: snapshot.val(),
      });
    });
  };
};
