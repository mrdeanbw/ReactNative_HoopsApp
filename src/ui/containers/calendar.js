
import React from 'react';
import {connect} from 'react-redux';
import {Calendar as _Calendar} from '../windows';
import {user, navigation} from '../../actions';

class Calendar extends React.Component {

  render() {

    return (
      <_Calendar
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
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onNavigateBack: () => dispatch(navigation.pop()),
    onToggleMode: () => dispatch(user.toggleMode()),
  }),
)(Calendar);
