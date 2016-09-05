
import _ from '../i18n';

import React from 'react';

import {View, ScrollView, Text, Image, MapView} from 'react-native';

import StyleSheet from '../styles';
import Button from '../components/button';
import EventListItem from '../components/event-list-item';
import Window from '../components/window';
import EventData from '../../data/events.json';
import EventDetails from './event-details';
import Search from './search';

export default class Home extends React.Component {

  static getTest(close) {
    return {
      title: 'Home',
      view: Window.Organizer,
      viewProps: { initialTab: Home, onClose: close }
    };
  }

  static getTitle(props) {
    return _('upcomingEvents');
  }

  static getActionButton(props) {
    if(props.mode === 'organizer') {
      return <Button type="actionDefault" icon="actionAdd" text={_('create')} onPress={this.prototype.onPressCreate} />;
    } else {
      return <Button type="actionDefault" icon="actionSearch" text={_('search')} onPress={this.prototype.onPressSearch} />;
    }
  }

  onPressCreate() {

  };

  onPressSearch() {
    this.props.window.showModal(<Search onClose={() => this.props.window.hideModal()} />, 'slide', false);
  };

  onPressEvent = (event) => {
    this.props.window.setView(EventDetails, {
      event: event,
      onClose: () => {
        this.props.window.setView(Home, this.props);
      }
    });
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
                   date={event.date}
                   distance={this.props.mode === 'participant' ? event.distance : null} />)}

        {this.props.mode === 'participant' && <View style={StyleSheet.nearbyContainer}>

          <View style={StyleSheet.nearbyTitle}>
            <Text style={[StyleSheet.text, StyleSheet.nearbyTitleText]}>{_('nearbyEvents').toUpperCase()}</Text>
            <Image source={StyleSheet.icons.list} style={[StyleSheet.icon]} />
          </View>

          <View style={StyleSheet.nearbyMapContainer}>
            <MapView style={StyleSheet.map}
                 zoomEnabled={false}
                 pitchEnabled={false}
                 rotateEnabled={false}
                 scrollEnabled={false}
                 showsCompass={false}
                 showsPointsOfInterest={false}
                 followUserLocation={true}
                 showsUserLocation={true}
                 region={{
                   latitude: 0,
                   longitude: 0,
                   latitudeDelta: 0.08,
                   longitudeDelta: 0.08
                 }} />
          </View>
        </View>}
      </ScrollView>
    );
  }
};
