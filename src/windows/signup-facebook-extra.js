import React from 'react';
import {View} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Button from '../components/button';
import TextInput from '../components/text-input';
import DateInput from '../components/date-input';
import Header from '../components/header';
import LoadingAlert from '../components/loading-alert';
import Form from '../components/form';
import AvatarEdit from '../components/avatar-edit';
import StyleSheet from '../styles';
import {autocomplete} from '../data/google-places';
import _ from '../i18n';

export default class SignUpFacebookExtra extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showDobInfo: false,
      name: props.name,
      email: props.email,
      dob: isNaN(new Date(props.dob).getTime()) ? null : new Date(props.dob),
      gender: props.gender,
      cityText: '',
      city: {},
      citiesAutocomplete: [],
      phone: props.phone,
      image: undefined,
      facebookImageSrc: props.facebookImageSrc,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.isLoading && !nextProps.isLoading) {
      this.setState({
        name: nextProps.name,
        email: nextProps.email,
        dob: isNaN(new Date(nextProps.dob).getTime()) ? null : new Date(nextProps.dob),
        gender: nextProps.gender,
        phone: nextProps.phone,
        facebookImageSrc: nextProps.facebookImageSrc,
      });
    }
  }

  validate() {
    let {
      name,
      email,
      dob,
      gender,
      city,
    } = this.state;

    return !!(
      name &&
      email &&
      dob &&
      gender &&
      city.key
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
    let userData = {
      name: this.state.name,
      dob: this.state.dob,
      gender: this.state.gender,
      email: this.state.email,
      city: this.state.city.text,
      cityGooglePlaceId: this.state.city.key,
      image: this.state.image,
    };

    //If there was no custom image set, use the facebook one instead.
    if(!this.state.image && this.state.facebookImageSrc) {
      userData.facebookImageSrc = this.state.facebookImageSrc;
    }

    this.props.onPressContinue(userData);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('signup')}
          hideSwitcher={true}
        />

        <LoadingAlert visible={this.props.isLoading} />

        <Form style={StyleSheet.signup.style}>
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
            icon="email"
          />

          <DateInput
            type="flat"
            ref="dob"
            placeholder={_('dob')}
            icon="nappy"
            date={true}
            time={false}
            hideDay={true}
            minValue={new Date("1900-01-01")}
            initialValue={new Date()}
            value={this.state.dob}
            onChange={(dob) => this.setState({dob})}
          />

          <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMargin]}>
            <Button type="image" icon="male" active={this.state.gender === 'male'} onPress={this.onPressMale}/>
            <View style={StyleSheet.buttons.separator} />
            <Button type="image" icon="female" active={this.state.gender === 'female'} onPress={this.onPressFemale}/>
          </View>

          <TextInput
            value={this.state.cityText}
            onChangeText={(cityText) => {
              this.setState({
                cityText,
                city: {},
              });
              autocomplete(cityText, '(cities)').then(result => {
                this.setState({
                  citiesAutocomplete: result.predictions,
                });
              });
            }}
            autocomplete={this.state.citiesAutocomplete.map(suggestion => {
              return {
                key: suggestion.place_id,
                text: suggestion.description,
              };
            })}
            onAutocompletePress={(item) => {
              this.setState({
                cityText: item.text,
                city: item,
                citiesAutocomplete: [],
              });
            }}
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

          <View>
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
          </View>

          <AvatarEdit
            onChange={(image) => this.setState({image})}
            image={this.state.image || this.state.facebookImageSrc}
            style={StyleSheet.singleMarginTop}
          />

          <Button
            type={this.validate() ? "roundedDefault" : "roundedGrey"}
            text={_('submit')}
            onPress={this.validate() ? this.onPressContinue : undefined}
            style={StyleSheet.doubleMarginTop}
          />
          <KeyboardSpacer/>
        </Form>
      </View>
    );
  }
}

SignUpFacebookExtra.propTypes = {
};
