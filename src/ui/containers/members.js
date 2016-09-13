
import React from 'react';
import _Members from '../windows/members';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';

class Members extends React.Component {
  render() {
    return (
      <_Members
        event={this.props.events.eventsById[this.props.id]}
        onPressBack={() => {
          RouterActions.pop();
        }}
        onPressUserProfile={(user) => {
          RouterActions.userProfile({id: user.id});
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    events: state.events,
  }),
  (dispatch) => ({
  }),
)(Members);
