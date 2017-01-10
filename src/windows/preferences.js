import React from 'react';
import {View, ScrollView, Linking} from 'react-native';

import {Window, Button, Popup, Header} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

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
    let url = "mailto:support@hoopsapp.co?subject=App%20Feedback";
    Linking.openURL(url).catch(err => console.warn('An error occurred', err));
  };

  onPressPrivacy = () => {
    let url = "http://hoopsapp.co/privacy";
    Linking.openURL(url).catch(err => console.warn('An error occurred', err));
  };

  onPressDeactivateAccount = () => {
  };

  render() {
    return (
      <View style={{flex: 1}}>
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

        <ScrollView>
          <View style={[StyleSheet.flex, StyleSheet.doubleMarginBottom]}>
            <Button type="preference" text={_('notifications')} icon="chevronRight" onPress={this.props.onPressNotifications} />
            <Button type="preference" text={_('editAccount')} icon="chevronRight" onPress={this.props.onPressEditAccount} />
            {/* TODO: enable currency switching
            <Button
              type="preference"
              text={_('currency')}
              icon={
                <Text
                  style={[
                    StyleSheet.text,
                    StyleSheet.boldText,
                    StyleSheet.highlightText,
                    StyleSheet.buttons.preference.iconStyle,
                    {width: null, right: 0},
                  ]}
                >
                  {this.state.currency}
                </Text>
              }
              onPress={this.onPressCurrency}
            /> */}
          </View>

          <View style={StyleSheet.singleMargin}>
            <Button type="preferenceLink" text={_('sendFeedback')} onPress={this.onPressSendFeedback} />
            <Button type="preferenceLink" text={_('privacy')} onPress={this.onPressPrivacy} />
            {/* TODO: enable deactivate account functionality
            <Button type="preferenceHighlightLink" text={_('deactivateAccount')} onPress={this.onPressDeactivateAccount} />
            */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
