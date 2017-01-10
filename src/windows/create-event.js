import React from 'react';
import ReactNative, {View, Text, ScrollView, Image, ImagePickerIOS, TouchableHighlight} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {Form, Button, Header, Wizard, TextInput, ListInput, DateInput, Icon, CheckButton} from '../components';
import StyleSheet from '../styles';
import {autocomplete} from '../data/google-places';
import _ from '../i18n';

export default class CreateEvent extends React.Component {

  constructor(props) {
    super(props);
    let event = props.event || {};
    let blankEvent = {
      title: '',
      gender: '',
      minAge: 0,
      maxAge: 0,
      privacy: '',
      level: '',
      maxPlayers: 0,
      minPlayers: 0,

      date: null,
      endDate: null,
      courtType: '',
      recurring: false,
      recurringType: 'd',
      recurringValue: 1,
      address: {},
      entryFee: 0,
      paymentMethod: '',
      deadline: null,

      description: '',
      notes: '',
      rules: '',
      allowContactInfo: false,
    };

    let eventDetails = {};
    if(props.event) {
      for(let key in blankEvent) {
        if(typeof props.event[key] === 'undefined') {
          eventDetails[key] = blankEvent[key];
        } else {
          eventDetails[key] = props.event[key];
        }
      }

      eventDetails.address = {
        key: props.event.addressGooglePlaceId,
        text: props.event.address,
      };
    } else {
      eventDetails = blankEvent;
    }

    this.state = {
      addressText: event.address,
      addressAutocomplete: [],
      image: undefined,
      eventDetails: eventDetails,
      focus: {},
    };
  }

  setEventData = (data) => {
    this.setState({
      eventDetails: {
        ...this.state.eventDetails,
        ...data,
      },
    });
  };

  getEntryFeeLabel = () => {
    let {entryFee} = this.state.eventDetails;
    if(typeof entryFee === 'number' && !isNaN(entryFee)){
      return entryFee.toString();
    }else{
      return '';
    }
  };

  getNumericLabel = (value) => {
    if(typeof value === 'number' && !isNaN(value) && value !== 0) {
      return value.toString();
    }else{
      return '';
    }
  }

  onComplete = () => {
    if(this.props.onComplete) {
      let data = this.state.eventDetails;
      data.activity = this.props.activity;
      if(typeof this.state.image !== 'undefined') {
        //image could have been set to null, meaning delete the image
        data.image = this.state.image;
      }

      this.props.onComplete(data);
    }
  };

  scrollToInput = (scrollRef, inputRef) => {
    this.setState({
      focus: {
        ...this.state.focus,
        [scrollRef]: ReactNative.findNodeHandle(inputRef),
      },
    });
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
      entryFee,
      paymentMethod,
      deadline,

      description,
    } = this.state.eventDetails;

    let activity = this.props.activity;

    switch(stepNumber) {
      case 1:
        return !!(
          title &&
          activity &&
          gender &&
          privacy &&
          level
        );

      case 2:
        return !!(
          date &&
          courtType &&
          typeof recurring !== 'undefined' && //`recurring` is boolean
          address && address.key &&
          Number.isFinite(entryFee) && //`entryFee` could be 0
          paymentMethod &&
          deadline
        );

      case 3:
        return !!(description);
    }

  }

  render() {
    let imageSrc;
    if(this.props.event) {
      imageSrc = this.props.event.imageSrc;
    }
    if(typeof this.state.image !== 'undefined') {
      imageSrc = this.state.image || undefined; //Make sure imageSrc is never null
    }

    return (
      <View style={{flex: 1}}>
        <Header
          title={_('createEvent')}
          onClose={this.props.onClose}
          hideSwitcher={true}
        />

        <Wizard
          completeText={this.props.editMode ? _('save') : _('create')}
          onComplete={this.onComplete}
        >

          <Wizard.Step disabled={!this.validate(1)}>
            <Form extraKeyboardPadding={25} focusNode={this.state.focus['scrollView1']} contentContainerStyle={StyleSheet.padding}>
              <TextInput
                value={this.state.eventDetails.title}
                onChangeText={(title) => this.setEventData({title})}
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('eventName')}
                blurOnSubmit={true}
              />

              {/* TODO: refactor into it's own component */}
              <TouchableHighlight
                onPress={this.props.onPressActivity}
                underlayColor="transparent"
              >
                <View style={StyleSheet.textInputs.flat.style}>
                  <Text
                    style={[
                      StyleSheet.textInputs.flat.textStyle,
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
                    });
                  }}
                  style={{flex: 1, marginRight: 25}}
                  onFocus={() => {
                    this.scrollToInput('scrollView1', this.refs.minAgeInput);
                  }}
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
                    });
                  }}
                  style={{flex: 1, marginRight: 25}}
                  onFocus={() => {
                    this.scrollToInput('scrollView1', this.refs.maxAgeInput);
                  }}
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
                style={StyleSheet.halfMarginTop}
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
                style={StyleSheet.halfMarginTop}
                placeholder={_('level')}
                value={this.state.eventDetails.level}
                onChange={(level) => this.setEventData({level})}
              >
                <ListInput.Item text={_('casual')} value="casual" />
                <ListInput.Item text={_('competitive')} value="competitive" />
                <ListInput.Item text={_('open')} value="open" />
              </ListInput>

              <View style={[StyleSheet.buttons.bar, StyleSheet.halfMarginTop]}>
                <TextInput
                  ref="maxPlayersInput"
                  type="flat"
                  keyboardType="numeric"
                  placeholder={_('maxPlayers')}
                  value={this.getNumericLabel(this.state.eventDetails.maxPlayers)}
                  onChangeText={maxPlayers => {
                    this.setEventData({
                      maxPlayers: maxPlayers === '' ? '' : parseInt(maxPlayers, 10)
                    });
                  }}
                  style={{flex: 1, marginRight: 25}}
                  onFocus={() => {
                    this.scrollToInput('scrollView1', this.refs.maxPlayersInput);
                  }}
                />
                <Button
                  type="roundedGrey"
                  active={!this.state.eventDetails.maxPlayers}
                  text={_('unlimited')}
                  onPress={() => this.setEventData({maxPlayers: 0})}
                  style={{width: 110}}
                />
              </View>
              <View style={[StyleSheet.buttons.bar, StyleSheet.halfMarginTop]}>
                <TextInput
                  ref="minPlayersInput"
                  type="flat"
                  keyboardType="numeric"
                  placeholder={_('minPlayers')}
                  value={this.getNumericLabel(this.state.eventDetails.minPlayers)}
                  onChangeText={minPlayers => {
                    this.setEventData({
                      minPlayers: minPlayers === '' ? '' : parseInt(minPlayers, 10)
                    });
                  }}
                  style={{flex: 1, marginRight: 25}}
                  onFocus={() => {
                    this.scrollToInput('scrollView1', this.refs.minPlayersInput);
                  }}
                />
                <Button
                  type="roundedGrey"
                  active={!this.state.eventDetails.minPlayers}
                  text={_('unlimited')}
                  onPress={() => this.setEventData({minPlayers: 0})}
                  style={{width: 110}}
                />
              </View>


            </Form>
          </Wizard.Step>

          <Wizard.Step disabled={!this.validate(2)}>
            <Form extraKeyboardPadding={25} focusNode={this.state.focus['scrollView2']} contentContainerStyle={StyleSheet.padding}>
              <DateInput
                type="flat"
                placeholder={_('startDateTime')}
                value={this.state.eventDetails.date}
                rightBar={<Icon name="listIndicator" />}
                date={true} time={true}
                initialValue={new Date()}
                onChange={(date) => this.setEventData({date})}
              />

              <DateInput
                type="flat"
                placeholder={_('endDateTime')}
                value={this.state.eventDetails.endDate}
                rightBar={<Icon name="listIndicator" />}
                date={true} time={true}
                initialValue={this.state.date || new Date()}
                onChange={(endDate) => this.setEventData({endDate})}
              />

              <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMarginTop, {alignSelf: 'center'}]}>
                <Button type="roundedGrey" active={this.state.eventDetails.courtType === 'indoor'} text={_('indoor')} onPress={() => this.setEventData({courtType: 'indoor'})} style={{width: 110}}/>
                <Text style={[StyleSheet.text, StyleSheet.horizontalRule.textStyle, {flex: 1}]}>{_('or').toUpperCase()}</Text>
                <Button type="roundedGrey" active={this.state.eventDetails.courtType === 'outdoor'} text={_('outdoor')} onPress={() => this.setEventData({courtType: 'outdoor'})} style={{width: 110}}/>
              </View>

              <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMarginTop, {alignSelf: 'center'}]}>
                <Button type="roundedGrey" active={this.state.eventDetails.recurring === true} text={_('recurring')} onPress={() => this.setEventData({recurring: true})} style={{width: 110}}/>
                <Text style={[StyleSheet.text, StyleSheet.horizontalRule.textStyle, {flex: 1}]}>{_('or').toUpperCase()}</Text>
                <Button type="roundedGrey" active={this.state.eventDetails.recurring === false} text={_('oneTime')} onPress={() => this.setEventData({recurring: false})} style={{width: 110}}/>
              </View>

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
                      this.scrollToInput('scrollView2', this.refs.recurringValue);
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

              <View style={StyleSheet.halfMarginTop}>
                <TextInput
                  value={this.state.addressText}
                  onChangeText={(addressText) => {
                    this.setState({addressText});
                    autocomplete(addressText, '').then(result => {
                      this.setState({addressAutocomplete: result.predictions});
                    });
                  }}
                  ref="venueAddressInput"
                  type="flat"
                  style={StyleSheet.halfMarginTop}
                  placeholder={_('venueAddress')}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.refs.costInput.focus();
                  }}
                  onFocus={() => {
                    this.scrollToInput('scrollView2', this.refs.venueAddressInput);
                  }}
                  autocomplete={this.state.addressAutocomplete.map(prediction => ({
                    key: prediction.place_id,
                    text: prediction.description,
                  }))}
                  onAutocompletePress={(prediction) => {
                    this.setState({
                      addressText: prediction.text,
                      addressAutocomplete: [],
                    });
                    this.setEventData({address: prediction});
                  }}
                />
                
                <View style={[StyleSheet.buttons.bar, StyleSheet.halfMarginTop]}>
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
                      });
                    }}
                    style={{flex: 1, marginRight: 25}}
                    onFocus={() => {
                      this.scrollToInput('scrollView2', this.refs.costInput);
                    }}
                  />
                  <Button
                    type="roundedGrey"
                    active={!this.props.editMode && this.state.eventDetails.entryFee === 0}
                    text={_('free')}
                    onPress={this.props.editMode ? undefined : () => this.setEventData({entryFee: 0})}
                    style={{width: 110}}
                  />
                </View>

                <ListInput
                  type="flat"
                  style={StyleSheet.halfMarginTop}
                  placeholder={_('paymentMethod')}
                  disabled={this.props.editMode}
                  value={this.state.eventDetails.paymentMethod}
                  onChange={(paymentMethod) => {
                    if(paymentMethod === 'app' || paymentMethod === 'unrestricted') {
                      this.props.onSelectAppPayments();
                    }
                    this.setEventData({paymentMethod});
                  }}
                >
                  <ListInput.Item text={_('inAppPayment')} value="app" />
                  <ListInput.Item text={_('cashOnSite')} value="cash" />
                  <ListInput.Item text={_('unrestricted')} value={"unrestricted"} />
                </ListInput>

                <DateInput
                  type="flat"
                  placeholder={_('deadline')}
                  value={this.state.eventDetails.deadline}
                  style={StyleSheet.halfMarginTop}
                  rightBar={<Icon name="listIndicator" />}
                  date={true} time={true}
                  initialValue={new Date()}
                  onChange={(deadline) => this.setEventData({deadline})}
                />

              </View>
            </Form>
          </Wizard.Step>



          <Wizard.Step disabled={!this.validate(3)}>
            <Form extraKeyboardPadding={25}>
              <View style={StyleSheet.padding}>
                <TextInput type="flat"
                       multiline="popup"
                       value={this.state.eventDetails.description}
                       placeholder={_('eventDescription')}
                       rightBar={<Icon name="listIndicator" />}
                       onChangeText={(description) => this.setEventData({description})}
                       modalTitle={_('describeThisEvent')}
                       modalPlaceholder={_('enterYourDescription')} />

                <TextInput type="flat"
                       multiline="popup"
                       value={this.state.eventDetails.notes}
                       placeholder={_('notes')}
                       rightBar={<Icon name="listIndicator" />}
                       onChangeText={(notes) => this.setEventData({notes})}
                       modalTitle={_('eventNotes')}
                       modalPlaceholder={_('enterYourNotesForThisEvent')}
                       style={StyleSheet.halfMarginTop}/>

                <TextInput type="flat"
                       multiline="popup"
                       value={this.state.eventDetails.rules}
                       placeholder={_('rules')}
                       rightBar={<Icon name="listIndicator" />}
                       onChangeText={(rules) => this.setEventData({rules})}
                       modalTitle={_('eventRules')}
                       modalPlaceholder={_('enterYourRules')}
                       style={StyleSheet.halfMarginTop}/>
              </View>

              <CheckButton
                type="wizardCheck"
                text={_('allowToSeeYourContactInfo')}
                icon="none" checkIcon="check"
                checked={this.state.eventDetails.allowContactInfo}
                onChange={() => {
                  this.setEventData({
                    allowContactInfo: !this.state.eventDetails.allowContactInfo,
                  });
                }}
              />

              <CheckButton
                type="wizardCheck"
                text={_('eventPicture')}
                icon="none" checkIcon="minus"
                checked={!!imageSrc}
                onChange={(value) => {
                  if(value) {
                    ImagePickerIOS.openSelectDialog({}, (result) => {
                      this.setState({image: result});
                    }, (err) => {
                      console.warn(err); //eslint-disable-line no-console
                    });
                  } else {
                    this.setState({image: null});
                  }
                }}
              />
              <Image
                source={{uri: imageSrc}}
                style={{ resizeMode: 'cover', height: 180, width: null }}
              />

            </Form>
          </Wizard.Step>
        </Wizard>
        <KeyboardSpacer/>
      </View>
    );
  }
}
