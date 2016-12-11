import { Platform } from 'react-native';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {autoRehydrate} from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from './reducers';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);
const rehydrate = autoRehydrate();
const composeEnhancers = composeWithDevTools({ realtime: true });

const storeEnhancers = composeEnhancers(middleware, rehydrate);

export default (data = {}) => {
  const rootReducer = (state, action) => {
    if(action.type === 'USER_LOGGED_OUT') {
      /*
       * Keep entire navigation and interests state.
       * undefined keys such as state.requests will be reset to their initialState
       *
       * Reducers can also listen to the USER_LOGGED_OUT action (events, users)
       * so that they can perform more complex logic than simple keep or reset.
       */
      const {navigation, interests, events, users} = state;
      state = {navigation, interests, events, users};
    }

    return combineReducers(reducers)(state, action);
  };

  return createStore(rootReducer, data, storeEnhancers);
};
