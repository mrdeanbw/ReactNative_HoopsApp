
import _ from '../i18n';

import React from 'react';

import {View, ScrollView} from 'react-native';

import Button from '../components/button';
import TextInput from '../components/text-input';
import DateInput from '../components/date-input';
import Header from '../components/header';

import StyleSheet from '../styles';


export default class SignUpFacebookExtra extends React.Component {

  static getTest(close) {
    return {
      title: 'Sign Up',
      view: SignUpFacebookExtra,
      viewProps: { onClose: close }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showDobInfo: false,
      name: props.name,
      email: props.email,
      username: props.username,
      dob: new Date(props.dob),
      gender: props.gender,
      city: props.city,
      phone: props.phone,
    };
  }

  validate() {
    let {
      name,
      email,
      username,
      dob,
      gender,
      city
    } = this.state;

    return !!(
      name &&
      email &&
      username &&
      dob &&
      gender &&
      city
    );
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

  onPressContinue = () => {
    this.props.onPressContinue({
      name: this.state.name,
      username: this.state.username,
      dob: this.state.dob,
      gender: this.state.gender,
      email: this.state.email,
      city: this.state.city,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('signup')}
          hideSwitcher={true}
        />

        <ScrollView style={StyleSheet.signup.style}>
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
            onSubmitEditing={() => this.onSubmitEditing("dob")}
            icon="username"
          />

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
            <Button type="image" icon="male" active={this.state.gender === 'male'} onPress={this.onPressMale}/>
            <View style={StyleSheet.buttons.separator} />
            <Button type="image" icon="female" active={this.state.gender === 'female'} onPress={this.onPressFemale}/>
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

          <Button
            type={this.validate() ? "roundedDefault" : "roundedGrey"}
            text={_('submit')}
            onPress={this.validate() ? this.onPressContinue : undefined}
            style={StyleSheet.doubleMarginTop}
          />
        </ScrollView>
      </View>
    );
  }
}

SignUpFacebookExtra.propTypes = {
};
