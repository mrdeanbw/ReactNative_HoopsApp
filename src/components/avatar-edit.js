import React from 'react'
import {TouchableHighlight, ImagePickerIOS, View, Image} from 'react-native'

import StyleSheet from '../styles'
import {Icon} from './'

class AvatarEdit extends React.Component {

  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          ImagePickerIOS.openSelectDialog({}, (image) => {
            this.props.onChange(image)
          }, (err) => {
            console.warn(err) //eslint-disable-line no-console
          })
        }}
        style={[StyleSheet.profile.imageContainer, this.props.style]}
      >
        <View style={StyleSheet.profile.imageContainer}>
          {this.props.imageUrl ? (
            <Image
              style={StyleSheet.profile.image}
              source={{uri: this.props.imageUrl}}
            />
          ) : (
            <View style={StyleSheet.profile.image} />
          )}
          <View style={StyleSheet.profile.imageTintOverlay} />
          <Icon style={StyleSheet.profile.imageIconOverlay} name="camera" />
        </View>
      </TouchableHighlight>
    )
  }
}

AvatarEdit.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  imageUrl: React.PropTypes.string,
}

export default AvatarEdit
