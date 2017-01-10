import React from 'react';
import {View, Text, ListView, Image, TouchableHighlight} from 'react-native';
import moment from 'moment';

import {Header, Button, Popup} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

/*
 * A map of notification types to row component
 */
export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this._dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      optionsPopupIndex: null,
      dataSource: this._dataSource.cloneWithRows(props.notifications),
    };

    this.ComponentMap = {
      FRIEND_REQUEST: FriendRequestNotification,
      EVENT_REQUEST: EventRequestNotification,
      EVENT_CANCELLED: EventCancelledNotification,
      EVENT_INVITE: EventInviteNotification,
    };

  }

  /*
   * Mark any notifications that are seen as 'read'
   */
  componentDidMount() {
    this.props.notifications.map((notification) => {
      this.props.onSeen(notification);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this._dataSource.cloneWithRows(nextProps.notifications),
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('notifications')}
          onBack={this.props.onBack}
          onClose={this.props.onClose}
        />
        <ListView
          contentContainerStyle={StyleSheet.container}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData, sectionId, rowId) => {
            let Component = this.ComponentMap[rowData.type];
            return (
              <Component
                key={rowData.id}
                notification={rowData}
                onHideOptions={() => {
                  this.setState({optionsPopupIndex: null});
                }}
                onPress={() => {
                  this.setState({optionsPopupIndex: rowId});
                }}
                onRead={() => this.props.onRead(rowData)}
                showOptions={this.state.optionsPopupIndex === rowId}
                onAcceptFriendRequest={this.props.onAcceptFriendRequest}
                onDeclineFriendRequest={this.props.onDeclineFriendRequest}
                onPressUserProfile={this.props.onPressUserProfile}
                onPressEvent={this.props.onPressEvent}
                onAcceptEventRequest={this.props.onAcceptEventRequest}
                onDeclineEventRequest={this.props.onDeclineEventRequest}
                onAcceptEventInvite={this.props.onAcceptEventInvite}
                onDeclineEventInvite={this.props.onDeclineEventInvite}
              />
            );
          }}
        />
      </View>
    );
  }
}

class NotificationRow extends React.Component {
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
                this.props.onHideOptions();
                option.onPress && option.onPress();
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
              <Text style={[StyleSheet.text, StyleSheet.notification.distance]}>
                {moment(this.props.date).fromNow()}
              </Text>

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
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

NotificationRow.propTypes = {
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
};

/**
 * Find instances of $0 $1 $2 etc from a template string and replace with
 * the value given as a replacement.
 * $0 will be replaced with the first replacement argument, $1 with the second etc.
 *
 * @returns Array of text components for use with React
 *
 * @param template {String}
 * @param ...replacements {Node}
 */
function replaceText(template, ...replacements) {
  let regex = /(\$[0-9])/g;
  let parts = template.split(regex);
  return parts.map((part, i) => {
    if(part.match(regex)){
      let index = part.substr(1);
      return <Text key={i}>{replacements[index]}</Text>;
    }else{
      return <Text key={i}>{part}</Text>;
    }
  });
}

class FriendRequestNotification extends React.Component {
  render() {
    let user = this.props.notification.friendRequest.from;
    let status = this.props.notification.friendRequest.status;

    if(!user || !status) {
      return null;
    }

    let description;
    let options = [{
      type: "alertVertical",
      text: _('viewProfile'),
      onPress: () => {
        this.props.onPressUserProfile(this.props.notification.friendRequest.from);
      }
    }];

    if(status === 'pending') {
      description = replaceText(
        _('friendRequestPendingDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      );

      //Accept and Decline options are only available for 'pending' requests.
      options = options.concat([{
        type: "alertVerticalGreen",
        text: _('accept'),
        onPress: () => {
          this.props.onAcceptFriendRequest(this.props.notification);
        },
      },{
        type: "alertVerticalDefault",
        text: _('decline'),
        onPress: () => {
          this.props.onDeclineFriendRequest(this.props.notification);
        },
      }]);
    } else if(status === 'declined') {
      description = replaceText(
        _('friendRequestDeclinedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      );
    } else if(status === 'confirmed') {
      description = replaceText(
        _('friendRequestConfirmedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>
      );
    }

    return (
      <NotificationRow
        image={{uri: user.imageSrc}}
        highlight={status === 'pending'}
        title={_('friendRequest')}
        description={description}
        date={new Date(this.props.notification.date)}
        onPress={this.props.onPress}
        showOptions={this.props.showOptions}
        onHideOptions={this.props.onHideOptions}
        options={options}
      />
    );
  }
}

class EventRequestNotification extends React.Component {
  render() {
    let user = this.props.notification.request.user;
    let event = this.props.notification.request.event;
    let status = this.props.notification.request.status;

    if(!user || !event || !status) {
      return null;
    }

    let description;

    let options = [{
      type: "alertVertical",
      text: _('viewProfile'),
      onPress: () => {
        this.props.onPressUserProfile(user);
      }
    },{
      type: "alertVertical",
      text: _('eventDetails'),
      onPress: () => {
        this.props.onPressEvent(event);
      }
    }];

    if(status === 'pending') {
      description = replaceText(
        _('eventRequestPendingDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>,
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
      );
      options = options.concat([{
        type: "alertVerticalGreen",
        text: _('accept'),
        onPress: () => {
          this.props.onAcceptEventRequest(this.props.notification);
        },
      },{
        type: "alertVerticalDefault",
        text: _('decline'),
        onPress: () => {
          this.props.onDeclineEventRequest(this.props.notification);
        },
      }]);
    }else if(status === 'declined'){
      description = replaceText(
        _('eventRequestDeclinedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>,
      );
    } else if(status === 'confirmed') {
      description = replaceText(
        _('eventRequestConfirmedDescription'),
        <Text style={StyleSheet.notification.highlight}>{user.name}</Text>,
      );
    } else {
      //The status could be 'cancelled'. In which case we just render nothing
      return null;
    }

    return (
      <NotificationRow
        image={{uri: user.imageSrc}}
        highlight={status === 'pending'}
        title={_('eventRequest')}
        description={description}
        date={new Date(this.props.notification.date)}
        onPress={this.props.onPress}
        showOptions={this.props.showOptions}
        onHideOptions={this.props.onHideOptions}
        options={options}
      />
    );
  }
}

class EventCancelledNotification extends React.Component {
  render() {
    let event = this.props.notification.event;
    if(!event) {
      return null;
    }
    let description = replaceText(
      _('eventCancelledDescription'),
      <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
    );
    return (
      <NotificationRow
        image={{uri: event.imageSrc}}
        highlight={false}
        title={_('eventCancelled')}
        description={description}
        date={new Date(this.props.notification.date)}
        showOptions={this.props.showOptions}
        onHideOptions={this.props.onHideOptions}
        options={null}
      />
    );
  }
}

class EventInviteNotification extends React.Component {
  render() {
    let user = this.props.notification.invite.from;
    let event = this.props.notification.invite.event;
    let status = this.props.notification.invite.status;

    if(!user || !event || !status) {
      return null;
    }

    let description = replaceText(
      _('eventCancelledDescription'),
      <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
    );

    let options = [{
      type: "alertVertical",
      text: _('eventDetails'),
      onPress: () => {
        this.props.onPressEvent(event);
      }
    }];

    if(status === 'pending') {
      description = replaceText(
        _('eventInvitePendingDescription'),
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>
      );
      options = options.concat([{
        type: "alertVerticalGreen",
        text: _('accept'),
        onPress: () => {
          this.props.onAcceptEventInvite(this.props.notification);
        },
      },{
        type: "alertVerticalDefault",
        text: _('decline'),
        onPress: () => {
          this.props.onDeclineEventInvite(this.props.notification);
        },
      }]);
    } else if(status === 'declined') {
      description = replaceText(
        _('eventInviteDeclinedDescription'),
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>,
      );
    } else if(status === 'confirmed') {
      description = replaceText(
        _('eventInviteConfirmedDescription'),
        <Text style={StyleSheet.notification.highlight}>{event.title}</Text>,
      );
    } else {
      //The status could be 'cancelled'. In which case we just render nothing
      return null;
    }

    return (
      <NotificationRow
        image={{uri: event.imageSrc}}
        highlight={status === 'pending'}
        title={_('eventInvite')}
        description={description}
        date={new Date(this.props.notification.date)}
        onPress={this.props.onPress}
        showOptions={this.props.showOptions}
        onHideOptions={this.props.onHideOptions}
        options={options}
      />
    );
  }
}
