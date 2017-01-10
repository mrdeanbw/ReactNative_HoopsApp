import React from 'react';
import {connect} from 'react-redux';

import {user} from '../actions';
import {SignUpFacebookExtra as _SignUpFacebookExtra} from '../windows';

class SignUpFacebookExtra extends React.Component {

  componentDidMount() {
    this.props.loadFacebookData();
  }

  render() {
    let facebookUser = this.props.user.facebookUser || {};

    let facebookImageSrc;
    let picture = facebookUser.picture ? facebookUser.picture.data : undefined;
    if(picture && picture.is_silhouette === false) {
      facebookImageSrc = picture.url;
    }

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
        facebookImageSrc={facebookImageSrc}
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
