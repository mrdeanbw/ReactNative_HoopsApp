
import {firebaseDb} from '../data/firebase';

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
        dispatch(loadFriendRequest(notification.friendRequestId));
      }
    });
  };
};

const loadFriendRequest = (id) => {
  return dispatch => {
    firebaseDb.child(`friend_requests/${id}`).on('value', (snapshot) => {
      dispatch({
        type: 'FRIEND_REQUESTS_LOADED',
        friendRequests: {
          [id]: {
            ...snapshot.val(),
            id,
          },
        },
      });
    });
  };
};

export const acceptFriendRequest = (friendRequest) => {
  return dispatch => {
    firebaseDb.update({
      [`friend_requests/${friendRequest.id}/status`]: 'confirmed',
      [`friend_requests/${friendRequest.id}/dateResponded`]: new Date(),
      [`users/${friendRequest.fromId}/friends/${friendRequest.toId}`]: true,
      [`users/${friendRequest.toId}/friends/${friendRequest.fromId}`]: true,
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
      [`friend_requests/${friendRequest.id}/status`]: 'declined',
      [`friend_requests/${friendRequest.id}/dateResponded`]: new Date(),
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
