import React from 'react';
import {connect} from 'react-redux';
import EventEmitter from 'EventEmitter';

import * as containers from './index';
import {navigation, user} from '../actions';
import _ from '../i18n';

import {TabBar as _TabBar, Navigator} from '../components';

class TabBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      action: null,
    };

    let createOrSearchAction = {
      organizer: {
        text: _('create'),
        icon: "actionAdd",
        onPress: () => props.onNavigate('createEvent', {}, false),
      },
      participant: {
        text: _('search'),
        icon: "actionSearch",
        onPress: () => props.onNavigate('search', {}, false),
      },
    };

    this.routeConfig = {
      tabs: {
        component: containers.TabBar,
      },

      home: {
        component: containers.Home,
        action: createOrSearchAction,
      },

      eventDetails: {
        component: containers.EventDetails,
        action: {
          pressEmitter: new EventEmitter(),
          text: _('join'),
          textLarge: '',
        },
      },

      eventDashboard: {
        component: containers.EventDashboard,
        action: {
          pressEmitter: new EventEmitter(),
          text: _('cancel'),
          icon: "actionRemove",
          type: "action",
        },
      },

      eventMembers: {
        component: containers.EventMembers,
        action: {
          pressEmitter: new EventEmitter(),
          text: _('invite'),
          icon: "actionAdd",
          type: "actionGreen"
        },
      },

      eventInvites: {
        component: containers.EventInvites,
        action: {
          text: _('create'),
          icon: "actionAdd",
          onPress: () => props.onNavigate('createEvent', {}, false),
        },
      },

      manage: {
        component: containers.Manage,
        action: {
          text: _('create'),
          icon: "actionAdd",
          onPress: () => props.onNavigate('createEvent', {}, false),
        },
      },

      myEvents: {
        component: containers.MyEvents,
        action: {
          text: _('search'),
          icon: "actionSearch",
          onPress: () => props.onNavigate('search', {}, false),
        },
      },

      invitations: {
        component: containers.Invitations,
        action: {
          text: _('search'),
          icon: "actionSearch",
          onPress: () => props.onNavigate('search', {}, false),
        },
      },

      preferences: {
        component: containers.Preferences,
        action: {
          text: _('logout'),
          icon: "actionRemove",
          onPress: () => this.props.onLogOut(),
        },
      },

      notificationPreferences: {
        component: containers.NotificationPreferences,
      },

      notifications: {
        component: containers.Notifications,
        action: createOrSearchAction,
      },

      profile: {
        component: containers.Profile,
        action: createOrSearchAction,
      },

      friends: {
        component: containers.Friends,
        action: createOrSearchAction,
      },

      friendsSearch: {
        component: containers.FriendsSearch,
        action: createOrSearchAction,
      },

      payments: {
        component: containers.Payments,
        action: {
          text: _('addCard'),
          icon: "actionAdd",
          onPress: () => props.onNavigate('addCard', {}, false),
        },
      },

      wallet: {
        component: containers.Wallet,
        action: {
          text: _('edit'),
          icon: "actionEdit",
          type: "actionDefault",
          onPress: () => props.onNavigate('paymentsBankSetup', {}, false),
        },
      },

      calendar: {
        component: containers.Calendar,
        action: {
          text: _('create'),
          icon: "actionAdd",
          onPress: () => props.onNavigate('createEvent', {}, false),
        },
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    let nav = this.props.navigation;
    let key = nav.tabKey;
    let nextNav = nextProps.navigation;
    let nextKey = nextNav.tabKey;

    if(key !== nextKey || nav.tabs[key].index !== nextNav.tabs[nextKey].index){
      this.setState({action: null});
    }
  }

  renderTab(){
    return (
      <Navigator
        key={this.props.navigation.tabKey}
        onNavigateBack={this.props.onNavigateBack}
        navigationState={this.props.navigation.tabs[this.props.navigation.tabKey]}
        routeConfig={this.routeConfig}
        onChangeAction={(action) => {
          this.setState({action});
        }}
        mode={this.props.user.mode}
      />
    );
  }

  render() {
    let navState = this.props.navigation;
    let tabState = navState.tabs[navState.tabKey];
    if(!tabState) {
      throw new Error(`tab '${navState.tabKey}' not defined in navigation state`);
    }
    let route = tabState.routes[tabState.index];

    let config = this.routeConfig[route.scene];
    if(!config) {
      throw new Error(`TabBar config for ${route.scene} is not defined`);
    }

    /**
     * If there are separate action configs for organiser / participant,
     * use those instead of the general action.config
     */
    let actionConfig;
    if(config.action) {
      if(this.props.user.mode === 'ORGANIZE' && config.action.organizer){
        actionConfig = config.action.organizer;
      } else if(this.props.user.mode === 'PARTICIPATE' && config.action.participant) {
        actionConfig = config.action.participant;
      } else {
        actionConfig = config.action;
      }
    }

    actionConfig = {
      ...actionConfig,
      ...this.state.action, //override static config with dynamic state
    };

    let notificationIds = Object.keys(this.props.notifications.notificationsById);
    let unseenNotifications = notificationIds.map(id => {
      return this.props.notifications.notificationsById[id];
    }).filter(notification => {
      return notification && notification.seen !== true;
    });

    let invitationIds = Object.keys(this.props.user.invites);
    let unseenInvitations = invitationIds.map(id => {
      return this.props.invites.invitesById[id];
    }).filter(invite => {
      return invite && invite.status === 'pending' && invite.seen !== true;
    });

    return (
      <_TabBar
        currentTab={this.props.navigation.tabKey}
        onTabPress={(key) => {
          this.props.onChangeTab(key);
          this.props.onHideMenu();
        }}
        actionText={actionConfig.text}
        actionTextLarge={actionConfig.textLarge}
        actionIcon={actionConfig.icon}
        actionType={actionConfig.type}
        onActionPress={() => {
          this.props.onHideMenu();
          actionConfig.onPress && actionConfig.onPress();
          actionConfig.pressEmitter && actionConfig.pressEmitter.emit('press');
        }}
        menuVisible={this.props.navigation.showMenu}
        onHideMenu={this.props.onHideMenu}
        onMenuPress={() => {
          if(this.props.navigation.showMenu) {
            this.props.onHideMenu();
          }else{
            this.props.onShowMenu();
          }
        }}
        mode={this.props.user.mode}
        user={this.props.user}
        notificationBadge={unseenNotifications.length}
        invitationsBadge={unseenInvitations.length}
        onPressProfile={() => {
          this.props.onNavigate('profile', {id: this.props.user.uid});
          this.props.onHideMenu();
        }}
      >
        {this.renderTab()}
      </_TabBar>
    );
  }
}

export default connect(
  (state) => ({
    navigation: state.navigation,
    user: state.user,
    notifications: state.notifications,
    invites: state.invites,
  }),
  (dispatch) => ({
    onChangeTab: (key) => dispatch(navigation.changeTab(key)),
    onNavigateBack: () => dispatch(navigation.pop()),
    onNavigate: (key, props, subTab = true) => {
      dispatch(navigation.push({key, props}, subTab));
    },
    onLogOut: () => dispatch(user.logOut()),
    onShowMenu: () => dispatch(navigation.showMenu()),
    onHideMenu: () => dispatch(navigation.hideMenu()),
  }),
)(TabBar);
