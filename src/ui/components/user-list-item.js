
import _ from '../i18n';

import React from 'react';

import {View, Image, Text, TouchableHighlight, Animated} from 'react-native';

import StyleSheet from '../styles';
import {Button, Icon} from './index';

export default class UserListItem extends React.Component {

    constructor() {
        super();

        this.state = {
            checkedAnimation: new Animated.Value(0)
        };
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        Animated.timing(this.state.checkedAnimation, {toValue: nextProps.checked === true ? 1 : 0, friction: 1, duration: 200}).start();
    }

    render() {
        const {avatar, firstName, lastName, location, dob, status, checked, ...props} = this.props;
        const age = ((new Date().getTime() - new Date(dob).getTime()) / (365.25*24*3600*1000)) | 0;

        return (
            <TouchableHighlight style={[StyleSheet.userListItem.container, this.props.style]}
                                onPress={this.props.onPress}
                                activeOpacity={1.0}
                                underlayColor={StyleSheet.userListItem.underlayColor}>
                <View style={StyleSheet.userListItem.wrapper}>
                    {status && <View style={[StyleSheet.userListItem.status, StyleSheet.userListItem.statuses[status]]} />}
                    <Animated.View style={[StyleSheet.userListItem.status, {backgroundColor: StyleSheet.colors.pink}, {
                        width: this.state.checkedAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 8] })
                    }]}/>


                    <View style={StyleSheet.userListItem.detail}>
                        <View style={StyleSheet.userListItem.imageContainer}>
                            <Image source={avatar} style={StyleSheet.userListItem.avatar} />
                        </View>

                        <View style={StyleSheet.userListItem.textContainer}>
                            <Text style={[StyleSheet.text, StyleSheet.userListItem.textStyle, StyleSheet.userListItem.titleTextStyle]} numberOfLines={1} ellipsizeMode="tail">
                                {firstName}{'\u00a0'}{lastName}
                            </Text>
                            <Text style={[StyleSheet.text, StyleSheet.userListItem.textStyle]} numberOfLines={1} ellipsizeMode="tail">
                                {location}{'\u00a0\u00a0|\u00a0\u00a0'}{_('age')}: {age}
                            </Text>
                        </View>
                    </View>

                    <View style={StyleSheet.buttons.bar}>
                        {(checked === false) && <Button type="checkDisclosure" icon="plusGrey" onPress={this.props.onPressCheck} />}
                        {(checked === true) && <Button type="checkDisclosure" icon="check" onPress={this.props.onPressCheck}  style={StyleSheet.buttons.checkDisclosure.activeStyle} />}
                        <Icon name="menu" />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
};

