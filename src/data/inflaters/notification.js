
export default (notification, extra) => {
  notification = {...notification};

  if(notification.type === 'FRIEND_REQUEST' && extra.friendRequests) {
    //We need to clone here, to prevent altering state
    notification.friendRequest = {
      ...extra.friendRequests[notification.friendRequestId]
    };

    if(notification.friendRequest && extra.users) {
      notification.friendRequest.from = extra.users[notification.friendRequest.fromId];
    }
  }

  if(notification.type === 'EVENT_REQUEST' && extra.requests) {
    notification.request = {
      ...extra.requests[notification.requestId]
    };

    if(notification.request && extra.users) {
      notification.request.user = extra.users[notification.request.userId];
    }

    if(notification.request && extra.events) {
      notification.request.event = extra.events[notification.request.eventId];
    }
  }

  if(notification.type === 'EVENT_INVITE' && extra.invites) {
    notification.invite = {
      ...extra.invites[notification.inviteId],
    };

    if(notification.invite && extra.users) {
      notification.invite.from = extra.users[notification.invite.fromId];
    }

    if(notification.invite && extra.events) {
      notification.invite.event = extra.events[notification.invite.eventId];
    }
  }

  if(notification.type === 'EVENT_CANCELLED') {
    if(extra.events) {
      notification.event = extra.events[notification.eventId];
    }
  }

  return notification;

};
