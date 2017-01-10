import React from 'react';
import {connect} from 'react-redux';

import {
  Interests as _Interests,
} from '../windows';
import {user, navigation} from '../actions';

class InterestsAll extends React.Component {

  render() {
    let interests = Object.keys(this.props.interests.interestsById).map(id => {
      return this.props.interests.interestsById[id];
    }).filter(interest => interest.important === true);

    let onDonePress = () => {
      this.props.onNavigate('selectMode');
    };

    return (
      <_Interests
        interests={interests}
        onDonePress={onDonePress}
        onPressViewAll={(selectedInterests) => {
          this.props.onNavigate('selectInterestsAll', {
            selected: selectedInterests,
            onDonePress: onDonePress,
          });
        }}
        onInterestsChange={this.props.onInterestsChange}
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
    onNavigate: (key, props) => dispatch(navigation.push({key, props})),
    onInterestsChange: (interests) => dispatch(user.setInterests(interests)),
  }),
)(InterestsAll);
