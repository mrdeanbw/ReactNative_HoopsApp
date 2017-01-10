import React from 'react';
import {View,Text,ScrollView,Slider,TouchableHighlight} from 'react-native';

import {EventListItem, UserListItem} from '../components';
import _ from '../i18n';
import {Button,TextInput,DateInput,ListInput,Icon,Header} from '../components';
import StyleSheet from '../styles';
import {autocomplete, getPlace} from '../data/google-places';

export default class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      tab: 'events',

      text: '',
      date: null,
      gender: null,
      level: null,
      courtType: null,
      searchRadius: null,

      cityText: '',
      city: {},
      citiesAutocomplete: [],
      cityCoords: null,
    };
  }

  searchButtonEnabled() {
    if(this.state.tab === 'events') {
      return (
        this.props.activity ||
        this.state.date ||
        this.state.gender ||
        this.state.level ||
        this.state.courtType ||
        this.state.cityCoords ||
        this.state.searchRadius
      );
    } else {
      return !!this.state.text;
    }
  }

  onPressSearch = () => {
    if(this.state.tab === 'events') {
      let coords = null;
      if (this.state.cityCoords) {
        coords = this.state.cityCoords;
      } else {
        coords = this.props.coords;
      }

      let searchParams = {
        activity: this.props.activity && this.props.activity.id,
        date: this.state.date,
        gender: this.state.gender,
        level: this.state.level,
        courtType: this.state.courtType,
        geospatial: {
          coords,
          radius: this.state.searchRadius,
        },
      };
      this.props.onPressSearchEvents(searchParams);
    }
  };

  onChangeDate = (date) => {
    this.setState({date});
  };

  onPressGender = (gender) => {
    if(this.state.gender === gender) {
      this.setState({gender: null});
    } else {
      this.setState({gender});
    }
  };

  onChangeLevel = (level) => {
    this.setState({level});
  };

  onChangeVenueType = (courtType) => {
    this.setState({courtType});
  };

  onChangeSearchRadius = () => {
    this.setState({searchRadius: this.state.liveSearchRadius, liveSearchRadius: null});
  };

  onUpdateSearchRadius = (searchRadius) => {
    if(!this.state.liveSearchRadius && searchRadius > 0) {
      this.props.requestGeolocation();
    }
    this.setState({liveSearchRadius: searchRadius});
  };

  _renderGeneralResults() {
    if(this.props.results.events.length + this.props.results.users.length === 0) {
      return;
    }

    return (
      <View style={StyleSheet.search.resultsContainer}>
        <Text style={StyleSheet.search.resultsTitle}>{_('results')}</Text>
        {this.props.results.events.length > 0 && (
          <View>
            <Text style={StyleSheet.search.resultTitle}>
              {_('events').toUpperCase()}
            </Text>
            {this.props.results.events.map(event => (
              <EventListItem
                style={{backgroundColor: 'transparent'}}
                key={event.id}
                event={event}
                onPress={() => this.props.onPressEvent(event)}
                showDistance={true}
                hideDisclosure={true}
              />
            ))}
            {this.props.results.showMoreEvents && (
              <TouchableHighlight
                onPress={() => this.props.onPressSeeMoreEvents()}
                underlayColor={StyleSheet.search.seeMoreUnderlay}
              >
                <Text style={StyleSheet.search.seeMoreText}>{_('seeMore')}</Text>
              </TouchableHighlight>
            )}
          </View>
        )}
        {this.props.results.users.length > 0 && (
          <View>
            <Text style={StyleSheet.search.resultTitle}>
              {_('users').toUpperCase()}
            </Text>
            {this.props.results.users.map(user => (
              <UserListItem
                style={{backgroundColor: 'transparent'}}
                key={user.id}
                user={user}
                onPress={() => this.props.onPressUser(user)}
                hideDisclosure={true}
              />
            ))}
            {this.props.results.showMoreUsers && (
              <TouchableHighlight
                onPress={() => this.props.onPressSeeMoreUsers()}
                underlayColor={StyleSheet.search.seeMoreUnderlay}
              >
                <Text style={StyleSheet.search.seeMoreText}>{_('seeMore')}</Text>
              </TouchableHighlight>
            )}
          </View>
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          onClose={this.props.onClose}
          title={_('search')}
          hideSwitcher={true}
        />
        <View style={StyleSheet.buttons.bar}>
          <Button type="top" text={_('events')} active={this.state.tab === 'events'} onPress={() => this.setState({ tab: 'events' })} />
          <Button type="top" text={_('general')} active={this.state.tab === 'general'} onPress={() => this.setState({ tab: 'general' })} />
        </View>
        <ScrollView contentContainerStyle={StyleSheet.search.containerStyle}>
          {this.state.tab === 'general' && (
            <View>
              <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle, {marginTop: 0}]}>{_('searchWhat')}</Text>
              <TextInput
                value={this.state.text}
                onChangeText={text => {
                  this.setState({text});
                  this.props.onPressSearchGeneral({text});
                }}
                type="flat"
                placeholder={_('searchWhatExample')}
              />
              {this._renderGeneralResults()}
            </View>
          )}

          {this.state.tab === 'events' && (
            <View>
              <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle, {marginTop: 0}]}>{_('searchActivity')}</Text>

              <TouchableHighlight
                onPress={this.props.onPressActivity}
                underlayColor="transparent"
              >
                <View style={StyleSheet.textInputs.flat.style}>
                  <Text
                    style={[
                      StyleSheet.textInputs.flat.textStyle,
                      {color: this.props.activity ? undefined : StyleSheet.textInputs.flat.placeholderTextColor},
                    ]}
                  >
                    {this.props.activity ? this.props.activity.name : _('searchActivityExample')}
                  </Text>
                  <Icon name="chevronRightPink"/>
                </View>
              </TouchableHighlight>

              <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle]}>{_('searchWhen')}</Text>
              <DateInput
                type="flat"
                placeholder={_('dateTime')}
                value={this.state.date}
                initialValue={Date.now()}
                rightBar={<Icon name="listIndicator" />}
                date={true} time={true}
                onChange={this.onChangeDate}
                maxValue={new Date().setFullYear(new Date().getFullYear() + 4)}
              />

              <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle]}>{_('searchGender')}</Text>
              <View style={[StyleSheet.buttons.bar, StyleSheet.singleMarginBottom, {alignSelf: 'center'}]}>
                <Button type="image" icon="male" active={this.state.gender === 'male'} onPress={() => this.onPressGender('male')}/>
                <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                <Button type="image" icon="female" active={this.state.gender === 'female'} onPress={() => this.onPressGender('female')}/>
                <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                <Button type="image" icon="mixed" active={this.state.gender === 'mixed'} onPress={() => this.onPressGender('mixed')}/>
              </View>

              <ListInput
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('level')}
                value={this.state.level}
                onChange={this.onChangeLevel}
              >
                <ListInput.Item text={_('casual')} value="casual" />
                <ListInput.Item text={_('competitive')} value="competitive" />
                <ListInput.Item text={_('open')} value="open" />
              </ListInput>

              <ListInput
                type="flat"
                style={StyleSheet.halfMarginTop}
                placeholder={_('courtType')}
                value={this.state.courtType}
                onChange={this.onChangeVenueType}
              >
                <ListInput.Item text={_('outdoor')} value="outdoor" />
                <ListInput.Item text={_('indoor')} value="indoor" />
                <ListInput.Item text={_('both')} value="both" />
              </ListInput>

              <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle]}>{_('searchCity')}</Text>
              <TextInput
                value={this.state.cityText}
                onChangeText={(cityText) => {
                  this.setState({
                    cityText,
                    city: {},
                  });
                  autocomplete(cityText, '(cities)').then(result => {
                    this.setState({
                      citiesAutocomplete: result.predictions,
                    });
                  });
                }}
                type="flat"
                ref="city"
                placeholder={_('city')}
                autocomplete={this.state.citiesAutocomplete.map(suggestion => {
                  return {
                    key: suggestion.place_id,
                    text: suggestion.description,
                  };
                })}
                onAutocompletePress={(item) => {
                  getPlace(item.key).then(result => {
                    if(result.result && result.result.geometry) {
                      this.setState({
                        cityText: item.text,
                        city: item,
                        citiesAutocomplete: [],
                        cityCoords: result.result.geometry.location
                      });
                    }}).catch(function(e) {
                    console.log(e);
                  });
                }}
                style={StyleSheet.halfMarginBottom}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                selectTextOnFocus={true}
                enablesReturnKeyAutomatically={true}
                icon="city"
                onSubmitEditing={() => this.onSubmitEditing("phone")}
              />

              <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle]}>{_('searchRadius')}</Text>
              <Slider minimumValue={0} maximumValue={100} value={this.state.searchRadius}
                  onSlidingComplete={this.onChangeSearchRadius}
                  onValueChange={this.onUpdateSearchRadius}
                  minimumTrackTintColor={StyleSheet.colors.pink}
                  maximumTrackTintColor={StyleSheet.colors.lightGrey}
                  thumbImage={StyleSheet.icons.sliderThumb} />

              <Text style={[StyleSheet.text, StyleSheet.search.distanceTextStyle]}>
                {_('upto')}{' '}{(this.state.liveSearchRadius || this.state.searchRadius || 0).toFixed(0)}{_('milesAbbreviation')}
              </Text>
            </View>
          )}
        </ScrollView>

        {this.state.tab === 'events' && (
          <View style={StyleSheet.buttons.bar}>
            <Button
              type={this.searchButtonEnabled() ? "dialogDefault" : "dialog"}
              text={_('search')}
              onPress={() => {
                this.searchButtonEnabled() && this.onPressSearch();
              }}
            />
          </View>
        )}
      </View>
    );
  }
}
