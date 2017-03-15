import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

const initialState = {
  invitesById: {},
}

export default handleActions({

  [actionTypes.INVITES_LOADED]: (state, action) => {
    return {
      ...state,
      invitesById: {
        ...state.invitesById,
        ...action.invites,
      },
    }
  },

  [actionTypes.INVITES_LOAD_ALL]: (state, action) => {
    return {
      invitesById: {
          ...state.invitesById,
          ...action.invites,
        },
      }
  },

}, initialState)
