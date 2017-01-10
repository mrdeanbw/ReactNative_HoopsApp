
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  style: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  titleStyle: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    paddingTop: 20,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center'
  },

  leftBarStyle: {
    position: 'absolute',
    left: 10,
    top: 30,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1
  },

  rightBarStyle: {
    position: 'absolute',
    right: 25,
    top: 30,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1
  },

  titleTextStyle: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: colors.white,
    textAlign: 'center'
  },

  scrollContent: {

  },

  contentStyle: {
    flex: 1,
    alignItems: 'stretch'
  },

  scrollingContentStyle: {

  },

  contentContainerStyle: {

  },


  popupStyle: {
    flex: 1,
    backgroundColor: 'rgba(41,44,52,0.5)',
    alignItems: 'center'
  },

  popupContainerStyle: {
    backgroundColor: colors.white,
    margin: 20,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    borderRadius: 3,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0
  },

  popupBackgroundTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  popupContentContainerStyle: {
    flex: 0,
    justifyContent: 'center'
  },

  popupContentStyle: {
    borderRadius: 3,
    overflow: 'hidden'
  },

  popupButtonBarStyle: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },


  alertContentStyle: {
    padding: 35
  },

  alertTitleStyle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 15,
    letterSpacing: 1,
    color: colors.black
  },

  alertTitleTextTransform: s => s.toUpperCase(),

  alertBodyStyle: {
    color: '#606060',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 15,
    letterSpacing: 1,
  }

});
