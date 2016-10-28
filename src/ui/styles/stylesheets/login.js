
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  style: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },

  containerStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  errorText: {
    paddingTop: 10,
    color: colors.pink,
    fontSize: 12,
    textAlign: 'center',
  },

  titleStyle: {
    backgroundColor: colors.black,
    flexDirection: 'column',
    paddingTop: 0,
    height: null,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },

  titleImageStyle: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    resizeMode: 'cover',
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  titleLogoStyle: {
    marginBottom: 25
  },

  titleTextStyle: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: colors.white,
  },

  titleTextHighlightStyle: {
    color: colors.pink
  },

  contentStyle: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25
  }
})
