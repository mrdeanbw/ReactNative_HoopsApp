
import React from 'react';

import {View} from 'react-native';
import _ from '../i18n';
import {Header, Button} from '../components';

export default class PaymentsBankSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('payments')}
          onToggleMode={this.props.onToggleMode}
          mode={this.props.mode}
        />

        <View style={{flex: 1}}>
          <Button
            type="preference"
            text={_('paymentOptions')}
            icon="chevronRight"
            onPress={this.props.onPressPaymentOptions}
          />
        </View>

      </View>
    );
  }

}
