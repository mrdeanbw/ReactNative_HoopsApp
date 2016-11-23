
import React from 'react';
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

export default class Form extends React.Component {

  render() {
    return (
      <ScrollView
        {...this.props}
        keyboardShouldPersistTaps={true}
        ref="scrollRef"
      >
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()} >
          <View style={{flex: 1}}>
            {this.props.children}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
