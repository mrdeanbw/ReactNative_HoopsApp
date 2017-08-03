import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Manage as _Manage} from '../windows'
import {navigationActions} from '../actions'
import {formattedEventsSelector} from '../selectors/manage'

class Manage extends Component {

  onPressEvent = (event) => {
    this.props.onNavigate('eventDashboard', {id: event.id})
  }

  render() {
    return (
      <_Manage
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        onPressEvent={this.onPressEvent}
        events={this.props.events}
      />
    )
  }
}

export default connect(
  (state) => ({
    events: formattedEventsSelector(state),
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
  }),
)(Manage)
