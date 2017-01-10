import React from 'react';
import {View, Text} from 'react-native';

import {Button, Header, Popup, TextInput} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';
import MyEvents from './my-events';

export default class EventDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCancelPopup: false,
    };
  }

  componentWillMount() {
    this._actionListener = this.props.actionButton.addListener('press', () => {
      this.onCancel();
    });
  }

  componentWillUnmount() {
    this._actionListener && this._actionListener.remove();
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents;
  }

  onCancel() {
    this.setState({showCancelPopup: true});
  }

  onCancelSubmit = (message) => {
    this.props.onCancel(message);
    this.setState({showCancelPopup: false});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={`'${this.props.event.title}' ${_('dashboard')}`}
          onBack={this.props.onBack}
        />
        <CancelEventPopup
          visible={this.state.showCancelPopup}
          onClose={() => this.setState({showCancelPopup: false})}
          onSubmit={this.onCancelSubmit}
        />
        <View style={[StyleSheet.buttons.bar, StyleSheet.flex]}>
          <Button type="dashboard"
              text={_('details')}
              icon="dashboard-details"
              style={StyleSheet.buttons.dashboard.gradient[0]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[0]}
              onPress={this.props.onPressDetails}/>

          <Button type="dashboard"
              text={_('members')}
              icon="dashboard-members"
              style={StyleSheet.buttons.dashboard.gradient[1]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[1]}
              onPress={this.props.onPressMembers}/>
        </View>
        <View style={[StyleSheet.buttons.bar, StyleSheet.flex]}>
          <Button type="dashboard"
              text={_('messages')}
              icon="dashboard-messages"
              style={StyleSheet.buttons.dashboard.gradient[2]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[2]}
              onPress={this.props.onPressMessages}/>
          <Button type="dashboard"
              text={_('gallery')}
              icon="dashboard-gallery"
              style={StyleSheet.buttons.dashboard.gradient[3]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[3]}
              onPress={this.props.onPressGallery}/>
        </View>
        <View style={[StyleSheet.buttons.bar, StyleSheet.flex]}>
          <Button type="dashboard"
              text={_('finances')}
              icon="dashboard-finances"
              style={StyleSheet.buttons.dashboard.gradient[4]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[4]}
              onPress={this.props.onPressFinances}/>

          {this.props.event.privacy === 'private' && <Button type="dashboard"
              text={_('requests')}
              icon="dashboard-requests"
              style={ StyleSheet.buttons.dashboard.gradient[5]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[5]}
              onPress={this.props.onPressRequests}/> || <View style={StyleSheet.flex}/>}
        </View>
      </View>
    );
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
};


class CancelEventPopup extends React.Component {

  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  onBack = () => {
    //Reset the text input value
    this.setState({message: ''});

    this.props.onClose && this.props.onClose();
  }

  onSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.message);
  }

  render() {
    return (
      <Popup visible={this.props.visible} keyboardSpacer onClose={this.onBack}>
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
    );
  }
}

CancelEventPopup.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

EventDashboard.CancelEventPopup = CancelEventPopup;
