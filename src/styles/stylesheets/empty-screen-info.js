import {Dimensions} from 'react-native'

import {colors} from '../resources'

const _padding = Math.round(Dimensions.get('window').height / 8.34)
const _marginTop = Math.round(Dimensions.get('window').height / 66.7)
const _marginBottom = Math.round(Dimensions.get('window').height / 22.23)
const _iconArrowHeight = Math.round(Dimensions.get('window').height / 22.23)
const _iconArrowWidth = Math.round(Dimensions.get('window').width / 9.37)
const _iconSadHeight = Math.round(Dimensions.get('window').height / 19.05)
const _iconSadWidth = _iconSadHeight
const _headerFontSize = Math.round(Dimensions.get('window').height / 41.68)
const _textFontSize = Math.round(Dimensions.get('window').height / 47.64)
const _lineHeight = Math.round(Dimensions.get('window').height / 30.31)

export default StyleSheet => StyleSheet.extend({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: _padding,
    paddingBottom: _padding,
  },

  headerContainer: {
    marginBottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    color: colors.grey,
    fontSize: _headerFontSize,
    fontWeight:'bold',
    textAlign: 'center',
    marginTop: _marginTop,
    lineHeight: _lineHeight,
  },

  textContainer: {
    marginBottom: _marginBottom,
  },

  textStyle: {
    color: colors.grey,
    fontSize: _textFontSize,
    textAlign: 'center',
    lineHeight: _lineHeight,
  },

  iconSad: {
    width: _iconSadHeight,
    height: _iconSadWidth
  },

  iconArrow: {
    width: _iconArrowHeight,
    height: _iconArrowWidth
  },
})
