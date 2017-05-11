import React, {Component} from 'react'
import {View, Text, Platform} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Field, reduxForm } from 'redux-form'  // Field Component and reduxForm function  need to be imported from redux-form

import {AddressInput, Button, HorizontalRule, TextInput, DateInput, Form, Header, LoadingAlert, AvatarEdit, Popup} from '../components'
import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import _ from '../i18n'


// -- -- -- -- -- -- redux-form validation staff  << BEGIN >>-- -- -- -- -- -- --
 // import validation library
const validation = require('../config/validation')

// -- -- -- -- -- -- redux-form validation staff  << BEGIN >>-- -- -- -- -- -- --
 // passing values into validation function
const validate = values => {
  const errors = {}
  // Name validation
  if (validation.Required(values.name)) {
    errors.name = 'Required'
  } else if (validation.StringIsShorterOrEqual(values.name, 15)) {
    errors.name = 'Must be 15 characters or less'
  }
  //Email validation
  if (validation.Required(values.email)) {
    errors.email = 'Required'
  } else if (validation.EmailIsValid(values.email)) {
    errors.email = 'Invalid email address'
  }
  //Password validation
  if (validation.Required(values.password)) {
    errors.password = 'Required'
  } else if (validation.StringIsLongerOrEqual(values.password, 6)) {
    errors.password = 'Password  must be at least 6 charakters.'
  }
/*
  //phone validation
  if (!values.phone) {
    errors.phone = 'Required'
  }
*/
  //address validation
  if (validation.Required(values.address)) {
    errors.address = 'Required'
  }
  //dob validation
  if (validation.Required(values.dob)) {
    errors.dob = 'Required'
  } else if (validation.noFutureDates(values.dob)) {
      errors.dob = 'Invalid date of birth'
  }

  //address validation
  if (validation.Required(values.gender)) {
    errors.gender = 'Required'
  }


  return errors
}
 // passing values into warning function
const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}



//TextInput component for redux Field
const renderTextInput = ({
        input: { onChange, ...restInput },
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
        meta: { touched, error, warning, dirty,invalid, }
      }) => {

let borderStyleOnError = null
let textStyleOnError = null

touched || dirty && error ? borderStyleOnError = { borderBottomColor: colors.pink} : null

  return (
    <View>
      {  (touched || dirty) && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
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
//Address Input component for redux Field
const renderAdressInput = ({
        input: { onChange, value, dirty, ...restInput },
        icon,
        placeholder,
        onSelect,
        textStyles,
        meta: { touched, error, warning }
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

//DateInput component for redux Field
const renderDateInput = ({
        input: { onChange, value, ...restInput },
          ref,
          placeholder,
          type,
          icon,
          date,
          time,
          minDate,
          barStyle,
          rightBar,
          meta: { touched, error, warning, dirty }
      }) => {
let borderStyleOnError = null
let textStyleOnError = null

touched || dirty && error ? borderStyleOnError = { borderBottomColor: colors.pink} : null
touched || dirty && error ? textStyleOnError = { color: colors.pink} : null
  return (
    <View>
      {dirty && ((error && <Text style={StyleSheet.signup.errorText}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
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
//AvatarInput component for redux Field
const AvatarInput = ({
      input: { value, onChange },
      meta: { touched, error, warning }
     }) => {
    return (
      <AvatarEdit
            onChange={onChange}
            imageUrl={value}
            style={StyleSheet.singleMargin}
        />
    )
  }
//GenderInput component for redux Field
const GenderInput = ({
      input: { value, onChange },
      onPressInfoIcon,
      crossPlatformLeftPosition,
      maleActive,
      femaleActive,
      meta: { touched, error, warning }
     }) => {
    return (
      <View style={[StyleSheet.singleMarginTop, StyleSheet.signup.genderContainer]}>
      {touched && ((error && <Text style={[StyleSheet.signup.errorText]}>{error}</Text>) || (warning && <Text>{warning}</Text>))}
        <View style={StyleSheet.signup.genderLabelContainer}>
          <Text style={[StyleSheet.text, StyleSheet.signup.genderLabel]}>Gender</Text>
          <Button
                style={[StyleSheet.signup.genderInfoIcon, crossPlatformLeftPosition]}
                type="disclosure"
                icon="info"
                onPress={onPressInfoIcon}/>
        </View>
        <View style={[StyleSheet.buttons.bar, StyleSheet.singleMargin]}>
          <Button type="image" icon="male" active={value === 'male'} onPress={() => onChange('male') }/>
          <View style={StyleSheet.buttons.separator} />
          <Button type="image" icon="female" active={value === 'female'} onPress={() => onChange('female')}/>
        </View>
      </View>

    )
  }

// -- -- -- -- -- -- redux-form validation staff  << END >>-- -- -- -- -- -- --

/**
 * Window/Signup Component
 */
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

    const androidMatchFontSize =  Platform.OS === 'ios' ? null : StyleSheet.androidMatchFontSizeSmall
    const crossPlatformLeftPosition = Platform.OS === 'ios' ? StyleSheet.leftSmaller : StyleSheet.leftBigger

    const { handleSubmit, valid } = this.props    // redux-form meta props

    return (
      <View style={{flex: 1}} onPress={handleSubmit}>
        <Header
          title={_('signup')}
          hideSwitcher={true}
          onClose={this.props.onClose}
          onBack={this.props.onBack}
        />
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
            style={StyleSheet.halfMarginBottom}
            autoCapitalize="words"
            autoCorrect={false}
            textStyle={androidMatchFontSize}
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
            style={[StyleSheet.halfMarginBottom]}
            textStyle={androidMatchFontSize}
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
            component={renderTextInput}
            type="flat"
            ref="password"
            placeholder={_('password')}
            style={[StyleSheet.halfMarginBottom]}
            secureTextEntry={!this.state.showPassword}
            textStyle={androidMatchFontSize}
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
            component={renderDateInput}
            ref="dob"
            placeholder={_('dob')}
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
            textStyles={{color: "black"}}
           />
          <Field
            name="phone"
            component={renderTextInput}
            type="flat"
            ref="phone"
            placeholder={_('optionalPhone')}
            textStyle={androidMatchFontSize}
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
            crossPlatformLeftPosition={crossPlatformLeftPosition}
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
  form: 'syncValidation',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(SignUp)

class DobInfoPopup extends Component {

  render() {
    return (
      <Popup visible={this.props.visible}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle]}>
            {_('dobPopupTitle')}
          </Text>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop, StyleSheet.doubleLineHeight]}>
            {_('dobPopupContent1')}
          </Text>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop, StyleSheet.doubleLineHeight]}>
            {_('dobPopupContent2')}
          </Text>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop, StyleSheet.doubleLineHeight]}>
            {_('dobPopupContent3')}
          </Text>
        </View>

        <View style={StyleSheet.buttons.bar}>
          <Button
            style={[StyleSheet.buttons.okPopup]}
            textStyle={StyleSheet.whiteText}
            type="alertDefault"
            text={_('ok')}
            onPress={this.props.onPressOk}
          />
        </View>
      </Popup>
    )
  }
}

class GenderInfoPopup extends Component {

  render() {
    return (
      <Popup visible={this.props.visible}>
        <View style={[StyleSheet.dialog.alertContentStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertTitleStyle]}>
            {_('genderPopupTitle')}
          </Text>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop, StyleSheet.doubleLineHeight]}>
            {_('genderPopupContent1')}
          </Text>
          <Text style={[StyleSheet.text, StyleSheet.dialog.alertBodyStyle, StyleSheet.singleMarginTop, StyleSheet.doubleLineHeight]}>
            {_('genderPopupContent2')}
          </Text>
        </View>

        <View style={StyleSheet.buttons.bar}>
          <Button
            style={[StyleSheet.buttons.okPopup]}
            textStyle={StyleSheet.whiteText}
            type="alertDefault"
            text={_('ok')}
            onPress={this.props.onPressOk}
          />
        </View>
      </Popup>
    )
  }
}
