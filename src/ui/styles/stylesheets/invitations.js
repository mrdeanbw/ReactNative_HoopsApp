
export default StyleSheet => StyleSheet.extend({
  container: {
    alignItems: 'stretch'
  },

  tabBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 50,
    marginBottom: -1,
    zIndex: 1
  },

  tabButtonContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#f8f9f9',
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 3.5,
    borderBottomColor: 'transparent'
  },

  tabButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: StyleSheet.black
  },

  activeTabButtonText: {
    color: StyleSheet.pink
  },

  activeTabButton: {
    borderStyle: 'solid',
    borderBottomWidth: 3.5,
    borderBottomColor: StyleSheet.pink
  },

  popupContainer: {
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20
  },

  popupButtonContainer: {
    alignItems: 'stretch'
  },

  popupButton: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: StyleSheet.grey
  },

  popupButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
    lineHeight: 21
  },

  greenText: {
    color: StyleSheet.green
  },

  redText: {
    color: StyleSheet.pink
  }
});
