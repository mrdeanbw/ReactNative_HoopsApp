
import React from 'react';
import {Text} from 'react-native';
import {Popup} from './';

export default class LoadingAlert extends React.Component {
  render() {
    return (
      <Popup visible={this.props.visible}>
        <Text>Loading</Text>
      </Popup>
    );
  }
}
