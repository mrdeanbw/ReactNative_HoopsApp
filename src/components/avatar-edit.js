import React from 'react'
import {TouchableHighlight, View, Image, ImagePickerIOS, Platform} from 'react-native'
import {showImagePicker} from '../utils/'
import StyleSheet from '../styles'
import {Icon} from './'

const imagePicker = (props) => {

  if (Platform.OS === 'android') {
    showImagePicker(props.onChange)
    return
  }
  ImagePickerIOS.openSelectDialog({}, (image) => {
    props.onChange(image)
  }, (err) => {
    console.warn(err) //eslint-disable-line no-console
  })
}

class AvatarEdit extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => imagePicker(this.props)}
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
