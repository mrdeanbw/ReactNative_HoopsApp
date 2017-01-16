import { createStore, applyMiddleware } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'remote-redux-devtools';

import * as userActions from './actions/user';
import * as interestsActions from './actions/interests';
import * as usersActions from './actions/users';
import * as eventsActions from './actions/events';
import * as networkActions from './actions/network';

import config from './config';

export default (rootReducer) => {
  const middleware = [createLogger(), thunk];
  const enhancers = [];

  enhancers.push(applyMiddleware(...middleware));

  const composeEnhancers = composeWithDevTools({ realtime: true });

  if (config.REDUCER_PERSIST) {
    enhancers.push(autoRehydrate());
  }

  const store = createStore(rootReducer, composeEnhancers(...enhancers));

  if (config.REDUCER_PERSIST) {
    updateReducers(store);
  } else {
    startup(store);
  }

  return store;
};

/* Rehydration + Reducer Version */
const updateReducers = (store) => {
  const reducerVersion = config.REDUCER_VERSION;
  const storeConfig = config.REDUCER_CONFIG;

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      persistStore(store, storeConfig, startup(store)).purge();
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    } else {
      persistStore(store, storeConfig, startup(store));
    }
  }).catch(() => {
    persistStore(store, storeConfig, startup(store));
    AsyncStorage.setItem('reducerVersion', reducerVersion);
  });
};

// TODO: Move into an Action
const startup = (store) => {
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
