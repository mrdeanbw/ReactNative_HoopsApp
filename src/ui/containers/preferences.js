
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {Preferences as _Preferences} from '../windows';
import {user as actions} from '../../actions';

class Preferences extends React.Component {

  render() {
    return (
      <_Preferences
        onPressLogOut={this.props.onLogOut}
        onPressNotifications={() => RouterActions.notifications()}
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
    onLogOut: () => dispatch(actions.logOut()),
  }),
)(Preferences);
