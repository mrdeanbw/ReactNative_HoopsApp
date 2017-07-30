
import React, {Component} from 'react'
import {View, ActivityIndicator} from 'react-native'

import StyleSheet from '../styles'
import {Popup} from './'

class LoadingAlert extends Component {

  render() {
    return (
      <Popup visible={this.props.visible}>
        <View style={StyleSheet.loading.popup}>
          <ActivityIndicator color={StyleSheet.colors.pink}/>
        </View>
      </Popup>
    )
  }
}

export default LoadingAlert
