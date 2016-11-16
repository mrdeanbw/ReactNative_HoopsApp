
import {NetInfo} from 'react-native';

export const registerWithStore = () => {
  return dispatch => {
    NetInfo.addEventListener('change', (connection) => {
      dispatch({
        type: 'NETWORK_CHANGE',
        connection,
      });
    });
  };
};

export const dismissAlert = () => ({
  type: 'NETWORK_DISMISS_ALERT',
});
