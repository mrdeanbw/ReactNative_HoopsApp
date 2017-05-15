import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'

import _ from '../i18n'
import {Header, LoadingAlert, Title, Button, Avatar} from '../components'
import StyleSheet from '../styles'
import Icon from '../components//icon'
import {colors} from '../styles/resources'

class UserListInWallet extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let user = this.props.user
    return(
          <View style={StyleSheet.userListItem.detail}>
            <View style={StyleSheet.userListItem.imageContainer}>
              <Avatar user={user} avatarStyle={StyleSheet.userListItem.avatar} />
            </View>

            <View style={StyleSheet.userListItem.textContainer}>
              <Text style={[StyleSheet.text, StyleSheet.userListItem.textStyle, StyleSheet.userListItem.titleTextStyle]} numberOfLines={1} ellipsizeMode="tail">
                {user.name}
                {this.props.paymentMethod === 'app' && (
                  <Text style={StyleSheet.userListItem.paidText}> ({_('paid')})</Text>
                )}
                {this.props.paymentMethod === 'cash' && (
                  <Text style={StyleSheet.userListItem.cashText}> ({_('cash')})</Text>
                )}
              </Text>
              <Text style={[StyleSheet.text, StyleSheet.userListItem.textStyle]} numberOfLines={1} ellipsizeMode="tail">
                <Text>{user.city}</Text>
                <Text>{'\u00a0\u00a0|\u00a0\u00a0'}</Text>
                {!!age && (
                  <Text>{_('age')}: {age}</Text>
                )}
              </Text>
            </View>
          </View>
    )
  }
}


class BankInfoCard extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const { firstName, surname, bankName, accountNumber, sortCode, balance} = this.props

    let firstCharOfName = firstName.charAt(0)
    let surnameCaption = surname.toUpperCase()
    let bankNameCaption = bankName.toUpperCase()
    return(
      <View elevation={5} style={[StyleSheet.wallet.bankInfoBox.container]}>
        <View style={[StyleSheet.wallet.bankInfoBox.top]}>
          <View style={[StyleSheet.wallet.bankInfoBox.detailsContainer,]}>
            <View style={[StyleSheet.wallet.bankInfoBox.nameContainer]}>
              <Text style={[StyleSheet.text, StyleSheet.wallet.bankInfoBox.name]}>{surnameCaption + ' ' + firstCharOfName}</Text>
            </View>
            <View style={[StyleSheet.wallet.bankInfoBox.bankDetails]}>
              <Text style={[StyleSheet.text, StyleSheet.wallet.bankInfoBox.bankDetailsText]}>{bankNameCaption + ' | ' + accountNumber + ' | ' +  sortCode}</Text>
            </View>
          </View>
          <View style={[StyleSheet.wallet.bankInfoBox.iconContainer]}>
            <View style={StyleSheet.wallet.bankInfoBox.iconCircle}>
              <Icon  name="actionEdit2x"/>
            </View>
          </View>
        </View>
        <View style={[StyleSheet.wallet.bankInfoBox.bottom]}>
          <Text style={StyleSheet.wallet.bankInfoBox.balanceLabel}>Current Balance</Text>
          <Text style={StyleSheet.wallet.bankInfoBox.balance}>£{balance}</Text>
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
/*
    const account = this.props.account
    const titleStyle = StyleSheet.profile.editLabel
    const detailStyle = StyleSheet.payments.accountDataText
    const infoContainer = StyleSheet.profile.infoContainer
    const stripeError = this.getStripeDisplayError()
*/

// temprorary staff needs to be replaced with backend
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var now = new Date('01/12/2013')

for ( let i = 0  i <= 20  i++) {
  let users = {
    id: i,
    firstName: 'John',
    secondName: 'Johnson',
    activity: 'swimming lesson',
    price: Math.floor((Math.random() * 10) + 1),
    image:'../styles/resources/images/logo.png',
    date: months[now.getMonth()] + ' ' + (now.getDay()+i) +' ' + now.getFullYear(),
  }
}

    return (
      <View style={{flex: 1}}>
        <Header title={_('myWallet')} />
        <View style={StyleSheet.padding}>
          <LoadingAlert visible={this.props.isLoading} />
          <View style={{ alignItems: "center"}}>
            <BankInfoCard
              firstName="Rafal"
              surname="Kaczynski"
              bankName="Loyds"
              accountNumber="00012345"
              sortCode="20-55-34"
              balance={99}
            />
          </View>
        </View>
        <View style={{flex:1}}>
          <Title text={'RECENT TRANSATIONS'}/>

          <Button
            type="roundedDefault"
            text={_('viewAll')}
            style={[StyleSheet.singleMargin, StyleSheet.tripleMarginBottom]}
          />
        </View>
      </View>
    )
  }
}

export default Wallet


         {/* {account && account.accountNumber ? (
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
          )}*/}
