import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Notifications as _Notifications} from '../windows'
import {navigationActions} from '../actions'

class Notifications extends Component {

  render() {
    return (
      <_Notifications
        onBack={this.props.onBack}
        onClose={this.props.onClose}
      />
    )
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigationActions.pop()),
  }),
)(Notifications)
