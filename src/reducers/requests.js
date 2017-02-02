import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

const initialState = {
  requestsById: {},
}

export default handleActions({

  [actionTypes.REQUESTS_LOADED]: (state, action) => {
    return {
      ...state,
      requestsById: {
        ...state.requestsById,
        ...action.requests,
      },
    }
  },

  [actionTypes.REQUEST_DELETED]: (state, action) => {
    const requestsById = {...state.requestsById} //clone
    delete requestsById[action.id]

    return {
      ...state,
      requestsById,
    }
  },

}, initialState)
