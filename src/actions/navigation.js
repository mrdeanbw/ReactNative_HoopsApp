
/**
 * @param route {Object}
 * @param subTab {boolean} The new route should keep the global tab bar
 */
export const push = (route, subTab = true) => {
  return {
    type: 'NAV_PUSH',
    route,
    subTab,
  };
};

export const pop = () => ({
  type: 'NAV_POP',
});

export const reset = (route) => ({
  type: 'NAV_RESET',
  route,
});

export const changeTab = (key) => ({
  type: 'NAV_CHANGE_TAB',
  key,
});

export const showMenu = () => ({
  type: 'NAV_SHOW_MENU',
});

export const hideMenu = () => ({
  type: 'NAV_HIDE_MENU',
});

export const deepLinkTab = (route, tabKey) => ({
  type: 'DEEP_LINK_TAB',
  route,
  tabKey,
});
