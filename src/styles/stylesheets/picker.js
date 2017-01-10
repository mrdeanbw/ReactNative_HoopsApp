
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  style: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 0
  },

  containerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'visible',
    paddingTop: 40,
    paddingBottom: 40
  },

  contentStyle: {
    overflow: 'visible'
  },

  textStyle: {
    lineHeight: 16,
    height: 40,
    letterSpacing: 1.5,
    margin: 0,
    padding: 0,
    fontWeight: '500',
    fontSize: 13
  },

  overlayStyle: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 28,
    borderStyle: 'solid',
  },

  topOverlayStyle: {
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.pink
  },

  bottomOverlayStyle: {
    bottom: 0,
    height: 52,
    borderTopWidth: 1,
    borderTopColor: colors.pink
  }

});
