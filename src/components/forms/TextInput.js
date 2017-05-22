import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {TextInput} from '..'
import StyleSheet from '../../styles'
import {colors} from '../../styles/resources'

const renderTextInput = ({
  input: {onChange, value, ...restInput},
  onChangeText,
  type,
  ref,
  placeholder,
  style,
  errors,
  autoCapitalize,
  autoCorrect,
  textStyle,
  autoFocus,
  returnKeyType,
  selectTextOnFocus,
  enablesReturnKeyAutomatically,
  onSubmitEditing,
  icon,
  secureTextEntry,
  clearTextOnFocus,
  multiline,
  rightBar,
  keyboardType,
  meta: {touched, error, warning, dirty,invalid}
}) => {
  let borderStyleOnError = null
  let textStyleOnError = null
  let errorOutput = null

  touched  && error ? borderStyleOnError = {borderBottomColor: colors.pink} : null
  touched && error ? errorOutput = (<Text style={StyleSheet.signup.errorText}>{error}</Text>) : null

  return (
    <View>
      {errorOutput}
      <TextInput
        value={value}
        onChangeText={onChange}
        type={type}
        ref={ref}
        error={errors}
        placeholder={placeholder}
        style={[style, borderStyleOnError]}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        textStyle={[textStyle, textStyleOnError]}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        selectTextOnFocus={selectTextOnFocus}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
        onSubmitEditing={onSubmitEditing}
        icon={icon}
        secureTextEntry={secureTextEntry}
        clearTextOnFocus={clearTextOnFocus}
        multiline={multiline}
        rightBar={rightBar}
        keyboardType={keyboardType}
      />
    </View>
  )
}

export default renderTextInput
