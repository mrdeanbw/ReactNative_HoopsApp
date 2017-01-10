
import _ from '../i18n';
import moment from 'moment';
import React from 'react';
import StyleSheet from '../styles';
import { View, Text, TouchableHighlight } from 'react-native';

import Picker from './picker';
import Button from './button';
import TextInput from './text-input';
import Popup from './popup';

const zeroPad = (s, n) => {
  s = s.toString();
  while(s.length < n) s = '0' + s;
  return s;
};

export default class DateInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      value: props.value || props.initialValue,
    };
  }

  onPress = () => {
    this.setState({showPopup: true});
  };

  onPressSave = () => {
    this.props.onChange && this.props.onChange(this.state.value);
    this.setState({showPopup: false});
  };

  render() {
    const {rightBar, placeholder, style, ...props} = this.props;

    const defaultTextInput = StyleSheet.textInputs.default || {};
    const textInput = this.props.type ? StyleSheet.textInputs[this.props.type] || defaultTextInput : defaultTextInput;

    const _value = moment(this.props.value);

    let format = 'Do MMMM YYYY';
    if(!this.props.hideDay) {
      format = 'dddd ' + format;
    }
    if(this.props.time) {
      format = 'HH:mm ' + format;
    }

    return (
      <View>
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
              this.setState({value});
            }}
          />
        </Popup>
        <TouchableHighlight onPress={this.onPress} style={{overflow: 'visible'}}
                  activeOpacity={'activeOpacity' in textInput ? textInput.activeOpacity : defaultTextInput.activeOpacity}
                  underlayColor={'underlayColor' in textInput ? textInput.underlayColor : defaultTextInput.underlayColor}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <TextInput style={[{flex:1}, style]}  view={
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
      </View>
    );
  }
}

class DatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || new Date(),
    };
  }

  onChangeMinute = (minute) => {
    minute = parseInt(minute, 10);
    if(minute !== this.state.value.getMinutes()) {
      let date = new Date(this.state.value);
      date.setMinutes(minute);

      this.setState({value: date});

      if (this.props.onChange) {
        this.props.onChange(date);
      }
    }
  };

  onChangeHour = (hour) => {
    hour = parseInt(hour, 10);
    if(hour !== this.state.value.getHours()) {
      let date = new Date(this.state.value);
      date.setHours(hour);

      this.setState({value: date});

      if (this.props.onChange) {
        this.props.onChange(date);
      }
    }
  };

  onChangeDay = (day) => {
    day = parseInt(day, 10);
    if(day !== this.state.value.getDate()) {
      let date = new Date(this.state.value);
      date.setFullYear(date.getFullYear(), date.getMonth(), day);

      this.setState({value: date});

      if (this.props.onChange) {
        this.props.onChange(date);
      }
    }
  };

  onChangeMonth = (month) => {
    month = parseInt(month, 10);
    if(month !== this.state.value.getMonth()) {
      let date = new Date(this.state.value);
      date.setFullYear(date.getFullYear(), month, date.getDate());

      this.setState({value: date});

      if (this.props.onChange) {
        this.props.onChange(date);
      }
    }
  };

  onChangeYear = (year) => {
    year = parseInt(year, 10);
    if(year !== this.state.value.getFullYear()) {
      let date = new Date(this.state.value);
      date.setYear(year);

      this.setState({value: date});

      if (this.props.onChange) {
        this.props.onChange(date);
      }
    }
  };

  render() {
    let value = new Date(this.props.value);
    const maxValue = new Date(this.props.maxValue || new Date());
    const minValue = new Date(this.props.minValue || new Date(new Date().getTime() - 365.25 * 40 * 24 * 3600 * 1000));

    if(value > maxValue) value = maxValue;
    if(value < minValue) value = minValue;

    const days = [], months = [], years = [];
    for(let i = 1; i <= 31; i++) days.push(i.toString());
    for(let i = 0; i < 12; i++) months.push(moment().month(i).format('MMM'));
    for(let i = maxValue.getFullYear(); i >= minValue.getFullYear(); i--) years.push(i.toString());
    years.reverse();

    const minutes = [0, 15, 30, 45]

    return (
      <View>
        {this.props.date && <View>
          <Text style={[StyleSheet.text, StyleSheet.dateInput.titleTextStyle]}>{_('date').toUpperCase()}</Text>
          <View style={StyleSheet.dateInput.pickerContainerStyle}>
            <Picker style={StyleSheet.dateInput.dayPickerStyle}
                value={value.getDate().toString()}
                onChange={this.onChangeDay}>
              {days.map(day => <Picker.Item label={day} value={day} key={day}/>)}
            </Picker>

            <Picker style={StyleSheet.dateInput.monthPickerStyle}
                value={value.getMonth()}
                onChange={this.onChangeMonth}>
              {months.map((month, i) => <Picker.Item label={month} value={i} key={i}/>)}
            </Picker>

            <Picker style={StyleSheet.dateInput.yearPickerStyle}
                value={value.getFullYear().toString()}
                onChange={this.onChangeYear}>
              {years.map(year => <Picker.Item label={year} value={year} key={year}/>)}
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
                <Picker.Item label={zeroPad(i, 2)} value={i} key={i}/>
              ))}
            </Picker>
            <Text style={[StyleSheet.text, StyleSheet.picker.textStyle, StyleSheet.dateInput.timeSeparator]}>{':'}</Text>
            <Picker style={StyleSheet.dateInput.minutePickerStyle}
                value={value.getMinutes()}
                onChange={this.onChangeMinute}>
              {minutes.map((v, i) => (
                <Picker.Item label={zeroPad(v, 2)} value={v} key={v}/>
              ))}
            </Picker>
          </View>
        </View>}
      </View>
    );
  }
}
