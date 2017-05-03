import {NetInfo} from 'react-native'

import actionTypes, {
  userActions, interestActions, usersActions,
  eventActions, inviteActions
} from './'


export const setMode = (mode) => ({
  type: actionTypes.SET_UI_MODE,
  mode,
})

export const toggleMode = () => {
  return (dispatch, getState) => {
    let currentMode = getState().app.mode
    let nextMode = currentMode === 'ORGANIZE' ? 'PARTICIPATE' : 'ORGANIZE'
    dispatch(setMode(nextMode))
  }
}

export const networkRegisterWithStore = () => {
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

export const startup = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.STARTUP_BEGIN
    })

    Promise.all([
      dispatch(userActions.registerWithStore()),
      dispatch(interestActions.load()),
      dispatch(networkRegisterWithStore()),
      dispatch(inviteActions.registerWithStore()),
      dispatch(usersActions.registerWithStore()),
      dispatch(eventActions.registerWithStore()),

      /**
       * For now, we download all user and event data.
       * This is a short term solution, eventually some kind of search engine will
       * be connected to for looking up this data.
       */
      dispatch(usersActions.getAll()),
      dispatch(eventActions.getAll()),
      dispatch(inviteActions.getAll()),

    ]).then(() => {
      dispatch({
        type: actionTypes.STARTUP_COMPLETE
      })
    })
  }
}
