import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {Button, Popup} from '../'
import StyleSheet from '../../styles'
import _ from '../../i18n'

class GenderInfoPopup extends Component {

  render() {
    return (
      <Popup visible={this.props.visible}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle]}>
            {_('genderPopupTitle')}
          </Text>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop, StyleSheet.doubleLineHeight]}>
            {_('genderPopupContent')}
          </Text>
        </View>
        <View style={StyleSheet.buttons.bar}>
          <Button
            style={[StyleSheet.buttons.okPopup]}
            textStyle={StyleSheet.whiteText}
            type="alertDefault"
            text={_('ok')}
            onPress={this.props.onPressOk}
          />
        </View>
      </Popup>
    )
  }
}

export default GenderInfoPopup
