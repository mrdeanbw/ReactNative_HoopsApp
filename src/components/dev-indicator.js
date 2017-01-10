
import React from 'react';
import {View} from 'react-native';

import StyleSheet from '../styles';

export default class DevIndicator extends React.Component {

  componentWillMount() {
    this.setState({
      isDev: __DEV__ ? true : false
    });
  }

  render() {
    if (this.state.isDev) {
      return (<View style={StyleSheet.devIndicator.style} />);
    }

    return null;
  }
};
