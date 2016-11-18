
import React from 'react';
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

export default class Form extends React.Component {

  componentWillReceiveProps(nextProps) {
    let extraPadding = nextProps.extraKeyboardPadding || 0;
    let inputNode = nextProps.focusNode;
    if(inputNode && inputNode !== this.props.focusNode) {
      let scrollResponder = this.refs.scrollRef.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        inputNode,
        150 + extraPadding,
        true
      );
    }
  }

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
