import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  bubble: {
    textStyle: {
      right: {
        color: colors.white,
      },
      left: {
        color: colors.black,
      }
    },

    wrapperStyle: {
      left: {
        backgroundColor: colors.white,
      },
      right: {
        backgroundColor: colors.blue,
      },
    }
  }

})
