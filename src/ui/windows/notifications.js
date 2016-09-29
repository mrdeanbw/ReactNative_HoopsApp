
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
                onPress={this.onPressNotification}
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
  description: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  date: React.PropTypes.instanceOf(Date).isRequired,
};

class FriendRequestNotification extends React.Component {
  render() {
    return (
      <NotificationRow
        image={StyleSheet.images.avatarChrisMurray}
        highlight={!this.props.notification.read}
        title="Friend Request"
        description="description goes in here and is required and it can go onto two lines"
        onPress={this.props.onPress}
        date={this.props.notification.date}
      />
    );
  }
}
