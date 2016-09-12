
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {EventDetails as _EventDetails} from '../windows';
import {user as actions} from '../../actions';

import {View} from 'react-native';

export default class EventDetails extends React.Component {

  render() {
    return (
      <_EventDetails
        event={this.props.events.eventsById[this.props.id]}
      />
    );
  }
}

EventDetails.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    router: state.router,
    events: state.events,
  }),
  (dispatch) => ({
  }),
)(EventDetails);
