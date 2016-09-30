
import _ from '../i18n';
import React from 'react';
import {View, Text, ScrollView, Image, TouchableHighlight} from 'react-native';

import {Header, Button, Popup} from '../components';
import StyleSheet from '../styles';

import moment from 'moment';

/*
 * A map of notification types to row component
 */
export default class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {
      optionsPopupIndex: null,
    };

    this.ComponentMap = {
      FRIEND_REQUEST: FriendRequestNotification,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('notifications')}
          mode={this.props.mode}
          onToggleMode={this.props.onToggleMode}
        />
        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.notifications.map((notification, i) => {
            let Component = this.ComponentMap[notification.type];
            return (
              <Component
                key={notification.id}
                notification={notification}
                onHideOptions={() => {
                  this.setState({optionsPopupIndex: null});
                }}
                onPress={() => {
                  this.setState({optionsPopupIndex: i});
                }}
                showOptions={this.state.optionsPopupIndex === i}

                onAcceptFriendRequest={this.props.onAcceptFriendRequest}
                onDeclineFriendRequest={this.props.onDeclineFriendRequest}
                onPressUserProfile={this.props.onPressUserProfile}
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
      <View>
        <Popup visible={this.props.showOptions} onClose={this.props.onHideOptions}>
          {this.props.options.map((option, i) => (
            <Button
              key={i}
              type={option.type}
              text={option.text}
              onPress={() => {
                this.props.onHideOptions();
                option.onPress && option.onPress();
              }}
            />
          ))}
        </Popup>

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
      </View>
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
  showOptions: React.PropTypes.bool.isRequired,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onHideOptions: React.PropTypes.func.isRequired,
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
    let status = this.props.notification.friendRequest.status;

    let description;
    if(status === 'pending') {
      description = replaceText(
        _('friendRequestPendingDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      );
    } else if(status === 'declined') {
      description = replaceText(
        _('friendRequestDeclinedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      );
    } else if(status === 'confirmed') {
      description = replaceText(
        _('friendRequestConfirmedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      );
    }

    return (
      <NotificationRow
        image={StyleSheet.images.avatarChrisMurray}
        highlight={status === 'pending'}
        title={_('friendRequest')}
        description={description}
        date={new Date(this.props.notification.date)}
        onPress={this.props.onPress}
        showOptions={this.props.showOptions}
        onHideOptions={this.props.onHideOptions}
        options={[{
          type: "alertVertical",
          text: _('accept'),
          onPress: () => {
            this.props.onAcceptFriendRequest(this.props.notification);
          },
        },{
          type: "alertVertical",
          text: _('decline'),
          onPress: () => {
            this.props.onDeclineFriendRequest(this.props.notification);
          },
        },{
          type: "alertVertical",
          text: _('viewProfile'),
          onPress: () => {
            this.props.onPressUserProfile(this.props.notification.friendRequest.from);
          }
        }]}
      />
    );
  }
}
