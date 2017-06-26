import React, {Component} from 'react'
import {View, Image, Text, StatusBar, BackAndroid} from 'react-native'
import {connect} from 'react-redux'

import {appActions, navigationActions} from '../actions'
import _ from '../i18n'
import StyleSheet from '../styles'
import {Button, HighlightText} from './'

class Header extends Component {

  componentDidMount() {
    if (this.props.onBack && !this.props.hideBackButton) {
      BackAndroid.addEventListener('hardwareBackPress', this.props.onBack)
    }
  }

  componentWillUnmount() {
    if (this.props.onBack && !this.props.hideBackButton) {
      BackAndroid.removeEventListener('hardwareBackPress', this.props.onBack)
    }
  }

  getMode() {
    if (this.props.mode === 'ORGANIZE' && !this.props.simple) {
      StatusBar.setBarStyle('dark-content', true)

      return {
        'modeText': _('organizerMode'),
        'modeTextHighlight': _('participant'),
        'titleBarStyle' : StyleSheet.window.titleBarStyleOrganiser,
        'crumbBar' : StyleSheet.window.crumbBarOrganiser,
        'logo' : StyleSheet.images.logo_black
      }
    } else {
      StatusBar.setBarStyle('light-content', true)

      return {
        'modeText': _('participantMode'),
        'modeTextHighlight': _('organizer'),
        'titleBarStyle' : StyleSheet.window.titleBarStyleParticipant,
        'crumbBar' : StyleSheet.window.crumbBarParticipant,
        'logo' : StyleSheet.images.logo
      }
    }
  }

  render() {
    const {modeText, modeTextHighlight, titleBarStyle, crumbBar, logo} = this.getMode()

    return (
      <View style={titleBarStyle}>
        {!this.props.simple && (
          <View style={StyleSheet.window.logoBarStyle}>
            <Image source={logo} style={StyleSheet.window.logoStyle} />
            <Button
              onPress={this.props.onToggleMode}
              type={(this.props.mode === 'ORGANIZE') ? "modeSwitchOrganiser" : "modeSwitchParticipant"}
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
          <View style={crumbBar}>
            {this.props.simple && !this.props.hideBackButton && (
              <View style={[StyleSheet.window.accessoryBarStyle, {width: 32}]}>
                <Button type="title" icon="back" onPress={this.props.onBack} />
              </View>
            )}
            <Text style={[StyleSheet.text, StyleSheet.window.crumbTextStyle]}>
              {this.props.title.toUpperCase()}
            </Text>
            {/*Spacer to match the back button*/}
            {this.props.simple && (
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
  'hideBackButton': React.PropTypes.bool,
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
