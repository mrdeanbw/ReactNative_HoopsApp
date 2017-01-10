import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {View, Image, Text} from 'react-native';

import StyleSheet from '../styles';
import Button from '../components/button';
import HorizontalRule from '../components/horizontal-rule';
import HighlightText from '../components/highlight-text';
import TextInput from '../components/text-input';
import Form from '../components/form';
import LoadingAlert from '../components/loading-alert';
import _ from '../i18n';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };
  }

  onSubmitEditing = (nextField) => {
    this.refs[nextField].focus();
  };

  onPressSignIn = () => {
    this.props.onSignIn(this.state.email, this.state.password);
  };

  onPressFacebookLogin = () => {
    this.props.onFacebookSignIn();
  };

  render() {
    let errorCode = this.props.signInError && this.props.signInError.code;
    let emailError = [
      'auth/invalid-email',
      'auth/user-not-found',
      'auth/user-disabled'
    ].indexOf(errorCode) !== -1;
    let passwordError = [
      'auth/wrong-password',
    ].indexOf(errorCode) !== -1;

    return (

      <Form
        contentContainerStyle={StyleSheet.login.style}
        bounces={true}
      >
        {this.props.isLoading && <LoadingAlert/>}

        <View style={StyleSheet.login.containerStyle}>
          <View>
            <Image source={StyleSheet.images.login} style={StyleSheet.login.titleImageStyle}>
              <Button type="title" icon="back" onPress={this.props.onBack} style={StyleSheet.login.backButton}/>
              <Image source={StyleSheet.images.logo} style={StyleSheet.login.titleLogoStyle}/>
              <HighlightText
                highlight={_('productName')}
                text={_('loginBanner')}
                style={[StyleSheet.text, StyleSheet.login.titleTextStyle]}
                highlightStyle={StyleSheet.login.titleTextHighlight}
              />
            </Image>
          </View>

          <View style={StyleSheet.login.contentStyle}>
            {errorCode === 'auth/invalid-email' && (
              <Text style={StyleSheet.login.errorText}>Invalid email</Text>
            )}
            {errorCode === 'auth/user-not-found' && (
              <Text style={StyleSheet.login.errorText}>User not found</Text>
            )}
            {errorCode === 'auth/user-disabled' && (
              <Text style={StyleSheet.login.errorText}>User is disabled</Text>
            )}
            {errorCode === 'auth/account-exists-with-different-credential' && (
              <Text style={StyleSheet.login.errorText}>You've signed up with this email already. Please login with your details</Text>
            )}
            
            <TextInput
              value={this.state.email}
              onChangeText={(email) => {
                this.setState({email});
                this.props.onFormEdit();
              }}
              style={emailError && StyleSheet.login.errorTextInput}
              error={emailError}
              keyboardType="email-address"
              type="rounded"
              ref="email"
              icon="email"
              placeholder={_('email')}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              selectTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={() => this.onSubmitEditing("password")}
            />

            {errorCode === 'auth/wrong-password' && (
              <Text style={StyleSheet.login.errorText}>Invalid password</Text>
            )}
            <TextInput
              value={this.state.password}
              onChangeText={(password) => {
                this.setState({password});
                this.props.onFormEdit();
              }}
              error={passwordError}
              type="rounded"
              ref="password"
              icon="password"
              placeholder={_('password')}
              style={[
                passwordError && StyleSheet.login.errorTextInput,
                StyleSheet.singleMarginTop
              ]}
              secureTextEntry={!this.state.showPassword}
              returnKeyType="go"
              selectTextOnFocus={true}
              clearTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={() => this.onPressSignIn()}
              rightBar={<Button
                style={StyleSheet.login.eye}
                type="disclosure"
                active={this.state.showPassword}
                icon="eye"
                onPress={() => this.setState({showPassword: !this.state.showPassword})} />
              }
            />

            <Button type="roundedDefault" text={_('signin')} style={StyleSheet.doubleMargin} onPress={this.onPressSignIn}/>
            <HorizontalRule text={_('or')} style={StyleSheet.login.horizontalRule} />
            <Button type="facebook" icon="facebook" text={_('facebookLogin')} style={StyleSheet.doubleMarginTop} onPress={this.onPressFacebookLogin}/>
          </View>
        </View>
        <KeyboardSpacer/>
      </Form>
    );
  }
}

Login.propTypes = {
  onSignIn: React.PropTypes.func.isRequired,
};
