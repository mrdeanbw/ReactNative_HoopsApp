import axios from 'axios'
import qs from 'qs'

import Config from '../config'
import inflateEvent from '../data/inflaters/event'
import {getApiError} from '../utils'
import actionTypes, {navigationActions} from './'

const paymentApi = axios.create({
  baseURL: Config.PAYMENTS_SERVER,
  timeout: 1000,
})

const stripeApi = axios.create({
  baseURL: 'https://api.stripe.com/v1/',
  timeout: 1000,
  headers: {
    'Authorization': 'Bearer ' + Config.STRIPE_PUBLIC_KEY,
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

export const getAccount = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.PAYMENTS_GET_ACCOUNT_START
    })

    try {
      const response = await paymentApi.get('stripeGetAccount', {params: {userId: getState().user.uid}})

      dispatch({
        type: actionTypes.PAYMENTS_GET_ACCOUNT_SUCCESS,
        response: response.data,
      })
    } catch(err) {
      dispatch({
        type: actionTypes.PAYMENTS_GET_ACCOUNT_ERROR,
        err,
      })
    }
  }
}

export const getBalance = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.PAYMENTS_GET_BALANCE_START
    })

    try {
      const response = await paymentApi.get('stripeGetAccountBalance', {params: {userId: getState().user.uid}})

      dispatch({
        type: actionTypes.PAYMENTS_GET_BALANCE_SUCCESS,
        response: response.data,
      })
    } catch(err) {
      dispatch({
        type: actionTypes.PAYMENTS_GET_BALANCE_ERROR,
        err,
      })
    }
  }
}

export const getTransactions = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.PAYMENTS_GET_TRANSACTIONS_START
    })

    try {
      const response = await paymentApi.get('stripeGetAccountTransactions', {params: {userId: getState().user.uid}})

      dispatch({
        type: actionTypes.PAYMENTS_GET_TRANSACTIONS_SUCCESS,
        response: response.data,
      })
    } catch(err) {
      dispatch({
        type: actionTypes.PAYMENTS_GET_TRANSACTIONS_ERROR,
        err,
      })
    }
  }
}

export const updateAccount = (data) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.PAYMENTS_UPDATE_ACCOUNT_START,
    })

    const postData = {
      accountNumber: data.accountNumber,
      sortCode: data.sortCode,

      userId: data.uid,
      name: data.name,
      email: data.email,
      dob: new Date(data.dob).valueOf(),
      firstName: data.firstName,
      lastName: data.lastName,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      postcode: data.postcode,
      city: data.city
    }

    try {
      const response = await paymentApi.post('stripeCreateAccount', postData)

      dispatch({
        type: actionTypes.PAYMENTS_UPDATE_ACCOUNT_SUCCESS,
        response: response.data,
      })

      dispatch(navigationActions.pop())
    } catch(err) {
      const error = getApiError(err.response)

      dispatch({
        type: actionTypes.PAYMENTS_UPDATE_ACCOUNT_ERROR,
        err: error,
      })
    }
  }
}

/*
 * creating and updating are the same API call
 */
export const createAccount = updateAccount

export const createCard = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.PAYMENTS_ADD_CARD_START,
    })

    const user = getState().user
    const cardData = {
      'card[number]': data.cardNumber,
      'card[exp_month]': data.expiryMonth,
      'card[exp_year]': data.expiryYear,
      'card[cvc]': data.cvc,
    }

    let tokenResponseData
    try {
      const tokenResponse = await stripeApi.post('tokens', qs.stringify(cardData))
      tokenResponseData = tokenResponse.data
    } catch(err) {
      dispatch({
        type: actionTypes.PAYMENTS_ADD_CARD_ERROR,
        err: err.response.data.error,
      })

      // Stop execution, no token
      return
    }

    try {
      const cardResponse = await paymentApi.post('stripeCreateCard', {
        userId: user.uid,
        cardToken: tokenResponseData.id,
      })

      dispatch({
        type: actionTypes.PAYMENTS_ADD_CARD_SUCCESS,
        response: cardResponse.data,
      })

      dispatch(navigationActions.pop())
    } catch(err) {
      const error = getApiError(err.response)

      dispatch({
        type: actionTypes.PAYMENTS_ADD_CARD_ERROR,
        err: {
          param: null,
          message: error,
        },
      })
    }
  }
}

export const getCards = () => {
  return async (dispatch, getState) => {
    const user = getState().user

    dispatch({
      type: actionTypes.PAYMENTS_GET_CARDS_START,
    })

    try {
      const response = await paymentApi.get('stripeGetCards', {params: {userId: user.uid}})
      dispatch({
        type: actionTypes.PAYMENTS_GET_CARDS_SUCCESS,
        response: response.data,
      })
    } catch(err) {
      dispatch({
        type: actionTypes.PAYMENTS_GET_CARDS_ERROR,
        err,
      })
    }
  }
}

export const deleteCard = (cardToken) => {
  return async (dispatch, getState) => {
    const user = getState().user

    dispatch({
      type: actionTypes.PAYMENTS_DELETE_CARD_START,
    })

    try {
      const response = await paymentApi.post('stripeDeleteCard', {
        userId: user.uid,
        cardToken,
      })

      dispatch({
        type: actionTypes.PAYMENTS_DELETE_CARD_SUCCESS,
        response: response.data,
      })

      dispatch(navigationActions.pop())
    } catch(err) {
      dispatch({
        type: actionTypes.PAYMENTS_DELETE_CARD_SUCCESS,
        err,
      })
    }
  }
}

/*
 * @param event {Event}
 * @param invite {Invite or null}
 *
 * If the payment is in response to an invitation from an organizer, use invite param
 */
export const pay = (event, invite = null) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.user.uid

    event = inflateEvent(event, {
      users: state.users.usersById,
    })

    if (state.payments.cards.length === 0) {
      throw new Error('No cards found to make payment with')
    }

    // TODO we are always using the first card. What if the user wants to use another?
    var cardId = state.payments.cards[0].id

    dispatch({
      type: actionTypes.PAYMENTS_PAY_START,
    })

    try {
      const response = await paymentApi.post('stripeChargeCard', {
        inviteId: invite ? invite.id : null,
        eventId: event.id,
        cardId,
        userId,
      })

      dispatch({
        type: actionTypes.PAYMENTS_PAY_SUCCESS,
        response: response.data,
      })
    } catch(err) {
      dispatch({
        type: actionTypes.PAYMENTS_PAY_ERROR,
        err: err.message,
      })
    }
  }
}

export const clearPaymentError = () => ({
  type: actionTypes.PAYMENTS_PAY_CLEAR_ERROR,
})

export const dismissError = () => ({
  type: actionTypes.PAYMENTS_ERROR_DISMISS,
})
