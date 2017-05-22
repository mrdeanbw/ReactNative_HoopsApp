import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {AddressInput} from '../'
import StyleSheet from '../../styles'

const renderAdressInput = ({
  input: {onChange, value, dirty, ...restInput},
  icon,
  placeholder,
  onSelect,
  textStyles,
  meta: { touched, error, warning }
}) => {
  let setColor = null

  !error ? setColor = {color: 'black'} : null

  return (
    <View>
      {touched && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
      <AddressInput
        icon={icon}
        placeholder={placeholder}
        value={value.description}
        onSelect={onChange}
        textStyles={[textStyles]}
        textColor={setColor}
      />
    </View>
  )
}

export default renderAdressInput
