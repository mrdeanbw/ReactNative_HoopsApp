import React from 'react'
import {View, ScrollView, Text} from 'react-native'

import StyleSheet from '../styles'
import EventListItem from '../components/event-list-item'
import {Header, Button, MapView} from '../components'
import _ from '../i18n'

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      scrollHeight: undefined,
      showMap: true,
    }
  }

  isOrganizing() {
    return this.props.mode === 'ORGANIZE'
  }

  renderEvents() {
    const noEvents = this.props.events.length === 0
    return (
      <View>
        {noEvents && this.isOrganizing() && (
          <Text style={StyleSheet.noResults}>{_('noActiveEvents')}</Text>
        )}
        {noEvents && !this.isOrganizing() && (
          <Text style={StyleSheet.noResults}>{_('noUpcomingEvents')}</Text>
        )}
        {this.props.events.map(event =>
          <EventListItem
            key={event.id}
            event={event}
            onPress={() => this.props.onPressEvent(event)}
            showDistance={!this.isOrganizing()}
          />
        )}
      </View>
    )
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
      this.props.nearby.map(item => (
        <EventListItem
          key={item.event.id}
          onPress={() => this.props.onPressEvent(item.event)}
          event={item.event}
          showDistance={true}
        />
      ))
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={this.isOrganizing() ? _('activeEvents') :  _('nearbyEvents')} />
        <ScrollView
          contentContainerStyle={StyleSheet.home.container}
          onLayout={(e) => this.setState({scrollHeight: e.nativeEvent.layout.height})}
        >
          {!this.isOrganizing() && !this.state.showMap && this.props.nearby.length === 0 ?
             (<Text style={StyleSheet.noResults}>{_('noEventsNearby')}</Text>) : null
          }

          {this.isOrganizing() && (
            <View style={{minHeight: (this.state.scrollHeight - 300)}}>
              {this.renderEvents()}
            </View>
          )}

          {!this.isOrganizing() && (
            <View style={StyleSheet.home.nearbyContainer}>
              {this.state.showMap ? this.renderMap() : this.renderList()}
            </View>
          )}
        </ScrollView>

        {!this.isOrganizing() && (
          <Button
            style={StyleSheet.home.listIcon}
            icon={this.state.showMap ? 'list' : 'pinWhite'}
            onPress={() => {
              this.setState({showMap: !this.state.showMap})
            }}
          />
        )}
      </View>
    )
  }
}

export default Home
