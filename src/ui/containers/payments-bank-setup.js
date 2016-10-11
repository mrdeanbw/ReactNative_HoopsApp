
import React from 'react';
import {connect} from 'react-redux';
import _PaymentsBankSetup from '../windows/payments-bank-setup';
import {
  navigation as navigationActions,
  payments as paymentsActions,
} from '../../actions';

class PaymentsBankSetup extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <_PaymentsBankSetup
        account={this.props.payments.accountData}
        isLoading={this.props.payments.isUpdatingAccount}
        onDonePress={(data) => {
          this.props.onCreateAccount({
            ...data,
            name: this.props.user.name,
            email: this.props.user.email,
            dob: this.props.user.dob,
            uid: this.props.user.uid,
          });
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    payments: state.payments,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, false)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onCreateAccount: (data) => dispatch(paymentsActions.createAccount(data)),
  }),
)(PaymentsBankSetup);