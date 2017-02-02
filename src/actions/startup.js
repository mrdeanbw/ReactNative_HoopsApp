import actionTypes, {
  userActions, interestActions, usersActions,
  eventActions, networkActions, inviteActions
} from './'

export const startup = (email, password) => {
  return (dispatch) => {
    dispatch({type: actionTypes.STARTUP})

    dispatch(userActions.registerWithStore())
    dispatch(interestActions.load())
    dispatch(networkActions.registerWithStore())

    /**
     * For now, we download all user and event data.
     * This is a short term solution, eventually some kind of search engine will
     * be connected to for looking up this data.
     */
    dispatch(usersActions.getAll())
    dispatch(eventActions.getAll())
    dispatch(inviteActions.getAll())
  }
}
