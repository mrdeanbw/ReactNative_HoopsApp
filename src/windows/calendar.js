import React from 'react';
import {View, Text, TouchableHighlight, ScrollView} from 'react-native';
import moment from 'moment';

import Header from '../components/header';
import Icon from '../components/icon';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      month: props.selectedDate,

      scrollHeight: 0,
      scrollOffset: {x: 0, y: 0},
      calendarHeight: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({month: nextProps.selectedDate});
  }

  _renderDays = () => {
    let start = moment(this.state.month).startOf('month').startOf('isoWeek');
    let end = moment(this.state.month).endOf('month').endOf('isoWeek');
    let date = moment(start);

    let weeks = [];
    let components = [];

    while(date.diff(end, 'days') <= 0) {
      let isToday = date.isSame(moment(), 'day');
      let isSelected = date.isSame(this.props.selectedDate, 'day');
      let isInMonth = date.isSame(this.state.month, 'month');
      let events = this.props.events.filter(event => {
        return moment(date).isSame(event.date, 'day');
      });

      if(date.day() === 1) {
        components = [];
      }

      components.push(
        <TouchableHighlight
          underlayColor={StyleSheet.calendar.dayHighlight}
          key={date.day()}
          onPress={(function(date) { // eslint-disable-line no-shadow
            this.props.onChangeDate(date);
          }).bind(this, date)}
        >
          <View
            style={[
              StyleSheet.calendar.dayContainer,
              isToday && StyleSheet.calendar.dayContainerToday,
              isSelected && StyleSheet.calendar.dayContainerSelected,
            ]}
          >
            <Text
              style={[
                StyleSheet.calendar.day,
                isToday && StyleSheet.calendar.dayToday,
                isSelected && StyleSheet.calendar.daySelected,
                !isInMonth && StyleSheet.calendar.dayOtherMonth,
              ]}
            >
              {date.format('D')}
            </Text>

            {(events.length > 0) && (<View
              style={[
                StyleSheet.calendar.dayIndicator,
                isSelected && StyleSheet.calendar.dayIndicatorSelected
              ]}
            />)}
          </View>
        </TouchableHighlight>
      );

      if(date.day() === 0) {
        weeks.push(
          <View
            key={date.isoWeek()}
            style={StyleSheet.calendar.weekContainer}
          >
            {components.slice(0)}
          </View>
        );
      }

      date = moment(date).add(1, 'day');
    }

    return weeks;
  }

  render() {
    //Max overlap is the height of one event list item
    let maxOverlap = 50;

    let bottom = this.state.scrollHeight - this.state.calendarHeight;
    //NB overlap must not become positive.
    let overlap = Math.min(bottom + this.state.scrollOffset.y - maxOverlap, 0);

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          onBack={this.props.onBack}
          onClose={this.props.onClose}
          title={_('calendar')}
        />
        <View style={StyleSheet.calendar.monthSelector}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.setState({month: moment(this.state.month).subtract(1, 'month')});
            }}
            style={{flex: 1}}
          >
            <View style={StyleSheet.calendar.monthChangeButton}>
              <View style={StyleSheet.calendar.arrow}>
                <Icon name="arrowLeft"/>
              </View>
              <Text style={StyleSheet.calendar.monthSelectorText}>
                {moment(this.state.month).subtract(1, 'month').format('MMMM')}
              </Text>
            </View>
          </TouchableHighlight>
          <Text
            style={[
              StyleSheet.calendar.monthSelectorText,
              StyleSheet.calendar.monthSelectorTextActive
            ]}
          >
            {this.state.month.format('MMMM YYYY')}
          </Text>

          <View style={StyleSheet.calendar.monthUnderlineContainer}>
            <View style={StyleSheet.calendar.monthUnderline}/>
          </View>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.setState({month: moment(this.state.month).add(1, 'month')});
            }}
            style={{flex: 1}}
          >
            <View style={StyleSheet.calendar.monthChangeButton}>
              <Text style={StyleSheet.calendar.monthSelectorText}>
                {moment(this.state.month).add(1, 'month').format('MMMM')}
              </Text>
              <View style={StyleSheet.calendar.arrow}>
                <Icon name="arrowRight"/>
              </View>
            </View>
          </TouchableHighlight>
        </View>

        <ScrollView
          style={StyleSheet.calendar.eventsContainer}
          onScroll={(e) => {
            this.setState({scrollOffset: e.nativeEvent.contentOffset});
          }}
          scrollEventThrottle={16}
          onLayout={(e) => {
            this.setState({scrollHeight: e.nativeEvent.layout.height});
          }}
        >

          <View
            style={StyleSheet.calendar.days}
            onLayout={(e) => {
              this.setState({calendarHeight: e.nativeEvent.layout.height});
            }}
          >

            <View style={StyleSheet.calendar.dayLabels}>
              {Array(7).fill(null).map((val, i) => {
                return (
                  <Text key={i} style={StyleSheet.calendar.dayLabelText}>
                    {moment().day((i + 1) % 7).format('ddd')}
                  </Text>
                );
              })}
            </View>

            {this._renderDays()}

            <Text style={StyleSheet.calendar.eventsHeader}>
              {this.props.selectedDate.format('D MMMM YYYY')}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              top: overlap,
              ...(overlap !== 0 ? {
                shadowColor: 'black',
                shadowOffset: {height: -2},
                shadowOpacity: 0.3,
                shadowRadius: 2,
              } : {}),
            }}
          >
            {this.props.events.filter(event => {
              return moment(this.props.selectedDate).isSame(event.date, 'day');
            }).map(event => (
              <TouchableHighlight
                key={event.id}
                onPress={() => this.props.onPressEvent(event)}
                underlayColor={StyleSheet.calendar.eventUnderlay}
              >
                <View style={StyleSheet.calendar.event}>
                  <View style={StyleSheet.calendar.eventTime}>
                    <Text style={StyleSheet.calendar.eventTimeText}>
                      {moment(event.date).format('HH:MM a')}
                    </Text>
                  </View>
                  <View style={StyleSheet.calendar.eventDetails}>
                    <Text style={StyleSheet.calendar.eventTitle} numberOfLines={1}>
                      {event.title}
                    </Text>
                    <Text style={StyleSheet.calendar.eventAddress} numberOfLines={1}>
                      {event.address}
                    </Text>
                  </View>
                  <View style={StyleSheet.calendar.eventChevron}>
                    <Icon name="chevronRight"/>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
