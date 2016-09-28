
import React from 'react';
import {connect} from 'react-redux';
import {Home as _Home} from '../windows';
import {user, navigation} from '../../actions';

class Home extends React.Component {

  onPressEvent(event) {
    if(this.props.user.mode === 'ORGANIZE') {
      this.props.onNavigate('eventDashboard', {id: event.id});
    }else{
      this.props.onNavigate('eventDetails', {id: event.id});
    }
  }

  render() {
    let eventIds = [];
    if(this.props.user.mode === 'ORGANIZE') {
      eventIds = Object.keys(this.props.user.organizing);
    } else {
      let requests = Object.keys(this.props.user.requests).map(requestId => {
        return this.props.requests.requestsById[requestId];
      }).filter(request => request.status === 'confirmed');

      let invites = Object.keys(this.props.user.invites).map(inviteId => {
        return this.props.invites.invitesById[inviteId];
      }).filter(invite => invite.status === 'confirmed');

      eventIds = requests.concat(invites).map(connection => {
        return connection.eventId;
      });
    }

    let events = eventIds.map((id) => {
      return this.props.events.eventsById[id];
    });

    events = events.filter(event => !!event); //remove events that are undefined

    events = events.sort((a, b) => {
      return a.date > b.date ? 1 : -1;
    });

    return (
      <_Home
        onPressEvent={this.onPressEvent.bind(this)}
        events={events}
        onPressAdd={() => this.props.onNavigate('createEvent')}
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    events: state.events,
    requests: state.requests,
    invites: state.invites,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props}, true)),
    onToggleMode: () => dispatch(user.toggleMode()),
  }),
)(Home);
