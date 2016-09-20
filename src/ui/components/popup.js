
import React from 'react';

import _ from '../i18n';
import StyleSheet from '../styles';
import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from './button';

export default class Popup extends React.Component {
  render() {

    return (
      <Modal visible={this.props.visible} transparent={true} animationType="fade">
        <View style={[StyleSheet.dialog.style, StyleSheet.dialog.popupStyle]}>

          <View style={[StyleSheet.flex, {flex: 1, justifyContent: 'center'}]}>

            <View style={[StyleSheet.dialog.popupBackgroundTouchable]}>
              <TouchableWithoutFeedback onPress={this.props.onClose}>
                <View style={StyleSheet.flex} />
              </TouchableWithoutFeedback>
            </View>

            <View style={[StyleSheet.dialog.contentStyle, StyleSheet.dialog.popupContainerStyle, this.props.contentStyle]}>
              <View style={[StyleSheet.dialog.popupContentStyle, this.props.popupContentStyle]}>
                {this.props.children}
              </View>
            </View>

          </View>

          {this.props.buttons && (
            <View style={[StyleSheet.dialog.popupButtonBarStyle, this.props.buttonBarStyle]}>
              {this.props.onClose && (
                <Button
                  type="dialog"
                  text={this.props.closeText || _('back')}
                  onPress={this.props.onClose}
                />
              )}
              {this.props.buttons}
            </View>
          )}

          {this.props.keyboardSpacer && <KeyboardSpacer/>}

        </View>
      </Modal>
    );
  }
}
