import React from 'react';
import {ScrollView, View, Modal} from 'react-native';

import StyleSheet from '../styles';
import {Application, Dialog, Button} from '../components';

export default class Demo extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  startTest(test) {
    this.setState({ test: test, testVisible: true });
  }

  finishTest = () => {
    this.setState({testVisible: false});
  };

  render() {
    const { application, ...props } = this.props;

    const windows = require('./index.js');
    const tests = [];
    Object.keys(windows).filter(v => !!windows[v].getTest).map(v => windows[v].getTest(this.finishTest)).forEach(t => {
      if(!Array.isArray(t)) tests.push(t);
      else tests.push(...t);
    });

    return (
      <View style={{flex: 1}}>
        <Dialog title="Hoops UI Demo">
          <ScrollView style={{flex: 1}} contentContainerStyle={{paddingLeft: 25, paddingRight: 25, paddingBottom: 25}}>
            {tests.map((test, i) => <Button type="rounded" text={test.title} key={i} style={StyleSheet.singleMarginTop} onPress={() => this.startTest(test)}/>)}
          </ScrollView>
        </Dialog>
        {this.state.test && <Modal visible={!!this.state.test && this.state.testVisible} animationType="slide">
          <Application onClose={this.finishTest} view={this.state.test.view} viewProps={this.state.test.viewProps} />
        </Modal>}
      </View>
    );
  }

}
