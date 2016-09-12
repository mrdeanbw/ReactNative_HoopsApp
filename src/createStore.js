
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
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, data, storeEnhancers);
};
