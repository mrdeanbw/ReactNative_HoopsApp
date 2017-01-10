import {handleActions} from 'redux-actions';

const initialState = {
  isLoading: false,

  eventsById: {},
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

  EVENTS_LOAD: (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  },

  EVENTS_LOAD_ALL: (state, action) => {
    return {
      ...state,
      all: action.events || {},
    };
  },

  EVENTS_LOADED: (state, action) => {
    return {
      ...state,
      isLoading: false,
      eventsById: {
        ...state.eventsById,
        ...action.events,
      },
    };
  },

  EVENT_REMOVED: (state, action) => {
    let eventsById = state.eventsById;
    delete eventsById[action.id];

    return {
      ...state,
      eventsById,
    };
  },

  EVENT_ADDED: (state, action) => {
    //When we add a new event, get it in the store before firebase can load
    return {
      ...state,
      eventsById: {
        ...state.eventsById,
        [action.eventData.id]: action.eventData,
      },
    };
  },

}, initialState);
