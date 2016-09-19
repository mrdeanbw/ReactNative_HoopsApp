
import React from 'react';
import {connect} from 'react-redux';
import {Notifications as _Notifications} from '../windows';
import {navigation} from '../../actions';

class Notifications extends React.Component {

  render() {
    return (
      <_Notifications
        onClose={this.props.onNavigateBack}
      />
    );
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onNavigateBack: () => dispatch(navigation.pop()),
  }),
)(Notifications);
