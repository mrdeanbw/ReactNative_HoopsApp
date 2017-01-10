
import React from 'react';

import {View, TouchableWithoutFeedback, Animated} from 'react-native';

import StyleSheet from '../styles';

const width = 30, height = 15;

export default class SwitchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(props.value ? 1 : 0)
    };
  }

  componentWillReceiveProps(nextProps) {
    Animated.timing(this.state.value, {toValue: nextProps.value ? 1 : 0, friction: 1.25, duration: 150}).start();
  }

  onPress = () => {
    const currentValue = !!this.props.value;
    if(this.props.onChange) {
      this.props.onChange(!currentValue);
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        style={[StyleSheet.switchButton.style, this.props.style]}
        onPress={this.onPress}
        hitSlop={{top: 15, bottom: 15, left: 10, right: 10}}
      >
        <View style={StyleSheet.switchButton.containerStyle}>
          <Animated.View style={[StyleSheet.switchButton.activeStyle, { width: this.state.value.interpolate({ inputRange: [0, 1], outputRange: [0, width]}) }]} />
          <Animated.View style={[StyleSheet.switchButton.thumbStyle, { left: this.state.value.interpolate({ inputRange: [0, 1], outputRange: [0, width - height]}) }]} />
          <Animated.View style={[StyleSheet.switchButton.inactiveStyle, { width: this.state.value.interpolate({ inputRange: [0, 1], outputRange: [width, 0]}) }]} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
