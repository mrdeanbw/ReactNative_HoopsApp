import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({
    container: {
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
      height: 36,
    },
    titleText:{
      color: colors.white,
      fontSize: 13,
      fontWeight: 'bold',
      textAlign: 'center',
    },
})

