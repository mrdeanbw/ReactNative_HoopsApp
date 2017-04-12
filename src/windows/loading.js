import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Animation from 'lottie-react-native'

import StyleSheet from '../styles'

class Loading extends Component {

  componentDidMount() {
    this.animation.play()
  }

  render() {
    return (
      <View style={StyleSheet.loading.page}>
        <View style={StyleSheet.loading.animationWrapper}>
          <Animation
            ref={animation => { this.animation = animation }}
            style={StyleSheet.loading.animation}
            loop
            source={require('../styles/resources/animations/loading.json')}
          />
        </View>
        <Text style={StyleSheet.loading.text}>LOADING</Text>
      </View>
    )
  }
}

export default Loading
