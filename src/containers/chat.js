import React, {Component} from 'react'
import {View} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'

import {Header} from '../components'
import firebase,{firebaseDb} from '../data/firebase'
import _ from '../i18n'


class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
        messages: []
    }

    this.user = this.props.user
    this.chatRef = firebaseDb.child('chat/' + this.generateChatId())
    this.chatRefData = this.chatRef.orderByChild('order')
    this.onSend = this.onSend.bind(this)
  }

  generateChatId() {
    return '123'
  }

  listenForItems(chatRef) {
    chatRef.on('value', (snap) => {
      console.log("lelelelelelelele")
      // // get children as an array
      // let items = []
      // snap.forEach((child) => {
      //   let avatar
      //   items.push({
      //     _id: child.val().createdAt,
      //     text: child.val().text,
      //     createdAt: new Date(child.val().createdAt),
      //     user: {
      //       _id: child.val().uid,
      //       avatar: avatar
      //     }
      //   })
      // })

      // this.setState({
      //   loading: false,
      //   messages: items
      // })
    })
  }

  componentDidMount() {
    this.listenForItems(this.chatRefData)
  }

  componentWillUnmount() {
    this.chatRefData.off()
  }

  onSend(messages = []) {
    // this.setState({
    //     messages: GiftedChat.append(this.state.messages, messages),
    // })
    messages.forEach(message => {
      var now = new Date().getTime()
      this.chatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        uid: 1,
        // uid: this.user.uid,
        order: -1 * now
      })
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={_('theDashboard')} onBack={this.props.onBack} />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend.bind(this)}
          user={{
            uid: 1
          }}
        />
      </View>
    )
  }
}

export default Chat
