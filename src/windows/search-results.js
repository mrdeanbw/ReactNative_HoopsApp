import React from 'react';
import {View, ScrollView} from 'react-native';

import {EventListItem,UserListItem,Header,MapView} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = {
      showMap: false,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={_('searchResults')}
          onClose={this.props.onClose}
          onBack={this.props.onBack}
          actionButtonType="headerAction"
          actionButton={this.state.showMap ? 'list' : 'pinWhite'}
          onActionPress={() => {
            this.setState({showMap: !this.state.showMap});
          }}
        />

        {this.state.showMap ? (
          <MapView
            events={this.props.events}
            scrollEnabled={true}
            zoomEnabled={true}
            onPressEvent={this.props.onPressEvent}
          />
        ) : (
          <ScrollView contentContainerStyle={StyleSheet.container}>
            {this.props.users.map(user =>
              <UserListItem
                key={user.id}
                user={user}
                onPress={() => this.props.onPressUser(user)}
                hideDisclosure={true}
              />
            )}
            {this.props.events.map(event =>
              <EventListItem
                key={event.id}
                event={event}
                onPress={() => this.props.onPressEvent(event)}
                showDistance={true}
              />
            )}
          </ScrollView>
        )}

      </View>
    );
  }
}
