
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  style: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },

  containerStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  backButton: {
    position: 'absolute',
    top: 15,
    left: 5,
  },

  errorText: {
    paddingTop: 10,
    color: colors.pink,
    fontSize: 12,
    textAlign: 'center',
  },

  errorTextInput: {
    borderColor: colors.pink,
    borderWidth: 1,
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
  },

  eye: {
    position: 'absolute',
    right: 8,
    bottom: 6,
  }
})
