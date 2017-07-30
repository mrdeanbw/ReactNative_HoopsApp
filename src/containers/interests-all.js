import React, {Component} from 'react'
import {connect} from 'react-redux'

import {InterestsAll as _InterestsAll} from '../windows'
import {userActions, navigationActions} from '../actions'

class InterestsAll extends Component {

  render() {
    let interests = Object.keys(this.props.interests).map(id => {
      return this.props.interests[id]
    })

    return (
      <_InterestsAll
        onClose={this.props.onClose}
        onBack={this.props.onBack}
        selected={this.props.selected}
        interests={interests}
        onDonePress={this.props.onDonePress}
        onInterestsChange={
          this.props.onInterestsChangeOverride || this.props.onInterestsChange
        }
      />
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
    interests: state.interests,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.reset({key, props})),
    onInterestsChange: (interests) => dispatch(userActions.setInterests(interests)),
  }),
)(InterestsAll)
