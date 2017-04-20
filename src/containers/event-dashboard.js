import React from 'react'
import {connect} from 'react-redux'

import inflateUser from '../data/inflaters/user'
import _EventDashboard from '../windows/event-dashboard'
import {eventActions, navigationActions} from '../actions'

class EventDashboard extends React.Component {

  onCancel(message) {
    this.props.onCancel(this.props.id, message)
    this.props.onNavigateBack()
  }

  onPressDetails() {
    this.props.onNavigate('eventDetails', {id: this.props.id})
  }

  onPressMembers() {
    this.props.onNavigate('eventMembers', {id: this.props.id})
  }

  onPressMessages() {
    this.props.onNavigate('chat', {id: this.props.id}, false, 'horizontal')
  }

  onPressGallery() {
    //this.props.onNavigate('eventGallery', {id: this.props.id});
  }

  onPressFinances() {
    //this.props.onNavigate('eventFinances', {id: this.props.id});
  }

  onPressRequests() {
    this.props.onNavigate('eventRequests', {id: this.props.id}, false)
  }

  render() {
    const event = this.props.events.eventsById[this.props.id]

    const user = inflateUser(this.props.user, {
      invites: this.props.invites.invitesById,
      requests: this.props.requests.requestsById,
    })

    const isMember = !!user.requests.concat(user.invites).find(connection => {
      return connection.eventId === event.id && connection.status === 'confirmed'
    })

    return (
      <_EventDashboard
        event={event}
        onCancel={this.onCancel.bind(this)}
        onPressDetails={this.onPressDetails.bind(this)}
        onPressMembers={this.onPressMembers.bind(this)}
        onPressMessages={this.onPressMessages.bind(this)}
        onPressGallery={this.onPressGallery.bind(this)}
        onPressFinances={this.onPressFinances.bind(this)}
        onPressRequests={this.onPressRequests.bind(this)}
        actionButton={this.props.actionButton}
        onBack={this.props.onNavigateBack}
        isMember={isMember}
        onChangeAction={this.props.onChangeAction}
        onPressQuit={this.props.onPressQuit}
      />
    )
  }
}

EventDashboard.propTypes = {
  id: React.PropTypes.string.isRequired,
}

export default connect(
  (state) => ({
    events: state.events,
    invites: state.invites,
    requests: state.requests,
    router: state.router,
    user: state.user,
  }),
  (dispatch) => ({
    onNavigate: (key, props, subTab, direction) => dispatch(navigationActions.push({key, props}, subTab, direction)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onCancel: (eventId, message) => dispatch(eventActions.cancel(eventId, message)),
    onPressQuit: (eventId) => {
      dispatch(eventActions.quit(eventId))
      dispatch(navigationActions.changeTab('home'))
    }
  }),
)(EventDashboard)
