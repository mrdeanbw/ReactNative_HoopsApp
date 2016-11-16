
import {handleActions} from 'redux-actions';

const initialState = {
  connection: 'unknown',
  dismissed: false,
};

export default handleActions({
  NETWORK_CHANGE: (state, action) => {
    return {
      ...state,
      connection: action.connection,
      //If we are losing connection, set dismissed to false
      dismissed: action.connection === 'none' ? false : state.dismissed,
    };
  },

  NETWORK_DISMISS_ALERT: (state, action) => {
    return {
      ...state,
      dismissed: true,
    };
  },
}, initialState);
