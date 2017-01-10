
import React from 'react';
import _ from '../i18n';

import StyleSheet from '../styles';

import {View, Animated, Text} from 'react-native';
import Button from './button';
import Menu from './menu';

export default class TabBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuAnimation: new Animated.Value(0),
      menuVisible: props.menuVisible, //control this state for animations
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.menuVisible !== nextProps.menuVisible) {
      if(nextProps.menuVisible) {
        this.setState({menuVisible: true});
        Animated.timing(
          this.state.menuAnimation,
          {toValue: 1, friction: 1, duration: 200}
        ).start();
      } else {
        Animated.timing(
          this.state.menuAnimation,
          {toValue: 0, friction: 1, duration: 200}
        ).start(() => {
          this.setState({menuVisible: false});
        });
      }
    }
  }

  render() {
    let actionIcon = this.props.actionIcon;
    if(this.props.actionTextLarge){
      actionIcon = (
        <Text style={[StyleSheet.text, StyleSheet.eventDetails.actionButtonTextStyle]}>
          {this.props.actionTextLarge}
        </Text>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {this.props.children}
        </View>

        {this.state.menuVisible && (
          <Menu
            animation={this.state.menuAnimation}
            onPressBackground={this.props.onHideMenu}
            user={this.props.user}
            onPressProfile={this.props.onPressProfile}
            currentTab={this.props.currentTab}
            onTabPress={this.props.onTabPress}
            mode={this.props.mode}
            invitationsBadge={this.props.invitationsBadge}
          />
        )}

        <View style={[{flex: 0}, StyleSheet.window.tabBarStyle]}>
          <Button type="tab" icon="home" text={_('home')}
            active={this.props.currentTab === "home"}
            onPress={() => this.props.onTabPress('home')}
          />
          {this.props.mode === 'ORGANIZE' ? (
            <Button type="tab" icon="manage" text={_('manage')}
              active={this.props.currentTab === "manage"}
              onPress={() => this.props.onTabPress('manage')}
            />
          ) : (
            <Button type="tab" icon="myEvents" text={_('myEvents')}
              active={this.props.currentTab === "myEvents"}
              onPress={() => this.props.onTabPress('myEvents')}
            />
          )}

          <Button type={this.props.actionType} icon={actionIcon} text={this.props.actionText} onPress={this.props.onActionPress} />

          <View>
            <Button
              type="tab"
              icon="notifications"
              text={_('notifications')}
              active={this.props.currentTab === "notifications"}
              onPress={() => this.props.onTabPress('notifications')}
            />
            {!!this.props.notificationBadge && (
              <View style={StyleSheet.menu.badgeContainer}>
                <Text style={StyleSheet.menu.badge}>
                  {this.props.notificationBadge}
                </Text>
              </View>
            )}
          </View>

          <Button type="tab" icon="more" text={_('more')}
            active={
              this.props.menuVisible ||
              [
                'help',
                'settings',
                'payments',
                'wallet',
                'calendar',
                'invitations',
                'friends'
              ].indexOf(this.props.currentTab) !== -1
            }
            onPress={this.props.onMenuPress}
          />
        </View>
      </View>
    );
  }
}

TabBar.propTypes = {
  currentTab: React.PropTypes.string.isRequired,
  actionText: React.PropTypes.string.isRequired,
  actionIcon: React.PropTypes.string,
  actionTextLarge: React.PropTypes.string,
  actionType: React.PropTypes.string,

  onTabPress: React.PropTypes.func.isRequired,
};

TabBar.defaultProps = {
  actionType: "actionDefault",
};
