
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  underlayColor: colors.lightGrey,

  container: {
    height: 85,
    borderStyle: 'solid',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.black,
    backgroundColor: colors.white
  },

  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5,
  },

  imageContainer: {
    borderRadius: 55,
    width: 55,
    height: 55,
    overflow: 'hidden',
    marginRight: 15
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  endedImageOverlay: {
    backgroundColor: '#242424CC',
  },

  cancelledImageOverlay: {
    backgroundColor: '#C10202CC',
  },

  disabledImageText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: 'bold',
  },

  textContainer: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#010000',
    paddingRight: 30
  },
  detail: {
    fontSize: 12,
    color: '#606060',
    lineHeight: 16
  },
  highlight: {
    color: colors.pink
  },
  bottomText: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  venue: {
    flex: 1,
  },
  date: {
  },

  disclosure: {
    marginLeft: 15
  },

  distance: {
    fontSize: 12,
    color: '#8e8e93',
    lineHeight: 18,
    textAlign: 'right',

    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1
  },

  freeIcon: {
    position: 'absolute',
    left: 0,
    top: 0
  },

  disabledText: {
    color: '#8E8E93',
  },
});
