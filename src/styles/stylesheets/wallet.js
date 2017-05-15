import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  bankInfoBox: StyleSheet.extend({
    container:{
      flexDirection: "column",
      borderRadius: 15,
      minWidth: 285,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 5,
      shadowOpacity: 0.2,
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
      paddingRight: 20,
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
    name: {
      color: colors.white,
      paddingTop: 15,
      paddingLeft: 15,
      fontWeight: "bold"
    },
    bankDetailsText:{
      color: colors.white,
      fontSize: 12,
      paddingLeft: 15,
      paddingBottom: 15,
    },
    iconCircle:{
      borderRadius: 30,
      borderColor: colors.white,
      borderWidth: 1,
      padding: 3,
    },
    balance: {
      color: colors.green,
      fontWeight: "bold",
    },
    balanceLabel:{
      color: colors.black
    }
  })
})
