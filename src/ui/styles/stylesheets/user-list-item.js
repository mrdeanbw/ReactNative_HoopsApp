
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  underlayColor: colors.lightGrey,

  disclosureUnderlayColor: colors.transparent,

  container: {
    height: 85,
    borderStyle: 'solid',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.black,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 15,
  },

  detail: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-start'
  },

  imageContainer: {
    borderRadius: 55,
    width: 55,
    height: 55,
    overflow: 'hidden',
    marginRight: 15
  },
  avatar: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#010000',
    paddingRight: 30
  },
  highlight: {
    color: colors.pink
  },
  venue: {

  },
  date: {

  },

  textStyle: {
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 12,
    lineHeight: 15
  },

  titleTextStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18
  },

  status: {
    width: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statuses: StyleSheet.escape({

    confirmed: {
      backgroundColor: colors.pink
    },

    pending: {
      backgroundColor: colors.yellow
    },

    rejected: {
      backgroundColor: colors.black
    }

  }),

  paidText: {
    color: colors.pink,
  },

  cashText: {
    color: colors.green,
  },

  spacer: {
    marginRight: 15,
    marginLeft: 15
  },
});
