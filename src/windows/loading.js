import React from 'react';
import {View} from 'react-native';

import StyleSheet from '../styles';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={StyleSheet.loading.page} />
    );
  }
};
