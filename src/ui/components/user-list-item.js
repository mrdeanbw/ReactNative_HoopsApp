
import _ from '../i18n';

import React from 'react';

import moment from 'moment';

import {View, Image, Text, TouchableHighlight, Animated} from 'react-native';

import StyleSheet from '../styles';
import {Button, Icon} from './index';

export default class UserListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkedAnimation: new Animated.Value(props.checked === true ? 1 : 0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.checked !== this.props.checked) {
      Animated.timing(this.state.checkedAnimation, {
        toValue: nextProps.checked === true ? 1 : 0,
        friction: 1,
        duration: 200
      }).start();
    }
  }

  render() {
    let user = this.props.user;
    if(!user) {
      return null;
    }

    let {status, checked} = this.props;
    let age = user.dob ? moment().diff(user.dob, 'years') : null;

    return (
      <TouchableHighlight
        style={[StyleSheet.userListItem.container, this.props.style]}
        onPress={this.props.onPress}
        activeOpacity={1.0}
        underlayColor={StyleSheet.userListItem.underlayColor}
      >
        <View style={StyleSheet.userListItem.wrapper}>
          {status && (
            <View
              style={[
                StyleSheet.userListItem.status,
                StyleSheet.userListItem.statuses[status]
              ]}
            >
              <Image source={StyleSheet.icons[status]} />
            </View>
          )}
          <Animated.View style={[StyleSheet.userListItem.status, {backgroundColor: StyleSheet.colors.pink}, {
            width: this.state.checkedAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 8] })
          }]}/>


          <View style={StyleSheet.userListItem.detail}>
            <View style={StyleSheet.userListItem.imageContainer}>
              <Image source={{uri: user.imageSrc}} style={StyleSheet.userListItem.avatar} />
            </View>

            <View style={StyleSheet.userListItem.textContainer}>
              <Text style={[StyleSheet.text, StyleSheet.userListItem.textStyle, StyleSheet.userListItem.titleTextStyle]} numberOfLines={1} ellipsizeMode="tail">
                {user.name}
                {this.props.paymentMethod === 'app' && (
                  <Text style={StyleSheet.userListItem.paidText}> ({_('paid')})</Text>
                )}
                {this.props.paymentMethod === 'cash' && (
                  <Text style={StyleSheet.userListItem.cashText}> ({_('cash')})</Text>
                )}
              </Text>
              <Text style={[StyleSheet.text, StyleSheet.userListItem.textStyle]} numberOfLines={1} ellipsizeMode="tail">
                <Text>{user.city}</Text>
                <Text>{'\u00a0\u00a0|\u00a0\u00a0'}</Text>
                {!!age && (
                  <Text>{_('age')}: {age}</Text>
                )}
              </Text>
            </View>
          </View>

          <TouchableHighlight
            onPress={this.props.onPressDisclosure}
            underlayColor={StyleSheet.userListItem.disclosureUnderlayColor}
            hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
          >
            <View style={StyleSheet.buttons.bar}>
              {(checked === false) && <Button type="checkDisclosure" icon="plusGrey" onPress={this.props.onPressCheck} />}
              {(checked === true) && <Button type="checkDisclosure" icon="check" onPress={this.props.onPressCheck}  style={StyleSheet.buttons.checkDisclosure.activeStyle} />}
              {!this.props.hideDisclosure && (
                <Icon name="menu" onPress={this.props.onPressDisclosure} />
              )}
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

UserListItem.propTypes = {
  user: React.PropTypes.object.isRequired,
  status: React.PropTypes.oneOf(['pending', 'confirmed', 'rejected']),
};
