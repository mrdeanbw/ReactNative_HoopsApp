
import React from 'react';
import {connect} from 'react-redux';

import _FriendsSearch from '../windows/friends-search';
import {
  users as usersActions,
  navigation as navigationActions,
  search as searchActions
} from '../actions';

class FriendsSearch extends React.Component {

  componentWillMount() {
    this.props.onSearch('');
  }
  render() {

    let uid = this.props.user.uid;

    let pendingUserIds = Object.keys(this.props.user.friendRequests).map(requestId => {
      let request = this.props.notifications.friendRequestsById[requestId];

      if(request.fromId === uid) {
        return request.toId;
      }else {
        return request.fromId;
      }
    });

    let users = this.props.search.userIds.filter(userId => {
      //Filter out users who are already friends
      return !(userId in this.props.user.friends);
    }).filter(userId => {
      //TODO filter out already-requested friends
      return true;
    }).filter(userId => {
      //Filter out self
      return userId !== this.props.user.uid;
    }).map(userId => {
      return this.props.users.usersById[userId];
    }).filter(user => !!user && pendingUserIds.indexOf(user.id) === -1);

    return (
      <_FriendsSearch
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        onChangeAction={this.props.onChangeAction}
        users={users}
        onSearchChange={(text) => {
          this.props.onSearch(text);
        }}
        onSendFriendRequests={(ids) => {
          this.props.onSendFriendRequests(ids);
        }}
        onViewProfile={(user) => {
          this.props.onNavigate('profile', {id: user.id});
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    search: state.search,
    notifications: state.notifications,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onSearch: (text) => dispatch(searchActions.searchUsers({name: text})),
    onSendFriendRequests: (ids) => dispatch(usersActions.sendFriendRequests(ids)),
  }),
)(FriendsSearch);
