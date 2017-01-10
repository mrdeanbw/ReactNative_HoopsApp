
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  noCardsText: {
    fontSize: 18,
    color: colors.pink,
    padding: 70,
    textAlign: 'center',
  },

  cardWrapper: {
    backgroundColor: colors.white,
  },

  cardContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },

  cardText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },

  cardBrand: {
  },

  cardName: {
  },

  cardLast4: {
  },

  underlayColor: colors.white,

  accountDataText: {
    fontSize: 16,
  },

});
