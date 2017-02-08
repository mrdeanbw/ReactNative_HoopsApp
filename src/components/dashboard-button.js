import React from 'react'
import {View, Text, TouchableHighlight} from 'react-native'

import StyleSheet from '../styles'
import Icon from './icon'

class EventDashboardButton extends React.Component {

  render() {
    const {backgroundColor, type, icon, active, text, iconStyle} = this.props
    const styles = StyleSheet.dashboardButton

    const defaultButton = StyleSheet.buttons.default || {}
    const button = type ? StyleSheet.buttons[type] || defaultButton : defaultButton

    return (
      <TouchableHighlight
        activeOpacity={'activeOpacity' in button ? button.activeOpacity : defaultButton.activeOpacity}
        underlayColor={'underlayColor' in button ? button.underlayColor : defaultButton.underlayColor}
        style={[styles.container, {backgroundColor}]}
        onPress={this.props.onPress}
      >
        <View style={styles.bar}>
          <View style={styles.iconContainer}>
            <Icon name={icon} active={active} style={styles.iconStyle} />
          </View>
          <View style={styles.separator} />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{styles.textTransform(text)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default EventDashboardButton
