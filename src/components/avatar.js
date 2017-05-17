import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'

import {navigationActions} from '../actions'

class Avatar extends Component {

  getAvatarColor() {
    const userName = this.props.title
    const name = userName.toUpperCase().split(' ')

    if (name.length === 1) {
      this.avatarName = `${name[0].charAt(0)}`
    } else if (name.length > 1) {
      this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`
    } else {
      this.avatarName = ''
    }

    let sumChars = 0
    for(let i = 0; i < userName.length; i++) {
      sumChars += userName.charCodeAt(i)
    }
    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [
      '#e67e22', // carrot
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50', // midnight blue
    ]

    return colors[sumChars % colors.length]
  }

  renderAvatar() {
    // imageSrc = Facebook OR uploaded Avatar
    const uri = this.props.imageUrl

    return (
      <Image
        source={{uri}}
        style={[
          defaultStyles.avatarStyle,
          this.props.avatarStyle
        ]}
      />
    )
  }
  renderInitials() {
    return (
      <View style={[
        defaultStyles.avatarStyle,
        {backgroundColor: this.getAvatarColor()},
        this.props.avatarStyle
      ]}>
        <Text style={[defaultStyles.textStyle, this.props.textStyle]}>
          {this.avatarName}
        </Text>
      </View>
    )
  }

  render() {
    const avatarContent = this.props.imageUrl ? this.renderAvatar() : this.renderInitials()
    if (this.props.onPress) {
      return (
        <TouchableOpacity accessibilityTraits="image" onPress={this.props.onPress}>
          {avatarContent}
        </TouchableOpacity>
      )
    } else {
        return avatarContent
    }
  }
}

const defaultStyles = {
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: '100',
  },
}

Avatar.propTypes = {
  onPress: React.PropTypes.func.onPress,
  imageUrl: React.PropTypes.string,
  title: React.PropTypes.string.isRequired
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onNavigate: (key, props) => dispatch(navigationActions.push({key, props})),
    hideMenu: () => dispatch(navigationActions.hideMenu()),
  }),
)(Avatar)
