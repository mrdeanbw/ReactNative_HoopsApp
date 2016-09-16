
import React from 'react';
import _ from '../i18n';

import StyleSheet from '../styles';

import {View, Animated, StatusBar} from 'react-native';
import Button from './button';
import Menu from './menu';
import Header from './header';

export default class TabBar extends React.Component {

  constructor() {
    super();
    this.state = {
      menuAnimation: new Animated.Value(0),
      menuVisible: false,
    };
  }

  hideMenu = (onStop) => {
    if(!this.state.menuVisible) {
      return onStop && onStop();
    }

    Animated.timing(this.state.menuAnimation, {toValue: 0, friction: 1, duration: 200}).start(() => {
      this.setState({
        menuVisible: false
      });
      if(onStop) {
        onStop();
      }
    });
  };

  showMenu = (onStop) => {
    if(this.state.menuVisible) {
      return onStop();
    }

    this.setState({menuVisible: true});
    setTimeout(() => {
      Animated.timing(this.state.menuAnimation, {toValue: 1, friction: 1, duration: 200}).start(() => {
        if(onStop) {
          onStop();
        }
      });
    }, 0);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <Header
          mode={this.props.mode}
          title={this.props.title}
          accessoryViews={this.props.accessoryViews}
          onChangeMode={this.props.onChangeMode}
        />

        <View style={{flex: 1}}>
          {this.props.children}
        </View>

        {this.state.menuVisible && (
          <Menu
            animation={this.state.menuAnimation}
            onPressBackground={() => {
              this.hideMenu();
            }}
          >
            <Menu.Item icon="help" text={_('help')} onPress={() => {}} />
            <Menu.Item icon="settings" text={_('settings')} onPress={() => this.props.onTabPress('settings')}/>
            <Menu.Item icon="payments" text={_('payments')} onPress={() => {}}/>
            <Menu.Item icon="notifications" text={_('notifications')} badge={this.props.notifications} onPress={() => {}} />
            <Menu.Item icon="friends" text={_('friends')} onPress={() => {}} />
          </Menu>
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

          <Button type={this.props.actionType} icon={this.props.actionIcon} text={this.props.actionText} onPress={this.props.onActionPress} />

          {this.props.mode === 'ORGANIZE' ? (
            <Button type="tab" icon="calendar" text={_('calendar')}
              active={this.props.currentTab === "calendar"}
              onPress={() => this.props.onTabPress('calendar')}
            />
          ) : (
            <Button type="tab" icon="calendar" text={_('invitations')}
              active={this.props.currentTab === 'invitations'}
              onPress={() => this.props.onTabPress('invitations')}
            />
          )}

          <Button type="tab" icon="more" text={_('more')}
            active={this.state.menuVisible || this.props.currentTab === 'more'}
            onPress={() => this.state.menuVisible ? this.hideMenu() : this.showMenu()}
          />
        </View>
      </View>
    );
  }
}

TabBar.propTypes = {
  ...Header.propTypes,

  currentTab: React.PropTypes.string.isRequired,
  actionText: React.PropTypes.string.isRequired,
  actionIcon: React.PropTypes.string.isRequired,
  actionType: React.PropTypes.string,

  onTabPress: React.PropTypes.func.isRequired,
};

TabBar.defaultProps = {
  actionType: "actionDefault",
};
