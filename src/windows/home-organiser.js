import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'

import {EventListItem, Header, EmptyScreenInfo} from '../components'
import _ from '../i18n'

class HomeOrganiser extends Component {

  render() {
    const noEvents = this.props.events.length === 0

    return (
      <View style={{flex: 1}}>
        <Header title={_('activeEvents')} />
        {noEvents ? (
          <View style={{flex: 1}}>
            <EmptyScreenInfo/>
          </View>
        ) : (
          <ScrollView >
            {this.props.events.map(event =>
              <EventListItem
                key={event.id}
                event={event}
                onPress={() => this.props.onPressEvent(event)}
              />
           )}
          </ScrollView>)
       }
      </View>
    )
  }
}

export default HomeOrganiser
