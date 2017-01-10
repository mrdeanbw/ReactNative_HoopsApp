import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import StyleSheet from '../styles';
import EventListItem from '../components/event-list-item';
import Header from '../components/header';
import Button from '../components/button';
import MapView from '../components/map-view';
import _ from '../i18n';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      scrollHeight: undefined,
      showMap: true,
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
            event={event}
            onPress={() => this.props.onPressEvent(event)}
            showDistance={this.props.mode === 'PARTICIPATE'}
          />
        )}
      </View>
    );
  }

  _renderMap = () => {
    return (
      <View style={StyleSheet.home.nearbyMapContainer}>
        <MapView
          events={this.props.nearby.map(item => item.event)}
          location={this.props.location}
          showsUserLocation={true}
          onPressEvent={this.props.onPressEvent}
        />
      </View>
    );
  }

  _renderList() {
    return (
      this.props.nearby.map(item => (
        <EventListItem
          key={item.event.id}
          onPress={() => this.props.onPressEvent(item.event)}
          event={item.event}
          showDistance={true}
        />
      ))
    );
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <Header
          title={this.props.mode === 'ORGANIZE' ? _('activeEvents') : null}
        />
        <ScrollView
          contentContainerStyle={StyleSheet.home.container}
          onLayout={(e) => this.setState({scrollHeight: e.nativeEvent.layout.height})}
        >

          {this.props.mode === 'ORGANIZE' && (
            <View style={{minHeight: (this.state.scrollHeight - 300)}}>
              {this._renderEvents()}
            </View>
          )}

          {this.props.mode === 'PARTICIPATE' && (
            <View style={StyleSheet.home.nearbyContainer}>
              <View style={StyleSheet.home.nearbyTitle}>
                <Text style={[StyleSheet.text, StyleSheet.home.nearbyTitleText]}>
                  {_('nearbyEvents').toUpperCase()}
                </Text>
                <Button
                  style={StyleSheet.home.listIcon}
                  icon={this.state.showMap ? 'list' : 'pinWhite'}
                  onPress={() => {
                    this.setState({showMap: !this.state.showMap});
                  }}
                />
              </View>

              {this.state.showMap ? this._renderMap() : this._renderList()}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
