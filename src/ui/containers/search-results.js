
import React from 'react';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import {SearchResults as _SearchResults} from '../windows';
import {user as actions} from '../../actions';

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
          RouterActions.eventDetails({id: event.id});
        }}
        mode={this.props.user.mode}
        onClose={() => RouterActions.pop()}
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
    onChangeMode: (mode) => dispatch(actions.setMode(mode)),
  }),
)(SearchResults);

