
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  titleStyle: {
    height: 180,
    alignItems: 'center',
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

  titleButtonBar: {
    flexDirection: 'row',
    marginBottom: 25
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

  profileContainer: {
    flex: 0,
    marginTop: -35,
    marginBottom: 25,
    alignSelf: 'center',
  },

  avatarStyle: {
    alignItems: 'center',
  },

  avatarContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 35,
    overflow: 'visible',
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },

  avatarImageStyle: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 35,
    overflow: 'hidden'
  },

  avatarNameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
    color: colors.black,
    marginTop: 10
  },

  avatarOccupationStyle: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
    color: colors.pink
  },

  eventInfoBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },

  eventInfoStyle: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },

  eventInfoIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  },
  eventInfoText: {
    color: colors.black,
    fontSize: 14,
    lineHeight: 14,
    marginTop: 10,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  eventInfoTextHighlight: {
    color: colors.pink
  },

  lightTextStyle: {
    fontWeight: '400'
  },

  eventInfoKey: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
    color: colors.grey,
    textAlign: 'center'
  },

  horizontalRule: {
    marginTop: 30,
    marginBottom: 30
  },

  sectionTitleTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 14,
    marginLeft: 15,
    marginRight: 25,
    marginBottom: 12,
    color: colors.black
  },

  sectionBodyTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginLeft: 15,
    marginRight: 25,
    color: '#606060'
  },

  mapViewStyle: {
    marginTop: 30
  },

  actionButtonTextStyle: {
    letterSpacing: 1,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 24,
    marginTop: -2,
    marginBottom: -2,
    color: colors.white
  }



});
