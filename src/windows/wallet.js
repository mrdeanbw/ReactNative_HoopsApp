import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'

import _ from '../i18n'
import {Header, LoadingAlert} from '../components'
import StyleSheet from '../styles'
import Icon from '../components//icon'

class Wallet extends Component {

  render() {
    const account = this.props.account
    const titleStyle = StyleSheet.profile.editLabel
    const detailStyle = StyleSheet.payments.accountDataText
    const infoContainer = StyleSheet.profile.infoContainer

    return (

      <View style={{flex: 1,}}>

        <Header title={_('myWallet')} />

        <View style={StyleSheet.padding}>
          <LoadingAlert visible={this.props.isLoading} />

          <View style={infoContainer}>
              <Text style={[StyleSheet.text, StyleSheet.highlightText, StyleSheet.alignCenter]}>
                Money will be paid out on a weekly basis
              </Text>
              <Icon name="info" />
          </View>

          {account && account.accountNumber ? (
            <ScrollView>
              <Text style={titleStyle}>{_('firstName')}</Text>
              <Text style={detailStyle}>{account.firstName}</Text>

              <Text style={titleStyle}>{_('lastName')}</Text>
              <Text style={detailStyle}>{account.lastName}</Text>

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
