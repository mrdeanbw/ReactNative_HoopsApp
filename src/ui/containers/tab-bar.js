
import * as containers from './index';
import _ from '../i18n';
import React from 'react';
import {connect} from 'react-redux';
import {navigation, user} from '../../actions';
import EventEmitter from 'EventEmitter';

import {TabBar as _TabBar, Navigator} from '../components';

class TabBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      action: null,
    };

    this.routeConfig = {
      tabs: {
        component: containers.TabBar,
      },

      home: {
        component: containers.Home,
        action: {
          text: _('search'),
          icon: "search",
          onPress: () => props.onNavigate('search', {}, false),
        },
      },

      eventDetails: {
        component: containers.EventDetails,
        action: {
          pressEmitter: new EventEmitter(),
          text: _('join'),
          textLarge: '£5',
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
          text: _('back'),
          icon: "actionBack",
          type: "action",
          onPress: () => props.onNavigateBack(),
        },
      },

      eventManage: {
        component: containers.EventManage,
        action: {
          text: _('create'),
        },
      },

      eventInvites: {
        component: containers.EventInvites,
        action: {
          pressEmitter: new EventEmitter(),
        },
      },

      manage: {
        component: containers.Manage,
        action: {
          text: _('create'),
        },
      },

      myEvents: {
        component: containers.MyEvents,
        action: {
          text: _('search'),
          icon: "search",
          onPress: () => props.onNavigate('search'),
        },
      },

      invitations: {
        component: containers.Invitations,
      },

      settings: {
        component: containers.Settings,
      },

      preferences: {
        component: containers.Preferences,
        action: {
          text: _('logout'),
          icon: "actionRemove",
          onPress: () => this.props.onLogOut(),
        },
      },

      profile: {
        component: containers.Profile,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.navigation.tabKey !== nextProps.navigation.tabKey){
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

        mode={this.props.navigation.mode}
        onChangeMode={() => {
          if(this.props.user.mode === 'ORGANIZE'){
            this.props.onChangeMode('PARTICIPATE');
          }else{
            this.props.onChangeMode('ORGANIZE');
          }
        }}
        onChangeAction={(action) => {
          this.setState({action});
        }}
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

    let config = this.routeConfig[route.key];
    if(!config) {
      throw new Error(`TabBar config for ${route.key} is not defined`);
    }

    return (
      <_TabBar
        currentTab={this.props.navigation.tabKey}
        onTabPress={(key) => {
          this.props.onChangeTab(key);
          this.props.onHideMenu();
        }}
        actionText={this.state.action && this.state.action.text || config.action && config.action.text}
        actionTextLarge={config.action && config.action.textLarge}
        actionIcon={config.action && config.action.icon}
        actionType={config.action && config.action.type}
        onActionPress={() => {
          this.props.onHideMenu();
          let actionConfig = config.action;
          if(actionConfig) {
            actionConfig.onPress && actionConfig.onPress();
            actionConfig.pressEmitter && actionConfig.pressEmitter.emit('press');
          }
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
  }),
  (dispatch) => ({
    onChangeTab: (key) => dispatch(navigation.changeTab(key)),
    onNavigateBack: () => dispatch(navigation.pop()),
    onNavigate: (key, props, subTab = true) => {
      dispatch(navigation.push({key, props}, subTab));
    },
    onChangeMode: (mode) => dispatch(user.setMode(mode)),
    onLogOut: () => dispatch(user.logOut()),
    onShowMenu: () => dispatch(navigation.showMenu()),
    onHideMenu: () => dispatch(navigation.hideMenu()),
  }),
)(TabBar);
