
export default (user, extra) => {
  user = {...user};

  if(extra.requests) {
    user.requests = Object.keys(user.requests).map(requestId => {
      return extra.requests[requestId];
    });
  }

  if(extra.invites) {
    user.invites = Object.keys(user.invites).map(inviteId => {
      return extra.invites[inviteId];
    });
  }

  return user;
};
