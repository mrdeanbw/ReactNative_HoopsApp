
import React, {Component} from 'react';
import {AsyncStorage, NavigationExperimental, View, Text} from 'react-native';
import {Provider, connect} from 'react-redux';
import createStore from '../createStore';
import {persistStore} from 'redux-persist';
import * as userActions from '../actions/user';

import {Root} from './containers';

const store = createStore();
persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['navigation'],
});

userActions.registerWithStore(store);

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  }
}
