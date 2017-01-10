import React from 'react';
import {connect} from 'react-redux';

import {
  InterestsAll as _InterestsAll,
} from '../windows';
import {user, navigation} from '../actions';

class InterestsAll extends React.Component {

  render() {
    let interests = Object.keys(this.props.interests.interestsById).map(id => {
      return this.props.interests.interestsById[id];
    });

    return (
      <_InterestsAll
        onClose={this.props.onClose}
        onBack={this.props.onBack}
        selected={this.props.selected}
        interests={interests}
        onDonePress={this.props.onDonePress}
        onInterestsChange={
          this.props.onInterestsChangeOverride || this.props.onInterestsChange
        }
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    interests: state.interests,
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigation.reset({key, props})),
    onInterestsChange: (interests) => dispatch(user.setInterests(interests)),
  }),
)(InterestsAll);
