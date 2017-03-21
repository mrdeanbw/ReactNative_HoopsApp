import actionTypes from './'

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
