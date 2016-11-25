
import * as navigationActions from './navigation';
import url from 'url';
import qs from 'qs';

import Config from '../config';

const server = Config.PAYMENTS_SERVER;
const stripePublicKey = Config.STRIPE_PUBLIC_KEY;

import inflateEvent from '../data/inflaters/event';

const get = (path, params) => {
  params = url.format({
    query: params,
  });

  return fetch(server + path + params, {
    method: 'GET',
  }).then(response => {
    if(!response.ok) {
      return response.json().then(obj => {
        throw obj;
      });
    }else{
      return response.json();
    }
  });
};

const del = (path, params) => {
  params = url.format({
    query: params,
  });

  return fetch(server + path + params, {
    method: 'DELETE',
  }).then(response => {
    if(!response.ok) {
      return response.json().then(obj => {
        throw obj;
      });
    }else{
      return response.json();
    }
  });
};

const post = (path, body) => {
  return fetch(server + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => {
    if(!response.ok) {
      return response.json().then(obj => {
        throw obj;
      });
    }else{
      return response.json();
    }
  });
};

export const getAccount = () => {
  return (dispatch, getState) => {
    let stripeAccountId = getState().user.stripeAccount;
    if(!stripeAccountId) {
      //If there is no stripe account associated. Don't attempt to fetch
      return;
    }

    dispatch({
      type: 'PAYMENTS_GET_ACCOUNT_START',
    });

    get('accounts', {
      stripeAccountId,
    }).then(response => {
      dispatch({
        type: 'PAYMENTS_GET_ACCOUNT_SUCCESS',
        response,
      });
    }).catch(err => {
      dispatch({
        type: 'PAYMENTS_GET_ACCOUNT_ERROR',
        err,
      });
    });
  };
};

export const updateAccount = (data) => {
  return dispatch => {

    dispatch({
      type: 'PAYMENTS_UPDATE_ACCOUNT_START',
    });

    post('accounts', {
      accountNumber: data.accountNumber,
      sortCode: data.sortCode,

      uid: data.uid,
      name: data.name,
      email: data.email,
      dob: new Date(data.dob).valueOf(),
      //first_name?
      //last_name?

      addressLine1: data.addressLine1,
      postcode: data.postcode,
      city: data.city,
    }).then(response => {
      dispatch({
        type: 'PAYMENTS_UPDATE_ACCOUNT_SUCCESS',
        response,
      });
      dispatch(navigationActions.pop());
    }).catch(err => {
      dispatch({
        type: 'PAYMENTS_UPDATE_ACCOUNT_ERROR',
        err,
      });
    });
  };
};

/*
 * creating and updating are the same API call
 */
export const createAccount = updateAccount;

export const createCard = (data) => {
  return dispatch => {
    dispatch({
      type: 'PAYMENTS_ADD_CARD_START',
    });

    let query = qs.stringify({
      card: {
        number: data.cardNumber,
        exp_month: data.expiryMonth,
        exp_year: data.expiryYear,
        cvc: data.cvc,
      },
    });

    fetch('https://api.stripe.com/v1/tokens', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + stripePublicKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      /*
       * We wrap body in an array to get around react-native-fetch-blob interference
       * We should look into alternatives to using react-native-fetch-blob as it
       * is breaking the expected functionality of fetch()
       */
      body: [query],
    }).then(response => {
      if(!response.ok) {
        return response.json().then(obj => {
          throw obj.error;
        });
      } else {
        return response.json();
      }
    }).then(response => {
      let cardToken = response.id;

      return post('cards', {
        uid: data.uid,
        cardToken: cardToken,
      });
    }).then(response => {
      dispatch({
        type: 'PAYMENTS_ADD_CARD_SUCCESS',
        response,
      });
      dispatch(navigationActions.pop());
    }).catch(err => {
      dispatch({
        type: 'PAYMENTS_ADD_CARD_ERROR',
        err,
      });
    });
  };
};

export const getCards = () => {
  return (dispatch, getState) => {
    let stripeAccountId = getState().user.stripeAccount;
    if(!stripeAccountId) {
      //If there is no stripe account associated. Don't attempt to fetch
      return;
    }

    let uid = getState().user.uid;

    dispatch({
      type: 'PAYMENTS_GET_CARDS_START',
    });

    get('cards', {
      uid: uid,
    }).then(response => {
      dispatch({
        type: 'PAYMENTS_GET_CARDS_SUCCESS',
        response,
      });
    }).catch(err => {
      dispatch({
        type: 'PAYMENTS_GET_CARDS_ERROR',
        err,
      });
    });
  };
};

export const deleteCard = (id) => {
  return (dispatch, getState) => {
    let uid = getState().user.uid;
    dispatch({
      type: 'PAYMENTS_DELETE_CARD_START',
    });

    del('cards', {
      cardId: id,
      uid: uid,
    }).then(response => {
      dispatch({
        type: 'PAYMENTS_DELETE_CARD_SUCCESS',
        response,
      });
    }).catch(err => {
      dispatch({
        type: 'PAYMENTS_DELETE_CARD_ERROR',
        err,
      });
    });
  };
};

export const getTransactions = () => {
  return (dispatch, getState) => {
    let accountKey = getState().user.stripeAccount;

    dispatch({
      type: 'PAYMENTS_GET_TRANSACTIONS_START',
    });

    get('transactions', {
      accountKey,
    }).then(response => {
      dispatch({
        type: 'PAYMENTS_GET_TRANSACTIONS_SUCCESS',
        response,
      });
    }).catch(err => {
      dispatch({
        type: 'PAYMENTS_GET_TRANSACTIONS_ERROR',
        err,
      });
    });
  };
};

/*
 * @param event {Event}
 * @param invite {Invite or null}
 *
 * If the payment is in response to an invitation from an organizer, use invite param
 */
export const pay = (event, invite = null) => {
  return (dispatch, getState) => {
    let state = getState();
    let uid = state.user.uid;

    event = inflateEvent(event, {
      users: state.users.usersById,
    });

    if(state.payments.cards.length === 0) {
      throw new Error('No cards found to make payment with');
    }
    //TODO we are always using the first card. What if the user wants to use another?
    var cardId = state.payments.cards[0].id;

    dispatch({
      type: 'PAYMENTS_PAY_START',
    });

    post('charge', {
      inviteId: invite ? invite.id : null,
      eventId: event.id,
      customerId: state.user.stripeCustomer,
      cardId: cardId,
      uid: uid,
    }).then(response => {
      dispatch({
        type: 'PAYMENTS_PAY_SUCCESS',
        response,
      });
    }).catch(err => {
      dispatch({
        type: 'PAYMENTS_PAY_ERROR',
        err,
      });
    });
  };
};

export const dismissError = () => ({
  type: 'PAYMENTS_ERROR_DISMISS',
});
