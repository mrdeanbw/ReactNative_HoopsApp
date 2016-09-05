
import _ from '../i18n';

import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {ScrollView, View, Image} from 'react-native';
import StyleSheet from '../styles';

import Dialog from '../components/dialog';
import Button from '../components/button';
import HorizontalRule from '../components/horizontal-rule';
import HighlightText from '../components/highlight-text';
import TextInput from '../components/text-input';
import Interests from './interests';


export default class Login extends React.Component {

  static getTest(close) {
    return {
      title: 'Login',
      view: Login,
      viewProps: { onClose: close }
    };
  }

  onSubmitEditing = (nextField) => {
    this.refs[nextField].focus();
  };

  onPressSignIn = () => {
    this.props.application.setRootView(Interests);
  };

  onPressFacebookLogin = () => {
    this.props.application.setRootView(Interests);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={StyleSheet.login.style} bounces={false}>
        <Dialog style={[StyleSheet.login.containerStyle, {height: StyleSheet.dimensions.height}]} titleStyle={StyleSheet.login.titleStyle}
            onClose={this.props.onClose}
            titleView={
              <Image source={StyleSheet.images.login} style={StyleSheet.login.titleImageStyle}>
                <Image source={StyleSheet.images.logo} style={StyleSheet.login.titleLogoStyle}/>
                <HighlightText highlight={_('productName')} text={_('loginBanner')}
                         style={[StyleSheet.text, StyleSheet.login.titleTextStyle]}
                         highlightStyle={StyleSheet.login.titleTextHighlight} />
              </Image>
            }>

          <View style={StyleSheet.login.contentStyle}>
            <TextInput type="rounded" ref="username" icon="name" placeholder={_('username')}
                   autoCapitalize="none"
                   autoCorrect={false}
                   returnKeyType="next"
                   selectTextOnFocus={true}
                   enablesReturnKeyAutomatically={true}
                   onSubmitEditing={() => this.onSubmitEditing("password")} />

            <TextInput type="rounded" ref="password" icon="password" placeholder={_('password')} style={StyleSheet.singleMarginTop}
                   secureTextEntry={true}
                   returnKeyType="go"
                   selectTextOnFocus={true}
                   clearTextOnFocus={true}
                   enablesReturnKeyAutomatically={true} />

            <Button type="roundedDefault" text={_('signin')} style={StyleSheet.doubleMargin} onPress={this.onPressSignIn}/>
            <HorizontalRule text={_('or')} style={StyleSheet.login.horizontalRule} />
            <Button type="facebook" icon="facebook" text={_('facebookLogin')} style={StyleSheet.doubleMarginTop} onPress={this.onPressFacebookLogin}/>
          </View>
        </Dialog>
        <KeyboardSpacer/>
      </ScrollView>
    );
  }
};
