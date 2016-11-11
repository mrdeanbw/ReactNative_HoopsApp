
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';
import createStore from '../createStore';
import {persistStore} from 'redux-persist';

import * as userActions from '../actions/user';
import * as interestsActions from '../actions/interests';
import * as usersActions from '../actions/users';
import * as eventsActions from '../actions/events';

import {Client} from 'bugsnag-react-native';
import Config from '../config';

import {Root} from './containers';

const store = createStore();
persistStore(store, {
  storage: AsyncStorage,
  blacklist: [
    'navigation',
    'search',
  ],
});

store.dispatch(userActions.registerWithStore());
store.dispatch(interestsActions.load());

/**
 * For now, we download all user and event data.
 * This is a short term solution, eventually some kind of search engine will
 * be connected to for looking up this data.
 */
store.dispatch(usersActions.getAll());
store.dispatch(eventsActions.getAll());

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
