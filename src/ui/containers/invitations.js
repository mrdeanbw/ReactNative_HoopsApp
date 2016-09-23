
import React from 'react';
import {connect} from 'react-redux';
import {Invitations as _Invitations} from '../windows';
import {
  user as userActions,
  navigation as navigationActions,
  invites as invitesActions,
  requests as requestsActions,
} from '../../actions';

import inflateInvite from '../../data/inflaters/invite';
import inflateRequest from '../../data/inflaters/request';

class Invitations extends React.Component {

  render() {

    let received = Object.keys(this.props.user.invites).map(id => {
      return inflateInvite(
        this.props.invites.invitesById[id],
        {
          users: this.props.users.usersById,
          events: this.props.events.eventsById,
        }
      );
    }).map((invite) => {
      //convert organizer from a user id to an object
      //we need to do a deep clone of invite.event.organizer
      return {
        ...invite,
        event: {
          ...invite.event,
          organizer: this.props.users.usersById[invite.event.organizer],
        },
      };
    }).filter(invite => {
      return invite && invite.event && invite.event.organizer;
    }).filter(invite => {
      return invite.status === 'pending';
    });

    let sent = Object.keys(this.props.user.requests).map(id => {
      return inflateRequest(
        this.props.requests.requestsById[id],
        {
          users: this.props.users.usersById,
          events: this.props.events.eventsById,
        }
      );
    }).filter(request => {
      return request && request.event;
    }).filter(request => {
      return request.status === 'pending';
    });

    return (
      <_Invitations
        mode={this.props.user.mode}
        onToggleMode={this.props.onToggleMode}
        received={received}
        sent={sent}

        onPressUser={(user) => {
          this.props.onNavigate('profile', {id: user.id});
        }}
        onPressEventDetails={(event) => {
          this.props.onNavigate('eventDetails', {id: event.id});
        }}
        onPressAccept={this.props.onPressAccept}
        onPressDecline={this.props.onPressDecline}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    users: state.users,
    invites: state.invites,
    requests: state.requests,
    events: state.events,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props})),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onToggleMode: () => dispatch(userActions.toggleMode()),

    onPressAccept: (invite) => dispatch(invitesActions.accept(invite)),
    onPressDecline: (invite) => dispatch(invitesActions.decline(invite)),
    onPressCancel: (request) => dispatch(requestsActions.cancel(request)),
  }),
)(Invitations);
