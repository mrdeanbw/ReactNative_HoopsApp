import React, {Component} from 'react'
import {View, Text, TouchableHighlight} from 'react-native'

import StyleSheet from '../styles'
import Icon from './icon'

class ActionButton extends Component {

  renderIcon() {
    // Icon or LargeText
    const {icon} = this.props
    const styles = StyleSheet.actionButton

    if (this.props.textLarge) {
      return (
        <Text style={[StyleSheet.text, styles.textLargeStyle]}>
          {this.props.textLarge}
        </Text>
      )
    } else {
      return (
        <Icon name={icon} style={styles.iconStyle} />
      )
    }
  }

  render() {
    const {type, text} = this.props
    const styles = StyleSheet.actionButton
    const buttonTypeStyle = styles[type]

    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={buttonTypeStyle.underlayColor}
        style={[
          styles.touchContainer,
          buttonTypeStyle.touchContainer,
        ]}>
        <View style={styles.containerStyle}>
          {this.renderIcon()}
          <Text style={[
            StyleSheet.text,
            styles.textStyle,
          ]}>
            {styles.textTransform(text)}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default ActionButton
