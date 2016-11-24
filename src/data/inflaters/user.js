
export default (user, extra) => {
  if(typeof user !== 'object') {
    return user;
  }
  user = {...user};

  if(extra.requests) {
    user.requests = Object.keys(user.requests).map(requestId => {
      return extra.requests[requestId];
    }).filter(request => request);
  }

  if(extra.invites) {
    user.invites = Object.keys(user.invites).map(inviteId => {
      return extra.invites[inviteId];
    }).filter(invite => invite);
  }

  return user;
};
