import FCM from 'react-native-fcm'

import {firebaseDb} from '../data/firebase'
import DBHelper from '../data/database-helper'
const database = DBHelper('notifications')
import {usersActions} from '../actions'
import actionTypes from './'

export const load = (id) => {
  return dispatch => {
    database.addListener(`notifications/${id}`, 'value', (snapshot) => {
      let notification = snapshot.val()
      dispatch({
        type: actionTypes.NOTIFICATION_LOADED,
        notifications: {
          [id]: {
            ...notification,
            id,
          },
        },
      })

      if(notification.type === 'FRIEND_REQUEST') {
        //TODO: is this needed? Maybe users/friendRequests/id is already watched?
        dispatch(usersActions.loadFriendRequest(notification.friendRequestId))
      }

      dispatch(updateBadge())

    })
  }
}

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
          type: actionTypes.FRIEND_REQUEST_ACCEPTED_ERROR,
          err,
        })
      } else {
        dispatch({
          type: actionTypes.FRIEND_REQUEST_ACCEPTED,
          friendRequest,
        })
      }
    })
  }
}

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
          type: actionTypes.FRIEND_REQUEST_DENIED_ERROR,
          err,
        })
      } else {
        dispatch({
          type: actionTypes.FRIEND_REQUEST_DENIED,
          friendRequest,
        })
      }
    })
  }
}

export const markRead = (id) => {
  return dispatch => {
    firebaseDb.child(`notifications/${id}/read`).set(true)

    dispatch({
      type: actionTypes.NOTIFICATION_MARK_READ,
      id,
    })
  }
}

export const markUnread = (id) => {
  return dispatch => {
    firebaseDb.child(`notifications/${id}/read`).set(false)

    dispatch({
      type: actionTypes.NOTIFICATION_MARK_UNREAD,
      id,
    })
  }
}

export const markSeen = (id) => {
  return dispatch => {
    firebaseDb.child(`notifications/${id}/seen`).set(true)

    dispatch({
      type: actionTypes.NOTIFICATION_MARK_SEEN,
      id,
    })
    dispatch(updateBadge())
  }
}

export const updateBadge = () => {
  return (dispatch, getState) => {
    let state = getState()

    //count unread notifications and set the badge
    let unseen = Object.keys(state.notifications.notificationsById).map(notiId => {
      return state.notifications.notificationsById[notiId]
    }).filter(notification => notification && notification.seen !== true)

    FCM.setBadgeNumber(unseen.length)
  }
}

export const receivePush = (notification) => {
  return {
    type: actionTypes.NOTIFICATION_PUSH,
    notification,
  }
}

export const scheduleDeadlineAlert = (event) => {
  if(!event.deadline) {
    return
  }
  let id = `DEADLINE_${event.id}`

  FCM.scheduleLocalNotification({
    fire_date: new Date(event.deadline).getTime(),
    id: id,
    body: 'Your event deadline has passed',
    title: `${event.title} deadline`,
    deeplink: `hoops://events/${event.id}`,
  })

  return {
    type: actionTypes.NOTIFICATION_SCHEDULED,
    id: id,
  }
}
