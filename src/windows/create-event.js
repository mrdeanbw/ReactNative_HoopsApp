import React from 'react'
import ReactNative, {View, Text, Image, TouchableHighlight, TextInput as TextInputRN, Platform} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import {
  AddressInput, Form, Button, Header, Wizard, TextInput,
  ListInput, DateInput, Icon, CheckButton, KeyboardHandler,
} from '../components'
import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import _ from '../i18n'
import {showImagePicker} from '../utils/'

export default class CreateEvent extends React.Component {

  constructor(props) {
    super(props)
    let blankEvent = {
      title: '',
      gender: 'mixed',
      minAge: 0,
      maxAge: 0,
      privacy: 'public',
      level: 'casual',
      maxPlayers: 0,
      minPlayers: 0,

      date: null,
      endDate: null,
      courtType: 'indoor',
      recurring: false,
      recurringType: 'd',
      recurringValue: 1,
      address: '',
      addressGooglePlaceId: null,
      entryFee: 0,
      paymentMethod: '',
      deadline: null,

      description: '',
      notes: '',
      rules: '',
      allowContactInfo: false,
    }

    let eventDetails = {}
    if(props.event) {
      for(let key in blankEvent) {
        if(typeof props.event[key] === 'undefined') {
          eventDetails[key] = blankEvent[key]
        } else {
          eventDetails[key] = props.event[key]
        }
      }
    } else {
      eventDetails = blankEvent
    }

    this.state = {
      image: undefined,
      eventDetails: eventDetails,
      focus: {},
    }
  }

  setEventData = (data) => {
    this.setState({
      eventDetails: {
        ...this.state.eventDetails,
        ...data,
      },
    })
  };

  getEntryFeeLabel = () => {
    let {entryFee} = this.state.eventDetails
    if(typeof entryFee === 'number' && !isNaN(entryFee)){
      return entryFee.toString()
    }else{
      return ''
    }
  };

  getNumericLabel = (value) => {
    if(typeof value === 'number' && !isNaN(value) && value !== 0) {
      return value.toString()
    }else{
      return ''
    }
  }

  onComplete = () => {
    if(this.props.onComplete) {
      let data = this.state.eventDetails
      data.activity = this.props.activity
      if(typeof this.state.image !== 'undefined') {
        //image could have been set to null, meaning delete the image
        data.image = this.state.image
      }

      this.props.onComplete(data)
    }
  };

  scrollToInput = (scrollRef, inputRef) => {
    this.setState({
      focus: {
        ...this.state.focus,
        [scrollRef]: ReactNative.findNodeHandle(inputRef),
      },
    })
  };

  validate(stepNumber) {
    let {
      title,
      gender,
      privacy,
      level,

      date,
      courtType,
      recurring,
      recurringType,
      recurringValue,
      address,
      addressGooglePlaceId,
      entryFee,
      paymentMethod,
      deadline,

      description,
    } = this.state.eventDetails

    let activity = this.props.activity

    switch(stepNumber) {
      case 1:
        return !!(
          title &&
          activity &&
          gender &&
          privacy &&
          level
        )

      case 2:
        let isPaymentValid = true
        if (parseInt(entryFee) > 0) {
          isPaymentValid = !!(
            paymentMethod
          )
        }

        return !!(
          date &&
          courtType &&
          typeof recurring !== 'undefined' && //`recurring` is boolean
          Number.isFinite(entryFee) && //`entryFee` could be 0
          isPaymentValid
        )

      case 3:
        return !!(description)
    }
  }

  render() {
    const androidJustifyToleft =  Platform.OS === 'ios' ? null : StyleSheet.androidJustifyToLeftTextInput
    const androidMatchFontSize =  Platform.OS === 'ios' ? null : StyleSheet.androidMatchFontSize
    const androidSinglePlusPaddingBottom = Platform.OS === 'ios' ? null : StyleSheet.singlePlusPaddingBottom

    let imageSrc
    if(this.props.event) {
      imageSrc = this.props.event.image
    }
    if(typeof this.state.image !== 'undefined') {
      imageSrc = this.state.image || undefined //Make sure imageSrc is never null
    }

    console.log(this.state.eventDetails.date)
    console.log(new Date())
    console.log(this.state.eventDetails.endDate)
    return (
      <View style={{flex: 1}}>
        <Header title={this.props.editMode ? _('editEvent') : _('createEvent')} simple />
        <Wizard
          completeText={this.props.editMode ? _('save') : _('create')}
          onComplete={this.onComplete}
        >
          <Wizard.Step disabled={!this.validate(1)}>
            <Form extraKeyboardPadding={25} focusNode={this.state.focus['scrollView1']} contentContainerStyle={StyleSheet.padding}>
              <KeyboardHandler ref="kh" offset={50} keyboardShouldPersistTaps={'never'}>
                <View>
                  <TextInput
                    ref="eventName"
                    value={this.state.eventDetails.title}
                    onChangeText={(title) => this.setEventData({title})}
                    type="flat"
                    style={[StyleSheet.halfMarginTop, androidJustifyToleft]}
                    placeholder={_('eventName')}
                    blurOnSubmit={true}
                    onFocus={()=>this.refs.kh.inputFocused(this,'eventName')}
                  />
                  {/* TODO: refactor into it's own component */}

                  <TouchableHighlight
                    onPress={this.props.onPressActivity}
                    underlayColor="transparent"
                  >
                    <View style={StyleSheet.textInputs.flat.style}>
                      <Text
                        style={[
                           StyleSheet.textInputs.flat.textStyle, androidMatchFontSize,
                          {color: this.props.activity ? undefined : StyleSheet.textInputs.flat.placeholderTextColor},
                         ]}
                       >
                        {this.props.activity ? this.props.activity.name : _('activity')}
                      </Text>
                      <Icon name="chevronRightPink"/>
                    </View>
                  </TouchableHighlight>

                  <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMargin, {alignSelf: 'center'}]}>
                    <Button type="image" icon="male" active={this.state.eventDetails.gender === 'male'} onPress={() => this.setEventData({gender: 'male'})}/>
                    <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                    <Button type="image" icon="female" active={this.state.eventDetails.gender === 'female'} onPress={() => this.setEventData({gender: 'female'})}/>
                    <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                    <Button type="image" icon="mixed" active={this.state.eventDetails.gender === 'mixed'} onPress={() => this.setEventData({gender: 'mixed'})}/>
                  </View>

                  <View style={[StyleSheet.buttons.bar, StyleSheet.halfMarginTop]}>
                    <TextInput
                     ref="minAgeInput"
                     type="flat"
                     keyboardType="numeric"
                     placeholder={_('minAge')}
                     value={this.getNumericLabel(this.state.eventDetails.minAge)}
                     onChangeText={minAge => {
                      this.setEventData({
                        minAge: minAge === '' ? '' : parseInt(minAge, 10)
                      })
                    }}
                    style={[androidJustifyToleft , {flex: 1, marginRight: 25}]}
                    onFocus={()=>this.refs.kh.inputFocused(this,'minAgeInput')}
                  />
                    <Button
                      type="roundedGrey"
                      active={!this.state.eventDetails.minAge}
                      text={_('unlimited')}
                      onPress={() => this.setEventData({minAge: 0})}
                      style={{width: 110}}
                    />
                  </View>
                  <View style={[StyleSheet.buttons.bar, StyleSheet.halfMarginTop]}>
                    <TextInput
                      ref="maxAgeInput"
                      type="flat"
                      keyboardType="numeric"
                      placeholder={_('maxAge')}
                      value={this.getNumericLabel(this.state.eventDetails.maxAge)}
                      onChangeText={maxAge => {
                      this.setEventData({
                        maxAge: maxAge === '' ? '' : parseInt(maxAge, 10)
                      })
                    }}
                    style={[androidJustifyToleft ,  {flex: 1, marginRight: 25}]}
                    onFocus={()=>this.refs.kh.inputFocused(this,'maxAgeInput')}
                    />
                    <Button
                      type="roundedGrey"
                      active={!this.state.eventDetails.maxAge}
                      text={_('unlimited')}
                      onPress={() => this.setEventData({maxAge: 0})}
                      style={{width: 110}}
                    />
                  </View>

                  <ListInput
                    type="flat"
                    style={[StyleSheet.halfMarginTop , androidSinglePlusPaddingBottom]}
                    disabled={this.props.editMode}
                    placeholder={_('privacy')}
                    value={this.state.eventDetails.privacy}
                    onChange={(privacy) => this.setEventData({privacy})}
                  >
                    <ListInput.Item text={_('publicEvent')} value="public" />
                    <ListInput.Item text={_('privateEvent')} value="private" />
                  </ListInput>

                  <ListInput
                    type="flat"
                    style={[StyleSheet.halfMarginTop,  androidSinglePlusPaddingBottom]}
                    placeholder={_('level')}
                    value={this.state.eventDetails.level}
                    onChange={(level) => this.setEventData({level})}
                  >
                    <ListInput.Item text={_('casual')} value="casual" />
                    <ListInput.Item text={_('competitive')} value="competitive" />
                    <ListInput.Item text={_('open')} value="open" />
                  </ListInput>

                  <View style={[StyleSheet.buttons.bar, StyleSheet.singleMarginTop]}>
                    <TextInput
                      ref="minPlayersInput"
                      type="flat"
                      keyboardType="numeric"
                      placeholder={_('minPlayers')}
                      value={this.getNumericLabel(this.state.eventDetails.minPlayers)}
                      onChangeText={minPlayers => {
                      this.setEventData({
                        minPlayers: minPlayers === '' ? '' : parseInt(minPlayers, 10)
                      })
                    }}
                    style={[androidJustifyToleft , {flex: 1, marginRight: 25}]}
                    onFocus={()=>this.refs.kh.inputFocused(this,'minPlayersInput')}
                    />
                    <Button
                      type="roundedGrey"
                      active={!this.state.eventDetails.minPlayers}
                      text={_('unlimited')}
                      onPress={() => this.setEventData({minPlayers: 0})}
                      style={{width: 110}}
                    />
                  </View>
                  <View style={[StyleSheet.buttons.bar, StyleSheet.halfMarginTop ]}>
                    <TextInput
                      ref="maxPlayersInput"
                      type="flat"
                      keyboardType="numeric"
                      placeholder={_('maxPlayers')}
                      value={this.getNumericLabel(this.state.eventDetails.maxPlayers)}
                      onChangeText={maxPlayers => {
                      this.setEventData({
                        maxPlayers: maxPlayers === '' ? '' : parseInt(maxPlayers, 10)
                        })
                      }}
                      style={[androidJustifyToleft ,  {flex: 1, marginRight: 25}]}
                      onFocus={()=>this.refs.kh.inputFocused(this,'maxPlayersInput')}
                    />
                    <Button
                      type="roundedGrey"
                      active={!this.state.eventDetails.maxPlayers}
                      text={_('unlimited')}
                      onPress={() => this.setEventData({maxPlayers: 0})}
                      style={{width: 110}}
                    />
                  </View>
                </View>
              </KeyboardHandler>
            </Form>
          </Wizard.Step>

          <Wizard.Step disabled={!this.validate(2)}>
            <Form extraKeyboardPadding={25} focusNode={this.state.focus['scrollView2']} contentContainerStyle={StyleSheet.padding}>
              <DateInput
                placeholder={_('startDateTime')}
                value={this.state.eventDetails.date}
                date={true} time={true}
                minDate={new Date()}
                onChange={(date) => this.setEventData({date})}
              />
              <DateInput
                placeholder={_('endDateTime')}
                value={this.state.eventDetails.endDate}
                date={true} time={true}
                minDate={this.state.eventDetails.date ? this.state.eventDetails.date : new Date()}
                onChange={(endDate) => this.setEventData({endDate})}
              />

              <View>
                <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMarginTop, {alignSelf: 'center'}]}>
                  <Button type="roundedGrey" active={this.state.eventDetails.courtType === 'indoor'} text={_('indoor')} onPress={() => this.setEventData({courtType: 'indoor'})} style={{width: 110}}/>
                  <Text style={[StyleSheet.text, StyleSheet.horizontalRule.textStyle, {flex: 1}]}>{_('or').toUpperCase()}</Text>
                  <Button type="roundedGrey" active={this.state.eventDetails.courtType === 'outdoor'} text={_('outdoor')} onPress={() => this.setEventData({courtType: 'outdoor'})} style={{width: 110}}/>
                </View>
              </View>

              {/* <View>
                <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMarginTop, {alignSelf: 'center'}]}>
                  <Button type="roundedGrey" active={this.state.eventDetails.recurring === false} text={_('oneTime')} onPress={() => this.setEventData({recurring: false})} style={{width: 110}}/>
                  <Text style={[StyleSheet.text, StyleSheet.horizontalRule.textStyle, {flex: 1}]}>{_('or').toUpperCase()}</Text>
                  <Button type="roundedGrey" active={this.state.eventDetails.recurring === true} text={_('recurring')} onPress={() => this.setEventData({recurring: true})} style={{width: 110}}/>
                </View>
              </View>*/}

              {/*{this.state.eventDetails.recurring && (
                <View style={[StyleSheet.doubleMarginTop, {flex:1, flexDirection: 'row'}]}>
                  <Text style={[{flex: 1, marginTop: 14, marginRight: 25, color: StyleSheet.colors.pink, fontSize: 13}]}>
                    {_('recurEvery').toUpperCase()}
                  </Text>
                  <TextInput
                    ref="recurringValue"
                    type="flat"
                    keyboardType="numeric"
                    value={this.state.eventDetails.recurringValue.toString()}
                    onChangeText={recurringValue => this.setEventData({recurringValue})}
                    style={{flex: 1, marginRight: 25}}
                    disabled={!this.state.eventDetails.recurring}
                    onFocus={() => {
                      this.scrollToInput('scrollView2', this.refs.recurringValue)
                    }}
                  />
                  <ListInput
                    type="flat"
                    value={this.state.eventDetails.recurringType}
                    containerStyle={{flex:1}}
                    onChange={(recurringType) => this.setEventData({recurringType})}
                    disabled={!this.state.eventDetails.recurring}
                  >
                    <ListInput.Item text={_('days')} value="d" />
                    <ListInput.Item text={_('weeks')} value="w" />
                  </ListInput>
                </View>
              )}*/}

              <View style={StyleSheet.halfMarginTop}>
                <AddressInput
                  value={this.state.eventDetails.address}
                  placeholder={_('venueAddress')}
                  onSelect={(venueAddress) => {
                    this.setEventData({
                      address: venueAddress.description,
                      addressGooglePlaceId: venueAddress.place_id,
                    })
                  }} />

                <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMarginTop, StyleSheet.textInputs.flat.style, {borderBottomColor: "transparent"}]}>
                  <TextInput
                    ref="costInput"
                    disabled={this.props.editMode}
                    type="flat"
                    keyboardType="numeric"
                    placeholder={_('costPP')}
                    value={this.getEntryFeeLabel()}
                    prefix={this.getEntryFeeLabel() !== '' && '£'}
                    onChangeText={entryFee => {
                      this.setEventData({
                        entryFee: entryFee === '' ? '' : parseInt(entryFee, 10)
                      })
                    }}
                    textStyle={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                    style={{flex: 1, marginRight: 25}}
                    onFocus={() => {
                      this.scrollToInput('scrollView2', this.refs.costInput)
                    }}
                  />
                  <View>
                    <Button
                      type="roundedGrey"
                      active={!this.props.editMode && this.state.eventDetails.entryFee === 0}
                      text={_('free')}
                      onPress={this.props.editMode ? undefined : () => this.setEventData({entryFee: 0})}
                      style={{width: 110}}
                    />
                  </View>
                </View>

                {parseInt(this.getEntryFeeLabel()) > 0 && (
                  <ListInput
                    type="flat"
                    style={StyleSheet.halfMarginTop}
                    placeholder={_('paymentMethod')}
                    disabled={this.props.editMode}
                    value={this.state.eventDetails.paymentMethod}
                    onChange={(paymentMethod) => {
                      if(paymentMethod === 'app') {
                        this.props.onSelectAppPayments()
                      }
                      this.setEventData({paymentMethod})
                    }}
                  >
                    <ListInput.Item text={_('inAppPayment')} value="app" />
                    <ListInput.Item text={_('cashOnSite')} value="cash" />
                    {/*<ListInput.Item text={_('unrestricted')} value={"unrestricted"} />*/}
                  </ListInput>
                )}

                {parseInt(this.getEntryFeeLabel()) > 0 && (
                  <DateInput
                    placeholder={_('deadline')}
                    value={this.state.eventDetails.deadline}
                    style={StyleSheet.halfMarginTop}
                    date={true} time={true}
                    minDate={new Date()}
                    onChange={(deadline) => this.setEventData({deadline})}
                  />
                )}
              </View>

              <KeyboardSpacer/>
            </Form>
          </Wizard.Step>

          <Wizard.Step disabled={!this.validate(3)}>
            <Form extraKeyboardPadding={25}>
              <View style={StyleSheet.padding}>

                <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.grey}}>
                  <TextInputRN
                    value={this.state.eventDetails.description}
                    placeholder={_('eventDescription')}
                    onChangeText={(description) => this.setEventData({description})}
                    underlineColorAndroid="transparent"
                    autoFocus
                    multiline
                    blurOnSubmit={true}
                    style={[
                      StyleSheet.text,
                      {color: '#7B7B7B', flex: 1, height: 60}
                    ]}
                  />
                </View>

                <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.grey}}>
                  <TextInputRN
                    value={this.state.eventDetails.notes}
                    placeholder={_('notes')}
                    onChangeText={(notes) => this.setEventData({notes})}
                    underlineColorAndroid="transparent"
                    multiline
                    blurOnSubmit={true}
                    style={[
                      StyleSheet.text,
                      {color: '#7B7B7B', flex: 1, height: 60}
                    ]}
                  />
                </View>

                <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.grey}}>
                  <TextInputRN
                    value={this.state.eventDetails.rules}
                    placeholder={_('rules')}
                    onChangeText={(rules) => this.setEventData({rules})}
                    underlineColorAndroid="transparent"
                    multiline
                    blurOnSubmit={true}
                    style={[
                      StyleSheet.text,
                      {color: '#7B7B7B', flex: 1, height: 60}
                    ]}
                  />
                </View>
              </View>
              <CheckButton
                  type="wizardCheck"
                  text={_('allowToSeeYourContactInfo')}
                  icon="none" checkIcon="check"
                  checkedIconStyle={{backgroundColor: 'transparent'}}
                  colorMode="whitePinkBorder"
                  checked={this.state.eventDetails.allowContactInfo}
                  onChange={() => {
                    this.setEventData({
                      allowContactInfo: !this.state.eventDetails.allowContactInfo,
                    })
                  }}
              />
              <CheckButton
                type="wizardCheck"
                text={_('eventPicture')}
                icon="plusActive" checkIcon="minus"
                checkedIconStyle={{backgroundColor: 'transparent'}}
                colorMode="whitePinkBorder"
                checked={!!imageSrc}
                onChange={(value) => {
                  if(value) {
                    showImagePicker((image) => this.setState({image}))}
                    else {this.setState({image: undefined})}
                }}
              />
              <Image
                source={{uri: imageSrc}}
                style={{ resizeMode: 'cover', height: 180, width: null }}
              />
            </Form>
          </Wizard.Step>
        </Wizard>
      </View>
    )
  }
}
