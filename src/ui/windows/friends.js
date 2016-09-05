
import _ from '../i18n';
import React from 'react';
import {View,Text,ScrollView} from 'react-native';

import MyEvents from './my-events';

import {Window, Button, Dialog, UserListItem, TextInput} from '../components';
import StyleSheet from '../styles';
import UserData from '../../data/users.json';
import Manage from './manage';
import Profile from './profile';
import Home from './home';

export default class Friends extends React.Component {

  static getTest(close) {
    return {
      title: 'Friends',
      view: Window.Participant,
      viewProps: { initialTab: Friends, onClose: close }
    };
  }

  static getTitle(props) {
    return _('friends');
  }

  static getActionButton(props) {
    return <Button type="actionDefault" icon="actionSearch" text={_('search')} onPress={this.prototype.onPressSearch} />;
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = Home;
  }

  onPressUser = (user) => {
    this.props.window.showModal(<Dialog popup={true} style={StyleSheet.dialog.optionsMenu}>
      <Button type="alertVertical" text={_('inviteToAnEvent')} onPress={() => this.onPressInvite(user)} />
      <Button type="alertVertical" text={_('message')} onPress={() => this.onPressMessage(user)} />
      <Button type="alertVerticalDefault" text={_('remove')} onPress={() => this.onPressRemove(user)} />
    </Dialog>);
  };

  onPressInvite = (user) => {
    this.props.window.hideModal();
  };

  onPressMessage = (user) => {
    this.props.window.hideModal();
  };

  onPressRemove = (user) => {
    this.props.window.hideModal();
  };

  render() {
    const users = UserData.slice(0, 4);

    return (
      <View>
        <View style={{flex: null, height: 50}}>
          <TextInput type="search"
                 icon="searchGrey"
                 placeholder={_('searchActivities')}
                 onChange={() => this.setState({ search: value })} />
        </View>
        <ScrollView style={{flex: 1}}>
          {users.map((user) =>
            <UserListItem key={user.id}
                    onPress={() => this.onPressUser(user)}
                    avatar={StyleSheet.images[user.avatar]}
                    firstName={user.name.first}
                    lastName={user.name.last}
                    location={user.location}
                    dob={user.dob}
                    onPressDisclosure={() => this.onPressUser(user)} />)}
        </ScrollView>
      </View>
    );
  }
};
