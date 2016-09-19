
import React from 'react';
import {connect} from 'react-redux';
import {SearchResults as _SearchResults} from '../windows';
import {user, navigation} from '../../actions';

class SearchResults extends React.Component {

  getFilteredEvents() {
    //TODO return events filtered by search parameters
    return Object.keys(this.props.events.eventsById).map((key) => {
      return this.props.events.eventsById[key];
    });
  }

  render() {
    return (
      <_SearchResults
        events={this.getFilteredEvents()}
        onPressEvent={(event) => {
          this.props.onNavigate('eventDetails', {id: event.id});
        }}
        mode={this.props.user.mode}
        onClose={this.props.onNavigateBack}
      />
    );
  }
}

SearchResults.propTypes = {
  searchParams: React.PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    user: state.user,
    events: state.events,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onNavigateBack: () => dispatch(navigation.pop()),
    onChangeMode: (mode) => dispatch(user.setMode(mode)),
  }),
)(SearchResults);

