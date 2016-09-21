
import inflateInvite from './invite';

/**
 *
 * Inflate event data for use within the UI
 * The event object is stored in the database with a list of invite ids. We usually
 * want to access an invite array as a property of an event.
 *
 * We can also inflate the invite so that event.invites[i].user gives a user object
 *
 * @param event {Object} - an event
 * @param extra {Object} - data to inflate into the event
 * @param extra.invites {Object} - Invites to inflate into the event
 */
export default (event, extra) => {
  event = {...event}; //clone

  if(extra.invites) {
    event.invites = Object.keys(event.invites || {}).map(inviteId => {

      let invite = extra.invites[inviteId];
      if(extra.users){
        //If users are defined, inflate the invite
        invite = inflateInvite(invite, {users: extra.users});
      }
      return invite;

    });
  }

  return event;
}
