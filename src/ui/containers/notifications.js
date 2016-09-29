
import React from 'react';
import {connect} from 'react-redux';
import {Notifications as _Notifications} from '../windows';
import {
  navigation as navigationActions,
  user as userActions
} from '../../actions';

class Notifications extends React.Component {

  render() {
    let ids = Object.keys(this.props.notifications.notificationsById);
    let notifications = ids.map(id => {
      return this.props.notifications.notificationsById[id];
    }).filter(notification => !!notification);

    return (
      <_Notifications
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        onClose={this.props.onNavigateBack}
        notifications={notifications}
        onPressNotification={() => {
          //TODO
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    notifications: state.notifications,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onToggleMode: () => dispatch(userActions.toggleMode()),
  }),
)(Notifications);
