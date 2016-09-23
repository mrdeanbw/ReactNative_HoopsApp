
export default (request, extra) => {
  request = {...request}; //clone

  if(extra.users) {
    request.user = extra.users[request.userId];
  }

  if(extra.events) {
    request.event = extra.events[request.eventId];
  }

  return request;
};
