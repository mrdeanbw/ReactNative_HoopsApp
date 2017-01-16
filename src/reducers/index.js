import {combineReducers} from 'redux';

import configureStore from '../configureStore';
import user from './user';
import users from './users';
import events from './events';
import navigation from './navigation';
import interests from './interests';
import invites from './invites';
import requests from './requests';
import search from './search';
import notifications from './notifications';
import payments from './payments';
import network from './network';

export default () => {
  const rootReducer = combineReducers({
    user,
    users,
    events,
    navigation,
    interests,
    invites,
    requests,
    search,
    notifications,
    payments,
    network,
  });

  return configureStore(rootReducer);
};
