import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import * as containers from './index';
import {navigation, network} from '../actions';
import LoadingWindow from '../windows/loading';
import {DevIndicator, Navigator, NetworkAlert} from '../components';

class Root extends React.Component {

  constructor() {
    super();
    this.routeConfig = {
      loading: {
        component: LoadingWindow,
      },

      walkthrough: {
        component: containers.Walkthrough,
      },

      login: {
        component: containers.Login,
      },

      signup: {
        component: containers.SignUp,
      },

      signupFacebookExtra: {
        component: containers.SignUpFacebookExtra,
      },

      selectInterests: {
        component: containers.Interests,
      },

      selectInterestsAll: {
        component: containers.InterestsAll,
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

      eventRequests: {
        component: containers.EventRequests,
      },

      createEvent: {
        component: containers.CreateEvent,
      },

      profileEdit: {
        component: containers.ProfileEdit,
      },

      paymentsBankSetup: {
        component: containers.PaymentsBankSetup,
      },

      addCard: {
        component: containers.PaymentsAddCard,
      },

      activitiesSelect: {
        component: containers.ActivitiesSelect,
      },

      friendsInvite: {
        component: containers.FriendsInvite,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    //calculate a unique key for each page:
    let route = nextProps.navigation.routes[nextProps.navigation.index];
    let trackingKey = route.key;

    if(route.key === 'tabs') {
      //If we are on the tabs route, use the tab navigation's current view
      let tab = nextProps.navigation.tabs[nextProps.navigation.tabKey];
      let tabRoute = tab.routes[tab.index];
      trackingKey = tabRoute.key;
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NetworkAlert
          visible={
            this.props.network.connection === 'none' && !this.props.network.dismissed
          }
          onDismiss={this.props.onDismissNetworkAlert}
        />
        <Navigator
          onNavigateBack={this.props.onNavigateBack}
          onNavigate={this.props.onNavigate}
          navigationState={this.props.navigation}
          routeConfig={this.routeConfig}
        />
        <DevIndicator />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    navigation: state.navigation,
    network: state.network,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigation.pop()),
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onDismissNetworkAlert: () => dispatch(network.dismissAlert()),
  }),
)(Root);
