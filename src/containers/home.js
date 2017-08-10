import React, {Component} from 'react'
import {connect} from 'react-redux'

import {HomeOrganiser, HomeParticipant} from '../windows'
import {navigationActions, searchActions, userActions} from '../actions'
import {modeSelector} from '../selectors/app'
import {activeOrganisedEventsSortedSelector, activeNearbySearchEventsSelector} from '../selectors/events'
import {userSelector} from '../selectors/user'

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
      console.log("position.coords.latitude : ", position.coords.latitude);
      console.log("position.coords.latitude : ", position.coords.longitude);
      this.setState({
        location: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
      })
    })
  }

  componentWillUpdate(nextProps, nextState) {
    // If location gets set for the first time, or gender changes
    if (
      !this.state.location.lat && nextState.location.lat ||
      this.props.user.gender !== nextProps.user.gender
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
    eventsOrganized: activeOrganisedEventsSortedSelector(state),
    eventsNearby: activeNearbySearchEventsSelector(state),
    mode: modeSelector(state),
    user: userSelector(state),
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onSearchNearby: (params) => dispatch(searchActions.nearby(params)),
    onPressExplainer: () => dispatch(userActions.markExplainerSeen('homeParticipant'))
  }),
)(Home)
