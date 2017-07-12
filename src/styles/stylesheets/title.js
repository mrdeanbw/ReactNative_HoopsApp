import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
    container: {
    height: 38,
    flexDirection: 'row',
    backgroundColor: '#3B404A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
  },
    titleText:{
    color: colors.white,
    lineHeight: 17,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    },
})

