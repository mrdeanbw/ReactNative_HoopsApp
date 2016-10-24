
import {firebaseDb} from '../data/firebase';

import * as usersActions from './users';

export const load = (id) => {
  return dispatch => {
    firebaseDb.child(`notifications/${id}`).on('value', (snapshot) => {
      let notification = snapshot.val();
      dispatch({
        type: 'NOTIFICATION_LOADED',
        notifications: {
          [id]: {
            ...notification,
            id,
          },
        },
      });

      if(notification.type === 'FRIEND_REQUEST') {
        dispatch(usersActions.loadFriendRequest(notification.friendRequestId));
      }
    });
  };
};

export const acceptFriendRequest = (friendRequest) => {
  return dispatch => {
    firebaseDb.update({
      [`friendRequests/${friendRequest.id}/status`]: 'confirmed',
      [`friendRequests/${friendRequest.id}/dateResponded`]: new Date(),
      [`users/${friendRequest.fromId}/friends/${friendRequest.toId}`]: true,
      [`users/${friendRequest.toId}/friends/${friendRequest.fromId}`]: true,

      //Delete the friendRequest
      [`users/${friendRequest.fromId}/friendRequests/${friendRequest.id}`]: null,
      [`users/${friendRequest.toId}/friendRequests/${friendRequest.id}`]: null,
    }, (err) => {
      if(err) {
        dispatch({
          type: 'FRIEND_REQUEST_ACCEPTED_ERROR',
          err,
        });
      } else {
        dispatch({
          type: 'FRIEND_REQUEST_ACCEPTED',
          friendRequest,
        });
      }
    });
  };
};

export const declineFriendRequest = (friendRequest) => {
  return dispatch => {
    firebaseDb.update({
      [`friendRequests/${friendRequest.id}/status`]: 'declined',
      [`friendRequests/${friendRequest.id}/dateResponded`]: new Date(),
      [`users/${friendRequest.fromId}/friends/${friendRequest.toId}`]: null,
      [`users/${friendRequest.toId}/friends/${friendRequest.fromId}`]: null,
    }, (err) => {
      if(err) {
        dispatch({
          type: 'FRIEND_REQUEST_DENIED_ERROR',
          err,
        });
      } else {
        dispatch({
          type: 'FRIEND_REQUEST_DENIED',
          friendRequest,
        });
      }
    });
  };
};

export const markRead = (id) => {
  return dispatch => {
    firebaseDb.child(`notifications/${id}/read`).set(true);

    dispatch({
      type: 'NOTIFICATION_MARK_READ',
      id,
    });
  };
};

export const markUnread = (id) => {
  return dispatch => {
    firebaseDb.child(`notifications/${id}/read`).set(false);

    dispatch({
      type: 'NOTIFICATION_MARK_UNREAD',
      id,
    });
  };
};

export const receivePush = (notification) => {
  return {
    type: 'NOTIFICATION_PUSH',
    notification,
  };
};
