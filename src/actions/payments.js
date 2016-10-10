
const server = 'http://192.168.1.64:8888/';

const post = (path, body) => {
  return fetch(server + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
};

export const createAccount = (data) => {
  return dispatch => {

    dispatch({
      type: 'PAYMENTS_CREATE_ACCOUNT_START',
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
        type: 'PAYMENTS_CREATE_ACCOUNT_SUCCESS',
        response,
      });
    }).catch(err => {
      dispatch({
        type: 'PAYMENTS_CREATE_ACCOUNT_ERROR',
        err,
      });
    });
  };
};
