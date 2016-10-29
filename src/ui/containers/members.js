
import React from 'react';
import _Members from '../windows/members';
import {connect} from 'react-redux';
import {
  user as userActions,
  navigation as navigationActions
} from '../../actions';

import inflateEvent from '../../data/inflaters/event';

class Members extends React.Component {

  render() {
    let event = inflateEvent(
      this.props.events.eventsById[this.props.id],
      {
        invites: this.props.invites.invitesById,
        requests: this.props.requests.requestsById,
        users: this.props.users.usersById,
      }
    );

    let invites = event.invites.filter(invite => invite && invite.user);
    let requests = event.requests.filter(request => request && request.user);

    return (
      <_Members
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        event={event}
        requests={requests}
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
    requests: state.requests,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onToggleMode: () => dispatch(userActions.toggleMode()),
  }),
)(Members);
