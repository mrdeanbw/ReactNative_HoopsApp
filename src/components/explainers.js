import React, {Component} from 'react'
import {View, Image, Modal, Text} from 'react-native'
import Swiper from 'react-native-swiper'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import _ from '../i18n'
import {Button} from '../components'

const renderPagination = (index, total, context) => {
  return (
    <Text style={[StyleSheet.text, StyleSheet.explainers.paginatorText]}>{index + 1} of {total}</Text>
  )
}

class Explainers extends Component {

  render() {
    return (
      <Modal visible={this.props.visible ? this.props.visible : false} animationType="fade" >
        <View style={StyleSheet.explainers.container}>
          <Swiper
            autoplay={false}
            renderPagination={renderPagination}
            paginationStyle={StyleSheet.explainers.paginator}
            loop={false}
            showsPagination={true}
          >
            {this.props.images.map(image => {
              return (
                <Image key={image} source={image} style={StyleSheet.explainers.slide} />
              )
            })}
          </Swiper>

          <View style={StyleSheet.explainers.buttonBar}>
            <Button
              text={_('getStarted')}
              style={{backgroundColor: colors.pink}}
              onPress={this.props.onPressButton}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

Explainers.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  visible: React.PropTypes.bool.isRequired,
  onPressButton: React.PropTypes.func.isRequired,
}

export default Explainers
