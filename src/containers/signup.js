import React from 'react'
import {connect} from 'react-redux'

import {SignUp as _SignUp} from '../windows'
import {userActions} from '../actions'

class SignUp extends React.Component {

  render() {
    const user = this.props.user
    const imageUrl = (user.imageUrl || user.facebookImageSrc || null)

    return (
      <_SignUp
        onSignUp={this.props.onSignUp}
        onFacebookSignUp={this.props.onFacebookSignUp}
        isLoading={this.props.user.isSigningUp}
        signUpError={this.props.user.signUpError}
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        imageUrl={imageUrl}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onSignUp: (username, password, extra) => dispatch(userActions.signUp(username, password, extra)),
    onFacebookSignUp: () => dispatch(userActions.facebookSignUp()),
  }),
)(SignUp)
