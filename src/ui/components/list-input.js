
import React from 'react';
import dismissKeyboard from 'dismissKeyboard';
import StyleSheet from '../styles';
import { View, Text, TouchableHighlight} from 'react-native';

import Button from './button';
import TextInput from './text-input';
import Popup from './popup';

export default class ListInput extends React.Component {

  constructor() {
    super();

    this.state = {
      showPopup: false,
    };
  }

  onPress = () => {
    dismissKeyboard();
    this.setState({showPopup: true});
  };

  onPressChild = (value) => {
    this.setState({showPopup: false});
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    const {rightBar, value, placeholder, style, ...props} = this.props;

    const defaultTextInput = StyleSheet.textInputs.default || {};
    const textInput = this.props.type ? StyleSheet.textInputs[this.props.type] || defaultTextInput : defaultTextInput;

    const selectedChild = (typeof value !== "undefined") ? this.props.children.find(x => x.props.value === value) : null;

    return (
      <View>
        <Popup
          visible={this.state.showPopup}
          onClose={() => this.setState({showPopup: false})}
          style={StyleSheet.dialog.optionsMenu}
        >
          {this.props.children.map((child, i) => {
            return React.cloneElement(
              child,
              {
                key: i,
                onPress: () => this.onPressChild(child.props.value),
                ...child.props,
              }
            );
          })}
        </Popup>
        <TouchableHighlight
          onPress={this.onPress}
          activeOpacity={'activeOpacity' in textInput ? textInput.activeOpacity : defaultTextInput.activeOpacity}
          underlayColor={'underlayColor' in textInput ? textInput.underlayColor : defaultTextInput.underlayColor}
        >
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <TextInput style={[{flex:1}, style]} view={
              <Text style={[
                StyleSheet.text,
                defaultTextInput.textStyle,
                textInput.textStyle,
                defaultTextInput.staticTextStyle,
                textInput.staticTextStyle,
                this.props.textStyle,
                !selectedChild && { color: this.props.placeholderTextColor || textInput.placeholderTextColor || defaultTextInput.placeholderTextColor }
              ]}>
                {selectedChild ? selectedChild.props.text : placeholder}
              </Text>
            } {...props} />
            <View style={[defaultTextInput.barStyle, textInput.barStyle]}>{rightBar}</View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

ListInput.propTypes = {
  onChange: React.PropTypes.func,
  rightBar: React.PropTypes.node,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  children: React.PropTypes.arrayOf(React.PropTypes.node),
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  type: React.PropTypes.string.isRequired,
  placeholderTextColor: React.PropTypes.string,
};

ListInput.Item = class ListInputItem extends React.Component {
  render() {
    return (
      <Button type="alertVertical" text={this.props.text} onPress={this.props.onPress} />
    );
  }
};

ListInput.Item.propTypes = {
  onPress: React.PropTypes.func,
  text: React.PropTypes.string.isRequired,
};
