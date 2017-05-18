import React, {Component} from 'react'
import {View, Text} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import {Field, reduxForm} from 'redux-form'

import {
  AddressInput, Button, TextInput,
  DateInput, Form, Header, AvatarEdit
} from '../components'
import {DobInfoPopup, GenderInfoPopup} from '../components/signup'
import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import _ from '../i18n'
import * as validation from '../config/validation'

const required =  value => value ? undefined : 'Required'
const email =  value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
const maxChars15 = (value) => !(value.length >= 15) ? undefined : 'Must be 15 characters or less'
const noFutureDates = (date, today = new Date()) => (date >= today) ? 'Invalid date of birth' : false

const renderTextInput = ({
        input: {onChange, ...restInput},
        value,
        onChangeText,
        type,
        ref,
        placeholder,
        style,
        errors,
        autoCapitalize,
        autoCorrect,
        textStyle,
        autoFocus,
        returnKeyType,
        selectTextOnFocus,
        enablesReturnKeyAutomatically,
        onSubmitEditing,
        icon,
        secureTextEntry,
        clearTextOnFocus,
        multiline,
        rightBar,
        keyboardType,
        meta: {touched, error, warning, dirty,invalid,}
      }) => {

let borderStyleOnError = null
let textStyleOnError = null

touched || dirty && error ? borderStyleOnError = {borderBottomColor: colors.pink} : null

  return (
    <View>
      {(touched || dirty) && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
      <TextInput
            value={value}
            onChangeText={onChange}
            type={type}
            ref={ref}
            error={errors}
            placeholder={placeholder}
            style={[style, borderStyleOnError]}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            textStyle={[textStyle, textStyleOnError]}
            autoFocus={autoFocus}
            returnKeyType={returnKeyType}
            selectTextOnFocus={selectTextOnFocus}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            onSubmitEditing={onSubmitEditing}
            icon={icon}
            secureTextEntry={secureTextEntry}
            clearTextOnFocus={clearTextOnFocus}
            multiline={multiline}
            rightBar={rightBar}
            keyboardType={keyboardType}
          />
    </View>
  )
}

const renderAdressInput = ({
        input: {onChange, value, dirty, ...restInput},
        icon,
        placeholder,
        onSelect,
        textStyles,
        meta: {touched, error, warning}
      }) => {

let setColor = null

!error ? setColor = {color: "black"} : null

  return (
    <View>
      {touched && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
      <AddressInput
            icon={icon}
            placeholder={placeholder}
            value={value.description}
            onSelect={onChange}
            textStyles={[textStyles]}
            textColor={setColor}
           />
    </View>
  )
}

const renderDateInput = ({
        input: {onChange, value, ...restInput},
          ref,
          placeholder,
          type,
          icon,
          date,
          time,
          minDate,
          barStyle,
          rightBar,
          meta: {touched, error, warning, dirty}
      }) => {
let borderStyleOnError = null
let textStyleOnError = null
touched || dirty && error ? borderStyleOnError = {borderBottomColor: colors.pink} : null
touched || dirty && error ? textStyleOnError = {color: colors.pink} : null
  return (
    <View>
      {(touched || dirty) && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
      <DateInput
          ref={ref}
          placeholder={placeholder}
          type={type}
          icon={icon}
          date={date}
          time={time}
          errorStyles={[borderStyleOnError, textStyleOnError]}
          minDate={minDate}
          value={value}
          onChange={onChange}
          barStyle={barStyle}
          rightBar={rightBar}
        />
    </View>
  )
}

const AvatarInput = ({
      input: {value, onChange},
      meta: {touched, error, warning}
     }) => {
    return (
      <AvatarEdit
            onChange={onChange}
            imageUrl={value}
            style={StyleSheet.singleMargin}
        />
    )
  }

const GenderInput = ({
      input: {value, onChange},
      onPressInfoIcon,
      crossPlatformLeftPosition,
      maleActive,
      femaleActive,
      meta: {touched, error, warning}
     }) => {
    return (
      <View style={[StyleSheet.singleMarginTop, StyleSheet.signup.genderContainer]}>
        {touched && ((error && <Text style={[StyleSheet.signup.errorText]}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
        <View style={StyleSheet.signup.genderLabelContainer}>
          <Text style={[StyleSheet.text, StyleSheet.signup.genderLabel]}>Gender</Text>
          <Button
                style={[StyleSheet.signup.genderInfoIcon]}
                type="disclosure"
                icon="info"
                onPress={onPressInfoIcon}/>
        </View>
        <View style={[StyleSheet.buttons.bar, StyleSheet.singleMargin]}>
          <Button type="image" icon="male" active={value === 'male'} onPress={() => onChange('male')}/>
          <View style={StyleSheet.buttons.separator} />
          <Button type="image" icon="female" active={value === 'female'} onPress={() => onChange('female')}/>
        </View>
      </View>
    )
  }

class SignUpFacebookExtra extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      showDobInfo: false,
      showDobInfoPopup: false,
      showGenderInfoPopup: false,
      name: props.name,
      email: props.email,
      dob: isNaN(new Date(props.dob).getTime()) ? null : new Date(props.dob),
      gender: props.gender,
      cityText: '',
      city: {},
      phone: props.phone,
      image: undefined,
      facebookImageSrc: props.facebookImageSrc,
    }
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
      })
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
    }
    if(!values.image && this.state.facebookImageSrc) {
      userData.facebookImageSrc = this.state.facebookImageSrc
    }
   this.props.onPressContinue(userData)
  }

  render() {

    const errorCode = this.props.signUpError && this.props.signUpError.code

    const emailError = [
      'auth/email-already-in-use',
      'auth/invalid-email',
    ].indexOf(errorCode) !== -1

    const {handleSubmit, valid} = this.props    // redux-form meta props
    return (
      <View style={{flex: 1}}>
        <Header title={_('signupFacebook')} simple />
        {/*<LoadingAlert visible={this.props.isLoading} />*/}
        <Form style={[StyleSheet.signup.style]}>
          <Field
            name="image"
            component={AvatarInput}
          />
          <Field
            name="name"
            component={renderTextInput}
            type="flat"
            ref="name"
            placeholder={_('name')}
            validate={[required, maxChars15]}
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
            component={renderTextInput}
            type="flat"
            ref="email"
            error={emailError}
            placeholder={_('email')}
            validate={[required, email]}
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
            component={renderDateInput}
            ref="dob"
            placeholder={_('dob')}
            validate={[required, noFutureDates]}
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
            component={renderAdressInput}
            icon
            placeholder={_('city')}
            validate={required}
            onSelect={(venueAddress) => {
              this.setState({
                cityText: venueAddress.description,
                city: venueAddress,
              })
            }}
            textStyles={{color: "black"}}
           />
          <Field
            name="phone"
            component={renderTextInput}
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
            validate={required}
            onPressInfoIcon={() => this.setState({showGenderInfoPopup: true})}
          />
          <Button
            type={valid ? "roundedDefault" : "roundedGrey"}
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
  form: 'syncValidation',
})(SignUpFacebookExtra)
