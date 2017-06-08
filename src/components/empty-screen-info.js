import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {Icon} from '../components'
import _ from '../i18n'
import StyleSheet from '../styles'

class EmptyScreenInfo extends Component {
  render() {

    return(
      <View style={StyleSheet.emptyScreenInfo.container}>
        <View style={StyleSheet.emptyScreenInfo.headerContainer}>
          <Icon name="sad" style={StyleSheet.emptyScreenInfo.iconSad} />
          <Text style={[StyleSheet.text, StyleSheet.emptyScreenInfo.headerText]}>{_('nothingText')}</Text>
        </View>
        <View style={StyleSheet.emptyScreenInfo.textContainer}>
          <Text style={[StyleSheet.text, StyleSheet.emptyScreenInfo.textStyle]}>{_('createEventText')}</Text>
        </View>
        <View style={StyleSheet.emptyScreenInfo.iconContainer}>
          <Icon name="arrow" style={StyleSheet.emptyScreenInfo.iconArrow} />
        </View>
      </View>
    )
  }
}

export default EmptyScreenInfo
