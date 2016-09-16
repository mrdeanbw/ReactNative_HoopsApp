
import React from 'react';
import {connect} from 'react-redux';
import {SignUp as _SignUp} from '../windows';
import {user} from '../../actions';

class SignUp extends React.Component {

  render() {
    return (
      <_SignUp
        onSignUp={this.props.onSignUp}
        onFacebookSignUp={this.props.onFacebookSignUp}
      />
    );
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onSignUp: (username, password, extra) => {
      dispatch(user.signUp(username, password, extra));
    },
    onFacebookSignUp: () => dispatch(user.facebookSignUp()),
  }),
)(SignUp);
