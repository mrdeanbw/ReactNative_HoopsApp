
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {Home as _Home} from '../windows';
import {user as actions} from '../../actions';

class Home extends React.Component {

  onPressEvent(event) {
    if(this.props.user.mode === 'ORGANIZE') {
      RouterActions.eventDashboard({id: event.id});
    }else{
      RouterActions.eventDetails({id: event.id});
    }
  }

  render() {
    let events = [];
    for(let id in this.props.events.eventsById) {
      events.push(this.props.events.eventsById[id]);
    }

    events = events.sort((a, b) => {
      return a.date > b.date ? 1 : -1;
    });

    return (
      <_Home
        onPressEvent={this.onPressEvent.bind(this)}
        events={events}
        mode={this.props.user.mode}
        onChangeMode={() => {
          if(this.props.user.mode === 'ORGANIZE'){
            this.props.onChangeMode('PARTICIPATE');
          }else{
            this.props.onChangeMode('ORGANIZE');
          }

          RouterActions.home();
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
    onChangeMode: (mode) => dispatch(actions.setMode(mode)),
  }),
)(Home);
