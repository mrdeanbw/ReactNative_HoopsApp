
import React from 'react';
import {View, Text} from 'react-native';

import StyleSheet from '../styles';

export default class HorizontalRule extends React.Component {

  render() {
    return (
      <View style={[StyleSheet.horizontalRule.style, {width: StyleSheet.dimensions.width}, this.props.style]}>
        <View style={[StyleSheet.horizontalRule.lineStyle, this.props.lineStyle]} />
        {this.props.text && <Text style={[StyleSheet.text, StyleSheet.horizontalRule.textStyle, this.props.textStyle]}>{StyleSheet.horizontalRule.textTransform(this.props.text)}</Text>}
        {this.props.text && <View style={[StyleSheet.horizontalRule.lineStyle, this.props.lineStyle]} />}
      </View>
    );
  }

};
