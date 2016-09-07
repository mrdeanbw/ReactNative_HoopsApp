
import _ from '../i18n';

import React from 'react';
import {Actions as RouterActions} from 'react-native-router-flux';
import {user as UserActions} from '../../actions';

import {View, Image, TouchableWithoutFeedback} from 'react-native';
import StyleSheet from '../styles';

import HighlightText from '../components/highlight-text';

export default class SelectMode extends React.Component {

  onPressOrganize = () => {
    UserActions.setMode('ORGANIZE');
    RouterActions.home();
  };

  onPressParticipate = () => {
    UserActions.setMode('PARTICIPATE');
    RouterActions.home();
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
};
