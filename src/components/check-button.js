
import React from 'react';

import {View, Text, TouchableHighlight} from 'react-native';

import Icon from './icon';
import StyleSheet from '../styles';

export default class CheckButton extends React.Component {

  onPress = (...args) => {
    if(this.props.onPress) {
      this.props.onPress(...args);
    }

    if(this.props.onChange) {
      this.props.onChange(!this.props.checked);
    }
  }

  render() {
    const {type, onPress, onChange, icon, checkIcon, checked, text, style, checkedStyle, containerStyle, checkedContainerStyle, iconStyle, checkedIconStyle, textStyle, checkedTextStyle, children, ...props} = this.props;

    const defaultButton = StyleSheet.buttons.check || {};
    const button = type ? StyleSheet.buttons[type] || defaultButton : defaultButton;
    const textTransform = button.textTransform || defaultButton.textTransform || (s => s);

    return (
      <TouchableHighlight style={[
        defaultButton.style,
        button.style,
        style,
        checked ? defaultButton.checkedStyle : null,
        checked ? button.checkedStyle : null,
        checked ? checkedStyle : null
      ]}
                activeOpacity={'activeOpacity' in button ? button.activeOpacity : defaultButton.activeOpacity}
                underlayColor={'underlayColor' in button ? button.underlayColor : defaultButton.underlayColor}
                onPress={this.onPress}
                {...props}>
        <View style={[
          defaultButton.containerStyle,
          button.containerStyle,
          containerStyle,
          checked ? defaultButton.checkedContainerStyle : null,
          checked ? button.checkedContainerStyle : null,
          checked ? checkedContainerStyle : null
        ]}>
          {text && <Text style={[
            StyleSheet.text,
            defaultButton.textStyle,
            button.textStyle,
            textStyle,
            checked ? defaultButton.checkedTextStyle : null,
            checked ? button.checkedTextStyle : null,
            checked ? checkedTextStyle : null
          ]}>
            {textTransform(text)}
          </Text>}
          {children}
          {!checked && icon && <Icon name={icon} style={[defaultButton.iconStyle, button.iconStyle, iconStyle]}/>}
          {checked && checkIcon && <Icon name={checkIcon} style={[defaultButton.iconStyle, defaultButton.checkedIconStyle, button.iconStyle, button.checkedIconStyle, iconStyle, checkedIconStyle]}/>}
        </View>
      </TouchableHighlight>
    );
  }
};
