
import _ from '../i18n';
import React from 'react';
import {View,Text,ScrollView} from 'react-native';

import {Window, Button, Dialog, EventListItem, SwitchButton} from '../components';
import StyleSheet from '../styles';
import EventData from '../../data/events.json';

import Manage from './manage';
import EventDetails from './event-details';
import Search from './search';


export default class MyEvents extends React.Component {

  static getTest(close) {
    return {
      title: 'My Events',
      view: Window.Participant,
      viewProps: { initialTab: MyEvents, onClose: close }
    };
  }

  static getTitle(props) {}

  static getActionButton(props) {
    return <Button type="actionDefault" icon="actionSearch" text={_('search')} onPress={this.prototype.onPressSearch} />;
  }

  constructor() {
    super();
    this.state = {
      tab: 'upcoming'
    };
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
    this.onChangeSwitch(true);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tab) this.setState({ tab: nextProps.tab });
  }

  onChangeSwitch = (switchValue) => {
    this.setState({switchValue});

    this.props.window.setAccessoryViews(
      <SwitchButton value={switchValue}
              onChange={this.onChangeSwitch}
      />
    );
  };

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = Manage;
  }

  onPressEvent = (event) => {
    switch(this.state.tab) {
      case 'upcoming': return this.onPressUpcomingEvent(event);
      case 'saved': return this.onPressSavedEvent(event);
      case 'history': return this.onPressHistoryEvent(event);
    }
  };

  onPressUpcomingEvent = (event) => {
    close = (fn) => () => {
      this.props.window.hideModal();
      if(fn) fn(event);
    };
    this.props.window.showModal(
      <Dialog popup={true} style={StyleSheet.dialog.optionsMenu} onClose={close()}>
        <Button type="alertVertical" text={_('dropOut')} onPress={close(this.onPressDropOut)} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={close(this.onPressEventDetails)} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={close(this.onPressOrganizerDetails)} />
      </Dialog>
    );
  };

  onPressSavedEvent = (event) => {
    close = (fn) => () => {
      this.props.window.hideModal();
      if(fn) fn(event);
    };
    this.props.window.showModal(
      <Dialog popup={true} style={StyleSheet.dialog.optionsMenu} onClose={close()}>
        <Button type="alertVertical" text={_('join')} onPress={close(this.onPressJoin)} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={close(this.onPressEventDetails)} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={close(this.onPressOrganizerDetails)} />
        <Button type="alertVerticalDefault" text={_('remove')} onPress={close(this.onPressRemove)} />
      </Dialog>
    );
  };

  onPressHistoryEvent = (event) => {
    close = (fn) => () => {
      this.props.window.hideModal();
      if(fn) fn(event);
    };
    this.props.window.showModal(
      <Dialog popup={true} style={StyleSheet.dialog.optionsMenu} onClose={close()}>
        <Button type="alertVertical" text={_('participateAgain')} onPress={close(this.onPressParticipateAgain)} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={close(this.onPressEventDetails)} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={close(this.onPressOrganizerDetails)} />
      </Dialog>
    );
  };

  onPressDropOut = (event) => {

  };

  onPressEventDetails = (event) => {
    this.props.window.setView(EventDetails, { event: event, onClose: () => {
      this.props.window.setView(MyEvents, { tab: this.state.tab });
    }});
  };

  onPressOrganizerDetails = (event) => {

  };

  onPressJoin = (event) => {
    EventDetails.joinEvent(this.props.window, event, () => {
      this.props.window.setView(MyEvents, { tab: this.state.tab });
    });
  };

  onPressParticipateAgain = (event) => {

  };

  onPressRemove = (event) => {

  };

  onPressSearch() {
    this.props.window.showModal(<Search onClose={() => this.props.window.hideModal()} />, 'slide', false);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={StyleSheet.buttons.bar}>
          <Button type="top" text={_('upcoming')} active={this.state.tab === 'upcoming'} onPress={() => this.setState({ tab: 'upcoming' })} />
          <Button type="top" text={_('saved')} active={this.state.tab === 'saved'} onPress={() => this.setState({ tab: 'saved' })} />
          <Button type="top" text={_('history')} active={this.state.tab === 'history'} onPress={() => this.setState({ tab: 'history' })} />
        </View>

        <ScrollView contentContainerStyle={StyleSheet.container}>
          {EventData.map(event =>
            <EventListItem key={event.id}
                     onPress={() => this.onPressEvent(event)}
                     image={StyleSheet.images[event.image]}
                     title={event.title}
                     players={event.players} maxPlayers={event.maxPlayers}
                     level={event.level}
                     venue={event.venue}
                     distance={event.distance}
                     date={event.date} />)}
        </ScrollView>
      </View>
    );
  }
};
