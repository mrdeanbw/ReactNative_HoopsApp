
import React, {Component} from 'react'
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native'

import dismissKeyboard from 'dismissKeyboard'

class Form extends Component {

  render() {
    return (
      <ScrollView
        {...this.props}
        keyboardShouldPersistTaps="always"
        ref="scrollRef"
      >
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()} >
          <View style={{flex: 1}}>
            {this.props.children}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }
}

export default Form
