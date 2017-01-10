import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import {Window, EventListItem, Header} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class Manage extends React.Component {

  static getTest(close) {
    return {
      title: 'Manage',
      view: Window.Organizer,
      viewProps: { initialTab: Manage, onClose: close }
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          onBack={this.props.onBack}
          onClose={this.props.onClose}
          title={_('manageYourEvents')}
        />
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.events.length === 0 && (
            <Text style={StyleSheet.noResults}>{_('noActiveEvents')}</Text>
          )}
          {this.props.events.map(event =>
            <EventListItem
              key={event.id}
              event={event}
              onPress={() => this.props.onPressEvent(event)}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

