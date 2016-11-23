


import {colors} from '../resources';

export default StyleSheet => StyleSheet.escape({

  default: StyleSheet.extend({
    activeOpacity: 1.0,
    underlayColor: colors.lightGrey,
    keyboardAppearance: "dark",
    placeholderTextColor: colors.placeholderText,
    selectionColor: colors.pink,

    style: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: colors.transparent
    },

    textStyle: {
      flex: 1,
      height: 44,
    },

    staticTextStyle: {
      lineHeight: 44,
    },

    barStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }),

  rounded: StyleSheet.extend({

    style: {
      alignItems: 'center',
      backgroundColor: colors.lightGrey,
      height: 44,
      borderRadius: 22
    },

    iconStyle: {
      position: 'absolute',
      left: 16,
      top: 0,
      bottom: 0,
      height: 44,
      resizeMode: 'contain'
    },

    textStyle: {
      textAlign: 'center',
      lineHeight: 22,
      paddingLeft: 44,
      paddingRight: 44,
      fontSize: 16
    }
  }),


  flat: StyleSheet.extend({
    keyboardAppearance: "dark",
    placeholderTextColor: colors.placeholderText,
    selectionColor: colors.pink,

    style: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.transparent,
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey,
      height: 44,
      alignItems: 'center'
    },

    iconStyle: {
      marginRight: 16
    },

    textStyle: {
      flex: 1
    },
  }),

  alert: StyleSheet.extend({
    keyboardAppearance: "light",
    placeholderTextColor: colors.placeholderText,
    selectionColor: colors.pink,

    style: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.transparent,
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey,
      height: 32,
      alignItems: 'center'
    },

    iconStyle: {
      marginRight: 16
    },

    textStyle: {
      flex: 1,
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 15
    },
  }),

  search: StyleSheet.extend({
    keyboardAppearance: "light",
    placeholderTextColor: colors.placeholderText,
    selectionColor: colors.black,

    style: {
      flexDirection: 'row-reverse',
      backgroundColor: colors.white,
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grey,
      alignItems: 'center',
      height: 50
    },

    iconStyle: {
      marginRight: 16,
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: 0
    },

    textStyle: {
      flex: 1,
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 15,
      paddingLeft: 16,
      paddingRight: 10,
      marginLeft: 0,
      marginRight: 0
    },
  }),

  multiline: StyleSheet.extend({
    keyboardAppearance: "light",
    placeholderTextColor: colors.placeholderText,
    selectionColor: colors.pink,

    style: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: 0,
      margin: 0,
      backgroundColor: colors.window
    },

    textStyle: {
      flex: 1,
      height: undefined,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      fontSize: 16,
      lineHeight: 20,
      margin: 0,
      color: '#606060'
    }
  }),

  autocomplete: StyleSheet.extend({
    container: {
      zIndex: 10,
      position: 'absolute',
      left: 0,
      right: 0,
    },

    row: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderWidth: 1,
      borderTopWidth: 0,
      borderColor: colors.lightGrey,
    },

    text: {
      fontSize: 16,
    },
  }),

  error: {
    backgroundColor: '#FBE3EA',
  },

  errorPlaceholderColor: colors.pink,

});
