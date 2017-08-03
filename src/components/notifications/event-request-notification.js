import React, {Component} from 'react'
import {Text} from 'react-native'

import _ from '../../i18n'
import StyleSheet from '../../styles'
import {replaceText} from '../../utils'
import {NotificationPopup} from './'

class EventRequestNotification extends Component {

  render() {
    const user = this.props.notification.request.user
    const event = this.props.notification.request.event
    const status = this.props.notification.request.status

    if (!user || !event || !status) {
      return null
    }

    const options = [{
      type: 'alertVertical',
      text: _('viewProfile'),
      onPress: () => {
        this.props.onPressUserProfile(user)
      }
    }, {
      type: 'alertVertical',
      text: _('eventDetails'),
      onPress: () => {
        this.props.onPressEvent(event)
      }
    }]

    const description = replaceText(
      _('eventRequestConfirmedDescription'),
      <Text style={StyleSheet.notification.highlight}>{user.name}</Text>,
    )

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
