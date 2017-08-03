import {createSelector} from 'reselect'

import inflateEvent from '../data/inflaters/event'
import {eventsSelector} from './events'

export const userSelector = (state) => state.user
export const usersSelector = (state) => state.users.usersById
export const modeSelector = (state) => state.app.mode
export const requestsSelector = (state) => state.requests.requestsById
export const invitesSelector = (state) => state.invites.invitesById

const getUserOrganisedEvents = (user) => (user && user.organizing) || []

export const userOrganisedEventsSelector = createSelector(
  [userSelector],
  getUserOrganisedEvents
)

export const formattedEventsSelector = createSelector(
  [
    userOrganisedEventsSelector,
    eventsSelector,
    requestsSelector,
    invitesSelector,
    usersSelector,
  ],
  (userOrganisedEventsById, eventsById, requestsById, invitesById, usersById) => {
    return Object.keys(userOrganisedEventsById).map(eventId =>
      inflateEvent(eventsById[eventId], {
        requests: requestsById,
        invites: invitesById,
        users: usersById,
      })
    ).filter(event => !!event)
  }
)

// const selectedFilterSelector = 'cancelled'
// export const filteredEventsSelector = createSelector(
//   [formattedEventsSelector, selectedFilterSelector],
//   (events, filter) => events.filter(event => event.status !== filter)
// )
