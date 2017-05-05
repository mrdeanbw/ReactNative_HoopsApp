import React, {Component} from 'react'
import {View, Text, ListView, TouchableHighlight} from 'react-native'

import _ from '../i18n'
import {Header, TextInput} from '../components'
import StyleSheet from '../styles'

class VenueAddress extends Component {

  constructor(props) {
    super(props)

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource:  this.ds.cloneWithRows(props.rows),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.rows),
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={_('venueAddress')} simple />
        <View style={{flex: 0, height: 50}}>
          <TextInput
            type="search"
            icon="searchGrey"
            autoFocus
            placeholder={_('searchVenueAddress')}
            onChangeText={(search) => {
              if (this.props.onChangeText) {
                this.props.onChangeText(search)
              }
            }}
          />
        </View>

        <View style={{flex: 1}}>
          <ListView
            style={StyleSheet.list.container}
            dataSource={this.state.dataSource}
            enableEmptySections
            renderRow={(rowData) => {
              return (
                <TouchableHighlight
                  onPress={() => this.props.onSelect(rowData)}
                  underlayColor={StyleSheet.list.highlightColor}
                >
                  <View style={StyleSheet.list.row}>
                    <Text style={StyleSheet.list.rowText}>{rowData.description}</Text>
                  </View>
                </TouchableHighlight>
              )
            }} />
        </View>
      </View>
    )
  }
}

export default VenueAddress
