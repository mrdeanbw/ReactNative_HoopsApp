import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {EventDetails as _EventDetails} from '../windows';
import {navigation, events, requests} from '../actions';
import inflateEvent from '../data/inflaters/event';
import inflateUser from '../data/inflaters/user';

class EventDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      isAwaitingCard: false,
      userPaymentMethod: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    //If the first card has been added and we are waiting for one.
    //Use it to pay for the current event
    if(
      this.state.isAwaitingCard &&
      this.props.payments.cards.length === 0 &&
      nextProps.payments.cards.length === 1
    ) {
      this.props.onJoin(this.props.id, this.state.userPaymentMethod);
    }
  }

  render() {
    let event = inflateEvent(
      this.props.events.eventsById[this.props.id],
      {
        users: {
          ...this.props.users.usersById,
          [this.props.user.uid]: {
            ...this.props.user,
            id: this.props.user.uid,
          },
        },
        invites: this.props.invites.invitesById,
        requests: this.props.requests.requestsById,
        interests: this.props.interests.interestsById,
      }
    );

    let user = inflateUser(this.props.user, {
      invites: this.props.invites.invitesById,
      requests: this.props.requests.requestsById,
    });

    let isMember = !!user.requests.concat(user.invites).find(connection => {
      return connection.eventId === event.id && connection.status === 'confirmed';
    });

    let request = user.requests.find(connection => {
      return connection.eventId === event.id;
    });

    let isPendingRequest = request && request.status === 'pending';

    let isSaved = !!Object.keys(user.savedEvents).find(eventId => {
      return eventId === event.id;
    });

    //navRoute is needed to determine weather or not to update the action button
    let tabKey = this.props.navigation.tabKey;
    let tabNav = this.props.navigation.tabs[tabKey];
    let navRoute = tabNav.routes[tabNav.index];

    return (
      <_EventDetails
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        navKey={navRoute.scene}
        event={event}
        isExpired={moment(event.date).isBefore()}
        organizer={event.organizer}
        isMember={isMember}
        isPendingRequest={isPendingRequest}
        isOrganizer={event.organizer && event.organizer.id === this.props.user.uid}
        isSaved={isSaved}
        actionButton={this.props.actionButton}
        onChangeAction={this.props.onChangeAction}
        onPressOrganizer={() => {
          this.props.onNavigate('profile', {id: user.id});
        }}
        onPressSave={() => {
          if(isSaved) {
            this.props.onPressUnsave(this.props.id);
          } else {
            this.props.onPressSave(this.props.id);
          }
        }}
        onPressJoin={(userPaymentMethod) => {
          if(
            event.entryFee === 0 ||
            event.paymentMethod === 'cash' ||
            userPaymentMethod === 'cash' ||
            this.props.payments.cards.length > 0
          ) {
            this.props.onJoin(this.props.id, userPaymentMethod);
          } else {
            this.setState({isAwaitingCard: true, userPaymentMethod});
            this.props.onNavigate('addCard', {}, false);
          }
        }}
        onCancelRequest={() => {
          this.props.onCancelRequest(request);
        }}
        isAwaitingCard={this.state.isAwaitingCard}
        onPressQuit={() => {
          this.props.onPressQuit(this.props.id);
        }}
        onPressViewList={() => {
          this.props.onDeepLinkTab('myEvents', 'myEvents');
        }}
        onPressInvite={() => {
          this.props.onNavigate('eventInvites', {id: event.id, friendsOnly: true});
        }}
        onEditEvent={() => {
          this.props.onNavigate('createEvent', {id: event.id}, false);
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
    payments: state.payments,
    interests: state.interests,
    navigation: state.navigation,
  }),
  (dispatch) => ({
    onNavigate: (key, props, subTab) => dispatch(navigation.push({key, props}, subTab)),
    onDeepLinkTab: (key, tabKey, props) => {
      dispatch(navigation.deepLinkTab(null, tabKey));
    },
    onJoin: (eventId, userPaymentMethod) => {
      dispatch(events.join(eventId, userPaymentMethod));
    },
    onPressQuit: (eventId) => dispatch(events.quit(eventId)),
    onPressSave: (eventId) => dispatch(events.save(eventId)),
    onPressUnsave: (eventId) => dispatch(events.unsave(eventId)),
    onCancelRequest: (request) => dispatch(requests.cancel(request)),
  }),
)(EventDetails);
