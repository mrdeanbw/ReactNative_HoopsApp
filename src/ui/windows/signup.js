
import _ from '../i18n';

import React from 'react';

import {View, Text, TouchableHighlight, TouchableWithoutFeedback, Image, Modal} from 'react-native';

import Dialog from '../components/dialog';
import Button from '../components/button';
import HorizontalRule from '../components/horizontal-rule';
import TextInput from '../components/text-input';
import DateInput from '../components/date-input';
import Interests from './interests';

import StyleSheet from '../styles';


export default class SignUp extends React.Component {

    static getTest(close) {
        return {
            title: 'Sign Up',
            view: SignUp,
            viewProps: { onClose: close }
        };
    }

    constructor() {
        super();
        this.state = {
            showPassword: false,
            showDobInfo: false,
            dobVisible: false,
            gender: null
        };
    }

    onSubmitEditing = (nextField) => {
        this.refs[nextField].focus();
    };

    onPressMale = () => {
        this.setState({gender: 'male'});
    };

    onPressFemale = () => {
        this.setState({gender: 'female'});
    };

    onPressSignUp = () => {
        this.props.application.setRootView(Interests);
    };

    onPressFacebookConnect = () => {
        this.props.application.setRootView(Interests);
    };

    render() {
        return (
            <Dialog ref="dialog" scrollContent={true} title={_('signup')} onClose={this.props.onClose} contentStyle={StyleSheet.signup.style}>

                <TextInput type="flat" ref="name" placeholder={_('name')}
                           style={StyleSheet.halfMarginBottom}
                           autoCapitalize="words"
                           autoCorrect={false}
                           autoFocus={true}
                           returnKeyType="next"
                           selectTextOnFocus={true}
                           enablesReturnKeyAutomatically={true}
                           onSubmitEditing={() => this.onSubmitEditing("email")}
                           icon="name" />

                <TextInput type="flat" ref="email"
                           placeholder={_('email')}
                           style={StyleSheet.halfMarginBottom}
                           autoCapitalize="none"
                           autoCorrect={false}
                           returnKeyType="next"
                           selectTextOnFocus={true}
                           enablesReturnKeyAutomatically={true}
                           keyboardType="email-address"
                           onSubmitEditing={() => this.onSubmitEditing("username")}
                           icon="email" />

                <TextInput type="flat" ref="username"
                           placeholder={_('username')}
                           style={StyleSheet.halfMarginBottom}
                           autoCapitalize="none"
                           autoCorrect={false}
                           returnKeyType="next"
                           selectTextOnFocus={true}
                           enablesReturnKeyAutomatically={true}
                           onSubmitEditing={() => this.onSubmitEditing("password")}
                           icon="username" />

                <TextInput type="flat" ref="password"
                           placeholder={_('password')}
                           style={StyleSheet.halfMarginBottom}
                           secureTextEntry={!this.state.showPassword}
                           returnKeyType="next"
                           selectTextOnFocus={true}
                           clearTextOnFocus={true}
                           enablesReturnKeyAutomatically={true}
                           onSubmitEditing={() => this.onSubmitEditing("dob")}
                           icon="password">
                    <Button type="disclosure" active={this.state.showPassword} icon="eye" onPress={() => this.setState({showPassword: !this.state.showPassword})}/>
                </TextInput>

                <DateInput type="flat" ref="dob" placeholder={_('dob')} icon="nappy"
                           onShowModal={c => this.refs.dialog.showModal(c)}
                           onHideModal={() => this.refs.dialog.hideModal()}>
                    <Button type="disclosure" icon="info" onPress={() => this.setState({showDobInfo: !this.state.showDobInfo})}/>
                </DateInput>

                <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMargin]}>
                    <Button type="image" icon="male" active={this.state.gender == 'male'} onPress={this.onPressMale}/>
                    <View style={StyleSheet.buttons.separator} />
                    <Button type="image" icon="female" active={this.state.gender == 'female'} onPress={this.onPressFemale}/>
                </View>

                <TextInput type="flat" ref="city"
                           placeholder={_('city')}
                           style={StyleSheet.halfMarginBottom}
                           autoCapitalize="none"
                           autoCorrect={false}
                           returnKeyType="next"
                           selectTextOnFocus={true}
                           enablesReturnKeyAutomatically={true}
                           icon="city"/>

                <TextInput type="flat" ref="phone"
                           placeholder={_('optionalPhone')}
                           autoCapitalize="none"
                           autoCorrect={false}
                           returnKeyType="next"
                           selectTextOnFocus={true}
                           enablesReturnKeyAutomatically={true}
                           keyboardType="phone-pad"
                           icon="phone" />

                <Button type="roundedDefault" text={_('signup')} onPress={this.onPressSignUp} style={StyleSheet.doubleMarginTop}/>
                <HorizontalRule text={_('or')} style={StyleSheet.doubleMargin} />
                <Button type="facebook" icon="facebook" text={_('facebookConnect')} onPress={this.onPressFacebookConnect}/>
            </Dialog>
        );
    }
};