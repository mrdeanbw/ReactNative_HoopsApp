
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {Home as _Home} from '../windows';
import {user as actions} from '../../actions';

class SelectMode extends React.Component {

  render() {
    return (
      <_Home/>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
  }),
)(SelectMode);
