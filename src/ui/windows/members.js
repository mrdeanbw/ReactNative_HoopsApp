
import _ from '../i18n';
import React from 'react';
import {View,Text,ScrollView} from 'react-native';

import MyEvents from './my-events';

import {Window, Button, Dialog, UserListItem, TextInput} from '../components';
import StyleSheet from '../styles';
import UserData from '../../data/users.json';
import Manage from './manage';
import Profile from './profile';

export default class Members extends React.Component {

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

  static getTitle(props) {
    return <Button type="dialogGreen" icon="plus" text={_('inviteMore')} onPress={this.prototype.onPressInviteMore}/>;
  }

  static getActionButton(props) {
    return <Button type="action" icon="actionBack" text={_('back')} onPress={this.prototype.onPressBack} />;
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents;
  }

  onPressBack() {
    this.props.window.setView(Manage.Dashboard, { event: this.props.event });
  }

  onPressInviteMore() {
    this.props.window.setView(Members.InviteMore, { event: this.props.event });
  }

  onPressDisclosure(user) {
    this.props.window.showModal(<MemberOptions
      onClose={() => {
        this.props.window.hideModal();
      }}
      onPressViewProfile={() => {
        this.props.window.hideModal();
        setTimeout(() => this.props.window.showModal(<Profile
          user={user}
          onClose={() => this.props.window.hideModal()}
        />, 'slide', false), 0);
      }}
      onPressMessage={() => {
        this.props.window.hideModal();
        //this.props.window.setView(Messages, { user: user });
      }}
      onPressRemove={() => {
        this.props.window.hideModal();
      }}
    />);
  }

  onPressUser(user) {
  }

  render() {
    const users = (this.props.event.invites || []).map(invite => {
      return {
        status: invite.status,
        ...UserData.find(x => x.id === invite.user)
      };
    });

    return (
      <ScrollView contentContainerStyle={StyleSheet.container}>
        {users.map((user) =>
          <UserListItem key={user.id}
                  onPress={() => this.onPressUser(user)}
                  avatar={StyleSheet.images[user.avatar]}
                  firstName={user.name.first}
                  lastName={user.name.last}
                  location={user.location}
                  dob={user.dob}
                  status={user.status}
                  onPressDisclosure={() => this.onPressDisclosure(user)} />)}
      </ScrollView>
    );
  }
};


Members.InviteMore = class InviteMembers extends React.Component {

  constructor() {
    super();
    this.state = {
      selected: {}
    };
  }

  static getTabHighlight(props) {
    return Manage;
  }

  static getTitle(props) {
    return <TextInput type="search"
              icon="searchGrey"
              placeholder={_('searchPeople')}
              onChange={function(value) { this.setState({ search: value })}} />;
  }

  static getActionButton(props) {
    return <Button type="actionDefault" icon="actionCheck" text={_('inviteAll')} onPress={this.prototype.onPressInviteAll} />;
  }

  static getAccessoryViews(props) {
    return [
      <Button type="title" icon="importContacts" onPress={this.prototype.onPressImportContacts} />
    ];
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents;
  }

  onPressImportContacts() {
    this.props.window.showModal(<ImportContacts
      onClose={() => {
        this.props.window.hideModal();
      }}
      onPressImportContacts={() => {
        this.props.window.hideModal();
      }}
      onPressImportFacebook={() => {
        this.props.window.hideModal();
      }}
      onPressImportGoogle={() => {
        this.props.window.hideModal();
      }}
    />);
  }

  onPressInviteAll() {
    this.addUser(...UserData.filter(user => {
      return this.props.event.invites.findIndex(invite => user.id === invite.user) === -1;
    }));
  }

  onPressSendInvites() {
    this.onPressBack();
  }

  onPressBack() {
    this.props.window.setView(Members, { event: this.props.event });
  }

  onPressUser(user) {
    this.props.window.showModal(<MemberInviteOptions
      user={user} selected={!!this.state.selected[user.id]}
      onClose={() => {
        this.props.window.hideModal();
      }}
      onPressInvite={() => {
        this.props.window.hideModal();
        this.addUser(user);
      }}
      onPressRemove={() => {
        this.props.window.hideModal();
        this.removeUser(user);
      }}
      onPressMessage={() => {
        this.props.window.hideModal();
      }}
      onPressViewProfile={() => {
        this.props.window.hideModal();

        setTimeout(() => this.props.window.showModal(<Profile
          user={user}
          onClose={() => this.props.window.hideModal()}
        />, 'slide', false), 0);
      }}
    />);
  }

  addUser(...users) {
    users.forEach(user => {
      this.state.selected[user.id] = true;
    });
    this.setState({ selected: this.state.selected });
    this.props.window.setActionButton(<Button type="actionGreen"
                          icon="actionCheck"
                          text={_('sendInvites')}
                          onPress={this.onPressSendInvites} />);
  }

  removeUser(...users) {
    users.forEach(user => {
      delete this.state.selected[user.id];
    });
    this.setState({ selected: this.state.selected });
    if(Object.keys(this.state.selected).length === 0) {
      this.props.window.setActionButton(<Button type="action"
                            icon="actionBack"
                            text={_('back')}
                            onPress={this.onPressBack}/>);
    }
  }

  onPressCheck(user) {
    if(!!this.state.selected[user.id]) {
      this.removeUser(user);
    } else {
      this.addUser(user);
    }
  }

  render() {
    const users = UserData.filter(user => {
      return this.props.event.invites.findIndex(invite => user.id === invite.user) === -1;
    });

    return (
      <ScrollView contentContainerStyle={StyleSheet.container}>
        {users.map((user) =>
          <UserListItem key={user.id}
                  onPress={() => this.onPressUser(user)}
                  avatar={StyleSheet.images[user.avatar]}
                  firstName={user.name.first}
                  lastName={user.name.last}
                  location={user.location}
                  dob={user.dob}
                  checked={!!this.state.selected[user.id]}
                  onPressCheck={() => this.onPressCheck(user)} />)}
      </ScrollView>
    );
  }
};

class MemberOptions extends React.Component {
  render() {
    return (
      <Dialog popup={true} style={StyleSheet.dialog.optionsMenu} onClose={this.props.onClose}>
        <Button type="alertVertical" text={_('viewProfile')} onPress={this.props.onPressViewProfile} />
        <Button type="alertVertical" text={_('message')} onPress={this.props.onPressMessage} />
        <Button type="alertVerticalDefault" text={_('remove')} onPress={this.props.onPressRemove} />
      </Dialog>
    );
  }
}

class MemberInviteOptions extends React.Component {
  render() {
    return (
      <Dialog popup={true} style={StyleSheet.dialog.optionsMenu} onClose={this.props.onClose}>
        {!!this.props.selected && <Button type="alertVertical" text={_('remove')} onPress={this.props.onPressRemove} />}
        {!this.props.selected && <Button type="alertVerticalDefault" text={_('invite')} onPress={this.props.onPressInvite} />}
        <Button type="alertVertical" text={_('message')} onPress={this.props.onPressMessage} />
        <Button type="alertVertical" text={_('viewProfile')} onPress={this.props.onPressViewProfile} />
      </Dialog>
    );
  }
}

class ImportContacts extends React.Component {
  render() {
    return (
      <Dialog popup={true} style={StyleSheet.dialog.optionsMenu} onClose={this.props.onClose}>
        <Button type="alertVertical"
            text={_('importFromContacts')}
            onPress={this.props.onPressImportContacts} />

        <Button type="alertVertical"
            text={
              <Text>
                <Text>{_('importFrom').toUpperCase()}</Text>
                {' '}
                <Text style={{color: StyleSheet.colors.facebookBlue}}>
                  {_('facebook').toUpperCase()}
                  </Text>
              </Text>}
            onPress={this.props.onPressImportFacebook} />

        <Button type="alertVertical"
            text={
              <Text>
                <Text>{_('importFrom').toUpperCase()}</Text>
                {' '}
                <Text style={{color: StyleSheet.colors.pink}}>
                  {_('google').toUpperCase()}
                </Text>
              </Text>}
            onPress={this.props.onPressImportGoogle} />
      </Dialog>
    );
  }
}
