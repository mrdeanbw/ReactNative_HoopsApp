
import React from 'react';
import _Members from '../windows/members';
import {connect} from 'react-redux';
import {user, navigation} from '../../actions';

import inflateEvent from '../../data/inflaters/event';

class Members extends React.Component {

  render() {
    let event = inflateEvent(
      this.props.events.eventsById[this.props.id],
      {
        invites: this.props.invites.invitesById,
        users: this.props.users.usersById,
      }
    );

    return (
      <_Members
        event={event}
        invites={event.invites}
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        onPressBack={() => {
          this.props.onNavigateBack();
        }}
        onPressUserProfile={(user) => {
          this.props.onNavigate('profile', {id: user.id});
        }}
        onPressInviteMore={() => {
          this.props.onNavigate('eventInvites', {id: event.id});
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
    invites: state.invites,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigation.pop()),
    onNavigate: (key, props) => dispatch(navigation.push({key, props}, true)),
    onToggleMode: () => dispatch(user.toggleMode()),
  }),
)(Members);
