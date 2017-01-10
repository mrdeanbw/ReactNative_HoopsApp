import React from 'react';
import {connect} from 'react-redux';

import _Wallet from '../windows/wallet';
import {
  navigation as navigationActions,
  payments as paymentsActions,
} from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    //when this component mounts, fetch account information from Stripe
    this.props.onLoadAccount();
  }

  render() {
    return (
      <_Wallet
        isLoading={(
          this.props.payments.isFetchingAccount ||
          this.props.payments.isUpdatingAccount
        )}
        account={this.props.payments.accountData}
        onChangeAction={this.props.onChangeAction}
        hasAccount={this.hasAccount.bind(this)}
      />
    );
  }

  hasAccount() {
    const account = this.props.payments.accountData;
    return account && account.accountNumber || false;
  }
}

export default connect(
  (state) => ({
    user: state.user,
    payments: state.payments,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, false)),
    onCreateAccount: (data) => dispatch(paymentsActions.createAccount(data)),
    onLoadAccount: () => dispatch(paymentsActions.getAccount()),
  }),
)(Wallet);
