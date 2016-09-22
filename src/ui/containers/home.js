
import React from 'react';
import {connect} from 'react-redux';
import {Home as _Home} from '../windows';
import {user, navigation} from '../../actions';

class Home extends React.Component {

  onPressEvent(event) {
    if(this.props.user.mode === 'ORGANIZE') {
      this.props.onNavigate('eventDashboard', {id: event.id});
    }else{
      this.props.onNavigate('eventDetails', {id: event.id});
    }
  }

  render() {
    let eventIds = (this.props.user.mode === 'ORGANIZE') ?
      this.props.user.organizing :
      this.props.user.participating;

    let events = Object.keys(eventIds).map((id) => {
      return this.props.events.eventsById[id];
    });

    events = events.filter(event => !!event); //remove events that are undefined

    events = events.sort((a, b) => {
      return a.date > b.date ? 1 : -1;
    });

    return (
      <_Home
        onPressEvent={this.onPressEvent.bind(this)}
        events={events}
        onPressAdd={() => this.props.onNavigate('createEvent')}
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
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
)(Home);
