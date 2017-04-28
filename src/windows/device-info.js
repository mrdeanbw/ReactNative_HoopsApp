import React, {Component} from 'react'
import {View, ScrollView, Text} from 'react-native'

import _ from '../i18n'
import {Header} from '../components'
import StyleSheet from '../styles'

class DeviceInfo extends Component {

  renderRows (rowData) {
    return rowData.map((cell) => {
      const {title, info} = cell
      return (
        <View key={title}>
          <Text style={StyleSheet.deviceInfo.label}>{title}</Text>
          <Text style={StyleSheet.deviceInfo.detail}>{info}</Text>
        </View>
      )
    })
  }

  renderCard(cardTitle, rowData) {
    return (
      <View style={StyleSheet.deviceInfo.sectionContainer}>
        <View style={StyleSheet.deviceInfo.sectionTitleContainer}>
          <Text style={StyleSheet.deviceInfo.sectionTitleText}>{cardTitle.toUpperCase()}</Text>
        </View>
        <View>
          {this.renderRows(rowData)}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={_('deviceInfo')} onBack={this.props.onNavigateBack} hideSwitcher={true} />
        <ScrollView style={StyleSheet.padding}>
          {this.renderCard('Device Hardware', this.props.hardwareData)}
          {this.renderCard('Device OS', this.props.osData)}
          {this.renderCard('App Info', this.props.appData)}
        </ScrollView>
      </View>
    )
  }
}

export default DeviceInfo
