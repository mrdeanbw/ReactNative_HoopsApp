
import React from 'react';

import {ScrollView, View, Text, TouchableHighlight} from 'react-native';
import _ from '../i18n';
import {Header, Button, Icon, Popup} from '../components';
import StyleSheet from '../styles';

export default class PaymentsBankSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popopCard: null,
    };
  }

  onPressCard = (card) => {
    this.setState({popupCard: card});
  };

  onPressDisclosure = (card) => {
    this.setState({popupCard: card});
  };

  onPressClose = () => {
    this.setState({popupCard: null});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('payments')}
          onToggleMode={this.props.onToggleMode}
          mode={this.props.mode}
        />

        <Popup visible={!!this.state.popupCard} onClose={this.onPressClose}>
          <Button
            type="alertVerticalDefault"
            text={_('remove')}
            onPress={() => this.props.onPressRemove(this.state.popupCard)}
          />
        </Popup>

        <ScrollView style={{flex: 1}}>
          <Button
            type="preference"
            text={_('paymentOptions')}
            icon="chevronRight"
            onPress={this.props.onPressPaymentOptions}
          />

          {this.props.cards.length === 0 && (
            <Text style={StyleSheet.payments.noCardsText}>{_('noCards')}</Text>
          )}
          {this.props.cards.map((card, i) => {
            return (
              <TouchableHighlight
                key={i}
                style={StyleSheet.payments.cardWrapper}
                onPress={() => this.onPressCard(card)}
                underlayColor={StyleSheet.payments.underlayColor}
              >
                <View style={StyleSheet.payments.cardContainer}>
                  {card.brand === 'Visa' && <Icon name="visa"/>}
                  {card.brand === 'Maestro' && <Icon name="maestro"/>}

                  <Text style={StyleSheet.payments.cardText}>
                    <Text style={StyleSheet.payments.cardName}>
                      {card.name}
                    </Text>
                    <Text style={StyleSheet.payments.cardLast4}>
                      •••• {card.last4}
                    </Text>
                  </Text>

                  <TouchableHighlight
                    onPress={() => this.onPressDisclosure(card)}
                    underlayColor="transparent"
                  >
                    <View>
                      <Icon name="menu" />
                    </View>
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            );
          })}

        </ScrollView>

      </View>
    );
  }

}
