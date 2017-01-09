

import React from 'react';
import { View, Text, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import StyleSheet from '../styles';
import Button from './button';

export default class Dialog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  showModal(modal, animationType = 'fade', transparent = true) {
    this.setState({ modal: modal, modalVisible: true, animationType, transparent });
  }

  hideModal() {
    this.setState({ modal: null, modalVisible: false });
  }

  render() {
    const {
      closeText,
      buttons,
      leftBar,
      rightBar,
      title,
      titleView,
      children,
      scrollContent,

      style,
      titleStyle,
      leftBarStyle,
      rightBarStyle,
      titleTextStyle,
      contentStyle,
      buttonBarStyle,
      popupContentStyle,

      ...props
    } = this.props;

    const _children = !this.props.popup ? children : <View style={[StyleSheet.dialog.popupContentStyle, popupContentStyle]}>{children}</View>;

    return (
      <View style={[StyleSheet.dialog.style, !!this.props.popup && StyleSheet.dialog.popupStyle, , style]} {...props}>
        <View style={[StyleSheet.flex, this.props.popup && !scrollContent && {flex: 1, justifyContent: 'center'}]}>
          {this.props.popup && this.props.onClose && <View style={[StyleSheet.dialog.popupBackgroundTouchable]}>
            <TouchableWithoutFeedback onPress={this.props.onClose}><View style={StyleSheet.flex} /></TouchableWithoutFeedback>
          </View>}

          {!this.props.popup && <View style={[StyleSheet.dialog.titleStyle, titleStyle]}>
            {(leftBar || this.props.onClose) && <View style={[StyleSheet.dialog.leftBarStyle, leftBarStyle]}>
              {this.props.onClose && <Button type="title" icon="close" onPress={this.props.onClose} />}
              {leftBar}
            </View>}
            {titleView || <Text style={[StyleSheet.text, StyleSheet.dialog.titleTextStyle, titleTextStyle]}>{title.toUpperCase()}</Text>}
            {rightBar && <View style={[StyleSheet.dialog.rightBarStyle, rightBarStyle]}>
              {rightBar}
            </View>}
          </View>}

          {!!scrollContent && <ScrollView style={{flex: 1}}
                                 contentContainerStyle={[
                                   StyleSheet.dialog.contentStyle,
                                   StyleSheet.dialog.scrollingContentStyle,
                                   !!this.props.popup && StyleSheet.dialog.popupContainerStyle,
                                   contentStyle,
                                   {flex: 0}
                                 ]}>
            {this.props.popup && this.props.onClose && <TouchableWithoutFeedback onPress={this.props.onClose} style={StyleSheet.dialog.popupBackgroundTouchable}><View style={{flex:1}}></View></TouchableWithoutFeedback>}
            {_children}
            <KeyboardSpacer/>
          </ScrollView>}

          {!this.props.popup && !scrollContent && <View style={[StyleSheet.dialog.contentStyle, !!this.props.popup && StyleSheet.dialog.popupContainerStyle, contentStyle]}>
            {_children}
          </View>}

          {!!this.props.popup && !scrollContent &&
            <View style={[StyleSheet.dialog.contentStyle, !!this.props.popup && StyleSheet.dialog.popupContainerStyle, contentStyle]}>
              {_children}
            </View>}

        </View>

        {!!this.props.popup && this.props.buttons && <View style={[StyleSheet.dialog.popupButtonBarStyle, buttonBarStyle]}>
          {this.props.onClose && <Button type="dialog" text={closeText || _('back')} onPress={this.props.onClose} />}
          {buttons}
        </View>}

        {this.props.keyboardSpacer && <KeyboardSpacer/>}


        {this.state.modal && <Modal visible={this.state.modalVisible}
                      animationType={this.state.animationType}
                      transparent={this.state.transparent}>
          {this.state.modal}
        </Modal>}
      </View>
    );
  }
};
