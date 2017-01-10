
import _ from '../i18n';

import React from 'react';
import {Animated, View, Text, Image, Modal} from 'react-native';

import StyleSheet from '../styles';

import Menu from './menu';
import HighlightText from './highlight-text';
import Button from './button';

import * as windows from '../windows';

export default class Window extends React.Component {

  constructor() {
    super();
    this.state = {
      menuAnimation: new Animated.Value(0),
      menuVisible: false,
      modalTransparent: true
    };
  }

  hideMenu = (onStop) => {
    if(!this.state.menuVisible) return onStop && onStop();

    Animated.timing(this.state.menuAnimation, {toValue: 0, friction: 1, duration: 200}).start(() => {
      this.setState({
        menuVisible: false
      });
      if(onStop) onStop();
    });
  };

  showMenu = (onStop) => {
    if(this.state.menuVisible) return onStop();

    this.setState({menuVisible: true});
    setTimeout(() => {
      Animated.timing(this.state.menuAnimation, {toValue: 1, friction: 1, duration: 200}).start(() => {
        if(onStop) onStop();
      });
    }, 0);
  };

  showModal = (modal, modalAnimation = 'fade', modalTransparent = true) => {
    this.setState({ modal: modal, modalAnimation: modalAnimation, modalTransparent: modalTransparent });
  };

  hideModal = () => {
    this.setState({ modal: null });
  };

  render() {
    const transform = (...buttons) => [].concat(...buttons).map((button, i) => React.cloneElement(button, {
      key: i,
      active: button.props.active && !this.state.menuVisible,
      onPress: (...args) => { this.hideMenu(); button.props.onPress && button.props.onPress(...args); }
    }));

    const { buttons, actionButton } = this.props;
    const tabButtons = transform(buttons.slice(0, 2), [actionButton], buttons.slice(2, buttons.length > 4 ? 3 : 4));
    const menuButtons = transform(buttons.slice(buttons.length > 4 ? 3 : 4));

    return (
      <View style={StyleSheet.window.style}>

        <View style={StyleSheet.window.contentStyle}>

          {!this.props.emulateDialog && <View style={StyleSheet.window.titleBarStyle}>

            <View style={StyleSheet.window.logoBarStyle}>
              <View style={StyleSheet.window.accessoryBarStyle}>
                {this.props.onClose && <Button type="title" icon="close" style={StyleSheet.window.closeButton} onPress={this.props.onClose} />}
                {this.props.accessoryViews}
              </View>
              <Image source={StyleSheet.images.logo} style={StyleSheet.window.logoStyle} />
              <Button type="modeSwitch" icon="switch" onPress={this.props.onChangeMode} />
            </View>

            <View style={StyleSheet.window.modeBarStyle}>
              <View style={StyleSheet.window.modeChevronStyle} />
              <HighlightText style={[StyleSheet.text, StyleSheet.window.modeTextStyle]}
                       highlightStyle={StyleSheet.window.modeHighlightTextStyle}
                       highlight={_(this.props.mode)}
                       text={_(this.props.mode + 'Mode')} />
            </View>

            {this.props.title && <View style={StyleSheet.window.titleStyle}>
              {(typeof this.props.title === 'object') && this.props.title ||
              <Text style={[StyleSheet.text, StyleSheet.window.titleTextStyle]}>{this.props.title.toUpperCase()}</Text>}
            </View>}

          </View>}

          {this.props.emulateDialog && <View style={[StyleSheet.dialog.titleStyle]}>
            {this.props.onClose && <View style={[StyleSheet.dialog.leftBarStyle]}>
              {this.props.onClose && <Button type="title" icon="close" onPress={this.props.onClose} />}
            </View>}
            <Text style={[StyleSheet.dialog.titleTextStyle]}>{this.props.title.toUpperCase()}</Text>
          </View>}

          {this.props.children}

        </View>

        {this.state.menuVisible && (
          <Menu
            animation={this.state.menuAnimation}
            onPressBackground={() => {
              this.hideMenu();
            }}
          >
            {menuButtons}
          </Menu>
        )}

        <View style={StyleSheet.window.tabBarStyle}>
          {tabButtons}

          <Button type="tab" icon="more" text={_('more')}
              active={this.state.menuVisible}
              onPress={() => this.state.menuVisible ? this.hideMenu() : this.showMenu()} />
        </View>

        {this.state.modal && <Modal animationType={this.state.modalAnimation || 'fade'} transparent={this.state.modalTransparent}>{this.state.modal}</Modal>}
      </View>
    );
  }
};

class BaseWindow extends React.Component {

  constructor() {
    super();

    this.state = this.getTabState(windows.Home);
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { initialTab, initialTabProps } = nextProps;
    if(initialTab) this.onChangeTab(initialTab, initialTabProps || {});
  }

  getViewProps(view, viewProps = {}) {
    return {
      mode: this.mode,
      ...viewProps
    };
  }

  getTabState(view, viewProps = {}) {
    viewProps = this.getViewProps(view, viewProps);

    return {
      activeTab: view,
      activeTabProps: viewProps,
      title: this.decorateView(view.getTitle(viewProps)),
      actionButton: this.decorateView(view.getActionButton(viewProps)),
      accessoryViews: view.getAccessoryViews ? view.getAccessoryViews(viewProps).map(this.decorateView) : [],
      emulatesDialog: view.emulatesDialog
    };
  }

  decorateView = (el, i) => {
    if(el === null || typeof el !== 'object' || el.props === null || typeof el.props !== 'object') {
      return el;
    }

    const props = {};
    let empty = true;
    Object.keys(el.props).filter(v => typeof el.props[v] === 'function').forEach(v => {
      const fn = el.props[v];
      empty = false;

      props[v] = (...args) => fn.apply(this.refs.activeView, args);
    });
    if(typeof i !== 'undefined' && typeof props.key === 'undefined') {
      props.key = i;
      empty = false;
    }

    return empty ? el : React.cloneElement(el, props);
  };

  getModalState(view, viewProps = {}) {
    viewProps = this.getViewProps(view, viewProps);

    this.setState({
      modal: view,
      modalProps: viewProps,
      modalTitle: view.getTitle(viewProps)
    });
  }

  onChangeTab(view, viewProps = {}) {
    this.setState(this.getTabState(view, viewProps));
  }

  setView(view, viewProps = {}) {
    this.onChangeTab(view, viewProps);
  }

  setActionButton(actionButton) {
    this.setState({ actionButton: this.decorateView(actionButton) });
  }

  setAccessoryViews(...accessoryViews) {
    this.setState({ accessoryViews: accessoryViews.map(this.decorateView) });
  }

  onChangeMode = () => {
    const { initialMode, initialTab, initialTabProps, ...initialProps } = this.props;
    const activeTab = this.state.activeTab;
    const { mode, ...activeTabProps } = this.state.activeTabProps;

    const nextProps = {
      ...initialProps,
      initialTab: activeTab,
      initialTabProps: activeTabProps,
    };
    const nextMode = this.mode === 'organizer' ? 'participant' : 'organizer';
    if(this.refs.activeView && this.refs.activeView.onChangeMode) {
      this.refs.activeView.onChangeMode(nextMode, nextProps);
    }

    this.props.application.setRootView(nextMode === 'organizer' ? Window.Organizer : Window.Participant, nextProps, false);
  };

  onShowModal(view, viewProps = {}) {
    this.setState(this.getModalState(view, viewProps));
  }

  isTabButtonActive(view) {
    const activeTab = this.state.activeTab;
    if(activeTab.getTabHighlight) return activeTab.getTabHighlight(this.state.activeTabProps) === view;
    else return activeTab === view;
  }

  showModal = (...args) => this.refs.window.showModal(...args);
  hideModal = (...args) => this.refs.window.hideModal(...args);

  render(...buttons) {
    buttons = [
      <Button type="tab" icon="home" text={_('home')}
          active={this.isTabButtonActive(windows.Home)}
          onPress={() => this.onChangeTab(windows.Home)}/>,
      buttons[0],
      buttons[1],

      <Menu.Item icon="settings" text={_('settings')}
          onPress={() => this.onShowModal(windows.Settings)}/>,
      <Menu.Item icon="payments" text={_('payments')}
          onPress={() => this.onShowModal(windows.Payments)}/>,
      <Menu.Item icon="notifications" text={_('notifications')} badge={this.props.notifications}
          onPress={() => this.onShowModal(windows.Notifications)}/>,
      <Menu.Item icon="friends" text={_('friends')}
          onPress={() => this.onShowModal(windows.Friends)}/>
    ].concat(buttons.slice(2));

    const modal = this.state.modal && <this.state.modal {...this.state.modalProps}/>;
    const { onClose, ...props } = this.props;

    return (
      <Window ref="window"
          emulateDialog={this.state.emulatesDialog}
          mode={this.mode}
          title={this.state.title}
          modal={modal}
          onChangeMode={this.onChangeMode}
          actionButton={this.state.actionButton}
          accessoryViews={this.state.accessoryViews}
          buttons={buttons}
          onClose={this.state.activeTabProps.onClose || onClose}
          {...props}>
        <this.state.activeTab ref="activeView" window={this} {...this.state.activeTabProps}/>
      </Window>
    );
  }
}

Window.Organizer = class OrganizerWindow extends BaseWindow {

  mode = 'organizer';

  render() {
    return super.render(
      <Button type="tab" icon="manage" text={_('manage')}
          active={this.isTabButtonActive(windows.Manage)}
          onPress={() => this.onChangeTab(windows.Manage)} />,
      <Button type="tab" icon="calendar" text={_('calendar')}
          active={this.isTabButtonActive(windows.Calendar)}
          onPress={() => this.onChangeTab(windows.Calendar)} />
    );
  }

};


Window.Participant = class ParticipantWindow extends BaseWindow {

  mode = 'participant';

  render() {
    return super.render(
      <Button type="tab" icon="myEvents" text={_('myEvents')}
          active={this.isTabButtonActive(windows.MyEvents)}
          onPress={() => this.onChangeTab(windows.MyEvents)} />,
      <Button type="tab" icon="calendar" text={_('invitations')}
          active={this.isTabButtonActive(windows.Invitations)}
          onPress={() => this.onChangeTab(windows.Invitations)} />,

      <Menu.Item icon="calendar" text={_('calendar')}
          onPress={() => this.onShowModal(windows.Calendar)} />
    );
  }

};
