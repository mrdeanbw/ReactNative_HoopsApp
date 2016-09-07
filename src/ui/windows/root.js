
import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';

import {user as actions} from '../../actions';

class Root extends Component {

  onPress() {
    let username = "mike@mikemonteith.com";
    let password = "abcdef";
    this.props.signIn(username, password);
  }

  render() {
    return (
      <View>
        <Text>{this.props.user.isSigningIn ? 'loading' : null}</Text>
        <Text>UID: {this.props.user.uid}</Text>

        <TouchableHighlight onPress={this.onPress.bind(this)}>
          <Text>Sign In</Text>
        </TouchableHighlight>

        <Text>{this.props.user.signInError && this.props.user.signInError.code}</Text>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    signIn: (username, password) => dispatch(actions.signIn(username, password)),
  }),
)(Root);
