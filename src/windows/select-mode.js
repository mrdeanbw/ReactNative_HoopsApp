import React from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';

import StyleSheet from '../styles';
import HighlightText from '../components/highlight-text';
import _ from '../i18n';

export default class SelectMode extends React.Component {

  onPressOrganize = () => {
    this.props.onSetMode('ORGANIZE');
  };

  onPressParticipate = () => {
    this.props.onSetMode('PARTICIPATE');
  };

  render() {
    return (
      <View style={StyleSheet.interests.selectModeStyle}>
        <TouchableWithoutFeedback onPress={this.onPressOrganize}>
          <Image source={StyleSheet.images.organize} style={[StyleSheet.interests.selectModeImageStyle, StyleSheet.interests.organizeImage]}>
            <HighlightText highlight={_('organize')} text={_('organizeMode')}
                     style={[StyleSheet.text, StyleSheet.interests.selectModeTextStyle]}
                     highlightStyle={StyleSheet.interests.selectModeHighlightTextStyle} />
          </Image>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onPressParticipate}>
          <Image source={StyleSheet.images.participate} style={[StyleSheet.interests.selectModeImageStyle, StyleSheet.interests.participateImage]}>
            <HighlightText highlight={_('participate')} text={_('participateMode')}
                     style={[StyleSheet.text, StyleSheet.interests.selectModeTextStyle]}
                     highlightStyle={StyleSheet.interests.selectModeHighlightTextStyle} />
          </Image>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

SelectMode.propTypes = {
  onSetMode: React.PropTypes.func.isRequired,
};
