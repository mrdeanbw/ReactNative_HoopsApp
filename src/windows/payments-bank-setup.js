import React from 'react';
import {View, Text} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {Header, TextInput, Button, LoadingAlert, Form} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class PaymentsBankSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountNumberPlaceholder: this.props.account.accountNumber,
      accountNumber: '',
      sortCode: this.props.account.sortCode,
      addressLine1: this.props.account.addressLine1,
      addressLine2: this.props.account.addressLine2,
      city: this.props.account.city,
      postcode: this.props.account.postcode,
    };
  }

  onDonePress = () => {
    if(!this.validate()) {
      return;
    }

    //Remove any dashes or other non-numerics from sort code
    let sortCode = (this.state.sortCode || '').replace(/[^0-9]/g, '');

    this.props.onDonePress({
      accountNumber: this.state.accountNumber,
      sortCode: sortCode,
      addressLine1: this.state.addressLine1,
      addressLine2: this.state.addressLine2,
      city: this.state.city,
      postcode: this.state.postcode,
    });
  };

  validate = () => {
    return (
      this.state.accountNumber && this.state.accountNumber.search(/[^0-9]/) === -1 &&
      this.state.sortCode &&
      this.state.addressLine1 &&
      this.state.city &&
      this.state.postcode
    );
  }

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

        <Form style={[{flex: 1}, StyleSheet.padding]}>

          <LoadingAlert visible={this.props.isLoading}/>

          {this.props.error && (
            <Text style={StyleSheet.login.errorText}>
              {this.props.error.message}
            </Text>
          )}

          <TextInput
            type="flat"
            keyboardType="numeric"
            value={this.state.accountNumber}
            placeholder={this.state.accountNumberPlaceholder || _('accountNumber')}
            onChangeText={(accountNumber) => this.setState({accountNumber})}
          />

          <TextInput
            type="flat"
            keyboardType="numeric"
            value={this.state.sortCode}
            placeholder={_('sortCode')}
            onChangeText={(sortCode) => {
              let numbers = sortCode.replace(/[^0-9]/g, ''); //strip non-numbers
              numbers = numbers.substr(0, 6); //Only allow up to 6 numbers
              let matches = numbers.match(/([0-9]{1,2})/g);
              if(matches) {
                sortCode = matches.join('-'); //join with dashes in numerical pairs
              }
              this.setState({sortCode})
            }}
          />

          <TextInput
            type="flat"
            value={this.state.addressLine1}
            placeholder={_('addressLine1')}
            onChangeText={(addressLine1) => this.setState({addressLine1})}
          />
          <TextInput
            type="flat"
            value={this.state.addressLine2}
            placeholder={_('addressLine2')}
            onChangeText={(addressLine2) => this.setState({addressLine2})}
          />
          <TextInput
            type="flat"
            value={this.state.city}
            placeholder={_('city')}
            onChangeText={(city) => this.setState({city})}
          />
          <TextInput
            type="flat"
            value={this.state.postcode}
            placeholder={_('postcode')}
            onChangeText={(postcode) => this.setState({postcode})}
          />

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
