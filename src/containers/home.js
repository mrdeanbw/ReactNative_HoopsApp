import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {Home as _Home} from '../windows';
import {navigation, search} from '../actions';
import inflateEvent from '../data/inflaters/event';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      location: {
        lat: undefined,
        lon: undefined,
      },
    };

    this._watchId = navigator.geolocation.watchPosition(position => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
      });
    }, (err) => {
      console.warn(err); //eslint-disable-line no-console
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this._watchId);
  }

  componentWillUpdate(nextProps, nextState) {
    //If location gets set for the first time, or gender changes, or new events added
    if(
      !this.state.location.lat && nextState.location.lat ||
      this.props.user.gender !== nextProps.user.gender ||
      (
        Object.keys(this.props.events.eventsById).length !==
        Object.keys(nextProps.events.eventsById).length
      )
    ) {
      this.props.onSearchNearby({
        lat: nextState.location.lat,
        lon: nextState.location.lon,
        gender: nextProps.user.gender,
      });
    }
  }

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
      }).filter(request => request && request.status === 'confirmed');

      let invites = Object.keys(this.props.user.invites).map(inviteId => {
        return this.props.invites.invitesById[inviteId];
      }).filter(invite => invite && invite.status === 'confirmed');

      eventIds = requests.concat(invites).map(connection => {
        return connection.eventId;
      });
    }

    let events = eventIds.map((id) => {
      return this.props.events.eventsById[id];
    }).filter(event => {
      return !!event && event.id
    }).filter(event => {
      //Filter out past events
      return moment(event.date).isAfter();
    }).map(event => {
      return inflateEvent(event, {
        requests: this.props.requests.requestsById,
        invites: this.props.invites.invitesById,
        users: this.props.users.usersById,
      });
    })

    events = events.sort((a, b) => {
      return a.date > b.date ? 1 : -1;
    });

    let nearby = this.props.search.nearby.map(item => {
      return {
        event: this.props.events.eventsById[item.id],
        distance: item.sort,
      };
    }).filter(item => !!item.event);

    return (
      <_Home
        onPressEvent={this.onPressEvent.bind(this)}
        mode={this.props.user.mode}
        events={events}
        onPressAdd={() => this.props.onNavigate('createEvent')}
        location={this.state.location}
        nearby={nearby}
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
    search: state.search,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props}, true)),
    onSearchNearby: (params) => dispatch(search.nearby(params)),
  }),
)(Home);
