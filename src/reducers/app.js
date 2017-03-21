import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

const initialState = {
  startupComplete: false,
  UImode: null,
  networkConnection: 'unknown',
  networkDismissed: false,
}

export default handleActions({

  [actionTypes.STARTUP_BEGIN]: (state, action) => {
    return {
      ...state,
      startupComplete: false,
    }
  },

  [actionTypes.STARTUP_COMPLETE]: (state, action) => {
    return {
      ...state,
      startupComplete: true,
    }
  },

  [actionTypes.SET_UI_MODE]: (state, action) => {
    return {
      ...state,
      mode: action.mode,
    }
  },

  [actionTypes.NETWORK_CHANGE]: (state, action) => {
    return {
      ...state,
      networkConnection: action.connection,
      networkDismissed: action.connection === 'none' ? false : state.dismissed,
    }
  },

  [actionTypes.NETWORK_DISMISS_ALERT]: (state, action) => {
    return {
      ...state,
      networkDismissed: true,
    }
  },

}, initialState)
