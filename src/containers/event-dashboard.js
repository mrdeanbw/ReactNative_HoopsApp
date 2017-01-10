
import React from 'react';
import {connect} from 'react-redux';

import _EventDashboard from '../windows/event-dashboard';
import {events, navigation} from '../actions';

class EventDashboard extends React.Component {

  onCancel(message) {
    this.props.onCancel(this.props.id, message);
    this.props.onNavigateBack();
  }

  onPressDetails() {
    this.props.onNavigate('eventDetails', {id: this.props.id});
  }

  onPressMembers() {
    this.props.onNavigate('eventMembers', {id: this.props.id});
  }

  onPressMessages() {
    //this.props.onNavigate('eventMessages', {id: this.props.id});
  }

  onPressGallery() {
    //this.props.onNavigate('eventGallery', {id: this.props.id});
  }

  onPressFinances() {
    //this.props.onNavigate('eventFinances', {id: this.props.id});
  }

  onPressRequests() {
    this.props.onNavigate('eventRequests', {id: this.props.id}, false);
  }

  render() {
    return (
      <_EventDashboard
        event={this.props.events.eventsById[this.props.id]}
        onCancel={this.onCancel.bind(this)}
        onPressDetails={this.onPressDetails.bind(this)}
        onPressMembers={this.onPressMembers.bind(this)}
        onPressMessages={this.onPressMessages.bind(this)}
        onPressGallery={this.onPressGallery.bind(this)}
        onPressFinances={this.onPressFinances.bind(this)}
        onPressRequests={this.onPressRequests.bind(this)}
        actionButton={this.props.actionButton}
        onBack={this.props.onNavigateBack}
      />
    );
  }
}

EventDashboard.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    user: state.user,
    router: state.router,
    events: state.events,
  }),
  (dispatch) => ({
    onNavigate: (key, props, subTab) => dispatch(navigation.push({key, props}, subTab)),
    onNavigateBack: () => dispatch(navigation.pop()),
    onCancel: (eventId, message) => dispatch(events.cancel(eventId, message)),
  }),
)(EventDashboard);
