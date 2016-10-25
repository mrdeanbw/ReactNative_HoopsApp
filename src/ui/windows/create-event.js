
import _ from '../i18n';
import React from 'react';
import ReactNative from 'react-native';
import {View, Text, ScrollView, Image, ImagePickerIOS} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {Button, Header, Wizard, TextInput, ListInput, DateInput, Icon, CheckButton} from '../components';
import StyleSheet from '../styles';

import {autocomplete} from '../../data/google-places';

export default class CreateEvent extends React.Component {

  constructor() {
    super();
    this.state = {
      gallery: true,
      addressText: '',
      addressAutocomplete: [],
      activityText: '',
      eventDetails: {
        activity: {},
        address: {},
      },
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

  getMaxPlayersLabel = () => {
    let {maxPlayers} = this.state.eventDetails;
    if(typeof maxPlayers === 'number' && !isNaN(maxPlayers) && maxPlayers !== 0){
      return maxPlayers.toString();
    }else{
      return '';
    }
  };

  onComplete = () => {
    if(this.props.onComplete) {
      this.props.onComplete(this.state.eventDetails);
    }
  };

  onChangeEventPicture = (value) => {
    if(value) {
      this.setState({eventPicture: StyleSheet.images.basketballCover});
    } else {
      this.setState({eventPicture: null});
    }
  };

  scrollToInput = (scrollRef, inputRef) => {
    let scrollResponder = scrollRef.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      ReactNative.findNodeHandle(inputRef),
      150,
      true
    );
  };

  validate(stepNumber) {
    let {
      title,
      activity,
      gender,
      ageGroup,
      privacy,
      level,

      date,
      courtType,
      recurring,
      venueName,
      address,
      entryFee,
      paymentMethod,
      deadline,

      description,
    } = this.state.eventDetails;

    switch(stepNumber) {
      case 1:
        return !!(
          title &&
          activity && activity.key &&
          gender &&
          ageGroup &&
          privacy &&
          level
        );

      case 2:
        return !!(
          date &&
          courtType &&
          typeof recurring !== 'undefined' && //`recurring` is boolean
          venueName &&
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
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('createEvent')}
          onClose={this.props.onClose}
          hideSwitcher={true}
        />

        <Wizard completeText={_('create')} onComplete={this.onComplete}>


          <Wizard.Step disabled={!this.validate(1)}>
            <ScrollView ref="scrollView1" contentContainerStyle={StyleSheet.padding}>
              <TextInput
                value={this.state.eventDetails.title}
                onChangeText={(title) => this.setEventData({title})}
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('eventName')}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.refs.activityInput.focus();
                }}
              />
              <TextInput
                value={this.state.activityText}
                onChangeText={(activityText) => {
                  this.setState({activityText});
                  this.setEventData({activity: {}});
                }}
                ref="activityInput"
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('activity')}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.refs.cityInput.focus();
                }}
                clearButtonMode="while-editing"
                autocomplete={this.props.interests.map((interest) => {
                  return {
                    key: interest.id,
                    text: interest.name,
                  };
                }).filter(item => {
                  return (
                    this.state.activityText &&
                    (this.state.eventDetails.activity.text !== this.state.activityText) &&
                    item.text.search(new RegExp(this.state.activityText, 'i')) !== -1
                  );
                })}
                onAutocompletePress={(item) => {
                  this.setState({
                    activityText: item.text,
                  });
                  this.setEventData({activity: item});
                }}
              />

              <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMargin, {alignSelf: 'center'}]}>
                <Button type="image" icon="male" active={this.state.eventDetails.gender === 'male'} onPress={() => this.setEventData({gender: 'male'})}/>
                <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                <Button type="image" icon="female" active={this.state.eventDetails.gender === 'female'} onPress={() => this.setEventData({gender: 'female'})}/>
                <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                <Button type="image" icon="mixed" active={this.state.eventDetails.gender === 'mixed'} onPress={() => this.setEventData({gender: 'mixed'})}/>
              </View>

              <ListInput type="flat" style={StyleSheet.halfMarginTop}  placeholder={_('ageProfile')} value={this.state.eventDetails.ageGroup}
                     rightBar={<Icon name="listIndicator" />}
                     onChange={(ageGroup) => this.setEventData({ageGroup})}>
                <ListInput.Item text={_('under16')} value="under-16" />
                <ListInput.Item text={_('_16to18')} value="16-to-18" />
                <ListInput.Item text={_('_18plus')} value="adult" />
                <ListInput.Item text={_('unrestricted')} value="all" />
              </ListInput>

              <ListInput type="flat" style={StyleSheet.halfMarginTop}  placeholder={_('privacy')} value={this.state.eventDetails.privacy}
                     rightBar={<Icon name="listIndicator" />}
                     onChange={(privacy) => this.setEventData({privacy})}>
                <ListInput.Item text={_('publicEvent')} value="public" />
                <ListInput.Item text={_('privateEvent')} value="private" />
              </ListInput>

              <ListInput type="flat" style={StyleSheet.halfMarginTop} placeholder={_('level')} value={this.state.eventDetails.level}
                     rightBar={<Icon name="listIndicator" />}
                     onChange={(level) => this.setEventData({level})}>
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
                  value={this.getMaxPlayersLabel()}
                  onChangeText={maxPlayers => {
                    this.setEventData({
                      maxPlayers: maxPlayers === '' ? '' : parseInt(maxPlayers, 10)
                    });
                  }}
                  style={{flex: 1, marginRight: 25}}
                  onFocus={() => {
                    this.scrollToInput(this.refs.scrollView1, this.refs.maxPlayersInput);
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


              <KeyboardSpacer/>
            </ScrollView>
          </Wizard.Step>




          <Wizard.Step disabled={!this.validate(2)}>
            <ScrollView ref="scrollView2" contentContainerStyle={StyleSheet.padding}>
              <DateInput
                type="flat"
                placeholder={_('dateTime')}
                value={this.state.eventDetails.date}
                rightBar={<Icon name="listIndicator" />}
                date={true} time={true}
                initialValue={new Date()}
                onChange={(date) => this.setEventData({date})}
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

              <View style={StyleSheet.doubleMarginTop}>
                <TextInput
                  value={this.state.eventDetails.venueName}
                  onChangeText={(venueName) => this.setEventData({venueName})}
                  ref="venueNameInput"
                  type="flat"
                  placeholder={_('venueName')}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.refs.venueAddressInput.focus();
                  }}
                  onFocus={() => {
                    this.scrollToInput(this.refs.scrollView2, this.refs.venueNameInput);
                  }}
                />
                <TextInput
                  value={this.state.addressText}
                  onChangeText={(addressText) => {
                    this.setState({addressText});
                    autocomplete(addressText, 'address').then(result => {
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
                    this.scrollToInput(this.refs.scrollView2, this.refs.venueAddressInput);
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
                    type="flat"
                    keyboardType="numeric"
                    placeholder={_('costPP')}
                    value={this.getEntryFeeLabel()}
                    onChangeText={entryFee => {
                      this.setEventData({
                        entryFee: entryFee === '' ? '' : parseInt(entryFee, 10)
                      });
                    }}
                    style={{flex: 1, marginRight: 25}}
                    onFocus={() => {
                      this.scrollToInput(this.refs.scrollView2, this.refs.costInput);
                    }}
                  />
                  <Button
                    type="roundedGrey"
                    active={this.state.eventDetails.entryFee === 0}
                    text={_('free')}
                    onPress={() => this.setEventData({entryFee: 0})}
                    style={{width: 110}}
                  />
                </View>

                <ListInput
                  type="flat"
                  style={StyleSheet.halfMarginTop}
                  placeholder={_('paymentMethod')}
                  value={this.state.eventDetails.paymentMethod}
                  rightBar={<Icon name="listIndicator" />}
                  onChange={(paymentMethod) => {
                    if(paymentMethod === 'app') {
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

                <KeyboardSpacer/>
              </View>
            </ScrollView>
          </Wizard.Step>



          <Wizard.Step disabled={!this.validate(3)}>
            <ScrollView>
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
                checked={!!this.state.eventDetails.picture}
                onChange={(value) => {
                  if(value) {
                    ImagePickerIOS.openSelectDialog({}, (result) => {
                      this.setEventData({picture: result});
                    }, (err) => {
                      console.warn(err); //eslint-disable-line no-console
                    });
                  } else {
                    this.setEventData({picture: null});
                  }
                }}
              />
              {this.state.eventDetails.picture && (
                <Image
                  source={{uri: this.state.eventDetails.picture}}
                  style={{ resizeMode: 'cover', height: 180, width: null }}
                />
              )}

            </ScrollView>
          </Wizard.Step>
        </Wizard>
      </View>
    );
  }
}
