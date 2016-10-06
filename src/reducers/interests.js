
import {handleActions} from 'redux-actions';

const initialState = {
  interestsById: {},
};

export default handleActions({
  INTERESTS_LOAD_ALL: (state, action) => {
    return {
      ...state,
      interestsById: action.interests,
    };
  },
}, initialState);

