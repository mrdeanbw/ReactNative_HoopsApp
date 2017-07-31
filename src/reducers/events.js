import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

const initialState = {
  isLoading: false,
  isUpdating: false,

  eventsById: {},
}

export default handleActions({

  /*
   * when a user logs out, we need to reset all state except for `eventsById`
   */
  [actionTypes.USER_LOGGED_OUT]: (state, action) => {
    return {
      ...state,
      ...initialState,
      eventsById: state.eventsById,
    }
  },

  [actionTypes.EVENTS_LOAD]: (state, action) => {
    return {
      ...state,
      isLoading: true,
    }
  },

  [actionTypes.EVENTS_LOAD_ALL]: (state, action) => {
    return {
      ...state,
      eventsById: action.events || {},
    }
  },

  [actionTypes.EVENTS_LOADED]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      eventsById: {
        ...state.eventsById,
        ...action.events,
      },
    }
  },

  [actionTypes.EVENT_REMOVED]: (state, action) => {
    let eventsById = state.eventsById
    delete eventsById[action.id]

    return {
      ...state,
      eventsById,
    }
  },

  [actionTypes.EVENT_ADD_START]: (state, action) => {
    return {
      ...state,
      isUpdating: true,
    }
  },

  [actionTypes.EVENT_ADD_ERROR]: (state, action) => {
    return {
      ...state,
      isUpdating: false,
    }
  },

  [actionTypes.EVENT_ADD_SUCCESS]: (state, action) => {
    // When we add a new event, get it in the store before firebase can load
    return {
      ...state,
      isUpdating: false,
      eventsById: {
        ...state.eventsById,
        [action.eventData.id]: action.eventData,
      },
    }
  },

}, initialState)
