import React from 'react'
import {connect} from 'react-redux'

import {SelectMode as _SelectMode} from '../windows'
import {userActions, navigationActions} from '../actions'

class SelectMode extends React.Component {

  componentWillUpdate(nextProps) {
    if(nextProps.user.mode) {
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
    user: state.user,
  }),
  (dispatch) => ({
    onSetMode: (mode) => dispatch(userActions.setMode(mode)),
    onNavigate: (key, props) => dispatch(navigationActions.reset({key, props})),
  }),
)(SelectMode)
