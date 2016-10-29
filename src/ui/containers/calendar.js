
import React from 'react';
import {connect} from 'react-redux';
import {Calendar as _Calendar} from '../windows';
import {user, navigation} from '../../actions';

import moment from 'moment';

class Calendar extends React.Component {

  constructor() {
    super();
    this.state = {
      selected: moment(),
    };
  }

  render() {
    let events = Object.keys(this.props.user.organizing).map(id => {
      return this.props.events.eventsById[id];
    }).filter(event => event);

    return (
      <_Calendar
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        selectedDate={this.state.selected}
        onChangeDate={(date) => this.setState({selected: moment(date)})}
        events={events}
        onPressEvent={(event) => {
          this.props.onNavigate('eventDetails', {id: event.id});
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    events: state.events,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onNavigateBack: () => dispatch(navigation.pop()),
    onToggleMode: () => dispatch(user.toggleMode()),
  }),
)(Calendar);
