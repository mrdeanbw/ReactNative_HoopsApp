import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    marginBottom: 15,
  },

  headerContainer: {
    marginBottom: 35,
  },

  headerText: {
    color: colors.grey,
    fontSize: 16,
    fontWeight:'bold',
    textAlign: 'center'
  },

  textContainer: {
    marginBottom: 60,
  },

  textStyle: {
    color: colors.grey,
    fontSize: 14,
    textAlign: 'center'
  },

  iconSad: {
    width: 35,
    heigth: 35,
  },

  iconArrow: {
    width: 30,
    height: 40
  },
})
