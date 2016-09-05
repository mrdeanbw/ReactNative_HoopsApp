
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  style: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },

  lineStyle: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
    borderStyle: 'solid',
    height: StyleSheet.hairlineWidth
  },

  textStyle: {
    fontSize: 14,
    color: colors.grey,
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 16,
    textAlign: 'center'
  },

  textTransform: s => s.toUpperCase()
});
