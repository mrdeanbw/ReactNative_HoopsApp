import {handleActions} from 'redux-actions'

const initialState = {}

export default handleActions({
  INTERESTS_LOAD_ALL: (state, action) => {
    return {
      ...state,
      ...action.interests,
    }
  },
}, initialState)
