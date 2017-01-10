
import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import StyleSheet from '../styles';

export default class Picker extends React.Component {

  constructor(props) {
    super(props);

    //find the index of the selected value
    let index = props.children.map(c => c.props.value).indexOf(props.value);

    this.state = {
      index: Math.max(index, 0), //Don't allow negative initial indexes
    };
  }

  componentDidMount() {
    let index = this.state.index;
    this.refs.scrollView.scrollTo({ y: index * 40, animated: false });
  }

  onScroll = event => {
    let index = Math.min(this.props.children.length - 1, Math.max(0, event.nativeEvent.contentOffset.y / 40));
    index = Math.floor(index);

    if(this.state.index !== index){
      this.props.onChange && this.props.onChange(this.props.children[index].props.value);
      this.setState({index});
    }
  };

  render() {
    return (
      <View style={[StyleSheet.picker.style, this.props.style, {height: 40 * 3}]}>
        <ScrollView ref="scrollView"
              snapToInterval={40}
              snapToAlignment="center"
              contentContainerStyle={StyleSheet.picker.containerStyle}
              style={StyleSheet.picker.contentStyle}
              showsVerticalScrollIndicator={false}
              onScroll={this.onScroll}
              scrollEventThrottle={16}>
          {this.props.children}
        </ScrollView>
        <View style={[StyleSheet.picker.overlayStyle, StyleSheet.picker.topOverlayStyle]} pointerEvents="none" />
        <View style={[StyleSheet.picker.overlayStyle, StyleSheet.picker.bottomOverlayStyle]} pointerEvents="none" />
      </View>
    );
  }
}

class PickerItem extends React.Component {
  render() {
    return (
      <Text lineBreakMode="tail" numberOfLines={1} style={[StyleSheet.text, StyleSheet.picker.textStyle]}>{this.props.label.toUpperCase()}</Text>
    );
  }
}
Picker.Item = PickerItem;
