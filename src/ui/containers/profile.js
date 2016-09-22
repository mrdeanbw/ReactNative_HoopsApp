
import React from 'react';
import {connect} from 'react-redux';
import _Profile from '../windows/profile';
import {user as actions} from '../../actions';

class Profile extends React.Component {
  render() {
    let user = this.props.users.usersById[this.props.id];
    let eventIds = Object.keys(user.organizing);
    let events = eventIds.map((eventId) => {
      return this.props.events.eventsById[eventId];
    }).filter(event => !!event.id);

    return (
      <_Profile
        profile={this.props.users.usersById[this.props.id]}
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
  }),
  (dispatch) => ({
    onChangeAvailability: (value) => dispatch(actions.setAvailability(value)),
  }),
)(Profile);
