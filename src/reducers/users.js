
import {handleActions} from 'redux-actions';

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
    return {
      ...state,
      isLoading: false,
      usersById: {
        ...state.usersById,
        ...action.users,
      },
    };
  },

}, initialState);
