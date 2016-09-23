
import React from 'react';
import _ from '../i18n';

import {
  ScrollView,
  View,
} from 'react-native';

import {
  Button,
  UserListItem,
  Header,
} from '../components';

import StyleSheet from '../styles';

export default class EventRequests extends React.Component {

  constructor() {
    super();
    this.state = {
      search: '',
      selected: {},
      inviteOptionsUser: null,
      showImportContacts: false,
    };
  }

  onPressApprove = () => {
    this.props.onPressApprove(this.getSelectedIds());
  };

  onPressDecline = () => {
    this.props.onPressDecline(this.getSelectedIds());
  };

  onPressApproveAll = () => {
    let allIds = {};
    this.props.requests.map(request => {
      allIds[request.id] = true;
    });

    this.setState({
      selected: allIds,
    });
  };

  onPressDeclineAll = () => {
  };

  onPressDisclosure = (user) => {
  };

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

  render() {
    console.log("state", this.state);
    console.log(this.props.requests);
    return (
      <View style={{flex: 1}}>
        <Header
          hideSwitcher={true}
          title={_('manageRequests')}
          onClose={() => {}}
        />
        <ScrollView style={{flex: 1}} contentContainerStyle={StyleSheet.container}>
          {this.props.requests.map((request) => {
            let user = request.user;
            return (
              <UserListItem
                key={request.id}
                onPress={() => this.onPressUser(user)}
                avatar={{uri: user.imageSrc}}
                firstName={user.name}
                lastName={user.name}
                location={user.location}
                dob={user.dob}
                checked={!!this.state.selected[request.id]}
                onPressCheck={() => this.onPressCheck(request)}
                onPressDisclosure={() => this.onPressDisclosure(request)}
              />
            );
          })}
        </ScrollView>
          {this.getSelectedIds().length > 0 ? (
            <View style={StyleSheet.buttons.bar}>
              <Button type="dialog" text={_('decline')} onPress={this.onPressDecline} />
              <Button type="dialogGreen" text={_('approve')} onPress={this.onPressApprove} />
            </View>
          ) : (
            <View style={StyleSheet.buttons.bar}>
              <Button type="dialog" text={_('declineAll')} onPress={this.onPressDeclineAll} />
              <Button type="dialogGreen" text={_('approveAll')} onPress={this.onPressApproveAll} />
            </View>
          )}
      </View>
    );
  }
}

EventRequests.propTypes = {
  requests: React.PropTypes.array.isRequired,
};
