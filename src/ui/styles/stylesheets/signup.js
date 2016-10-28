
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  style: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25
  },

  inputIcon: {
    marginRight: 16
  },

  errorText: {
    paddingTop: 10,
    color: colors.pink,
    fontSize: 12,
    textAlign: 'center',
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -25,
    marginRight: -25,
    paddingTop: 25,
    paddingBottom: 25
  },

  separatorLine: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: StyleSheet.grey,
    borderStyle: 'solid',
    height: StyleSheet.hairlineWidth
  },

  separatorText: {
    fontSize: 14,
    color: StyleSheet.grey,
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 16
  },

  facebookIcon: {
    marginRight: 13
  },

  facebookWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },

  singleMargin: {
    marginTop: 15
  },

  doubleMargin: {
    marginTop: 30
  },

  eye: {
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
})
