
import React from 'react';
import {connect} from 'react-redux';
import _EventInvites from '../windows/event-invites';
import {navigation} from '../../actions';

class EventInvites extends React.Component {

  /**
   * WARNING! This isn't the 'react' way of doing things.
   * Usually props are passed down to children, however since the action
   * button lives outside of the navigator, we don't want to pass down props
   * from that far up.
   * Some containers would like to handle the action button being pressed.
   *
   * See this discussion: https://github.com/facebook/react-native/issues/795
   */
  componentWillMount() {
    //listen to action press
    this._actionListener = this.props.actionButton.addListener('press', () => {
      this.props.onNavigate('search');
    });
  }

  componentWillUnmount() {
    this._actionListener && this._actionListener.remove();
  }

  render() {
    let friends = this.props.user.friends.map((friendId) => {
      return this.props.users.usersById[friendId];
    });

    return (
      <_EventInvites
        mode={this.props.user.mode}
        users={friends}
        onSendInvites={(userIds) => {
          //TODO send the invites
        }}
        onViewProfile={(user) => {
          this.props.onNavigate('profile', {id: user.id});
        }}
      />
    );
  }
}

EventInvites.propTypes = {
  id: React.PropTypes.string.isRequired,
  actionButton: React.PropTypes.isRequired,
};

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props}, true)),
  }),
)(EventInvites);
