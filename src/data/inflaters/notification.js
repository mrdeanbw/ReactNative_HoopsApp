
export default (notification, extra) => {
  notification = {...notification};
  
  if(notification.type === 'FRIEND_REQUEST' && extra.friendRequests) {
    notification.friendRequest = extra.friendRequests[notification.friendRequestId];

    if(notification.friendRequest && extra.users) {
      notification.friendRequest.from = extra.users[notification.friendRequest.fromId];
    }
  }

  return notification;
  
}

