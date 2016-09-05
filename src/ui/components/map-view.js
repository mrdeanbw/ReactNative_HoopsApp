
import React from 'react';
import {View, MapView as _MapView, Text, Image} from 'react-native';

import Icon from './icon';

import StyleSheet from '../styles';

export default class MapView extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.mapView.style, this.props.style]}>
        {this.props.title && <View style={[StyleSheet.mapView.titleStyle, this.props.titleStyle]}>
          <Text style={[StyleSheet.text, StyleSheet.mapView.titleTextStyle, this.props.titleTextStyle]}>{StyleSheet.mapView.titleTextTransform(this.props.title)}</Text>
          <Icon name={this.props.icon} style={[StyleSheet.mapView.titleIconStyle, this.props.titleIconStyle]} />
        </View>}

        <View style={[StyleSheet.mapView.containerStyle, this.props.containerStyle]}>
          <_MapView style={[StyleSheet.mapView.mapStyle, this.props.mapStyle]}
               zoomEnabled={!!this.props.zoomEnabled}
               pitchEnabled={!!this.props.pitchEnabled}
               rotateEnabled={!!this.props.rotateEnabled}
               scrollEnabled={!!this.props.scrollEnabled}
               showsCompass={!!this.props.showsCompass}
               showsPointsOfInterest={!!this.props.showsPointsOfInterest}
               followUserLocation={'zoomEnabled' in this.props ? !!this.props.zoomEnabled : true}
               showsUserLocation={'showsUserLocation' in this.props ? !!this.props.showsUserLocation : true}
               region={this.props.region} />
        </View>
      </View>
    );
  }
};
