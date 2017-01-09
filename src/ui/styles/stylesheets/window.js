
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  accessoryBarStyle: {
    position: 'absolute',
    zIndex: 1,
    left: 3,
    top: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5
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
    paddingTop: 20,
    alignItems: 'stretch'
  },

  logoBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55
  },

  logoStyle: {
    height: 30,
    width: 200,
    resizeMode: 'contain'
  },



  modeBarStyle: {
    height: 35,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center'
  },

  modeTextStyle: {
    color: colors.white,
    lineHeight: 17,
    fontSize: 14
  },

  modeHighlightTextStyle: {
    fontWeight: 'bold'
  },

  modeChevronStyle: {
    position: 'absolute',
    top: -4,
    right: 19,
    width: 20,
    height: 20,
    backgroundColor: colors.pink,
    transform: [{rotate: '45deg'}],
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
    paddingLeft: 8,
    paddingRight: 8
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
});
