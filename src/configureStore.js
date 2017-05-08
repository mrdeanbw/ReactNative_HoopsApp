import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native'

import {appActions} from './actions'
import config from './config'

export default (rootReducer) => {
  const middleware = []
  const enhancers = []

  // Middleware
  middleware.push(thunk)

  // Add Redux-logger
  if (config.LOGGER_ACTIVE) {
    middleware.push(createLogger(config.LOGGER_CONFIG))
  }

  // Enhancers
  enhancers.push(applyMiddleware(...middleware))

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({/* options */}) : compose

  if (config.REDUCER_PERSIST) {
    enhancers.push(autoRehydrate())
  }

  const store = createStore(rootReducer, composeEnhancers(...enhancers))

  if (config.REDUCER_PERSIST) {
    updateReducers(store)
  }

  return store
}


/* Rehydration + Reducer Version */
const updateReducers = (store) => {
  const reducerVersion = config.REDUCER_VERSION
  const storeConfig = config.REDUCER_CONFIG
  const startup = () => store.dispatch(appActions.startup())

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      persistStore(store, storeConfig, startup).purge()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, storeConfig, startup)
    }
  }).catch(() => {
    persistStore(store, storeConfig, startup)
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}
