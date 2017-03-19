import {handleActions} from 'redux-actions'

import actionTypes from '../actions'
import {convertStructure} from './user'

const emptyUserObject = {
  name: null,
  username: null,
  gender: null,
  dob: null,

  availability: true,
  organizing: {}, //Events that this user organizes
  invites: {},
  requests: {},
  savedEvents: {},
  friends: {},
}

const initialState = {
  isLoading: false,
  usersById: {},
}

export default handleActions({

  /*
   * when a user logs out, we need to reset all state except for `all`
   */
  [actionTypes.USER_LOGGED_OUT]: (state, action) => {
    return {
      ...state,
      ...initialState,
    }
  },

  [actionTypes.USERS_LOAD]: (state, action) => {
    return {
      ...state,
      isLoading: true,
    }
  },

  [actionTypes.USERS_LOADED]: (state, action) => {
    let newUsers = {...action.users}
    for(let id in newUsers) {
      newUsers[id] = {
        id,
        ...convertStructure({
          ...emptyUserObject,
          ...newUsers[id],
        }),
      }
    }

    return {
      ...state,
      isLoading: false,
      usersById: {
        ...state.usersById,
        ...newUsers,
      },
    }
  },

}, initialState)
