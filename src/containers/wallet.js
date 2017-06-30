import React, {Component} from 'react'
import {connect} from 'react-redux'

import _Wallet from '../windows/wallet'
import {navigationActions, paymentActions} from '../actions'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let now = new Date()

class Wallet extends Component {

  componentWillMount() {
    // when this component mounts, fetch account information from Stripe
    this.props.onLoadAccount()
    this.props.onGetBalance()
    this.props.onGetTransactions()
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

  render() {
    const payments = this.props.payments

    return (
      <_Wallet
        isLoading={(
          payments.isFetchingAccount ||
          payments.isUpdatingAccount
        )}
        users={this.createFakeUsers()}
        account={Object.assign(
          payments.accountData, 
          {'balance':payments.accountBalance}, 
          payments.accountTransactions
        )}

        onChangeAction={this.props.onChangeAction}
        hasAccount={!!payments.accountData}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
    payments: state.payments,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, false)),
    onCreateAccount: (data) => dispatch(paymentActions.createAccount(data)),
    onLoadAccount: () => dispatch(paymentActions.getAccount()),
    onGetBalance: () => dispatch(paymentActions.getBalance()),
    onGetTransactions: () => dispatch(paymentActions.getTransactions())
  }),
)(Wallet)
