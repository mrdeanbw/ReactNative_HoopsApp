
import {handleActions} from 'redux-actions'

const initialState = {
  invitesById: {},
}

export default handleActions({

  INVITES_LOADED: (state, action) => {
    return {
      ...state,
      invitesById: {
        ...state.invitesById,
        ...action.invites,
      },
    }
  },

  INVITES_LOAD_ALL: (state, action) => {
    return {
    invitesById: {
        ...state.invitesById,
        ...action.invites,
      },
    }
  },

}, initialState)
