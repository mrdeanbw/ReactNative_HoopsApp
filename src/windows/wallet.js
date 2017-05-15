import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'

import _ from '../i18n'
import {Header, LoadingAlert} from '../components'
import StyleSheet from '../styles'
import Icon from '../components//icon'
import {colors} from '../styles/resources'


class BankInfoCard extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { name, city, accountNumber, sortCode, balance} = this.props



    return(
<View elevation={5} style={[StyleSheet.wallet.bankInfoBox.container]}>
    <View style={[StyleSheet.wallet.bankInfoBox.top]}>
        <View style={[StyleSheet.wallet.bankInfoBox.detailsContainer,]}>
            <View style={[StyleSheet.wallet.bankInfoBox.nameContainer]}>
              <Text style={[StyleSheet.text, {color: colors.white, paddingTop: 15, paddingLeft: 15, fontWeight: "bold" }]}>URBONAS J</Text>
            </View>
            <View style={[StyleSheet.wallet.bankInfoBox.bankDetails]}>
              <Text style={[StyleSheet.text, {color: colors.white, fontSize: 12, paddingLeft: 15, paddingBottom: 15, }]}>NETWEST | 1234567 | 20-30-40</Text>
            </View>
        </View>
        <View style={[StyleSheet.wallet.bankInfoBox.iconContainer]}>
            <View style={{borderRadius: 30, borderColor: colors.white, borderWidth: 1, padding: 3}}>
              <Icon  name="actionEdit2x"/>
            </View>
        </View>
    </View>
    <View style={[StyleSheet.wallet.bankInfoBox.bottom]}>
          <Text style={[{color: colors.black}]}>Current balance</Text>
          <Text style={[{color: colors.green, fontWeight: "bold"}]}>£86.90</Text>
    </View>
</View>
    )
  }
}

class Wallet extends Component {

  getStripeDisplayError() {
    if (!this.props.account || !this.props.account.verification) {
      return
    }

    const verification = this.props.account.verification
    let error

    switch(verification.disabled_reason) {
      case 'rejected.fraud':
        error = 'This account is rejected due to suspected fraud or illegal activity.'
        break
      case 'rejected.terms_of_service':
        error = 'This account is rejected due to suspected terms of service violations.'
        break
      case 'rejected.listed':
        error = 'This account is rejected due to a match on a third party prohibited persons or companies list (such as financial services provider or government).'
        break
      case 'rejected.other':
        error = 'This account is rejected.'
        break
      case 'fields_needed':
        error = 'Additional verification information is required in order to enable payout or charge capabilities on this account.'
        break
      case 'listed':
        error = 'This account might be a match on a prohibited persons or companies list. We will investigate and either reject or reinstate the account appropriately.'
        break
      case 'other':
        error = 'This account is not rejected but disabled for other reasons.'
        break
    }

    return error
  }

  render() {
    const account = this.props.account
    const titleStyle = StyleSheet.profile.editLabel
    const detailStyle = StyleSheet.payments.accountDataText
    const infoContainer = StyleSheet.profile.infoContainer
    const stripeError = this.getStripeDisplayError()

    return (
      <View style={{flex: 1}}>
        <Header title={_('myWallet')} />
        <View style={StyleSheet.padding}>
          <LoadingAlert visible={this.props.isLoading} />
          <View style={{ alignItems: "center"}}>
            <BankInfoCard/>
          </View>
        </View>
        <View style={{flex:1}}>
          <Header title={_('myWallet')} simple noIconBack/>
          {account && account.accountNumber ? (
            <ScrollView>
              <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Text style={[StyleSheet.text, StyleSheet.highlightText, StyleSheet.alignCenter]}>
                  {_('walletInfo1')}
                </Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                  <Text style={[StyleSheet.text, StyleSheet.highlightText, StyleSheet.alignCenter]}>
                    {_('walletInfo2')}
                  </Text>
                  <Icon name="info" />
                </View>

              </View>

              {stripeError && (
                <View style={[infoContainer ,{padding: 15}]}>
                  <Text style={[StyleSheet.text, StyleSheet.highlightText, StyleSheet.alignCenter]}>
                    {stripeError}§
                  </Text>
                </View>
              )}


              {account.firstName && (
                <View>
                  <Text style={titleStyle}>{_('firstName')}</Text>
                  <Text style={detailStyle}>{account.firstName}</Text>
                </View>
              )}

              {account.lastName && (
                <View>
                  <Text style={titleStyle}>{_('lastName')}</Text>
                  <Text style={detailStyle}>{account.lastName}</Text>
                </View>
              )}

              {account.accountNumber && (
                <View>
                  <Text style={titleStyle}>{_('accountNumber')}</Text>
                  <Text style={detailStyle}>{account.accountNumber}</Text>
                </View>
              )}

              {account.sortCode && (
                <View>
                  <Text style={titleStyle}>{_('sortCode')}</Text>
                  <Text style={detailStyle}>{account.sortCode}</Text>
                </View>
              )}

              {account.addressLine1 && (
                <View>
                  <Text style={titleStyle}>{_('addressLine1')}</Text>
                  <Text style={detailStyle}>{account.addressLine1}</Text>
                </View>
              )}

              {account.addressLine2 && (
                <View>
                  <Text style={titleStyle}>{_('addressLine2')}</Text>
                  <Text style={detailStyle}>{account.addressLine2}</Text>
                </View>
              )}

              {account.city && (
                <View>
                  <Text style={titleStyle}>{_('city')}</Text>
                  <Text style={detailStyle}>{account.city}</Text>
                </View>
              )}

              {account.postcode && (
                <View>
                  <Text style={titleStyle}>{_('postcode')}</Text>
                  <Text style={detailStyle}>{account.postcode}</Text>
                </View>
              )}
            </ScrollView>
          ) : (
            <Text style={StyleSheet.payments.noCardsText}>{_('noAccount')}</Text>
          )}
        </View>
      </View>
    )
  }
}

export default Wallet
