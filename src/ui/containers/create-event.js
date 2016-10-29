
import React from 'react';
import {connect} from 'react-redux';
import {CreateEvent as _CreateEvent} from '../windows';
import {user, navigation, events} from '../../actions';

class CreateEvent extends React.Component {

  render() {
    let interests = Object.keys(this.props.interests.interestsById).map(id => {
      return this.props.interests.interestsById[id];
    });

    return (
      <_CreateEvent
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        onComplete={(eventData) => {
          eventData = {
            ...eventData,
            //Replace activity object with it's key (i.e 'BASKETBALL')
            activity: eventData.activity.key,
            //Replace address with it's text description (i.e. 'New York, USA')
            address: eventData.address.text,
            addressGooglePlaceId: eventData.address.key,
          };
          this.props.onSaveEvent(eventData);
          this.props.onNavigateBack();
        }}
        onSelectAppPayments={() => {
          if(!this.props.user.stripeAccount) {
            this.props.onNavigate('paymentsBankSetup');
          }
        }}
        interests={interests}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    events: state.events,
    payments: state.payments,
    interests: state.interests,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onNavigateBack: () => dispatch(navigation.pop()),
    onToggleMode: () => dispatch(user.toggleMode()),
    onSaveEvent: (eventData) => dispatch(events.create(eventData)),
  }),
)(CreateEvent);
