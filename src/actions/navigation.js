import actionTypes from './'

/**
 * @param route {Object}
 * @param subTab {boolean} The new route should keep the global tab bar
 */
export const push = (route, subTab = true, direction = false) => {
  return {
    type: 'NAV_PUSH',
    route,
    subTab,
    direction,
  }
}

export const pop = () => ({
  type: actionTypes.NAV_POP,
})

export const reset = (route) => ({
  type: actionTypes.NAV_RESET,
  route,
})

export const changeTab = (key) => ({
  type: actionTypes.NAV_CHANGE_TAB,
  key,
})

export const showMenu = () => ({
  type: actionTypes.NAV_SHOW_MENU,
})

export const hideMenu = () => ({
  type: actionTypes.NAV_HIDE_MENU,
})

export const deepLinkTab = (route, tabKey) => ({
  type: actionTypes.DEEP_LINK_TAB,
  route,
  tabKey,
})
