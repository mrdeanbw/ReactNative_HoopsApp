import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {FriendsInvite as _FriendsInvite} from '../windows';

import {
  events as eventsActions,
  navigation as navigationActions
} from '../actions';
import inflateEvent from '../data/inflaters/event';

class FriendsInvite extends React.Component {
  render() {
    let events = Object.keys(this.props.user.organizing).map(eventId => {
      return inflateEvent(this.props.events.eventsById[eventId], {
        requests: this.props.requests.requestsById,
        invites: this.props.invites.invitesById,
        users: this.props.users.usersById,
      });
    }).filter(event => !!event).filter(event => {
      return moment(event.date).isAfter();
    }).filter(event => {

      //Filter out users that are already attending
      event.players.forEach(player => {
        if(player.id === this.props.selectedUser.id) {
          return false;
        }
      });

      return true;
    });

    return (
      <_FriendsInvite
        onClose={this.props.onClose}
        user={this.props.selectedUser}
        events={events}
        onPressEvent={(event) => {
          this.props.onInviteUser(this.props.selectedUser, event);
          this.props.onNavigateBack();
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    events: state.events,
    requests: state.requests,
    invites: state.invites,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onInviteUser: (user, event) => {
      dispatch(eventsActions.inviteUsers([user.id], event.id));
    },
  }),
)(FriendsInvite);
