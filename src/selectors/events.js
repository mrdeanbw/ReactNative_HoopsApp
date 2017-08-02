import {createSelector} from 'reselect'

const eventsSelector = (state) => state.events.eventsById
const userSelector = (state) => state.user
const usersSelector = (state) => state.users.usersById

export const eventSelector = createSelector(
  [eventsSelector, (state, eventId) => eventId],
  (events, eventId) => events[eventId]
)

export const eventWithMemberCount = createSelector(
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

export const isEventMember = createSelector(
  [userSelector, eventSelector],
  (user, event) => {
    const userRequests = Object.keys(user.requests || {})
    const eventRequests = Object.keys(event.requests || {})

    const intersection = userRequests.filter(x => eventRequests.indexOf(x) > -1)
    return intersection.length > 0
  }
)

export const isEventSaved = createSelector(
  [userSelector, (state, eventId) => eventId],
  (user, eventId) => {
    try {
      return !!user.savedEvents[eventId]
    } catch(err) {
      return true
    }
  }
)

export const eventOrganizer = createSelector(
  [eventSelector, usersSelector],
  (event, users) => {
    return users[event.organizer]
  }
)

export const isEventOrganizer = createSelector(
  [userSelector, (state, eventId) => eventId],
  (user, eventId) => {
    try {
      return !!user.organizing[eventId]
    } catch(err) {
      return true
    }
  }
)


