
import React from 'react';
import {connect} from 'react-redux';
import _Profile from '../windows/profile';
import {
  user as userActions
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

    return (
      <_Profile
        profile={profile}
        isFriend={isFriend}
        onPressAddFriend={() => {
          if(isFriend) {
            this.props.removeFriend(profile);
          } else {
            this.props.addFriend(profile);
          }
        }}
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
  }),
  (dispatch) => ({
    onChangeAvailability: (value) => dispatch(userActions.setAvailability(value)),
    removeFriend: (user) => dispatch(userActions.removeFriend(user)),
    addFriend: (user) => dispatch(userActions.addFriend(user)),
  }),
)(Profile);
