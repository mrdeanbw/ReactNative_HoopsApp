
import React from 'react';
import {TouchableHighlight, Text, Linking} from 'react-native';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class SuggestEvent extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={StyleSheet.list.footerButton}
        underlayColor={StyleSheet.list.highlightColor}
        onPress={() => {
          let url = `mailto:support@hoopsapp.co?subject=New%20Event%20Suggestion`;
          Linking.openURL(url).catch(err => console.warn(err)); //eslint-disable-line no-console
        }}
      >
        <Text style={StyleSheet.list.footerButtonText}>
          {_('suggestMoreActivities')}
        </Text>
      </TouchableHighlight>
    );
  }
}
