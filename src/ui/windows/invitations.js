
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

export default class Invitations extends React.Component {

    static getTest(close) {
        return {
            title: 'Invitations',
            view: Window.Participant,
            viewProps: { initialTab: Invitations, onClose: close }
        };
    }

    static getTitle(props) {
        return _('invitations');
    }

    static getActionButton(props) {
        return <Button type="action" icon="actionSearch" text={_('search')} onPress={this.prototype.onPressSearch} />;
    }

    onChangeMode(nextMode, nextProps) {
        if(nextMode === 'organizer') nextProps.initialTab = Calendar;
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
        this.props.window.showModal(<Dialog popup={true} style={[StyleSheet.popupContainer]}>
            <TouchableHighlight style={StyleSheet.popupButtonContainer}
                                onPress={() => this.onPressAccept(invitation) }
                                activeOpacity={HighlightOpacity}
                                underlayColor={TabButtonHighlight}>
                <View style={[StyleSheet.popupButton]}>
                    <Text style={[StyleSheet.text, StyleSheet.popupButtonText, StyleSheet.greenText]}>{_('accept').toUpperCase()}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={StyleSheet.popupButtonContainer}
                                onPress={() => this.onPressDecline(invitation) }
                                activeOpacity={HighlightOpacity}
                                underlayColor={TabButtonHighlight}>
                <View style={[StyleSheet.popupButton]}>
                    <Text style={[StyleSheet.text, StyleSheet.popupButtonText, StyleSheet.redText]}>{_('decline').toUpperCase()}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={StyleSheet.popupButtonContainer}
                                onPress={() => this.onPressEventDetails(invitation.event) }
                                activeOpacity={HighlightOpacity}
                                underlayColor={TabButtonHighlight}>
                <View style={[StyleSheet.popupButton]}>
                    <Text style={[StyleSheet.text, StyleSheet.popupButtonText]}>{_('eventDetails').toUpperCase()}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={StyleSheet.popupButtonContainer}
                                onPress={() => this.onPressUserDetails(invitation.sender) }
                                activeOpacity={HighlightOpacity}
                                underlayColor={TabButtonHighlight}>
                <View style={[StyleSheet.popupButton]}>
                    <Text style={[StyleSheet.text, StyleSheet.popupButtonText]}>{_('userDetails').toUpperCase()}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={StyleSheet.popupButtonContainer}
                                onPress={() => this.onPressBlock(invitation.sender) }
                                activeOpacity={HighlightOpacity}
                                underlayColor={TabButtonHighlight}>
                <View style={[StyleSheet.popupButton]}>
                    <Text style={[StyleSheet.text, StyleSheet.popupButtonText]}>{_('block').toUpperCase()} "{invitation.sender.name}"</Text>
                </View>
            </TouchableHighlight>
        </Dialog>);
    };

    showSentPopup = (invitation) => {
        this.props.window.showModal(<Dialog popup={true} style={[StyleSheet.popupContainer]}>
            <TouchableHighlight style={StyleSheet.popupButtonContainer}
                                onPress={() => this.onPressRemove(invitation) }
                                activeOpacity={HighlightOpacity}
                                underlayColor={TabButtonHighlight}>
                <View style={[StyleSheet.popupButton]}>
                    <Text style={[StyleSheet.text, StyleSheet.popupButtonText, StyleSheet.redText]}>{_('remove').toUpperCase()}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={StyleSheet.popupButtonContainer}
                                onPress={() => this.onPressEventDetails(invitation.event) }
                                activeOpacity={HighlightOpacity}
                                underlayColor={TabButtonHighlight}>
                <View style={[StyleSheet.popupButton]}>
                    <Text style={[StyleSheet.text, StyleSheet.popupButtonText]}>{_('eventDetails').toUpperCase()}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={StyleSheet.popupButtonContainer}
                                onPress={() => this.onPressUserDetails(invitation.recipient) }
                                activeOpacity={HighlightOpacity}
                                underlayColor={TabButtonHighlight}>
                <View style={[StyleSheet.popupButton]}>
                    <Text style={[StyleSheet.text, StyleSheet.popupButtonText]}>{_('userDetails').toUpperCase()}</Text>
                </View>
            </TouchableHighlight>
        </Dialog>);
    };

    render() {
        return (
            <View>
                <View style={StyleSheet.tabBar}>
                    <TouchableHighlight style={StyleSheet.tabButtonContainer}
                                        onPress={() => this.setState({ tab: 'received' }) }
                                        activeOpacity={HighlightOpacity}
                                        underlayColor={TabButtonHighlight}>
                        <View style={[StyleSheet.tabButton, this.state.tab === 'received' ? StyleSheet.activeTabButton : null]}>
                            <Text style={[StyleSheet.text, StyleSheet.tabButtonText, this.state.tab === 'received' ? StyleSheet.activeTabButtonText : null]}>{_('received').toUpperCase()}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={StyleSheet.tabButtonContainer}
                                        onPress={() => this.setState({ tab: 'sent' }) }
                                        activeOpacity={HighlightOpacity}
                                        underlayColor={TabButtonHighlight}>
                        <View style={[StyleSheet.tabButton, this.state.tab === 'sent' ? StyleSheet.activeTabButton : null]}>
                            <Text style={[StyleSheet.text, StyleSheet.tabButtonText, this.state.tab === 'sent' ? StyleSheet.activeTabButtonText : null]}>{_('sent').toUpperCase()}</Text>
                        </View>
                    </TouchableHighlight>
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