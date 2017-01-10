
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  style: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  containerStyle: {
    overflow: 'hidden'
  },

  activeStyle: {
    backgroundColor: colors.pink,
    position: 'absolute',
  },

  inactiveStyle: {
    position: 'absolute',
    backgroundColor: colors.lightGrey
  },

  thumbStyle: {
    position: 'absolute',
    zIndex: 1,
    borderStyle: 'solid',
    borderColor: colors.white,
    overflow: 'hidden'
  },
  thumbBackgroundStyle: {
    flex: 1,
    backgroundColor: colors.pink
  }


});
