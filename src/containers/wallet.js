import React, {Component} from 'react'
import {connect} from 'react-redux'

import _Wallet from '../windows/wallet'
import {navigationActions, paymentActions} from '../actions'

class Wallet extends Component {

  componentWillMount() {
    // when this component mounts, fetch account information from Stripe
    this.props.onLoadAccount()
    this.props.onGetBalance()
    this.props.onGetTransactions()
  }

  render() {
    const payments = this.props.payments

    return (
      <_Wallet
        isLoading={(
          payments.isFetchingAccount ||
          payments.isUpdatingAccount
        )}

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
