import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

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
}

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
    }
  },

  [actionTypes.PAYMENTS_UPDATE_ACCOUNT_START]: (state, action) => {
    return {
      ...state,
      isUpdatingAccount: true,
      updateAccountError: null,
    }
  },

  [actionTypes.PAYMENTS_UPDATE_ACCOUNT_SUCCESS]: (state, action) => {
    const account = action.response.external_accounts.data[0]
    const legal = action.response.legal_entity

    return {
      ...state,
      accountData: {
        firstName: legal.first_name,
        lastName: legal.last_name,
        accountNumber: 'xxxx' + account.last4,
        sortCode: account.routing_number,
        addressLine1: legal.address.line1,
        addressLine2: legal.address.line2,
        city: legal.address.city,
        postcode: legal.address.postal_code,
      },
      isUpdatingAccount: false,
    }
  },

  [actionTypes.PAYMENTS_UPDATE_ACCOUNT_ERROR]: (state, action) => {
    return {
      ...state,
      isUpdatingAccount: false,
      updateAccountError: action.err,
    }
  },

  [actionTypes.PAYMENTS_GET_ACCOUNT_START]: (state, action) => {
    return {
      ...state,
      isFetchingAccount: true,
      fetchAccountError: null,
    }
  },

  [actionTypes.PAYMENTS_GET_ACCOUNT_SUCCESS]: (state, action) => {
    const account = action.response.external_accounts.data[0]
    const legal = action.response.legal_entity

    return {
      ...state,
      accountData: {
        firstName: legal.first_name,
        lastName: legal.last_name,
        accountNumber: 'xxxx' + account.last4,
        sortCode: account.routing_number,
        addressLine1: legal.address.line1,
        addressLine2: legal.address.line2,
        city: legal.address.city,
        postcode: legal.address.postal_code,
        verification: legal.verification,
      },
      isFetchingAccount: false,
    }
  },

  [actionTypes.PAYMENTS_GET_ACCOUNT_ERROR]: (state, action) => {
    return {
      ...state,
      isFetchingAccount: false,
      fetchAccountError: action.err,
    }
  },

  [actionTypes.PAYMENTS_GET_CARDS_START]: (state, action) => {
    return {
      ...state,
      isFetchingCards: true,
      fetchCardsError: null,
    }
  },

  [actionTypes.PAYMENTS_GET_CARDS_SUCCESS]: (state, action) => {
    let cards = []
    if(action.response.sources.total_count > 0) {
      cards = action.response.sources.data
    }

    return {
      ...state,
      cards: cards,
      isFetchingCards: false,
    }
  },

  [actionTypes.PAYMENTS_GET_CARDS_ERROR]: (state, action) => {
    return {
      ...state,
      isFetchingCards: false,
      fetchCardsError: action.err,
    }
  },

  [actionTypes.PAYMENTS_ADD_CARD_START]: (state, action) => {
    return {
      ...state,
      isAddingCard: true,
      addCardError: null,
    }
  },

  [actionTypes.PAYMENTS_ADD_CARD_SUCCESS]: (state, action) => {
    let cards = state.cards.slice(0)
    let card = action.response

    return {
      ...state,
      cards: cards.concat([card]),
      isAddingCard: false,
    }
  },

  [actionTypes.PAYMENTS_ADD_CARD_ERROR]: (state, action) => {
    return {
      ...state,
      isAddingCard: false,
      addCardError: action.err,
    }
  },

  [actionTypes.PAYMENTS_DELETE_CARD_START]: (state, action) => {
    return {
      ...state,
      isDeletingCard: true,
      deleteCardError: null,
    }
  },

  [actionTypes.PAYMENTS_DELETE_CARD_SUCCESS]: (state, action) => {
    const cards = state.cards.slice(0)
    const deletedId = action.response.id

    return {
      ...state,
      cards: cards.filter(card => card.id !== deletedId),
      isDeletingCard: false,
    }
  },

  [actionTypes.PAYMENTS_DELETE_CARD_ERROR]: (state, action) => {
    return {
      ...state,
      isDeletingCard: false,
      deleteCardError: action.err,
    }
  },

  [actionTypes.PAYMENTS_ERROR_DISMISS]: (state, action) => {
    return {
      ...state,
      addCardError: false,
      updateAccountError: false,
    }
  },

}, initialState)
