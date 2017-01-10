
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  page: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexDirection: 'column',

    backgroundColor: colors.black,
  },

  popup: {
    paddingVertical: 25,
    paddingHorizontal: 50,
  },

})
