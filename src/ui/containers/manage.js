
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {Manage as _Manage} from '../windows';
import {user as actions} from '../../actions';

class Manage extends React.Component {

  onPressEvent(event) {
    if(this.props.user.mode === 'ORGANIZE') {
      RouterActions.eventDashboard({id: event.id});
    }else{
      RouterActions.eventDetails({id: event.id});
    }
  }

  render() {
    let events = this.props.user.organizer.map((id) => {
      return this.props.events.eventsById[id];
    });

    return (
      <_Manage
        onPressEvent={this.onPressEvent.bind(this)}
        events={events}
        onTabPress={(tab) => {
          if(tab === 'home'){
            RouterActions.homeTab();
          }
        }}
        mode={this.props.user.mode}
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
  }),
)(Manage);
