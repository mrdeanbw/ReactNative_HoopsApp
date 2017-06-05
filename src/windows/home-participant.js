import React, {Component} from 'react'
import {View, ScrollView, Text} from 'react-native'

import {EventListItem, Header, Button, MapView, Explainers} from '../components'
import _ from '../i18n'
import StyleSheet from '../styles'
import {images} from '../styles/resources'

class HomeParticipant extends Component {

  constructor() {
    super()
    this.state = {
      scrollHeight: undefined,
      showMap: true,
      modalVisible: true,
    }
  }

  renderMap() {
    return (
      <View style={StyleSheet.home.nearbyMapContainer}>
        <MapView
          events={this.props.nearby.map(item => item.event)}
          location={this.props.location}
          showsUserLocation={true}
          onPressEvent={this.props.onPressEvent}
        />
      </View>
    )
  }

  renderList() {
    return (
      <ScrollView>
        {this.props.nearby.map(item => (
          <EventListItem
            key={item.event.id}
            onPress={() => this.props.onPressEvent(item.event)}
            event={item.event}
            showDistance={true}
          />
        ))}
      </ScrollView>
    )
  }

  render() {
    const slides = [images.slide1, images.slide2, images.slide3]

    return (
      <View style={{flex: 1}}>
        <Explainers
          visible={this.state.modalVisible ? this.state.modalVisible : false}
          onPressButton={() => this.setState({modalVisible: false})}
          images={slides}
        />
        <Header title={_('nearbyEvents')} />
        <View style={{flex: 1}}>
          {!this.state.showMap && this.props.nearby.length === 0 ?
            (<Text style={StyleSheet.noResults}>{_('noEventsNearby')}</Text>) : null
          }

          {this.state.showMap ? this.renderMap() : this.renderList()}
        </View>

        <Button
          style={StyleSheet.home.listIcon}
          icon={this.state.showMap ? 'list' : 'pinWhite'}
          onPress={() => this.setState({showMap: !this.state.showMap})}
        />
      </View>
    )
  }
}

export default HomeParticipant

