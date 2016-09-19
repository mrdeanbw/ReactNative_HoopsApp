
import React from 'react';
import {connect} from 'react-redux';
import {Login as _Login} from '../windows';
import {user as actions} from '../../actions';

class Login extends React.Component {

  render() {
    return (
      <_Login
        onSignIn={this.props.onSignIn}
        onFacebookSignIn={this.props.onFacebookSignIn}
      />
    );
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onSignIn: (username, password) => dispatch(actions.signIn(username, password)),
    onFacebookSignIn: () => dispatch(actions.facebookSignIn()),
  }),
)(Login);
