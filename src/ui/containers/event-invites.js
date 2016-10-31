
import React from 'react';
import {connect} from 'react-redux';
import _EventInvites from '../windows/event-invites';
import {navigation, events} from '../../actions';

import inflateEvent from '../../data/inflaters/event';

class EventInvites extends React.Component {

  render() {
    let event = inflateEvent(
      this.props.events.eventsById[this.props.id],
      {
        invites: this.props.invites.invitesById,
        requests: this.props.requests.requestsById,
        users: this.props.users.usersById,
      },
    );

    let invitedUserIds = event.invites.map((invite) => {
      return invite.userId;
    });
    let requestedUserIds = event.requests.map((request) => {
      return request.userId;
    });

    let friends = Object.keys(this.props.user.friends).filter(friendId => {
      //remove from list if user is already invited or requested
      return (
        invitedUserIds.indexOf(friendId) === -1 &&
        requestedUserIds.indexOf(friendId) === -1
      );
    }).map((friendId) => {
      return this.props.users.usersById[friendId];
    });


    return (
      <_EventInvites
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        users={friends}
        onSendInvites={(userIds) => {
          this.props.onSendInvites(userIds, this.props.id);
          this.props.onNavigateBack();
        }}
        onViewProfile={(user) => {
          this.props.onNavigate('profile', {id: user.id});
        }}
        actionButton={this.props.actionButton}
        onChangeAction={this.props.onChangeAction}
      />
    );
  }
}

EventInvites.propTypes = {
  id: React.PropTypes.string.isRequired,
  actionButton: React.PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    events: state.events,
    invites: state.invites,
    requests: state.requests,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props}, true)),
    onNavigateBack: () => dispatch(navigation.pop()),
    onSendInvites: (userIds, eventId) => dispatch(events.inviteUsers(userIds, eventId)),
  }),
)(EventInvites);
