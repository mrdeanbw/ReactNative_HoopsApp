
import {createStore, applyMiddleware, combineReducers} from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);

export default (data = {}) => {
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, data, middleware);
}
