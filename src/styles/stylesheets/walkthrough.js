import {Dimensions, Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
    alignItems: 'center'
  },

  logoContainer: {
    marginTop: Dimensions.get('window').width < 350 ? (Platform.OS === 'ios') ? 40 : 30 : (Platform.OS === 'ios') ? 64 : 54,
    marginBottom: 10,
    alignItems: 'center',
    flex: 1
  },

  logo: {
    width: Dimensions.get('window').width * 0.74,
    height: Dimensions.get('window').width * 0.13,
    resizeMode: 'contain'
  },

  paginator: {
    position: 'absolute',
    alignItems: 'flex-start',
    top: Dimensions.get('window').width < 350 ? 60 : 80,
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
    flex: Dimensions.get('window').height > 800 ? 5 : 7,
  },

  swiperContainer: {
    flex: 1
  },

  page: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  pageText: {
    fontSize: Dimensions.get('window').width > 500 ? 16 : Dimensions.get('window').width > 350 ? null : 12,
    lineHeight: Dimensions.get('window').width > 500 ? 21 : Dimensions.get('window').width > 350 ? null : 15,
    textAlign: 'center',
    color: colors.white,
  },

  pageTextHighlight: {
    color: colors.pink
  },

  pageImage: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.6,
    resizeMode: 'contain',
    position: 'absolute',
    top: Dimensions.get('window').width < 350 ? 105 : 125
  }
})
