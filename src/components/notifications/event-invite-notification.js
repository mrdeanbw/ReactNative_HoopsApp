import React, {Component} from 'react'
import {Text} from 'react-native'

import _ from '../../i18n'
import StyleSheet from '../../styles'
import {replaceText} from '../../utils'

import {NotificationPopup} from './'

class EventInviteNotification extends Component {

  getDescription(event, status) {
    let description

    if (status === 'pending') {
      description = replaceText(
        _('eventInvitePendingDescription'),
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
      )
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
    }

    return description
  }

  getOptions(user, event, status) {
    let options = [{
      type: 'alertVertical',
      text: _('eventDetails'),
      onPress: () => {
        this.props.onPressEvent(event)
      }
    }]

    if (status === 'pending') {
      const acceptText = event.entryFee === 0 ? _('accept') : `${_('accept')} £${event.entryFee} (+50p)`

      options = options.concat([{
        type: 'alertVerticalGreen',
        text: acceptText,
        onPress: () => this.props.onAcceptEventInvite(this.props.notification)
      },{
        type: 'alertVerticalDefault',
        text: _('decline'),
        onPress: () => this.props.onDeclineEventInvite(this.props.notification)
      }])
    }

    return options
  }

  render() {
    const notification = this.props.notification
    let user = notification.invite.from
    let event = notification.invite.event
    let status = notification.invite.status

    if (!user || !event || !status) {
      return null
    }

    const options = this.getOptions(user, event, status)
    const description = this.getDescription(event, status)

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
