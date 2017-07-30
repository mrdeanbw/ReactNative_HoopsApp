import React, {Component} from 'react'
import {connect} from 'react-redux'

import {SelectMode as _SelectMode} from '../windows'
import {appActions, navigationActions} from '../actions'

class SelectMode extends Component {

  componentWillUpdate(nextProps) {
    if(nextProps.mode) {
      this.props.onNavigate('tabs')
    }
  }

  render() {
    return (
      <_SelectMode
        onSetMode={(mode) => {
          this.props.onSetMode(mode)
        }}
      />
    )
  }
}

export default connect(
  (state) => ({
    mode: state.app.mode,
  }),
  (dispatch) => ({
    onSetMode: (mode) => dispatch(appActions.setMode(mode)),
    onNavigate: (key, props) => dispatch(navigationActions.reset({key, props})),
  }),
)(SelectMode)
