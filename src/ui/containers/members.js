
import React from 'react';
import _Members from '../windows/members';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import * as actions from '../../actions';

class Members extends React.Component {

  getEvent() {
    return this.props.events.eventsById[this.props.id];
  }

  render() {
    let event = this.getEvent();

    let invites = event.invites.map((invite) => {
      return {
        user: this.props.users.usersById[invite.user],
        status: invite.status,
      };
    });

    return (
      <_Members
        event={event}
        invites={invites}
        mode={this.props.user.mode}
        onPressBack={() => {
          RouterActions.pop();
        }}
        onPressUserProfile={(user) => {
          RouterActions.profile({id: user.id});
        }}
        onPressInviteMore={() => {
          RouterActions.eventInvites({id: event.id})
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
  }),
  (dispatch) => ({
  }),
)(Members);
