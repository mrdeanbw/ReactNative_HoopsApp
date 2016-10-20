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

  EVENTS_GOOGLE_PLACE_START: (state, action) => {
    return {
      ...state,
      eventsById: {
        ...state.eventsById,
        [action.id]: {
          ...state.eventsById[action.id],
          addressGoogleLoading: true,
        },
      },
    };
  },

  EVENTS_GOOGLE_PLACE_SUCCESS: (state, action) => {
    eventsById = {
      ...state.eventsById,
      [action.id]: {
        ...state.eventsById[action.id],
        addressGooglePlace: action.result,
        addressGoogleLoading: false,
      },
    };

    return {
      ...state,
      eventsById,
    };
  },

  EVENTS_GOOGLE_PLACE_ERROR: (state, action) => {
    return {
      ...state,
      eventsById: {
        ...state.eventsById,
        [action.id]: {
          ...state.eventsById[action.id],
          addressGoogleLoading: false,
          addressGoogleError: action.err,
        },
      },
    };
  },


}, initialState);
