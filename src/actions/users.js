
import {firebaseDb} from '../data/firebase';

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

        dispatch({type: 'USERS_LOADED', users: {[id]: user}});
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
      let friendRequest = firebaseDb.child('friend_requests').push();
      let notification = firebaseDb.child('notifications').push();

      firebaseDb.update({
        [`friend_requests/${friendRequest.key}`]: {
          fromId: uid,
          toId: userId,
          status: 'pending',
        },
        [`notifications/${notification.key}`]: {
          date: new Date(),
          read: false,
          type: 'FRIEND_REQUEST',
          friendRequestId: friendRequest.key,
        },
        [`user_notifications/${userId}/${notification.key}`]: true,
      });
    });
  };
};
