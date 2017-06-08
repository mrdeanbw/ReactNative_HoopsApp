import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {Button} from '../'
import StyleSheet from '../../styles'

const GenderInput = ({
  input: {value, onChange},
  onPressInfoIcon,
  crossPlatformLeftPosition,
  maleActive,
  femaleActive,
  meta: {touched, error, warning}
}) => {
  return (
    <View style={[StyleSheet.singleMarginTop, StyleSheet.signup.genderContainer]}>
      {touched && ((error && <Text style={[StyleSheet.signup.errorText]}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
      <View style={StyleSheet.signup.genderLabelContainer}>
        <Text style={[StyleSheet.text, StyleSheet.signup.genderLabel]}>Gender</Text>
        <Button
          style={[StyleSheet.signup.genderInfoIcon]}
          type="disclosure"
          icon="info"
          onPress={onPressInfoIcon}/>
      </View>
      <View style={[StyleSheet.buttons.bar, StyleSheet.singleMargin]}>
        <Button type="image" icon="male" value={value} active={value === 'male'} onPress={() => onChange('male') }/>
        <View style={StyleSheet.buttons.separator} />
        <Button type="image" icon="female" value={value} active={value === 'female'} onPress={() => onChange('female')}/>
      </View>
    </View>
  )
}

export default GenderInput
