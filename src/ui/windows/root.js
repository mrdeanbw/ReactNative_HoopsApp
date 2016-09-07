
import React, {Component} from 'react';
import {Navigator, View, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {Router, Scene, Actions, Modal, ActionConst} from 'react-native-router-flux';

import {user as actions} from '../../actions';

import {Walkthrough, Preferences, Login, SignUp, SelectMode, Home} from './';

const RouterWithReact = connect()(Router);

export default class Root extends Component {

  render() {
    return (
      <RouterWithReact>
        <Scene hideNavBar={true} key="root">
          <Scene key="walkthrough" component={Walkthrough} title="Walkthrough" />

          <Scene key="login" component={Login}/>
          <Scene key="signup" component={SignUp} />
          <Scene key="selectMode" component={SelectMode} type="reset" title="Select Mode" />

          <Scene key="home" type="reset" component={Home} title="Home" />
        </Scene>
      </RouterWithReact>
    );
  }
}
