
import React from 'react';
import {connect} from 'react-redux';
import _Profile from '../windows/profile';
import {
  user as userActions,
  users as usersActions,
} from '../../actions';

class Profile extends React.Component {
  render() {
    let user = this.props.users.usersById[this.props.id];
    let eventIds = Object.keys(user.organizing);
    let events = eventIds.map((eventId) => {
      return this.props.events.eventsById[eventId];
    }).filter(event => !!event);

    let profile = this.props.users.usersById[this.props.id];
    let isFriend = profile.id in this.props.user.friends;

    let isPending = !!Object.keys(this.props.user.friendRequests).map(requestId => {
      let request = this.props.notifications.friendRequestsById[requestId];
      if(request.status !== 'pending') {
        return;
      }

      if(this.props.user.uid === request.fromId) {
        return request.toId;
      } else if(this.props.user.uid === request.toId) {
        return request.fromId;
      }
    }).find(userId => {
      return userId === this.props.id;
    });

    return (
      <_Profile
        profile={profile}
        isFriend={isFriend}
        isPending={isPending}
        onPressAddFriend={() => this.props.sendFriendRequest(profile)}
        onPressRemoveFriend={() => this.props.removeFriend(profile)}
        me={this.props.user}
        upcoming={events}
        onChangeAvailability={this.props.onChangeAvailability}
      />
    );
  }
}

Profile.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    events: state.events,
    notifications: state.notifications,
  }),
  (dispatch) => ({
    onChangeAvailability: (value) => dispatch(userActions.setAvailability(value)),
    removeFriend: (user) => dispatch(userActions.removeFriend(user)),
    sendFriendRequest: (user) => dispatch(usersActions.sendFriendRequests([user.id])),
  }),
)(Profile);
