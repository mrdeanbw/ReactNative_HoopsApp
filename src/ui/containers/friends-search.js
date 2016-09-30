
import React from 'react';
import {connect} from 'react-redux';
import _FriendsSearch from '../windows/friends-search';
import {
  users as usersActions,
  navigation as navigationActions,
  search as searchActions
} from '../../actions';

import inflateEvent from '../../data/inflaters/event';

class FriendsSearch extends React.Component {

  render() {

    let users = this.props.search.userIds.filter(userId => {
      //Filter out users who are already friends
      return !(userId in this.props.user.friends);
    }).filter(userId => {
      //TODO filter out already-requested friends
      return true;
    }).map(userId => {
      return this.props.users.usersById[userId];
    }).filter(user => !!user);

    return (
      <_FriendsSearch
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        actionButton={this.props.actionButton}
        onChangeAction={this.props.onChangeAction}

        users={users}
        onSearchChange={(text) => {
          if(text.length > 3) {
            this.props.onSearch(text);
          }
        }}
        onSendFriendRequests={this.props.onSendFriendRequests}
      />
    );
  }
}

FriendsSearch.propTypes = {
  actionButton: React.PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    search: state.search,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onSearch: (text) => dispatch(searchActions.searchUsers({name: text})),
    onSendFriendRequests: (ids) => dispatch(usersActions.sendFriendRequests(ids)),
  }),
)(FriendsSearch);
