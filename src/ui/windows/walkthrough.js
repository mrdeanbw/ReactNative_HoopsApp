
import _ from '../i18n';

import React from 'react';
import {View, Image, TouchableHighlight, Text, Modal} from 'react-native';
import Swiper from 'react-native-swiper';
import StyleSheet from '../styles';


import Login from './login';
import SignUp from './signup';

import Button from '../components/button';
import HighlightText from '../components/highlight-text';

export default class Walkthrough extends React.Component {

  static getTest(close) {
    return {
      title: 'Walkthrough',
      view: Walkthrough,
      viewProps: { onClose: close }
    };
  }

  constructor() {
    super();

    this.state = {
      loginVisible: false,
      signUpVisible: false
    };
  }

  render() {
    return (
      <Image source={StyleSheet.images.walkthrough} style={StyleSheet.walkthrough.backgroundImage}>
        {this.props.onClose && <Button type="title" icon="close" style={StyleSheet.closeButton} onPress={this.props.onClose} />}

        <View style={StyleSheet.walkthrough.logoContainer}>
          <Image source={StyleSheet.images.logo} style={StyleSheet.walkthrough.logo} />
        </View>
        <View style={StyleSheet.walkthrough.swiperContainer}>
          <Swiper autoplay={true} style={StyleSheet.walkthrough.swiper}
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
          <Button type="dialog" text={_('login')}
              onPress={() => this.setState({loginVisible: true})} />

          <Button type="dialogDefault" text={_('signup')}
              onPress={() => this.setState({signUpVisible: true})} />
        </View>

        <Modal visible={this.state.loginVisible} animationType="slide"
             onRequestClose={() => this.setState({loginVisible: false})}>
          <Login application={this.props.application}
               onClose={() => this.setState({loginVisible: false})}/>
        </Modal>
        <Modal visible={this.state.signUpVisible} animationType="slide"
             onRequestClose={() => this.setState({signUpVisible: false})}>
          <SignUp application={this.props.application}
              onClose={() => this.setState({signUpVisible: false})}/>
        </Modal>
      </Image>
    );
  }
};


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
};
