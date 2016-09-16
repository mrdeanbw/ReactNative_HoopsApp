
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {Notifications as _Notifications} from '../windows';
import {user as actions} from '../../actions';

class Notifications extends React.Component {

  render() {
    return (
      <_Notifications
        onClose={() => RouterActions.pop()}
      />
    );
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
  }),
)(Notifications);
