
import * as containers from './index';
import React from 'react';
import {connect} from 'react-redux';
import {navigation} from '../../actions';

import {Navigator} from '../components';

import LoadingWindow from '../windows/loading';

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
