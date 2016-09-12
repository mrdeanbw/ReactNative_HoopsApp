
import React from 'react';
import _ from '../i18n';
import {View, Image, Text} from 'react-native';

import Button from './button';
import HighlightText from './highlight-text';
import StyleSheet from '../styles';

export default class Toolbar extends React.Component {
  render() {
    let modeText, modeTextHighlight;
    if(this.props.mode === 'ORGANIZE') {
      modeText = _('organizerMode');
      modeTextHighlight = _('organizer');
    }else{
      modeText = _('participantMode');
      modeTextHighlight = _('participant');
    }

    return (
      <View style={StyleSheet.window.titleBarStyle}>
        <View style={StyleSheet.window.logoBarStyle}>
          <View style={StyleSheet.window.accessoryBarStyle}>
            {this.props.onClose && <Button type="title" icon="close" style={StyleSheet.window.closeButton} onPress={this.props.onClose} />}
            {this.props.accessoryViews}
          </View>
          <Image source={StyleSheet.images.logo} style={StyleSheet.window.logoStyle} />
          <Button type="modeSwitch" icon="switch" onPress={this.props.onChangeMode} />
        </View>

        <View style={StyleSheet.window.modeBarStyle}>
          <View style={StyleSheet.window.modeChevronStyle} />
          <HighlightText style={[StyleSheet.text, StyleSheet.window.modeTextStyle]}
                   highlightStyle={StyleSheet.window.modeHighlightTextStyle}
                   highlight={modeTextHighlight}
                   text={modeText} />
        </View>

        {this.props.title && <View style={StyleSheet.window.titleStyle}>
          {(typeof this.props.title === 'object') && this.props.title ||
          <Text style={[StyleSheet.text, StyleSheet.window.titleTextStyle]}>{this.props.title.toUpperCase()}</Text>}
        </View>}

      </View>
    );
  }

}
