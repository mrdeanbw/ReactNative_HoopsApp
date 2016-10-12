
import React from 'react';
import {connect} from 'react-redux';
import _PaymentsAddCard from '../windows/payments-add-card';
import {
  navigation as navigationActions,
  payments as paymentsActions,
} from '../../actions';

class PaymentsAddCard extends React.Component {

  render() {
    return (
      <_PaymentsAddCard
        isLoading={this.props.payments.isUpdatingAccount}
        onDonePress={(data) => {
          this.props.onCreateCard({
            ...data,
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
    onCreateCard: (data) => dispatch(paymentsActions.createCard(data)),
  }),
)(PaymentsAddCard);
