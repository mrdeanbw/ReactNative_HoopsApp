
import * as containers from './index';
import React from 'react';
import {connect} from 'react-redux';
import {navigation} from '../../actions';

import {Navigator} from '../components';

class Root extends React.Component {

  constructor() {
    super();
    this.routeConfig = {
      walkthrough: {
        component: containers.Walkthrough,
      },

      login: {
        component: containers.Login,
      },

      signup: {
        component: containers.SignUp,
      },

      selectMode: {
        component: containers.SelectMode,
      },

      tabs: {
        component: containers.TabBar,
      },

      search: {
        component: containers.Search,
      },

      searchResults: {
        component: containers.SearchResults,
      },

      eventDetails: {
        component: containers.EventDetails,
      },

      createEvent: {
        component: containers.CreateEvent,
      },
    };
  }

  render() {
    return (
      <Navigator
        onNavigateBack={this.props.onNavigateBack}
        onNavigate={this.props.onNavigate}
        navigationState={this.props.navigation}
        routeConfig={this.routeConfig}
      />
    );
  }
}

export default connect(
  (state) => ({
    navigation: state.navigation,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigation.pop()),
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
  }),
)(Root);
