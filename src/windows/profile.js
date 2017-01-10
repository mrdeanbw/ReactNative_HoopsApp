import React from 'react';
import {View, Text, Image, ScrollView, Linking} from 'react-native';
import moment from 'moment';

import {Header, Popup, Button, EventListItem} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
      showContactPopup: false,
    };
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
        />
        <Popup
          visible={this.state.showContactPopup}
          onClose={() => this.setState({showContactPopup: false})}
        >
          {profile.phone && (
            <Button
              type="alertVertical"
              text={_('phone')}
              onPress={() => {
                let url = `tel:${profile.phone}`;
                Linking.openURL(url).catch(err => {
                  console.warn(err); //eslint-disable-line no-console
                });
              }}
            />
          )}
          {profile.email && (
            <Button
              type="alertVertical"
              text={_('email')}
              onPress={() => {
                let url = `mailto:${profile.email}`;
                Linking.openURL(url).catch(err => {
                  console.warn(err); //eslint-disable-line no-console
                });
              }}
            />
          )}
        </Popup>
        <ScrollView>
          <View style={StyleSheet.profile.headlineBarStyle}>
            <Image source={{uri: profile.imageSrc}} style={StyleSheet.profile.avatarImageStyle} />
            <View style={StyleSheet.profile.headlineDetailStyle}>
              <View style={StyleSheet.profile.nameTextContainerStyle}>
                <View style={[StyleSheet.profile.availableIndicator, !profile.availability && {backgroundColor: StyleSheet.colors.grey}]}/>
                <Text style={[StyleSheet.text, StyleSheet.profile.nameTextStyle]}>{name}</Text>
              </View>

              <Text style={[StyleSheet.text, StyleSheet.profile.locationTextStyle]}>{profile.city}</Text>
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
                {!owner && this.props.showContactInfo && (profile.email || profile.phone) && (
                  <Button
                    type="profileDefault"
                    icon="contact"
                    text={_('contact')}
                    onPress={() => this.setState({showContactPopup: true})}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={StyleSheet.profile.statsBarStyle}>
            <View style={StyleSheet.profile.statsItemStyle}>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsValueTextStyle]}>{this.props.numParticipated}</Text>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsKeyTextStyle]}>{_('eventsParticipated')}</Text>
            </View>

            <View style={StyleSheet.profile.statsItemStyle}>
              <Text style={[StyleSheet.text, StyleSheet.profile.statsValueTextStyle]}>{Object.keys(profile.organizing).length}</Text>
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
              event={event}
              onPress={() => this.props.onPressEvent(event)}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}
