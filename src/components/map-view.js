
import React from 'react';
import {View, MapView as _MapView, TouchableHighlight} from 'react-native';

import icons from '../styles/resources/icons';
import Icon from './icon';

const iconsMap = {
  AMERICAN_FOOTBALL: 'pinAmericanFootball',
  ARCHERY: 'pinArchery',
  AUTOMOBILE_RACING: 'pinAutomobileRacing',
  BADMINTON: 'pinBadminton',
  BASEBALL: 'pinBaseball',
  BASKETBALL: 'pinBasketball',
  BEACH_VOLLEYBALL: 'pinVolleyball',
  BIKE: 'pinBike',
  BOWLING: 'pinBowling',
  BOXING: 'pinBoxing',
  CANOEING: 'pinCanoeing',
  CARDS: 'pinCards',
  CHESS: 'pinChess',
  DEFAULT: 'pinDefault',
  FOOTBALL: 'pinFootball',
  FRISBEE: 'pinFrisbee',
  GOLF: 'pinGolf',
  GYM: 'pinGym',
  GYMNASTICS: 'pinGymnastics',
  HOCKEY: 'pinHockey',
  ICE_HOCKEY: 'pinIceHockey',
  ICE_SKATING: 'pinIceSkating',
  MOUNTAINEERING: 'pinMountaineering',
  POOL: 'pinPool',
  RUGBY: 'pinRugby',
  RUNNING: 'pinRunning',
  SKATEBOARDING: 'pinSkateboarding',
  SKIING: 'pinSkiing',
  SWIMMING: 'pinSwimming',
  TABLE_TENNIS: 'pinTableTennis',
  TENNIS: 'pinTennis',
  YOGA: 'pinYoga',
};


export default class MapView extends React.Component {
  render() {
    let annotations = this.props.events.filter(event => {
      return event && event.addressCoords;
    }).map(event => {
      return {
        latitude: event.addressCoords.lat,
        longitude: event.addressCoords.lon,
        image: icons[iconsMap[event.activity] || iconsMap.DEFAULT],
        title: event.title,
        rightCalloutView: (
          <TouchableHighlight
            onPress={() => this.props.onPressEvent(event)}
            underlayColor="transparent"
          >
            <View>
              <Icon name="chevronRight"/>
            </View>
          </TouchableHighlight>
        ),
      };
    });

    //Calculate region size based on events distances
    let region;
    if(this.props.location && this.props.location.lat && this.props.location.lon) {
      let location = this.props.location;

      //Calculate the maximum lat/lon delta
      let maxDelta = this.props.events.filter(event => {
        return event && event.addressCoords;
      }).reduce((prev, event) => {
        let coords = event.addressCoords;

        let deltaLat = Math.abs(coords.lat - location.lat);
        let deltaLon = Math.abs(coords.lon - location.lon);

        return {
          lat: Math.max(deltaLat, prev.lat),
          lon: Math.max(deltaLon, prev.lon),
        };
      }, {lat: 0, lon: 0});

      region = {
        latitude: location.lat,
        longitude: location.lon,
        latitudeDelta: maxDelta.lat * 2.5, // Double (for left+right) and add some padding.
        longitudeDelta: maxDelta.lon * 2.5,
      };
    } else {
      let minLat, minLon;
      let maxLat, maxLon;
      this.props.events.forEach(event => {
        if(event && event.addressCoords) {
          let coords = event.addressCoords;
          minLat = minLat ? Math.min(minLat, coords.lat) : coords.lat;
          maxLat = maxLat ? Math.max(maxLat, coords.lat) : coords.lat;
          minLon = minLon ? Math.min(minLon, coords.lon) : coords.lon;
          maxLon = maxLon ? Math.max(maxLon, coords.lon) : coords.lon;
        }
      });
      if(minLat && maxLat && minLon && maxLon) {
        region = {
          latitude: (minLat + maxLat) / 2, //middle of extreme east+west
          longitude: (minLon + maxLon) / 2, //middle of extreme north+south
          latitudeDelta: Math.max(0.1, Math.abs(minLat - maxLat)),
          longitudeDelta: Math.max(0.1, Math.abs(minLon - maxLon)),
        };
      }
    }

    return (
      <_MapView
        style={[{flex: 1}, this.props.style]}
        showsPointsOfInterest={true}
        region={region}
        annotations={annotations}
        {...this.props}
      />
    );
  }
}

MapView.defaultProps = {
  events: [],
};
