
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Popup} from './';
import StyleSheet from '../styles';

export default class LoadingAlert extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible}>
        <View style={StyleSheet.loading.popup}>
          <ActivityIndicator color={StyleSheet.colors.pink}/>
        </View>
      </Popup>
    );
  }
}
