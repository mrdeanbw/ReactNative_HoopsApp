
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {Walkthrough as _Walkthrough} from '../windows';

class Walkthrough extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(this.props.user.uid === null && nextProps.user.uid){
      if(!nextProps.user.mode) {
        RouterActions.selectMode();
      }else{ 
        RouterActions.tabs();
      }
    }
  }

  render() {
    return (
      <_Walkthrough
        onPressLogIn={RouterActions.logIn}
        onPressSignUp={RouterActions.signUp}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    router: state.router,
  }),
  (dispatch) => ({
    onSignUp: (username, password, extra) => {
      dispatch(actions.signUp(username, password, extra));
    },
    onFacebookSignUp: () => dispatch(actions.facebookSignUp()),
    onSetMode: (mode) => dispatch(actions.setMode(mode)),
  }),
)(Walkthrough);
