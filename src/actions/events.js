import {firebaseDb, uploadImage} from '../data/firebase'
import DBHelper from '../data/database-helper'
const database = DBHelper('events')

import actionTypes, {
  usersActions, inviteActions, requestActions,
  paymentActions, notificationActions, navigationActions
} from './'

import {getPlace} from '../data/google-places'


export const load = (id) => {
  return (dispatch, getState) => {
    // Is the event already in the store?
    const {events} = getState()
    if (events.eventsById[id]) {
      return
    }

    database.addListener(`events/${id}`, 'value', (snapshot) => {
      let event = snapshot.val()
      if (!event) {
        return
      }

      dispatch({type: actionTypes.EVENTS_LOADED, events: {[id] : event}})

      // todo: Invites loaded as part of the startup routine
      // if(event.invites) {
      //   for(let inviteId in event.invites) {
      //     dispatch(inviteActions.load(inviteId))
      //   }
      // }
      if(event.requests) {
        for(let requestId in event.requests) {
          dispatch(requestActions.load(requestId))
        }
      }

      //Load organizer, even if it is me
      dispatch(usersActions.load(event.organizer))
    })
  }
}

export const remove = (id) => {
  return {
    type: actionTypes.EVENT_REMOVED,
    id,
  }
}

const preSave = (eventData, eventKey, uid) => {
  let chain = []
  if(eventData.image) {
    //upload images first:
    chain.push(uploadImage(eventData.image, `events/${eventKey}/main.jpeg`))
  } else {
    chain.push(null)
  }

  if(eventData.addressGooglePlaceId) {
    chain.push(
      getPlace(eventData.addressGooglePlaceId).then(result => {
        return result.result && result.result.geometry
      })
    )
  }else{
    chain.push(null)
  }

  return Promise.all(chain).then(result => {
    let image = result[0] ? result[0] : null
    let coords = result[1] ? result[1].location : null

    eventData = {
      ...eventData,
      //Replace the original eventData.image with our firebase reference
      image: image,
      organizer: uid,
      id: eventKey,
    }

    if(coords) {
      eventData.addressCoords = {
        lat: coords.lat,
        lon: coords.lng, //GooglePlaces uses `lng`, but elasticsearch needs `lon`
      }
    }

    return eventData
  })
}

export const create = (eventData) => {
  return (dispatch, getState) => {
    let ref = firebaseDb.child('events').push()
    let newKey = ref.key
    let uid = getState().user.uid

    preSave(eventData, newKey, uid).then((data) => {
      firebaseDb.update({
        [`events/${newKey}`]: data,
        [`users/${uid}/organizing/${newKey}`]: true,
      }, (err) => {
        if(err) {
          dispatch({
            type: actionTypes.EVENT_ADD_ERROR,
            err,
          })
        } else {
          dispatch({
            type: actionTypes.EVENT_ADDED,
            eventData: data,
          })
          dispatch(notificationActions.scheduleDeadlineAlert({
            ...data,
          }))
        }
      })

    })
  }
}

export const edit = (eventId, eventData) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid

    let event = {}
    let newData = {}

    firebaseDb.child(`events/${eventId}`).once('value').then(snapshot => {
      event = snapshot.val()

      return preSave(eventData, eventId, uid)
    }).then(result => {
      newData = result
      return firebaseDb.child(`events/${eventId}`).set({
        ...event,
        ...newData,

        image: newData.image || event.image || null, //newData.image could be null
      })
    }).then(() => {
      dispatch({
        type: actionTypes.EVENT_EDIT,
        eventData: newData,
      })
      dispatch(navigationActions.pop())
    }).catch(err => {
      dispatch({
        type: actionTypes.EVENT_EDIT_ERROR,
        err,
      })
    })
  }
}

export const inviteUsers = (userIds, eventId) => {
  return dispatch => {
    userIds.forEach((userId) => {
      dispatch(inviteActions.create(userId, eventId))
    })

  }
}

/*
 * @param userPaymentMethod {String} [optional] payment method that the user wants
 * to use for an 'unrestricted' payment. 'app' or 'cash'
 */
export const join = (eventId, userPaymentMethod) => {
  return (dispatch, getState) => {
    let state = getState()
    let event = state.events.eventsById[eventId]

    /*
     * if event is free, or method is 'cash' join immediately.
     * else if method is 'app' take payment.
     * else if method is 'unrestricted' ask the user what they want to do
     */
    if(event.entryFee === 0 || event.paymentMethod === 'cash') {
      dispatch(requestJoin(event))
    } else if(event.paymentMethod === 'app') {
      dispatch(paymentActions.pay(event))
    } else {
      if(userPaymentMethod === 'cash') {
        dispatch(requestJoin(event, userPaymentMethod))
      } else {
        dispatch(paymentActions.pay(event))
      }
    }
  }
}

export const requestJoin = (event) => {
  return (dispatch, getState) => {
    if(event.entryFee !== 0 && event.paymentMethod === 'app') {
      throw new Error('App cannot create a request to join a paid event. The payment server must do this')
    }

    let state = getState()
    let uid = state.user.uid

    let requestRef = firebaseDb.child('requests').push()
    let requestKey = requestRef.key

    firebaseDb.update({
      [`events/${event.id}/requests/${requestKey}`]: true,
      [`users/${uid}/requests/${requestKey}`]: true,
      [`requests/${requestKey}`]: {
        eventId: event.id,
        userId: uid,
        status: event.privacy === 'public' ? 'confirmed' : 'pending',
        date: new Date(),
        paymentMethod: event.entryFee === 0 ? null : 'cash',
      }
    }, (err) => {
      if(err) {
        dispatch({
          type: actionTypes.EVENT_JOIN_ERROR,
          err,
        })
      } else {
        dispatch({
          type: actionTypes.EVENT_JOINED,
        })
      }
    })
  }
}

/**
 * Update either the request or the invite status
 */
export const quit = (eventId) => {
  return (dispatch, getState) => {
    let state = getState()
    let uid = state.user.uid

    //Look for requests matching this event
    let request = Object.keys(state.user.requests).map(requestId => {
      return state.requests.requestsById[requestId]
    }).find(requestObj => requestObj.eventId === eventId)

    //Look for invites matching this event
    let invite = Object.keys(state.user.invites).map(inviteId => {
      return state.invites.invitesById[inviteId]
    }).find(inviteObj => inviteObj.eventId === eventId)

    let resultHandler = (err) => {
      if(err) {
        dispatch({
          type: actionTypes.EVENT_QUIT_ERROR,
          err,
        })
      }else{
        dispatch({
          type: actionTypes.EVENT_QUIT,
          eventId,
        })
      }
    }

    if(request) {

      //Delete the request, N.B we will have no record of it ever existing
      firebaseDb.update({
        [`requests/${request.id}`]: null,
        [`users/${uid}/requests/${request.id}`]: null,
        [`events/${eventId}/requests/${request.id}`]: null,
      }).then(resultHandler)

    } else if (invite) {

      //Set the invite status to 'rejected'
      firebaseDb.update({
        [`invites/${invite.id}/status`]: 'rejected',
      }).then(resultHandler)

    } else {
      throw new Error(`User ${uid} has no requests or invites for event ${eventId}`)
    }
  }
}

export const save = (eventId) => {
  return (dispatch, getState) => {
    let state = getState()
    let uid = state.user.uid
    firebaseDb.update({
      [`users/${uid}/savedEvents/${eventId}`]: true,
    })
  }
}

export const unsave = (eventId) => {
  return (dispatch, getState) => {
    let state = getState()
    let uid = state.user.uid
    firebaseDb.update({
      [`users/${uid}/savedEvents/${eventId}`]: null,
    })
  }
}

export const cancel = (eventId, message) => {
  return (dispatch, getState) => {

    let cancellation = firebaseDb.child('eventCancellations').push()
    firebaseDb.update({
      [`events/${eventId}/cancelled`]: true,
      [`events/${eventId}/cancelMessage`]: message,
      [`eventCancellations/${cancellation.key}`]: {
        eventId,
        date: new Date(),
      },
    })
  }
}

export const getAll = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      firebaseDb.child(`events`).once('value', snapshot => {
        dispatch({
          type: actionTypes.EVENTS_LOAD_ALL,
          events: snapshot.val(),
        })

        resolve()
      })
    })
  }
}

export const registerWithStore = () => {
  return (dispatch, getState) => {
    const cb = snapshot => {
      const id = snapshot.key
      const event = snapshot.val()

      dispatch({
        type: actionTypes.EVENTS_LOADED,
        events: {[id] : event}
      })
    }

    firebaseDb.child(`events`).limitToLast(1).on('child_added', cb)
    firebaseDb.child(`events`).on('child_changed', cb)
  }
}
