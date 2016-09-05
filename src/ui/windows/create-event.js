
import _ from '../i18n';
import React from 'react';
import ReactNative from 'react-native';
import {View,Text,ScrollView, Image} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {Button, Dialog, Wizard, TextInput, ListInput, DateInput, Icon, HorizontalRule, CheckButton} from '../components';
import StyleSheet from '../styles';

export default class CreateEvent extends React.Component {

  constructor() {
    super();
    this.state = {
      gallery: true
    };
  }

  static getTest(close) {
    return {
      title: 'Create Event',
      view: CreateEvent,
      viewProps: { onClose: close }
    };
  }

  onComplete = () => {
    if(this.props.onClose) this.props.onClose();
  };

  onChangeAgeProfile = (ageProfile) => {
    this.setState({ ageProfile: ageProfile });
  };

  onChangePrivacy = (privacy) => {
    this.setState({ privacy: privacy });
  };

  onChangeLevel = (level) => {
    this.setState({ level: level });
  };

  onChangeDate = (date) => {
    this.setState({ date: date });
  };

  onChangePaymentMethod = (paymentMethod) => {
    this.setState({ paymentMethod: paymentMethod });
  };

  onChangeDeadline = (deadline) => {
    this.setState({ deadline: deadline });
  };

  onChangeEventDescription = (eventDescription) => {
    this.setState({ eventDescription: eventDescription });
  };

  onChangeNotes = (notes) => {
    this.setState({ notes: notes });
  };

  onChangeGallery = (value) => {
    this.setState({ gallery: value });
  };

  onChangeVisibility = (value) => {
    this.setState({ visibility: value });
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

  render() {
    return (
      <Dialog ref="dialog" title={_('createEvent')} onClose={this.props.onClose}>
        <Wizard completeText={_('create')} onComplete={this.onComplete}>



          <Wizard.Step>
            <ScrollView contentContainerStyle={StyleSheet.padding}>
              <TextInput
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('eventName')}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.refs.activityInput.focus();
                }}
              />
              <TextInput
                ref="activityInput"
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('activity')}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.refs.cityInput.focus();
                }}
              />
              <TextInput
                ref="cityInput"
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('city')}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.refs.countryInput.focus();
                }}
              />
              <TextInput
                ref="countryInput"
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('country')}
                blurOnSubmit={true}
              />

              <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMargin, {alignSelf: 'center'}]}>
                <Button type="image" icon="male" active={this.state.gender == 'male'} onPress={() => this.setState({gender: 'male'})}/>
                <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                <Button type="image" icon="female" active={this.state.gender == 'female'} onPress={() => this.setState({gender: 'female'})}/>
                <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                <Button type="image" icon="mixed" active={this.state.gender == 'mixed'} onPress={() => this.setState({gender: 'mixed'})}/>
              </View>

              <ListInput type="flat" style={StyleSheet.halfMarginTop}  placeholder={_('ageProfile')} value={this.state.ageProfile}
                     rightBar={<Icon name="listIndicator" />}
                     modalProvider={() => this.refs.dialog}
                     onChange={this.onChangeAgeProfile}>
                <ListInput.Item text={_('under16')} value="under-16" />
                <ListInput.Item text={_('_16to18')} value="16-to-18" />
                <ListInput.Item text={_('_18plus')} value="adult" />
                <ListInput.Item text={_('unrestricted')} value="all" />
              </ListInput>

              <ListInput type="flat" style={StyleSheet.halfMarginTop}  placeholder={_('privacy')} value={this.state.privacy}
                     rightBar={<Icon name="listIndicator" />}
                     modalProvider={() => this.refs.dialog}
                     onChange={this.onChangePrivacy}>
                <ListInput.Item text={_('publicEvent')} value="public" />
                <ListInput.Item text={_('privateEvent')} value="private" />
              </ListInput>

              <ListInput type="flat" style={StyleSheet.halfMarginTop} placeholder={_('level')} value={this.state.level}
                     rightBar={<Icon name="listIndicator" />}
                     modalProvider={() => this.refs.dialog}
                     onChange={this.onChangeLevel}>
                <ListInput.Item text={_('casual')} value="casual" />
                <ListInput.Item text={_('competitive')} value="competitive" />
                <ListInput.Item text={_('open')} value="open" />
              </ListInput>

              <KeyboardSpacer/>
            </ScrollView>
          </Wizard.Step>




          <Wizard.Step>
            <ScrollView ref="scrollView2" contentContainerStyle={StyleSheet.padding}>
              <DateInput type="flat" placeholder={_('dateTime')} value={this.state.date}
                     rightBar={<Icon name="listIndicator" />}
                     modalProvider={() => this.refs.dialog}
                     date={true} time={true}
                     onChange={this.onChangeDate} />

              <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMarginTop, {alignSelf: 'center'}]}>
                <Button type="roundedGrey" active={this.state.courtType === 'indoor'} text={_('indoor')} onPress={() => this.setState({courtType: 'indoor'})} style={{width: 110}}/>
                <Text style={[StyleSheet.text, StyleSheet.horizontalRule.textStyle, {flex: 1}]}>{_('or').toUpperCase()}</Text>
                <Button type="roundedGrey" active={this.state.courtType === 'outdoor'} text={_('outdoor')} onPress={() => this.setState({courtType: 'outdoor'})} style={{width: 110}}/>
              </View>

              <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMarginTop, {alignSelf: 'center'}]}>
                <Button type="roundedGrey" active={!!this.state.recurring} text={_('recurring')} onPress={() => this.setState({recurring: true})} style={{width: 110}}/>
                <Text style={[StyleSheet.text, StyleSheet.horizontalRule.textStyle, {flex: 1}]}>{_('or').toUpperCase()}</Text>
                <Button type="roundedGrey" active={!this.state.recurring} text={_('oneTime')} onPress={() => this.setState({recurring: false})} style={{width: 110}}/>
              </View>

              <View style={StyleSheet.doubleMarginTop}>
                <TextInput
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
                />

                <View style={[StyleSheet.buttons.bar, StyleSheet.halfMarginTop]}>
                  <TextInput
                    ref="costInput"
                    type="flat"
                    keyboardType="numeric"
                    placeholder={_('costPP')}
                    value={this.state.costPP || ''}
                    onChange={value => this.setState({costPP: value, freeCost: false})}
                    style={{flex: 1, marginRight: 25}}
                    onFocus={() => {
                      this.scrollToInput(this.refs.scrollView2, this.refs.costInput);
                    }}
                  />
                  <Button type="roundedGrey" active={this.state.freeCost === true} text={_('free')} onPress={() => this.setState({costPP: null, freeCost: true})} style={{width: 110}}/>
                </View>

                <ListInput type="flat" style={StyleSheet.halfMarginTop} placeholder={_('paymentMethod')} value={this.state.paymentMethod}
                       rightBar={<Icon name="listIndicator" />}
                       modalProvider={() => this.refs.dialog}
                       onChange={this.onChangePaymentMethod}>
                  <ListInput.Item text={_('inAppPayment')} value="app" />
                  <ListInput.Item text={_('cashOnSite')} value="cash" />
                  <ListInput.Item text={_('unrestricted')} value={"unrestricted"} />
                </ListInput>

                <DateInput type="flat" placeholder={_('deadline')} value={this.state.deadline}
                       style={StyleSheet.halfMarginTop}
                       rightBar={<Icon name="listIndicator" />}
                       modalProvider={() => this.refs.dialog}
                       date={true} time={true}
                       onChange={this.onChangeDeadline} />

                <KeyboardSpacer/>
              </View>
            </ScrollView>
          </Wizard.Step>



          <Wizard.Step>
            <ScrollView>
              <View style={StyleSheet.padding}>
                <TextInput type="flat"
                       multiline="popup"
                       value={this.state.eventDescription}
                       placeholder={_('eventDescription')}
                       rightBar={<Icon name="listIndicator" />}
                       onChangeText={this.onChangeEventDescription}
                       modalProvider={() => this.refs.dialog}
                       modalTitle={_('describeThisEvent')}
                       modalPlaceholder={_('enterYourDescription')} />

                <TextInput type="flat"
                       multiline="popup"
                       value={this.state.notes}
                       placeholder={_('notes')}
                       rightBar={<Icon name="listIndicator" />}
                       onChangeText={this.onChangeNotes}
                       modalProvider={() => this.refs.dialog}
                       modalTitle={_('eventNotes')}
                       modalPlaceholder={_('enterYourNotesForThisEvent')}
                       style={StyleSheet.halfMarginTop}/>
              </View>

              <CheckButton type="wizardCheck" text={_('allowPhotoUpload')}
                     icon="none" checkIcon="check"
                     checked={this.state.gallery}
                     style={StyleSheet.singleMarginTop}
                     onChange={this.onChangeGallery} />
              <CheckButton type="wizardCheck" text={_('allowToSeeYourContactInfo')}
                     icon="none" checkIcon="check"
                     checked={this.state.visibility}
                     onChange={this.onChangeVisibility} />
              <CheckButton type="wizardCheck" text={_('eventPicture')}
                     icon="none" checkIcon="minus"
                     checked={!!this.state.eventPicture}
                     onChange={this.onChangeEventPicture} />

              {this.state.eventPicture && <Image source={this.state.eventPicture} style={{ resizeMode: 'cover', height: 180, width: null }} />}
            </ScrollView>
          </Wizard.Step>
        </Wizard>
      </Dialog>
    );
  }
};
