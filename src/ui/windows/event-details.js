
import _ from '../i18n';
import React from 'react';
import {ScrollView,View,Text, Image} from 'react-native';

import StyleSheet from '../styles';
import {Icon, HorizontalRule, Button, MapView, Window, Dialog} from '../components';

import EventData from '../../data/events.json';
import UserData from '../../data/users.json';

import Members from './members';


const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const zeroPad = (s, n) => {
  s = s.toString();
  while(s.length < n) s = '0' + s;
  return s;
};

export default class EventDetails extends React.Component {

  static getTest(close) {
    return {
      title: 'Event Details',
      view: Window.Organizer,
      viewProps: { initialTab: EventDetails, initialTabProps: { event: EventData[0] }, onClose: close }
    };
  }

  static getTitle(props) {
    return _('eventDetails');
  }

  static emulatesDialog = true;

  static getActionButton(props) {
    return <Button type="actionDefault" icon={
      <Text style={[StyleSheet.text, StyleSheet.eventDetails.actionButtonTextStyle]}>
        {'£'}{props.event.entryFee}
      </Text>
    } text={_('join')} onPress={this.prototype.onPressJoin} />;
  }

  onPressJoin() {
    EventDetails.joinEvent(this.props.window, this.props.event, this.props.onClose);
  };

  onPressSave = () => {
    if(this.props.onClose) this.props.onClose();
  };

  onPressInvite = () => {
    this.props.window.showModal(<EventInvite
      onClose={() => {
        this.props.window.hideModal();
      }}
      onPressFacebook={() => {
        this.props.window.hideModal();
      }}
      onPressTwitter={() => {
        this.props.window.hideModal();
      }}
      onPressEmail={() => {
        this.props.window.hideModal();
      }}
    />);
  };

  render() {
    const organizer = UserData.find(user => user.id === this.props.event.organizer);
    const formatDate = (date) => {
      date = new Date(date);

      const month = _(months[date.getMonth()]);

      return date.getDate() + ' ' + month;
    };

    const formatTime = (date) => {
      date = new Date(date);
      return (date.getHours() + ':' + zeroPad(date.getMinutes(), 2));
    };

    return (
      <ScrollView style={StyleSheet.eventDetails.style}>
        <View style={StyleSheet.eventDetails.titleStyle}>
          <Image source={{uri: this.props.event.coverSrc}} style={StyleSheet.eventDetails.coverImageStyle} />
          <View style={StyleSheet.eventDetails.coverImageOverlayStyle} />

          <View style={StyleSheet.eventDetails.titleButtonBar}>
            <Button type="roundedWhiteBorder" icon="star" text={_('save')} onPress={this.onPressSave} />
            <View style={StyleSheet.flex} />
            <Button type="roundedWhiteBorder" icon="plusSmall" text={_('invite')} onPress={this.onPressInvite} />
          </View>

          <Text style={[StyleSheet.text, StyleSheet.eventDetails.titleTextStyle]}>
            {this.props.event.title}
          </Text>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.subtitleTextStyle]}>
            {this.props.event.address}
          </Text>
        </View>

        {organizer && <View style={StyleSheet.eventDetails.avatarStyle}>
          <View style={StyleSheet.eventDetails.avatarContainerStyle}>
            <Image source={StyleSheet.images[organizer.avatar]} style={StyleSheet.eventDetails.avatarImageStyle} />
          </View>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.avatarNameStyle]}>
            {organizer.name.first}{'\u00a0'}{organizer.name.last}
          </Text>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.avatarOccupationStyle]}>
            {_('theOrganizer')}
          </Text>
        </View>}

        <EventInfo.Bar>
          <EventInfo icon="attendees" label={_('attendees')}>
            <Text style={StyleSheet.eventDetails.eventInfoTextHighlight}>
              {this.props.event.players}
            </Text>{'/'}{this.props.event.maxPlayers}
          </EventInfo>
          <EventInfo icon="activityBasketball" label={_('activity')}>{this.props.event.activity}</EventInfo>
          <EventInfo icon="calendarBig" label={_('dateAndTime')}>
            <Text style={StyleSheet.eventDetails.lightTextStyle}>{formatDate(this.props.event.date)}{', '}</Text>
            {formatTime(this.props.event.date)}
          </EventInfo>
        </EventInfo.Bar>

        <HorizontalRule style={StyleSheet.eventDetails.horizontalRule}/>

        <EventInfo.Bar>
          <EventInfo icon={this.props.event.gender + 'Active'} label={_('gender')}>
            {this.props.event.gender === 'male' && _('maleOnly')}
            {this.props.event.gender === 'female' && _('femaleOnly')}
            {this.props.event.gender === 'mixed' && _('mixed')}
          </EventInfo>
          <EventInfo icon="courtType" label={_('courtType')}>{this.props.event.courtType}</EventInfo>
          {this.props.event.ageGroup === 'under-16' && <EventInfo icon="ageUnder16" label={_('ageGroup')}>{_('under16')}</EventInfo>}
          {this.props.event.ageGroup === '16-to-17' && <EventInfo icon="age16to17" label={_('ageGroup')}>{_('_16to17')}</EventInfo>}
          {this.props.event.ageGroup === 'adult' && <EventInfo icon="ageAdult" label={_('ageGroup')}>{_('adults')}</EventInfo>}
          {this.props.event.ageGroup === 'all' && <EventInfo icon="ageAll" label={_('ageGroup')}>{_('unrestricted')}</EventInfo>}
          {!this.props.event.private && <EventInfo icon="globe" label={_('privacy')}>{_('_public')}</EventInfo>}
          {!!this.props.event.private && <EventInfo icon="globe" label={_('privacy')}>{_('_private')}</EventInfo>}
        </EventInfo.Bar>

        <HorizontalRule style={StyleSheet.eventDetails.horizontalRule}/>
        <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionTitleTextStyle]}>{_('eventDescription')}</Text>
        <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionBodyTextStyle]}>{this.props.event.description}</Text>

        <HorizontalRule style={StyleSheet.eventDetails.horizontalRule}/>
        <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionTitleTextStyle]}>{_('rules')}</Text>
        <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionBodyTextStyle]}>{this.props.event.rules}</Text>

        <HorizontalRule style={StyleSheet.eventDetails.horizontalRule}/>
        <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionTitleTextStyle]}>{_('notes')}</Text>
        <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionBodyTextStyle]}>{this.props.event.notes}</Text>


        <MapView icon="list" title={_('similarEvents')} style={StyleSheet.eventDetails.mapViewStyle}/>
      </ScrollView>
    );
  }
};


class EventInfo extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.eventDetails.eventInfoStyle, this.props.style]}>
        <Icon name={this.props.icon} style={StyleSheet.eventDetails.eventInfoIcon} />

        <Text style={[StyleSheet.text, StyleSheet.eventDetails.eventInfoText]}>
          {this.props.children}
        </Text>

        <Text style={[StyleSheet.text, StyleSheet.eventDetails.eventInfoKey]}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}

EventInfo.Summary = class EventSummaryInfo extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.eventDetails.eventInfoStyle, this.props.style]}>
        <Icon name={this.props.icon} style={StyleSheet.eventDetails.eventInfoIcon} />

        <Text style={[StyleSheet.text, StyleSheet.eventDetails.eventInfoText]}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

EventInfo.Bar = class EventInfoBar extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.eventDetails.eventInfoBarStyle, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}


class EventInvite extends React.Component {
  render() {
    return (
      <Dialog popup={true} onClose={this.props.onClose} style={StyleSheet.dialog.optionsMenu}>
        <Button type="alertVertical" text={_('facebook')} onPress={this.props.onPressFacebook} />
        <Button type="alertVertical" text={_('twitter')} onPress={this.props.onPressTwitter} />
        <Button type="alertVertical" text={_('email')} onPress={this.props.onPressEmail} />
      </Dialog>
    );
  }
}

EventDetails.joinEvent = (modalProvider, event, onClose) => {
  modalProvider.showModal(
    <EventDetails.Join charge={0.50} event={event}
               onPressCancel={() => {
                 modalProvider.hideModal();
               }}
               onPressJoin={() => {
                 modalProvider.hideModal();
                 modalProvider.showModal(
                   <EventDetails.Joined entryFee={event.entryFee}
                            onClose={() => {
                              modalProvider.hideModal();
                            }}
                            onPressViewList={() => {
                              modalProvider.hideModal();
                              modalProvider.setView(Members, { event: event, onClose: onClose });
                            }}
                   />);
               }}
    />);
}

EventDetails.Join = class EventJoin extends React.Component {
  render() {
    const formatDate = (date) => {
      date = new Date(date);

      const day = _(days[date.getDay()]);
      const month = _(months[date.getMonth()]);

      return day + ', ' + date.getDate() + ' ' + month;
    };

    const formatTime = (date, duration) => {
      date = new Date(date);

      const endTime = new Date((date.getTime() + duration*3600*1000));
      return (date.getHours() + ':' + zeroPad(date.getMinutes(), 2)) + ' - ' + (endTime.getHours() + ':' + zeroPad(endTime.getMinutes(), 2));
    };

    const formatCharge = (charge) => {
      return (parseFloat(charge) * 100).toFixed(0) + 'p'
    };

    return (
      <Dialog popup={true} onClose={this.props.onPressCancel}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle, { textAlign: 'center' }]}>{_('youAreAboutToJoin').toUpperCase()}</Text>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle, {textAlign: 'center', color: StyleSheet.colors.pink}]}>{this.props.event.title.toUpperCase()}</Text>

          <EventInfo.Bar style={[StyleSheet.doubleMarginTop]}>
            <EventInfo.Summary icon="calendarBig" style={{width: 90}}>
              <Text style={StyleSheet.eventDetails.lightTextStyle}>{formatDate(this.props.event.date)}</Text>
              {'\n'}
              <Text>{formatTime(this.props.event.date, this.props.event.duration)}</Text>
            </EventInfo.Summary>
            <EventInfo.Summary icon="pin" style={{width: 90}}>
              <Text style={StyleSheet.eventDetails.lightTextStyle}>{this.props.event.address}</Text>
            </EventInfo.Summary>
          </EventInfo.Bar>
        </View>

        <View style={StyleSheet.buttons.bar}>
          <Button type="alert" text={_('cancel')} onPress={this.props.onPressCancel} />
          <Button type="alertDefault"
              text={<Text>{_('join').toUpperCase() + ' £' + this.props.event.entryFee + (this.props.charge ? ' (+' + formatCharge(this.props.charge) + ')' : '')}</Text>}
              onPress={this.props.onPressJoin} />
        </View>
      </Dialog>
    );
  }
}


EventDetails.Joined = class EventJoined extends React.Component {
  render() {
    return (
      <Dialog popup={true} onClose={this.props.onClose}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle]}>
            {_('congrats').toUpperCase()}{'\n'}
            <Text style={{color: StyleSheet.colors.pink}}>{_('youreIn').toUpperCase()}!</Text>
          </Text>

          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop]}>
            {_('joinConfirmedText').replace('$1', '£' + this.props.entryFee)}
          </Text>
        </View>

        <View style={StyleSheet.buttons.bar}>
          <Button type="alert" text={_('close')} onPress={this.props.onClose} />
          <Button type="alertDefault"
              text={_('viewList')}
              onPress={this.props.onPressViewList} />
        </View>
      </Dialog>
    );
  }
}




