
import _ from '../i18n';
import React from 'react';
import {View, ScrollView} from 'react-native';

import {
  EventListItem,
  UserListItem,
  Header,
} from '../components';

import StyleSheet from '../styles';

export default class SearchResults extends React.Component {

  render() {
    return (
      <View>
        <Header
          title={_('searchResults')}
          onClose={this.props.onClose}
          onBack={this.props.onBack}
        />

        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.users.map(user =>
            <UserListItem
              key={user.id}
              user={user}
              onPress={() => this.props.onPressUser(user)}
              hideDisclosure={true}
            />
          )}
          {this.props.events.map(event =>
            <EventListItem
              key={event.id}
              event={event}
              onPress={() => this.props.onPressEvent(event)}
              showDistance={true}
            />
          )}
        </ScrollView>

      </View>
    );
  }
}
