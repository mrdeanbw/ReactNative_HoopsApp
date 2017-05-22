import React, {Component} from 'react'
import {View, Text} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import {Field, reduxForm} from 'redux-form'

import {AddressInput, Button, HorizontalRule, TextInput, DateInput, Form, Header, LoadingAlert, AvatarEdit} from '../components'
import {DobInfoPopup, GenderInfoPopup} from '../components/signup'
import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import _ from '../i18n'
import validation from '../config/validation'

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
        meta: {touched, error}
      }) => {

let borderStyleOnError = null
let textStyleOnError = null
let errorOutput = null

touched  && error ? borderStyleOnError = {borderBottomColor: colors.pink} : null
touched && error ? errorOutput = (<Text style={StyleSheet.signup.errorText}>{error}</Text>) : null

  return (
    <View>
      {errorOutput}
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
        autoFocus
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
        meta: {touched, error}
      }) => {
let setColor = null

!error ? setColor = {color: "black"} : null

  return (
    <View>
      {touched && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>))}
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
          meta: {touched, error, dirty}
      }) => {
let borderStyleOnError = null
let textStyleOnError = null

touched || dirty && error ? borderStyleOnError = {borderBottomColor: colors.pink} : null
touched || dirty && error ? textStyleOnError = {color: colors.pink} : null
  return (
    <View>
      {(touched || dirty) && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>))}
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
      meta: {touched, error}
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
        {touched && ((error && <Text style={[StyleSheet.signup.errorText]}>{error}</Text>))}
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
          <LoadingAlert visible={this.props.isLoading} />
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
            component={renderTextInput}
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
            component={renderTextInput}
            type="flat"
            ref="email"
            error={emailError}
            placeholder={_('email')}
            validate={[validation.required, validation.email]}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            keyboardType="email-address"
            icon="email"
          />
          <Field
            name="password"
            component={renderTextInput}
            type="flat"
            ref="password"
            placeholder={_('password')}
            validate={[validation.required, validation.minChars6]}
            style={[StyleSheet.halfMarginBottom]}
            secureTextEntry={!this.state.showPassword}
            returnKeyType="next"
            selectTextOnFocus={false}
            clearTextOnFocus={false}
            onFocus
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
            component={renderDateInput}
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
            component={renderAdressInput}
            validate={validation.required}
            icon
            placeholder={_('city')}
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
            validate={validation.required}
            onPressInfoIcon={() => this.setState({showGenderInfoPopup: true})}
          />
          <Button
            type={valid ? "roundedDefault" : "roundedGrey"}
            text={_('signup')}
            onPress={handleSubmit(this.submit)}
            style={[StyleSheet.doubleMarginTop, StyleSheet.singleMarginBottom]}
          />
          <KeyboardSpacer />
        </Form>
      </View>
    )
  }
}

SignUp.propTypes = {
  onSignUp: React.PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'syncValidation',
})(SignUp)
