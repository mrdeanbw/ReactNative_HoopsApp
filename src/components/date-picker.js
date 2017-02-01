import moment from 'moment'
import React from 'react'
import StyleSheet from '../styles'
import { View, Text, TouchableHighlight } from 'react-native'
import _ from '../i18n'
import Picker from './picker'

const zeroPad = (s, n) => {
  s = s.toString()
  while (s.length < n) {
    s = '0' + s
  }
  return s
}

export default class DatePicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || new Date(),
    }
  }

  onChangeMinute = (minute) => {
    minute = parseInt(minute, 10)
    if (minute !== this.state.value.getMinutes()) {
      let date = new Date(this.state.value)
      date.setMinutes(minute)

      this.setState({ value: date })

      if (this.props.onChange) {
        this.props.onChange(date)
      }
    }
  };

  onChangeHour = (hour) => {
    hour = parseInt(hour, 10)
    if (hour !== this.state.value.getHours()) {
      let date = new Date(this.state.value)
      date.setHours(hour)

      this.setState({ value: date })

      if (this.props.onChange) {
        this.props.onChange(date)
      }
    }
  };

  onChangeDay = (day) => {
    day = parseInt(day, 10)
    if (day !== this.state.value.getDate()) {
      let date = new Date(this.state.value)
      date.setFullYear(date.getFullYear(), date.getMonth(), day)

      this.setState({ value: date })

      if (this.props.onChange) {
        this.props.onChange(date)
      }
    }
  };

  onChangeMonth = (month) => {
    month = parseInt(month, 10)
    if (month !== this.state.value.getMonth()) {
      let date = new Date(this.state.value)
      date.setFullYear(date.getFullYear(), month, date.getDate())

      this.setState({ value: date })

      if (this.props.onChange) {
        this.props.onChange(date)
      }
    }
  };

  onChangeYear = (year) => {
    year = parseInt(year, 10)
    if (year !== this.state.value.getFullYear()) {
      let date = new Date(this.state.value)
      date.setYear(year)

      this.setState({ value: date })

      if (this.props.onChange) {
        this.props.onChange(date)
      }
    }
  };

  render() {
    let value = new Date(this.props.value)
    const maxValue = new Date(this.props.maxValue || new Date())
    const minValue = new Date(this.props.minValue || new Date(new Date().getTime() - 365.25 * 40 * 24 * 3600 * 1000))

    if (value > maxValue) {
      value = maxValue
    }
    if (value < minValue) {
      value = minValue
    }

    const days = [], months = [], years = []
    for (let i = 1; i <= 31; i++) {
      days.push(i.toString())
    }
    for (let i = 0; i < 12; i++) {
      months.push(moment().month(i).format('MMM'))
    }
    for (let i = maxValue.getFullYear(); i >= minValue.getFullYear(); i--) {
      years.push(i.toString())
    }
    years.reverse()

    const minutes = [0, 15, 30, 45]

    return (
      <View>
        {this.props.date && <View>
          <Text style={[StyleSheet.text, StyleSheet.dateInput.titleTextStyle]}>{_('date').toUpperCase()}</Text>
          <View style={StyleSheet.dateInput.pickerContainerStyle}>
            <Picker style={StyleSheet.dateInput.dayPickerStyle}
              value={value.getDate().toString()}
              onChange={this.onChangeDay}>
              {days.map(day => <Picker.Item label={day} value={day} key={day} />)}
            </Picker>

            <Picker style={StyleSheet.dateInput.monthPickerStyle}
              value={value.getMonth()}
              onChange={this.onChangeMonth}>
              {months.map((month, i) => <Picker.Item label={month} value={i} key={i} />)}
            </Picker>

            <Picker style={StyleSheet.dateInput.yearPickerStyle}
              value={value.getFullYear().toString()}
              onChange={this.onChangeYear}>
              {years.map(year => <Picker.Item label={year} value={year} key={year} />)}
            </Picker>
          </View>
        </View>}

        {this.props.time && <View>
          <Text style={[StyleSheet.text, StyleSheet.dateInput.titleTextStyle]}>{_('time').toUpperCase()}</Text>
          <View style={StyleSheet.dateInput.pickerContainerStyle}>
            <Picker style={StyleSheet.dateInput.hourPickerStyle}
              value={value.getHours()}
              onChange={this.onChangeHour}>
              {new Array(24).fill(null).map((v, i) => (
                <Picker.Item label={zeroPad(i, 2)} value={i} key={i} />
              ))}
            </Picker>
            <Text style={[StyleSheet.text, StyleSheet.picker.textStyle, StyleSheet.dateInput.timeSeparator]}>{':'}</Text>
            <Picker style={StyleSheet.dateInput.minutePickerStyle}
              value={value.getMinutes()}
              onChange={this.onChangeMinute}>
              {minutes.map((v, i) => (
                <Picker.Item label={zeroPad(v, 2)} value={v} key={v} />
              ))}
            </Picker>
          </View>
        </View>}
      </View>
    )
  }
}
