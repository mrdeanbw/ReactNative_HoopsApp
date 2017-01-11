import {Platform} from 'react-native';

import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
    alignItems: 'center'
  },

  logoContainer: {
    marginTop: (Platform.OS === 'ios') ? 64 : 54,
    alignItems: 'center',
  },

  logo: {},

  paginator: {
    position: 'absolute',
    alignItems: 'flex-start',
    top: 80,
    left: 0,
    bottom: 0,
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
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  swiper: {
    marginTop: 10
  },

  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },

  pageText: {
    textAlign: 'center',
    color: colors.white,
    marginBottom: 50,
  },

  pageTextHighlight: {
    // color: colors.pink
  },

  pageImage: {
    // flex: 1,
    resizeMode: 'contain',
  }
});
