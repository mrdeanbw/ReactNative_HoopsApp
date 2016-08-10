
import _ from '../i18n';

import React from 'react';

import {ScrollView, View, Image, Text, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import StyleSheet from '../styles';

import Dialog from '../components/dialog';
import Button from '../components/button';
import CheckButton from '../components/check-button';
import HighlightText from '../components/highlight-text';
import InterestData from '../../data/interests.json';

import Window from '../components/window';

export default class Interests extends React.Component {

    static getTest(close) {
        return {
            title: 'Interests',
            view: Interests,
            viewProps: { onClose: close }
        };
    }

    constructor() {
        super();
        this.state = {
            viewAll: false,
            interests: {}
        };
    }

    onChangeInterest = (interest, checked) => {
        if(checked) {
            this.state.interests[interest] = true;
        } else {
            delete this.state.interests[interest];
        }

        this.setState({ interests: this.state.interests });
    };

    onPressViewAll = () => {
        this.setState({ viewAll: true });
    };

    onPressDone = () => {
        this.props.application.setRootView(SelectMode);
    };

    render() {
        return (
            <Dialog title={_('interests')} onClose={this.props.onClose}
                    rightBar={<Button type="title" icon="search" onPress={this.onPressSearch}/>}>

                <ScrollView>
                    <HighlightText highlight={_('sports')} text={_('interestsBanner')}
                                   style={[StyleSheet.text, StyleSheet.interests.bannerText]}
                                   highlightStyle={StyleSheet.interests.bannerTextHighlight} />


                    {InterestData.top.map((name, i) =>
                        <CheckButton key={name} text={name}
                                     icon="plus" checkIcon="checkActive"
                                     checked={this.state.interests[name]}
                                     onChange={checked => this.onChangeInterest(name, checked)}
                                     style={StyleSheet.interests.checkButtonGradient[i]}
                                     containerStyle={StyleSheet.interests.containerStyle}
                                     underlayColor={StyleSheet.interests.checkButtonHighlightGradient[i]}
                                     textStyle={StyleSheet.interests.checkButtonTextStyle}
                                     iconStyle={StyleSheet.interests.checkButtonIconStyle}
                                     checkedIconStyle={StyleSheet.interests.checkButtonCheckedIconStyle}/>)}


                    {this.state.viewAll && InterestData.all.filter(name => !InterestData.top.find(n => n === name)).map((name, i) =>
                        <CheckButton key={name} text={name}
                                     icon="plusActive" checkIcon="check"
                                     checked={this.state.interests[name]}
                                     onChange={checked => this.onChangeInterest(name, checked)} />)}

                    <View style={StyleSheet.interests.footer}>
                        {!this.state.viewAll && <Button type="rounded" text={_('viewAll')} onPress={this.onPressViewAll} style={StyleSheet.interests.viewAllButton} />}
                        <Button type="dialogDefault" text={_('done')} onPress={this.onPressDone} />
                    </View>
                </ScrollView>

            </Dialog>
        );
    }
};

class SelectMode extends React.Component {

    onPressOrganize = () => {
        this.props.application.setRootView(Window.Organizer);
    };

    onPressParticipate = () => {
        this.props.application.setRootView(Window.Participant);
    };

    render() {
        return (
            <View style={StyleSheet.interests.selectModeStyle}>
                <TouchableWithoutFeedback onPress={this.onPressOrganize}>
                    <Image source={StyleSheet.images.organize} style={[StyleSheet.interests.selectModeImageStyle, StyleSheet.interests.organizeImage]}>
                        <HighlightText highlight={_('organize')} text={_('organizeMode')}
                                       style={[StyleSheet.text, StyleSheet.interests.selectModeTextStyle]}
                                       highlightStyle={StyleSheet.interests.selectModeHighlightTextStyle} />
                    </Image>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onPressParticipate}>
                    <Image source={StyleSheet.images.participate} style={[StyleSheet.interests.selectModeImageStyle, StyleSheet.interests.participateImage]}>
                        <HighlightText highlight={_('participate')} text={_('participateMode')}
                                       style={[StyleSheet.text, StyleSheet.interests.selectModeTextStyle]}
                                       highlightStyle={StyleSheet.interests.selectModeHighlightTextStyle} />
                    </Image>
                </TouchableWithoutFeedback>
            </View>
        );
    }
};