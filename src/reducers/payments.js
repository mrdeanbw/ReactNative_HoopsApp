
import {handleActions} from 'redux-actions';

const initialState = {
  isUpdatingAccount: false,
  isFetchingAccount: false,
  isFetchingCards: false,
  isAddingCard: false,
  isDeletingCard: false,

  accountData: {},

  updateAccountError: null,
  fetchAccountError: null,
  addCardError: null,
  deleteCardError: null,

  cards: [],
};

export default handleActions({

  'persist/REHYDRATE': (state, action) => {
    return {
      ...initialState,
      ...action.payload.payments,
      isUpdatingAccount: false,
      isFetchingAccount: false,
      isFetchingCards: false,
      isAddingCard: false,
      isDeletingCard: false,
      updateAccountError: null,
      fetchAccountError: null,
      addCardError: null,
      deleteCardError: null,
    };
  },

  PAYMENTS_UPDATE_ACCOUNT_START: (state, action) => {
    return {
      ...state,
      isUpdatingAccount: true,
      updateAccountError: null,
    };
  },

  PAYMENTS_UPDATE_ACCOUNT_SUCCESS: (state, action) => {
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

  PAYMENTS_GET_ACCOUNT_START: (state, action) => {
    return {
      ...state,
      isFetchingAccount: true,
      fetchAccountError: null,
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
      isFetchingAccount: false,
    };
  },

  PAYMENTS_GET_ACCOUNT_ERROR: (state, action) => {
    return {
      ...state,
      isFetchingAccount: false,
      fetchAccountError: action.err,
    };
  },

  PAYMENTS_GET_CARDS_START: (state, action) => {
    return {
      ...state,
      isFetchingCards: true,
      fetchCardsError: null,
    };
  },

  PAYMENTS_GET_CARDS_SUCCESS: (state, action) => {
    let cards = [];
    if(action.response.sources.total_count > 0) {
      cards = action.response.sources.data;
    }

    return {
      ...state,
      cards: cards,
      isFetchingCards: false,
    };
  },

  PAYMENTS_GET_CARDS_ERROR: (state, action) => {
    return {
      ...state,
      isFetchingCards: false,
      fetchCardsError: action.err,
    };
  },

  PAYMENTS_ADD_CARD_START: (state, action) => {
    return {
      ...state,
      isAddingCard: true,
      addCardError: null,
    };
  },

  PAYMENTS_ADD_CARD_SUCCESS: (state, action) => {
    let cards = state.cards.slice(0);
    let card = action.response;

    return {
      ...state,
      cards: cards.concat([card]),
      isAddingCard: false,
    };
  },

  PAYMENTS_ADD_CARD_ERROR: (state, action) => {
    return {
      ...state,
      isAddingCard: false,
      addCardError: action.err,
    };
  },

  PAYMENTS_DELETE_CARD_START: (state, action) => {
    return {
      ...state,
      isDeletingCard: true,
      deleteCardError: null,
    };
  },

  PAYMENTS_DELETE_CARD_SUCCESS: (state, action) => {
    let cards = state.cards.slice(0);
    let deletedId = action.response.id;

    return {
      ...state,
      cards: cards.filter(card => card.id !== deletedId),
      isDeletingCard: false,
    };
  },

  PAYMENTS_DELETE_CARD_ERROR: (state, action) => {
    return {
      ...state,
      isDeletingCard: false,
      deleteCardError: action.err,
    };
  },

  PAYMENTS_ERROR_DISMISS: (state, action) => {
    return {
      ...state,
      addCardError: false,
      updateAccountError: false,
    };
  },

}, initialState);
