
import React from 'react';
import {connect} from 'react-redux';
import {Search as _Search} from '../windows';
import {
  navigation,
  search as searchActions,
} from '../../actions';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
    };
  }

  render() {
    return (
      <_Search
        onClose={this.props.onNavigateBack}
        onPressSearch={(searchParams) => {
          this.props.onSearch(searchParams);
        }}
        requestGeolocation={() => {
          navigator.geolocation.getCurrentPosition((result) => {
            this.setState({location: result});
          }, (err) => {
            console.warn(err); //eslint-disable-line no-console
            this.setState({location: null});
          });
        }}
        coords={this.state.location && this.state.location.coords}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    events: state.events,
    search: state.search,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onNavigateBack: () => dispatch(navigation.pop()),
    onSearch: (params) => dispatch(searchActions.search(params)),
  }),
)(Search);
