
import React from 'react';
import {connect} from 'react-redux';
import {EventDetails as _EventDetails} from '../windows';

import {
  navigation,
  events,
} from '../../actions';

import inflateEvent from '../../data/inflaters/event';
import inflateUser from '../../data/inflaters/user';

class EventDetails extends React.Component {

  render() {
    let event = inflateEvent(
      this.props.events.eventsById[this.props.id],
      {
        users: this.props.users.usersById,
      }
    );

    let user = inflateUser(this.props.user, {
      invites: this.props.invites.invitesById,
      requests: this.props.requests.requestsById,
    });

    let isMember = !!user.requests.concat(user.invites).find(connection => {
      return connection.eventId === event.id && connection.status === 'confirmed';
    });

    let isSaved = !!Object.keys(user.savedEvents).find(eventId => {
      return eventId === event.id;
    });

    return (
      <_EventDetails
        event={event}
        organizer={event.organizer}
        isMember={isMember}
        isOrganizer={event.organizer && event.organizer.id === this.props.user.uid}
        isSaved={isSaved}
        actionButton={this.props.actionButton}
        onChangeAction={this.props.onChangeAction}
        onPressSave={() => {
          if(isSaved) {
            this.props.onPressUnsave(this.props.id);
          } else {
            this.props.onPressSave(this.props.id);
          }
        }}
        onPressJoin={() => {
          this.props.onPressJoin(this.props.id);
        }}
        onPressQuit={() => {
          this.props.onPressQuit(this.props.id);
        }}
        onPressViewList={() => {
          this.props.onDeepLinkTab('myEvents', 'myEvents');
        }}
        onCancelEvent={(message) => {
          //TODO
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
    user: state.user,
    requests: state.requests,
    invites: state.invites,
  }),
  (dispatch) => ({
    onDeepLinkTab: (key, tabKey, props) => {
      dispatch(navigation.deepLinkTab(null, tabKey));
    },
    onPressJoin: (eventId) => dispatch(events.join(eventId)),
    onPressQuit: (eventId) => dispatch(events.quit(eventId)),
    onPressSave: (eventId) => dispatch(events.save(eventId)),
    onPressUnsave: (eventId) => dispatch(events.unsave(eventId)),
  }),
)(EventDetails);
