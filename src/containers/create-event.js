import React, {Component} from 'react'
import {connect} from 'react-redux'

import {CreateEvent as _CreateEvent} from '../windows'
import {navigationActions, eventActions} from '../actions'
import {getEventFactory} from '../selectors/events'

class CreateEvent extends Component {

  constructor(props) {
    super(props)

    const event = props.event

    this.state = {
      activityKey: (event && event.activity) ? event.activity : null,
      event: event,
    }
  }

  onPressActivity() {
    this.props.onNavigate('activitiesSelect', {
      activities: this.props.interests,
      onSelect: (activityKey) => {
        this.setState({activityKey})
        this.props.onNavigateBack()
      }
    }, false)
  }

  render() {
    let interests = Object.keys(this.props.interests).map(id => {
      return this.props.interests[id]
    })

    return (
      <_CreateEvent
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        event={this.state.event}
        editMode={!!this.state.event}
        onPressActivity={this.onPressActivity.bind(this)}
        activity={this.props.interests[this.state.activityKey]}
        onComplete={(eventData) => {
          // Don't do anything if the event is already processing
          if (this.props.eventIsUpdating) {
            return
          }

          eventData = {
            ...eventData,
            //Replace activity text with it's key (i.e 'BASKETBALL')
            activity: this.state.activityKey,
          }
          if(this.props.id) {
            this.props.onEditEvent(this.props.id, eventData)
          } else {
            this.props.onSaveEvent(eventData)
          }
        }}
        onSelectAppPayments={() => {
          if (!this.props.user.stripeAccount) {
            this.props.onNavigate('paymentsBankSetup')
          }
        }}
        interests={interests}
      />
    )
  }
}

const makeMapStateToProps = () => {
  const getEvent = getEventFactory()

  const mapStateToProps = (state, props) => {
    const event = props.id ? getEvent(state, props.id) : null

    return {
      event,
      eventIsUpdating: state.events.isUpdating,

      user: state.user,
      payments: state.payments,
      interests: state.interests,
    }
  }

  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigate: (key, props, subTab) => dispatch(navigationActions.push({key, props}, subTab)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onSaveEvent: (eventData) => dispatch(eventActions.create(eventData)),
    onEditEvent: (eventId, eventData) => dispatch(eventActions.edit(eventId, eventData)),
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(CreateEvent)
