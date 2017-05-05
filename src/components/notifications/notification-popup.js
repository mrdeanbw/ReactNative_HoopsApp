import React, {Component} from 'react'
import {Image, View, Text, TouchableHighlight} from 'react-native'
import moment from 'moment'

import {Button, Popup} from '../../components'
import StyleSheet from '../../styles'

class NotificationPopup extends Component {

  render() {
    return (
      <View>
        <Popup
          visible={!!this.props.options && this.props.showOptions}
          onClose={this.props.onHideOptions}
        >
          {this.props.options && this.props.options.map((option, i) => (
            <Button
              key={i}
              type={option.type}
              text={option.text}
              onPress={() => {
                this.props.onHideOptions()
                option.onPress && option.onPress()
              }}
            />
          ))}
        </Popup>

        <TouchableHighlight
          style={[StyleSheet.notification.container, this.props.style]}
          onPress={this.props.onPress}
          activeOpacity={1.0}
          underlayColor={StyleSheet.notification.underlayColor}
        >
          <View
            style={[
              StyleSheet.notification.wrapper,
              this.props.highlight && StyleSheet.notification.highlightRow,
            ]}
          >
            <View style={StyleSheet.notification.imageContainer}>
              <Image
                source={this.props.image}
                style={StyleSheet.notification.image}
              />
            </View>

            <View style={StyleSheet.notification.textContainer}>
              <Text
                style={[
                  StyleSheet.notification.text,
                  StyleSheet.notification.title
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {this.props.title}
              </Text>

              <Text
                style={[
                  StyleSheet.notification.text,
                  StyleSheet.notification.detail
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {this.props.description}
              </Text>

              <Text style={[StyleSheet.text, StyleSheet.notification.distance,]}>
                {moment(this.props.date).fromNow()}
              </Text>

            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

NotificationPopup.propTypes = {
  image: Image.propTypes.source,
  highlight: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.node.isRequired,
  onPress: React.PropTypes.func,
  date: React.PropTypes.instanceOf(Date).isRequired,
  showOptions: React.PropTypes.bool.isRequired,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
    }).isRequired,
  ),
  onHideOptions: React.PropTypes.func.isRequired,
}

export default NotificationPopup
