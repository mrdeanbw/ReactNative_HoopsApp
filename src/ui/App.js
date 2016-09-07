
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import createStore from '../createStore';

import Root from './windows/root';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  }
};
