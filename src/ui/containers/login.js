
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {Login as _Login} from '../windows';

class Login extends React.Component {

  render() {
    return <React.View />;
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
  }),
)(Login);
