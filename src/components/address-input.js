import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Platform} from 'react-native'
import {connect} from 'react-redux'

import {navigationActions} from '../actions'
import {Icon} from '../components'
import StyleSheet from '../styles'

class AddressInput extends Component {

  onSelect(venueAddress) {
    this.props.onSelect(venueAddress)
    this.props.onNavigateBack()
  }

  onPressInput() {
    this.props.onNavigate('venueAddress', {
      onSelect: this.onSelect.bind(this)
    }, false)
  }

  render() {
    const {icon, textColor} = this.props

    const androidMarginFix =  Platform.OS === 'ios' ? null : StyleSheet.singlePlusMarginRight
    const androidMatchFontSize =  Platform.OS === 'ios' ? null : StyleSheet.androidMatchFontSizeSmall

    const textStyles = [
      StyleSheet.textInputs.flat.textStyle,
      {color: this.props.activity ? undefined : StyleSheet.textInputs.flat.placeholderTextColor},
    ]
    const iconStyles = [
      StyleSheet.textInputs.default.iconStyle,
      StyleSheet.textInputs['flat'].iconStyle,
    ]
    return (
      <TouchableHighlight onPress={this.onPressInput.bind(this)} underlayColor="transparent">
        <View style={StyleSheet.textInputs.flat.style}>
          {icon && (<Icon name="home" style={[iconStyles, androidMarginFix]} />)}
          <Text style={[textStyles, androidMatchFontSize, textColor]}>
            {this.props.value ? this.props.value : this.props.placeholder}
          </Text>
          <Icon name="chevronRightPink"/>
        </View>
      </TouchableHighlight>
    )
  }
}

AddressInput.propTypes = {
  placeholder: React.PropTypes.string,
  onSelect: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onNavigate: (key, props) => dispatch(navigationActions.push({ key, props })),
  }),
)(AddressInput)

