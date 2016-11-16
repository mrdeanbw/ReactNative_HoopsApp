
import React from 'react';
import {Text} from 'react-native';
import {Popup, Icon, Button} from './';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class LoadingAlert extends React.Component {
  render() {
    return (
      <Popup
        visible={this.props.visible}
        popupContentStyle={StyleSheet.networkAlert.container}
      >
        <Icon name="warning" style={StyleSheet.networkAlert.icon}/>
        <Text style={StyleSheet.networkAlert.title}>
          {_('connectionWarningTitle')}
        </Text>
        <Text style={StyleSheet.networkAlert.description}>
          <Text>
            {/* Wrapped in an extra text to fix a big causing white lines */}
            {_('connectionWarning')}
          </Text>
        </Text>
        <Button
          type="roundedWhite"
          text={_('dismiss')}
          onPress={this.props.onDismiss}
        />
      </Popup>
    );
  }
}
