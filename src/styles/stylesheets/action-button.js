import {Dimensions} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

  action: {
    underlayColor: '#000000',

    touchContainer: {
      backgroundColor: colors.black
    },
  },

  actionDefault: {
    underlayColor: colors.black,

    touchContainer: {
      backgroundColor: colors.pink,
    }
  },

  actionGreen: {
    underlayColor: colors.highlightGreen,

    touchContainer: {
      backgroundColor: colors.green
    }
  },

  touchContainer: {
    zIndex: 1,
    width: 70,
    height: 70,
    borderRadius: 70,
    activeOpacity: 1.0,
    position: 'absolute',
    bottom: -10.00,
    left: (Dimensions.get('window').width / 2) - 42,

    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },

  containerStyle: {
    overflow: 'visible',
    flexDirection: 'column',
    width: 75,
    height: 75,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textStyle: {
    letterSpacing: 0,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 15,
    color: colors.white,
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

  textLargeStyle: {
    letterSpacing: 1,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 24,
    marginTop: -2,
    marginBottom: -2,
    color: colors.white
  },

  textTransform: s => s
})
