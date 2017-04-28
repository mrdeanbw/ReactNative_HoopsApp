import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  sectionContainer: {
    marginBottom: 40,
  },
  sectionTitleContainer: {
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
    marginBottom: 12,
    color: colors.black,
  },
  label: {
    color: colors.pink,
    fontSize: 12,
    marginTop: 16,
  },
  detail: {

  }
})
