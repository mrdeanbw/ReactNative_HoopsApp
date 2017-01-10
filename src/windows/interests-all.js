import React from 'react';
import {View, ListView, Text, TouchableHighlight} from 'react-native';

import {Header, TextInput, Button, Popup, SuggestEvent} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class InterestsAll extends React.Component {

  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      search: '',
      selected: this.props.selected || {},
      levelPopupInterest: null,
    };
  }

  _getSections(interests, selected = {}) {
    let sections = {};

    interests.forEach(interest => {
      //get the first letter
      let letter = interest.name.substr(0, 1).toLowerCase();
      if(!sections[letter]) {
        sections[letter] = [];
      }
      sections[letter].push({
        ...interest,
        active: !!selected[interest.id],
      });
    });

    let sectionIds = Object.keys(sections);

    return {
      sections,
      sectionIds,
    };
  }

  getSelectedIds() {
    return Object.keys(this.state.selected).filter(userId => {
      return this.state.selected[userId];
    });
  }

  doneButtonEnabled = () => {
    for(let id in this.state.selected) {
      if(this.state.selected[id]) {
        return true;
      }
    }
    return false;
  };

  setSelected = (id, level) => {
    let selected = {
      ...this.state.selected,
      [id]: level,
    };

    this.setState({
      selected,
    });

    this.props.onInterestsChange(selected);
  };

  render() {

    let searchString = this.state.search.toLowerCase();
    let interests = this.props.interests.filter(interest => {
      return interest.name.toLowerCase().search(searchString) !== -1;
    });
    let {sections, sectionIds} = this._getSections(interests, this.state.selected);
    let dataSource = this._ds.cloneWithRowsAndSections(sections, sectionIds);

    return (
      <View style={StyleSheet.profile.interests}>
        <Header
          onClose={this.props.onClose}
          onBack={this.props.onBack}
          title={_('interests')}
          hideSwitcher={true}
        />
        <View style={{flex: 0, height: 50}}>
          <TextInput
            type="search"
            icon="searchGrey"
            clearButtonMode="always"
            placeholder={_('search')}
            onChangeText={(search) => {
              this.setState({search});
            }}
          />
        </View>

        <Popup
          visible={!!this.state.levelPopupInterest}
          onClose={() => this.setState({levelPopupInterest: null})}
          style={[StyleSheet.popupContainer]}
        >
          {this.state.levelPopupInterest && !this.state.levelPopupInterest.active ? (
            <View>
              <Button
                type="alertVertical"
                text={_('casual')}
                onPress={() => {
                  this.setSelected(this.state.levelPopupInterest.id, 'casual');
                  this.setState({levelPopupInterest: null});
                }}
              />
              <Button
                type="alertVertical"
                text={_('competitive')}
                onPress={() => {
                  this.setSelected(this.state.levelPopupInterest.id, 'competitive');
                  this.setState({levelPopupInterest: null});
                }}
              />
              <Button
                type="alertVertical"
                text={_('both')}
                onPress={() => {
                  this.setSelected(this.state.levelPopupInterest.id, 'both');
                  this.setState({levelPopupInterest: null});
                }}
              />
            </View>
          ) : (
            <Button
              type="alertVertical"
              text={_('remove')}
              onPress={() => {
                this.setSelected(this.state.levelPopupInterest.id, null);
                this.setState({levelPopupInterest: null});
              }}
            />
          )}
        </Popup>

        <ListView
          dataSource={dataSource}
          renderSectionHeader={(sectionData, sectionId) => {
            return (
              <View style={StyleSheet.profile.interestsSectionHeader}>
                <Text style={StyleSheet.profile.interestsSectionHeaderText}>
                  {sectionId.toUpperCase()}
                </Text>
              </View>
            );
          }}
          renderRow={(rowData) => {
            return (
              <TouchableHighlight
                underlayColor={
                  rowData.active ?
                  StyleSheet.profile.interestsUnderlayActive :
                  StyleSheet.profile.interestsUnderlay
                }
                style={[
                  StyleSheet.profile.interestsRow,
                  rowData.active && StyleSheet.profile.interestsRowActive,
                ]}
                onPress={() => {
                  //show the level popup
                  this.setState({
                    levelPopupInterest: rowData,
                  });
                }}
              >
                <Text
                  style={[
                    rowData.active && StyleSheet.profile.interestsTextActive
                  ]}
                >{rowData.name}</Text>
              </TouchableHighlight>
            );
          }}
          renderFooter={() => (
            <SuggestEvent/>
          )}
        />

        {this.props.onDonePress && (
          <View style={StyleSheet.interests.footer}>
            <Button
              type={this.doneButtonEnabled() ? 'dialogDefault' : 'dialog'}
              text={_('done')}
              onPress={this.doneButtonEnabled() ? this.props.onDonePress : undefined}
            />
          </View>
        )}

      </View>
    );
  }
}
