
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
    paddingRight: 15,
  },

  highlightRow: {
    borderColor: colors.pink,
    borderLeftWidth: 5,
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
  venue: {

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
  }
});
