import React from 'react'
import {Image} from 'react-native'

import StyleSheet from '../styles'

export default class Icon extends React.Component {
  render() {
    const {name, active, style, props} = this.props
    const image = StyleSheet.icons[name + (active ? 'Active' : '')]

    return (
      <Image key={image} source={image} style={[StyleSheet.icon, style]} {...props} />
    )
  }
}
