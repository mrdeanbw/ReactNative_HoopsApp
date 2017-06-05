import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import Swiper from 'react-native-swiper'

class _Explainers extends React.Component {
  constructor(props){
    super(props)
  }

  renderSlider(){
    let i
    for (i = 0; i <= this.props.images.length; i++ ) {
      return(
        <Image src={this.props.images[i]} style={styles.slide}/>
      )
    }
  }

  render(){
    return(
      <View style={this.props.containerStyle}>
        <Swiper
          autoplay={true}
          loop={false}
        >
          {this.renderSliders()}
        </Swiper>
      </View>
    )
  }
}

export default _Explainers

_Explainers.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.string),
}

const styles = StyleSheet.create({
  slide: {
    resizeMode: 'cover',
  }
})
