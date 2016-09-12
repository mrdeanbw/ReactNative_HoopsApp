
import _ from '../i18n';

import React from 'react';

import {View} from 'react-native';

import Dialog from '../components/dialog';
import Button from '../components/button';
import HorizontalRule from '../components/horizontal-rule';
import TextInput from '../components/text-input';
import DateInput from '../components/date-input';

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
      name: 'Test Tester',
      email: Math.random() + '@mikemonteith.com',
      username: 'testuser',
      password: 'testtest',
      dob: new Date("1989-08-22"),
      gender: 'male',
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
    this.props.onSignUp(this.state.email, this.state.password, {
      name: this.state.name,
      username: this.state.username,
      dob: this.state.dob,
      gender: this.state.gender,
    });
  };

  onPressFacebookConnect = () => {
    this.props.onFacebookSignUp();
  };

  render() {
    return (
      <Dialog ref="dialog" scrollContent={true} title={_('signup')} onClose={this.props.onClose} contentStyle={StyleSheet.signup.style}>

        <TextInput
          value={this.state.name}
          onChangeText={(name) => this.setState({name})}
          type="flat"
          ref="name"
          placeholder={_('name')}
          style={StyleSheet.halfMarginBottom}
          autoCapitalize="words"
          autoCorrect={false}
          autoFocus={true}
          returnKeyType="next"
          selectTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={() => this.onSubmitEditing("email")}
          icon="name"
        />

        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          type="flat"
          ref="email"
          placeholder={_('email')}
          style={StyleSheet.halfMarginBottom}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          selectTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          keyboardType="email-address"
          onSubmitEditing={() => this.onSubmitEditing("username")}
          icon="email"
        />

        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          type="flat"
          ref="username"
          placeholder={_('username')}
          style={StyleSheet.halfMarginBottom}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          selectTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={() => this.onSubmitEditing("password")}
          icon="username"
        />

        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          type="flat"
          ref="password"
          placeholder={_('password')}
          style={StyleSheet.halfMarginBottom}
          secureTextEntry={!this.state.showPassword}
          returnKeyType="next"
          selectTextOnFocus={true}
          clearTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          icon="password"
        >
          <Button type="disclosure" active={this.state.showPassword} icon="eye" onPress={() => this.setState({showPassword: !this.state.showPassword})}/>
        </TextInput>

        <DateInput
          type="flat"
          ref="dob"
          placeholder={_('dob')}
          icon="nappy"
          modalProvider={() => this.refs.dialog}
          date={true}
          time={false}
          value={this.state.dob}
          onChange={(dob) => this.setState({dob})}
        />

        <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMargin]}>
          <Button type="image" icon="male" active={this.state.gender == 'male'} onPress={this.onPressMale}/>
          <View style={StyleSheet.buttons.separator} />
          <Button type="image" icon="female" active={this.state.gender == 'female'} onPress={this.onPressFemale}/>
        </View>

        <TextInput
          value={this.state.city}
          onChangeText={(city) => this.setState({city})}
          type="flat"
          ref="city"
          placeholder={_('city')}
          style={StyleSheet.halfMarginBottom}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          selectTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          icon="city"
        />

        <TextInput
          value={this.state.phone}
          onChangeText={(phone) => this.setState({phone})}
          type="flat"
          ref="phone"
          placeholder={_('optionalPhone')}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          selectTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          keyboardType="phone-pad"
          icon="phone"
        />

        <Button type="roundedDefault" text={_('signup')} onPress={this.onPressSignUp} style={StyleSheet.doubleMarginTop}/>
        <HorizontalRule text={_('or')} style={StyleSheet.doubleMargin} />
        <Button type="facebook" icon="facebook" text={_('facebookConnect')} onPress={this.onPressFacebookConnect}/>
      </Dialog>
    );
  }
}

SignUp.propTypes = {
  onSignUp: React.PropTypes.func.isRequired,
};
