import {StyleSheet as StyleSheet, Platform} from 'react-native'

import {colors} from '../resources'

const styles = {
  dateInput: {
    height: 44,
    borderWidth: 0,
    alignItems: 'flex-start',
  },

  disabled: {

  },

  dateTouch: {
  },

  dateTouchBody: {
  },

  dateIcon: {
    position: 'absolute',
    left: -5,
    top: 0,
    bottom: 0,
    height: 44,
    width: 24,
    resizeMode: 'contain',
  },



  placeholderText: {
    color: colors.placeholderText,
    paddingLeft: Platform.OS === 'ios' ? 0 : 5,
  },

  dateText: {
    fontSize: 15,
    paddingLeft: Platform.OS === 'ios' ? 0 : 5,
  },

  /* iOS */
  datePickerCon: {
  },

  datePicker: {
    borderTopColor: colors.pink,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  btnConfirm: {
  },

  btnTextConfirm: {
    color: colors.pink,
    fontSize: 14,
  },

  btnCancel: {
  },

  btnTextCancel: {
    fontSize: 14,
  },
}


const _dateInput = StyleSheet.create({
  ...styles
})

const _dateInputIcon = StyleSheet.create({
  ...styles,
  dateInput: {

    ...styles.dateInput,
    marginLeft: 40,
  },
})

export const dateInput = _dateInput
export const dateInputIcon = _dateInputIcon
