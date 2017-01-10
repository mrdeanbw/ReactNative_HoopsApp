import React from 'react';
import moment from 'moment';
import {View, ScrollView, Text} from 'react-native';

import StyleSheet from '../styles';
import EventListItem from '../components/event-list-item';
import Button from '../components/button';
import Window from '../components/window';
import Header from '../components/header';
import Popup from '../components/popup';
import _ from '../i18n';

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

  hidePopups = () => {
    this.setState({
      receivedPopupInvite: null,
      sentPopupInvite: null,
    });
  };

  onPressInvite = (invite) => {
    if(moment(invite.event.date).isBefore()){
      return;
    }

    if(this.state.tab === 'received') {
      this.showReceivedPopup(invite);
    } else {
      this.showSentPopup(invite);
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

  showSentPopup = (invite) => {
    this.setState({
      sentPopupInvite: invite,
    });
  };

  renderSentPopup() {
    let invite = this.state.sentPopupInvite;

    return (
      <Popup
        visible={!!invite}
        style={[StyleSheet.popupContainer]}
        onClose={() => this.setState({sentPopupInvite: null})}
      >
        <Button type="alertVerticalDefault" text={_('remove')} onPress={() => this.onPressRemove(invite)} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={() => this.onPressEventDetails(invite.event)} />
        <Button type="alertVertical" text={_('userDetails')} onPress={() => this.onPressUserDetails(invite.event.organizer)} />
      </Popup>
    );
  }

  renderReceivedPopup() {
    let invite = this.state.receivedPopupInvite;
    if(!invite) {
      return;
    }

    let name = invite.event.organizer.name;
    let acceptText = invite.event.entryFee === 0 ? _('accept') : (
      <Text>{_('accept')} £{invite.event.entryFee}(+50p)</Text>
    );

    return (
      <Popup
        visible={!!invite}
        style={[StyleSheet.popupContainer]}
        onClose={() => this.setState({receivedPopupInvite: null})}
      >
        <Button type="alertVerticalGreen" text={acceptText} onPress={() => this.onPressAccept(invite)} />
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
        />

        <View style={StyleSheet.buttons.bar}>
          <Button type="top" text={_('received')} active={this.state.tab === 'received'} onPress={() => this.setState({ tab: 'received' })} />
          <Button type="top" text={_('sent')} active={this.state.tab === 'sent'} onPress={() => this.setState({ tab: 'sent' })} />
        </View>

        {this.renderReceivedPopup()}
        {this.renderSentPopup()}

        <ScrollView contentContainerStyle={StyleSheet.container}>
          {invites.length === 0 && (
            <Text style={StyleSheet.noResults}>{_('noInvitations')}</Text>
          )}
          {invites.map((invite, i) => (
            <EventListItem
              key={i}
              onPress={() => this.onPressInvite(invite)}
              event={invite.event}
              showDisance={this.props.mode === 'PARTICIPATE'}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
