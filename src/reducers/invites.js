
import {handleActions} from 'redux-actions';

const initialState = {
  invitesById: {},
};

export default handleActions({

  INVITES_LOADED: (state, action) => {
    return {
      ...state,
      invitesById: {
        ...state.invitesById,
        ...action.invites,
      },
    };
  },

}, initialState);
