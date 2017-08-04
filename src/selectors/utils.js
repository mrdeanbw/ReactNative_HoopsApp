import inflateEvent from '../data/inflaters/event'
import inflateRequest from '../data/inflaters/event'

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
  return {
    memberCount: event.requests ? Object.keys(event.requests).length : 0
  }
}

export const sortEventsByDate = (events) => {
  return events.sort((a, b) => {
    return a.date > b.date ? 1 : -1
  })
}

export const formatSearchEvents = (eventSearchObjects, events, requests, invites, users) => {
  return eventSearchObjects.map(({id, sort}) => ({
    event: inflateEvent(events[id], {
      requests,
      invites,
      users,
    }),
    distance: sort
  })).filter(item => !!item.event)
}
