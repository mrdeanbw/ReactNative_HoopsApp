
import {colors} from '../resources';


export default StyleSheet => StyleSheet.extend({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
    alignItems: 'center'
  },

  swiperContainer: {
    flex: 1
  },

  logoContainer: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  logo: {},

  swiper: {
    paddingTop: 51
  },

  paginator: {
    position: 'absolute',
    top: 160,
    left: 0,
    bottom: null,
    right: 0,
    zIndex: 100
  },

  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4
  },

  activeDot: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4
  },

  buttonBar: {
    flexDirection: 'row',
    height: 50
  },

  page: {
    alignItems: 'center'
  },

  pageText: {
    textAlign: 'center',
    color: colors.white,
    marginBottom: 24
  },

  pageTextHighlight: {
    color: colors.pink
  },

  pageImage: {
    resizeMode: 'contain',
    width: 275
  }
});
