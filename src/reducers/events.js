import {handleActions} from 'redux-actions';

const initialState = {
  isLoading: false,

  eventsById: {},
};

export default handleActions({

  EVENTS_LOAD: (state, action) => {
    return {
      ...state,
      isLoading: true,
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

}, initialState);
