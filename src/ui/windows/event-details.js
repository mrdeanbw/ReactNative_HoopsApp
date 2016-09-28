
import _ from '../i18n';
import React from 'react';
import {ScrollView,View,Text, Image} from 'react-native';

import StyleSheet from '../styles';
import {Icon, HorizontalRule, Button, MapView, Popup, Header} from '../components';

import moment from 'moment';

import EventDashboard from './event-dashboard';

export default class EventDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showJoinPopup: false,
      showJoinedConfirmation: false,
      showQuitPopup: false,
      showCancelEventPopup: false,
    };
  }

  componentWillMount() {
    this._actionListener = this.props.actionButton.addListener('press', () => {
      if(this.props.isMember) {
        this.setState({showQuitPopup: true});
      } else if(this.props.isOrganizer) {
        this.setState({showCancelEventPopup: true});
      } else {
        this.setState({showJoinPopup: true});
      }
    });

    this.updateActionButton(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateActionButton(nextProps);
  }

  updateActionButton(props) {
    let entryFee = this.props.event.entryFee || 0;

    if(this.props.isMember) {
      this.props.onChangeAction({
        text: _('quit'),
        icon: "actionRemove",
        type: "action",
      });
    } else if(this.props.isOrganizer) {
      this.props.onChangeAction({
        text: _('cancel'),
        icon: "actionRemove",
        type: "action",
      });
    } else {
      this.props.onChangeAction({
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
      showJoinedConfirmation: true,
    });

    this.props.onPressJoin();
  };

  onPressSave = () => {
    this.props.onClose && this.props.onClose();
  };

  onPressInvite = () => {
    //TODO show EventInvite popup
  };

  render() {
    const formatDate = (date) => {
      return moment(date).format('D MMM');
    };

    const formatTime = (date) => {
      return moment(date).format('HH:mm');
    };

    return (
      <View style={{flex: 1}}>
        <Header
          title={_('eventDetails')}
          hideSwitcher={true}
          onClose={() => {}}
        />
        <EventJoinPopup
          visible={this.state.showJoinPopup}
          event={this.props.event}
          onPressCancel={() => this.setState({showJoinPopup: false})}
          onPressJoin={this.onPressJoin}
          charge={0.5}
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
        <EventDashboard.CancelEventPopup
          visible={this.state.showCancelEventPopup}
          onClose={() => this.setState({showCancelEventPopup: false})}
          onSubmit={(message) => {
            this.setState({showCancelEventPopup: false});
            this.props.onCancelEvent(message);
          }}
        />
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

          {this.props.organizer && <View style={StyleSheet.eventDetails.avatarStyle}>
            <View style={StyleSheet.eventDetails.avatarContainerStyle}>
              <Image source={StyleSheet.images[this.props.organizer.avatar]} style={StyleSheet.eventDetails.avatarImageStyle} />
            </View>
            <Text style={[StyleSheet.text, StyleSheet.eventDetails.avatarNameStyle]}>
              {this.props.organizer.name}
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


class EventInvitePopup extends React.Component {
  render() {
    return (
      <Popup visible={false} onClose={this.props.onClose} style={StyleSheet.dialog.optionsMenu}>
        <Button type="alertVertical" text={_('facebook')} onPress={this.props.onPressFacebook} />
        <Button type="alertVertical" text={_('twitter')} onPress={this.props.onPressTwitter} />
        <Button type="alertVertical" text={_('email')} onPress={this.props.onPressEmail} />
      </Popup>
    );
  }
}

class EventJoinPopup extends React.Component {
  render() {
    const formatDate = (date) => {
      return moment(date).format('ddd, D MMM');
    };

    const formatTime = (date, duration) => {
      return (
        <Text>
          <Text>{moment(date).format('HH:mm')}</Text>
          <Text> - </Text>
          <Text>{moment(date).add(duration, 'minutes').format('HH:mm')}</Text>
        </Text>
      );
    };

    const formatCharge = (charge) => {
      return (parseFloat(charge) * 100).toFixed(0) + 'p';
    };

    return (
      <Popup visible={this.props.visible} onClose={this.props.onPressCancel}>
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
          <Button
            type="alertDefault"
            text={
              <Text>
                <Text>{_('join').toUpperCase()} £{this.props.event.entryFee}</Text>
                {this.props.charge && (
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
