import React, {Component} from 'react'
import {connect} from 'react-redux'

import {navigationActions} from '../actions'
import {generalSearchEventsSelector, searchEventsIdSelector} from '../selectors/events'
import {searchGeneralUsersSelector} from '../selectors/search'
import {userSelector} from '../selectors/user'
import {usersSelector} from '../selectors/users'

import {SearchResults as _SearchResults} from '../windows'

class SearchResults extends Component {

  render() {
    let userIds = []
    let events = []

    if (this.props.generalSearch === 'users') {
      userIds = this.props.searchGeneralUsers
    } else if(this.props.generalSearch === 'events') {
      events = this.props.searchGeneralEvents
    } else {
      events = this.props.searchEventsId
    }

    let users = userIds.map(userId => {
      return this.props.users[userId]
    }).filter(user => !!user)

    return (
      <_SearchResults
        events={events}
        users={users}
        onPressEvent={(event) => {
          this.props.onDeepLinkTab('eventDetails', 'home', {id: event.id})
        }}
        onPressUser={(user) => {
          this.props.onDeepLinkTab('profile', 'home', {id: user.id})
        }}
        onBack={this.props.onBack}
        onClose={this.props.onClose}
      />
    )
  }
}

export default connect(
  (state) => ({
    searchGeneralEvents: generalSearchEventsSelector(state),
    searchEventsId: searchEventsIdSelector(state),
    searchGeneralUsers: searchGeneralUsersSelector(state),
    user: userSelector(state),
    users: usersSelector(state),
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props})),
    onDeepLinkTab: (key, tabKey, props) => dispatch(
      navigationActions.deepLinkTab({key, props}, tabKey)
    ),
    onNavigateBack: () => dispatch(navigationActions.pop()),
  }),
)(SearchResults)

