
import React from 'react';
import {connect} from 'react-redux';

import {Invitations as _Invitations} from '../windows';
import {
  navigation as navigationActions,
  invites as invitesActions,
  requests as requestsActions,
} from '../actions';
import inflateInvite from '../data/inflaters/invite';
import inflateRequest from '../data/inflaters/request';

class Invitations extends React.Component {

  constructor() {
    super();
    this.state = {
      awaitingCardForInvite: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    //If the first card has been added and we are waiting for one.
    //Use it to pay for the current event
    if(
      this.state.awaitingCardForInvite &&
      this.props.payments.cards.length === 0 &&
      nextProps.payments.cards.length === 1
    ) {
      this.props.onPressAccept(this.state.awaitingCardForInvite);
    }
  }

  componentDidMount() {
    this.props.onMarkInvitesSeen(this.getReceived());
  }

  getReceived = () => {
    return Object.keys(this.props.user.invites).map(id => {
      return inflateInvite(
        this.props.invites.invitesById[id],
        {
          users: this.props.users.usersById,
          events: this.props.events.eventsById,
        }
      );
    }).filter(invite => {
      return invite && invite.event;
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
      return invite && invite.event && typeof invite.event.organizer === 'object';
    }).filter(invite => {
      return invite.status === 'pending';
    });


  };

  render() {
    let received = this.getReceived();

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
    }).map((request) => {
      //convert organizer from a user id to an object
      //we need to do a deep clone of invite.event.organizer
      return {
        ...request,
        event: {
          ...request.event,
          organizer: this.props.users.usersById[request.event.organizer],
        },
      };
    }).filter(request => {
      return request && request.event && typeof request.event.organizer === 'object';
    }).filter(request => {
      return request.status === 'pending';
    });

    return (
      <_Invitations
        received={received}
        sent={sent}

        onPressUser={(user) => {
          this.props.onNavigate('profile', {id: user.id});
        }}
        onPressEventDetails={(event) => {
          this.props.onNavigate('eventDetails', {id: event.id});
        }}
        onPressAccept={(invite) => {
          if(invite.event.entryFee === 0 || invite.event.paymentMethod !== 'app') {
            this.props.onPressAccept(invite);
          } else if(this.props.payments.cards.length > 0) {
            this.props.onPressAccept(invite);
          } else {
            this.setState({awaitingCardForInvite: invite});
            this.props.onNavigate('addCard', {}, false);
          }
        }}
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
    payments: state.payments,
  }),
  (dispatch) => ({
    onNavigate: (key, props, subTab) => dispatch(navigationActions.push({key, props}, subTab)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onPressAccept: (invite) => dispatch(invitesActions.accept(invite)),
    onPressDecline: (invite) => dispatch(invitesActions.decline(invite)),
    onPressCancel: (request) => dispatch(requestsActions.cancel(request)),
    onMarkInvitesSeen: (invites) => dispatch(invitesActions.markSeen(invites)),
  }),
)(Invitations);
