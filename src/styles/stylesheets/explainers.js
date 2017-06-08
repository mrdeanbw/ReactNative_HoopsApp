import {Platform , Dimensions} from 'react-native'

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
    height: '80%',
    resizeMode: 'contain'
  },

  text: {
    color: 'black',
    backgroundColor: 'yellow',
  },

  paginatorText: {
    color: colors.white,
    marginBottom: '17%',
    paddingTop: Dimensions.get('window').width < 350 ? 5 : 0,
    textAlign: 'center',
    bottom: Platform.OS === 'ios' ? 0 : '6%',
    left: 0,
    right: 0
  },

  buttonBar: {
    height: '8%',
    paddingBottom: '2%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : '8%',
    left: 0,
    right: 0
  }
})

