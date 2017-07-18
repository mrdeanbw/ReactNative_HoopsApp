import {Dimensions} from 'react-native'

import {colors} from '../resources'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

// big screen - width: 640 , height: 1007, phone -  360 x 640,

// Dimension - current screen dimension (width or height), oldDimension -  screen dimension (width or height) where appears oldValue to convert,
const responsiveToScreenSize = (newDimension, oldDimension, oldValue) => {
    let newValue = Math.round(newDimension / (oldDimension / oldValue))
  return newValue
}

const responsive = {
  Horizontal: (value) => responsiveToScreenSize(width, 360, value),
  Vertical: (value) => responsiveToScreenSize(height, 640, value),
}
const breakPoint = height < 1006 ? true : false

const responsiveStyles = {

  name: {
    fontSize: responsive.Vertical(12),
    paddingLeft: responsive.Horizontal(10),
    paddingTop:  responsive.Vertical(15),
  },

  bankDetailsText: {
    fontSize: responsive.Vertical(9),
    paddingLeft: responsive.Horizontal(15),
    paddingBottom: responsive.Vertical(11),
    lineHeight: responsive.Vertical(13),
  },

  balance: {
    fontSize: responsive.Vertical(9),
  },

  balanceLabel: {
    fontSize: responsive.Vertical(9),
 },

  top: {
    borderTopLeftRadius: responsive.Horizontal(7),
    borderTopRightRadius: responsive.Horizontal(7),
 },

 bottom: {
    borderBottomLeftRadius: responsive.Horizontal(7),
    borderBottomRightRadius: responsive.Horizontal(7),
    paddingLeft: responsive.Horizontal(15),
    paddingBottom: responsive.Vertical(10),
    paddingTop: responsive.Vertical(10),
    paddingRight: responsive.Horizontal(15),
 },

iconContainer:{
    padding:  responsive.Vertical(6),
    paddingLeft: responsive.Horizontal(20),
    paddingRight: responsive.Horizontal(20),
  },

detailsContainer: {
    paddingRight: responsive.Horizontal(15),
  },

iconCircle:{
    borderRadius: responsive.Horizontal(30),
    padding : responsive.Horizontal(2),
  },

iconStyle:{
    width:  responsive.Horizontal(15),
    height: responsive.Vertical(15),
  },
}

export default StyleSheet => StyleSheet.extend({
  button: {
    paddingLeft:30,
    paddingRight: 30,
  },
  bankInfoBox: StyleSheet.extend({
    container: {
      flexDirection: "column",
      borderRadius: 7,
      minWidth: 255,
      width: width > 641 ? null : '70%',
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
      borderTopLeftRadius: breakPoint ? responsiveStyles.top.borderTopLeftRadius : 7,
      borderTopRightRadius: breakPoint ? responsiveStyles.top.borderTopRightRadius : 7,
    },

    bottom: {
      backgroundColor: colors.white,
      flexDirection: "row",
      justifyContent:"space-between",
      borderBottomLeftRadius: breakPoint ? responsiveStyles.bottom.borderBottomLeftRadius : 7,
      borderBottomRightRadius: breakPoint ? responsiveStyles.bottom.borderBottomRightRadius : 7,
      paddingLeft: breakPoint ? responsiveStyles.bottom.paddingLeft : 15,
      paddingBottom: breakPoint ? responsiveStyles.bottom.paddingBottom : 10,
      paddingTop: breakPoint ? responsiveStyles.bottom.paddingTop : 10,
      paddingRight: breakPoint ? responsiveStyles.bottom.paddingRight : 15,
    },

    iconContainer:{
      alignItems: "center",
      justifyContent: "center",
      borderColor: colors.white,
      borderLeftWidth: 1,
      padding:  breakPoint ? responsiveStyles.iconContainer.padding : 6,
      paddingLeft: breakPoint ? responsiveStyles.iconContainer.paddingLeft : 20,
      paddingRight: breakPoint ? responsiveStyles.iconContainer.paddingRight : 20,
    },

    detailsContainer: {
      paddingRight: breakPoint ? responsiveStyles.detailsContainer.paddingRight : 15,
    },

    name: {
      color: colors.white,
      fontSize: breakPoint ? responsiveStyles.name.fontSize  : 12,
      paddingTop: breakPoint ? responsiveStyles.name.paddingLeft  : 10,
      paddingLeft: breakPoint ? responsiveStyles.name.paddingTop  : 15,
      fontWeight: "bold"
    },

    bankDetailsText:{
      color: colors.white,
      fontSize: breakPoint ? responsiveStyles.bankDetailsText.fontSize : 9,
      paddingLeft: breakPoint ? responsiveStyles.bankDetailsText.paddingLeft : 15,
      paddingBottom:  breakPoint ? responsiveStyles.bankDetailsText.paddingBottom  : 11,
      lineHeight: breakPoint ? responsiveStyles.bankDetailsText.lineHeight  : 13,
    },

    iconCircle:{
      borderRadius: breakPoint ? responsiveStyles.iconCircle.borderRadius : 30,
      borderColor: colors.white,
      borderWidth: 1,
      padding : breakPoint ? responsiveStyles.iconCircle.padding : 2,
    },

    iconStyle:{
      width:  breakPoint ? responsiveStyles.iconStyle.width : 15,
      height: breakPoint ? responsiveStyles.iconStyle.height : 15
    },

    balance: {
      color: colors.green,
      fontWeight: "bold",
      fontSize:  breakPoint ? responsiveStyles.balance.fontSize  : 9,
    },

    pending: {
      color: colors.yellow,
      fontWeight: "bold",
      fontSize:  breakPoint ? responsiveStyles.balance.fontSize  : 9,
    },

    balanceLabel:{
      color: colors.black,
      fontSize: breakPoint ? responsiveStyles.balanceLabel.fontSize  : 9,
    }
  }),

  UserListInWallet: StyleSheet.extend({
    container: {
      paddingTop: 13,
      flexDirection: 'column',
      justifyContent: 'flex-start',
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
       width: 35,
       height: 35,
       borderRadius: 17.5
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

