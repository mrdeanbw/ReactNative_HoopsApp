import React, {Component} from 'react'

import {ActivitiesSelect as _ActivitiesSelect} from '../windows'

class ActivitiesSelect extends Component {

  render() {
    return (
      <_ActivitiesSelect
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        rows={Object.keys(this.props.activities).map(key => {
          let activity = this.props.activities[key]
          return {
            name: activity.name,
            key: key,
          }
        })}
        onSelect={(selection) => {
          this.props.onSelect && this.props.onSelect(selection)
        }}
      />
    )
  }
}

export default ActivitiesSelect
