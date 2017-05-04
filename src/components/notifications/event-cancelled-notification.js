import React, {Component} from 'react'
import {Text} from 'react-native'

import _ from '../../i18n'
import StyleSheet from '../../styles'
import {replaceText} from '../../utils'

import {NotificationPopup} from './'

class EventCancelledNotification extends Component {

  render() {
    let event = this.props.notification.event
    if(!event) {
      return null
    }
    let description = replaceText(
      _('eventCancelledDescription'),
      <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
    )
    return (
      <NotificationPopup
        image={{uri: event.imageSrc}}
        highlight={false}
        title={_('eventCancelled')}
        description={description}
        date={new Date(this.props.notification.date)}
        showOptions={this.props.showOptions}
        onHideOptions={this.props.onHideOptions}
        options={null}
      />
    )
  }
}

export default EventCancelledNotification
