import React, {Component} from 'react'
import {connect} from 'react-redux'

import _EventRequests from '../windows/event-requests'
import inflateEvent from '../data/inflaters/event'
import {navigationActions, requestActions} from '../actions'
import {eventSelector} from '../selectors/events'

class EventRequests extends Component {

  render() {
    let event = inflateEvent(
      this.props.event,
      {
        requests: this.props.requests.requestsById,
        users: this.props.users.usersById,
      }
    )

    let requests = event.requests.filter(request => {
      return request && request.user && request.status === 'pending'
    })

    return (
      <_EventRequests
        onBack={this.props.onBack}
        onClose={this.props.onClose}
        requests={requests}
        onPressApprove={(ids) => {
          ids.forEach(id => {
            this.props.onPressApprove(this.props.requests.requestsById[id])
          })
        }}
        onPressDecline={(ids) => {
          ids.forEach(id => {
            this.props.onPressDecline(this.props.requests.requestsById[id])
          })
        }}
      />
    )
  }
}

EventRequests.propTypes = {
  id: React.PropTypes.string.isRequired,
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      user: state.user,
      users: state.users,
      event: eventSelector(state, props.id),
      requests: state.requests,
    }
  }

  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props}, true)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
    onPressApprove: (id) => dispatch(requestActions.allow(id)),
    onPressDecline: (id) => dispatch(requestActions.cancel(id)),
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(EventRequests)
