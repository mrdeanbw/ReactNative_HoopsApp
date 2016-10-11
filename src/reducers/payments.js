
import {handleActions} from 'redux-actions';

const initialState = {
  isUpdatingAccount: false,
  accountData: {},
  updateAccountError: null,
};

export default handleActions({
  PAYMENTS_UPDATE_ACCOUNT_START: (state, action) => {
    return {
      ...state,
      isUpdatingAccount: true,
      updateAccountError: null,
    };
  },

  PAYMENTS_UPDATE_ACCOUNT_SUCCESS: (state, action) => {
    //action.response,
    return {
      ...state,
      isUpdatingAccount: false,
    };
  },

  PAYMENTS_UPDATE_ACCOUNT_ERROR: (state, action) => {
    return {
      ...state,
      isUpdatingAccount: false,
      updateAccountError: action.err,
    };
  },

  PAYMENTS_GET_ACCOUNT_SUCCESS: (state, action) => {
    let account = action.response.external_accounts.data[0];
    let address = action.response.legal_entity.address;
    return {
      ...state,
      accountData: {
        accountNumber: 'xxxx' + account.last4,
        sortCode: account.routing_number,
        addressLine1: address.line1,
        addressLine2: address.line2,
        city: address.city,
        postcode: address.postal_code,
      },
    };
  },

}, initialState);
