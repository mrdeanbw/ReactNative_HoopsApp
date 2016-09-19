
import React from 'react';

import {View, NavigationExperimental} from 'react-native';
const {CardStack} = NavigationExperimental;

import StyleSheet from '../styles';

export default class Navigator extends React.Component {

  renderScene = (props) => {
    let route = props.scene.route;
    let config = this.props.routeConfig[route.key];
    if(!config){
      throw new Error(`route config not defined for ${route.key}`);
    }

    return (
      <View style={StyleSheet.window.contentStyle}>
        <config.component
          mode={this.props.mode}
          onChangeMode={this.props.onChangeMode}
          actionButton={config.action && config.action.pressEmitter}
          onChangeAction={this.props.onChangeAction}
          {...route.props}
        />
      </View>
    );
  };

  render() {
    return (
      <CardStack
        onNavigateBack={this.props.onNavigateBack}
        navigationState={this.props.navigationState}
        renderScene={this.renderScene}
        style={{flex: 1}}
      />
    );
  }
}
