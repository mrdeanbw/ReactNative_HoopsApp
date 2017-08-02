import React, {Component} from 'react'
import {Text, ScrollView, View} from 'react-native'

import {Window, Button, Popup, UserListItem, Header} from '../components'
import StyleSheet from '../styles'
import _ from '../i18n'
import Manage from './manage'
import MyEvents from './my-events'

export default class Members extends Component {

  constructor() {
    super()

    this.state = {
      //Set popupOptionsMember to a user object to show options
      popupOptionsMember: null,
    }
  }

  componentWillMount() {
    this._actionListener = this.props.actionButton.addListener('press', () => {
      this.props.onPressInviteMore()
    })
  }

  componentWillUnmount() {
    this._actionListener && this._actionListener.remove()
  }

  static getTabHighlight(props) {
    return Manage
  }

  static getTest(close) {
    return {
      title: 'Members',
      view: Window.Organizer,
      viewProps: { initialTab: Members, onClose: close }
    }
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents
  }

  onPressDisclosure(user, invite) {
    this.setState({
      popupOptionsMember: user,
      popupOptionsInvite: invite,
    })
  }

  onPressViewProfile() {
    let user = this.state.popupOptionsMember
    this.props.onPressUserProfile(user)
    this.setState({
      popupOptionsMember: null,
      popupOptionsInvite: null
    })
  }

  onPressUser(user) {
    this.props.onPressUserProfile(user)
  }

  onPressRemove() {
    const invite = this.state.popupOptionsInvite
    this.props.onPressRemove(invite)
    this.setState({
      popupOptionsMember: null,
      popupOptionsInvite: null
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header simple title={_('members')} />
        <MemberOptions
          visible={!!this.state.popupOptionsMember}
          onClose={() => this.setState({popupOptionsMember: null})}
          onPressViewProfile={this.onPressViewProfile.bind(this)}
          onPressRemove={this.onPressRemove.bind(this)}
        />

        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.requests.length === 0 && this.props.invites.length === 0 && (
            <Text style={StyleSheet.noResults}>{_('noMembers')}</Text>
          )}

          {this.props.requests.map((request) => {
            const user = request.user

            return (
              <UserListItem
                key={user.id}
                user={user}
                onPress={() => this.onPressUser(user)}
                status={request.status}
                onPressDisclosure={() => this.onPressDisclosure(user)}
                paymentMethod={request.paymentMethod}
              />
            )
          })}

          {this.props.invites.map((invite) => {
            const user = invite.user

            return (
              <UserListItem
                key={user.id}
                user={user}
                onPress={() => this.onPressUser(user)}
                status={invite.status}
                onPressDisclosure={() => this.onPressDisclosure(user, invite)}
                paymentMethod={invite.paymentMethod}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

class MemberOptions extends Component {

  render() {
    return (
      <Popup visible={this.props.visible} style={StyleSheet.dialog.optionsMenu} onClose={this.props.onClose}>
        <Button type="alertVertical" text={_('viewProfile')} onPress={this.props.onPressViewProfile} />
        {/*<Button type="alertVertical" text={_('message')} onPress={this.props.onPressMessage} />*/}
        <Button type="alertVertical" text={_('remove')} onPress={this.props.onPressRemove} />
      </Popup>
    )
  }
}

