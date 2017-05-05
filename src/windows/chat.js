import React, {Component} from 'react'
import {View} from 'react-native'
import {Bubble, GiftedChat} from 'react-native-gifted-chat'

import {Header} from '../components'
import StyleSheet from '../styles'
import _ from '../i18n'

class Chat extends Component {

  renderBubble(props) {
    const styles = StyleSheet.chat.bubble

    return (
      <Bubble
        {...props}
        textStyle={styles.textStyle}
        wrapperStyle={styles.wrapperStyle}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={_('messages')} simple />
        <GiftedChat
          messages={this.props.messages}
          onSend={this.props.onSend.bind(this)}
          user={this.props.user}
          renderBubble={this.renderBubble.bind(this)}
        />
      </View>
    )
  }
}

export default Chat
