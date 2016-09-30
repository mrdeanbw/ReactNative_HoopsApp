
import {firebaseDb} from '../data/firebase';

export const load = (id) => {
  return dispatch => {
    firebaseDb.child(`notifications/${id}`).on('value', (snapshot) => {
      let notification = snapshot.val();
      dispatch({
        type: 'NOTIFICATION_LOADED',
        notifications: {
          [id]: {
            notification,
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
