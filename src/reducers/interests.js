import {handleActions} from 'redux-actions'

import actionTypes from '../actions'

const initialState = {}

export default handleActions({
  [actionTypes.INTERESTS_LOAD_ALL]: (state, action) => {
    return {
      ...state,
      ...action.interests,
    }
  },
}, initialState)
