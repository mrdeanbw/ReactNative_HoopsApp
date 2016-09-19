
import React from 'react';
import {connect} from 'react-redux';
import _Profile from '../windows/profile';
import {user as actions} from '../../actions';

class Profile extends React.Component {
  render() {
    return (
      <_Profile
        profile={this.props.users.usersById[this.props.id]}
        me={this.props.user}
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