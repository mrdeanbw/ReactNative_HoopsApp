import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {Button, Icon, Header} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const button = (name) => <Button type="preferenceCheck" text={_(name)} icon={<Icon name={this.state[name] ? 'check' : 'none'} style={[StyleSheet.buttons.preferenceCheck.iconStyle, !!this.state[name] && StyleSheet.buttons.preferenceCheck.activeIconStyle]} />} onPress={() => {
      const obj = {};
      obj[name] = !this.state[name];
      this.setState(obj);
    }}/>;

    return (
      <View style={{flex: 1}}>
        <Header
          title={_('notifications')}
          onBack={this.props.onBack}
          onClose={this.props.onClose}
        />
        <ScrollView bounces={true}>
          {button('pushNotifications')}
          {button('emailNotifications')}
          {button('smsNotifications')}
          <View style={StyleSheet.doubleMargin} />
          <View style={[StyleSheet.dialog.titleStyle, StyleSheet.profile.upcomingBarStyle]}>
            <Text style={[StyleSheet.text, StyleSheet.dialog.titleTextStyle]}>{_('receiveNotificationsFor').toUpperCase()}</Text>
          </View>
          {button('messages')}
          {button('memberListChanges')}
          {button('reminders')}
          {button('invitations')}
          {button('requests')}
          {button('eventModifiations')}
          {button('friendzone')}
        </ScrollView>
      </View>
    );
  }
}
