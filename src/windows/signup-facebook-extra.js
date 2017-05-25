import React, {Component} from 'react'
import {View, Text} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import {Field, reduxForm} from 'redux-form'

import {Button, Form, Header, LoadingAlert} from '../components'
import {AddressInput, AvatarInput, DateInput, GenderInput, TextInput} from '../components/forms'
import {DobInfoPopup, GenderInfoPopup} from '../components/signup'
import StyleSheet from '../styles'
import _ from '../i18n'
import validation from '../config/validation'

class SignUpFacebookExtra extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      showDobInfoPopup: false,
      showGenderInfoPopup: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading && !nextProps.isLoading) {
      this.props.change('name', nextProps.facebookName)
      this.props.change('email', nextProps.facebookEmail)
      this.props.change('dob', nextProps.facebookDob)
      this.props.change('gender', nextProps.facebookGender)
      this.props.change('phone', nextProps.facebookPhone)
      this.props.change('image', nextProps.image)
      this.props.change('facebookImageSrc', nextProps.facebookImageSrc)
    }
  }

  submit = values => {
    let userData = {
      name: values.name,
      dob: values.dob,
      gender: values.gender,
      email: values.email,
      city: values.address.description,
      cityGooglePlaceId: values.address.place_id,
      image: values.image,
      facebookImageSrc: values.facebookImageSrc,
    }

    if (!values.image && this.props.facebookImageSrc) {
      userData.facebookImageSrc = this.props.facebookImageSrc
    }

    this.props.onPressContinue(userData)
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={{flex: 1}}>
          <Header title={_('signupFacebook')} simple />
          <LoadingAlert visible={this.props.isLoading} />
        </View>
      )
    }

    const errorCode = this.props.signUpError && this.props.signUpError.code
    const emailError = [
      'auth/email-already-in-use',
      'auth/invalid-email',
    ].indexOf(errorCode) !== -1
    const {handleSubmit, valid} = this.props

    return (
      <View style={{flex: 1}}>
        <Header title={_('signupFacebook')} simple />
        <Form style={[StyleSheet.signup.style]}>
          <Field
            name="image"
            component={AvatarInput}
          />
          <Field
            name="name"
            component={TextInput}
            type="flat"
            ref="name"
            placeholder={_('name')}
            validate={[validation.required, validation.maxChars20]}
            style={StyleSheet.halfMarginBottom}
            autoCapitalize="words"
            autoCorrect={false}
            autoFocus
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            icon="name"
          />
          {errorCode === 'auth/email-already-in-use' && (
          <Text style={StyleSheet.signup.errorText}>Email already used</Text>
          )}
          {errorCode === 'auth/invalid-email' && (
          <Text style={StyleSheet.signup.errorText}>Invalid email</Text>
          )}
          <Field
            name="email"
            component={TextInput}
            type="flat"
            ref="email"
            error={emailError}
            placeholder={_('email')}
            validate={[validation.required, validation.email]}
            style={[StyleSheet.halfMarginBottom]}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            keyboardType="email-address"
            icon="email"
          />
          <Field
            name="dob"
            component={DateInput}
            ref="dob"
            placeholder={_('dob')}
            validate={[validation.required, validation.noFutureDates]}
            type="flat"
            icon="nappy"
            date={true}
            time={false}
            minDate={new Date("1900-01-01")}
            barStyle={{
              padding: 3,
            }}
            rightBar={<Button
              style={StyleSheet.signup.eye}
              type="disclosure"
              icon="info"
              onPress={() => this.setState({showDobInfoPopup: true})}
            />}
          />
          <DobInfoPopup
            visible={this.state.showDobInfoPopup}
            onPressOk={() => this.setState({showDobInfoPopup: false})}
          />
          <Field
            name="address"
            component={AddressInput}
            icon
            placeholder={_('city')}
            validate={validation.required}
            onSelect={(venueAddress) => {
              this.setState({
                cityText: venueAddress.description,
                city: venueAddress,
              })
            }}
            textStyles={{color: 'black'}}
           />
          <Field
            name="phone"
            component={TextInput}
            value={this.state.phone}
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
          <GenderInfoPopup
            visible={this.state.showGenderInfoPopup}
            onPressOk={() => this.setState({showGenderInfoPopup: false})}
          />
          <Field
            name="gender"
            component={GenderInput}
            value={this.state.gender}
            validate={validation.required}
            onPressInfoIcon={() => this.setState({showGenderInfoPopup: true})}
          />
          <Button
            type={valid ? 'roundedDefault' : 'roundedGrey'}
            text={_('signup')}
            onPress={handleSubmit(this.submit)}
            style={[StyleSheet.doubleMarginTop, StyleSheet.singleMarginBottom]}
          />
          <KeyboardSpacer/>
        </Form>
      </View>
    )
  }
}

export default reduxForm({
  form: 'FacebookExtraValidation',
})(SignUpFacebookExtra)
