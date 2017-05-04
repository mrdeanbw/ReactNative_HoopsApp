import React, {Component} from 'react'
import {Text} from 'react-native'

import _ from '../../i18n'
import StyleSheet from '../../styles'
import {replaceText} from '../../utils'

import {NotificationPopup} from './'

class EventRequestNotification extends Component {

  render() {
    let user = this.props.notification.request.user
    let event = this.props.notification.request.event
    let status = this.props.notification.request.status

    if(!user || !event || !status) {
      return null
    }

    let description

    let options = [{
      type: "alertVertical",
      text: _('viewProfile'),
      onPress: () => {
        this.props.onPressUserProfile(user)
      }
    },{
      type: "alertVertical",
      text: _('eventDetails'),
      onPress: () => {
        this.props.onPressEvent(event)
      }
    }]

    if(status === 'pending') {
      description = replaceText(
        _('eventRequestPendingDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>,
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
      )
      options = options.concat([{
        type: "alertVerticalGreen",
        text: _('accept'),
        onPress: () => {
          this.props.onAcceptEventRequest(this.props.notification)
        },
      },{
        type: "alertVerticalDefault",
        text: _('decline'),
        onPress: () => {
          this.props.onDeclineEventRequest(this.props.notification)
        },
      }])
    }else if(status === 'declined'){
      description = replaceText(
        _('eventRequestDeclinedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>,
      )
    } else if(status === 'confirmed') {
      description = replaceText(
        _('eventRequestConfirmedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>,
      )
    } else {
      //The status could be 'cancelled'. In which case we just render nothing
      return null
    }

    return (
      <NotificationPopup
        image={{uri: user.imageSrc}}
        highlight={status === 'pending'}
        title={_('eventRequest')}
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

export default EventRequestNotification
