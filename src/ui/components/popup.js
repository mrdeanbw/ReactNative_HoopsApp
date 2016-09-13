
import React from 'react';

import StyleSheet from '../styles';
import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

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

            <View style={[StyleSheet.dialog.contentStyle, StyleSheet.dialog.popupContainerStyle]}>
              <View style={[StyleSheet.dialog.popupContentStyle]}>
                {this.props.children}
              </View>
            </View>

          </View>

          {this.props.keyboardSpacer && <KeyboardSpacer/>}

        </View>
      </Modal>
    );
  }
}
