import React from 'react'
import {View, Image, Text} from 'react-native'
import {connect} from 'react-redux'
import Svg, {Polygon} from 'react-native-svg'

import StyleSheet from '../styles'
import SwitchButton from './switch-button'
import _ from '../i18n'
import {colors} from '../styles/resources'
import {userActions} from '../actions'
import Button from './button'
import HighlightText from './highlight-text'

class Header extends React.Component {

  renderLeftAction() {
    if (this.props.onClose) {
      return (
        <Button
          type="title"
          icon="close"
          onPress={this.props.onClose}
        />
      )
    }
    else if (this.props.onBack) {
      return (
        <Button
          type="title"
          icon="back"
          onPress={this.props.onBack}
        />
      )
    }
    else if (this.props.user.mode === 'PARTICIPATE') {
      return (
        <SwitchButton
          value={this.props.user.availability}
          onChange={this.props.onToggleAvailability}
        />
      )
    }
  }

  renderFullHeader() {
    let modeText, modeTextHighlight
    if (this.props.user.mode === 'ORGANIZE') {
      modeText = _('organizerMode')
      modeTextHighlight = _('organizer')
    } else {
      modeText = _('participantMode')
      modeTextHighlight = _('participant')
    }

    return (
      <View>
        <View style={StyleSheet.window.logoBarStyle}>
          <Image source={StyleSheet.images.logo} style={StyleSheet.window.logoStyle} />
          <Button type="modeSwitch" hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} icon="switch" onPress={this.props.onToggleMode} />
          <View style={[StyleSheet.window.accessoryBarStyle, {width:50, height:50}]}>
            {this.renderLeftAction()}
          </View>
        </View>

        <View style={StyleSheet.window.mainBar}>
          {this.props.title && (
            <View style={StyleSheet.window.crumbBar}>
              <Text style={[StyleSheet.text, StyleSheet.window.crumbTextStyle]}>
                {this.props.title.toUpperCase()}
              </Text>
            </View>
          )}

          {this.props.title && (
            <Svg width="16" height="32">
              <Polygon points="0,32, 16,0 16,32" fill={colors.pink} />
            </Svg>
          )}

          <View style={StyleSheet.window.modeBarStyle}>
            <View style={StyleSheet.window.modeChevronStyle} />
            <HighlightText
              style={[StyleSheet.text, StyleSheet.window.modeTextStyle]}
              highlightStyle={StyleSheet.window.modeHighlightTextStyle}
              highlight={modeTextHighlight}
              text={modeText} />
          </View>
        </View>
      </View>
    )
  }

  renderPartialHeader() {
    return (
      <View style={StyleSheet.window.mainPartialBar}>
        <View style={[StyleSheet.window.accessoryBarStyle, {width:50, height:50}]}>
          {this.renderLeftAction()}
        </View>
        {this.props.title && (
          <View style={StyleSheet.window.crumbBar}>
            <Text style={[StyleSheet.text, StyleSheet.window.crumbTextStyle]}>
              {this.props.title.toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    )
  }

  render() {
    let renderView
    if (this.props.hideSwitcher) {
      renderView = this.renderPartialHeader()
    } else {
      renderView = this.renderFullHeader()
    }

    return (
      <View style={StyleSheet.window.titleBarStyle}>
        {renderView}
      </View>
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onToggleMode: () => dispatch(userActions.toggleMode()),
    onToggleAvailability: () => dispatch(userActions.toggleAvailability()),
  }),
)(Header)
