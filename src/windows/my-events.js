import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import {Button, Popup, EventListItem, Header} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class MyEvents extends React.Component {

  constructor() {
    super();
    this.state = {
      tab: 'upcoming',
      disclosureEvent: null,
    };
  }

  onChangeSwitch(switchValue) {
    this.props.onChangeAvailability(switchValue);
  }

  onPressEvent(event) {
    this.props.onPressEvent(event);
  }

  onPressDisclosure(event) {
    this.setState({disclosureEvent: event});
  }

  onPressDropOut() {
    this.props.onPressDropOut(this.state.disclosureEvent);
    this.setState({disclosureEvent: null});
  }

  onPressEventDetails() {
    this.props.onPressEvent(this.state.disclosureEvent);
    this.setState({disclosureEvent: null});
  }

  onPressOrganizerDetails() {
    this.props.onPressOrganizerDetails(this.state.disclosureEvent.organizer);
    this.setState({disclosureEvent: null});
  }

  onPressRemove() {
    this.props.onPressUnsave(this.state.disclosureEvent);
    this.setState({disclosureEvent: null});
  }

  onPressParticipateAgain() {
    //TODO
    this.setState({disclosureEvent: null});
  }

  render() {
    let events = {
      upcoming: this.props.upcoming,
      saved: this.props.saved,
      history: this.props.history,
    }[this.state.tab];

    return (
      <View>
        <Header
          title={undefined}
        />
        <DisclosurePopup
          type={this.state.tab}
          visible={!!this.state.disclosureEvent}
          onClose={() => this.setState({disclosureEvent: null})}

          onPressDropOut={this.onPressDropOut.bind(this)}
          onPressEventDetails={this.onPressEventDetails.bind(this)}
          onPressOrganizerDetails={this.onPressOrganizerDetails.bind(this)}
          onPressRemove={this.onPressRemove.bind(this)}
          onPressParticipateAgain={this.onPressParticipateAgain.bind(this)}
        />

        <View style={StyleSheet.buttons.bar}>
          <Button type="top" text={_('upcoming')} active={this.state.tab === 'upcoming'} onPress={() => this.setState({ tab: 'upcoming' })} />
          <Button type="top" text={_('saved')} active={this.state.tab === 'saved'} onPress={() => this.setState({ tab: 'saved' })} />
          <Button type="top" text={_('history')} active={this.state.tab === 'history'} onPress={() => this.setState({ tab: 'history' })} />
        </View>

        <ScrollView contentContainerStyle={StyleSheet.container}>
          {events.length === 0 && this.state.tab === 'upcoming' && (
            <Text style={StyleSheet.noResults}>{_('noUpcomingEvents')}</Text>
          )}
          {events.length === 0 && this.state.tab === 'saved' && (
            <Text style={StyleSheet.noResults}>{_('noSavedEvents')}</Text>
          )}
          {events.length === 0 && this.state.tab === 'history' && (
            <Text style={StyleSheet.noResults}>{_('noHistoricEvents')}</Text>
          )}
          {events.map(event =>
            <EventListItem
              key={event.id}
              event={event}
              ignoreDisabled={this.state.tab === 'history'}
              onPress={() => this.onPressEvent(event)}
              showDistance={true}
              disclosure={StyleSheet.icons.menu}
              onPressDisclosure={() => this.onPressDisclosure(event)}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

class DisclosurePopup extends React.Component {

  _renderUpcomingOptions() {
    return (
      <View>
        <Button type="alertVertical" text={_('dropOut')} onPress={this.props.onPressDropOut} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={this.props.onPressEventDetails} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={this.props.onPressOrganizerDetails} />
      </View>
    );
  }

  _renderSavedOptions() {
    return (
      <View>
        <Button type="alertVertical" text={_('eventDetails')} onPress={this.props.onPressEventDetails} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={this.props.onPressOrganizerDetails} />
        <Button type="alertVerticalDefault" text={_('remove')} onPress={this.props.onPressRemove} />
      </View>
    );
  }

  _renderHistoryOptions() {
    return (
      <View>
        <Button type="alertVertical" text={_('eventDetails')} onPress={this.props.onPressEventDetails} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={this.props.onPressOrganizerDetails} />
      </View>
    );
  }

  render() {
    let buttons;
    if(this.props.type === 'upcoming'){
      buttons = this._renderUpcomingOptions();
    }else if(this.props.type === 'saved') {
      buttons = this._renderSavedOptions();
    }else{
      buttons = this._renderHistoryOptions();
    }

    return (
      <Popup
        visible={this.props.visible}
        onClose={this.props.onClose}
        style={StyleSheet.dialog.optionsMenu}
      >
        {buttons}
      </Popup>
    );
  }
}
