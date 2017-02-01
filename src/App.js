import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Client} from 'bugsnag-react-native'

import createStore from './reducers'
import {Root} from './containers'
import Config from './config'

export const store = createStore()

// Disable Yellow Box and show in the console instead
// Its better for performance in dev mode
if (__DEV__) console.disableYellowBox = true

class App extends Component {

  constructor(props) {
    super(props)
    if(Config.BUGSNAG_API_KEY) {
      this.bugsnag = new Client(Config.BUGSNAG_API_KEY)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    )
  }
}

export default App
