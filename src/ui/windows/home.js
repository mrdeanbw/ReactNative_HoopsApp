
import _ from '../i18n';

import React from 'react';

import {View, ScrollView, Text, Image, MapView} from 'react-native';

import StyleSheet from '../styles';
import EventListItem from '../components/event-list-item';
import Header from '../components/header';
import Window from '../components/window';

export default class Home extends React.Component {

  static getTest(close) {
    return {
      title: 'Home',
      view: Window.Organizer,
      viewProps: { initialTab: Home, onClose: close }
    };
  }

  onPressCreate() {
    //TODO
  }

  onPressSearch() {
    //TODO
  }

  render() {
    return (
      <View>
        <Header
          title={_('home')}
          mode={this.props.mode}
          onChangeMode={this.props.onChangeMode}
        />
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.events.map(event =>
            <EventListItem key={event.id}
                     onPress={() => this.props.onPressEvent(event)}
                     image={{uri: event.imageSrc}}
                     title={event.title}
                     players={event.players} maxPlayers={event.maxPlayers}
                     level={event.level}
                     venue={event.venue}
                     date={event.date}
                     distance={this.props.mode === 'PARTICIPATE' ? event.distance : null} />)}

          {this.props.mode === 'PARTICIPATE' && <View style={StyleSheet.nearbyContainer}>

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
      </View>
    );
  }
}
