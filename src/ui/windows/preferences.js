
import _ from '../i18n';
import React from 'react';
import {View, Text} from 'react-native';

import {Window, Button, Popup, Header} from '../components';
import StyleSheet from '../styles';

export default class Preferences extends React.Component {

  static getTest(close) {
    return {
      title: 'Preferences',
      view: Window.Organizer,
      viewProps: { initialTab: Preferences, onClose: close }
    };
  }

  constructor() {
    super();
    this.state = {
      currencyPopup: false,
      currency: 'GBP'
    };
  }

  onPressEditAccount = () => {

  };

  onPressCurrency = () => {
    this.setState({currencyPopup: true});
  };

  setCurrency = (currency) => {
    this.setState({
      currency,
      currencyPopup: false,
    });
  };

  onPressSendFeedback = () => {

  };

  onPressPrivacy = () => {

  };

  onPressDeactivateAccount = () => {

  };

  render() {
    return (
      <View>
        <Header
          title={_('preferences')}
        />
        <Popup
          visible={this.state.currencyPopup}
          onClose={() => this.setState({currencyPopup: false})}
          style={StyleSheet.dialog.optionsMenu}
        >
          <Button type="alertVertical" text="GBP" onPress={() => this.setCurrency('GBP')} />
          <Button type="alertVertical" text="EUR" onPress={() => this.setCurrency('EUR')} />
          <Button type="alertVertical" text="USD" onPress={() => this.setCurrency('USD')} />
        </Popup>

        <View style={[StyleSheet.flex, StyleSheet.doubleMarginBottom]}>
          <Button type="preference" text={_('notifications')} icon="chevronRight" onPress={this.props.onPressNotifications} />
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
      </View>
    );
  }
}
