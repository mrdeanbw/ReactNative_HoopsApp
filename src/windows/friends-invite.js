import React from 'react';
import {View, Text} from 'react-native';

import {Header, EventListItem} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class FriendsInvite extends React.Component {
  render() {
    return (
      <View>
        <Header
          onClose={this.props.onClose}
          title={_('events')}
          hideSwitcher={true}
        />
        {this.props.events.map(event =>
          <EventListItem
            key={event.id}
            event={event}
            onPress={() => this.props.onPressEvent(event)}
          />
        )}
        {this.props.events.length === 0 && (
          <Text style={StyleSheet.noResults}>{_('noUpcomingEvents')}</Text>
        )}
      </View>
    );
  }
}
