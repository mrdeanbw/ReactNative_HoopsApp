import React from 'react';
import {ScrollView,View,Text, Image, ActionSheetIOS, TouchableHighlight, Linking} from 'react-native';
import moment from 'moment';

import StyleSheet from '../styles';
import {Icon, HorizontalRule, Button, Popup, Header} from '../components';
import _ from '../i18n';
import EventDashboard from './event-dashboard';

const icons = {
  AMERICAN_FOOTBALL: 'activityAmericanFootball',
  ARCHERY: 'activityArchery',
  AUTOMOBILE_RACING: 'activityAutomobileRacing',
  BADMINTON: 'activityBadminton',
  BASEBALL: 'activityBaseball',
  BASKETBALL: 'activityBasketball',
  BEACH_VOLLEYBALL: 'activityVolleyball',
  BIKE: 'activityBike',
  BOWLING: 'activityBowling',
  BOXING: 'activityBoxing',
  CANOEING: 'activityCanoeing',
  CARDS: 'activityCards',
  CHESS: 'activityChess',
  DEFAULT: 'activityDefault',
  FOOTBALL: 'activityFootball',
  FRISBEE: 'activityFrisbee',
  GOLF: 'activityGolf',
  GYM: 'activityGym',
  GYMNASTICS: 'activityGymnastics',
  HOCKEY: 'activityHockey',
  ICE_HOCKEY: 'activityIceHockey',
  ICE_SKATING: 'activityIceSkating',
  MOUNTAINEERING: 'activityMountaineering',
  POOL: 'activityPool',
  RUGBY: 'activityRugby',
  RUNNING: 'activityRunning',
  SKATEBOARDING: 'activitySkateboarding',
  SKIING: 'activitySkiing',
  SWIMMING: 'activitySwimming',
  TABLE_TENNIS: 'activityTableTennis',
  TENNIS: 'activityTennis',
  YOGA: 'activityYoga',
};

export default class EventDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showJoinPopup: false,
      showJoinedConfirmation: false,
      showQuitPopup: false,
      showCancelEventPopup: false,
      showCancelRequestPopup: false,
      showPaymentTypePopup: false,
      paymentMethod: undefined,
    };
  }

  componentWillMount() {
    this._actionListener = this.props.actionButton.addListener('press', () => {
      if(this.props.isExpired){
        this.props.onBack();
      } else if(this.props.isMember) {
        this.setState({showQuitPopup: true});
      } else if(this.props.isPendingRequest) {
        this.setState({showCancelRequestPopup: true});
      } else if(this.props.isOrganizer) {
        this.props.onEditEvent();
      } else {
        this.onPressJoinTabAction();
      }
    });

    this.updateActionButton(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(
      nextProps.isMember !== this.props.isMember ||
      nextProps.isPendingRequest !== this.props.isPendingRequest ||
      nextProps.isOrganizer !== this.props.isOrganizer ||
      (nextProps.navKey !== this.props.navKey && nextProps.navKey === 'eventDetails')
    ){
      this.updateActionButton(nextProps);
    }
  }

  onPressJoinTabAction = () => {
    let event = this.props.event;
    if(event.entryFee > 0 && event.paymentMethod === 'unrestricted') {
      //If we are on an 'unrestricted' payment type, show payment types popup
      this.setState({showPaymentTypePopup: true});
    } else {
      //If we are on an event with a specified payment type, show the join popup
      this.setState({
        showJoinPopup: true,
        paymentMethod: event.entryFee === 0 ? 'cash' : event.paymentMethod
      });
    }
  };

  updateActionButton(props) {
    let entryFee = props.event.entryFee || 0;

    if(this.props.isExpired) {
      props.onChangeAction({
        text: _('back'),
        icon: "back",
        type: "action",
      });
    } else if(props.isMember || props.isPendingRequest) {
      props.onChangeAction({
        text: _('quit'),
        icon: "actionRemove",
        type: "action",
      });
    } else if(props.isOrganizer) {
      props.onChangeAction({
        text: _('edit'),
        icon: "actionEdit",
        type: "action",
      });
    } else {
      props.onChangeAction({
        text: _('join'),
        textLarge: '£' + entryFee,
        type: "actionDefault",
      });
    }
  }

  componentWillUnmount() {
    this._actionListener && this._actionListener.remove();
  }

  onPressJoin = () => {
    this.setState({
      showJoinPopup: false,
    });

    this.props.onPressJoin(this.state.paymentMethod);
  };

  onPressInvite = () => {
    this.props.onPressInvite();
  };

  onPressShare = () => {
    ActionSheetIOS.showShareActionSheetWithOptions({
      //TODO figure out a deep link url
      url: `hoops://events/${this.props.event.id}`,
      message: 'Check out this event, want to join?',
      subject: 'Join this event',
    }, (err) => {
      console.warn(err); //eslint-disable-line no-console
    }, (success, method) => {
      //This callback does nothing but is required by ActionSheetIOS
    });
  };

  onPressAddress = (address) => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        _('openWithAppleMaps'),
        _('cancel'),
      ],
      cancelButtonIndex: 1,
    }, (index) => {
      if(index === 0) {
        let url = `http://maps.apple.com/?daddr=${address}`;
        Linking.openURL(url).catch(err => console.warn(err)); //eslint-disable-line no-console
      }
    });
  };

  getIcon(activityKey) {
    return icons[activityKey] || icons.DEFAULT;
  }

  render() {
    let event = this.props.event;
    let address = event.address;

    let ageText;
    if(this.props.event.minAge && this.props.event.maxAge) {
      ageText = <Text>{this.props.event.minAge} - {this.props.event.maxAge}</Text>;
    } else if(this.props.event.minAge) {
      ageText = <Text>Min Age {this.props.event.minAge}</Text>;
    } else if(this.props.event.maxAge) {
      ageText = <Text>Max Age {this.props.event.maxAge}</Text>;
    } else {
      ageText = _('unrestricted');
    }

    return (
      <View style={{flex: 1}}>
        <Header
          title={_('eventDetails')}
          hideSwitcher={true}
          onClose={this.props.onClose}
          onBack={this.props.onBack}
        />
        <EventJoinPopup
          visible={this.state.showJoinPopup}
          event={this.props.event}
          onPressCancel={() => this.setState({showJoinPopup: false})}
          onPressJoin={this.onPressJoin}
          charge={(this.state.paymentMethod === 'app' && this.props.event.entryFee) ? 0.5 : 0}
        />
        <EventJoinedConfirmation
          visible={this.state.showJoinedConfirmation}
          onClose={() => this.setState({showJoinedConfirmation: false})}
          entryFee={this.props.event.entryFee}
          onPressViewList={this.props.onPressViewList}
        />
        <EventQuitPopup
          visible={this.state.showQuitPopup}
          event={this.props.event}
          onPressCancel={() => this.setState({showQuitPopup: false})}
          onPressQuit={() => {
            this.setState({showQuitPopup: false});
            this.props.onPressQuit();
          }}
        />
        <EventCancelRequestPopup
          visible={this.state.showCancelRequestPopup}
          event={this.props.event}
          onPressCancel={() => this.setState({showCancelRequestPopup: false})}
          onPressConfirm={() => {
            this.setState({showCancelRequestPopup: false});
            this.props.onCancelRequest();
          }}
        />
        <EventDashboard.CancelEventPopup
          visible={this.state.showCancelEventPopup}
          onClose={() => this.setState({showCancelEventPopup: false})}
          onSubmit={(message) => {
            this.setState({showCancelEventPopup: false});
            this.props.onCancelEvent(message);
          }}
        />
        <PaymentTypePopup
          visible={this.state.showPaymentTypePopup}
          onClose={() => this.setState({showPaymentTypePopup: false})}
          onSelect={(paymentMethod) => {
            this.setState({
              showJoinPopup: true,
              showPaymentTypePopup: false,
              paymentMethod,
            });
          }}
        />
        <ScrollView style={StyleSheet.eventDetails.style}>
          <View style={StyleSheet.eventDetails.titleStyle}>
            <Image source={{uri: this.props.event.imageSrc}} style={StyleSheet.eventDetails.coverImageStyle} />
            <View style={StyleSheet.eventDetails.coverImageOverlayStyle} />

            <View style={StyleSheet.eventDetails.titleButtonBar}>
              <Button
                type="roundedWhiteBorder"
                icon={this.props.isSaved ? "starFilled" : "star"}
                text={this.props.isSaved ? _('saved') : _('save')}
                onPress={this.props.onPressSave}
              />
              <View style={StyleSheet.flex} />
              <Button type="roundedWhiteBorder" icon="plusSmall" text={_('invite')} onPress={this.onPressInvite} />
            </View>

            <Text style={[StyleSheet.text, StyleSheet.eventDetails.titleTextStyle]}>
              {this.props.event.title}
            </Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.onPressAddress(address)}
              hitSlop={{top: 10, bottom: 10}}
            >
              <Text style={[StyleSheet.text, StyleSheet.eventDetails.subtitleTextStyle]}>
                {address}
              </Text>
            </TouchableHighlight>
          </View>

          {this.props.organizer && (
            <TouchableHighlight
              style={StyleSheet.eventDetails.profileContainer}
              onPress={() => this.props.onPressOrganizer(this.props.organizer)}
              underlayColor="transparent"
            >
              <View style={StyleSheet.eventDetails.avatarStyle}>
                <View style={StyleSheet.eventDetails.avatarContainerStyle}>
                  <Image source={{uri: this.props.organizer.imageSrc}} style={StyleSheet.eventDetails.avatarImageStyle} />
                </View>
                <Text style={[StyleSheet.text, StyleSheet.eventDetails.avatarNameStyle]}>
                  {this.props.organizer.name}
                </Text>
                <Text style={[StyleSheet.text, StyleSheet.eventDetails.avatarOccupationStyle]}>
                  {_('theOrganizer')}
                </Text>
              </View>
            </TouchableHighlight>
          )}

          <EventInfo.Bar>
            <EventInfo icon="attendees" label={_('attendees')}>
              <Text style={StyleSheet.eventDetails.eventInfoTextHighlight}>
                {this.props.event.players.length}
              </Text>
              {!!this.props.event.maxPlayers && (
                <Text>
                  {'/'}{this.props.event.maxPlayers}
                </Text>
              )}
            </EventInfo>
            <EventInfo
              icon={this.getIcon(this.props.event.activity.id)}
              label={_('activity')}
            >
              {this.props.event.activity.name}
            </EventInfo>
            <EventInfo icon="calendarBig" label={_('dateAndTime')}>
              <DateText event={this.props.event} />
            </EventInfo>
          </EventInfo.Bar>

          <HorizontalRule style={StyleSheet.eventDetails.horizontalRule}/>

          <EventInfo.Bar>
            <EventInfo icon={this.props.event.gender + 'Active'} label={_('gender')}>
              {this.props.event.gender === 'male' && _('maleOnly')}
              {this.props.event.gender === 'female' && _('femaleOnly')}
              {this.props.event.gender === 'mixed' && _('mixed')}
            </EventInfo>
            <EventInfo
              icon={this.props.event.courtType === 'outdoor' ? "courtType" : "homeActive"} label={_('courtType')}
            >
              {this.props.event.courtType === 'outdoor' ? _('outdoor') : _('indoor')}
            </EventInfo>
            <EventInfo
              icon="ageAll"
              label={_('ageGroup')}
            >{ageText}</EventInfo>
            {this.props.event.privacy === 'public' && <EventInfo icon="globe" label={_('privacy')}>{_('_public')}</EventInfo>}
            {this.props.event.privacy === 'private' && <EventInfo icon="globe" label={_('privacy')}>{_('_private')}</EventInfo>}
          </EventInfo.Bar>

          <HorizontalRule style={StyleSheet.eventDetails.horizontalRule}/>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionTitleTextStyle]}>{_('eventDescription')}</Text>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionBodyTextStyle]}>{this.props.event.description}</Text>

          <HorizontalRule style={StyleSheet.eventDetails.horizontalRule}/>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionTitleTextStyle]}>{_('rules')}</Text>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionBodyTextStyle]}>{this.props.event.rules}</Text>

          <HorizontalRule style={StyleSheet.eventDetails.horizontalRule}/>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionTitleTextStyle]}>{_('notes')}</Text>
          <Text style={[StyleSheet.text, StyleSheet.eventDetails.sectionBodyTextStyle, StyleSheet.doubleMarginBottom]}>{this.props.event.notes}</Text>
        </ScrollView>
      </View>
    );
  }
}

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
};

EventInfo.Bar = class EventInfoBar extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.eventDetails.eventInfoBarStyle, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
};

class DateText extends React.Component {
  render() {
    let start = moment(this.props.event.date);
    let end = this.props.event.endDate ? moment(this.props.event.endDate) : null;

    let startComponent = (
      <Text>
        <Text style={StyleSheet.eventDetails.lightTextStyle}>
          {moment(start).format('D MMM').replace(/ /g, '\u00a0')},&nbsp;
        </Text>
        <Text>{moment(start).format('HH:mm')}</Text>
      </Text>
    );

    if(!end) {
      return startComponent;
    } else {
      return (
        <Text>
          {startComponent}
          <Text> - </Text>
          {!moment(end).isSame(start, 'day') && (
            <Text style={StyleSheet.eventDetails.lightTextStyle}>
              {moment(end).format('D MMM').replace(/ /g, '\u00a0')},&nbsp;
            </Text>
          )}
          <Text>{moment(end).format('HH:mm')}</Text>
        </Text>
      );
    }
  }
}

class EventJoinPopup extends React.Component {
  render() {
    const formatCharge = (charge) => {
      return (parseFloat(charge) * 100).toFixed(0) + 'p';
    };

    let event = this.props.event;
    let address = event.address;

    return (
      <Popup visible={this.props.visible} onClose={this.props.onPressCancel}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle, { textAlign: 'center' }]}>{_('youAreAboutToJoin').toUpperCase()}</Text>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle, {textAlign: 'center', color: StyleSheet.colors.pink}]}>{event.title.toUpperCase()}</Text>

          <EventInfo.Bar style={[StyleSheet.doubleMarginTop]}>
            <EventInfo.Summary icon="calendarBig" style={{width: 90}}>
              <DateText event={event} />
            </EventInfo.Summary>
            <EventInfo.Summary icon="pin" style={{width: 90}}>
              <Text style={StyleSheet.eventDetails.lightTextStyle}>{address}</Text>
            </EventInfo.Summary>
          </EventInfo.Bar>
        </View>

        <View style={StyleSheet.buttons.bar}>
          <Button type="alert" text={_('cancel')} onPress={this.props.onPressCancel} />
          <Button
            type="alertDefault"
            text={
              <Text>
                <Text>{_('join').toUpperCase()} £{event.entryFee}</Text>
                {this.props.charge > 0 && (
                  <Text>(+{formatCharge(this.props.charge)})</Text>
                )}
              </Text>
            }
            onPress={this.props.onPressJoin}
          />
        </View>
      </Popup>
    );
  }
}

class PaymentTypePopup extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible} onClose={this.props.onClose}>
        <Button
          type="alertVertical"
          text={_('cashOnSite')}
          onPress={() => this.props.onSelect('cash')}
        />
        <Button
          type="alertVertical"
          text={_('inAppPayment')}
          onPress={() => this.props.onSelect('app')}
        />
      </Popup>
    );
  }
}


class EventJoinedConfirmation extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible} onClose={this.props.onClose}>
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
      </Popup>
    );
  }
}

class EventQuitPopup extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible} onClose={this.props.onPressCancel}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle]}>
            {_('quitConfirmationTitle')}
          </Text>

          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop]}>
            {_('quitConfirmation')}
          </Text>
        </View>

        <View style={StyleSheet.buttons.bar}>
          <Button type="alert" text={_('cancel')} onPress={this.props.onPressCancel} />
          <Button
            type="alertDefault"
            text={_('quit')}
            onPress={this.props.onPressQuit}
          />
        </View>
      </Popup>
    );
  }
}

class EventCancelRequestPopup extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible} onClose={this.props.onPressCancel}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle]}>
            {_('cancelRequestConfirmationTitle')}
          </Text>

          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop]}>
            {_('cancelRequestConfirmation')}
          </Text>
        </View>

        <View style={StyleSheet.buttons.bar}>
          <Button type="alert" text={_('cancel')} onPress={this.props.onPressCancel} />
          <Button
            type="alertDefault"
            text={_('quit')}
            onPress={this.props.onPressConfirm}
          />
        </View>
      </Popup>
    );
  }
}
