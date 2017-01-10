
import React from 'react';
import {connect} from 'react-redux';

import _Payments from '../windows/payments';
import {
  navigation as navigationActions,
  payments as paymentsActions,
} from '../actions';

class Payments extends React.Component {

  componentWillMount() {
    //when this component mounts, fetch cards information from Stripe
    this.props.onGetCards();
  }

  render() {

    return (
      <_Payments
        cards={this.props.payments.cards}
        onPressRemove={this.props.onPressRemove}
        isLoading={(
          this.props.payments.isDeletingCard ||
          this.props.payments.isFetchingCards
        )}
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
    onGetCards: () => dispatch(paymentsActions.getCards()),
    onPressRemove: (card) => dispatch(paymentsActions.deleteCard(card.id)),
  }),
)(Payments);
