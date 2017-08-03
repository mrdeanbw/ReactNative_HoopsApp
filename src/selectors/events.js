import {createSelector} from 'reselect'
import moment from 'moment'

import {invitesSelector} from './invites'
import {requestsSelector} from './requests'
import {searchNearbyEventsSelector} from './search'
import {userSelector} from './user'
import {usersSelector} from './users'

import {
  formatEvents, sortEventsByDate,
  formatSearchEvents, getUserOrganisedEvents
} from './utils'

export const eventsSelector = (state) => state.events.eventsById

export const eventSelector = createSelector(
  [eventsSelector, (state, eventId) => eventId],
  (events, eventId) => events[eventId]
)

export const eventWithMemberCountSelector = createSelector(
  [eventSelector],
  (event) => {
    return {
      ...event,
      meta: {
        'memberCount': event.requests ? Object.keys(event.requests).length : 0
      }
    }
  }
)

export const userOrganisedEventsSelector = createSelector(
  [userSelector],
  (user) => {
    const events = getUserOrganisedEvents(user)
    return Object.keys(events)
  }
)

export const organisedEventsSelector = createSelector(
  [
    userOrganisedEventsSelector,
    eventsSelector,
    requestsSelector,
    invitesSelector,
    usersSelector,
  ],
  formatEvents
)


export const activeOrganisedEventsSelector = createSelector(
  [organisedEventsSelector],
  (events) => events
    .filter((event) => !event.cancelled)
    .filter((event) => moment(event.date).isAfter())
)

export const activeOrganisedEventsSortedSelector = createSelector(
  [activeOrganisedEventsSelector],
  sortEventsByDate,
)

export const nearbySearchEventsSelector = createSelector(
  [
    searchNearbyEventsSelector,
    eventsSelector,
    requestsSelector,
    invitesSelector,
    usersSelector,
  ],
  formatSearchEvents
)

export const activeNearbySearchEventsSelector = createSelector(
  [nearbySearchEventsSelector],
  (events) => events
    .filter(item => item.event.privacy === 'public')
    .filter(item => !item.event.cancelled)
)
