import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

const initialState = {
  connection: 'unknown',
  dismissed: false,
}

export default handleActions({
  [actionTypes.NETWORK_CHANGE]: (state, action) => {
    return {
      ...state,
      connection: action.connection,
      //If we are losing connection, set dismissed to false
      dismissed: action.connection === 'none' ? false : state.dismissed,
    }
  },

  [actionTypes.NETWORK_DISMISS_ALERT]: (state, action) => {
    return {
      ...state,
      dismissed: true,
    }
  },
}, initialState)
