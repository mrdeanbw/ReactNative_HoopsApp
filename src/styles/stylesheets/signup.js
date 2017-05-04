
import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  style: {
    paddingVertical: 30,
    paddingHorizontal: 25,
    marginBottom: 20
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

  genderContainer: {
    flexDirection: "column",
    alignItems: "center"
  },

  genderLabelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
  },

  genderInfoIcon: {
    position: "absolute",
    top: 1,
  },

  genderLabel: {
    color: "grey",
    marginTop: 3,
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
