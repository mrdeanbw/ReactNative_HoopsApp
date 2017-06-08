import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

  accessoryBarStyle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 0,
  },

  style: {
    flex: 1
  },

  contentStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.window
  },

  titleBarStyle: {
    backgroundColor: colors.black,
    alignItems: 'stretch',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  logoBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 12,
    alignItems: 'center',
    height: 56,
  },

  logoStyle: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
    marginRight: 12,
  },

  crumbBar: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#3B404A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
  },
  crumbTextStyle: {
    color: colors.white,
    lineHeight: 17,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  noIconBackStyle: {
    justifyContent: 'center',
  },
  modeBarStyle: {
    flex: 1,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modeTextStyle: {
    color: colors.white,
    lineHeight: 12,
    fontSize: 12,
  },

  modeHighlightTextStyle: {
    fontWeight: 'bold'
  },

  titleStyle: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleTextStyle: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 1
  },

  tabBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 52,
    borderStyle: 'solid',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6eaeb',
    backgroundColor: colors.white,
  },

  tabItem: {
    flex: 0.2,
  },

  tabItemCenter: {
    marginLeft: 6,
    marginRight: 6,
  },

  menuIcon: {
    overflow: 'visible'
  },

  menuIcons: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },

  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 500
  }
})
