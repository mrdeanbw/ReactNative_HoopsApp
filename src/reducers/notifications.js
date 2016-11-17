
import {handleActions} from 'redux-actions';

const initialState = {
  notificationsById: {},

  friendRequestsById: {},
};

const recognisedTypes = {
  FRIEND_REQUEST: true,
  EVENT_REQUEST: true,
  EVENT_CANCELLED: true,
  EVENT_INVITE: true,
};

export default handleActions({

  NOTIFICATION_LOADED: (state, action) => {
    let newNotifications = {...action.notifications};

    /* for futureproofing, filter out any notifications that we don't recognise */
    for(let id in newNotifications) {
      if(recognisedTypes[newNotifications[id].type] !== true) {
        delete newNotifications[id];
      }
    }

    return {
      ...state,
      notificationsById: {
        ...state.notificationsById,
        ...newNotifications,
      },
    };
  },

  FRIEND_REQUESTS_LOADED: (state, action) => {
    return {
      ...state,
      friendRequestsById: {
        ...state.friendRequestsById,
        ...action.friendRequests,
      },
    };
  },

  NOTIFICATION_PUSH: (state, action) => {
    let deeplink = action.notification.deeplink;
    return state;
  },

}, initialState);
