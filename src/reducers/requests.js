
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

}, initialState);
