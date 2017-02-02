import interests from '../config/interests'
import actionTypes from './'

export const load = () => {
  return dispatch => {
    for (const id in interests) {
      interests[id] = {
        ...interests[id],
        id,
      }
    }

    dispatch({
      type: actionTypes.INTERESTS_LOAD_ALL,
      interests,
    })
  }
}
