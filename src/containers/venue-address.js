import React, {Component} from 'react'

import {autocomplete} from '../data/google-places'
import {VenueAddress as _VenueAddress} from '../windows'

class VenueAddress extends Component {

  constructor(props) {
    super(props)

    this.state = {
      addressAutocomplete: [],
    }
  }

  onSelect(selection) {
    this.props.onSelect && this.props.onSelect(selection)
  }

  onChangeText(searchText) {
    autocomplete(searchText, '').then(result => {
      const addressAutocomplete = result.predictions
      this.setState({addressAutocomplete})
    })
  }

  render() {
    return (
      <_VenueAddress
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        onSelect={this.onSelect.bind(this)}
        onChangeText={this.onChangeText.bind(this)}
        rows={this.state.addressAutocomplete}
      />
    )
  }
}

export default VenueAddress
