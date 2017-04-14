import React from 'react'
import {View, Text} from 'react-native'

import StyleSheet from '../styles'

export default class Loading extends React.Component {

  render() {
    return (
      <View style={StyleSheet.loading.page}>
        <Text style={StyleSheet.loading.text}>LOADING</Text>
      </View>
    )
  }
}
