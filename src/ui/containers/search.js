
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {Search as _Search} from '../windows';
import {user as actions} from '../../actions';

class Search extends React.Component {

  render() {

    return (
      <_Search
        mode={this.props.user.mode}
        onClose={() => RouterActions.pop()}
        onPressSearch={(params) => {
          //TODO search
          //console.log("search with params", params);
          RouterActions.pop();
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
)(Search);
