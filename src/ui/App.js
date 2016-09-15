
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Provider, connect} from 'react-redux';
import createStore from '../createStore';
import {Router, Scene} from 'react-native-router-flux';
import {persistStore} from 'redux-persist';
import * as userActions from '../actions/user';

import * as listeners from '../data/listeners';

import * as containers from './containers';

const store = createStore();
persistStore(store, {
  storage: AsyncStorage,
});

const RouterWithReact = connect()(Router);
userActions.registerWithStore(store);

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RouterWithReact>
          <Scene hideNavBar={true} key="root">
          {/* TODO <Scene key="loading" component={containers.Loading} />*/}
            <Scene key="walkthrough" component={containers.Walkthrough} />
            <Scene key="logIn" component={containers.Login}/>
            <Scene key="signUp" component={containers.SignUp} />
            <Scene key="selectMode" component={containers.SelectMode} type="reset" />

            <Scene key="tabs" tabs={true} type="reset">
              <Scene key="homeTab">
                <Scene key="home" hideNavBar={true} component={containers.Home} />
                <Scene key="eventDetails" hideNavBar={true} component={containers.EventDetails} />
                <Scene key="eventDashboard" hideNavBar={true} component={containers.EventDashboard} />
                <Scene key="eventMembers" hideNavBar={true} component={containers.EventMembers} />
                <Scene key="eventInvites" hideNavBar={true} component={containers.EventInvites} />
                <Scene key="profile" hideNavBar={true} component={containers.Profile} />
              </Scene>

              <Scene key="manageTab">
                <Scene key="manage" hideNavBar={true} component={containers.Manage} />
                <Scene key="eventDetails" hideNavBar={true} component={containers.EventDetails} />
                <Scene key="eventDashboard" hideNavBar={true} component={containers.EventDashboard} />
                <Scene key="eventMembers" hideNavBar={true} component={containers.EventMembers} />
                <Scene key="eventInvites" hideNavBar={true} component={containers.EventInvites} />
                <Scene key="profile" hideNavBar={true} component={containers.Profile} />
              </Scene>

              <Scene key="myEventsTab">
                <Scene key="myEvents" hideNavBar={true} component={containers.MyEvents} />
                <Scene key="eventDetails" hideNavBar={true} component={containers.EventDetails} />
                <Scene key="search" direction="vertical" hideNavBar={true} component={containers.Search} />
              </Scene>
            </Scene>

          </Scene>
        </RouterWithReact>
      </Provider>
    );
  }
}
