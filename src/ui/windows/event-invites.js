
import React from 'react';
import _ from '../i18n';

import {
  ScrollView,
  Text,
} from 'react-native';

import {
  TextInput,
  Button,
  UserListItem,
  TabBar,
  Popup,
} from '../components';

import StyleSheet from '../styles';

export default class EventInvites extends React.Component {

  constructor() {
    super();
    this.state = {
      search: '',
      selected: {},
      inviteOptionsUser: null,
      showImportContacts: false,
    };
  }


  onPressInviteAll() {
    let allUsers = {};
    this.getFilteredUsers().map((user) => {
      allUsers[user.id] = true;
    });
    this.setState({
      selected: allUsers,
    });
  }

  onPressUser(user) {
    this.props.onViewProfile(user);
  }

  onPressDisclosure(user) {
    this.setState({
      inviteOptionsUser: user,
    });
  }

  setSelectedUser(id, value) {
    let selected = this.state.selected;
    this.setState({
      selected: {
        ...selected,
        [id]: value,
      },
    });
  }

  onPressCheck(user) {
    if(this.state.selected[user.id]) {
      this.setSelectedUser(user.id, false);
    } else {
      this.setSelectedUser(user.id, true);
    }
  }

  getSelectedIds() {
    return Object.keys(this.state.selected).filter(userId => {
      return this.state.selected[userId];
    });
  }

  getFilteredUsers() {
    let users = this.props.users;

    return users.filter((user) => {
      let name = user.name.toLowerCase();
      let search = this.state.search.toLowerCase();
      return name.search(search) >= 0;
    });
  }

  render() {
    const users = this.getFilteredUsers();

    let itemsSelected = this.getSelectedIds().length > 0;

    return (
      <TabBar
        title={(
          <TextInput
            type="search"
            icon="searchGrey"
            placeholder={_('searchPeople')}
            value={this.state.search}
            onChangeText={(value) => {
              this.setState({search: value});
            }}
          />
        )}
        accessoryViews={(
          <Button
            type="title"
            icon="importContacts"
            onPress={() => this.setState({showImportContacts: true})}
          />
        )}
        currentTab="manage"
        mode={this.props.mode}
        actionIcon={itemsSelected ? "actionCheck" : "actionCheck"}
        actionText={itemsSelected ? _('sendInvites') : _('inviteAll')}
        actionType={itemsSelected ? "actionGreen" : "actionDefault"}
        onActionPress={() => {
          if(itemsSelected){
            //Send invites
            this.props.onSendInvites(this.getSelectedIds());
          }else{
            this.onPressInviteAll();
          }
        }}
      >
        <MemberInviteOptions
          visible={!!this.state.inviteOptionsUser}
          onClose={() => this.setState({inviteOptionsUser: null})}
          selected={
            this.state.inviteOptionsUser &&
            this.getSelectedIds().indexOf(this.state.inviteOptionsUser.id) >= 0
          }
          onPressInvite={() => {
            this.setSelectedUser(this.state.inviteOptionsUser.id, true);
            this.setState({inviteOptionsUser: null});
          }}
          onPressRemove={() => {
            this.setSelectedUser(this.state.inviteOptionsUser.id, false);
            this.setState({inviteOptionsUser: null});
          }}
          onPressMessage={() => {}}
          onPressViewProfile={() => {
            this.props.onViewProfile(this.state.inviteOptionsUser);
            this.setState({inviteOptionsUser: null});
          }}
        />
        <ImportContacts
          visible={this.state.showImportContacts}
          onClose={() => this.setState({showImportContacts: false})}
          onPressImportContacts={() => {}}
          onPressImportFacebook={() => {}}
          onPressImportGoogle={() => {}}
        />
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {users.map((user) => (
            <UserListItem
              key={user.id}
              onPress={() => this.onPressUser(user)}
              avatar={StyleSheet.images[user.avatar]}
              firstName={user.name}
              lastName={user.name}
              location={user.location}
              dob={user.dob}
              checked={!!this.state.selected[user.id]}
              onPressCheck={() => this.onPressCheck(user)}
              onPressDisclosure={() => this.onPressDisclosure(user)}
            />
          ))}
        </ScrollView>
      </TabBar>
    );
  }
}

EventInvites.propTypes = {
  users: React.PropTypes.array.isRequired,
};

class MemberInviteOptions extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible} style={StyleSheet.dialog.optionsMenu} onClose={this.props.onClose}>
        {!!this.props.selected && <Button type="alertVertical" text={_('remove')} onPress={this.props.onPressRemove} />}
        {!this.props.selected && <Button type="alertVerticalDefault" text={_('invite')} onPress={this.props.onPressInvite} />}
        <Button type="alertVertical" text={_('message')} onPress={this.props.onPressMessage} />
        <Button type="alertVertical" text={_('viewProfile')} onPress={this.props.onPressViewProfile} />
      </Popup>
    );
  }
}

class ImportContacts extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible} style={StyleSheet.dialog.optionsMenu} onClose={this.props.onClose}>
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
      </Popup>
    );
  }
}
