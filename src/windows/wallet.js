
import React from 'react';
import {View, Text} from 'react-native';

import _ from '../i18n';
import {Header, LoadingAlert} from '../components';
import StyleSheet from '../styles';

export default class Wallet extends React.Component {
  componentWillMount() {
    if (!this.props.hasAccount()) {
        this.props.onChangeAction({
          text: _('add'),
          icon: "actionAdd",
        });
    }
  }

  render() {
    let account = this.props.account;

    let titleStyle = StyleSheet.profile.editLabel;
    let detailStyle = StyleSheet.payments.accountDataText;

    return (
      <View style={{flex: 1}}>
        <Header
          title={_('myWallet')}
        />

        <View style={StyleSheet.padding}>
          <LoadingAlert visible={this.props.isLoading} />

          {account && account.accountNumber ? (
            <View>
              <Text style={titleStyle}>{_('accountNumber')}</Text>
              <Text style={detailStyle}>{account.accountNumber}</Text>

              <Text style={titleStyle}>{_('sortCode')}</Text>
              <Text style={detailStyle}>{account.sortCode}</Text>


              <Text style={titleStyle}>{_('addressLine1')}</Text>
              <Text style={detailStyle}>{account.addressLine1}</Text>

              <Text style={titleStyle}>{_('addressLine2')}</Text>
              <Text style={detailStyle}>{account.addressLine2}</Text>

              <Text style={titleStyle}>{_('city')}</Text>
              <Text style={detailStyle}>{account.city}</Text>

              <Text style={titleStyle}>{_('postcode')}</Text>
              <Text style={detailStyle}>{account.postcode}</Text>

            </View>
          ) : (
            <Text style={StyleSheet.payments.noCardsText}>{_('noAccount')}</Text>
          )}
        </View>

      </View>
    );
  }

}
