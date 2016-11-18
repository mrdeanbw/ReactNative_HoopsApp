
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  style: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerStyle: {
    position: 'absolute',
    top: 17,
    left: 10,
    height: 15,
    width: 30,
    overflow: 'hidden',
    borderRadius: 7.5
  },

  activeStyle: {
    backgroundColor: colors.green,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0
  },

  inactiveStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.grey
  },

  thumbStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,

    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.window,

    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: colors.black
  }


});
