import inflateEvent from '../data/inflaters/event'

export const getUserOrganisedEvents = (user) => (user && user.organizing) || {}

export const formatEvents = (eventIds, events, requests, invites, users) => {
  return eventIds.map(eventId =>
    inflateEvent(events[eventId], {
      requests,
      invites,
      users,
    })
  ).filter(event => !!event)
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
