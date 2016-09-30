
import _ from '../i18n';
import React from 'react';
import {View, Text, ScrollView, Image, TouchableHighlight} from 'react-native';

import {Header} from '../components';
import StyleSheet from '../styles';

import moment from 'moment';

/*
 * A map of notification types to row component
 */
export default class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.ComponentMap = {
      FRIEND_REQUEST: FriendRequestNotification,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('notifications')}
          onClose={this.props.onClose}
          mode={this.props.mode}
          onToggleMode={this.props.onToggleMode}
        />
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.notifications.map(notification => {
            let Component = this.ComponentMap[notification.type];
            return (
              <Component
                key={notification.id}
                notification={notification}
                onPress={() => {
                  this.props.onPressNotification(notification);
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

class NotificationRow extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={[StyleSheet.notification.container, this.props.style]}
        onPress={this.props.onPress}
        activeOpacity={1.0}
        underlayColor={StyleSheet.notification.underlayColor}
      >
        <View
          style={[
            StyleSheet.notification.wrapper,
            this.props.highlight && StyleSheet.notification.highlightRow,
          ]}
        >
          <View style={StyleSheet.notification.imageContainer}>
            <Image
              source={this.props.image}
              style={StyleSheet.notification.image}
            />
          </View>

          <View style={StyleSheet.notification.textContainer}>
            <Text style={[StyleSheet.text, StyleSheet.notification.distance]}>
              {moment(this.props.date).fromNow()}
            </Text>

            <Text
              style={[
                StyleSheet.notification.text,
                StyleSheet.notification.title
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {this.props.title}
            </Text>

            <Text
              style={[
                StyleSheet.notification.text,
                StyleSheet.notification.detail
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {this.props.description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

NotificationRow.propTypes = {
  image: Image.propTypes.source,
  highlight: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.node.isRequired,
  onPress: React.PropTypes.func.isRequired,
  date: React.PropTypes.instanceOf(Date).isRequired,
};

/**
 * Find instances of $0 $1 $2 etc from a template string and replace with
 * the value given as a replacement.
 * $0 will be replaced with the first replacement argument, $1 with the second etc.
 *
 * @returns Array of text components for use with React
 *
 * @param template {String}
 * @param ...replacements {Node}
 */
function replaceText(template, ...replacements) {
  let regex = /(\$[0-9])/g;
  let parts = template.split(regex);
  return parts.map((part, i) => {
    if(part.match(regex)){
      let index = part.substr(1);
      return <Text key={i}>{replacements[index]}</Text>;
    }else{
      return <Text key={i}>{part}</Text>;
    }
  });
}

class FriendRequestNotification extends React.Component {
  render() {
    let user = this.props.notification.friendRequest.from;

    let description = replaceText(
      _('friendRequestDescription'),
      <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
    );

    return (
      <NotificationRow
        image={StyleSheet.images.avatarChrisMurray}
        highlight={!this.props.notification.read}
        title="Friend Request"
        description={description}
        onPress={this.props.onPress}
        date={new Date(this.props.notification.date)}
      />
    );
  }
}
