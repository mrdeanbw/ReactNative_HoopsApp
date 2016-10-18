
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {autoRehydrate} from 'redux-persist';

import reducers from './reducers';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);
const rehydrate = autoRehydrate();

const storeEnhancers = compose(middleware, rehydrate);

export default (data = {}) => {
  const rootReducer = (state, action) => {
    if(action.type === 'USER_LOGGED_OUT') {
      //Keep navigation state but reset all other store keys
      const {navigation} = state;
      state = {navigation};
    }

    return combineReducers(reducers)(state, action);
  };


  return createStore(rootReducer, data, storeEnhancers);
};
