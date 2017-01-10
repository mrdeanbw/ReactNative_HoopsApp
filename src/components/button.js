
import React from 'react';

import {View, Text, TouchableHighlight} from 'react-native';

import Icon from './icon';
import StyleSheet from '../styles';

export default class Button extends React.Component {
  render() {
    const {type, icon, active, text, style, activeStyle, containerStyle, iconStyle, activeIconStyle, textStyle, activeTextStyle, children, ...props} = this.props;

    const defaultButton = StyleSheet.buttons.default || {};
    const button = type ? StyleSheet.buttons[type] || defaultButton : defaultButton;
    const textTransform = button.textTransform || defaultButton.textTransform || (s => s);

    return (
      <TouchableHighlight style={[
        defaultButton.style,
        button.style,
        style,
        active ? defaultButton.activeStyle : null,
        active ? button.activeStyle : null,
        active ? activeStyle : null
      ]}
                activeOpacity={'activeOpacity' in button ? button.activeOpacity : defaultButton.activeOpacity}
                underlayColor={'underlayColor' in button ? button.underlayColor : defaultButton.underlayColor}
                {...props}>
        <View style={[defaultButton.containerStyle, button.containerStyle, containerStyle]}>
          {(icon && typeof icon === 'string') && <Icon name={icon} active={active} style={[
            defaultButton.iconStyle,
            button.iconStyle,
            iconStyle,
            active ? defaultButton.activeIconStyle : null,
            active ? button.activeIconStyle : null,
            active ? activeIconStyle : null
          ]}/>}
          {(icon && typeof icon !== 'string') && icon}
          {text && <Text style={[
            StyleSheet.text,
            defaultButton.textStyle,
            button.textStyle,
            textStyle,
            active ? defaultButton.activeTextStyle : null,
            active ? button.activeTextStyle : null,
            active ? activeTextStyle : null
          ]}>
            {typeof text === 'string' && textTransform(text) || text}
          </Text>}
          {children}
        </View>
      </TouchableHighlight>
    );
  }
};
