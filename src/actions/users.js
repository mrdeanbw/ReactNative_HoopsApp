import {firebaseDb} from '../data/firebase'
import DBHelper from '../data/database-helper'
const database = DBHelper('users')

import {eventActions, requestActions} from '../actions'

export const load = (id) => {
  return dispatch => {
    database.addListener(`users/${id}`, 'value', (snapshot) => {
      let value = snapshot.val()

      if(!value) {
        //User is not defined, probably a bad id was attempted
      }else{
        let user = {
          ...value,
          id: snapshot.key,
        }

        dispatch({type: 'USERS_LOADED', users: {[id]: user}})

        if(user.organizing) {
          for(let eventId in user.organizing) {
            dispatch(eventActions.load(eventId))
          }
        }
        if(user.requests) {
          for(let requestId in user.requests) {
            dispatch(requestActions.load(requestId))
          }
        }
        // todo: Invites loaded as part of the startup routine
        // if(user.invites) {
        //   for(let id in user.invites) {
        //     dispatch(inviteActions.load(id))
        //   }
        // }
      }
    })
  }
}

export const loadMany = (userIds) => {
  return dispatch => {
    userIds.map((id) => {
      dispatch(load(id))
    })
  }
}

export const sendFriendRequests = (userIds) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid
    userIds.forEach((userId) => {
      let friendRequest = firebaseDb.child('friendRequests').push()

      firebaseDb.update({
        [`friendRequests/${friendRequest.key}`]: {
          fromId: uid,
          toId: userId,
          status: 'pending',
        },
        [`users/${uid}/friendRequests/${friendRequest.key}`]: true,
        [`users/${userId}/friendRequests/${friendRequest.key}`]: true,
      })
    })
  }
}

export const loadFriendRequest = (id) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid

    database.addListener(`friendRequests/${id}`, 'value', (snapshot) => {
      let friendRequest = snapshot.val()
      dispatch({
        type: 'FRIEND_REQUESTS_LOADED',
        friendRequests: {
          [id]: {
            ...friendRequest,
            id,
          },
        },
      })

      if(friendRequest.fromId === uid) {
        //Friend request is from me, to a user.
        dispatch(load(friendRequest.toId))
      } else {
        //Friend request is from a user, to me.
        dispatch(load(friendRequest.fromId))
      }
    })
  }
}

export const getAll = () => {
  return dispatch => {
    firebaseDb.child(`users`).on('value', snapshot => {
      dispatch({
        type: 'USERS_LOAD_ALL',
        users: snapshot.val(),
      })
    })
  }
}
