
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import createStore from '../createStore';

import firebase, {registerWithStore as registerFirebase} from '../data/firebase';

import Root from './windows/root';

const store = createStore();

registerFirebase(store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  }
};
