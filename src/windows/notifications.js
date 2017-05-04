import React, {Component} from 'react'
import {View, Text, ListView} from 'react-native'

import {Header} from '../components'
import StyleSheet from '../styles'
import _ from '../i18n'
import {
  FriendRequestNotification, EventRequestNotification,
  EventCancelledNotification, EventInviteNotification
} from '../components/notifications'

/*
 * A map of notification types to row component
 */
class Notifications extends Component {

  constructor(props) {
    super(props)

    this._dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      optionsPopupIndex: null,
      dataSource: this._dataSource.cloneWithRows(this.sortNotifications(props.notifications)),
    }

    this.ComponentMap = {
      FRIEND_REQUEST: FriendRequestNotification,
      EVENT_REQUEST: EventRequestNotification,
      EVENT_CANCELLED: EventCancelledNotification,
      EVENT_INVITE: EventInviteNotification,
    }
  }

  sortNotifications(notfications) {
    return notfications.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }

  /*
   * Mark any notifications that are seen as 'read'
   */
  componentDidMount() {
    this.props.notifications.map((notification) => {
      this.props.onSeen(notification)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this._dataSource.cloneWithRows(
        this.sortNotifications(nextProps.notifications)),
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('notifications')}
          onBack={this.props.onBack}
          onClose={this.props.onClose}
        />

        {this.props.notifications.length === 0 && (
          <Text style={StyleSheet.noResults}>{_('noNotifications')}</Text>
        )}

        <ListView
          contentContainerStyle={StyleSheet.container}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData, sectionId, rowId) => {
            let NotificationComponent = this.ComponentMap[rowData.type]
            return (
              <NotificationComponent
                key={rowData.id}
                notification={rowData}
                onHideOptions={() => {
                  this.setState({optionsPopupIndex: null})
                }}
                onPress={() => {
                  this.setState({
                    dataSource: this._dataSource.cloneWithRows(
                      this.sortNotifications(this.props.notifications)),
                  })

                  return this.setState({optionsPopupIndex: rowId})}
                }
                onRead={() => this.props.onRead(rowData)}
                showOptions={this.state.optionsPopupIndex === rowId}
                onAcceptFriendRequest={this.props.onAcceptFriendRequest}
                onDeclineFriendRequest={this.props.onDeclineFriendRequest}
                onPressUserProfile={this.props.onPressUserProfile}
                onPressEvent={this.props.onPressEvent}
                onAcceptEventRequest={this.props.onAcceptEventRequest}
                onDeclineEventRequest={this.props.onDeclineEventRequest}
                onAcceptEventInvite={this.props.onAcceptEventInvite}
                onDeclineEventInvite={this.props.onDeclineEventInvite}
              />
            )
          }}
        />
      </View>
    )
  }
}

export default Notifications
