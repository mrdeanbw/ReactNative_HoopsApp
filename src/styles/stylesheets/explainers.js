import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
  container: {
    backgroundColor: colors.pink,
  },

  slide: {
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    height: '80%'
  },

  text: {
    color: 'black',
    backgroundColor: 'yellow',
  },

  paginatorText: {
    color: colors.white,
    marginBottom: '17%',
    textAlign: 'center'
  },

  buttonBar: {
    height: '8%',
    paddingBottom: '2%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
})
