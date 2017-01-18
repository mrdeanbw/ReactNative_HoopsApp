import React from 'react'
import {connect} from 'react-redux'

import {Interests as _Interests} from '../windows'
import {userActions, navigationActions} from '../actions'

class InterestsAll extends React.Component {

  render() {
    let interests = Object.keys(this.props.interests).map(id => {
      return this.props.interests[id]
    }).filter(interest => interest.important === true)

    let onDonePress = () => {
      this.props.onNavigate('selectMode')
    }

    return (
      <_Interests
        interests={interests}
        onDonePress={onDonePress}
        onPressViewAll={(selectedInterests) => {
          this.props.onNavigate('selectInterestsAll', {
            selected: selectedInterests,
            onDonePress: onDonePress,
          })
        }}
        onInterestsChange={this.props.onInterestsChange}
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
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props})),
    onInterestsChange: (interests) => dispatch(userActions.setInterests(interests)),
  }),
)(InterestsAll)
