import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {DateInput} from '..'
import StyleSheet from '../../styles'
import {colors} from '../../styles/resources'

const renderDateInput = ({
  input: { onChange, value, ...restInput },
  ref,
  placeholder,
  type,
  icon,
  date,
  time,
  minDate,
  barStyle,
  rightBar,
  meta: { touched, error, warning, dirty }
}) => {
  let borderStyleOnError = null
  let textStyleOnError = null

  touched || dirty && error ? borderStyleOnError = {borderBottomColor: colors.pink} : null
  touched || dirty && error ? textStyleOnError = {color: colors.pink} : null

  const valueChecker = value.toString()

  return (
    <View>
      {(touched || dirty) && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
      <DateInput
        ref={ref}
        placeholder={placeholder}
        type={type}
        icon={icon}
        date={date}
        time={time}
        errorStyles={[borderStyleOnError, textStyleOnError]}
        minDate={minDate}
        value={valueChecker === 'Invalid date' ? value : null}
        onChange={onChange}
        barStyle={barStyle}
        rightBar={rightBar}
      />
    </View>
  )
}

export default renderDateInput
