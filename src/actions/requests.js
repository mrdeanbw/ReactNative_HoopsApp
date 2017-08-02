import {firebaseDb} from '../data/firebase'
import DBHelper from '../data/database-helper'
import actionTypes, {eventActions, usersActions} from './'

const database = DBHelper('requests')
const requestsRef = firebaseDb.child('requests')

export const create = (eventId) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid
    let ref = requestsRef.push()
    let requestKey = ref.key
    let requestData =  {
      userId: uid,
      eventId,
      status: 'confirmed',
      date: new Date(),
    }

    firebaseDb.update({
      [`requests/${requestKey}`]: requestData,
      [`events/${eventId}/requests/${requestKey}`]: true,
      [`users/${uid}/requests/${requestKey}`]: true,
    }, (err) => {
      if (err) {
        dispatch({
          type: actionTypes.REQUEST_ADD_ERROR,
          err,
        })
      } else {
        dispatch({
          type: actionTypes.REQUEST_ADDED,
          requestData,
        })
      }
    })
  }
}

export const load = (id) => {
  return (dispatch, getState) => {
    // Is the request already in the store?
    const {requests} = getState()
    if (requests.requestsById[id]) {
      return
    }

    database.addListener(`requests/${id}`, 'value', (snapshot) => {
      let request = snapshot.val()

      if(!request) {
        //The request has been deleted
        dispatch({
          type: actionTypes.REQUEST_DELETED,
          id,
        })
        return
      }

      if(request.eventId) {
        dispatch(eventActions.load(request.eventId))
      }
      if(request.userId) {
        dispatch(usersActions.load(request.userId))
      }

      dispatch({
        type: actionTypes.REQUESTS_LOADED,
        requests: {
          [id]: {
            ...snapshot.val(),
            id,
          },
        },
      })
    })
  }
}
