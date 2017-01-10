
import React from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';
import {TextInput} from './';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class ListSelect extends React.Component {
  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      search: '',
      dataSource: this.getDataSource(props.rows, ''),
    };
  }

  getDataSource = (rows, search) => {
    //Filter out by text search
    if(search) {
      let searchString = search.toLowerCase();
      rows = rows.filter(row => {
        return row.name.toLowerCase().search(searchString) !== -1;
      });
    }

    //format into alphabetical sections
    let {sections, sectionIds} = this._getSections(rows);

    return this._ds.cloneWithRowsAndSections(sections, sectionIds);
  }

  _getSections = (rows) => {
    let sections = {};

    rows.forEach(row => {
      //get the first letter
      let letter = row.name.substr(0, 1).toLowerCase();
      if(!sections[letter]) {
        sections[letter] = [];
      }
      sections[letter].push({
        ...row, //clone
      });
    });

    let sectionIds = Object.keys(sections);

    return {
      sections,
      sectionIds,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.getDataSource(nextProps.rows, this.state.search),
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0, height: 50}}>
          <TextInput
            type="search"
            icon="searchGrey"
            placeholder={_('search')}
            onChangeText={(search) => {
              this.setState({
                search,
                dataSource: this.getDataSource(this.props.rows, search),
              });
            }}
          />
        </View>
        <ListView
          style={StyleSheet.list.container}
          dataSource={this.state.dataSource}
          renderSectionHeader={(sectionData, sectionId) => {
            return (
              <View style={StyleSheet.list.sectionHeader}>
                <Text style={StyleSheet.list.sectionHeaderText}>
                  {sectionId.toUpperCase()}
                </Text>
              </View>
            );
          }}
          renderRow={(rowData) => {
            return (
              <TouchableHighlight
                onPress={() => this.props.onSelect(rowData.key)}
                underlayColor={StyleSheet.list.highlightColor}
              >
                <View style={StyleSheet.list.row}>
                  <Text style={StyleSheet.list.rowText}>{rowData.name}</Text>
                </View>
              </TouchableHighlight>
            );
          }}
          renderFooter={this.props.renderFooter}
        />
      </View>
    );
  }
}
