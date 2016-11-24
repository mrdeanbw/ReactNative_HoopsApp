
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
      nextDay: "[Tomorrow], HH:mm",
    });

    let isEnded = moment(event.date).isBefore();
    let isCancelled = event.cancelled;
    let isDisabled = isEnded || isCancelled;

    let textColorStyle = (!this.props.ignoreDisabled && isDisabled) ?
      StyleSheet.eventListItem.disabledText :
      null;

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
              style={[StyleSheet.eventListItem.image]}
            />
            {!this.props.ignoreDisabled && (isEnded || isCancelled) && (
              <View
                style={[
                  StyleSheet.eventListItem.imageOverlay,
                  isEnded && StyleSheet.eventListItem.endedImageOverlay,
                  isCancelled && StyleSheet.eventListItem.cancelledImageOverlay,
                ]}
              >
                <Text style={StyleSheet.eventListItem.disabledImageText}>
                  {isEnded ? _('ended') : _('cancelled')}
                </Text>
              </View>
            )}
          </View>

          <View style={StyleSheet.eventListItem.textContainer}>
            {this.props.showDistance && event.distance && (
              <Text
                style={[
                  StyleSheet.text,
                  StyleSheet.eventListItem.distance,
                  textColorStyle
                ]}
              >
                {event.distance.toFixed(2)} mi
              </Text>
            )}
            <Text
              style={[
                StyleSheet.eventListItem.text,
                StyleSheet.eventListItem.title,
                textColorStyle,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {event.title}
            </Text>
            <Text
              style={[
                StyleSheet.eventListItem.text,
                StyleSheet.eventListItem.detail,
                textColorStyle,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {_('players')}&nbsp;
              <Text style={[StyleSheet.eventListItem.highlight, textColorStyle]}>
                <Text>{event.players ? event.players.length : ''}</Text>
                {!!event.maxPlayers && <Text>/{event.maxPlayers}</Text>}
              </Text>
              {'\u00a0\u00a0|\u00a0\u00a0'}
              {_('level')}&nbsp;
              <Text style={[StyleSheet.eventListItem.highlight, textColorStyle]}>
                {event.level}
              </Text>
            </Text>
            <View style={StyleSheet.eventListItem.bottomText}>
              <View style={{flex: -1}}>
                <Text
                  numberOfLines={1}
                  style={[
                    StyleSheet.eventListItem.detail,
                    StyleSheet.eventListItem.venue,
                    textColorStyle,
                  ]}
                >
                  {event.address}
                </Text>
              </View>
              <View style={{flex: 0}}>
                <Text
                  style={[
                    StyleSheet.eventListItem.date,
                    StyleSheet.eventListItem.detail,
                    textColorStyle,
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
