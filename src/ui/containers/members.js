
import React from 'react';
import _Members from '../windows/members';
import {connect} from 'react-redux';
import {user, navigation} from '../../actions';

class Members extends React.Component {

  getEvent() {
    return this.props.events.eventsById[this.props.id];
  }

  render() {
    let event = this.getEvent();

    let invites = [];
    if(event.invites){
      invites = Object.keys(event.invites).map((inviteId) => {
        let invite = this.props.invites.invitesById[inviteId];
        return {
          ...invite,
          user: this.props.users.usersById[invite.userId],
        }
      });
    }

    return (
      <_Members
        event={event}
        invites={invites}
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
