
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import _EventDashboard from '../windows/event-dashboard';

class EventDashboard extends React.Component {

  onCancel() {
    RouterActions.pop();
  }

  onPressDetails() {
    RouterActions.eventDetails({id: this.props.id});
  }

  onPressMembers() {
    RouterActions.eventMembers({id: this.props.id});
  }

  onPressMessages() {
    RouterActions.eventMessages({id: this.props.id});
  }

  onPressGallery() {
    RouterActions.eventGallery({id: this.props.id});
  }

  onPressFinances() {
    RouterActions.eventFinances({id: this.props.id});
  }

  onPressRequests() {
    RouterActions.eventRequests({id: this.props.id});
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
      />
    );
  }
}

EventDashboard.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    router: state.router,
    events: state.events,
  }),
  (dispatch) => ({
  }),
)(EventDashboard);
