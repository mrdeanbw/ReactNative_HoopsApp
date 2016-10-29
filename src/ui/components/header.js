
import React from 'react';
import _ from '../i18n';
import {View, Image, Text} from 'react-native';

import Button from './button';
import HighlightText from './highlight-text';
import StyleSheet from '../styles';

export default class Header extends React.Component {
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
        {!this.props.hideSwitcher && (
          <View>
            <View style={StyleSheet.window.logoBarStyle}>
              <View style={StyleSheet.window.accessoryBarStyle}>
                {this.props.onClose && <Button type="title" icon="close" style={StyleSheet.window.closeButton} onPress={this.props.onClose} />}
                {this.props.onBack && <Button type="title" icon="back" onPress={this.props.onBack} />}
                {this.props.accessoryViews}
              </View>
              <Image source={StyleSheet.images.logo} style={StyleSheet.window.logoStyle} />
              <Button type="modeSwitch" icon="switch" onPress={this.props.onToggleMode} />
            </View>

            <View style={StyleSheet.window.modeBarStyle}>
              <View style={StyleSheet.window.modeChevronStyle} />
              <HighlightText style={[StyleSheet.text, StyleSheet.window.modeTextStyle]}
                       highlightStyle={StyleSheet.window.modeHighlightTextStyle}
                       highlight={modeTextHighlight}
                       text={modeText} />
            </View>
          </View>
        )}

        {this.props.title && (
          <View style={StyleSheet.window.titleStyle}>
            {(this.props.onClose && this.props.hideSwitcher) && (
              <Button
                type="title"
                icon="close"
                style={StyleSheet.closeButton}
                onPress={this.props.onClose}
              />
            )}
            {(this.props.onBack && this.props.hideSwitcher) && (
              <Button
                type="title"
                icon="back"
                style={StyleSheet.closeButton}
                onPress={this.props.onBack}
              />
            )}

            {(typeof this.props.title === 'object') ? this.props.title : (
              <Text style={[StyleSheet.text, StyleSheet.window.titleTextStyle]}>
                {this.props.title.toUpperCase()}
              </Text>
            )}
            {this.props.actionButton && (
              <View>
                <Button
                  type="headerAction"
                  icon={this.props.actionButton}
                  onPress={this.props.onActionPress}
                />
              </View>
            )}
          </View>
        )}

      </View>
    );
  }

}
