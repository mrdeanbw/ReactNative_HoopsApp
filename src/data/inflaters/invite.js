
export default (invite, extra) => {
  invite = {...invite}; //clone

  if(extra.users) {
    invite.user = extra.users[invite.userId];
  }

  if(extra.events) {
    invite.event = extra.events[invite.eventId];
  }

  return invite;
};
