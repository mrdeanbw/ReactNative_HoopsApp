import React from 'react';
import {ScrollView,Text,View} from 'react-native';

import {TextInput,Button,UserListItem,Header,Popup} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class FriendsSearch extends React.Component {

  constructor() {
    super();
    this.state = {
      search: '',
    };
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
        <View style={{flex: 0, height: 50}}>
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
              onPress={() => this.props.onViewProfile(user)}
              checked={false}
              hideDisclosure={true}
              onPressCheck={() => this.props.onSendFriendRequests([user.id])}
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
