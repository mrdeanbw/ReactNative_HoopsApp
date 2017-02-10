import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'

import * as containers from './index'
import {navigationActions, networkActions, startupActions} from '../actions'
import {Loading} from '../windows'
import {DevIndicator, Navigator, NetworkAlert} from '../components'
import config from '../config'

class Root extends React.Component {

  constructor() {
    super()
    this.routeConfig = {
      loading: {
        component: Loading,
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

      chat: {
        component: containers.Chat,
      }
    }
  }

  componentDidMount() {
    // if redux persist is disabled fire startup action
    if (!config.REDUCER_PERSIST) {
      this.props.startup()
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
    )
  }
}

export default connect(
  (state) => ({
    navigation: state.navigation,
    network: state.network,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onNavigate: (key, props) => dispatch(navigationActions.push({ key, props })),
    onDismissNetworkAlert: () => dispatch(networkActions.dismissAlert()),
    startup: () => dispatch(startupActions.startup()),
  }),
)(Root)
