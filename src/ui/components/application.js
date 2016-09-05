

import React, { Component } from 'react';
import { AppRegistry, View, StatusBar, Animated } from 'react-native';

import StyleSheet from '../styles';



export default class Application extends Component {
  constructor() {
    super();
    this.state = { i: 0 };
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {style, statusBarStyle, view, viewProps} = this.props;
    this.setRootView(view, viewProps);
  }

  getRootViewState(view, viewProps = {}) {
    return { rootView: view, rootViewProps: { onClose: viewProps.onClose || this.props.onClose, ...viewProps } };
  }

  setRootView(view, viewProps = {}, animated = true) {
    const { width: screenWidth, height: screenHeight } = StyleSheet.dimensions;

    if(this.state.rootView && animated) {
      this.setState({
        next: this.getRootViewState(view, viewProps),
        nextAnimation: new Animated.Value(0)
      });

      setTimeout(() => Animated.timing(this.state.nextAnimation, {toValue: 1, friction: 1, duration: 400}).start(() => {
        this.setState({
          next: null,
          nextAnimation: null,
          ...this.state.next
        });
      }), 0);

    } else {
      this.setState({
        next: null,
        ...this.getRootViewState(view, viewProps)
      });
    }
  }

  render() {
    const { width: screenWidth, height: screenHeight } = StyleSheet.dimensions;

    return (
      <View style={[StyleSheet.application.style, this.props.style, {width: screenWidth, height: screenHeight}]}>
        {!!this.state.rootView && <Animated.View style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          width: screenWidth,
          height: screenHeight,
          transform: this.state.nextAnimation ? [{ translateX: this.state.nextAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, -screenWidth] }) }] : []
        }}>
          <StatusBar barStyle={this.props.statusBarStyle || StyleSheet.application.statusBarStyle}/>
          <this.state.rootView application={this} {...this.state.rootViewProps}/>
        </Animated.View>}
        {!!this.state.next && <Animated.View style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          width: screenWidth,
          height: screenHeight,
          transform: [{ translateX: this.state.nextAnimation.interpolate({ inputRange: [0, 1], outputRange: [screenWidth, 0] }) }]
        }}>
          <StatusBar barStyle={this.props.statusBarStyle || StyleSheet.application.statusBarStyle}/>
          <this.state.next.rootView application={this} {...this.state.next.rootViewProps}/>
        </Animated.View>}
      </View>
    );
  }


  static register(name, view, viewProps = {}, props = {}) {
    const component = React.createClass({
      render: () => {
        return <Application view={view} viewProps={viewProps} {...props} />
      }
    });

    AppRegistry.registerComponent(name, () => component);
  }
}
