import React, {Component} from 'react'
import {View, Text} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import {Field, reduxForm} from 'redux-form'

import {Button, HorizontalRule, Form, Header, LoadingAlert} from '../components'
import {AddressInput, AvatarInput, DateInput, GenderInput, TextInput} from '../components/forms'
import {DobInfoPopup, GenderInfoPopup} from '../components/signup'
import StyleSheet from '../styles'
import _ from '../i18n'
import validation from '../config/validation'

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      showDobInfo: false,
      showDobInfoPopup: false,
      showGenderInfoPopup: false,
      cityText: '',
      city: {},
      phone: '',
      image: undefined,
      imageUrl: this.props.imageUrl,
    }
  }

  submit = values => {
    this.props.onSignUp(values.email, values.password, {
      name: values.name,
      dob: values.dob,
      email: values.email,
      gender: values.gender,
      city: values.address.description,
      cityGooglePlaceId: values.address.place_id,
      image: values.image,
    })
  }

  onPressFacebookConnect = () => {
    this.props.onFacebookSignUp()
  }

  render() {
    const errorCode = this.props.signUpError && this.props.signUpError.code
    const emailError = [
      'auth/email-already-in-use',
      'auth/invalid-email',
    ].indexOf(errorCode) !== -1
    const {handleSubmit, valid} = this.props

    return (
      <View style={{flex: 1}} onPress={handleSubmit}>
        <Header title={_('signup')} simple />
        <Form style={StyleSheet.signup.style}>
          <LoadingAlert visible={this.props.isLoading}/>
          <Button
            type="facebook"
            icon="facebook"
            text={_('facebookConnect')}
            onPress={this.onPressFacebookConnect}
          />
          <HorizontalRule
            text={_('or')}
            style={StyleSheet.doubleMarginTop}
          />
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
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            keyboardType="email-address"
            icon="email"
          />
          <Field
            name="password"
            component={TextInput}
            type="flat"
            ref="password"
            placeholder={_('password')}
            validate={[validation.required, validation.minChars6]}
            style={[StyleSheet.halfMarginBottom]}
            secureTextEntry={!this.state.showPassword}
            returnKeyType="next"
            selectTextOnFocus={false}
            clearTextOnFocus={false}
            enablesReturnKeyAutomatically={true}
            icon="password"
            multiline={false}
            rightBar={<Button
              style={StyleSheet.signup.eye}
              type="disclosure"
              active={this.state.showPassword}
              icon="eye"
              onPress={() => this.setState({showPassword: !this.state.showPassword})}
            />}
          />
          <Field
            name="dob"
            component={DateInput}
            ref="dob"
            placeholder={_('dob')}
            type="flat"
            icon="nappy"
            date={true}
            time={false}
            validate={[validation.required, validation.noFutureDates]}
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
            validate={validation.required}
            icon
            placeholder={_('city')}
            textStyles={{color: "black"}}
           />
          <Field
            name="phone"
            component={TextInput}
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

SignUp.propTypes = {
  onSignUp: React.PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'SignUpValidation',
})(SignUp)
