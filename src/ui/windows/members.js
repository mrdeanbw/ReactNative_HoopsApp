
import _ from '../i18n';
import React from 'react';
import {ScrollView, View} from 'react-native';

import MyEvents from './my-events';

import {Window, Button, Popup, UserListItem, Header} from '../components';
import StyleSheet from '../styles';
import Manage from './manage';

export default class Members extends React.Component {

  constructor() {
    super();

    this.state = {
      //Set popupOptionsMember to a user object to show options
      popupOptionsMember: null,
    };
  }

  static getTabHighlight(props) {
    return Manage;
  }

  static getTest(close) {
    return {
      title: 'Members',
      view: Window.Organizer,
      viewProps: { initialTab: Members, onClose: close }
    };
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents;
  }

  onPressInviteMore() {
    this.props.onPressInviteMore();
  }

  onPressDisclosure(user) {
    this.setState({
      popupOptionsMember: user,
    });
  }

  onPressViewProfile() {
    let user = this.state.popupOptionsMember;
    this.props.onPressUserProfile(user);
    this.setState({
      popupOptionsMember: null,
    });
  }

  onPressUser(user) {
    this.props.onPressUserProfile(user);
  }

  render() {
    let isEmpty = this.props.requests.length + this.props.invites.length === 0;

    return (
      <View style={{flex: 1}}>
        <Header
          onBack={this.props.onBack}
          onClose={this.props.onClose}
        />
        <MemberOptions
          visible={!!this.state.popupOptionsMember}
          onClose={() => this.setState({popupOptionsMember: null})}
          onPressViewProfile={this.onPressViewProfile.bind(this)}
        />
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.requests.map((request) => {
            let user = request.user;
            if(request.status !== 'confirmed'){
              return null;
            }
            return (
              <UserListItem
                key={user.id}
                user={user}
                onPress={() => this.onPressUser(user)}
                status={request.status}
                onPressDisclosure={() => this.onPressDisclosure(user)}
                paymentMethod={request.paymentMethod}
              />
            );
          })}
          {this.props.invites.map((invite) => {
            let user = invite.user;
            return (
              <UserListItem
                key={user.id}
                user={user}
                onPress={() => this.onPressUser(user)}
                status={invite.status}
                onPressDisclosure={() => this.onPressDisclosure(user)}
                paymentMethod={invite.paymentMethod}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

class MemberOptions extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible} style={StyleSheet.dialog.optionsMenu} onClose={this.props.onClose}>
        <Button type="alertVertical" text={_('viewProfile')} onPress={this.props.onPressViewProfile} />
        <Button type="alertVertical" text={_('message')} onPress={this.props.onPressMessage} />
        <Button type="alertVerticalDefault" text={_('remove')} onPress={this.props.onPressRemove} />
      </Popup>
    );
  }
}

