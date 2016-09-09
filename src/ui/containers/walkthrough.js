
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
console.log(RouterActions);
import {Walkthrough as _Walkthrough} from '../windows';

class Walkthrough extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(this.props.user.uid === null && nextProps.user.uid){
      if(!nextProps.mode) {
        RouterActions.selectMode();
      }else{ 
        RouterActions.home();
      }
    }
  }

  render() {
    return (
      <_Walkthrough
        onPressLogIn={() => {
          console.log("login");
          //RouterActions.logIn
        }}
        onPressSignUp={() => {
          console.log("pawmdpawomdpawo");
          RouterActions.signUp();
        }}
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
    onSignIn: (username, password) => dispatch(actions.signIn(username, password)),
    onFacebookSignIn: () => dispatch(actions.facebookSignIn()),
    onSignUp: (username, password, extra) => {
      dispatch(actions.signUp(username, password, extra));
    },
    onFacebookSignUp: () => dispatch(actions.facebookSignUp()),
    onSetMode: (mode) => dispatch(actions.setMode(mode)),
  }),
)(Walkthrough);
