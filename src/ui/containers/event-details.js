
import React from 'react';
import {connect} from 'react-redux';
import {EventDetails as _EventDetails} from '../windows';

import {
  navigation,
  events,
} from '../../actions';

import inflateEvent from '../../data/inflaters/event';

class EventDetails extends React.Component {

  render() {
    let event = inflateEvent(
      this.props.events.eventsById[this.props.id],
      {
        users: this.props.users.usersById,
      }
    );

    return (
      <_EventDetails
        event={event}
        organizer={event.organizer}
        actionButton={this.props.actionButton}
        onChangeAction={this.props.onChangeAction}
        onPressJoin={() => {
          this.props.onPressJoin(this.props.id);
        }}
        onPressViewList={() => {
          this.props.onDeepLinkTab('myEvents', 'myEvents');
        }}
      />
    );
  }
}

EventDetails.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    router: state.router,
    events: state.events,
    users: state.users,
  }),
  (dispatch) => ({
    onDeepLinkTab: (key, tabKey, props) => {
      dispatch(navigation.deepLinkTab(null, tabKey));
    },
    onPressJoin: (id) => dispatch(events.join(id)),
  }),
)(EventDetails);
