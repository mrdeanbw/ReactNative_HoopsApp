import React from 'react';
import {View} from 'react-native';

import _ from '../i18n';
import {Header, ListSelect, SuggestEvent} from '../components';

export default class ActivitiesSelect extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          onClose={this.props.onClose}
          onBack={this.props.onBack}
          title={_('activities')}
          hideSwitcher={true}
        />
        <ListSelect
          rows={this.props.rows}
          onSelect={this.props.onSelect}
          renderFooter={() => (
            <SuggestEvent/>
          )}
        />
      </View>
    );
  }
}
