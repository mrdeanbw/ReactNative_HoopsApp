
import _ from '../i18n';

import React from 'react';
import StyleSheet from '../styles';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

import Dialog from './dialog';
import Picker from './picker';
import Button from './button';
import TextInput from './text-input';

const Days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const Months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const Hours = [];
const Minutes = [];

const zeroPad = (s, n) => {
  s = s.toString();
  while(s.length < n) s = '0' + s;
  return s;
};

for(var i = 0; i < 24; i++) Hours.push(zeroPad(i, 2));
for(var i = 0; i < 60; i++) Minutes.push(zeroPad(i, 2));

export default class DateInput extends React.Component {

  onPress = () => {
    if(!this.props.modalProvider) return;
    const modalProvider = this.props.modalProvider();

    modalProvider.showModal(
      <DatePicker value={this.props.value && new Date(this.props.value)}
            date={'date' in this.props ? this.props.date : true} time={!!this.props.time}
            onClose={() => modalProvider.hideModal()}
            onSave={value => this.onSave(modalProvider, value)} />
    );
  };

  onSave = (modalProvider, value) => {
    modalProvider.hideModal();
    if(this.props.onChange) this.props.onChange(value);
  };

  render() {
    const {onShowModal, onHideModal, onChange, value, rightBar, placeholder, style, ...props} = this.props;

    const defaultTextInput = StyleSheet.textInputs.default || {};
    const textInput = this.props.type ? StyleSheet.textInputs[this.props.type] || defaultTextInput : defaultTextInput;

    const _value = new Date(value);

    return (
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
              !value && { color: this.props.placeholderTextColor || textInput.placeholderTextColor || defaultTextInput.placeholderTextColor }
            ]}>
              {value ? (this.props.time && (zeroPad(_value.getHours(), 2) + ':' + zeroPad(_value.getMinutes(), 2) ) || '') + (('date' in this.props ? this.props.date : true) && ((this.props.time && ' ' || '') + _(Days[_value.getDay()]) + ', ' + _value.getDate() + ' ' + _(Months[_value.getMonth() + 1]) + ' ' + _value.getFullYear()))
               : placeholder}
            </Text>
          } {...props} />
          <View style={[defaultTextInput.barStyle, textInput.barStyle]}>{rightBar}</View>
        </View>
      </TouchableHighlight>
    );
  }
};

class DatePicker extends React.Component {

  constructor() {
    super();
    this.state = {
      value: null
    };
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: this.props.value || new Date() });
  }

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
      date.setFullYear(year, date.getMonth(), date.getDate());

      console.info(date);
      this.setState({value: date});

      if (this.props.onChange) {
        this.props.onChange(date);
      }
    }
  };

  onPressSave = () => {
    if(this.props.onSave) this.props.onSave(this.state.value);
  };

  render() {
    const maxAge = 120;
    const minAge = 13;
    const defaultAge = 21;
    let value = new Date(this.state.value);
    const maxValue = new Date(this.props.maxValue || new Date());
    const minValue = new Date(this.props.minValue || new Date(new Date().getTime() - 365.25*40*24*3600*1000));

    if(value > maxValue) value = maxValue;
    if(value < minValue) value = minValue;

    const days = [], months = [], years = [];
    for(var i = 1; i <= 31; i++) days.push(i.toString());
    for(var i = 0; i < 12; i++) months.push(_(Months[i]));
    for(var i = maxValue.getFullYear(); i >= minValue.getFullYear(); i--) years.push(i.toString());
    years.reverse();

    return (
      <Dialog popup={true}
          onClose={this.props.onClose} closeText={_('back')}
          buttons={<Button type="dialogDefault" text={_('save')} onPress={this.onPressSave}/>}>

        {this.props.date && <View>
          <Text style={[StyleSheet.text, StyleSheet.dateInput.titleTextStyle]}>{_('date').toUpperCase()}</Text>
          <View style={StyleSheet.dateInput.pickerContainerStyle}>
            <Picker style={StyleSheet.dateInput.dayPickerStyle}
                value={value.getDate().toString()}
                onChange={this.onChangeDay}>
              {days.map(day => <Picker.Item label={day} key={day}/>)}
            </Picker>

            <Picker style={StyleSheet.dateInput.monthPickerStyle}
                value={value.getMonth().toString()}
                onChange={this.onChangeMonth}>
              {months.map((month, i) => <Picker.Item label={month} key={i.toString()}/>)}
            </Picker>

            <Picker style={StyleSheet.dateInput.yearPickerStyle}
                value={value.getFullYear().toString()}
                onChange={this.onChangeYear}>
              {years.map(year => <Picker.Item label={year} key={year}/>)}
            </Picker>
          </View>
        </View>}

        {this.props.time && <View>
          <Text style={[StyleSheet.text, StyleSheet.dateInput.titleTextStyle]}>{_('time').toUpperCase()}</Text>
          <View style={StyleSheet.dateInput.pickerContainerStyle}>
            <Picker style={StyleSheet.dateInput.hourPickerStyle}
                value={zeroPad(value.getHours(), 2)}
                onChange={this.onChangeHour}>
              {Hours.map(hour => <Picker.Item label={hour} key={hour}/>)}
            </Picker>
            <Text style={[StyleSheet.text, StyleSheet.picker.textStyle, StyleSheet.dateInput.timeSeparator]}>{':'}</Text>
            <Picker style={StyleSheet.dateInput.minutePickerStyle}
                value={zeroPad(value.getMinutes(), 2)}
                onChange={this.onChangeMinute}>
              {Minutes.map(minute => <Picker.Item label={minute} key={minute}/>)}
            </Picker>
          </View>
        </View>}
      </Dialog>
    );
  }
};
