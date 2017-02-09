export default StyleSheet => StyleSheet.extend({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: -1,
    marginBottom: -1,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
      height: 36,
      width: 36,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#ffffff',
    marginRight: 20,
  },
  textContainer: {
    flex: 3,
    alignItems: 'flex-start',
  },
  textStyle: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 18,
  },
  textTransform: s => s
})
