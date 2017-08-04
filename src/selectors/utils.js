import moment from 'moment'

import inflateEvent from '../data/inflaters/event'

export const getUserOrganisedEvents = (user) => (user && user.organizing) || {}

export const getUserRequests = (user) => (user && user.requests) || {}

export const getUserSavedEvents = (user) => (user && user.savedEvents) || {}

export const formatEvents = (eventIds, events, requests, invites, users) => {
  return eventIds.map(eventId => {
    const event = inflateEvent(events[eventId], {
      requests,
      invites,
      users,
    })

    return {
      ...event,
      meta: getEventMeta(event)
    }
  }).filter(event => !!event)
}

export const getEventMeta = (event) => {
  const isEnded = moment(event.date).isBefore()
  const isCancelled = event.cancelled || false
  const isDisabled = (isEnded || isCancelled)
  const memberCount = event.requests ? Object.keys(event.requests).length : 0

  return {
    isEnded,
    isCancelled,
    isDisabled,
    memberCount,
  }
}

export const sortEventsByDate = (events) => {
  return events.sort((a, b) => {
    return a.date > b.date ? 1 : -1
  })
}

export const formatSearchEvents = (eventSearchObjects, events, requests, invites, users) => {
  return eventSearchObjects.map(({id, sort}) => {
    const event = inflateEvent(events[id], {
      requests,
      invites,
      users,
    })

    return {
      event: {
        ...event,
        meta: getEventMeta(event),
      },
      distance: sort
    }
  }).filter(item => !!item.event)
}
