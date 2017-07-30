import React, {Component} from 'react'
import {Image} from 'react-native'

import StyleSheet from '../styles'

class Icon extends Component {

  render() {
    const {name, active, style, props} = this.props
    const image = StyleSheet.icons[name + (active ? 'Active' : '')]

    return (
      <Image key={image} source={image} style={[StyleSheet.icon, style]} {...props} />
    )
  }
}

export default Icon
