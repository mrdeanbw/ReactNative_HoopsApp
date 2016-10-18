
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  switchButton: {
    marginTop: -10,
    marginLeft: 5
  },

  headlineBarStyle: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  avatarImageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 40,
    marginRight: 20
  },

  headlineDetailStyle: {
    flex: 1
  },

  nameTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -15
  },

  nameTextStyle: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: 'bold',
    color: colors.black
  },

  availableIndicator: {
    width: 10,
    height: 10,
    backgroundColor: colors.green,
    borderRadius: 5,
    marginRight: 5,
    marginTop: -1
  },

  locationTextStyle: {
    fontSize: 12,
    lineHeight: 12,
    marginTop: 5,
    marginBottom: 5,
    color: '#8e8e93'
  },

  buttonBarStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: -10
  },


  statsBarStyle: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10
  },


  statsItemStyle: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },


  statsValueTextStyle: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
    color: colors.black
  },


  statsKeyTextStyle: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '400',
    color: '#8e8e93',
    lineHeight: 15
  },


  infoStyle: {
    padding: 20
  },


  titleTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: colors.black,
    marginBottom: 5
  },

  bodyTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#606060'
  },

  upcomingBarStyle: {
    height: 50,
    paddingTop: 0
  },

  upcomingBarText: {
    fontSize: 13,
    lineHeight: 13,
  },

  fieldLabelText: {
    color: colors.pink,
    fontSize: 12,
    lineHeight: 12,
    marginTop: 20
  },

  groupStyle: {

  },

  groupTitleTextStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: colors.pink,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },

  interests: {
    backgroundColor: colors.white,
    flex: 1,
  },

  interestsSectionHeader: {
    backgroundColor: colors.white,
    paddingTop: 16,
    paddingHorizontal: 16,
  },

  interestsSectionHeaderText: {
    color: colors.pink,
    fontWeight: 'bold',
  },

  interestsRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'flex-start',
    borderColor: colors.lightGrey,
    borderBottomWidth: 1,
  },

  interestsRowActive: {
    backgroundColor: colors.pink,
  },

  interestsTextActive: {
    color: colors.white,
  },

  interestsUnderlay: colors.transparent,

  interestsUnderlayActive: colors.pink,

  imageContainer: {
    alignSelf: 'center',
    overflow: 'hidden',
    flex: 0,
    height: 80,
    width: 80,
    borderRadius: 80,
  },

  image: {
    height: 80,
    width: 80,
  },

  imageIconOverlay: {
    //icon is 29x23
    position: 'absolute',
    top: 29,
    left: 26,
  },

  imageTintOverlay: {
    backgroundColor: colors.pink,
    opacity: 0.67,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  editLabel: {
    color: colors.pink,
    fontSize: 12,
    marginTop: 16,
  },

  editInterestsItem: {
    flex: 1,
    backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  editInterestsItemText: {
    fontSize: 16,
    paddingVertical: 10,
    backgroundColor: 'lightblue',
  },

  editInterestsIcon: {
    backgroundColor: colors.pink,
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});
