import React, {Component} from 'react'
import {ScrollView, View, Text, Image} from 'react-native'

import _ from '../i18n'
import {Header, LoadingAlert, Title, Button, Avatar} from '../components'
import StyleSheet from '../styles'
import Icon from '../components//icon'
import {colors, images} from '../styles/resources'



class UserListInWallet extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let user = this.props.user


    return(
      <View style={{flexDirection: 'column', flexJustify: 'flex-start', alignItems: 'flex-start',}}>
        <View style={{paddingLeft: 15,}}>
          <Text style={[StyleSheet.text, {color: colors.pink, fontSize: 12, fontWeight: 'bold'}]}>{this.props.displayDate}</Text>
        </View>
        <View style={[StyleSheet.userListItem.detail, {borderBottomWidth: 1, borderBottomColor: colors.grey}]}>
          <View style={StyleSheet.userListItem.imageContainer}>
            <Avatar user={user} avatarStyle={StyleSheet.userListItem.avatar} />
          </View>
          <View style={StyleSheet.userListItem.textContainer}>
            <Text style={[StyleSheet.text, StyleSheet.userListItem.textStyle, StyleSheet.userListItem.titleTextStyle, {color: colors.grey}]} numberOfLines={1} ellipsizeMode="tail">
              {user.name + ' ' + user.secondName}
            </Text>
            <Text style={[StyleSheet.text, StyleSheet.userListItem.textStyle, {color: colors.grey, fontStyle: 'italic'}]} numberOfLines={1} ellipsizeMode="tail">
              {user.activity}
            </Text>
          </View>
          <View style={{paddingRight: 15}}>
            <Text style={[StyleSheet.text, {color: colors.green, fontWeight: 'bold'}]}>+£{user.price}</Text>
          </View>
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
    const { name, surname, bankName, accountNumber, sortCode, balance} = this.props

    let firstCharOfName = name.charAt(0)
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
//to be replaced with backend
createFakeUsers() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var now = new Date('01/12/2013')
  var users = []
  for ( let i = 0;  i <= 20;  i++) {
    let user = {
      id: i,
      name: 'John',
      secondName: 'Johnson',
      activity: 'Swimming Lesson',
      price: Math.floor((Math.random() * 10) + 1),
      imageSrc: 'https://facebook.github.io/react/img/logo_og.png',
      date: months[now.getMonth()].toUpperCase() + ' ' + (now.getDay() + i) + ' ' + now.getFullYear(),
    }
    users.push(user)
  }
  return users
}

  render() {
/*
    const account = this.props.account
    const titleStyle = StyleSheet.profile.editLabel
    const detailStyle = StyleSheet.payments.accountDataText
    const infoContainer = StyleSheet.profile.infoContainer
    const stripeError = this.getStripeDisplayError()
*/  const users = this.createFakeUsers()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let now = new Date('01/12/2013')
    let today = months[now.getMonth()].toUpperCase() + ' ' + (now.getDay()) + ' ' + now.getFullYear()
    let dateIndex = 0
    return (
      <View style={{flex: 1}}>
        <Header title={_('myWallet')} />
        <View style={StyleSheet.padding}>
          <LoadingAlert visible={this.props.isLoading} />
          <View style={{ alignItems: "center"}}>
            <BankInfoCard
              name="Rafal"
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
          <ScrollView>
          {users.map((user, i) => {
              let dateIndex = 0
              let displayDate
              let dateChecker = []

              if ((user.date === today) && (dateIndex === 0)) {
                displayDate = 'TODAY'
               } else if ((user.date !== today) && (dateIndex === 0)) {
                displayDate = user.date
               }

              dateChecker[i] = displayDate

              if ((i !== 0) && (dateChecker[i] === dateChecker[ i - 1 ])) {
                displayDate = ''
                dateIndex++
              } else {
                dateIndex = 0
              }

              return(
                <UserListInWallet
                  user={user}
                  displayDate={displayDate}
                />
              )
            })}
          </ScrollView>
          <View style={{paddingLeft:20, paddingRight: 20}}>
            <Button
              type="roundedDefault"
              text={_('viewAll')}
              style={[StyleSheet.singleMargin,]}
            />
          </View>

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
