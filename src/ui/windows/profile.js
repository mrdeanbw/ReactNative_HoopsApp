
import _ from '../i18n';
import React from 'react';
import {View,Text,Image,ScrollView} from 'react-native';
import moment from 'moment';

import {Header, Button, EventListItem} from '../components';
import StyleSheet from '../styles';

export default class Profile extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const profile = this.props.profile;
    const name = profile.name;
    const owner = profile.id === this.props.me.uid;

    const age = (date) => {
      return moment().diff(date, 'years');
    };

    const interestsString = this.props.interests.map(interest => {
      return interest.name;
    }).join(', ');

    return (
      <View style={{flex: 1}}>
        <Header
          onClose={this.props.onClose}
          onBack={this.props.onBack}
          title={(owner ? _('yourProfile') : _('profileTemplate')).replace(/\$1/g, name)}
        />
        <ScrollView>
          <View style={StyleSheet.profile.headlineBarStyle}>
            <Image source={{uri: profile.imageSrc}} style={StyleSheet.profile.avatarImageStyle} />
            <View style={StyleSheet.profile.headlineDetailStyle}>
              <View style={StyleSheet.profile.nameTextContainerStyle}>
                <View style={[StyleSheet.profile.availableIndicator, !profile.availability && {backgroundColor: StyleSheet.colors.grey}]}/>
                <Text style={[StyleSheet.text, StyleSheet.profile.nameTextStyle]}>{name}</Text>
              </View>

              <Text style={[StyleSheet.text, StyleSheet.profile.locationTextStyle]}>{profile.location}</Text>
              <View style={{flex: 1}}/>
              <View style={StyleSheet.profile.buttonBarStyle}>
                {owner && <Button type="profile" text={_('editProfile')} onPress={this.props.onPressEditProfile} />}
                {!owner && !this.props.isFriend && !this.props.isPending && (
                  <Button
                    type="profile"
                    icon="plusBlack"
                    text={_('addFriend')}
                    onPress={this.props.onPressAddFriend}
                  />
                )}
                {!owner && this.props.isFriend && (
                  <Button
                    type="profile"
                    icon="plusBlack"
                    text={_('remove')}
                    onPress={this.props.onPressRemoveFriend}
                  />
                )}
                {!owner && this.props.isPending && (
                  <Button
                    type="profile"
                    icon="plusBlack"
                    text={_('pendingFriendRequest')}
                    onPress={() => {}}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={StyleSheet.profile.statsBarStyle}>
            <View style={StyleSheet.profile.statsItemStyle}>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsValueTextStyle]}>{'253'}</Text>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsKeyTextStyle]}>{_('eventsParticipated')}</Text>
            </View>

            <View style={StyleSheet.profile.statsItemStyle}>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsValueTextStyle]}>{'21'}</Text>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsKeyTextStyle]}>{_('eventsOrganized')}</Text>
            </View>

            <View style={StyleSheet.profile.statsItemStyle}>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsValueTextStyle]}>{age(profile.dob)}</Text>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsKeyTextStyle]}>{_('yearsOld')}</Text>
            </View>
          </View>

          <View style={StyleSheet.profile.infoStyle}>
            <Text style={[StyleSheet.text, StyleSheet.profile.titleTextStyle]}>{_(owner ? 'yourSports' : 'theirSports').replace(/\$1/g, name)}</Text>
            <Text style={[StyleSheet.text, StyleSheet.profile.bodyTextStyle]}>
              {interestsString || _('noActivities')}</Text>
          </View>

          <View style={[StyleSheet.dialog.titleStyle, StyleSheet.profile.upcomingBarStyle]}>
            <Text
              style={[
                StyleSheet.text,
                StyleSheet.dialog.titleTextStyle,
                StyleSheet.profile.upcomingBarText,
              ]}
            >
              {_(owner ? 'yourUpcomingEvents' : 'theirUpcomingEvents')
                .replace(/\$1/g, name)
                .toUpperCase()
              }
            </Text>
          </View>

          {this.props.upcoming.map(event =>
            <EventListItem
              key={event.id}
              onPress={() => this.props.onPressEvent(event)}
              image={{uri: event.imageSrc}}
              title={event.title}
              players={event.players} maxPlayers={event.maxPlayers}
              level={event.level}
              venueName={event.address}
              date={event.date}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}
