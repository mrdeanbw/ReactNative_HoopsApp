import React, {Component} from 'react'
import {View, Image, Text} from 'react-native'
import {connect} from 'react-redux'

import {appActions, navigationActions} from '../actions'
import _ from '../i18n'
import StyleSheet from '../styles'
import {Button, HighlightText} from './'

class Header extends Component {

  getMode() {
    if (this.props.mode === 'ORGANIZE') {
      return {
        'modeText': _('organizerMode'),
        'modeTextHighlight': _('participant'),
      }
    } else {
      return {
        'modeText': _('participantMode'),
        'modeTextHighlight': _('organizer'),
      }
    }
  }

  render() {
    const {modeText, modeTextHighlight} = this.getMode()
    return (
      <View style={StyleSheet.window.titleBarStyle}>

        {!this.props.simple && (
          <View style={StyleSheet.window.logoBarStyle}>
            <Image source={StyleSheet.images.logo} style={StyleSheet.window.logoStyle} />
            <Button
              onPress={this.props.onToggleMode}
              type="modeSwitch"
              text={
                <HighlightText
                  style={[StyleSheet.text, StyleSheet.window.modeTextStyle]}
                  highlightStyle={[StyleSheet.text, StyleSheet.window.modeTextStyle, StyleSheet.window.modeHighlightTextStyle]}
                  highlight={modeTextHighlight}
                  text={modeText} />}
            />
          </View>
        )}

        {this.props.title && (
          <View style={[StyleSheet.window.crumbBar]}>

            {this.props.simple && (
              <View style={[StyleSheet.window.accessoryBarStyle, {width: 32}]}>
                <Button type="title" icon="back" onPress={this.props.onBack} />
              </View>
            )}

            <Text style={[StyleSheet.text, StyleSheet.window.crumbTextStyle]}>
              {this.props.title.toUpperCase()}
            </Text>

            {/*Spacer to match the back button*/}
            {this.props.simple &&  (
              <View style={[StyleSheet.window.accessoryBarStyle, {width: 32}]} />
            )}
          </View>
        )}
      </View>
    )
  }
}

Header.propTypes = {
  'title': React.PropTypes.string,
  'simple': React.PropTypes.bool,
}

export default connect(
  (state) => ({
    mode: state.app.mode,
  }),
  (dispatch) => ({
    onToggleMode: () => dispatch(appActions.toggleMode()),
    onBack: () => dispatch(navigationActions.pop()),
  }),
)(Header)
