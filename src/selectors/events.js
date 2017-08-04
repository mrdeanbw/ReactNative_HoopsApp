import {createSelector} from 'reselect'
import moment from 'moment'

import {invitesSelector} from './invites'
import {requestsSelector} from './requests'
import {searchNearbyEventsSelector} from './search'
import {userSelector} from './user'
import {usersSelector} from './users'

import {
  formatEvents, sortEventsByDate,
  formatSearchEvents, getUserOrganisedEvents,
  getEventMeta, getUserRequests,
  getUserSavedEvents
} from './utils'

export const eventsSelector = (state) => state.events.eventsById

export const eventSelector = createSelector(
  [eventsSelector, (state, eventId) => eventId],
  (events, eventId) => {
    const event = events[eventId]
    return {
      ...event,
      meta: getEventMeta(event),
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

export const userRequestEventsSelector = createSelector(
  [
    userSelector,
    eventsSelector,
    requestsSelector,
    invitesSelector,
    usersSelector,
  ],
  (user, events, requests, invites, users) => {
    const requestIds = Object.keys(getUserRequests(user))
    const eventIds = requestIds.map((requestId) => requests[requestId]['eventId'])

    return formatEvents(eventIds, events, requests, invites, users)
  }
)

export const activeUserRequestEventsSelector = createSelector(
  [userRequestEventsSelector],
  (events) => {
    return events
      .filter((event) => !event.cancelled)
      .filter((event) => moment(event.date).isAfter())
  }
)

export const historicRequestEventsSelector = createSelector(
  [userRequestEventsSelector],
  (events) => events
    .filter((event) => !event.cancelled)
    .filter((event) => moment(event.date).isBefore())
)

export const userSavedEventsSelector = createSelector(
  [
    userSelector,
    eventsSelector,
    requestsSelector,
    invitesSelector,
    usersSelector,
  ],
  (user, events, requests, invites, users) => {
    const eventIds = Object.keys(getUserSavedEvents(user))
    return formatEvents(eventIds, events, requests, invites, users)
  }
)
