import React from 'react'
import {View, Image, TouchableWithoutFeedback} from 'react-native'

import StyleSheet from '../styles'

class SelectMode extends React.Component {

  render() {
    return (
      <View style={StyleSheet.interests.selectModeStyle}>
        <TouchableWithoutFeedback onPress={() => this.props.onSetMode('ORGANIZE')}>
          <Image
            source={StyleSheet.images.organize}
            style={[StyleSheet.interests.selectModeImageStyle, StyleSheet.interests.organizeImage]}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.props.onSetMode('PARTICIPATE')}>
          <Image
            source={StyleSheet.images.participate}
            style={[StyleSheet.interests.selectModeImageStyle, StyleSheet.interests.participateImage]}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

SelectMode.propTypes = {
  onSetMode: React.PropTypes.func.isRequired,
}

export default SelectMode
