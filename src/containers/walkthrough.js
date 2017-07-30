import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Walkthrough as _Walkthrough} from '../windows'
import {navigationActions} from '../actions'

class Walkthrough extends Component {

  render() {
    return (
      <_Walkthrough
        onPressLogIn={() => this.props.onNavigate('login')}
        onPressSignUp={() => this.props.onNavigate('signup')}
      />
    )
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props})),
    onNavigateReset: (key, props) => dispatch(navigationActions.reset({key, props})),
  }),
)(Walkthrough)
