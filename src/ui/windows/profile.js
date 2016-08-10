
import _ from '../i18n';
import React from 'react';
import {View,Text,Image,ScrollView} from 'react-native';

import {Window, Button, Dialog, EventListItem, TextInput, SwitchButton, CheckButton, ListInput, DateInput, Icon} from '../components';
import StyleSheet from '../styles';

import UserData from '../../data/users.json';
import EventData from '../../data/events.json';
import InterestsData from '../../data/interests.json';


export default class Profile extends React.Component {

    static getTest(close) {
        return [{
            title: 'Profile',
            view: Profile,
            viewProps: { profile: UserData[1], user: UserData[0], onClose: close }
        }, {
            title: 'My Profile',
            view: Profile,
            viewProps: { profile: UserData[0], user: UserData[0], onClose: close }
        }];
    }

    constructor() {
        super();
        this.state = {};
    }

    onChangeAvailability = (value) => {
        this.setState({ availability: value });
    };

    onPressEvent = (event) => {

    };

    onPressEditProfile = () => {
        this.refs.dialog.showModal(<Profile.Edit profile={this.props.profile}
                                                 onClose={() => this.refs.dialog.hideModal()}/>, 'slide', false);
    };

    onPressAddFriend = () => {

    };

    onPressMessage = () => {

    };

    render() {
        const profile = this.props.profile, user = this.props.user;
        const name = [profile.name.first, profile.name.last].join(' ');
        const owner = profile.id === this.props.user.id;

        const age = (date) => (((new Date().getTime() - new Date(date).getTime()) / (365.25*24*3600*1000)) | 0);

        return (
            <Dialog ref="dialog" scrollContent style={StyleSheet.flex}
                    title={(owner ? _('yourProfile') : _('profileTemplate')).replace(/\$1/g, name)}
                    leftBar={owner && <View style={StyleSheet.profile.switchButton}><SwitchButton value={this.state.availability} onChange={this.onChangeAvailability}/></View> }
                    onClose={this.props.onClose}>

                <View style={StyleSheet.profile.headlineBarStyle}>
                    <Image source={StyleSheet.images[profile.avatar]} style={StyleSheet.profile.avatarImageStyle} />
                    <View style={StyleSheet.profile.headlineDetailStyle}>
                        <View style={StyleSheet.profile.nameTextContainerStyle}>
                            <View style={[StyleSheet.profile.availableIndicator, !this.state.availability && {backgroundColor: StyleSheet.colors.grey}]}/>
                            <Text style={[StyleSheet.text, StyleSheet.profile.nameTextStyle]}>{name}</Text>
                        </View>

                        <Text style={[StyleSheet.text, StyleSheet.profile.locationTextStyle]}>{profile.location}</Text>
                        <View style={{flex: 1}}/>
                        <View style={StyleSheet.profile.buttonBarStyle}>
                            {owner && <Button type="profile" text={_('editProfile')} onPress={this.onPressEditProfile} />}
                            {!owner && <Button type="profile" icon="plusBlack" text={_('addFriend')} onPress={this.onPressAddFriend} />}
                            {!owner && <Button type="profileDefault" icon="mail" text={_('message')} onPress={this.onPressMessage} />}
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
                    <Text style={[StyleSheet.text, StyleSheet.profile.bodyTextStyle]}>{(profile.activities || []).join(', ') || _('noActivities')}</Text>
                </View>

                <View style={[StyleSheet.dialog.titleStyle, StyleSheet.profile.upcomingBarStyle]}>
                    <Text style={[StyleSheet.text, StyleSheet.dialog.titleTextStyle]}>{_(owner ? 'yourUpcomingEvents' : 'theirUpcomingEvents').replace(/\$1/g, name).toUpperCase()}</Text>
                </View>

                {EventData.map(event =>
                    <EventListItem key={event.id}
                                   onPress={() => this.onPressEvent(event)}
                                   image={StyleSheet.images[event.image]}
                                   title={event.title}
                                   players={event.players} maxPlayers={event.maxPlayers}
                                   level={event.level}
                                   venue={event.venue}
                                   date={event.date}/>)}

            </Dialog>
        );
    }
};


Profile.Edit = class EditProfile extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const profile = nextProps.profile;

        this.setState({
            firstName: profile.name.first,
            lastName: profile.name.last,
            city: profile.city,
            country: profile.country,
            gender: profile.gender,
            dob: profile.dob,
            privacy: profile.privacy,
            activities: profile.activities
        });
    }

    onChangeFirstName = (firstName) => {
        this.setState({firstName});
    };

    onChangeLastName = (lastName) => {
        this.setState({lastName});
    };

    onChangeCity = (city) => {
        this.setState({city});
    };

    onChangeCountry = (country) => {
        this.setState({country});
    };

    onChangeGender = (gender) => {
        this.setState({gender});
    };

    onChangeDob = (dob) => {
        this.setState({dob});
    };

    onChangePrivacy = (privacy) => {
        this.setState({privacy});
    };

    onPressRemoveActivity = (i) => {
        const activities = this.state.activities;
        activities.splice(i, 1);
        this.setState({activities});
    };

    onPressAddActivity = () => {
        this.refs.dialog.showModal(<Profile.AddActivity selected={this.state.activities}
                                                        onClose={() => this.refs.dialog.hideModal()}
                                                        onPressActivity={this.addActivity}/>, 'slide', false);
    };

    addActivity = (...a) => {
        this.refs.dialog.hideModal();
        const activities = this.state.activities;
        activities.push(...a);
        this.setState({activities});
    };

    render() {
        const profile = this.state;

        return (
            <Dialog ref="dialog" style={StyleSheet.flex}
                    title={_('editProfile')}
                    onClose={this.props.onClose}>

                <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 20}}>
                    <Text style={[StyleSheet.text, StyleSheet.profile.fieldLabelText]}>{_('firstName')}</Text>
                    <TextInput type="flat" value={profile.firstName} placeholder={_('firstName')} onChangeText={this.onChangeFirstName} />

                    <Text style={[StyleSheet.text, StyleSheet.profile.fieldLabelText]}>{_('lastName')}</Text>
                    <TextInput type="flat" value={profile.lastName} placeholder={_('lastName')} onChangeText={this.onChangeLastName} />

                    <Text style={[StyleSheet.text, StyleSheet.profile.fieldLabelText]}>{_('city')}</Text>
                    <TextInput type="flat" value={profile.city} placeholder={_('city')} onChangeText={this.onChangeCity} />

                    <Text style={[StyleSheet.text, StyleSheet.profile.fieldLabelText]}>{_('country')}</Text>
                    <ListInput type="flat" value={profile.country} placeholder={_('country')} modalProvider={() => this.refs.dialog} onChange={this.onChangeCountry} rightBar={<Icon name="listIndicator" />}>
                        <ListInput.Item text={_('unitedKingdom')} value="gb" />
                        <ListInput.Item text={_('belgium')} value="be" />
                        <ListInput.Item text={_('france')} value="fr" />
                        <ListInput.Item text={_('germany')} value="de" />
                        <ListInput.Item text={_('netherlands')} value="nl" />
                        <ListInput.Item text={_('spain')} value="es" />
                        <ListInput.Item text={_('usa')} value="us" />
                    </ListInput>

                    <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMarginTop]}>
                        <Button type="image" icon="male" active={profile.gender === 'male'} onPress={() => this.onChangeGender('male')}/>
                        <View style={StyleSheet.buttons.separator} />
                        <Button type="image" icon="female" active={profile.gender === 'female'} onPress={() => this.onChangeGender('female')}/>
                    </View>

                    <Text style={[StyleSheet.text, StyleSheet.profile.fieldLabelText]}>{_('dob')}</Text>
                    <DateInput type="flat" date={true} value={profile.dob} placeholder={_('dob')} onChange={this.onChangeDob} rightBar={<Icon name="listIndicator" />} />

                    <Text style={[StyleSheet.text, StyleSheet.profile.fieldLabelText]}>{_('privacy')}</Text>
                    <ListInput type="flat" style={StyleSheet.halfMarginTop}  placeholder={_('privacy')} value={this.state.privacy}
                               rightBar={<Icon name="listIndicator" />}
                               modalProvider={() => this.refs.dialog}
                               onChange={this.onChangePrivacy}>
                        <ListInput.Item text={_('_public')} value="public" />
                        <ListInput.Item text={_('_private')} value="private" />
                    </ListInput>

                    <Text style={[StyleSheet.text, StyleSheet.profile.fieldLabelText]}>{_('yourActivities')}</Text>

                    {profile.activities.map((activity, i) =>
                        <CheckButton type="profileActivity" key={i}
                                     value={true}
                                     text={activity}
                                     icon="minus"
                                     onChange={() => this.onPressRemoveActivity(i)} />
                    )}

                    <Button type="addActivity" text={_('addAnotherActivity')} icon="plusGrey" onPress={this.onPressAddActivity} />
                </ScrollView>

                <View style={StyleSheet.buttons.bar}>
                    <Button type="dialogDefault" text={_('save')} onPress={this.props.onPressSave} />
                </View>
            </Dialog>
        );
    }
};


Profile.AddActivity = class AddActivity extends React.Component {

    render() {
        const profile = this.state;
        const groups = {};
        InterestsData.all.filter(x => this.props.selected.findIndex(z => z === x) === -1).sort().forEach(interest => {
            const group = interest[0].toLowerCase();
            if(!groups[group]) groups[group] = [];
            groups[group].push(interest);
        });

        return (
            <Dialog ref="dialog" style={StyleSheet.flex}
                    title={_('selectActivities')}
                    onClose={this.props.onClose}>

                <View style={{flex: null, height: 50}}>
                    <TextInput type="search"
                               icon="searchGrey"
                               placeholder={_('searchActivities')}
                               onChange={() => this.setState({ search: value })} />
                </View>

                <ScrollView style={{flex: 1}}>
                    {Object.keys(groups).map(group => <View key={group} style={StyleSheet.profile.groupStyle}>
                        <Text style={[StyleSheet.text, StyleSheet.profile.groupTitleTextStyle]}>{group.toUpperCase()}</Text>
                        {groups[group].map((interest, i) => <Button type="listItem" key={i} text={interest} onPress={() => this.props.onPressActivity(interest)} />)}
                    </View>)}
                </ScrollView>
            </Dialog>
        );
    }
};