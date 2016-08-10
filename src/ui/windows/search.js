
import _ from '../i18n';
import React from 'react';
import {View,Text,ScrollView,Slider} from 'react-native';

import {Window, Button, Dialog, EventListItem, TextInput, DateInput, ListInput, Icon} from '../components';
import StyleSheet from '../styles';



export default class Search extends React.Component {

    static getTest(close) {
        return {
            title: 'Search',
            view: Search,
            viewProps: { onClose: close }
        };
    }

    constructor() {
        super();
        this.state = {
            tab: 'distance',
            searchRadius: 40
        };
    }

    onPressSearch = () => {
        if(this.props.onClose) this.props.onClose();
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

    onChangeVenueType = (venueType) => {
        this.setState({venueType});
    };

    onChangeSearchRadius = () => {
        this.setState({searchRadius: this.state.liveSearchRadius, liveSearchRadius: null})
    };

    onUpdateSearchRadius = (searchRadius) => {
        this.setState({liveSearchRadius: searchRadius});
    };

    render() {
        return (
            <Dialog ref="dialog" style={StyleSheet.flex} title={_('search')} onClose={this.props.onClose}>
                <View style={StyleSheet.buttons.bar}>
                    <Button type="top" text={_('byDistance')} active={this.state.tab === 'distance'} onPress={() => this.setState({ tab: 'distance' })} />
                    <Button type="top" text={_('byName')} active={this.state.tab === 'name'} onPress={() => this.setState({ tab: 'name' })} />
                </View>
                <ScrollView contentContainerStyle={StyleSheet.search.containerStyle}>
                    <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle, {marginTop: 0}]}>{_('searchWhat')}</Text>
                    <TextInput type="flat" placeholder={_('searchWhatExample')} />

                    <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle]}>{_('searchWhen')}</Text>
                    <DateInput type="flat" placeholder={_('dateTime')} value={this.state.date}
                               rightBar={<Icon name="listIndicator" />}
                               modalProvider={() => this.refs.dialog}
                               date={true} time={true}
                               onChange={this.onChangeDate} />

                    <Text style={[StyleSheet.text, StyleSheet.search.titleTextStyle]}>{_('searchGender')}</Text>
                    <View style={[StyleSheet.buttons.bar, StyleSheet.singleMarginBottom, {alignSelf: 'center'}]}>
                        <Button type="image" icon="male" active={this.state.gender == 'male'} onPress={() => this.onPressGender('male')}/>
                        <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                        <Button type="image" icon="female" active={this.state.gender == 'female'} onPress={() => this.onPressGender('female')}/>
                        <View style={[StyleSheet.buttons.separator, {marginLeft: 10, marginRight: 10}]} />
                        <Button type="image" icon="mixed" active={this.state.gender == 'mixed'} onPress={() => this.onPressGender('mixed')}/>
                    </View>
                    <ListInput type="flat" style={StyleSheet.halfMarginTop} placeholder={_('level')} value={this.state.level}
                               rightBar={<Icon name="listIndicator" />}
                               modalProvider={() => this.refs.dialog}
                               onChange={this.onChangeLevel}>
                        <ListInput.Item text={_('casual')} value="casual" />
                        <ListInput.Item text={_('competitive')} value="competitive" />
                        <ListInput.Item text={_('open')} value="open" />
                    </ListInput>
                    <ListInput type="flat" style={StyleSheet.halfMarginTop} placeholder={_('venueType')} value={this.state.venueType}
                               rightBar={<Icon name="listIndicator" />}
                               modalProvider={() => this.refs.dialog}
                               onChange={this.onChangeVenueType}>
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
                        {_('upto')}{' '}{(this.state.liveSearchRadius || this.state.searchRadius).toFixed(0)}{_('milesAbbreviation')}
                    </Text>
                </ScrollView>

                <View style={StyleSheet.buttons.bar}>
                    <Button type="dialogDefault" text={_('search')} onPress={this.onPressSearch} />
                </View>
            </Dialog>
        );
    }
};