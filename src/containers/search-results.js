import React from 'react';
import {connect} from 'react-redux';

import {SearchResults as _SearchResults} from '../windows';
import {navigation} from '../actions';

class SearchResults extends React.Component {

  render() {
    let userIds = [];
    let eventIds = [];
    if(this.props.generalSearch === 'users') {
      userIds = this.props.search.general.userIds;
    } else if(this.props.generalSearch === 'events') {
      eventIds = this.props.search.general.eventIds;
    } else {
      eventIds = this.props.search.eventIds;
    }

    let events = eventIds.map(id => {
      return this.props.events.eventsById[id];
    }).filter(event => !!event);

    let users = userIds.map(userId => {
      return this.props.users.usersById[userId];
    }).filter(user => !!user);

    return (
      <_SearchResults
        events={events}
        users={users}
        onPressEvent={(event) => {
          this.props.onDeepLinkTab('eventDetails', 'home', {id: event.id});
        }}
        onPressUser={(user) => {
          this.props.onDeepLinkTab('profile', 'home', {id: user.id});
        }}
        onBack={this.props.onBack}
        onClose={this.props.onClose}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    events: state.events,
    search: state.search,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onDeepLinkTab: (key, tabKey, props) => dispatch(
      navigation.deepLinkTab({key, props}, tabKey)
    ),
    onNavigateBack: () => dispatch(navigation.pop()),
  }),
)(SearchResults);

