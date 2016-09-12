
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Provider, connect} from 'react-redux';
import createStore from '../createStore';
import {Router, Scene} from 'react-native-router-flux';
import {persistStore} from 'redux-persist';

import {registerWithStore as registerFirebase} from '../data/firebase';

import * as containers from './containers';

const store = createStore();
persistStore(store, {storage: AsyncStorage});

const RouterWithReact = connect()(Router);
registerFirebase(store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithReact>
          <Scene hideNavBar={true} key="root">
            <Scene key="walkthrough" component={containers.Walkthrough} />
            <Scene key="logIn" component={containers.Login}/>
            <Scene key="signUp" component={containers.SignUp} />
            <Scene key="selectMode" component={containers.SelectMode} type="reset" />

            <Scene key="tabs" tabs={true} type="reset">
              <Scene key="homeTab">
                <Scene key="home" hideNavBar={true} component={containers.Home} />
                <Scene key="eventDetails" hideNavBar={true} component={containers.EventDetails} />
              </Scene>
            </Scene>

          </Scene>
        </RouterWithReact>
      </Provider>
    );
  }
}
