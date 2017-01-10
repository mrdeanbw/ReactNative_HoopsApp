import React from 'react';
import {connect} from 'react-redux';

import {Friends as _Friends} from '../windows';
import {
  user as userActions,
  navigation as navigationActions
} from '../actions';

class Friends extends React.Component {

  constructor() {
    super();

    this.state = {
      searchText: '',
    };
  }

  render() {

    let friends = Object.keys(this.props.user.friends).map(friendId => {
      return this.props.users.usersById[friendId];
    }).filter(friend => {
      return (
        friend &&
        friend.name &&
        friend.name.toLowerCase().search(this.state.searchText.toLowerCase()) !== -1
      );
    });

    let requested = Object.keys(this.props.user.friendRequests).map(requestId => {
      return this.props.notifications.friendRequestsById[requestId];
    }).filter(request => {
      return !!request;
    }).map(request => {
      let id = request.toId === this.props.user.uid ? request.fromId : request.toId;
      return this.props.users.usersById[id];
    }).filter(user => {
      return user && user.name;
    });

    return (
      <_Friends
        friends={friends}
        requestedUsers={requested}
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        onChangeSearchText={(searchText) => this.setState({searchText})}
        onFindFriends={() => {
          this.props.onNavigate('friendsSearch');
        }}

        onPressUser={(user) => this.props.onNavigate('profile', {id: user.id})}
        onPressInvite={(user) => {
          this.props.onNavigate('friendsInvite', {
            selectedUser: user,
          }, false);
        }}
        onPressRemove={(user) => this.props.onPressRemove(user)}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    notifications: state.notifications,
  }),
  (dispatch) => ({
    onNavigate: (key, props, subTab = true) => {
      dispatch(navigationActions.push({key, props}, subTab));
    },
    onPressRemove: (user) => dispatch(userActions.removeFriend(user)),
  }),
)(Friends);
