
import React from 'react';
import {connect} from 'react-redux';
import {Friends as _Friends} from '../windows';
import {
  user as userActions,
  navigation as navigationActions
} from '../../actions';

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

    return (
      <_Friends
        friends={friends}
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        onChangeSearchText={(searchText) => this.setState({searchText})}
        onFindFriends={() => {
          this.props.onNavigate('friendsSearch');
        }}

        onPressUser={(user) => this.props.onNavigate('profile', {id: user.id})}
        onPressInvite={(user) => {}}
        onPressRemove={(user) => this.props.onPressRemove(user)}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onToggleMode: () => dispatch(userActions.toggleMode()),
    onPressRemove: (user) => dispatch(userActions.removeFriend(user)),
  }),
)(Friends);
