import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {MyEvents as _MyEvents} from '../windows';
import {
  user as userActions,
  events as eventsActions,
  navigation as navigationActions,
} from '../actions';
import inflateEvent from '../data/inflaters/event';

class MyEvents extends React.Component {

  onPressEvent(event) {
    this.props.onNavigate('eventDetails', {id: event.id});
  }

  render() {
    let requests = Object.keys(this.props.user.requests).map(requestId => {
      return this.props.requests.requestsById[requestId];
    }).filter(request => request && request.status === 'confirmed');

    let invites = Object.keys(this.props.user.invites).map(inviteId => {
      return this.props.invites.invitesById[inviteId];
    }).filter(invite => invite && invite.status === 'confirmed');

    let savedEventIds = Object.keys(this.props.user.savedEvents);
    let connectedEventIds = requests.concat(invites).map(connection => {
      return connection.eventId;
    });

    let events = connectedEventIds.map((id) => {
      return this.props.events.eventsById[id];
    }).filter(event => !!event).map(event => {
      return inflateEvent(event, {
        requests: this.props.requests.requestsById,
        invites: this.props.invites.invitesById,
        users: this.props.users.usersById,
      });
    });

    let history = events.filter((event) => {
      return moment(event.date).isBefore();
    });

    let saved = savedEventIds.map(id => {
      return this.props.events.eventsById[id];
    }).map(event => {
      return inflateEvent(event, {
        requests: this.props.requests.requestsById,
        invites: this.props.invites.invitesById,
        users: this.props.users.usersById,
      });
    }).filter(event => !!event);

    let upcoming = events.filter((event) => {
      return moment(event.date).isAfter();
    });

    return (
      <_MyEvents
        onPressEvent={this.onPressEvent.bind(this)}
        onPressCreate={() => this.props.onNavigate('createEvent')}
        onPressSearch={() => this.props.onNavigate('search')}
        upcoming={upcoming}
        saved={saved}
        history={history}
        availability={this.props.user.availability}
        onChangeAvailability={(value) => {
          this.props.onChangeAvailability(value);
        }}
        onPressOrganizerDetails={(user) => {
          this.props.onNavigate('profile', {id: user.id});
        }}
        onPressDropOut={this.props.onPressDropOut}
        onPressUnsave={this.props.onPressUnsave}
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
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onChangeAvailability: (value) => dispatch(userActions.setAvailability(value)),
    onPressDropOut: (event) => dispatch(eventsActions.quit(event.id)),
    onPressUnsave: (event) => dispatch(eventsActions.unsave(event.id)),
  }),
)(MyEvents);
