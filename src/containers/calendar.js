import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {navigationActions} from '../actions'
import {Calendar as _Calendar} from '../windows'

class Calendar extends Component {

  constructor() {
    super()
    this.state = {
      selected: moment(),
    }
  }

  render() {
    let events = Object.keys(this.props.user.organizing).map(id => {
      return this.props.events.eventsById[id]
    }).filter(event => event)

    return (
      <_Calendar
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        selectedDate={this.state.selected}
        onChangeDate={(date) => this.setState({selected: moment(date)})}
        events={events}
        onPressEvent={(event) => {
          this.props.onNavigate('eventDetails', {id: event.id})
        }}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
    events: state.events,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props})),
    onNavigateBack: () => dispatch(navigationActions.pop()),
  }),
)(Calendar)
