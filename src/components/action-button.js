import React, {Component} from 'react'
import {View, Text, TouchableHighlight} from 'react-native'

import StyleSheet from '../styles'
import Icon from './icon'

class ActionButton extends Component {

  render() {
    const {type, icon, text} = this.props

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
          <Icon name={icon} style={styles.iconStyle} />
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
