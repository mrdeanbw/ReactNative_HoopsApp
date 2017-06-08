import React from 'react'
import {View, ScrollView, Text} from 'react-native'

import {Window, EventListItem, Header, EmptyScreenInfo} from '../components'
import _ from '../i18n'

export default class Manage extends React.Component {

  static getTest(close) {
    return {
      title: 'Manage',
      view: Window.Organizer,
      viewProps: { initialTab: Manage, onClose: close }
    }
  }

  render() {
    const noEvents = this.props.events.length === 0

    return (
      <View style={{flex: 1}}>
        <Header
          onBack={this.props.onBack}
          onClose={this.props.onClose}
          title={_('manageYourEvents')}
        />
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

