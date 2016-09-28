
import {firebaseDb} from '../data/firebase';

import * as eventsActions from './events';
import * as usersActions from './users';

const requestsRef = firebaseDb.child('requests');

const listening = {};

export const create = (eventId) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid;
    let ref = requestsRef.push();
    let requestKey = ref.key;
    let requestData =  {
      userId: uid,
      eventId,
      status: "pending",
      date: new Date(),
    };

    firebaseDb.update({
      [`requests/${requestKey}`]: requestData,
      [`events/${eventId}/requests/${requestKey}`]: true,
      [`users/${uid}/requests/${requestKey}`]: true,
    }, (err) => {
      if(err) {
        dispatch({
          type: 'REQUEST_ADD_ERROR',
          err,
        });
      } else {
        dispatch({
          type: 'REQUEST_ADDED',
          requestData,
        });
      }
    });
  };
};

export const load = (id) => {
  return (dispatch, getState) => {
    if(listening[id] === true){
      return;
    }
    listening[id] = true;
    firebaseDb.child(`requests/${id}`).on('value', (snapshot) => {
      let request = snapshot.val();

      if(!request) {
        //The request has been deleted
        dispatch({
          type: 'REQUEST_DELETED',
          id,
        });
        return;
      }

      if(request.eventId) {
        dispatch(eventsActions.load(request.eventId));
      }
      if(request.userId) {
        dispatch(usersActions.load(request.userId));
      }

      dispatch({
        type: 'REQUESTS_LOADED',
        requests: {
          [id]: {
            ...snapshot.val(),
            id,
          },
        },
      });
    });
  };
};

export const allow = (request) => {
  return (dispatch, getState) => {
    firebaseDb.update({
      [`requests/${request.id}/status`]: 'confirmed',
      [`users/${request.userId}/requests/${request.id}`]: null,
    });
  };
};

export const cancel = (request) => {
  return (dispatch, getState) => {
    let state = getState();
    let uid = state.user.uid;
    firebaseDb.update({
      [`requests/${request.id}/status`]: 'cancelled',
      [`user/${uid}/requests/${request.id}`]: null,
    });
  };
};