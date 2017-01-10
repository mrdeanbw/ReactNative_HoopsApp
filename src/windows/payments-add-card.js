import React from 'react';
import {View, Text} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {Header, TextInput, Button, LoadingAlert, Form} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

const zeroPad = (number) => {
  if(number) {
    return ("00" + number).slice(-2);
  } else {
    return "";
  }
};

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
      expiryMonth: undefined,
      expiryYear: undefined,
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

    let numberError, monthError, yearError, cvcError;
    if(this.props.error) {
      let errorComponent = (
        <Text style={StyleSheet.login.errorText}>
          {this.props.error.message}
        </Text>
      );

      switch(this.props.error.param) {
        case 'number':
          numberError = errorComponent;
          break;
        case 'exp_month':
          monthError = errorComponent;
          break;
        case 'exp_year':
          yearError = errorComponent;
          break;
        case 'cvc':
          cvcError = errorComponent;
          break;
      }

    }

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
            {numberError}
            <TextInput
              type="flat"
              style={StyleSheet.halfMarginTop}
              error={!!numberError}
              keyboardType="numeric"
              value={this.state.cardNumber}
              placeholder={_('cardNumber')}
              onChangeText={(cardNumber) => this.setState({cardNumber})}
            />

            {monthError}
            {yearError}
            <View style={{flexDirection: 'row'}}>
              <TextInput
                type="flat"
                style={[StyleSheet.halfMarginTop, {marginRight: 8}]}
                error={!!monthError}
                keyboardType="numeric"
                returnKeyType="next"
                value={this.state.expiryMonth}
                placeholder={_('expiryMonth')}
                onChangeText={(expiryMonth) => {
                  let month = parseInt(expiryMonth.substr(0, 2), 10);
                  if(!isNaN(month) && month >= 1 && month <= 12){
                    this.setState({expiryMonth: month});
                  }
                }}
                onBlur={() => {
                  this.setState({expiryMonth: zeroPad(this.state.expiryMonth)});
                }}
              />

              <TextInput
                type="flat"
                style={StyleSheet.halfMarginTop}
                error={!!yearError}
                keyboardType="numeric"
                value={this.state.expiryYear}
                placeholder={_('expiryYear')}
                onChangeText={(expiryYear) => {
                  let year = parseInt(expiryYear.substr(0, 2), 10);
                  if(!isNaN(year)){
                    this.setState({expiryYear: year});
                  }
                }}
                onBlur={() => {
                  this.setState({expiryYear: zeroPad(this.state.expiryYear)});
                }}
              />
            </View>

            {cvcError}
            <TextInput
              type="flat"
              style={StyleSheet.halfMarginTop}
              error={!!cvcError}
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
