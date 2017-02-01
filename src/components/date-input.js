import moment from 'moment'
import React from 'react'
import StyleSheet from '../styles'
import { View, Text, TouchableHighlight } from 'react-native'

import _ from '../i18n'
import Button from './button'
import TextInput from './text-input'
import Popup from './popup'
import DatePicker from './date-picker'

export default class DateInput extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showPopup: false,
      value: props.value || props.initialValue,
    }
  }

  onPress = () => {
    this.setState({ showPopup: true })
  };

  onPressSave = () => {
    this.props.onChange && this.props.onChange(this.state.value)
    this.setState({ showPopup: false })
  };

  render() {
    const {rightBar, placeholder, style, ...props} = this.props

    const defaultTextInput = StyleSheet.textInputs.default || {}
    const textInput = this.props.type ? StyleSheet.textInputs[this.props.type] || defaultTextInput : defaultTextInput

    const _value = moment(this.props.value)

    let format = 'Do MMMM YYYY'
    if (!this.props.hideDay) {
      format = 'dddd ' + format
    }
    if (this.props.time) {
      format = 'HH:mm ' + format
    }

    return (
      <View>
        <TouchableHighlight onPress={this.onPress} style={{overflow: 'visible'}}
          activeOpacity={'activeOpacity' in textInput ? textInput.activeOpacity : defaultTextInput.activeOpacity}
          underlayColor={'underlayColor' in textInput ? textInput.underlayColor : defaultTextInput.underlayColor}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <TextInput style={[{flex:1}, style]} view={
              <Text style={[
                StyleSheet.text,
                defaultTextInput.textStyle,
                textInput.textStyle,
                defaultTextInput.staticTextStyle,
                textInput.staticTextStyle,
                this.props.textStyle,
                !this.props.value && { color: this.props.placeholderTextColor || textInput.placeholderTextColor || defaultTextInput.placeholderTextColor }
              ]}>
                {this.props.value ? _value.format(format) : placeholder}
              </Text>
            } {...props} />
            <View style={[defaultTextInput.barStyle, textInput.barStyle]}>{rightBar}</View>
          </View>
        </TouchableHighlight>
        <Popup
          visible={this.state.showPopup}
          onClose={() => this.setState({showPopup: false})}
          closeText={_('back')}
          buttons={
            <Button type="dialogDefault" text={_('save')} onPress={this.onPressSave}/>
          }
        >
          <DatePicker
            value={this.state.value && new Date(this.state.value)}
            minValue={this.props.minValue}
            maxValue={this.props.maxValue}
            date={'date' in this.props ? this.props.date : true}
            time={!!this.props.time}
            onClose={() => this.setState({showPopup: false})}
            onChange={value => {
              this.setState({value})
            }}
          />
        </Popup>
      </View>
    )
  }
}
