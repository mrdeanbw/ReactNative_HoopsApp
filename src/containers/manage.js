import React from 'react';
import {connect} from 'react-redux';

import {Manage as _Manage} from '../windows';
import {navigation} from '../actions';
import inflateEvent from '../data/inflaters/event';

class Manage extends React.Component {

  onPressEvent(event) {
    if(this.props.user.mode === 'ORGANIZE') {
      this.props.onNavigate('eventDashboard', {id: event.id});
    }else{
      this.props.onNavigate('eventDetails', {id: event.id});
    }
  }

  render() {
    let events = Object.keys(this.props.user.organizing).map(eventId => {
      return inflateEvent(this.props.events.eventsById[eventId], {
        requests: this.props.requests.requestsById,
        invites: this.props.invites.invitesById,
        users: this.props.users.usersById,
      });
    }).filter(event => !!event);

    return (
      <_Manage
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        onPressEvent={this.onPressEvent.bind(this)}
        events={events}
        onPressCreate={() => {}}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    events: state.events,
    requests: state.requests,
    invites: state.invites,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props}, true)),
  }),
)(Manage);
