import React, {Component} from 'react'
import {connect} from 'react-redux'

import {userActions, eventActions, navigationActions} from '../actions'
import {activeUserRequestEventsSelector, historicRequestEventsSelector, userSavedEventsSelector} from '../selectors/events'
import {userSelector} from '../selectors/user'
import {MyEvents as _MyEvents} from '../windows'

class MyEvents extends Component {

  onPressEvent(event) {
    this.props.onNavigate('eventDashboard', {id: event.id})
  }

  render() {
    return (
      <_MyEvents
        onPressEvent={this.onPressEvent.bind(this)}
        onPressCreate={() => this.props.onNavigate('createEvent')}
        onPressSearch={() => this.props.onNavigate('search')}
        upcoming={this.props.upcomingEvents}
        saved={this.props.savedEvents}
        history={this.props.historicEvents}
        onPressOrganizerDetails={(user) => {
          this.props.onNavigate('profile', {id: user.id})
        }}
        onPressDropOut={this.props.onPressDropOut}
        onPressUnsave={this.props.onPressUnsave}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: userSelector(state),
    upcomingEvents: activeUserRequestEventsSelector(state),
    historicEvents: historicRequestEventsSelector(state),
    savedEvents: userSavedEventsSelector(state),
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onChangeAvailability: (value) => dispatch(userActions.setAvailability(value)),
    onPressDropOut: (event) => dispatch(eventActions.quit(event.id)),
    onPressUnsave: (event) => dispatch(eventActions.unsave(event.id)),
  }),
)(MyEvents)
