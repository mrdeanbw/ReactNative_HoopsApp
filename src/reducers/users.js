
import {handleActions} from 'redux-actions';

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
};

export default handleActions({

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
        ...emptyUserObject,
        ...newUsers[id],
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

}, initialState);
