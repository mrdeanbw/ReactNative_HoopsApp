
import {handleActions} from 'redux-actions';

const initialState = {
  isCreatingAccount: false,
  createAccountError: null,
};

export default handleActions({
  PAYMENTS_CREATE_ACCOUNT_START: (state, action) => {
    return {
      ...state,
      isCreatingAccount: true,
      createAccountError: null,
    };
  },

  PAYMENTS_CREATE_ACCOUNT_SUCCESS: (state, action) => {
    //action.response,
    return {
      ...state,
      isCreatingAccount: false,
    };
  },

  PAYMENTS_CREATE_ACCOUNT_ERROR: (state, action) => {
    return {
      ...state,
      isCreatingAccount: false,
      createAccountError: action.err,
    };
  },

}, initialState);
