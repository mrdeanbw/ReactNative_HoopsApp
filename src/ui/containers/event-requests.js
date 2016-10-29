
import React from 'react';
import {connect} from 'react-redux';
import _EventRequests from '../windows/event-requests';
import {
  user as userActions,
  navigation as navigationActions,
  requests as requestsActions,
} from '../../actions';

import inflateEvent from '../../data/inflaters/event';

class EventRequests extends React.Component {

  render() {
    let event = inflateEvent(
      this.props.events.eventsById[this.props.id],
      {
        requests: this.props.requests.requestsById,
        users: this.props.users.usersById,
      }
    );

    let requests = event.requests.filter(request => {
      return request && request.user && request.status === 'pending';
    });

    return (
      <_EventRequests
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        requests={requests}
        onPressApprove={(ids) => {
          ids.forEach(id => {
            this.props.onPressApprove(this.props.requests.requestsById[id]);
          });
        }}
        onPressDecline={(ids) => {
          ids.forEach(id => {
            this.props.onPressDecline(this.props.requests.requestsById[id]);
          });
        }}
      />
    );
  }
}

EventRequests.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    events: state.events,
    requests: state.requests,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onToggleMode: () => dispatch(userActions.toggleMode()),
    onPressApprove: (id) => dispatch(requestsActions.allow(id)),
    onPressDecline: (id) => dispatch(requestsActions.cancel(id)),
  }),
)(EventRequests);
