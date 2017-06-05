import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'

import {EventListItem, Header, EmptyScreenInfo, Explainers} from '../components'
import _ from '../i18n'
import {images} from '../styles/resources'

class HomeOrganiser extends Component {

  constructor() {
    super()
    this.state = {
      modalVisible: true,
    }
  }

  render() {
    const noEvents = this.props.events.length === 0
    const slides = [images.slide1, images.slide2, images.slide3]

    return (
      <View style={{flex: 1}}>
        <Explainers
          visible={this.state.modalVisible}
          onPressButton={() => this.setState({modalVisible: false})}
          images={slides}
        />
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
