import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

const initialState = {
  startupComplete: false,
  mode: null,
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


}, initialState)
