
import React from 'react';
import {connect} from 'react-redux';
import {Manage as _Manage} from '../windows';
import {user, navigation} from '../../actions';

class Manage extends React.Component {

  onPressEvent(event) {
    if(this.props.user.mode === 'ORGANIZE') {
      this.props.onNavigate('eventDashboard', {id: event.id});
    }else{
      this.props.onNavigate('eventDetails', {id: event.id});
    }
  }

  render() {
    let events = this.props.user.organizer.map((id) => {
      return this.props.events.eventsById[id];
    }).filter(event => !!event);

    return (
      <_Manage
        onPressEvent={this.onPressEvent.bind(this)}
        events={events}
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        onPressCreate={() => {}}
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
    onNavigate: (key, props) => dispatch(navigation.push({key, props}, true)),
    onToggleMode: () => dispatch(user.toggleMode()),
  }),
)(Manage);
