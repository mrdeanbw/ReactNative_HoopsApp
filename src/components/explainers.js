import React from 'react'
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

class _Explainers extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    return(
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
              text={"GET STARTED"}
              style={{backgroundColor: colors.pink}}
              onPress={this.props.onPressButton}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

export default _Explainers

/*
_Explainers.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.string),
}
*/

