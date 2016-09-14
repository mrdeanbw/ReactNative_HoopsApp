
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {MyEvents as _MyEvents} from '../windows';
import {user as actions} from '../../actions';

class MyEvents extends React.Component {

  onPressEvent(event) {
    RouterActions.eventDetails({id: event.id});
  }

  render() {
    let events = this.props.user.participant.map((id) => {
      return this.props.events.eventsById[id];
    });

    let history = events.filter((event) => {
      return (new Date(event.date) < new Date());
    });

    let upcoming = events.filter((event) => {
      return (new Date(event.date) > new Date());
    });

    return (
      <_MyEvents
        onPressEvent={this.onPressEvent.bind(this)}
        onPressCreate={() => {}}
        onPressSearch={() => {
          //RouterActions.search();
        }}
        upcoming={upcoming}
        saved={[/*TODO*/]}
        history={history}
        onTabPress={(tab) => {
          if(tab === 'home'){
            RouterActions.homeTab();
          }
        }}
        mode={this.props.user.mode}
        availability={this.props.user.availability}
        onChangeAvailability={(value) => {
          this.props.onChangeAvailability(value);
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
    onChangeAvailability: (value) => dispatch(actions.setAvailability(value)),
  }),
)(MyEvents);
