
import React from 'react';
import {connect} from 'react-redux';
import {Walkthrough as _Walkthrough} from '../windows';
import {navigation} from '../../actions';

class Walkthrough extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(this.props.user.uid === null && nextProps.user.uid){
      if(!nextProps.user.mode) {
        this.props.onNavigateReset('selectMode');
      }else{
        this.props.onNavigateReset('tabs');
      }
    }
  }

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
    user: state.user,
    router: state.router,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onNavigateReset: (key, props) => dispatch(navigation.reset({key, props})),
  }),
)(Walkthrough);
