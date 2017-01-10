import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {Client} from 'bugsnag-react-native';

import * as userActions from './actions/user';
import * as interestsActions from './actions/interests';
import * as usersActions from './actions/users';
import * as eventsActions from './actions/events';
import * as networkActions from './actions/network';
import createStore from './createStore';
import {Root} from './containers';
import Config from './config';

const store = createStore();
const reducerVersion = Config.REDUCER_VERSION;

const storeConfig = {
  storage: AsyncStorage,
  blacklist: [
    'network',
    // 'navigation',
    'search',
  ],
};

AsyncStorage.getItem('reducerVersion').then((localVersion) => {
  if (localVersion !== reducerVersion) {
    // Purge store
    persistStore(store, storeConfig, startup).purge();
    AsyncStorage.setItem('reducerVersion', reducerVersion);
  } else {
    persistStore(store, storeConfig, startup);
  }
}).catch(() => {
  persistStore(store, storeConfig, startup);
  AsyncStorage.setItem('reducerVersion', reducerVersion);
});

export default class App extends Component {

  constructor(props) {
    super(props);
    if(Config.BUGSNAG_API_KEY) {
      this.bugsnag = new Client(Config.BUGSNAG_API_KEY);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  }
}

const startup = () => {
  store.dispatch(userActions.registerWithStore());
  store.dispatch(interestsActions.load());
  store.dispatch(networkActions.registerWithStore());

  /**
   * For now, we download all user and event data.
   * This is a short term solution, eventually some kind of search engine will
   * be connected to for looking up this data.
   */
  store.dispatch(usersActions.getAll());
  store.dispatch(eventsActions.getAll());
};
