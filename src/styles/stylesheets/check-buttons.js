import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

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
      backgroundColor: colors.transparent
    },

    checkedIconContainerStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      overflow: 'hidden',
    },

    checkedIconStyle: {
      backgroundColor: colors.transparent,
    },
  }),

  colorMode:{
    white:{
      unCheckedStyle:{
        backgroundColor: colors.white,
        borderColor: colors.white
      },
      checkedStyle:{
        backgroundColor: colors.pink,
        borderColor: colors.pink
      },
    },
    pink:{
      unCheckedStyle:{
        backgroundColor: colors.pink,
        borderColor: colors.pink
      },
      checkedStyle:{
        backgroundColor: colors.white,
        borderColor: colors.white
      },
    },
    whitePinkBorder:{
      unCheckedStyle:{
        backgroundColor: colors.white,
        borderColor: colors.pink
      },
      checkedStyle:{
        backgroundColor: colors.pink,
        borderColor: colors.pink
      },
    },
    transparentWhiteBorder:{
      unCheckedStyle:{
        backgroundColor: colors.transparent,
        borderColor: colors.white
      },
      checkedStyle:{
        backgroundColor: colors.white,
        borderColor: colors.white
      },
    },
  }
})

