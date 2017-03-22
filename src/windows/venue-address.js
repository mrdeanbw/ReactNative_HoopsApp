import React, {Component} from 'react'
import {View, Text, ListView, TouchableHighlight} from 'react-native'
import StyleSheet from '../styles'

import _ from '../i18n'
import {Header, TextInput} from '../components'


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
        <Header
          onClose={this.props.onClose}
          onBack={this.props.onBack}
          title={_('venueAddress')}
          hideSwitcher={true}
        />
        <View style={{flex: 0, height: 50}}>
          <TextInput
            type="search"
            icon="searchGrey"
            placeholder={_('searchVenueAddress')}
            onChangeText={(search) => {
              if (this.props.onChangeText) {
                this.props.onChangeText(search)
              }
            }}
          />
        </View>

        {this.props.rows.length === 0 ? (
          <Text style={StyleSheet.noResults}>{_('noAddressFound')}</Text>
        ) : (
          <ListView
            style={StyleSheet.list.container}
            dataSource={this.state.dataSource}
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
          )}
      </View>
    )
  }
}

export default VenueAddress
