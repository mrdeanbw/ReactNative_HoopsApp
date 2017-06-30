import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'

import _ from '../i18n'
import {Header, LoadingAlert, Title, Button} from '../components'
import {UserListInWallet, BankInfoCard} from '../components/wallet'
import {calculateDisplayData} from '../utils'
import StyleSheet from '../styles'
import Icon from '../components/icon'

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
    const users = this.props.users // to be replaced
    const account = this.props.account
    const titleStyle = StyleSheet.profile.editLabel
    const detailStyle = StyleSheet.payments.accountDataText
    const infoContainer = StyleSheet.profile.infoContainer
    const stripeError = this.getStripeDisplayError()

    debugger


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
              let displayData = calculateDisplayData(user, i)
              return (
                <UserListInWallet
                  key={i}
                  user={user}
                  displayDate={displayData.displayDate}
                  display={displayData.display}
                  displayStyle={displayData.displayStyle}
                />
              )
            })}

              {/*{account.balance && (
                <View>
                  <Text style={titleStyle}>{_('balanceAvailable')}</Text>
                  <Text style={detailStyle}>{account.balance.available[0].amount}</Text>
                </View>
              )}

              {account.balance && (
                <View>
                  <Text style={titleStyle}>{_('balancePending')}</Text>
                  <Text style={detailStyle}>{account.balance.pending[0].amount}</Text>
                </View>
              )}

              {account.transactions && account.transactions.map((transaction)=>{
                return(
                  <View key={transaction.source}>
                    <Text style={titleStyle}>{_('transaction')}</Text>
                    <Text style={detailStyle}>{transaction.amount}</Text>
                    <Text style={detailStyle}>{transaction.status}</Text>
                    <Text style={detailStyle}>{transaction.type}</Text>
                    <Text style={detailStyle}>{transaction.currency}</Text>
                    <Text style={detailStyle}>{transaction.source}</Text>
                  </View>
                )
              })}*/}



            <View style={StyleSheet.wallet.button}>
              <Button
                type="roundedDefault"
                text={_('viewAll')}
                style={[StyleSheet.singleMargin,]}
              />
            </View>


          </ScrollView>




            {/*{account && account.accountNumber ? (
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
                    {stripeError}
                  </Text>
                </View>
              )}

              {account.balance && (
                <View>
                  <Text style={titleStyle}>{_('balanceAvailable')}</Text>
                  <Text style={detailStyle}>{account.balance.available[0].amount}</Text>
                </View>
              )}

              {account.balance && (
                <View>
                  <Text style={titleStyle}>{_('balancePending')}</Text>
                  <Text style={detailStyle}>{account.balance.pending[0].amount}</Text>
                </View>
              )}

              {account.transactions && account.transactions.map((transaction)=>{
                return(
                  <View key={transaction.source}>
                    <Text style={titleStyle}>{_('transaction')}</Text>
                    <Text style={detailStyle}>{transaction.amount}</Text>
                    <Text style={detailStyle}>{transaction.status}</Text>
                    <Text style={detailStyle}>{transaction.type}</Text>
                    <Text style={detailStyle}>{transaction.currency}</Text>
                    <Text style={detailStyle}>{transaction.source}</Text>
                  </View>
                )
              })}

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





        </View>
      </View>
    )
  }
}

export default Wallet
