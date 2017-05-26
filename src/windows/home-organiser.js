import React, {Component} from 'react'
import {View, ScrollView, Text} from 'react-native'

import {EventListItem, Header} from '../components'
import _ from '../i18n'
import StyleSheet from '../styles'

class HomeOrganiser extends Component {

  render() {
    const noEvents = this.props.events.length === 0

    return (
      <View style={{flex: 1}}>
        <Header title={_('activeEvents')} />
        <ScrollView>
          {noEvents && this.isOrganizing() && (
            <Text style={StyleSheet.noResults}>{_('noActiveEvents')}</Text>
          )}

          {this.props.events.map(event =>
            <EventListItem
              key={event.id}
              event={event}
              onPress={() => this.props.onPressEvent(event)}
            />
          )}
        </ScrollView>
      </View>
    )
  }
}

export default HomeOrganiser
