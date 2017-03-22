import {firebaseDb} from '../data/firebase'
import DBHelper from '../data/database-helper'
import actionTypes from './'

const database = DBHelper('invites')

import {eventActions, usersActions, paymentActions} from '../actions'

const inviteRef = firebaseDb.child('invites')

export const create = (userId, eventId) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid
    let ref = inviteRef.push()
    let inviteKey = ref.key
    let inviteData =  {
      userId,
      fromId: uid,
      eventId,
      status: "pending",
      date: new Date(),
    }

    firebaseDb.update({
      [`invites/${inviteKey}`]: inviteData,
      [`events/${eventId}/invites/${inviteKey}`]: true,
      [`users/${userId}/invites/${inviteKey}`]: true,
    }, (err) => {
      if(err) {
        dispatch({
          type: actionTypes.INVITE_ADD_ERROR,
          err,
        })
      } else {
        dispatch({
          type: actionTypes.INVITE_ADDED,
          inviteData,
        })
      }
    })
  }
}

export const removeInvite = (invite) => {
  return dispatch => {
    firebaseDb.child(`events/${invite.eventId}/invites/${invite.id}`).remove()
    firebaseDb.child(`users/${invite.userId}/invites/${invite.id}`).remove()

    // Deleting an object that has a listener breaks
    database.removeListeners(`invites/${invite.id}`)
    firebaseDb.child(`invites/${invite.id}`).remove()
  }
}

export const load = (id) => {
  return (dispatch, getState) => {
    // Is the invite already in the store?
    const {invites} = getState()
    if (invites.invitesById[id]) {
      return
    }

    database.addListener(`invites/${id}`, 'value', (snapshot) => {
      let invite = snapshot.val()
      /**
       * TODO: what if we have the event in local storage,
       * but it's not being listened to with firebaseDb.on() ?
       */
      if(invite.eventId) {
        dispatch(eventActions.load(invite.eventId))
      }
      if(invite.userId) {
        dispatch(usersActions.load(invite.userId))
      }

      dispatch({
        type: actionTypes.INVITES_LOADED,
        invites: {
          [id]: {
            ...snapshot.val(),
            id,
          },
        },
      })
    })
  }
}

export const getAll = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      firebaseDb.child(`invites`).once('value', snapshot => {

        const invites = snapshot.val()

        // Add id to the object
        if (invites) {
          Object.entries(invites).map(([key, value]) => {
            invites[key]['id'] = key
          })
        }

        dispatch({
          type: actionTypes.INVITES_LOAD_ALL,
          invites: invites,
        })

        resolve()
      })
    })
  }
}

export const registerWithStore = () => {
  return (dispatch, getState) => {
    firebaseDb.child(`invites`).on('child_changed', snapshot => {
      const id = snapshot.key
      dispatch({
        type: actionTypes.INVITES_LOADED,
        invites: {
          [id]: {
            ...snapshot.val(),
            id,
          },
        },
      })
    })
  }
}


export const accept = (invite) => {
  return (dispatch, getState) => {
    if(invite.event.entryFee === 0 || invite.event.paymentMethod !== 'app') {
      firebaseDb.update({
        [`invites/${invite.id}/status`]: 'confirmed',
      })
    } else {
      dispatch(paymentActions.pay(invite.event, invite))
    }
  }
}

export const decline = (invite) => {
  return dispatch => {
    firebaseDb.update({
      [`invites/${invite.id}/status`]: 'rejected',
    })
  }
}

export const markSeen = (invites) => {
  return dispatch => {
    let update = {}
    invites.forEach(invite => {
      update[`invites/${invite.id}/seen`] = true
    })
    firebaseDb.update(update)
  }
}
