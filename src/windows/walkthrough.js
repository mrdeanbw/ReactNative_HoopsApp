import React from 'react'
import {View, Image, Dimensions} from 'react-native'
import Swiper from 'react-native-swiper'

import StyleSheet from '../styles'
import {Button, HighlightText} from '../components'
import _ from '../i18n'

export default class Walkthrough extends React.Component {

  static getTest(close) {
    return {
      title: 'Walkthrough',
      view: Walkthrough,
      viewProps: { onClose: close }
    }
  }

  render() {
alert(Dimensions.get('window').width)
    return (
      <Image source={StyleSheet.images.walkthrough} style={StyleSheet.walkthrough.backgroundImage}>
        <View style={StyleSheet.walkthrough.swiperContainer}>
          <View style={StyleSheet.walkthrough.logoContainer}>
            <Image source={StyleSheet.images.logo} style={StyleSheet.walkthrough.logo} />
          </View>
          <View style={[StyleSheet.walkthrough.swiper]}>
            <Swiper
              autoplay={false}
              paginationStyle={StyleSheet.walkthrough.paginator}
              dot={<View style={StyleSheet.walkthrough.dot}/>}
              activeDot={<View style={StyleSheet.walkthrough.activeDot}/>}
              loop={false}
            >
              <WalkthroughPage image={StyleSheet.images.screengrab1} text={_('walkthrough1')} />
              <WalkthroughPage image={StyleSheet.images.screengrab2} text={_('walkthrough2')} />
              <WalkthroughPage image={StyleSheet.images.screengrab3} text={_('walkthrough3')} />
              <WalkthroughPage image={StyleSheet.images.screengrab4} text={_('walkthrough4')} />
            </Swiper>
          </View>
          <View style={StyleSheet.walkthrough.buttonBar}>
            <Button
              type="dialog"
              text={_('login')}
              onPress={this.props.onPressLogIn}
            />
            <Button
              type="dialogDefault"
              text={_('signup')}
              onPress={() => {
                this.props.onPressSignUp()
              }}
            />
          </View>
        </View>
      </Image>
    )
  }
}

Walkthrough.propTypes = {
  onPressSignUp: React.PropTypes.func.isRequired,
  onPressLogIn: React.PropTypes.func.isRequired,
}


class WalkthroughPage extends React.Component {
  render() {
    return (
      <View style={StyleSheet.walkthrough.page}>
        <HighlightText
          highlight={_('productName')}
          text={this.props.text}
          style={[StyleSheet.text, StyleSheet.walkthrough.pageText]}
          highlightStyle={StyleSheet.walkthrough.pageTextHighlight} />
        <Image style={StyleSheet.walkthrough.pageImage} source={this.props.image} />
      </View>
    )
  }
}
