

import React from 'react';

import {Animated, View, Text, Image, TouchableWithoutFeedback} from 'react-native';

import StyleSheet from '../styles';

export default class Menu extends React.Component {

  render() {
    return (
      <View style={StyleSheet.menuContainer}>

        <TouchableWithoutFeedback onPress={this.props.onPressBackground}>
          <Animated.View style={[StyleSheet.menuOverlay, {opacity: this.props.animation}]} />
        </TouchableWithoutFeedback>

        <Animated.View style={[StyleSheet.menu, {right: this.props.animation.interpolate({ inputRange: [0, 1], outputRange: [-115, 0] }) }]}>

          <View style={[StyleSheet.avatar.style, StyleSheet.menu.avatarStyle]}>
            <View style={[StyleSheet.avatar.containerStyle, StyleSheet.menu.avatarContainerStyle]}>
              <Image source={this.props.user.avatar} style={[StyleSheet.imageStyle, StyleSheet.avatar.imageStyle, StyleSheet.menu.avatarImageStyle]} />
            </View>
            <Text style={[StyleSheet.text, StyleSheet.avatar.textStyle, StyleSheet.menu.avatarTextStyle]}>
              {this.props.user.name.first.toUpperCase() + '\n' + this.props.user.name.last.toUpperCase()}
            </Text>
          </View>

          <View style={StyleSheet.menuIcons}>
            {this.props.children}
          </View>
        </Animated.View>

      </View>
    );
  }

};
