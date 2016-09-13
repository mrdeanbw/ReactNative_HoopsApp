
import _ from '../i18n';
import React from 'react';
import {ScrollView} from 'react-native';

import {Window, Button, EventListItem} from '../components';
import StyleSheet from '../styles';
import EventData from '../../data/events.json';

import MyEvents from './my-events';

export default class Manage extends React.Component {

  static getTest(close) {
    return {
      title: 'Manage',
      view: Window.Organizer,
      viewProps: { initialTab: Manage, onClose: close }
    };
  }

  static getTitle(props) {
    return _('yourActiveEvents');
  }

  static getActionButton(props) {
    return <Button type="actionDefault" icon="actionAdd" text={_('create')} onPress={this.prototype.onPressCreate} />;
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents;
  }

  onPressEvent = (event) => {
    this.props.window.setView(Manage.Dashboard, { event: event });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={StyleSheet.container}>
        {EventData.map(event =>
          <EventListItem key={event.id}
                   onPress={() => this.onPressEvent(event)}
                   image={StyleSheet.images[event.image]}
                   title={event.title}
                   players={event.players} maxPlayers={event.maxPlayers}
                   level={event.level}
                   venue={event.venue}
                   date={event.date} />)}
      </ScrollView>
    );
  }
}

