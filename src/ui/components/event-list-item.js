
import moment from 'moment';
import _ from '../i18n';

import React from 'react';


import {View, Image, Text, TouchableHighlight} from 'react-native';

import StyleSheet from '../styles';

export default class EventListItem extends React.Component {

  render() {
    let event = this.props.event;
    if(!event) {
      return null;
    }

    let date = moment(event.date).calendar(null, {
      sameDay: "[Today], HH:mm",
      nextDay: "[Yesterday], HH:mm",
    });

    return (
      <TouchableHighlight
        style={[StyleSheet.eventListItem.container, this.props.style]}
        onPress={this.props.onPress}
        activeOpacity={1.0}
        underlayColor={StyleSheet.eventListItem.underlayColor}
      >
        <View style={StyleSheet.eventListItem.wrapper}>
          <View style={StyleSheet.eventListItem.imageContainer}>
            <Image
              source={{uri: event.imageSrc}}
              style={StyleSheet.eventListItem.image}
            />
          </View>

          <View style={StyleSheet.eventListItem.textContainer}>
            {this.props.showDistance && event.distance && (
              <Text
                style={[StyleSheet.text, StyleSheet.eventListItem.distance]}
              >
                {event.distance.toFixed(2)} mi
              </Text>
            )}
            <Text
              style={[StyleSheet.eventListItem.text, StyleSheet.eventListItem.title]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {event.title}
            </Text>
            <Text
              style={[StyleSheet.eventListItem.text, StyleSheet.eventListItem.detail]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {_('players')}&nbsp;
              <Text style={StyleSheet.eventListItem.highlight}>
                <Text>{event.players ? event.players.length : ''}</Text>
                {!!event.maxPlayers && <Text>/{event.maxPlayers}</Text>}
              </Text>
              {'\u00a0\u00a0|\u00a0\u00a0'}
              {_('level')}&nbsp;
              <Text style={StyleSheet.eventListItem.highlight}>{event.level}</Text>
            </Text>
            <View style={StyleSheet.eventListItem.bottomText}>
              <View style={{flex: -1}}>
                <Text
                  numberOfLines={1}
                  style={[
                    StyleSheet.eventListItem.detail,
                    StyleSheet.eventListItem.venue
                  ]}
                >
                  {event.address}
                </Text>
              </View>
              <View style={{flex: 0}}>
                <Text
                  style={[
                    StyleSheet.eventListItem.date,
                    StyleSheet.eventListItem.detail
                  ]}
                > | {date}</Text>
              </View>
            </View>
          </View>

          {!this.props.hideDisclosure && (
            <TouchableHighlight
              underlayColor={StyleSheet.colors.transparent}
              onPress={this.props.onPressDisclosure}
              hitSlop={{top: 10, right: 10, bottom: 10, left: 0}}
            >
              <Image
                source={this.props.disclosure || StyleSheet.icons.chevronRight}
                style={StyleSheet.eventListItem.disclosure}
              />
            </TouchableHighlight>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}
