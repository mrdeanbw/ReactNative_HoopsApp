import React from 'react'
import {connect} from 'react-redux'

import _ProfileEdit from '../windows/profile-edit'
import {userActions, usersActions, navigationActions} from '../actions'

class ProfileEdit extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      interests: this.getInterestObjects(props.user.interests),
    }
  }

  /*
   * Takes a map {FOOTBALL: 'casual} and turns it into an array for the
   * view to display [{id: 'FOOTBALL', name: 'Football', level: 'casual'}]
   */
  getInterestObjects(interestsMap = {}) {
    return Object.keys(interestsMap).map(id => {
      return {
        ...this.props.interests[id],
        level: interestsMap[id],
      }
    }).filter(interest => interest.level)
  }

  onRemoveInterest = (id) => {
    this.setState({
      interests: this.state.interests.filter(interest => interest.id !== id),
    })
  }

  /*
   * Takes an array [{id: 'FOOTBALL', name: 'Football', level: 'casual}]
   * and turns it into a keyed object {FOOTBALL: 'casual'} for saving into the db
   */
  interestsToMap = (interestsArray) => {
    const map = {}
    interestsArray.forEach(interest => {
      if (interest.level) {
        map[interest.id] = interest.level
      }
    })

    return map
  }

  render() {
    const user = this.props.user
    const imageUrl = (user.imageUrl || user.facebookImageSrc || null)
    const selected = this.interestsToMap(this.state.interests)

    return (
      <_ProfileEdit
        onClose={this.props.onClose}
        onBack={this.props.onBack}
        imageUrl={imageUrl}
        name={user.name}
        city={user.city}
        gender={user.gender}
        dob={user.dob}
        interests={this.state.interests}
        onRemoveInterest={this.onRemoveInterest}
        onPressAddActivity={() => {
          this.props.onNavigate('selectInterestsAll', {
            selected: selected,
            onDonePress: () => {
              this.props.onNavigateBack()
            },
            onInterestsChangeOverride: (interests) => {
              // By default, the selectInterestsAll screen will try to save
              // interests data to the database.
              // We want to intercept that behaviour and just save to this.state
              this.setState({interests: this.getInterestObjects(interests)})
            }
          })
        }}
        onSavePress={(userInfo) => {
          const newInterests = this.interestsToMap(this.state.interests)

          this.props.onSavePress({...userInfo, interests: newInterests})
          this.props.onNavigateBack()
        }}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    events: state.events,
    notifications: state.notifications,
    interests: state.interests,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, false)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onChangeAvailability: (value) => dispatch(userActions.setAvailability(value)),
    removeFriend: (user) => dispatch(userActions.removeFriend(user)),
    sendFriendRequest: (user) => dispatch(usersActions.sendFriendRequests([user.id])),
    onSavePress: (data) => dispatch(userActions.updateProfile(data)),
  })
)(ProfileEdit)
