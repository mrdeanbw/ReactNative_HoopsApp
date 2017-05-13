import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  bankInfoBox: StyleSheet.extend({
    container:{
      marginTop: 20,
      marginBottom: 20,
      flexDirection: "column",
      borderRadius: 15,
      minWidth: 285,


    },
    top:{
      backgroundColor: colors.pink,
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    bottom:{
      backgroundColor: colors.white,
      flexDirection: "row",
      justifyContent:"space-between",
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      padding: 12,
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 3
    },
    shadowRadius: 5,
    },
    detailsContainer:{


    },
    nameContainer:{

    },
    bankDetails:{

    },
    iconContainer:{
      alignItems: "center",
      justifyContent: "center",
      borderColor: colors.white,
      borderLeftWidth: 1,
      padding:12,
      paddingLeft: 24,
      paddingRight:24,
    },
  })
})
