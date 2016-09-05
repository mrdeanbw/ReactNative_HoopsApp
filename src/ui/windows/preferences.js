
import _ from '../i18n';
import React from 'react';
import {View,Text,ScrollView} from 'react-native';

import {Window, Button, Dialog, Icon} from '../components';
import StyleSheet from '../styles';

export default class Preferences extends React.Component {

  static getTest(close) {
    return {
      title: 'Preferences',
      view: Window.Organizer,
      viewProps: { initialTab: Preferences, onClose: close }
    };
  }

  static getTitle(props) {
    return _('preferences');
  }

  static getActionButton(props) {
    return <Button type="actionDefault" icon="actionRemove" text={_('logout')} onPress={this.prototype.onPressLogout} />;
  }

  constructor() {
    super();
    this.state = {
      currency: 'GBP'
    };
  }

  onPressNotifications = () => {
    const modalProvider = this.props.window;
    modalProvider.showModal(<Preferences.Notifications onClose={() => modalProvider.hideModal()} />, 'slide', false);
  };

  onPressEditAccount = () => {

  };

  onPressCurrency = () => {
    const modalProvider = this.props.window;

    const set = (currency) => {
      return () => {
        modalProvider.hideModal();
        this.setState({currency});
      };
    };

    modalProvider.showModal(
      <Dialog popup={true} onClose={() => modalProvider.hideModal()} style={StyleSheet.dialog.optionsMenu}>
        <Button type="alertVertical" text="GBP" onPress={set('GBP')} />
        <Button type="alertVertical" text="EUR" onPress={set('EUR')} />
        <Button type="alertVertical" text="USD" onPress={set('USD')} />
      </Dialog>
    );
  };

  onPressSendFeedback = () => {

  };

  onPressPrivacy = () => {

  };

  onPressDeactivateAccount = () => {

  };

  render() {
    return (
      <ScrollView style={StyleSheet.flex}>
        <View style={[StyleSheet.flex, StyleSheet.doubleMarginBottom]}>
          <Button type="preference" text={_('notifications')} icon="chevronRight" onPress={this.onPressNotifications} />
          <Button type="preference" text={_('editAccount')} icon="chevronRight" onPress={this.onPressEditAccount} />
          <Button type="preference"
              text={_('currency')}
              icon={<Text style={[StyleSheet.text, StyleSheet.boldText, StyleSheet.highlightText, StyleSheet.buttons.preference.iconStyle, {width: null, right: 0}]}>{this.state.currency}</Text>}
              onPress={this.onPressCurrency} />
        </View>

        <View style={StyleSheet.singleMargin}>
          <Button type="preferenceLink" text={_('sendFeedback')} onPress={this.onPressSendFeedback} />
          <Button type="preferenceLink" text={_('privacy')} onPress={this.onPressPrivacy} />
          <Button type="preferenceHighlightLink" text={_('deactivateAccount')} onPress={this.onPressDeactivateAccount} />
        </View>
      </ScrollView>
    );
  }
};



Preferences.Notifications = class NotificationsPreferences extends React.Component {
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
      <Dialog scrollContent popup={false} title={_('notifications')} onClose={this.props.onClose}>
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
      </Dialog>
    );
  }
};
