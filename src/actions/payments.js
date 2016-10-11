
import * as navigationActions from './navigation';
import url from 'url';

const server = 'https://arcane-ridge-17730.herokuapp.com/';

const get = (path, params) => {
  params = url.format({
    query: params,
  });

  return fetch(server + path + params, {
    method: 'GET',
  }).then(response => {
    if(!response.ok) {
      return response.json().then(obj => {
        throw new Error(obj.message);
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
        throw new Error(obj.message);
      });
    }else{
      return response.json();
    }
  });
};

export const getAccount = () => {
  return (dispatch, getState) => {
    let stripeAccountId = getState().user.stripeAccount;

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
