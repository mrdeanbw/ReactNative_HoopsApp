import React, {Component} from 'react'
import {Text} from 'react-native'

import _ from '../../i18n'
import StyleSheet from '../../styles'
import {replaceText} from '../../utils'

import {NotificationPopup} from './'

class EventInviteNotification extends Component {

  render() {
    let user = this.props.notification.invite.from
    let event = this.props.notification.invite.event
    let status = this.props.notification.invite.status

    if(!user || !event || !status) {
      return null
    }

    let description = replaceText(
      _('eventCancelledDescription'),
      <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
    )

    let options = [{
      type: "alertVertical",
      text: _('eventDetails'),
      onPress: () => {
        this.props.onPressEvent(event)
      }
    }]

    if(status === 'pending') {
      description = replaceText(
        _('eventInvitePendingDescription'),
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
      )
      options = options.concat([{
        type: "alertVerticalGreen",
        text: _('accept'),
        onPress: () => {
          this.props.onAcceptEventInvite(this.props.notification)
        },
      },{
        type: "alertVerticalDefault",
        text: _('decline'),
        onPress: () => {
          this.props.onDeclineEventInvite(this.props.notification)
        },
      }])
    } else if(status === 'declined') {
      description = replaceText(
        _('eventInviteDeclinedDescription'),
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>,
      )
    } else if(status === 'confirmed') {
      description = replaceText(
        _('eventInviteConfirmedDescription'),
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>,
      )
    } else {
      //The status could be 'cancelled'. In which case we just render nothing
      return null
    }

    return (
      <NotificationPopup
        image={{uri: event.image}}
        highlight={status === 'pending'}
        title={_('eventInvite')}
        description={description}
        date={new Date(this.props.notification.date)}
        onPress={this.props.onPress}
        showOptions={this.props.showOptions}
        onHideOptions={this.props.onHideOptions}
        options={options}
      />
    )
  }
}

export default EventInviteNotification
