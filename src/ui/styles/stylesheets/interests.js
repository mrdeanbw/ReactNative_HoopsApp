
import Color from 'color';
import {colors} from '../resources';

const PinkGradient = Object.keys(colors).filter(v => /^pink\d+$/.test(v)).map(v => colors[v]);
const PinkGradientHighlight = PinkGradient.map(c => Color(c).lighten(0.25).hexString());

export default StyleSheet => StyleSheet.extend({
  checkButtonGradient: StyleSheet.escape(PinkGradient.map(c => StyleSheet.extend({ gradient: {backgroundColor: c} }).gradient)),
  checkButtonHighlightGradient: StyleSheet.escape(PinkGradientHighlight),

  style: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  bannerText: {
    backgroundColor: colors.white,
    textAlign: 'center',
    color: colors.black,
    paddingTop: 30,
    paddingBottom: 30
  },

  bannerTextHighlight: {
    color: colors.pink
  },

  containerStyle: {
    borderBottomWidth: 0
  },

  checkButtonTextStyle: {
    color: colors.white
  },

  checkButtonIconStyle: {
    borderColor: colors.white
  },

  checkButtonCheckedIconStyle: {
    backgroundColor: colors.white
  },

  footer: {
    alignItems: 'stretch'
  },

  viewAllButton: {
    alignSelf: 'center',
    width: 280,
    marginTop: 17,
    marginBottom: 17
  },





  selectModeStyle: {
    flex: 1,
    alignItems: 'stretch'
  },

  selectModeTextStyle: {
    color: colors.white,
    fontSize: 27.48,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 31,
    backgroundColor: 'transparent'
  },

  selectModeHighlightTextStyle: {
    color: colors.pink,
    fontWeight: '500'
  },

  selectModeImageStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    width: null,
    height: null
  },

  organizeImage: {
    paddingTop: 20
  }
});
