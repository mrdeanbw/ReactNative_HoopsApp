import React from 'react'
import {Image, View, Text} from 'react-native'
import Color from 'color'

import {Button, DashboardButton, Header, Popup, TextInput} from '../components'
import {colors} from '../styles/resources'
import StyleSheet from '../styles'
import _ from '../i18n'
import MyEvents from './my-events'

export default class EventDashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showCancelPopup: false,
    }
  }

  componentWillMount() {
    this._actionListener = this.props.actionButton.addListener('press', () => {
      this.onCancel()
    })
  }

  componentWillUnmount() {
    this._actionListener && this._actionListener.remove()
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents
  }

  onCancel() {
    this.setState({showCancelPopup: true})
  }

  onCancelSubmit = (message) => {
    this.props.onCancel(message)
    this.setState({showCancelPopup: false})
  };

  render() {
    const event = this.props.event
    const gradient = Object.keys(colors).filter(v => /^dashboard\d+$/.test(v)).map(v => colors[v])
    const highlightGradient = gradient.map(c => Color(c).lighten(0.25).hexString())
    const styles = StyleSheet.eventDashboard

    return (
      <View style={{flex: 1}}>
        <Header title={_('theDashboard')} onBack={this.props.onBack} />
        <CancelEventPopup
          visible={this.state.showCancelPopup}
          onClose={() => this.setState({showCancelPopup: false})}
          onSubmit={this.onCancelSubmit}
        />

        <View style={styles.titleStyle}>
          {event.image ? (
            <Image source={{uri: event.image}} style={[styles.coverImageStyle, {resizeMode: 'cover'}]} />
          ) : (
            <View style={styles.coverImageStyle} />
          )}
          <View style={styles.coverImageOverlayStyle} />
          <Text style={[StyleSheet.text, styles.titleTextStyle]}>
            {event.title}
          </Text>
          <Text style={[StyleSheet.text, styles.subtitleTextStyle]}>
            {event.address}
          </Text>
        </View>

        <View style={[StyleSheet.flex]}>
          <DashboardButton
            type="dashboard"
            text={_('details')}
            icon="dashboard-details"
            backgroundColor={gradient[0]}
            underlayColor={highlightGradient[0]}
            onPress={this.props.onPressDetails}/>
          <DashboardButton
            type="dashboard"
            text={_('members')}
            icon="dashboard-members"
            backgroundColor={gradient[1]}
            underlayColor={highlightGradient[1]}
            onPress={this.props.onPressMembers}/>
          <DashboardButton
            type="dashboard"
            text={_('messages')}
            icon="dashboard-messages"
            backgroundColor={gradient[2]}
            underlayColor={highlightGradient[2]}
            onPress={this.props.onPressMessages}/>
          <DashboardButton
            type="dashboard"
            text={_('gallery')}
            icon="dashboard-gallery"
            backgroundColor={gradient[3]}
            underlayColor={highlightGradient[3]}
            onPress={this.props.onPressGallery}/>
          <DashboardButton
            type="dashboard"
            text={_('finances')}
            icon="dashboard-finances"
            backgroundColor={gradient[4]}
            underlayColor={highlightGradient[4]}
            onPress={this.props.onPressFinances} />
          {event.privacy === 'private' && (
            <DashboardButton
              type="dashboard"
              text={_('requests')}
              icon="dashboard-requests"
              backgroundColor={gradient[5]}
              underlayColor={highlightGradient[5]}
              onPress={this.props.onPressRequests} />
          )}
        </View>
      </View>
    )
  }
}

EventDashboard.propTypes = {
  event: React.PropTypes.object.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onPressDetails: React.PropTypes.func.isRequired,
  onPressMembers: React.PropTypes.func.isRequired,
  onPressMessages: React.PropTypes.func.isRequired,
  onPressGallery: React.PropTypes.func.isRequired,
  onPressFinances: React.PropTypes.func.isRequired,
  onPressRequests: React.PropTypes.func.isRequired,
}


class CancelEventPopup extends React.Component {

  constructor() {
    super()
    this.state = {
      message: '',
    }
  }

  onBack = () => {
    //Reset the text input value
    this.setState({message: ''})

    this.props.onClose && this.props.onClose()
  }

  onSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.message)
  }

  render() {
    return (
      <Popup visible={this.props.visible} onClose={this.onBack}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle]}>
            {_('cancelEventQuestion').toUpperCase()}
          </Text>
          <TextInput
            type="alert"
            style={StyleSheet.singleMarginTop}
            ref="input"
            placeholder={_('cancelEventPrompt')}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={true}
            returnKeyType="send"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            value={this.state.message}
            onChangeText={(message) => this.setState({message})}
            onSubmitEditing={this.onSubmit}
          />
        </View>
        <View style={StyleSheet.buttons.bar}>
          <Button type="alert" text={_('back')} onPress={this.onBack} />
          <Button type="alertDefault" text={_('submit')} onPress={this.onSubmit} />
        </View>
      </Popup>
    )
  }
}

CancelEventPopup.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}

EventDashboard.CancelEventPopup = CancelEventPopup
