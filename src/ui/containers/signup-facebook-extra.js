
import React from 'react';
import {connect} from 'react-redux';
import {SignUpFacebookExtra as _SignUpFacebookExtra} from '../windows';
import {user} from '../../actions';

class SignUpFacebookExtra extends React.Component {

  componentWillMount() {
    this.props.loadFacebookData();
  }

  render() {
    let facebookUser = this.props.user.facebookUser;

    return (
      <_SignUpFacebookExtra
        onPressContinue={this.props.onPressContinue}

        isLoading={this.props.user.isFacebookUserLoading}

        name={facebookUser.name}
        email={facebookUser.email}
        username={facebookUser.username}
        dob={new Date(facebookUser.birthday)}
        gender={facebookUser.gender}
        city={facebookUser.city}
        phone={facebookUser.phone}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onPressContinue: (data) => dispatch(user.facebookSaveExtra(data)),
    loadFacebookData: () => dispatch(user.loadFacebookData()),
  }),
)(SignUpFacebookExtra);
