import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Chat as _Chat} from '../windows'
import {firebaseDb} from '../data/firebase'
import {navigationActions} from '../actions'

class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
        messages: []
    }

    this.chatRef = firebaseDb.child('chat/' + this.generateChatId())
    this.chatRefData = this.chatRef.orderByChild('order')
    this.onSend = this.onSend.bind(this)
  }

  generateChatId() {
    return this.props.id
  }

  listenForItems(chatRef) {
    chatRef.on('value', (snap) => {
      // get children as an array
      let items = []
      snap.forEach((child) => {
        items.push({
          _id: child.val().createdAt,
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: child.val().user,
        })
      })

      this.setState({
        loading: false,
        messages: items
      })
    })
  }

  componentDidMount() {
    this.listenForItems(this.chatRefData)
  }

  componentWillUnmount() {
    this.chatRefData.off()
  }

  onSend(messages = []) {
    messages.forEach(message => {
      var now = new Date().getTime()
      this.chatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        userId: message.user._id,
        user: message.user,
        order: -1 * now
      })
    })
  }

  render() {
    const user = this.props.user
    const userData = {
      _id: user.uid,
      name: user.name,
      avatar: null
    }

    return (
      <_Chat
        messages={this.state.messages}
        onSend={this.onSend}
        onBack={this.props.onNavigateBack}
        user={userData}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigationActions.pop()),
  }),
)(Chat)
