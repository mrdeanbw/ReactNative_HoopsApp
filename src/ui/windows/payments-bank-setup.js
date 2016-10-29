
import React from 'react';

import {View} from 'react-native';
import _ from '../i18n';
import {Header, TextInput, Button, LoadingAlert} from '../components';
import StyleSheet from '../styles';

export default class PaymentsBankSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountNumber: this.props.account.accountNumber,
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

        <View style={[{flex: 1}, StyleSheet.padding]}>

          <LoadingAlert visible={this.props.isLoading}/>

          <TextInput
            type="flat"
            keyboardType="numeric"
            value={this.state.accountNumber}
            placeholder={_('accountNumber')}
            onChangeText={(accountNumber) => this.setState({accountNumber})}
          />

          <TextInput
            type="flat"
            keyboardType="numeric"
            value={this.state.sortCode}
            placeholder={_('sortCode')}
            onChangeText={(sortCode) => this.setState({sortCode})}
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

        </View>

        <View style={StyleSheet.interests.footer}>
          <Button
            type={this.validate() ? "dialogDefault" : "dialog"}
            text={_('done')}
            onPress={this.onDonePress}
          />
        </View>
      </View>
    );
  }

}
