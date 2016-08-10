
import _ from '../i18n';

import React from 'react';
import StyleSheet from '../styles';
import { View, Text, TouchableHighlight} from 'react-native';

import Dialog from './dialog';
import Picker from './picker';
import Button from './button';
import TextInput from './text-input';

export default class ListInput extends React.Component {

    onPress = () => {
        if(!this.props.modalProvider) return;
        const modalProvider = this.props.modalProvider();

        modalProvider.showModal(<Dialog popup={true} onClose={() => modalProvider.hideModal()} style={StyleSheet.dialog.optionsMenu}>
            {this.props.children.map((x, i) => React.cloneElement(x, { key: i, onPress: () => this.onPressChild(modalProvider, x) }))}
        </Dialog>)
    };

    onPressChild = (modalProvider, child) => {
        modalProvider.hideModal();
        if(this.props.onChange) this.props.onChange(child.props.value);
    };

    render() {
        const {onChange, rightBar, value, placeholder, children, style, ...props} = this.props;

        const defaultTextInput = StyleSheet.textInputs.default || {};
        const textInput = this.props.type ? StyleSheet.textInputs[this.props.type] || defaultTextInput : defaultTextInput;

        const selectedChild = value ? this.props.children.find(x => x.props.value === value) : null;

        return (
            <TouchableHighlight onPress={this.onPress}
                                      activeOpacity={'activeOpacity' in textInput ? textInput.activeOpacity : defaultTextInput.activeOpacity}
                                      underlayColor={'underlayColor' in textInput ? textInput.underlayColor : defaultTextInput.underlayColor}>
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
                            {!!selectedChild ? selectedChild.props.text : placeholder}
                        </Text>
                    } {...props} />
                    <View style={[defaultTextInput.barStyle, textInput.barStyle]}>{rightBar}</View>
                </View>
            </TouchableHighlight>
        );
    }
};

ListInput.Item = class ListInputItem extends React.Component {
    render() {
        return (
            <Button type="alertVertical" text={this.props.text} onPress={this.props.onPress} />
        );
    }
};