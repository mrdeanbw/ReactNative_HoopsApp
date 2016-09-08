
import _ from '../i18n';

import React from 'react';
import {View, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import StyleSheet from '../styles';

import {connect} from 'react-redux';
import {user as actions} from '../../actions';
import {Actions as RouterActions} from 'react-native-router-flux';

import Button from '../components/button';
import HighlightText from '../components/highlight-text';

export class Walkthrough extends React.Component {

  static getTest(close) {
    return {
      title: 'Walkthrough',
      view: Walkthrough,
      viewProps: { onClose: close }
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user.uid === null && nextProps.user.uid){
      console.log("signed in props", this.props.user.uid, nextProps.user.uid);
      //user has become signed in
      RouterActions.selectMode();
    }
  }

  render() {
    return (
      <Image source={StyleSheet.images.walkthrough} style={StyleSheet.walkthrough.backgroundImage}>
        {this.props.onClose && <Button type="title" icon="close" style={StyleSheet.closeButton} onPress={this.props.onClose} />}

        <View style={StyleSheet.walkthrough.logoContainer}>
          <Image source={StyleSheet.images.logo} style={StyleSheet.walkthrough.logo} />
        </View>
        <View style={StyleSheet.walkthrough.swiperContainer}>
          <Swiper autoplay={false} style={StyleSheet.walkthrough.swiper}
              paginationStyle={StyleSheet.walkthrough.paginator}
              dot={<View style={StyleSheet.walkthrough.dot}/>}
              activeDot={<View style={StyleSheet.walkthrough.activeDot}/>}>
            <WalkthroughPage image={StyleSheet.images.screengrab1} text={_('walkthrough1')}></WalkthroughPage>
            <WalkthroughPage image={StyleSheet.images.screengrab2} text={_('walkthrough2')}></WalkthroughPage>
            <WalkthroughPage image={StyleSheet.images.screengrab3} text={_('walkthrough3')}></WalkthroughPage>
            <WalkthroughPage image={StyleSheet.images.screengrab3} text={_('walkthrough4')}></WalkthroughPage>
          </Swiper>
        </View>
        <View style={StyleSheet.walkthrough.buttonBar}>
          <Button
            type="dialog"
            text={_('login')}
            onPress={() => RouterActions.login({
              onSignIn: this.props.onSignIn,
              onFacebookSignIn: this.props.onFacebookSignIn,
            })}
          />

          <Button
            type="dialogDefault"
            text={_('signup')}
            onPress={() => RouterActions.signup({
              onSignUp: this.props.onSignUp,
              onFacebookSignUp: this.props.onFacebookSignUp,
            })}
          />
        </View>
      </Image>
    );
  }
}


class WalkthroughPage extends React.Component {
  render() {
    return (
      <View style={StyleSheet.walkthrough.page}>
        <HighlightText highlight={_('productName')} text={this.props.text}
                 style={[StyleSheet.text, StyleSheet.walkthrough.pageText]}
                 highlightStyle={StyleSheet.walkthrough.pageTextHighlight} />
        <Image style={StyleSheet.walkthrough.pageImage} source={this.props.image} />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    router: state.router,
  }),
  (dispatch) => ({
    onSignIn: (username, password) => dispatch(actions.signIn(username, password)),
    onFacebookSignIn: () => dispatch(actions.facebookSignIn()),
    onSignUp: (username, password, extra) => {
      dispatch(actions.signUp(username, password, extra));
    },
    onFacebookSignUp: () => dispatch(actions.facebookSignUp()),
  }),
)(Walkthrough);
