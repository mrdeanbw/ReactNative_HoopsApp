

import React from 'react';

import {
  Animated,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';

import {Icon} from './';

import StyleSheet from '../styles';

import UserData from '../../data/users.json';

export default class Menu extends React.Component {

  render() {
    return (
      <View style={StyleSheet.menu.menuContainer}>

        <TouchableWithoutFeedback onPress={this.props.onPressBackground}>
          <Animated.View style={[StyleSheet.menu.menuOverlay, {opacity: this.props.animation}]} />
        </TouchableWithoutFeedback>

        <Animated.View style={[StyleSheet.menu.style, {right: this.props.animation.interpolate({ inputRange: [0, 1], outputRange: [-115, 0] }) }]}>

          <View style={[StyleSheet.menu.header]}>
            <View style={[StyleSheet.menu.avatarContainer]}>
              <Image
                source={StyleSheet.images[this.props.user.avatar]}
                style={[StyleSheet.menu.avatarImage]}
              />
            </View>
            <Text style={[StyleSheet.text, StyleSheet.menu.avatarText]}>
              <Text>{this.props.user.name.first.toUpperCase()}</Text>
              <Text>{'\n'}</Text>
              <Text>{this.props.user.name.last.toUpperCase()}</Text>
            </Text>
          </View>

          <View style={StyleSheet.menu.items}>
            {this.props.children}
          </View>
        </Animated.View>

      </View>
    );
  }

};

Menu.Item = class MenuItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={StyleSheet.menu.itemContainer}>
          <View>
            <Icon name={this.props.icon} style={StyleSheet.menu.icon}/>
            {this.props.badge && (
              <View style={StyleSheet.menu.badgeContainer}>
                <Text style={StyleSheet.menu.badge}>{this.props.badge}</Text>
              </View>
            )}
          </View>

          <Text style={StyleSheet.menu.itemText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    )
  }
};

Menu.Item.propTypes = {
  text: React.PropTypes.string.isRequired,
  badge: React.PropTypes.number,
  icon: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
};

Menu.defaultProps = {
  user: UserData[0],
};

