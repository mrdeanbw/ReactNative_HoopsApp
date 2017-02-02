import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

const initialState = {
  eventIds: [],
  userIds: [],
  nearby: [],
  general: {
    userIds: [],
    eventIds: [],
  },
  error: null,
}

export default handleActions({

  [actionTypes.SEARCH_START]: (state, action) => {
    //action.params
    return state
  },

  SEARCH_END: (state, action) => {
    if(!action.results) {
      return state
    }
    return {
      ...state,
      eventIds: action.results.hits.hits.map(hit => hit._id),
      error: null,
    }
  },

  [actionTypes.SEARCH_ERROR]: (state, action) => {
    return {
      ...state,
      eventIds: [],
      error: action.err,
    }
  },

  [actionTypes.SEARCH_GENERAL]: (state, action) => {
    return {
      ...state,
      general: {
        eventIds: action.events.map(event => event.id),
        userIds: action.users.map(user => user.id),
      },
    }
  },

  [actionTypes.SEARCH_NEARBY_START]: (state, action) => {
    return state
  },

  [actionTypes.SEARCH_NEARBY_END]: (state, action) => {
    if(!action.results) {
      return state
    }
    return {
      ...state,
      nearby: action.results.hits.hits.map(hit => ({id: hit._id, sort: hit.sort[0]})),
      error: null,
    }
  },

  [actionTypes.SEARCH_NEARBY_ERROR]: (state, action) => {
    return {
      ...state,
      nearby: [],
      error: action.err,
    }
  },

  [actionTypes.SEARCH_USERS_START]: (state, action) => {
    return state
  },

  [actionTypes.SEARCH_USERS_END]: (state, action) => {
    if (!action.results) {
      return state
    }
    return {
      ...state,
      userIds: action.results.hits.hits.map(hit => hit._id),
      error: null,
    }
  },

}, initialState)
