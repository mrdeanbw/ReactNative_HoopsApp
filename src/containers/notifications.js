import React from 'react'
import {connect} from 'react-redux'

import {Notifications as _Notifications} from '../windows'
import {navigationActions, notificationActions, requestActions, inviteActions} from '../actions'
import inflateNotification from '../data/inflaters/notification'

class Notifications extends React.Component {

  render() {
    let ids = Object.keys(this.props.notifications.notificationsById)
    let notifications = ids.map(id => {
      return inflateNotification(
        this.props.notifications.notificationsById[id],
        {
          friendRequests: this.props.notifications.friendRequestsById,
          requests: this.props.requests.requestsById,
          invites: this.props.invites.invitesById,
          users: this.props.users.usersById,
          events: this.props.events.eventsById,
        }
      )
    }).filter(notification => !!notification)

    return (
      <_Notifications
        onClose={this.props.onClose}
        onBack={this.props.onBack}
        notifications={notifications}
        onSeen={(notification) => {
          if(!notification.seen) {
            this.props.onMarkSeen(notification.id)
          }
        }}
        onRead={(notification) => {
          if(!notification.read) {
            this.props.onMarkRead(notification.id)
          }
        }}

        onAcceptFriendRequest={this.props.onAcceptFriendRequest}
        onDeclineFriendRequest={this.props.onDeclineFriendRequest}
        onPressUserProfile={(user) => this.props.onNavigate('profile', {id: user.id})}
        onPressEvent={(event) => this.props.onNavigate('eventDetails', {id: event.id})}
        onAcceptEventRequest={this.props.onAcceptEventRequest}
        onDeclineEventRequest={this.props.onDeclineEventRequest}
        onAcceptEventInvite={this.props.onAcceptEventInvite}
        onDeclineEventInvite={this.props.onDeclineEventInvite}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    notifications: state.notifications,
    requests: state.requests,
    invites: state.invites,
    events: state.events,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props})),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onMarkRead: (id) => dispatch(notificationActions.markRead(id)),
    onMarkUnead: (id) => dispatch(notificationActions.markUnread(id)),
    onMarkSeen: (id) => dispatch(notificationActions.markSeen(id)),
    onAcceptFriendRequest: (notification) => {
      dispatch(notificationActions.acceptFriendRequest(notification.friendRequest))
      dispatch(notificationActions.markRead(notification.id))
    },
    onDeclineFriendRequest: (notification) => {
      dispatch(notificationActions.declineFriendRequest(notification.friendRequest))
      dispatch(notificationActions.markRead(notification.id))
    },
    onAcceptEventRequest: (notification) => {
      dispatch(requestActions.allow(notification.request))
      dispatch(notificationActions.markRead(notification.id))
    },
    onDeclineEventRequest: (notification) => {
      dispatch(requestActions.decline(notification.request))
      dispatch(notificationActions.markRead(notification.id))
    },
    onAcceptEventInvite: (notification) => {
      dispatch(inviteActions.accept(notification.invite))
      dispatch(notificationActions.markRead(notification.id))
    },
    onDeclineEventInvite: (notification) => {
      dispatch(inviteActions.decline(notification.invite))
      dispatch(notificationActions.markRead(notification.id))
    },
  }),
)(Notifications)
