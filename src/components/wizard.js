
import _ from '../i18n';

import React from 'react';

import {View, ScrollView} from 'react-native';
import Button from './button';

import StyleSheet from '../styles';

export default class Wizard extends React.Component {

  constructor() {
    super();
    this.state = { step: 0 };
  }

  onPressStep = (i) => {
    this.setState({step: i});
  };

  onPressNext = () => {
    const onPressNext = this.props.children[this.state.step].props.onPressNext;
    let cancel = false;
    if(onPressNext) onPressNext(() => cancel = true);
    if(!cancel) {
      this.setState({ step: (this.state.step || 0) + 1 });
    }
  };

  onPressBack = () => {
    this.setState({ step: (this.state.step || 0) - 1 });
  };

  render() {
    const step = this.state.step || 0;

    const stepProps = this.props.children[step].props;

    return (
      <View style={{flex: 1}}>
        <View style={StyleSheet.buttons.bar}>
          {this.props.children.map((_, i) =>
            <Button type="step" key={i}
                text={i+1}
                active={step >= i}
                style={i === 0 && {borderLeftWidth: 0}}
                onPress={step > i ? () => this.onPressStep(i) : null}/>
          )}
        </View>

        {this.props.children[step]}

        <View style={StyleSheet.buttons.bar}>
          {(step > 0) && (
            <Button
              type="dialog"
              text={_('back')}
              onPress={this.onPressBack}
            />
          )}
          {(step < this.props.children.length - 1) && (
            <Button
              type={stepProps.disabled ? "dialog" : "dialogDefault"}
              text={_('next')}
              onPress={stepProps.disabled ? undefined : this.onPressNext}
            />
          )}
          {(step === this.props.children.length - 1) && (
            <Button
              type={stepProps.disabled ? "dialog" : "dialogDefault"}
              text={this.props.completeText || _('complete')}
              onPress={this.props.onComplete}
            />
          )}
        </View>
      </View>
    );
  }
};

Wizard.Step = class WizardStep extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.children}
      </View>
    );
  }
};
