
import React from 'react';
import {connect} from 'react-redux';

import {Login as _Login} from '../windows';
import {user as actions} from '../actions';

class Login extends React.Component {

  render() {
    return (
      <_Login
        onBack={this.props.onBack}
        onSignIn={this.props.onSignIn}
        onFacebookSignIn={this.props.onFacebookSignIn}
        signInError={this.props.user.signInError}
        onFormEdit={this.props.onFormEdit}
        isLoading={this.props.user.isSigningIn}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
    onFacebookSignIn: () => dispatch(actions.facebookSignIn()),
    onFormEdit: () => dispatch(actions.signInFormEdit()),
  }),
)(Login);
