
import React from 'react';
import {connect} from 'react-redux';
import {SearchResults as _SearchResults} from '../windows';
import {navigation} from '../../actions';

class SearchResults extends React.Component {

  render() {
    let events = this.props.search.eventIds.map(id => {
      return this.props.events.eventsById[id];
    }).filter(event => !!event);

    return (
      <_SearchResults
        events={events}
        onPressEvent={(event) => {
          this.props.onDeepLinkTab('eventDetails', 'home', {id: event.id});
        }}
        onBack={this.props.onBack}
        onClose={this.props.onClose}
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
    onDeepLinkTab: (key, tabKey, props) => dispatch(
      navigation.deepLinkTab({key, props}, tabKey)
    ),
    onNavigateBack: () => dispatch(navigation.pop()),
  }),
)(SearchResults);

