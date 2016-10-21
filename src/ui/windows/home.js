
import _ from '../i18n';

import React from 'react';

import {View, ScrollView, Text, MapView} from 'react-native';

import StyleSheet from '../styles';
import EventListItem from '../components/event-list-item';
import Header from '../components/header';
import Icon from '../components/icon';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      scrollHeight: undefined,
      location: {
        lat: undefined,
        lon: undefined,
      },
    };

    navigator.geolocation.watchPosition(position => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
      });
    }, (err) => {
      console.warn(err); //eslint-disable-line no-console
    });
  }

  onPressCreate() {
    //TODO
  }

  onPressSearch() {
    //TODO
  }

  _renderEvents() {
    return (
      <View>
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
            distance={this.props.mode === 'PARTICIPATE' ? event.distance : null}
          />
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('home')}
          mode={this.props.mode}
          onToggleMode={this.props.onToggleMode}
        />
        <ScrollView
          contentContainerStyle={StyleSheet.home.container}
          onLayout={(e) => this.setState({scrollHeight: e.nativeEvent.layout.height})}
        >
          <View style={{minHeight: (this.state.scrollHeight - 300)}}>
            {this._renderEvents()}
          </View>

          {this.props.mode === 'PARTICIPATE' && (
            <View style={StyleSheet.home.nearbyContainer}>

              <View style={StyleSheet.home.nearbyTitle}>
                <Text style={[StyleSheet.text, StyleSheet.home.nearbyTitleText]}>
                  {_('nearbyEvents').toUpperCase()}
                </Text>
                <Icon style={StyleSheet.home.listIcon} name="list"/>
              </View>

              <View style={StyleSheet.home.nearbyMapContainer}>
                <MapView style={StyleSheet.home.map}
                  zoomEnabled={false}
                  pitchEnabled={false}
                  rotateEnabled={false}
                  scrollEnabled={false}
                  showsCompass={false}
                  showsPointsOfInterest={false}
                  followUserLocation={false}
                  showsUserLocation={true}
                  region={this.state.location.lat && {
                    latitude: this.state.location.lat,
                    longitude: this.state.location.lon,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
