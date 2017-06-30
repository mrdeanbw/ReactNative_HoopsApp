import {createSelector} from 'reselect'

const getEventState = (state, id) => state.events.eventsById[id]

export const getEvent = createSelector(
  [getEventState],
  (event) => event
)
