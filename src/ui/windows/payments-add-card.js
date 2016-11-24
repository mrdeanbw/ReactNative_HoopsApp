
import React from 'react';

import {View} from 'react-native';
import _ from '../i18n';
import {Header, TextInput, Button, LoadingAlert, Form} from '../components';
import StyleSheet from '../styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class PaymentsBankSetup extends React.Component {
  constructor(props) {
    super(props);

    /* Stripe test details:
      cardNumber: '4242424242424242',
      expiryMonth: '12',
      expiryYear: '17',
      cvc: '123',
    */
    this.state = {
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
    };
  }

  onDonePress = () => {
    if(!this.validate()) {
      return;
    }

    this.props.onDonePress({
      cardNumber: this.state.cardNumber,
      expiryMonth: this.state.expiryMonth,
      expiryYear: this.state.expiryYear,
      cvc: this.state.cvc,
    });
  };

  validate = () => {
    return (
      this.state.cardNumber &&
      this.state.expiryMonth &&
      this.state.expiryYear &&
      this.state.cvc
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          onClose={this.props.onClose}
          onBack={this.props.onBack}
          title={_('paymentOptions')}
          hideSwitcher={true}
          onClose={this.props.onClose}
        />

        <Form contentContainerStyle={{flex: 1}}>

          <LoadingAlert visible={this.props.isLoading}/>

          <View style={StyleSheet.padding}>
            <TextInput
              type="flat"
              style={StyleSheet.halfMarginTop}
              keyboardType="numeric"
              value={this.state.cardNumber}
              placeholder={_('cardNumber')}
              onChangeText={(cardNumber) => this.setState({cardNumber})}
            />

            <View style={{flexDirection: 'row'}}>
              <TextInput
                type="flat"
                style={[StyleSheet.halfMarginTop, {marginRight: 8}]}
                keyboardType="numeric"
                returnKeyType="next"
                value={this.state.expiryMonth}
                placeholder={_('expiryMonth')}
                onChangeText={(expiryMonth) => this.setState({expiryMonth})}
              />

              <TextInput
                type="flat"
                style={StyleSheet.halfMarginTop}
                keyboardType="numeric"
                value={this.state.expiryYear}
                placeholder={_('expiryYear')}
                onChangeText={(expiryYear) => this.setState({expiryYear})}
              />
            </View>

            <TextInput
              type="flat"
              style={StyleSheet.halfMarginTop}
              keyboardType="numeric"
              value={this.state.cvc}
              placeholder={_('cvc')}
              onChangeText={(cvc) => this.setState({cvc})}
            />
          </View>

        </Form>

        <View style={StyleSheet.interests.footer}>
          <Button
            type={this.validate() ? "dialogDefault" : "dialog"}
            text={_('done')}
            onPress={this.onDonePress}
          />
        </View>

        <KeyboardSpacer/>
      </View>
    );
  }

}
