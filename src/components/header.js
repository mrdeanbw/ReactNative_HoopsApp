import React from 'react';
import {View, Image, Text} from 'react-native';
import {connect} from 'react-redux';

import StyleSheet from '../styles';
import SwitchButton from './switch-button';
import _ from '../i18n';
import {user as userActions} from '../actions';
import Button from './button';
import HighlightText from './highlight-text';

class Header extends React.Component {
  renderLeftAction = () => {
    if(this.props.onClose) {
      return (
        <Button
          type="title"
          icon="close"
          onPress={this.props.onClose}
        />
      );
    }
    if(this.props.onBack) {
      return (
        <Button
          type="title"
          icon="back"
          onPress={this.props.onBack}
        />
      );
    }
    if(this.props.user.mode === 'PARTICIPATE') {
      return (
        <SwitchButton
          value={this.props.user.availability}
          onChange={this.props.onToggleAvailability}
        />
      );
    }
  };

  render() {
    let modeText, modeTextHighlight;
    if(this.props.user.mode === 'ORGANIZE') {
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
                {this.renderLeftAction()}
              </View>
              <Image source={StyleSheet.images.logo} style={StyleSheet.window.logoStyle} />
              <Button type="modeSwitch" hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} icon="switch" onPress={this.props.onToggleMode} />
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
                  type={this.props.actionButtonType || "headerActionCircle"}
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

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onToggleMode: () => dispatch(userActions.toggleMode()),
    onToggleAvailability: () => dispatch(userActions.toggleAvailability()),
  }),
)(Header);
