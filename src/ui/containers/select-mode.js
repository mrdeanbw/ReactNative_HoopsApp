
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {SelectMode as _SelectMode} from '../windows';
import {user as actions} from '../../actions';

class SelectMode extends React.Component {

  componentWillUpdate(nextProps) {
    if(nextProps.user.mode) {
      RouterActions.tabs();
    }
  }

  render() {
    return (
      <_SelectMode
        onSetMode={(mode) => {
          this.props.onSetMode(mode);
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onSetMode: (mode) => dispatch(actions.setMode(mode)),
  }),
)(SelectMode);
