
import React from 'react';
import {View} from 'react-native';

import {Header, ListSelect} from '../components';

export default class ActivitiesSelect extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          onClose={this.props.onClose}
          onBack={this.props.onBack}
          title="activities"
          hideSwitcher={true}
        />
        <ListSelect
          rows={Object.keys(this.props.activities).map(key => {
            let activity = this.props.activities[key];
            return {
              name: activity.name,
              key: key,
            };
          })}
          onSelect={(selection) => {
            this.props.onSelect && this.props.onSelect(selection);
          }}
        />
      </View>
    );
  }
}
