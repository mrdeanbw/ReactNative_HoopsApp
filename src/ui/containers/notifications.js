
import React from 'react';
import {connect} from 'react-redux';
import {Notifications as _Notifications} from '../windows';
import {
  navigation as navigationActions,
  user as userActions,
  notifications as notificationsActions,
} from '../../actions';

import inflateNotification from '../../data/inflaters/notification';

class Notifications extends React.Component {

  render() {
    let ids = Object.keys(this.props.notifications.notificationsById);
    let notifications = ids.map(id => {
      return inflateNotification(
        this.props.notifications.notificationsById[id],
        {
          friendRequests: this.props.notifications.friendRequestsById,
          users: this.props.users.usersById,
        }
      );
    }).filter(notification => !!notification);

    return (
      <_Notifications
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        onClose={this.props.onNavigateBack}
        notifications={notifications}
        onPressNotification={(notification) => {
          if(!notification.read) {
            this.props.onMarkRead(notification.id);
          }
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    notifications: state.notifications,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onToggleMode: () => dispatch(userActions.toggleMode()),
    onMarkRead: (id) => dispatch(notificationsActions.markRead(id)),
    onMarkUnead: (id) => dispatch(notificationsActions.markUnread(id)),
  }),
)(Notifications);
