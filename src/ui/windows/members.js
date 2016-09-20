
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
  }

  onPressUser(user) {
    this.props.onPressUserProfile(user);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={(
            <Button
              type="dialogGreen"
              icon="plus"
              text={_('inviteMore')}
              onPress={this.onPressInviteMore.bind(this)}
            />
          )}
          mode={this.props.mode}
          onToggleMode={this.props.onToggleMode}
        />
        <MemberOptions
          visible={!!this.state.popupOptionsMember}
          onClose={() => this.setState({popupOptionsMember: null})}
          onPressViewProfile={this.onPressViewProfile.bind(this)}
        />
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.invites.map((invite) => {
            let user = invite.user;
            if(!user) {
              return null;
            }

            return (
              <UserListItem
                key={user.id}
                onPress={() => this.onPressUser(user)}
                avatar={StyleSheet.images[user.avatar]}
                firstName={user.name}
                lastName={user.name}
                location={user.location}
                dob={user.dob}
                status={invite.status}
                onPressDisclosure={() => this.onPressDisclosure(user)}
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

