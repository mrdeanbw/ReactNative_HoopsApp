import React, {Component} from 'react'
import {View,Text} from 'react-native'

import StyleSheet from '../styles'

class Title extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return(
      <View style={StyleSheet.title.container}>
        <Text style={[StyleSheet.text,StyleSheet.title.titleText]}>
          {this.props.text}
        </Text>
      </View>
    )
  }
}

Title.propTypes = {
  'text': React.PropTypes.string,
}

export default Title
