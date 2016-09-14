
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import _EventInvites from '../windows/event-invites';
console.log("EVENTINV", _EventInvites);

class EventInvites extends React.Component {

  render() {
    let friends = this.props.user.friends.map((friendId) => {
      return this.props.users.usersById[friendId];
    });

    return (
      <_EventInvites
        mode={this.props.user.mode}
        users={friends}
        onSendInvites={(userIds) => {
          //TODO send the invites
        }}
        onViewProfile={(user) => {
          RouterActions.profile({id: user.id});
        }}
      />
    );
  }
}

EventInvites.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
  }),
  (dispatch) => ({
  }),
)(EventInvites);
