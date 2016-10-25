
import React from 'react';
import {connect} from 'react-redux';
import {Notifications as _Notifications} from '../windows';
import {
  navigation as navigationActions,
  user as userActions,
  notifications as notificationsActions,
  requests as requestsActions,
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
          requests: this.props.requests.requestsById,
          users: this.props.users.usersById,
          events: this.props.events.eventsById,
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

        onAcceptFriendRequest={this.props.onAcceptFriendRequest}
        onDeclineFriendRequest={this.props.onDeclineFriendRequest}
        onPressUserProfile={(user) => this.props.onNavigate('profile', {id: user.id})}
        onPressEvent={(event) => this.props.onNavigate('eventDetails', {id: event.id})}
        onAcceptEventRequest={this.props.onAcceptEventRequest}
        onDeclineEventRequest={this.props.onDeclineEventRequest}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    notifications: state.notifications,
    requests: state.requests,
    events: state.events,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props})),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onToggleMode: () => dispatch(userActions.toggleMode()),
    onMarkRead: (id) => dispatch(notificationsActions.markRead(id)),
    onMarkUnead: (id) => dispatch(notificationsActions.markUnread(id)),
    onAcceptFriendRequest: (notification) => {
      dispatch(notificationsActions.acceptFriendRequest(notification.friendRequest));
      dispatch(notificationsActions.markRead(notification.id));
    },
    onDeclineFriendRequest: (notification) => {
      dispatch(notificationsActions.declineFriendRequest(notification.friendRequest));
      dispatch(notificationsActions.markRead(notification.id));
    },
    onAcceptEventRequest: (notification) => {
      dispatch(requestsActions.allow(notification.request));
      dispatch(notificationsActions.markRead(notification.id));
    },
    onDeclineEventRequest: (notification) => {
      dispatch(requestsActions.decline(notification.request));
      dispatch(notificationsActions.markRead(notification.id));
    },
  }),
)(Notifications);
