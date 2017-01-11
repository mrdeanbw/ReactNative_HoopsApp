import React from 'react';
import {connect} from 'react-redux';

import {Walkthrough as _Walkthrough} from '../windows';
import {navigation} from '../actions';

class Walkthrough extends React.Component {

  render() {
    return (
      <_Walkthrough
        onPressLogIn={() => this.props.onNavigate('login')}
        onPressSignUp={() => this.props.onNavigate('signup')}
      />
    );
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onNavigateReset: (key, props) => dispatch(navigation.reset({key, props})),
  }),
)(Walkthrough);
