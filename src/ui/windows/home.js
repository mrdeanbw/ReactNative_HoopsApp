
import _ from '../i18n';

import React from 'react';

import {View, ScrollView, Text, MapView, TouchableHighlight} from 'react-native';

import StyleSheet from '../styles';
import EventListItem from '../components/event-list-item';
import Header from '../components/header';
import Icon from '../components/icon';
import icons from '../styles/resources/icons';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      scrollHeight: undefined,
    };
  }

  _renderEvents() {
    let noEvents = this.props.events.length === 0;
    return (
      <View>
        {noEvents && this.props.mode === 'ORGANIZE' && (
          <Text style={StyleSheet.noResults}>{_('noActiveEvents')}</Text>
        )}
        {noEvents && this.props.mode === 'PARTICIPATE' && (
          <Text style={StyleSheet.noResults}>{_('noUpcomingEvents')}</Text>
        )}
        {this.props.events.map(event =>
          <EventListItem
            key={event.id}
            onPress={() => this.props.onPressEvent(event)}
            image={{uri: event.imageSrc}}
            title={event.title}
            players={event.players} maxPlayers={event.maxPlayers}
            level={event.level}
            venueName={event.address}
            date={event.date}
            distance={this.props.mode === 'PARTICIPATE' ? event.distance : null}
          />
        )}
      </View>
    );
  }

  render() {
    let annotations = this.props.nearby.filter(item => {
      return item.event && item.event.addressCoords;
    }).map(item => {
      return {
        latitude: item.event.addressCoords.lat,
        longitude: item.event.addressCoords.lon,
        image: icons.mapPin,
        title: item.event.title,
        rightCalloutView: (
          <TouchableHighlight
            onPress={() => this.props.onPressEvent(item.event)}
            underlayColor="transparent"
          >
            <View>
              <Icon name="chevronRight"/>
            </View>
          </TouchableHighlight>
        ),
      };
    });

    //Calculate region size based on nearby events distances
    let region;
    if(this.props.location.lat && this.props.location.lon) {
      let location = this.props.location;

      //Calculate the maximum lat/lon delta
      let maxDelta = this.props.nearby.filter(item => {
        return item && item.event && item.event.addressCoords;
      }).reduce((prev, item) => {
        let coords = item.event.addressCoords;

        let delta = Math.max(
          Math.abs(coords.lat - location.lat),
          Math.abs(coords.lon - location.lon)
        );

        return Math.max(delta, prev);
      }, 0);

      region = {
        latitude: location.lat,
        longitude: location.lon,
        latitudeDelta: maxDelta * 2.5, // Double (for left+right) and add some padding.
        longitudeDelta: maxDelta * 2.5,
      };
    }

    return (
      <View style={{flex: 1}}>
        <Header
          title={this.props.mode === 'ORGANIZE' ? _('activeEvents') : _('upcomingEvents')}
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
                  region={region}
                  annotations={annotations}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
