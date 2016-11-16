
import React from 'react';
import _ from '../i18n';

import {
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  TextInput,
  Button,
  UserListItem,
  Header,
  Popup,
} from '../components';

import StyleSheet from '../styles';

export default class FriendsSearch extends React.Component {

  constructor() {
    super();
    this.state = {
      search: '',
      selected: {},
    };
  }

  /**
   * WARNING! This isn't the 'react' way of doing things.
   * Usually props are passed down to children, however since the action
   * button lives outside of the navigator, we don't want to pass down props
   * from that far up.
   * Some containers would like to handle the action button being pressed.
   *
   * See this discussion: https://github.com/facebook/react-native/issues/795
   */
  componentWillMount() {
    //listen to action press
    this._actionListener = this.props.actionButton.addListener('press', () => {
      if(this.getSelectedIds().length > 0){
        this.props.onSendFriendRequests(this.getSelectedIds());
      }else{
        this.onPressInviteAll();
      }
    });
  }

  componentWillUnmount() {
    this._actionListener && this._actionListener.remove();
  }

  componentDidUpdate(nextProps, nextState) {
    if(this.getSelectedIds().length !== this.getSelectedIds(nextState).length){
      if(this.getSelectedIds().length > 0){
        this.props.onChangeAction({
          text: _('sendInvites'),
          icon: "actionCheck",
          type: "actionGreen",
        });
      } else {
        this.props.onChangeAction({
          text: _('inviteAll'),
          icon: "actionCheck",
          type: "actionDefault",
        });
      }
    }
  }

  onPressInviteAll() {
    let allUsers = {};
    this.props.users.map((user) => {
      allUsers[user.id] = true;
    });
    this.setState({
      selected: allUsers,
    });
  }

  onPressUser(user) {
    this.props.onViewProfile(user);
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

  getSelectedIds(state = this.state) {
    return Object.keys(state.selected).filter(userId => {
      return state.selected[userId];
    });
  }

  render() {
    return (
      <View
        style={{flex: 1}}
        currentTab="manage"
      >
        <Header
          onBack={this.props.onBack}
          onClose={this.props.onClose}
        />
        <View style={{flex: null, height: 50}}>
          <TextInput
            type="search"
            icon="searchGrey"
            placeholder={_('searchPeople')}
            onChangeText={(search) => {
              this.setState({search});
              this.props.onSearchChange(search);
            }}
          />
        </View>
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              onPress={() => this.onPressUser(user)}
              checked={!!this.state.selected[user.id]}
              hideDisclosure={true}
              onPressCheck={() => this.onPressCheck(user)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

FriendsSearch.propTypes = {
  users: React.PropTypes.array.isRequired,
};

//TODO do something with an options popup
class Options extends React.Component {
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
