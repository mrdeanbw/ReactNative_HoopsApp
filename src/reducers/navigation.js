
import {handleActions} from 'redux-actions';
import {NavigationExperimental} from 'react-native';

const {
  StateUtils,
} = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [{
    scene: 'loading',
    key: 'loading',
  }],

  tabKey: 'home',
  tabs: {
    home: {
      index: 0,
      routes: [{
        scene: 'home',
        key: 'home',
      }],
    },
    manage: {
      index: 0,
      routes: [{
        scene: 'manage',
        key: 'manage',
      }],
    },
    myEvents: {
      index: 0,
      routes: [{
        scene: 'myEvents',
        key: 'myEvents',
      }],
    },
    calendar: {
      index: 0,
      routes: [{
        scene: 'calendar',
        key: 'calendar',
      }],
    },
    invitations: {
      index: 0,
      routes: [{
        scene: 'invitations',
        key: 'invitations',
      }],
    },
    settings: {
      index: 0,
      routes: [{
        scene: 'preferences',
        key: 'preferences',
      }],
    },
    notifications: {
      index: 0,
      routes: [{
        scene: 'notifications',
        key: 'notifications',
      }],
    },
    friends: {
      index: 0,
      routes: [{
        scene: 'friends',
        key: 'friends',
      }],
    },
    payments: {
      index: 0,
      routes: [{
        scene: 'payments',
        key: 'payments',
      }],
    },
    wallet: {
      index: 0,
      routes: [{
        scene: 'wallet',
        key: 'wallet',
      }],
    },
  },

  showMenu: false,
};

const getCurrentScene = (state) => {
  let currentRoute = state.routes[state.index];

  //If we are on a tab, find out which route is active on _that_ tab.
  if(currentRoute.key === 'tabs') {
    let tabState = state.tabs[state.tabKey];
    currentRoute = tabState.routes[tabState.index];
  }

  return currentRoute.scene;
};

export default handleActions({
  NAV_PUSH: (state, action) => {
    //if the current route is 'tabs' and we want to stay in tabs, alter the tab's state
    let currentRoute = state.routes[state.index];
    let newRoute = {
      ...action.route,
      scene: action.route.key,
      key: action.route.key + '_' + Math.random(),
      direction: 'horizontal',
    };

    if(getCurrentScene(state) === newRoute.scene) {
      console.warn("Do not push the same route twice"); //eslint-disable-line no-console
      return {...state};
    }

    //If we are navigating away from tab view into a full-page view; vertical animation
    if(currentRoute.key === 'tabs' && !action.subTab) {
      newRoute.direction = 'vertical';
    }

    if(currentRoute.key === 'tabs' && action.subTab){
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [state.tabKey]: StateUtils.push(state.tabs[state.tabKey], newRoute),
        },
      };
    }else{
      return StateUtils.push(state, newRoute);
    }
  },

  NAV_POP: (state, action) => {
    let currentRoute = state.routes[state.index];
    if(currentRoute.key === 'tabs'){
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [state.tabKey]: StateUtils.pop(state.tabs[state.tabKey]),
        },
      };
    }else{
      return StateUtils.pop(state);
    }
  },

  NAV_RESET: (state, action) => {
    let newRoute = {
      ...action.route,
      scene: action.route.key,
    };
    return StateUtils.reset(state, [newRoute], 0);
  },

  NAV_CHANGE_TAB: (state, action) => {
    //Select tab and reset it's stack
    return {
      ...state,
      tabKey: action.key,
      tabs: {
        ...state.tabs,
        [action.key]: initialState.tabs[action.key],
      },
    };

    /*
    //Just select the tab, don't reset it's stack too
    return {
      ...state,
      tabKey: action.key
    };
    */
  },

  NAV_SHOW_MENU: (state, action) => {
    return {
      ...state,
      showMenu: true,
    };
  },

  NAV_HIDE_MENU: (state, action) => {
    return {
      ...state,
      showMenu: false,
    };
  },

  USER_LOGGED_OUT: (state, action) => {
    return {
      ...initialState,
      routes: [{scene: 'walkthrough', key: 'walkthrough'}],
    };
  },

  SET_UI_MODE: (state, action) => {
    //Reset tabs nav state when the UI mode is changed
    return {
      ...state,
      tabKey: 'home',
      tabs: initialState.tabs,
    };
  },

  DEEP_LINK_TAB: (state, action) => {

    let subNav = {
      ...initialState.tabs[action.tabKey]
    };

    if(action.route) {
      let newRoute = {
        ...action.route,
        scene: action.route.key,
      };
      //Don't use .push() due to a need for pure functions
      subNav.routes = subNav.routes.concat(newRoute);
      subNav.index = 1;
    }

    return {
      ...state,
      index: 0,
      routes: [{
        scene: 'tabs',
        key: 'tabs',
      }],
      tabKey: action.tabKey,
      tabs: {
        ...state.tabs,
        [action.tabKey]: subNav,
      },
    };
  },

  NOTIFICATION_PUSH: (state, action) => {
    //Don't navigate unless the notification was opened from the tray
    if(!action.notification.opened_from_tray) {
      return state;
    }

    let deeplink = action.notification.deeplink;

    //Match the hoops://events/<eventId> scheme
    let matches = deeplink.match(/hoops:\/\/events\/(.*)/);
    if(matches.length === 2) {
      return {
        ...state,
        index: 0,
        routes: [{
          scene: 'tabs',
          key: 'tabs',
        }],
        tabKey: 'home',
        tabs: {
          ...state.tabs,
          home: {
            index: 2,
            routes: [{
              scene: 'home',
              key: 'home',
            },{
              scene: 'eventDashboard',
              key: 'eventDashboard',
              props: {
                id: matches[1],
              },
            },{
              scene: 'eventDetails',
              key: 'eventDetails',
              props: {
                id: matches[1],
              },
            }],
          },
        },
      };
    } else {
      return state;
    }
  },

  EVENT_ADDED: (state, action) => {
    return {
      ...state,
      index: 0,
      routes: [{
        scene: 'tabs',
        key: 'tabs',
      }],
      tabKey: 'home',
      tabs: {
        ...state.tabs,
        home: {
          index: 1,
          routes: [{
            scene: 'home',
            key: 'home',
          },{
            scene: 'eventDashboard',
            key: 'eventDashboard',
            props: {
              id: action.eventData.id,
            },
          }],
        },
      },
    };
  },

}, initialState);
