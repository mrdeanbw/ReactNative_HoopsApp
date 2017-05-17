import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  button: {
    paddingLeft:30,
    paddingRight: 30,
  },
  bankInfoBox: StyleSheet.extend({
    container: {
      flexDirection: "column",
      borderRadius: 7,
      minWidth: 150,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 5,
      shadowOpacity: 0.2,
    },
    top: {
      backgroundColor: colors.pink,
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
    bottom: {
      backgroundColor: colors.white,
      flexDirection: "row",
      justifyContent:"space-between",
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
      paddingLeft: 15,
      paddingBottom: 10,
      paddingTop:10,
      paddingRight: 15,
    },
    iconContainer:{
      alignItems: "center",
      justifyContent: "center",
      borderColor: colors.white,
      borderLeftWidth: 1,
      padding:6,
      paddingLeft: 18,
      paddingRight:18,
    },
    detailsContainer: {
      paddingRight: 15,
    },
    name: {
      color: colors.white,
      fontSize: 12,
      paddingTop: 10,
      paddingLeft: 15,
      fontWeight: "bold"
    },
    bankDetailsText:{
      color: colors.white,
      fontSize: 9,
      paddingLeft: 15,
      paddingBottom: 11,
      lineHeight: 13,
    },
    iconCircle:{
      borderRadius: 30,
      borderColor: colors.white,
      borderWidth: 1,
      padding : 2,
    },
    iconStyle:{
      width: 15,
      height: 15
    },
    balance: {
      color: colors.green,
      fontWeight: "bold",
      fontSize: 8
    },
    balanceLabel:{
      color: colors.black,
      fontSize: 8
    }
  }),

  UserListInWallet: StyleSheet.extend({
    container: {
      paddingTop: 13,
      flexDirection: 'column',
      flexJustify: 'flex-start',
      alignItems: 'flex-start',
    },
    dateContainer: {
      paddingLeft: 20,
      paddingBottom: 3,
    },
    dateText: {
      color: colors.pink,
      fontSize: 8,
      fontWeight: 'bold',
      lineHeight: 10,
    },
    mainContentContainer:{
      paddingTop: 5,
      paddingBottom: 7,
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: colors.grey,
    },
    imageContainer: {
      overflow: 'hidden',
      marginRight: 8,
    },
    avatarStyle: {
       width: 30,
       height: 30,
       borderRadius: 15
    },
    textContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    textStyle: {
      textAlign: 'left',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontWeight: 'bold',
      fontSize: 10,
      lineHeight: 12,
      color: "grey",
      fontStyle: 'italic'
    },
    activityTextStyle: {
      textAlign: 'left',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontWeight: 'normal',
      fontSize: 9,
      lineHeight: 10,
      color: "grey",
    },
    price:{
      color: colors.green,
      fontSize: 13,
      fontWeight:'bold'
    },
  })
})

