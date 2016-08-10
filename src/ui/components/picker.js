
import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import StyleSheet from '../styles';

export default class Picker extends React.Component {

    constructor() {
        super();
        this.state = {
            value: null
        };
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
        setTimeout(() => {
            let ref = this.props.children.findIndex(c => c.key === this.state.value);
            if (ref >= 0) this.refs.scrollView.scrollTo({ y: ref * 40, animated: false });
        }, 0);
    }

    componentDidMount() {
        let ref = this.props.children.findIndex(c => c.key === this.state.value);
        if (ref >= 0) this.refs.scrollView.scrollTo({ y: ref * 40, animated: false });
    }

    onScroll = event => {
        let index = Math.min(this.props.children.length - 1, Math.max(0, event.nativeEvent.contentOffset.y / 40));
        let ref = this.props.children[index | 0];
        let value = ref && ref.key || null;

        if(this.state.value !== value) {
            this.setState({value: ref && ref.key || null});
            if(this.props.onChange) this.props.onChange(this.state.value);
        }
    };

    render() {
        const { style, children, ...props} = this.props;

        return (
            <View style={[StyleSheet.picker.style, style, {height: 40*3}]}>
                <ScrollView ref="scrollView"
                            snapToInterval={40}
                            snapToAlignment="center"
                            contentContainerStyle={StyleSheet.picker.containerStyle}
                            style={StyleSheet.picker.contentStyle}
                            showsVerticalScrollIndicator={false}
                            onScroll={this.onScroll}
                            scrollEventThrottle={16}>
                    {children}
                </ScrollView>
                <View style={[StyleSheet.picker.overlayStyle, StyleSheet.picker.topOverlayStyle]} pointerEvents="none" />
                <View style={[StyleSheet.picker.overlayStyle, StyleSheet.picker.bottomOverlayStyle]} pointerEvents="none" />
            </View>
        );
    }
};

class PickerItem extends React.Component {
    render() {
        return (
            <Text lineBreakMode="tail" numberOfLines={1} style={[StyleSheet.text, StyleSheet.picker.textStyle]}>{this.props.label.toUpperCase()}</Text>
        );
    }
}
Picker.Item = PickerItem;