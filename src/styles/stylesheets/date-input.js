
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

  style: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  pickerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  dayPickerStyle: {
    width: 50,
    height: 150,
    marginLeft: 15
  },

  monthPickerStyle: {
    width: 50,
    height: 150,
    marginLeft: 25
  },

  yearPickerStyle: {
    width: 50,
    height: 150,
    marginLeft: 25,
    marginRight: 15
  },

  hourPickerStyle: {
    width: 30,
    height: 150,
    marginLeft: 15
  },

  minutePickerStyle: {
    width: 30,
    height: 150,
    marginRight: 15
  },

  timeSeparator: {
    marginLeft: 10,
    marginRight: 5,
    paddingTop: 9
  },

  buttonBar: {
    flex: 1,
    flexDirection: 'row',
    height: 50
  },

  titleTextStyle: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginTop: 25
  },

  items: {

  },



});
