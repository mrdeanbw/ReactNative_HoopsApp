
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  container: {
    flex: 1,
  },

  sectionHeader: {
  },

  sectionHeaderText: {
    paddingTop: 16,
    paddingLeft: 16,
    color: colors.pink,
  },

  row: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },

  rowText: {
    padding: 16,
  },

  highlightColor: colors.lightGrey,

  footerButton: {
  },

  footerButtonText: {
    padding: 16,
    color: colors.pink,
  },
});
