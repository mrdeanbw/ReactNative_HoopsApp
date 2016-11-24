
import React from 'react';

import {View, NavigationExperimental, StatusBar} from 'react-native';
const {CardStack} = NavigationExperimental;

import StyleSheet from '../styles';

export default class Navigator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      direction: 'horizontal',
    };
  }

  renderScene = (props) => {
    let route = props.scene.route;
    let config = this.props.routeConfig[route.scene];
    if(!config){
      throw new Error(`route config not defined for ${route.scene}`);
    }

    let onBack, onClose;
    //set onBack or onClose if we are not at the root scene
    if(props.scene.index !== 0) {
      if(props.scene.route.direction === 'vertical') {
        //vertically animated routes have a close button (x)
        onClose = this.props.onNavigateBack;
      } else {
        //horizontally animated routes have a back button (<)
        onBack = this.props.onNavigateBack;
      }
    }

    return (
      <View style={StyleSheet.window.contentStyle}>
        <StatusBar
          barStyle='light-content'
        />
        <config.component
          actionButton={config.action && config.action.pressEmitter}
          onChangeAction={this.props.onChangeAction}
          onBack={onBack}
          onClose={onClose}
          {...route.props}
        />
      </View>
    );
  };

  /*
   * Change the animation direction depending on route properties
   */
  componentWillReceiveProps(nextProps) {
    let navState = this.props.navigationState;
    let nextState = nextProps.navigationState;

    let route;
    if(nextState.routes.length > navState.routes.length) {
      //If we are going forwards, use next route direction
      route = nextState.routes[nextState.routes.length - 1];
    } else {
      //Else we are going backwards, use prev route direction
      route = navState.routes[navState.routes.length - 1];
    }

    let direction = route.direction || 'horizontal';
    this.setState({direction});
  }

  render() {
    return (
      <CardStack
        direction={this.state.direction}
        gestureResponseDistance={30}
        onNavigateBack={this.props.onNavigateBack}
        navigationState={this.props.navigationState}
        renderScene={this.renderScene}
        style={{flex: 1}}
      />
    );
  }
}
