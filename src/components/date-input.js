import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

import _ from '../i18n'
import StyleSheet from '../styles'

// Hack
import {dateInput, dateInputIcon} from '../styles/stylesheets/date-input'

const FORMATS = {
  'date': 'Do MMMM YYYY',
  'dateTime': 'HH:mm dddd Do MMMM YYYY',
  'time': 'HH:mm'
}

class DateInput extends Component {

  getFormat() {
    const mode = this.getMode()

    if (mode === 'datetime') {
      return FORMATS.dateTime
    }
    else if (mode === 'date') {
      return FORMATS.date
    }
    else if (mode === 'time') {
      return FORMATS.time
    }
  }

  getMode() {
    const {date, time} = this.props

    if (date && time) {
      return 'datetime'
    }
    else if (date) {
      return 'date'
    }
    else if (time) {
      return 'time'
    }
  }

  getCustomStyleSheet() {
    if (this.props.icon) {
      return dateInputIcon
    }

    return dateInput
  }

  render() {
    const dateStyleSheet = this.getCustomStyleSheet()

    const mode = this.getMode()
    const format = this.getFormat()
    const {icon, value, initialValue} = this.props
    const iconSrc = StyleSheet.icons[icon]

    let date
    if (value || initialValue) {
      date = new Date(this.props.value || this.props.initialValue)
    }

    return (
      <DatePicker
        mode={mode}
        format={format}
        placeholder={this.props.placeholder}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        date={date}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onDateChange={(newDate) => {
          const dttm = parseInt(moment(newDate, format).format('x'))
          this.props.onChange(dttm)
        }}
        style={{
          width: null,
          borderStyle: 'solid',
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: StyleSheet.colors.grey,
        }}
        customStyles={dateStyleSheet}
        iconSource={iconSrc}
        showIcon={!!icon}
      />
    )
  }
}

DateInput.propTypes = {
  date: React.PropTypes.bool.isRequired,
  time: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

export default DateInput
