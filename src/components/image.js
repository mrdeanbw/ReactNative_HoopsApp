
import React, {Component} from 'react'

import {View, Image as _Image} from 'react-native'
import StyleSheet from '../styles'

class Image extends Component {

  render() {
    const {name, style, imageStyle, props} = this.props
    const image = StyleSheet.images[name]

    return (
      <View style={[StyleSheet.imageContainer, style]}>
        <_Image source={image} style={[StyleSheet.image, imageStyle]} {...props} />
      </View>
    )
  }
}

export default Image
