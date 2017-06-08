import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'

import _ from '../i18n'
import {Header, LoadingAlert, Title, Button, Avatar} from '../components'
import StyleSheet from '../styles'
import Icon from '../components//icon'


// const months and lets now, today are needed just create fake dates of payment - needs to be removed
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let now = new Date('01/12/2013')
let today = months[now.getMonth()].toUpperCase() + ' ' + (now.getDay()) + ', ' + now.getFullYear()
let dateChecker = []  //DO NOT REMOVE dateChecker , is needed to compare dates

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
//to be replaced/removed as this funcion just creating fake users data for testing
createFakeUsers() {
  var users = []
  for ( let i = 0;  i < 4;  i++) {
    var userX = {
      id: i,
      name: 'John',
      secondName: 'Johnson',
      activity: 'Swimming Lesson',
      price: Math.floor((Math.random() * 10) + 1),
      imageSrc: 'https://facebook.github.io/react/img/logo_og.png',
      date: months[now.getMonth()].toUpperCase() + ' ' + (now.getDay()) + ', ' + now.getFullYear(),
    }
    users.push(userX)
  }
  for ( let i = 4;  i <= 20;  i++) {
    let user = {
      id: i,
      name: 'John',
      secondName: 'Johnson',
      activity: 'Swimming Lesson',
      price: Math.floor((Math.random() * 10) + 1),
      imageSrc: 'https://facebook.github.io/react/img/logo_og.png',
      date: months[now.getMonth()].toUpperCase() + ' ' + (now.getDay() + i) + ', ' + now.getFullYear(),
    }
    users.push(user)
  }
  return users
}

calculateDisplayData(user, i){

let displayData = []
let displayDate
let display
let displayStyle

  dateChecker.push(user.date)
  if (user.date !== dateChecker[ i - 1 ]){
    if ((user.date === today)) {
      displayDate = 'TODAY'
      display = true
      displayStyle = null
    } else if (user.date !== today) {
        displayDate = user.date
        display = true
        displayStyle = null
    }
  }else {
    displayDate = null
    display = false
    displayStyle = {paddingTop: 3}
  }
displayData = {displayDate, display, displayStyle }

return displayData
}

  render() {
  const users = this.createFakeUsers() // to be replaced

    return (
      <View style={{flex: 1}}>
        <Header title={_('myWallet')} />
        <View style={StyleSheet.padding}>
          <LoadingAlert visible={this.props.isLoading} />
          <View style={{ alignItems: "center"}}>
            {/* values to be replaced with real ones*/}
            <BankInfoCard
              name="Rafal"
              surname="Kaczynski"
              bankName="Loyds"
              accountNumber="00012345"
              sortCode="20-55-34"
              balance={99.75}
            />
          </View>
        </View>
        <View style={{flex:1}}>
          <Title text={'RECENT TRANSACTIONS'}/>
          <ScrollView>
            {users.map((user, i) => {
              let displayData = this.calculateDisplayData(user, i)
              return (
                <UserListInWallet
                  user={user}
                  displayDate={displayData.displayDate}
                  display={displayData.display}
                  displayStyle={displayData.displayStyle}
                />
              )
            })}
          </ScrollView>
          <View style={StyleSheet.wallet.button}>
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

class UserListInWallet extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let user = this.props.user
    let display = this.props.display
    let  displayStyle = this.props.displayStyle

    return(
      <View style={[StyleSheet.wallet.UserListInWallet.container, displayStyle]}>
        {display && (
        <View style={[StyleSheet.wallet.UserListInWallet.dateContainer]}>
          <Text style={[StyleSheet.text, StyleSheet.wallet.UserListInWallet.dateText]}>{this.props.displayDate}</Text>
        </View>
        )}
        <View style={StyleSheet.wallet.UserListInWallet.mainContentContainer}>
          <View style={StyleSheet.wallet.UserListInWallet.imageContainer}>
           <Avatar title={user.name} avatarStyle={StyleSheet.wallet.UserListInWallet.avatarStyle} />
          </View>
          <View style={StyleSheet.wallet.UserListInWallet.textContainer}>
            <Text style={[StyleSheet.text, StyleSheet.wallet.UserListInWallet.textStyle]} numberOfLines={1} ellipsizeMode="tail">
              {user.name + ' ' + user.secondName}
            </Text>
            <Text style={[StyleSheet.text, StyleSheet.wallet.UserListInWallet.activityTextStyle]} numberOfLines={1} ellipsizeMode="tail">
              {user.activity}
            </Text>
          </View>
          <View>
            <Text style={[StyleSheet.text, StyleSheet.wallet.UserListInWallet.price]}>+£{user.price}</Text>
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
              <Text style={[StyleSheet.text, StyleSheet.wallet.bankInfoBox.bankDetailsText]}>{bankNameCaption + '   |   ' + accountNumber + '   |   ' +  sortCode}</Text>
            </View>
          </View>
          <View style={[StyleSheet.wallet.bankInfoBox.iconContainer]}>
            <View style={StyleSheet.wallet.bankInfoBox.iconCircle}>
              <Icon style={StyleSheet.wallet.bankInfoBox.iconStyle} name="actionEdit"/>
            </View>
          </View>
        </View>
        <View style={[StyleSheet.wallet.bankInfoBox.bottom]}>
          <Text style={StyleSheet.wallet.bankInfoBox.balanceLabel}>{_('CurrentBalance')}</Text>
          <Text style={StyleSheet.wallet.bankInfoBox.balance}>£{balance}</Text>
        </View>
      </View>
    )
  }
}
