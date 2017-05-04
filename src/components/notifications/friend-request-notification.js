import React, {Component} from 'react'
import {Text} from 'react-native'

import _ from '../../i18n'
import StyleSheet from '../../styles'
import {replaceText} from '../../utils'

import {NotificationPopup} from './'

class FriendRequestNotification extends Component {

  render() {
    let user = this.props.notification.friendRequest.from
    let status = this.props.notification.friendRequest.status

    if(!user || !status) {
      return null
    }

    let description
    let options = [{
      type: "alertVertical",
      text: _('viewProfile'),
      onPress: () => {
        this.props.onPressUserProfile(this.props.notification.friendRequest.from)
      }
    }]

    if(status === 'pending') {
      description = replaceText(
        _('friendRequestPendingDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      )

      //Accept and Decline options are only available for 'pending' requests.
      options = options.concat([{
        type: "alertVerticalGreen",
        text: _('accept'),
        onPress: () => {
          this.props.onAcceptFriendRequest(this.props.notification)
        },
      },{
        type: "alertVerticalDefault",
        text: _('decline'),
        onPress: () => {
          this.props.onDeclineFriendRequest(this.props.notification)
        },
      }])
    } else if(status === 'declined') {
      description = replaceText(
        _('friendRequestDeclinedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      )
    } else if(status === 'confirmed') {
      description = replaceText(
        _('friendRequestConfirmedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      )
    }

    return (
      <NotificationPopup
        image={{uri: user.imageSrc}}
        highlight={status === 'pending'}
        title={_('friendRequest')}
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

export default FriendRequestNotification
