
import {firebaseDb, firebaseStorage} from '../data/firebase';
import DBHelper from '../data/database-helper';
const database = DBHelper('users');

import * as eventsActions from './events';
import * as invitesActions from './invites';
import * as requestsActions from './requests';

export const load = (id) => {
  return dispatch => {
    database.addListener(`users/${id}`, 'value', (snapshot) => {
      let value = snapshot.val();

      if(!value) {
        //User is not defined, probably a bad id was attempted
      }else{
        let user = {
          ...value,
          id: snapshot.key,
        };

        dispatch({type: 'USERS_LOADED', users: {[id]: user}});

        if(user.publicProfile && user.publicProfile.image) {
          firebaseStorage.ref(user.publicProfile.image).getDownloadURL().then(uri => {
            dispatch({
              type: 'USERS_IMAGE_LOADED',
              images: {
                [id]: {imageSrc: uri},
              }
            });
          }).catch(err => {
            dispatch({
              type: 'USERS_IMAGE_ERROR',
              images: {
                [id]: {imageErr: err},
              }
            });
          });
        } else if(user.publicProfile && user.publicProfile.facebookImageSrc) {
          dispatch({
            type: 'USERS_IMAGE_LOADED',
            images: {
              [id]: {imageSrc: user.publicProfile.facebookImageSrc},
            }
          });
        }

        if(user.organizing) {
          for(let id in user.organizing) {
            dispatch(eventsActions.load(id));
          }
        }
        if(user.requests) {
          for(let id in user.requests) {
            dispatch(requestsActions.load(id));
          }
        }
        if(user.invites) {
          for(let id in user.invites) {
            dispatch(invitesActions.load(id));
          }
        }
      }
    });
  };
};

export const loadMany = (userIds) => {

  return dispatch => {

    userIds.map((id) => {
      dispatch(load(id));
    });

  };
};

export const sendFriendRequests = (userIds) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid;
    userIds.forEach((userId) => {
      let friendRequest = firebaseDb.child('friendRequests').push();

      firebaseDb.update({
        [`friendRequests/${friendRequest.key}`]: {
          fromId: uid,
          toId: userId,
          status: 'pending',
        },
        [`users/${uid}/friendRequests/${friendRequest.key}`]: true,
        [`users/${userId}/friendRequests/${friendRequest.key}`]: true,
      });
    });
  };
};

export const loadFriendRequest = (id) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid;

    database.addListener(`friendRequests/${id}`, 'value', (snapshot) => {
      let friendRequest = snapshot.val();
      dispatch({
        type: 'FRIEND_REQUESTS_LOADED',
        friendRequests: {
          [id]: {
            ...friendRequest,
            id,
          },
        },
      });

      if(friendRequest.fromId === uid) {
        //Friend request is from me, to a user.
        dispatch(load(friendRequest.toId));
      } else {
        //Friend request is from a user, to me.
        dispatch(load(friendRequest.fromId));
      }
    });
  };
};

export const getAll = () => {
  return dispatch => {
    firebaseDb.child(`users`).on('value', snapshot => {
      dispatch({
        type: 'USERS_LOAD_ALL',
        users: snapshot.val(),
      });
    });
  };
};
