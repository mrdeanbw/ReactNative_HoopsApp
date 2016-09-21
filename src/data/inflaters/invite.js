
export default (invite, extra) => {
  invite = {...invite}; //clone

  if(extra.users) {
    invite.user = extra.users[invite.userId];
  }

  return invite;
}
