import React, {Component} from 'react'
import {View, Text} from 'react-native'

import _ from '../../i18n'
import StyleSheet from '../../styles'
import Icon from '../../components//icon'

class BankInfoCard extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const { accountData } = this.props

    let firstCharOfName = accountData.firstName && accountData.firstName.charAt(0)
    let surnameCaption = accountData.lastName && accountData.lastName.toUpperCase()

    //Need to get bank name...
    let bankNameCaption = 'Account'.toUpperCase()

    return(
      <View elevation={5} style={[StyleSheet.wallet.bankInfoBox.container]}>

        {firstCharOfName && surnameCaption && bankNameCaption && (
        <View style={[StyleSheet.wallet.bankInfoBox.top]}>
          <View style={[StyleSheet.wallet.bankInfoBox.detailsContainer,]}>
            <View style={[StyleSheet.wallet.bankInfoBox.nameContainer]}>
              <Text style={[StyleSheet.text, StyleSheet.wallet.bankInfoBox.name]}>{surnameCaption + ' ' + firstCharOfName}</Text>
            </View>
            <View style={[StyleSheet.wallet.bankInfoBox.bankDetails]}>
              <Text style={[StyleSheet.text, StyleSheet.wallet.bankInfoBox.bankDetailsText]}>{bankNameCaption + '   |   ' + accountData.accountNumber + '   |   ' +  accountData.sortCode}</Text>
            </View>
          </View>
          <View style={[StyleSheet.wallet.bankInfoBox.iconContainer]}>
            <View style={StyleSheet.wallet.bankInfoBox.iconCircle}>
              <Icon style={StyleSheet.wallet.bankInfoBox.iconStyle} name="actionEdit"/>
            </View>
          </View>
        </View>
        )}

        {accountData.balance.available && accountData.balance.pending && (
        <View style={[StyleSheet.wallet.bankInfoBox.bottom]}>
          <Text style={StyleSheet.wallet.bankInfoBox.balanceLabel}>{_('CurrentBalance')}</Text>
          <Text style={StyleSheet.wallet.bankInfoBox.balance}>£ {(accountData.balance.available[0].amount / 100).toFixed(2)}
            <Text style={StyleSheet.wallet.bankInfoBox.pending}> (£ {(accountData.balance.pending[0].amount / 100).toFixed(2)} pending)</Text>
          </Text>
        </View>
        )}

      </View>
    )
  }
}

export default BankInfoCard
