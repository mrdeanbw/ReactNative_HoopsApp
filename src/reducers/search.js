
import {handleActions} from 'redux-actions';

const initialState = {
  eventIds: [],
  userIds: [],
  error: null,
};

export default handleActions({

  SEARCH_START: (state, action) => {
    //action.params
    return state;
  },

  SEARCH_END: (state, action) => {
    if(!action.results) {
      return state;
    }
    return {
      ...state,
      eventIds: action.results.hits.hits.map(hit => hit._id),
      error: null,
    };
  },

  SEARCH_ERROR: (state, action) => {
    return {
      ...state,
      eventIds: [],
      error: action.err,
    };
  },

  SEARCH_USERS_START: (state, action) => {
    return state;
  },

  SEARCH_USERS_END: (state, action) => {
    if(!action.results) {
      return state;
    }
    return {
      ...state,
      userIds: action.results.hits.hits.map(hit => hit._id),
      error: null,
    };
  },

}, initialState);
