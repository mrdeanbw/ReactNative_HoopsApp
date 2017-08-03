import React, {Component} from 'react'
import {connect} from 'react-redux'

import {HomeOrganiser, HomeParticipant} from '../windows'
import {navigationActions, searchActions, userActions} from '../actions'

import {
  activeOrganisedEventsSortedSelector,
  activeNearbySearchEventsSelector,
} from '../selectors/events'

class Home extends Component {

  constructor() {
    super()

    this.state = {
      location: {
        lat: undefined,
        lon: undefined,
      },
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
      })
    })
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
      })
    }
  }

  onPressEvent(event) {
    if (this.props.mode === 'ORGANIZE') {
      this.props.onNavigate('eventDashboard', {id: event.id})
    } else{
      this.props.onNavigate('eventDetails', {id: event.id})
    }
  }

  render() {
    const Window = this.props.mode === 'ORGANIZE' ? HomeOrganiser : HomeParticipant
    const user = this.props.user

    console.log(this.props.eventsNearby)

    return (
      <Window
        onPressEvent={this.onPressEvent.bind(this)}
        mode={this.props.mode}
        events={this.props.eventsOrganized}
        onPressAdd={() => this.props.onNavigate('createEvent')}
        location={this.state.location}
        nearby={this.props.eventsNearby}
        isOrganising={this.props.mode === 'ORGANIZE'}
        isParticipanting={this.props.mode === 'PARTICIPATE'}
        onPressExplainer={this.props.onPressExplainer}
        showExplainer={!user.explainers.homeParticipant}
      />
    )
  }
}

export default connect(
  (state) => ({
    mode: state.app.mode,
    user: state.user,
    users: state.users,
    events: state.events,
    requests: state.requests,
    invites: state.invites,
    search: state.search,

    eventsOrganized: activeOrganisedEventsSortedSelector(state),
    eventsNearby: activeNearbySearchEventsSelector(state),
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onSearchNearby: (params) => dispatch(searchActions.nearby(params)),
    onPressExplainer: () => dispatch(userActions.markExplainerSeen('homeParticipant'))
  }),
)(Home)
