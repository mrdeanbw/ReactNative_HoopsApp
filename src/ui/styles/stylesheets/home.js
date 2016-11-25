
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  container: {
    alignItems: 'stretch'
  },

  nearbyContainer: {
  },

  nearbyTitle: {
    backgroundColor: colors.black,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },

  nearbyTitleText: {
    fontSize: 13,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
    backgroundColor: colors.black,
    lineHeight: 16,
    letterSpacing: 1
  },

  listIcon: {
    position: 'absolute',
    right: 24,
    top: 0,
    bottom: 0,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: null
  },

  nearbyMapContainer: {
    alignItems: 'stretch',
    flex: 1,
    height: 250,
  },
});
