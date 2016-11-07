
import {handleActions} from 'redux-actions';

const initialState = {
  eventIds: [],
  userIds: [],
  nearby: [],
  general: {
    userIds: [],
    eventIds: [],
  },
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

  SEARCH_GENERAL: (state, action) => {
    return {
      ...state,
      general: {
        eventIds: action.events.map(event => event.id),
        userIds: action.users.map(user => user.id),
      },
    };
  },

  SEARCH_NEARBY_START: (state, action) => {
    return state;
  },

  SEARCH_NEARBY_END: (state, action) => {
    if(!action.results) {
      return state;
    }
    return {
      ...state,
      nearby: action.results.hits.hits.map(hit => ({id: hit._id, sort: hit.sort[0]})),
      error: null,
    };
  },

  SEARCH_NEARBY_ERROR: (state, action) => {
    return {
      ...state,
      nearby: [],
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
