
import React from 'react';
import {connect} from 'react-redux';
import {CreateEvent as _CreateEvent} from '../windows';
import {user, navigation, events} from '../../actions';

class CreateEvent extends React.Component {

  render() {
    return (
      <_CreateEvent
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        onComplete={(eventData) => {
          this.props.onSaveEvent(eventData);
          this.props.onNavigateBack();
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
    onSaveEvent: (eventData) => dispatch(events.create(eventData)),
  }),
)(CreateEvent);
