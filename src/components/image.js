
import React from 'react';

import {View, Image as _Image} from 'react-native';
import StyleSheet from '../styles';

export default class Image extends React.Component {
  render() {
    const {name, style, imageStyle, props} = this.props;
    const image = StyleSheet.images[name];

    return (
      <View style={[StyleSheet.imageContainer, style]}>
        <_Image source={image} style={[StyleSheet.image, imageStyle]} {...props} />
      </View>
    );
  }
};
