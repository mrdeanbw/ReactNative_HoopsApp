import React from 'react';
import {connect} from 'react-redux';

import {Preferences as _Preferences} from '../windows';
import {navigationActions, userActions} from '../actions';

class Preferences extends React.Component {

  render() {
    return (
      <_Preferences
        onPressLogOut={this.props.onLogOut}
        onPressNotifications={() => this.props.onNavigate('notifications')}
        onPressEditAccount={() => this.props.onNavigate('profileEdit', {}, false)}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onLogOut: () => dispatch(userActions.logOut()),
    onNavigate: (key, props, subTab = true) => dispatch(navigationActions.push({key, props}, subTab)),
  }),
)(Preferences);
