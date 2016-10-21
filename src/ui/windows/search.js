
import _ from '../i18n';
import React from 'react';
import {View,Text,ScrollView,Slider} from 'react-native';

import {
  Button,
  TextInput,
  DateInput,
  ListInput,
  Icon,
  Header
} from '../components';
import StyleSheet from '../styles';

export default class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      tab: 'basic',

      text: '',
      date: null,
      gender: null,
      level: null,
      courtType: null,
      searchRadius: null,
    };
  }

  searchButtonEnabled() {
    return (
      this.state.text ||
      this.state.date ||
      this.state.gender ||
      this.state.level ||
      this.state.courtType ||
      this.state.searchRadius
    );
  }

  onPressSearch = () => {
    let searchParams = {
      text: this.state.text,
      date: this.state.date,
      gender: this.state.gender,
      level: this.state.level,
      courtType: this.state.courtType,
      geospatial: {
        coords: this.props.coords,
        radius: this.state.searchRadius,
      },
    };
    this.props.onPressSearch(searchParams);
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

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          onClose={this.props.onClose}
          title={_('search')}
        />
        <View style={StyleSheet.buttons.bar}>
          <Button type="top" text={_('basic')} active={this.state.tab === 'basic'} onPress={() => this.setState({ tab: 'basic' })} />
          <Button type="top" text={_('advanced')} active={this.state.tab === 'advanced'} onPress={() => this.setState({ tab: 'advanced' })} />
        </View>
        <ScrollView contentContainerStyle={StyleSheet.search.containerStyle}>

          <View>
            <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle, {marginTop: 0}]}>{_('searchWhat')}</Text>
            <TextInput
              value={this.state.text}
              onChangeText={(text) => this.setState({text})}
              type="flat"
              placeholder={_('searchWhatExample')}
            />
          </View>

          {this.state.tab === 'advanced' && (
            <View>
              <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle]}>{_('searchWhen')}</Text>
              <DateInput
                type="flat"
                placeholder={_('dateTime')}
                value={this.state.date}
                initialValue={Date.now()}
                rightBar={<Icon name="listIndicator" />}
                date={true} time={true}
                onChange={this.onChangeDate}
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
                rightBar={<Icon name="listIndicator" />}
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
                rightBar={<Icon name="listIndicator" />}
                onChange={this.onChangeVenueType}
              >
                <ListInput.Item text={_('outdoor')} value="outdoor" />
                <ListInput.Item text={_('indoor')} value="indoor" />
                <ListInput.Item text={_('both')} value="both" />
              </ListInput>

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

        <View style={StyleSheet.buttons.bar}>
          <Button
            type={this.searchButtonEnabled() ? "dialogDefault" : "dialog"}
            text={_('search')}
            onPress={() => {
              this.searchButtonEnabled() && this.onPressSearch();
            }}
          />
        </View>
      </View>
    );
  }
}
