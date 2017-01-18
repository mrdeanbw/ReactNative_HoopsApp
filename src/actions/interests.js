import interests from '../config/interests'

export const load = () => {
  return dispatch => {
    for (const id in interests) {
      interests[id] = {
        ...interests[id],
        id,
      }
    }

    dispatch({
      type: 'INTERESTS_LOAD_ALL',
      interests,
    })
  }
}
