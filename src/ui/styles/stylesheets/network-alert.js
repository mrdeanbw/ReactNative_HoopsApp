
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  container: {
    backgroundColor: colors.pink,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },

  icon: {
    marginBottom: 15,
    alignSelf: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 40,
    color: colors.white,
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    color: colors.white,
    margin: 20,
    //textAlign: 'center',
  },
});
