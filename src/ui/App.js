
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';
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
