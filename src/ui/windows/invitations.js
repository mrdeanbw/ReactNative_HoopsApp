
import _ from '../i18n';

import React from 'react';

import {View, ScrollView, Text, Image, TouchableHighlight, Modal} from 'react-native';

import StyleSheet from '../styles';

import EventListItem from '../components/event-list-item';
import Dialog from '../components/dialog';
import Profile from './profile';
import Button from '../components/button';
import Window from '../components/window';
import Calendar from './calendar';

const MenuIcon = StyleSheet.icons.menu;
const {
  basketball: BasketballImage,
  basketballNet: BasketballNetImage,
  football: FootballImage,
  footballNet: FootballNetImage,
} = StyleSheet.images;

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
      receivedPopupVisible: false,
      sentPopupVisible: false
    };
  }


  onPressCreate = () => {

  };

  onPressSearch = () => {

  };

  onPressEvent = () => {
    if(this.state.tab === 'received') {
      this.showReceivedPopup({ event: {}, sender: { name: 'sender' }, recipient: { name: 'recipient' } });
    } else {
      this.showSentPopup({ event: {}, sender: { name: 'sender' }, recipient: {  name: 'recipient' } });
    }
  };

  onPressAccept = (invitation) => {
    this.props.window.hideModal();
  };

  onPressDecline = (invitation) => {
    this.props.window.hideModal();
  };

  onPressEventDetails = (event) => {
    this.props.window.hideModal();
  };

  onPressUserDetails = (user) => {
    this.props.window.showModal(
      <Modal animationType="fade"
           onRequestClose={() => this.props.window.hideModal()}>
        <Dialog title="Profile">
          <Profile user={user} />
        </Dialog>
      </Modal>
    );
  };

  onPressBlock = (user) => {
    this.props.window.hideModal();
  };

  onPressRemove = (invitation) => {
    this.props.window.hideModal();
  };

  showReceivedPopup = (invitation) => {
    let name = invitation.sender.name;

    this.props.window.showModal(<Dialog
      popup={true}
      style={[StyleSheet.popupContainer]}
      onClose={() => this.props.window.hideModal()}
    >
      <Button type="alertVerticalGreen" text={_('accept')} onPress={() => this.onPressAccept(invitation)} />
      <Button type="alertVerticalDefault" text={_('decline')} onPress={() => this.onPressDecline(invitation)} />
      <Button type="alertVertical" text={_('eventDetails')} onPress={() => this.onPressEventDetails(invitation.event)} />
      <Button type="alertVertical" text={_('userDetails')} onPress={() => this.onPressUserDetails(invitation.sender)} />
      <Button type="alertVertical" text={_('block') + ' "' + name + '"'} onPress={() => this.onPressBlock(invitation.sender)} />
    </Dialog>);
  };

  showSentPopup = (invitation) => {
    this.props.window.showModal(<Dialog
      popup={true}
      style={[StyleSheet.popupContainer]}
      onClose={() => this.props.window.hideModal()}
    >
      <Button type="alertVerticalDefault" text={_('remove') + ' "' + name + '"'} onPress={() => this.onPressRemove(invitation)} />
      <Button type="alertVertical" text={_('eventDetails') + ' "' + name + '"'} onPress={() => this.onPressEventDetails(invitation.event)} />
      <Button type="alertVertical" text={_('userDetails') + ' "' + name + '"'} onPress={() => this.onPressEventDetails(invitation.recipient)} />
    </Dialog>);
  };

  render() {
    return (
      <View>
        <View style={StyleSheet.buttons.bar}>
          <Button type="top" text={_('received')} active={this.state.tab === 'received'} onPress={() => this.setState({ tab: 'received' })} />
          <Button type="top" text={_('sent')} active={this.state.tab === 'sent'} onPress={() => this.setState({ tab: 'sent' })} />
        </View>

        <ScrollView contentContainerStyle={StyleSheet.container}>
          <EventListItem onPress={() => this.onPressEvent(0)}
                   image={BasketballImage}
                   title="Basketball scrimmage"
                   players={12} maxPlayers={15}
                   level="Casual"
                   venue="Sudgen Sports Centre"
                   date="Today, 18:30"
                   distance={this.props.mode === 'participant' ? "0.8 mi" : null}
                   disclosure={MenuIcon}/>

          <EventListItem onPress={() => this.onPressEvent(1)}
                   image={FootballNetImage}
                   title="Football 5-a-side"
                   players={12} maxPlayers={15}
                   level="Open"
                   venue="Sudgen Sports Centre"
                   date="Tomorrow, 18:30"
                   distance={this.props.mode === 'participant' ? "2.6 mi" : null}
                   free={true}
                   disclosure={MenuIcon}/>

          <EventListItem onPress={() => this.onPressEvent(2)}
                   image={BasketballNetImage}
                   title="Basketball 3x3 tournament"
                   players={12} maxPlayers={15}
                   level="Casual"
                   venue="Sudgen Sports Centre"
                   date="12 Jul 16, 18:30"
                   distance={this.props.mode === 'participant' ? "3.1 mi" : null}
                   disclosure={MenuIcon}/>

          <EventListItem onPress={() => this.onPressEvent(3)}
                   image={FootballImage}
                   title="Football 5-a-side"
                   players={12} maxPlayers={15}
                   level="Competitive"
                   venue="Sudgen Sports Centre"
                   date="Today, 18:30"
                   distance={this.props.mode === 'participant' ? "2.6 mi" : null}
                   free={true}
                   disclosure={MenuIcon}/>
        </ScrollView>
      </View>
    );
  }
};
