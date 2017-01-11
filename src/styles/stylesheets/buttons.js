
import {colors} from '../resources';
import Color from 'color';

const DashboardGradient = Object.keys(colors).filter(v => /^dashboard\d+$/.test(v)).map(v => colors[v]);
const DashboardGradientHighlight = DashboardGradient.map(c => Color(c).lighten(0.25).hexString());

export default StyleSheet => StyleSheet.extend({

  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  separator: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    marginLeft: 35,
    marginRight: 35,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: colors.grey
  },

  default: StyleSheet.extend({
    style: {
      flex: 1,
      backgroundColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center'
    },

    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },

    iconStyle: {

    },

    textStyle: {
      letterSpacing: 1,
      fontWeight: 'bold',
      fontSize: 13,
      lineHeight: 13,
      color: colors.white,
      margin: 0,
      padding: 0
    },

    activeTextStyle: {

    },

    activeOpacity: 1.0,
    underlayColor: colors.highlightBlack,
    textTransform: s => s.toUpperCase()
  }),

  tab: StyleSheet.extend({
    activeOpacity: 1.0,
    underlayColor: colors.transparent,

    style: {
      flex: 1,
      backgroundColor: colors.transparent
    },

    containerStyle: {
      flexDirection: 'column',
    },

    iconStyle: {

    },

    textStyle: {
      letterSpacing: 0,
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 15,
      color: colors.grey
    },

    activeTextStyle: {
      color: colors.pink
    },

    textTransform: s => s
  }),

  action: StyleSheet.extend({
    activeOpacity: 1.0,
    underlayColor: colors.highlightBlack,

    style: {
      flex: 0,
      zIndex: 1,
      width: 75,
      height: 75,
      borderRadius: 75,
      marginTop: -10,
      marginLeft: 12,
      marginRight: 12,
      backgroundColor: colors.black
    },

    containerStyle: {
      flexDirection: 'column',
      width: 75,
      height: 75,
      borderRadius: 75
    },

    textStyle: {
      letterSpacing: 0,
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 15
    },

    iconStyle: {
      marginTop: -8,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: -4,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0
    },

    textTransform: s => s
  }),

  actionDefault: StyleSheet.extend({
    activeOpacity: 1.0,
    underlayColor: colors.highlightPink,

    style: {
      flex: 0,
      zIndex: 1,
      width: 75,
      height: 75,
      borderRadius: 75,
      marginTop: -10,
      marginLeft: 12,
      marginRight: 12,
      backgroundColor: colors.pink
    },

    containerStyle: {
      flexDirection: 'column',
      width: 75,
      height: 75,
      borderRadius: 75
    },

    textStyle: {
      letterSpacing: 0,
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 15
    },

    iconStyle: {
      marginTop: -8,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: -4,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0
    },

    textTransform: s => s
  }),

  actionGreen: StyleSheet.extend({
    activeOpacity: 1.0,
    underlayColor: colors.highlightGreen,

    style: {
      flex: 0,
      zIndex: 1,
      width: 75,
      height: 75,
      borderRadius: 75,
      marginTop: -10,
      marginLeft: 12,
      marginRight: 12,
      backgroundColor: colors.green
    },

    containerStyle: {
      flexDirection: 'column',
      width: 75,
      height: 75,
      borderRadius: 75
    },

    textStyle: {
      letterSpacing: 0,
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 15
    },

    iconStyle: {
      marginTop: -8,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: -4,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0
    },

    textTransform: s => s
  }),

  dialog: StyleSheet.extend({
    containerStyle: {
      height: 50
    }
  }),

  dialogDefault: StyleSheet.extend({
    underlayColor: colors.highlightPink,

    style: {
      backgroundColor: colors.pink,
    },

    containerStyle: {
      height: 50
    },

  }),

  step: StyleSheet.extend({
    underlayColor: colors.highlightPink,

    style: {
      backgroundColor: colors.grey,
      borderStyle: 'solid',
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: colors.white
    },

    activeStyle: {
      backgroundColor: colors.pink
    },

    containerStyle: {
      height: 50
    },

    textStyle: {
      fontSize: 13,
      color: colors.white
    }
  }),

  rounded: StyleSheet.extend({
    underlayColor: colors.highlightBlack,

    style: {
      borderRadius: 22,
      flex: 0
    },

    containerStyle: {
      height: 44
    }
  }),

  roundedGrey: StyleSheet.extend({
    underlayColor: colors.highlightGrey,

    style: {
      borderRadius: 22,
      backgroundColor: colors.grey,
      flex: 0
    },

    activeStyle: {
      backgroundColor: colors.pink
    },

    containerStyle: {
      height: 44
    }
  }),

  roundedDefault: StyleSheet.extend({
    underlayColor: colors.highlightPink,

    style: {
      backgroundColor: colors.pink,
      borderRadius: 22,
      flex: 0
    },

    containerStyle: {
      height: 44
    }
  }),

  roundedWhite: StyleSheet.extend({
    underlayColor: colors.highlightPink,

    style: {
      backgroundColor: colors.white,
      borderRadius: 22,
      flex: 0,
    },

    textStyle: {
      color: colors.black,
    },

    containerStyle: {
      height: 44,
    },
  }),

  facebook: StyleSheet.extend({
    underlayColor: colors.highlightFacebookBlue,

    style: {
      backgroundColor: colors.facebookBlue,
      borderRadius: 22,
      flex: 0
    },

    iconStyle: {
      marginRight: 10
    },

    containerStyle: {
      height: 44
    }
  }),

  roundedBorder: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.transparent,
      borderRadius: 22
    },

    containerStyle: {
      height: 44
    },

    textStyle: {
      color: colors.black
    }
  }),

  roundedWhiteBorder: StyleSheet.extend({
    underlayColor: 'rgba(255,255,255,0.25)',

    style: {
      backgroundColor: colors.transparent,
      borderRadius: 16,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.white,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 6,
      paddingBottom: 6,
      flex: 0
    },

    iconStyle: {
      marginRight: 8
    },

    containerStyle: {
      height: null
    },

    textStyle: {
      fontSize: 12,
      color: colors.white
    }
  }),

  title: StyleSheet.extend({
    underlayColor: colors.transparent,

    style: {
      alignSelf: 'flex-start',
      backgroundColor: colors.transparent,
      flex: 0,
      width: null,
      height: null,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5
    }
  }),

  check: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.white,
      flex: 0,
      width: null,
      height: null,
      alignSelf: 'stretch'
    },

    containerStyle: {
      height: 90,
      paddingLeft: 30,
      paddingRight: 30,
      alignItems: 'center',
      flexDirection: 'row',
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey
    },

    textStyle: {
      color: colors.pink,
      fontSize: 18,
      fontWeight: '500',
      flex: 1
    },

    iconStyle: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.pink,
      backgroundColor: colors.transparent
    },

    checkedIconStyle: {
      backgroundColor: colors.pink
    },
  }),

  addActivity:  StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.transparent,
      flex: 0,
      width: null,
      height: null,
      borderRadius: 0,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 15,
      padding: 10,
    },

    containerStyle: {
      height: null,
      paddingLeft: 0,
      paddingRight: 0,
      alignItems: 'center',
      flexDirection: 'column-reverse',
      borderBottomWidth: null,
      borderBottomColor: colors.transparent,
    },

    textStyle: {
      color: '#bcc0c8',
      fontSize: 16,
      fontWeight: '400',
      flex: 1,
      letterSpacing: 0
    },

    iconStyle: {
      marginTop: 15,
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#bcc0c8',
      backgroundColor: colors.white
    },

    textTransform: s => s
  }),

  profileActivity: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.transparent,
      flex: 0,
      width: null,
      height: null,
      alignSelf: 'stretch',
      borderRadius: 5
    },

    containerStyle: {
      height: 32,
      paddingLeft: 0,
      paddingRight: 0,
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: null,
      borderBottomColor: colors.transparent,
    },

    textStyle: {
      color: colors.black,
      fontSize: 16,
      fontWeight: '400',
      flex: 1
    },

    iconStyle: {
      width: 26,
      height: 26,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 13,
      borderBottomWidth: null,
      backgroundColor: colors.pink
    },

    checkedIconStyle: {
      backgroundColor: colors.pink
    },
  }),

  wizardCheck: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.transparent,
      flex: 0,
      width: null,
      height: null,
      alignSelf: 'stretch'
    },

    containerStyle: {
      height: 65,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center',
      flexDirection: 'row',
      borderStyle: 'solid',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.black,
      borderBottomWidth: 0
    },

    textStyle: {
      color: colors.black,
      fontSize: 16,
      lineHeight: 0,
      fontWeight: '400',
      flex: 1
    },

    iconStyle: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.grey,
      backgroundColor: colors.transparent
    },

    checkedIconStyle: {
      backgroundColor: colors.pink,
      borderColor: colors.pink,
    },
  }),

  checkDisclosure: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.white,
      borderRadius: 15,
      flex: 0,
      width: null,
      height: null,
      alignSelf: 'center',
      borderStyle: 'solid',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.grey,
      marginRight: 4,
      marginLeft: 4
    },

    containerStyle: {
      height: null,
      paddingLeft: 0,
      paddingRight: 0,
      alignItems: 'center',
      flexDirection: 'row'
    },

    iconStyle: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },

    activeStyle: {
      backgroundColor: colors.pink
    },
  }),

  disclosure: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      flex: 0,
      backgroundColor: colors.transparent,
      width: 32,
      height: 32,
      borderRadius: 16,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }),

  image: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      flex: 0,
      backgroundColor: colors.transparent,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },

    activeStyle: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: colors.pink
    },
  }),

  modeSwitch: StyleSheet.extend({
    underlayColor: colors.highlightPink,

    style: {
      position: 'absolute',
      top: 13,
      right: 15.5,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.pink,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),

  headerAction: StyleSheet.extend({
    underlayColor: colors.grey,

    style: {
      position: 'absolute',
      top: -14,
      right: 15.5,
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center'
    },
  }),

  headerActionCircle: StyleSheet.extend({
    underlayColor: colors.grey,

    style: {
      position: 'absolute',
      top: -14,
      right: 15.5,
      width: 28,
      height: 28,
      borderRadius: 14,
      borderColor: colors.white,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
  }),

  dashboard: StyleSheet.extend({
    gradient: StyleSheet.escape(DashboardGradient.map(c => StyleSheet.extend({ gradient: {backgroundColor: c} }).gradient)),
    highlightGradient: StyleSheet.escape(DashboardGradientHighlight),

    style: {
      backgroundColor: colors.pink,
      alignSelf: 'stretch',
      marginTop: -1,
      marginBottom: -1,
    },

    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },

    iconStyle: {
      height: 40,
      width: 40,
    },

    textStyle: {
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 18,
      marginTop: 15
    },

    textTransform: s => s

  }),

  alert: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.transparent,
      borderStyle: 'solid',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.grey,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: colors.grey,
      height: 45
    },

    textStyle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.black,
      lineHeight: 0
    }
  }),

  alertDefault: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.transparent,
      borderStyle: 'solid',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.grey,
      height: 45
    },

    textStyle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.pink,
      lineHeight: 0
    }
  }),

  alertVertical: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      flex: 0,
      width: 270,
      backgroundColor: colors.transparent,
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey,
      height: 55
    },

    textStyle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.black,
      lineHeight: 0
    }
  }),

  alertVerticalDefault: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      width: 270,
      backgroundColor: colors.transparent,
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey,
      height: 55
    },

    textStyle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.pink,
      lineHeight: 0
    }
  }),

  alertVerticalGreen: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      width: 270,
      backgroundColor: colors.transparent,
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey,
      height: 55
    },

    textStyle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.green,
      lineHeight: 0
    }
  }),

  dialogGreen: StyleSheet.extend({
    underlayColor: colors.highlightGreen,

    style: {
      backgroundColor: colors.green,
      flex: 1,
      alignSelf: 'stretch'
    }
  }),

  top: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.window,
      flex: 1,
      alignSelf: 'stretch',

      borderStyle: 'solid',
      borderBottomWidth: 4,
      borderBottomColor: colors.transparent,
      height: 50
    },

    activeStyle: {
      borderBottomColor: colors.pink
    },

    textStyle: {
      color: colors.black
    },

    activeTextStyle: {
      color: colors.pink
    }
  }),

  profile: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.transparent,
      flex: 0,
      alignSelf: 'flex-end',

      borderStyle: 'solid',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: colors.black,
      height: 30,
      paddingLeft: 10,
      paddingRight: 10,
      marginRight: 10
    },

    textStyle: {
      marginLeft: 5,
      color: colors.black,
      fontWeight: 'bold',
      letterSpacing: 1,
      fontSize: 11,
    }
  }),

  profileDefault: StyleSheet.extend({
    underlayColor: colors.highlightPink,

    style: {
      backgroundColor: colors.pink,
      flex: 0,
      alignSelf: 'flex-end',

      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: colors.pink,
      borderRadius: 15,
      height: 30,
      paddingLeft: 10,
      paddingRight: 10,
      marginRight: 10
    },

    textStyle: {
      marginLeft: 5,
      color: colors.white,
      fontWeight: 'bold',
      letterSpacing: 1,
      fontSize: 11,
    }
  }),

  listItem: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.transparent,
      flex: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 20,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',

      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.grey,
      borderRadius: 0,
      height: 50
    },

    textStyle: {
      color: colors.black,
      fontWeight: '400',
      letterSpacing: 0,
      fontSize: 16,
    },

    textTransform: s => s
  }),

  preference: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.white,
      flex: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 20,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',

      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black,
      borderRadius: 0,
      height: 60
    },

    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },

    iconStyle: {
      position: 'absolute',
      right: -12,
      top: -6,
      height: 24,
      width: 24,
      alignItems: 'center',
      justifyContent: 'center'
    },

    textStyle: {
      color: colors.black,
      fontWeight: 'bold',
      letterSpacing: 0,
      fontSize: 16,
      lineHeight: 16,
      flex: 1
    },

    textTransform: s => s
  }),

  preferenceCheck: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: colors.white,
      flex: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 20,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',

      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black,
      borderRadius: 0,
      height: 60
    },

    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },

    iconStyle: {
      position: 'absolute',
      right: -6,
      top: -8,
      height: 30,
      width: 30,
      borderRadius: 15,
      borderStyle: 'solid',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.grey,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white
    },

    activeIconStyle: {
      borderColor: colors.pink,
      backgroundColor: colors.pink
    },

    textStyle: {
      color: colors.black,
      fontWeight: 'bold',
      letterSpacing: 0,
      fontSize: 16,
      lineHeight: 16,
      flex: 1
    },

    textTransform: s => s
  }),

  preferenceLink: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: '#e5e9ea',
      flex: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 20,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',

      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey,
      borderRadius: 0,
      height: 60
    },


    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },

    iconStyle: {
      position: 'absolute',
      right: -12,
      top: -6,
      height: 24,
      width: 24,
      alignItems: 'center',
      justifyContent: 'center'
    },

    textStyle: {
      color: colors.black,
      fontWeight: 'bold',
      letterSpacing: 0,
      fontSize: 16,
      lineHeight: 16,
      flex: 1
    },

    textTransform: s => s
  }),

  preferenceHighlightLink: StyleSheet.extend({
    underlayColor: colors.lightGrey,

    style: {
      backgroundColor: '#e5e9ea',
      flex: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 20,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',

      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey,
      borderRadius: 0,
      height: 60
    },


    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },

    iconStyle: {
      position: 'absolute',
      right: -12,
      top: -6,
      height: 24,
      width: 24,
      alignItems: 'center',
      justifyContent: 'center'
    },


    textStyle: {
      color: colors.pink,
      fontWeight: 'bold',
      letterSpacing: 0,
      fontSize: 16,
      lineHeight: 16,
      flex: 1
    },


    textTransform: s => s
  }),

});
