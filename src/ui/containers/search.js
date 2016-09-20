
import React from 'react';
import {connect} from 'react-redux';
import {Search as _Search} from '../windows';
import {user, navigation} from '../../actions';

class Search extends React.Component {

  render() {

    return (
      <_Search
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        onClose={this.props.onNavigateBack}
        onPressSearch={(searchParams) => {
          this.props.onNavigate('searchResults', {searchParams});
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
  }),
)(Search);
