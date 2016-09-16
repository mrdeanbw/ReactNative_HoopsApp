
import React from 'react';
import {connect} from 'react-redux';
import {Preferences as _Preferences} from '../windows';
import {navigation, user} from '../../actions';

class Preferences extends React.Component {

  render() {
    return (
      <_Preferences
        onPressLogOut={this.props.onLogOut}
        onPressNotifications={() => this.props.onNavigate('notifications')}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    events: state.events,
  }),
  (dispatch) => ({
    onLogOut: () => dispatch(user.logOut()),
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
  }),
)(Preferences);
