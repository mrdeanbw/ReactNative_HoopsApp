
import _ from '../i18n';
import React from 'react';
import {View, ScrollView} from 'react-native';

import {Button, UserListItem, TextInput, Header, Popup} from '../components';
import StyleSheet from '../styles';

export default class Friends extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      popupUser: null,
    };
  }

  onPressDisclosure = (user) => {
    this.setState({popupUser: user});
  };

  onPressUser = (user) => {
    this.props.onPressUser(user);
  };

  onPressInvite = (user) => {
    this.setState({popupUser: null});
    this.props.onPressInvite(user);
  };

  onPressRemove = (user) => {
    this.setState({popupUser: null});
    this.props.onPressRemove(user);
  };

  render() {
    return (
      <View>
        <Header
          title={_('friends')}
          onBack={this.props.onBack}
          onClose={this.props.onClose}
          actionButton="plus"
          onActionPress={this.props.onFindFriends}
        />
        <Popup
          visible={!!this.state.popupUser}
          style={StyleSheet.dialog.optionsMenu}
          onClose={() => this.setState({popupUser: null})}
        >
          <Button
            type="alertVertical"
            text={_('inviteToAnEvent')}
            onPress={() => this.onPressInvite(this.state.popupUser)}
          />
          <Button
            type="alertVerticalDefault"
            text={_('remove')}
            onPress={() => this.onPressRemove(this.state.popupUser)}
          />
        </Popup>
        <View style={{flex: null, height: 50}}>
          <TextInput
            type="search"
            icon="searchGrey"
            placeholder={_('searchFriends')}
            onChangeText={(text) => this.props.onChangeSearchText(text)}
          />
        </View>
        <ScrollView style={{flex: 1}}>
          {this.props.friends.map((user) =>
            <UserListItem
              key={user.id}
              onPress={() => this.onPressUser(user)}
              imageSrc={user.imageSrc}
              name={user.name}
              location={user.location}
              dob={user.dob}
              onPressDisclosure={() => this.onPressDisclosure(user)}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}
