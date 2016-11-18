
import React from 'react';
import {connect} from 'react-redux';
import {CreateEvent as _CreateEvent} from '../windows';
import {navigation, events} from '../../actions';

class CreateEvent extends React.Component {

  constructor() {
    super();
    this.state = {
      activityKey: null,
    };
  }

  render() {
    let interests = Object.keys(this.props.interests.interestsById).map(id => {
      return this.props.interests.interestsById[id];
    });

    return (
      <_CreateEvent
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        onPressActivity={() => {
          this.props.onNavigate('activitiesSelect', {
            activities: this.props.interests.interestsById,
            onSelect: (activityKey) => {
              this.setState({activityKey});
              this.props.onNavigateBack();
            }
          }, false);
        }}
        activity={this.props.interests.interestsById[this.state.activityKey]}
        onComplete={(eventData) => {
          eventData = {
            ...eventData,
            //Replace activity text with it's key (i.e 'BASKETBALL')
            activity: this.state.activityKey,
            //Replace address with it's text description (i.e. 'New York, USA')
            address: eventData.address.text,
            addressGooglePlaceId: eventData.address.key,
          };
          this.props.onSaveEvent(eventData);
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
    onNavigate: (key, props, subTab) => dispatch(navigation.push({key, props}, subTab)),
    onNavigateBack: () => dispatch(navigation.pop()),
    onSaveEvent: (eventData) => dispatch(events.create(eventData)),
  }),
)(CreateEvent);
