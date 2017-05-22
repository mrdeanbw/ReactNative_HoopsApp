import React, {Component} from 'react'

import {AvatarEdit} from '../'
import StyleSheet from '../../styles'

const renderAvatarInput = ({
  input: {value, onChange},
  meta: {touched, error, warning}
}) => {
  return (
    <AvatarEdit
      onChange={onChange}
      imageUrl={value}
      style={StyleSheet.singleMargin}
    />
  )
}

export default renderAvatarInput
