import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationWrapper: {
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    color: colors.pink,
    fontSize: 27.48,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 31,
    backgroundColor: 'transparent'
  },
})
