
import _ from '../i18n';
import React from 'react';
import {ScrollView} from 'react-native';

import {Window, Button, EventListItem, TabBar} from '../components';
import StyleSheet from '../styles';

import MyEvents from './my-events';

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
      <TabBar
        title={_('manageYourEvents')}
        actionText={_('create')}
        actionIcon="actionAdd"
        onActionPress={this.props.onPressCreate}
        currentTab="manage"
        onTabPress={this.props.onTabPress}
        mode={this.props.mode}
      >
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.events.map(event =>
            <EventListItem
              key={event.id}
              onPress={() => this.props.onPressEvent(event)}
              image={{uri: event.imageSrc}}
              title={event.title}
              players={event.players} maxPlayers={event.maxPlayers}
              level={event.level}
              venue={event.venue}
              date={event.date}
            />
          )}
        </ScrollView>
      </TabBar>
    );
  }
}

