import {createSelector} from 'reselect'

const getEventState = (state, id) => state.events.eventsById[id]

export const getEventFactory = () => createSelector(
  [getEventState],
  (event) => event
)
