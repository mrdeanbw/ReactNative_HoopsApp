
import _ from '../i18n';

import React from 'react';

import {View, ScrollView} from 'react-native';

import StyleSheet from '../styles';

import EventListItem from '../components/event-list-item';
import Button from '../components/button';
import Window from '../components/window';
import Header from '../components/header';
import Popup from '../components/popup';

export default class Invitations extends React.Component {

  static getTest(close) {
    return {
      title: 'Invitations',
      view: Window.Participant,
      viewProps: { initialTab: Invitations, onClose: close }
    };
  }

  constructor() {
    super();
    this.state = {
      tab: 'received',

      //set these keys to invite objects to show their popup options
      receivedPopupInvite: null,
      sentPopupInvite: null,
    };
  }


  onPressCreate = () => {

  };

  onPressSearch = () => {

  };

  hidePopups = () => {
    this.setState({
      receivedPopupInvite: null,
      sentPopupInvite: null,
    });
  };

  onPressInvite = (invite) => {
    if(this.state.tab === 'received') {
      this.showReceivedPopup(invite);
      //{ event: {}, sender: { name: 'sender' }, recipient: { name: 'recipient' } });
    } else {
      this.showSentPopup(invite);
      //{ event: {}, sender: { name: 'sender' }, recipient: {  name: 'recipient' } });
    }
  };

  onPressAccept = (invite) => {
    this.hidePopups();
    this.props.onPressAccept(invite);
  };

  onPressDecline = (invite) => {
    this.hidePopups();
    this.props.onPressDecline(invite);
  };

  onPressEventDetails = (event) => {
    this.hidePopups();
    this.props.onPressEventDetails(event);
  };

  onPressUserDetails = (user) => {
    this.hidePopups();
    this.props.onPressUser(user);
  };

  onPressBlock = (user) => {
    this.hidePopups();
    this.onPressBlock(user);
  };

  onPressRemove = (invite) => {
    this.hidePopups();
    this.props.onPressRemove(invite);
  };

  showReceivedPopup = (invite) => {
    this.setState({
      receivedPopupInvite: invite,
    });
  };

  renderSentPopup() {
    let invite = this.state.sentPopupInvite;
    let eventTitle = invite ? invite.event.title : '';
    let userName = invite ? invite.user.name : '';

    return (
      <Popup
        visible={!!invite}
        style={[StyleSheet.popupContainer]}
        onClose={() => this.props.window.hideModal()}
      >
        <Button type="alertVerticalDefault" text={_('remove') + ' "' + userName + '"'} onPress={() => this.onPressRemove(invite)} />
        <Button type="alertVertical" text={_('eventDetails') + ' "' + eventTitle + '"'} onPress={() => this.onPressEventDetails(invite.event)} />
        <Button type="alertVertical" text={_('userDetails') + ' "' + userName + '"'} onPress={() => this.onPressUserDetails(invite.user)} />
      </Popup>
    );
  }

  renderReceivedPopup() {
    let invite = this.state.receivedPopupInvite;
    let name = invite ? invite.event.organizer.name : '';
    return (
      <Popup
        visible={!!invite}
        style={[StyleSheet.popupContainer]}
        onClose={() => this.setState({receivedPopupInvite: null})}
      >
        <Button type="alertVerticalGreen" text={_('accept')} onPress={() => this.onPressAccept(invite)} />
        <Button type="alertVerticalDefault" text={_('decline')} onPress={() => this.onPressDecline(invite)} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={() => this.onPressEventDetails(invite.event)} />
        <Button type="alertVertical" text={_('userDetails')} onPress={() => this.onPressUserDetails(invite.event.organizer)} />
        <Button type="alertVertical" text={_('block') + ' "' + name + '"'} onPress={() => this.onPressBlock(invite.sender)} />
      </Popup>
    );
  }

  render() {
    let invites = this.state.tab === 'received' ? this.props.received : this.props.sent;
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('invitations')}
          mode={this.props.mode}
          onToggleMode={this.props.onToggleMode}
        />

        <View style={StyleSheet.buttons.bar}>
          <Button type="top" text={_('received')} active={this.state.tab === 'received'} onPress={() => this.setState({ tab: 'received' })} />
          <Button type="top" text={_('sent')} active={this.state.tab === 'sent'} onPress={() => this.setState({ tab: 'sent' })} />
        </View>

        {this.renderReceivedPopup()}
        {this.renderSentPopup()}

        <ScrollView contentContainerStyle={StyleSheet.container}>
          {invites.map((invite, i) => (
            <EventListItem
              key={i}
              onPress={() => this.onPressInvite(invite)}
              image={{uri: invite.event.imageSrc}}
              title={invite.event.title}
              players={invite.event.players}
              maxPlayers={invite.event.maxPlayers}
              level={invite.event.level}
              venue={invite.event.venue}
              date={invite.event.date}
              free={true}
              distance={this.props.mode === 'PARTICIPATE' ? "0.8 mi" : null}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
