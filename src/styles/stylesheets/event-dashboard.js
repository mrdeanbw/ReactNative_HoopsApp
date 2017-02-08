import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

  titleStyle: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  },

  coverImageStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    width: null,
    height: null,
    resizeMode: 'cover',
    margin: 0
  },

  coverImageOverlayStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: 'rgba(41,44,52,0.5)'
  },

  titleTextStyle: {
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 23,
    color: colors.white,
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 2 },
    textShadowColor: 'rgba(0,0,0,0.3)',
    overflow: 'visible'
  },

  subtitleTextStyle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 13,
    color: colors.white,
    marginTop: 10,
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 2 },
    textShadowColor: 'rgba(0,0,0,0.3)',
    overflow: 'visible'
  },
})
