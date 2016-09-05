

import _ from '../i18n';

import React from 'react';
import { View, TextInput as _TextInput, Text, TouchableHighlight, Animated } from 'react-native';

import StyleSheet from '../styles';
import HorizontalRule from './horizontal-rule';
import Icon from './icon';
import Dialog from './dialog';
import Button from './button';


export default class TextInput extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  focus() {
    if(this.refs.input) this.refs.input.focus();
  }

  onPress = () => {
    if(!this.props.modalProvider) return;
    const modalProvider = this.props.modalProvider();

    const { ...props } = this.props;
    for(var v in props) if(/^on\W/.test(v)) delete props[v];

    modalProvider.showModal(
      <MultilineTextInputDialog onClose={() => modalProvider.hideModal()}
                    onSubmit={value => this.onModalSubmit(modalProvider, value)}
                    {...props} />
    );
  };

  onModalSubmit = (modalProvider, value) => {
    modalProvider.hideModal();
    if(this.props.onChangeText) this.props.onChangeText(value);
    if(this.props.onChange) this.props.onChange();
  };

  render() {
    const {type, view, icon, active, style, iconStyle, textStyle, modalProvider, textContainerStyle, multiline, numberOfLines, rightBar, barStyle, children, ...props} = this.props;

    const defaultTextInput = StyleSheet.textInputs.default || {};
    const textInput = type ? StyleSheet.textInputs[type] || defaultTextInput : defaultTextInput;

    const touchable = (view) => {
      if(multiline === 'popup') return (
        <TouchableHighlight onPress={this.onPress}
                activeOpacity={'activeOpacity' in textInput ? textInput.activeOpacity : defaultTextInput.activeOpacity}
                underlayColor={'underlayColor' in textInput ? textInput.underlayColor : defaultTextInput.underlayColor}>
          {view}
        </TouchableHighlight>
      );
      else return view;
    };

    return touchable(
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
        <View style={[defaultTextInput.style, textInput.style, style, {flex: 1}]}>
          {icon && <Icon name={icon} active={active} style={[defaultTextInput.iconStyle, textInput.iconStyle, iconStyle]}/>}
          {view &&
            <Text style={[defaultTextInput.textStyle, textInput.textStyle, textStyle]}>
              {view}
            </Text> || (multiline === 'popup') &&
            <Text style={[
              StyleSheet.text,
              defaultTextInput.textStyle,
              textInput.textStyle,
              defaultTextInput.staticTextStyle,
              textInput.staticTextStyle,
              this.props.textStyle,
              !this.props.value && { color: this.props.placeholderTextColor || textInput.placeholderTextColor || defaultTextInput.placeholderTextColor }
            ]} numberOfLines={1}>{this.props.value && this.props.value.replace(/\s+/g, ' ') || this.props.placeholder}</Text> ||
            <_TextInput ref="input"
                  style={[StyleSheet.text, defaultTextInput.textStyle, textInput.textStyle, textStyle, {flex: 1}]}
                  placeholderTextColor={textInput.placeholderTextColor || defaultTextInput.placeholderTextColor}
                  selectionColor={textInput.selectionColor || defaultTextInput.selectionColor}
                  keyboardAppearance={textInput.keyboardAppearance || defaultTextInput.keyboardAppearance}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                  {...props} />
          }
        </View>
        {rightBar && <View style={[defaultTextInput.barStyle, textInput.barStyle, barStyle]}>{rightBar}</View>}
      </View>
    );
  }
};

class MultilineTextInputDialog extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  onPressBack = () => {
    this.props.onClose && this.props.onClose();
  };

  onPressSubmit = () => {
    this.props.onSubmit && this.props.onSubmit('value' in this.state ? this.state.value : this.props.value);
  };

  onChangeText = (value) => {
    this.setState({ value: value });
  };

  render() {
    const { type, style, placeholder, modalTitle, modalPlaceholder, autoFocus, multiline, rightBar, value, onChange, onChangeText, ...props } = this.props;
    for(var v in props) if(/^on\W/.test(v)) delete props[v];

    return (
      <Dialog popup={true} keyboardSpacer contentStyle={{flex: 1, marginTop: 30, marginBottom: 15}} popupContentStyle={{flex: 1}}>
        <View style={{flex: 1, width: StyleSheet.dimensions.width - 30}}>
          {modalTitle && <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle, StyleSheet.singleMargin]}>{StyleSheet.dialog.alertTitleTextTransform(modalTitle)}</Text>}
          <HorizontalRule style={{width: null, alignSelf: 'stretch'}} />
          <TextInput type="multiline" autoFocus={true} multiline={true}
                 placeholder={modalPlaceholder}
                 value={'value' in this.state ? this.state.value : this.props.value}
                 onChangeText={this.onChangeText}
                 {...props} />
        </View>
        <View style={[StyleSheet.buttons.bar]}>
          {('value' in this.state) && <Button type="alert" text={_('cancel')} onPress={this.props.onClose} />}
          {!('value' in this.state) && <Button type="alert" text={_('back')} onPress={this.props.onClose} />}
          {('value' in this.state) && <Button type="alertDefault" text={_('save')} onPress={this.onPressSubmit} />}
        </View>
      </Dialog>
    );
  }
};
