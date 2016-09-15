
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
        onPressSearch={(searchParams) => {
          RouterActions.searchResults({searchParams});
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
