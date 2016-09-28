
import {handleActions} from 'redux-actions';

const initialState = {
  requestsById: {},
};

export default handleActions({

  REQUESTS_LOADED: (state, action) => {
    return {
      ...state,
      requestsById: {
        ...state.requestsById,
        ...action.requests,
      },
    };
  },

  REQUEST_DELETED: (state, action) => {
    let requestsById = {...state.requestsById}; //clone
    delete requestsById[action.id];

    return {
      ...state,
      requestsById,
    };
  },

}, initialState);
