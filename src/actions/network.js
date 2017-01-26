import {NetInfo} from 'react-native'

import actionTypes from './'

export const registerWithStore = () => {
  return dispatch => {
    NetInfo.addEventListener('change', (connection) => {
      dispatch({
        type: actionTypes.NETWORK_CHANGE,
        connection,
      })
    })
  }
}

export const dismissAlert = () => ({
  type: actionTypes.NETWORK_DISMISS_ALERT,
})
