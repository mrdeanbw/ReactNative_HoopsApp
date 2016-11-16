
import {handleActions} from 'redux-actions';

import {convertStructure} from './user';

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
};

const initialState = {
  isLoading: false,

  usersById: {},
  all: {},
};

export default handleActions({

  /*
   * when a user logs out, we need to reset all state except for `all`
   */
  USER_LOGGED_OUT: (state, action) => {
    return {
      ...state,
      ...initialState,
      all: state.all,
    };
  },

  USERS_LOAD_ALL: (state, action) => {
    return {
      ...state,
      all: action.users || {},
    };
  },

  USERS_LOAD: (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  },

  USERS_LOADED: (state, action) => {
    let newUsers = {...action.users};
    for(let id in newUsers) {
      newUsers[id] = {
        ...convertStructure({
          ...emptyUserObject,
          ...newUsers[id],
        }),
      };
    }

    return {
      ...state,
      isLoading: false,
      usersById: {
        ...state.usersById,
        ...newUsers,
      },
    };
  },

  USERS_IMAGE_LOADED: (state, action) => {
    let usersById = {...state.usersById};

    for(let id in action.images) {
      if(usersById[id]) {
        usersById[id].imageSrc = action.images[id].imageSrc;
      }
    }

    return {
      ...state,
      usersById: usersById,
    };
  },

}, initialState);
