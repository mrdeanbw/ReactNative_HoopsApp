import React, {Component} from 'react'
import {View} from 'react-native'

import _ from '../i18n'
import {Header, ListSelect, SuggestEvent} from '../components'

export default class ActivitiesSelect extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={_('activities')} simple />
        <ListSelect
          rows={this.props.rows}
          onSelect={this.props.onSelect}
          renderFooter={() => (
            <SuggestEvent/>
          )}
        />
      </View>
    )
  }
}
