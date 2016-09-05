
import _ from '../i18n';
import React from 'react';
import {View,Text,ScrollView} from 'react-native';

import {Window, Button, Dialog, EventListItem, TextInput} from '../components';
import StyleSheet from '../styles';
import EventData from '../../data/events.json';

import MyEvents from './my-events';
import Members from './members';


export default class Manage extends React.Component {

  static getTest(close) {
    return {
      title: 'Manage',
      view: Window.Organizer,
      viewProps: { initialTab: Manage, onClose: close }
    };
  }

  static getTitle(props) {
    return _('yourActiveEvents');
  }

  static getActionButton(props) {
    return <Button type="actionDefault" icon="actionAdd" text={_('create')} onPress={this.prototype.onPressCreate} />;
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents;
  }

  onPressEvent = (event) => {
    this.props.window.setView(Manage.Dashboard, { event: event });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={StyleSheet.container}>
        {EventData.map(event =>
          <EventListItem key={event.id}
                   onPress={() => this.onPressEvent(event)}
                   image={StyleSheet.images[event.image]}
                   title={event.title}
                   players={event.players} maxPlayers={event.maxPlayers}
                   level={event.level}
                   venue={event.venue}
                   date={event.date} />)}
      </ScrollView>
    );
  }
};


class CancelEvent extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  onPressBack = () => {
    this.props.onClose && this.props.onClose();
  };

  onPressSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <Dialog popup={true} keyboardSpacer>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle]}>{_('cancelEventQuestion').toUpperCase()}</Text>
          <TextInput type="alert"
                 style={StyleSheet.singleMarginTop}
                 ref="input"
                 placeholder={_('cancelEventPrompt')}
                 autoCapitalize="none"
                 autoCorrect={true}
                 returnKeyType="send"
                 selectTextOnFocus={true}
                 enablesReturnKeyAutomatically={true}
                 onSubmitEditing={this.onPressSubmit}/>
        </View>
        <View style={StyleSheet.buttons.bar}>
          <Button type="alert" text={_('back')} onPress={this.onPressBack} />
          <Button type="alertDefault" text={_('submit')} onPress={this.onPressSubmit} />
        </View>
      </Dialog>
    );
  }
};


Manage.Dashboard = class Dashboard extends React.Component {

  static getTabHighlight(props) {
    return Manage;
  }

  static getTitle(props) {
    return "'" + props.event.title + "' " + _('dashboard');
  }

  static getActionButton(props) {
    return <Button type="action" icon="actionRemove" text={_('cancel')} onPress={this.prototype.onPressCancel} />;
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = MyEvents;
  }

  onPressCancel() {
    this.props.window.showModal(<CancelEvent
      onClose={() => this.props.window.hideModal()}
      onSubmit={() => {
        this.props.window.hideModal();
        this.props.window.setView(Manage);
      }}
    />);
  }

  onPressDetails = () => {
    this.props.window.setView(Details, { event: this.props.event });
  }

  onPressMembers = () => {
    this.props.window.setView(Members, { event: this.props.event });
  }

  onPressMessages = () => {
    this.props.window.setView(Messages, { event: this.props.event });
  }

  onPressGallery = () => {
    this.props.window.setView(Gallery, { event: this.props.event });
  }

  onPressFinances = () => {
    this.props.window.setView(Finaces, { event: this.props.event });
  }

  onPressRequests = () => {
    this.props.window.setView(Requests, { event: this.props.event });
  }

  render() {
    return (
      <View style={StyleSheet.flex}>
        <View style={[StyleSheet.buttons.bar, StyleSheet.flex]}>
          <Button type="dashboard"
              text={_('details')}
              style={StyleSheet.buttons.dashboard.gradient[0]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[0]}
              onPress={this.onPressDetails} />

          <Button type="dashboard"
              text={_('members')}
              style={StyleSheet.buttons.dashboard.gradient[1]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[1]}
              onPress={this.onPressMembers}/>
        </View>
        <View style={[StyleSheet.buttons.bar, StyleSheet.flex]}>
          <Button type="dashboard"
              text={_('messages')}
              style={StyleSheet.buttons.dashboard.gradient[2]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[2]}
              onPress={this.onPressMessages}/>
          <Button type="dashboard"
              text={_('gallery')}
              style={StyleSheet.buttons.dashboard.gradient[3]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[3]}
              onPress={this.onPressGallery}/>
        </View>
        <View style={[StyleSheet.buttons.bar, StyleSheet.flex]}>
          <Button type="dashboard"
              text={_('finances')}
              style={StyleSheet.buttons.dashboard.gradient[4]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[4]}
              onPress={this.onPressFinances}/>

          {this.props.event.private && <Button type="dashboard"
              text={_('requests')}
              style={ StyleSheet.buttons.dashboard.gradient[5]}
              underlayColor={StyleSheet.buttons.dashboard.highlightGradient[5]}
              onPress={this.onPressRequests}/> || <View style={StyleSheet.flex}/>}
        </View>
      </View>
    );
  }
};


