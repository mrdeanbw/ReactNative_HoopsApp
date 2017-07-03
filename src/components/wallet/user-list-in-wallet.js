import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {Avatar} from '../../components'
import _ from '../../i18n'
import StyleSheet from '../../styles'

class UserListInWallet extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let transaction = this.props.transaction
    let display = this.props.display
    let  displayStyle = this.props.displayStyle

    return(
      <View style={[StyleSheet.wallet.UserListInWallet.container, displayStyle]}>
        {display && (
        <View style={[StyleSheet.wallet.UserListInWallet.dateContainer]}>
          <Text style={[StyleSheet.text, StyleSheet.wallet.UserListInWallet.dateText]}>{this.props.displayDate}</Text>
        </View>
        )}
        <View style={StyleSheet.wallet.UserListInWallet.mainContentContainer}>
          <View style={StyleSheet.wallet.UserListInWallet.imageContainer}>
           <Avatar title={transaction.status} avatarStyle={StyleSheet.wallet.UserListInWallet.avatarStyle} />
          </View>
          <View style={StyleSheet.wallet.UserListInWallet.textContainer}>
            <Text style={[StyleSheet.text, StyleSheet.wallet.UserListInWallet.textStyle]} numberOfLines={1} ellipsizeMode="tail">
              {transaction.currency + ' ' + transaction.type}
            </Text>
            <Text style={[StyleSheet.text, StyleSheet.wallet.UserListInWallet.activityTextStyle]} numberOfLines={1} ellipsizeMode="tail">
              {transaction.object}
            </Text>
          </View>
          <View>
            <Text style={[StyleSheet.text, StyleSheet.wallet.UserListInWallet.price]}>+£{transaction.amount}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default UserListInWallet
