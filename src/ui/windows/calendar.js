
import _ from '../i18n';
import React from 'react';
import {View,Text} from 'react-native';

import Window from '../components/window';
import Button from '../components/button';
import Invitations from './invitations';

export default class Calendar extends React.Component {

    static getTest(close) {
        return {
            title: 'Calendar',
            view: Window.Organizer,
            viewProps: { initialTab: Calendar, onClose: close }
        };
    }

    static getTitle(props) {
        return _('calendar');
    }

    static getActionButton(props) {
        if(props.mode === 'organizer') {
            return <Button type="action" icon="actionAdd" text={_('create')} onPress={this.prototype.onPressCreate} />;
        } else {
            return <Button type="action" icon="actionSearch" text={_('search')} onPress={this.prototype.onPressSearch} />;
        }
    }

    onChangeMode(nextMode, nextProps) {
        if(nextMode === 'participant') nextProps.initialTab = Invitations;
    }

    render() {
        return (
            <View>
                <Text>Calendar</Text>
            </View>
        );
    }
};