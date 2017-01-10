
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  style: {

  },

  containerStyle: {
    padding: 20
  },

  titleTextStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 15,
    marginTop: 30
  },

  distanceTextStyle: {
    marginTop: -15,
    fontSize: 14,
    textAlign: 'right'
  },

  resultsContainer: {
    backgroundColor: '#F7F9F9',
  },

  resultsTitle: {
    color: colors.pink,
    paddingTop: 16,
  },

  resultTitle: {
    textAlign: 'center',
    padding: 5,
    paddingTop: 10,
  },

  seeMoreUnderlay: colors.lightGrey,

  seeMoreText: {
    color: colors.pink,
    borderColor: colors.pink,
    borderWidth: 1,
    flex: 1,
    textAlign: 'center',
    padding: 10,
  },

});
