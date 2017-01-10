import React from 'react';
import {View,Text, ScrollView, Image} from 'react-native';

import {Button} from '../components';
import StyleSheet from '../styles';
import _ from '../i18n';

export default class Gallery extends React.Component {

  static getTitle(props) {
    return _('galleryTitle').replace(/\$1/g, props.event.title);
  }

  static getActionButton(props) {
    return <Button type="action" icon="actionBack" text={_('back')} onPress={this.prototype.onPressBack} />;
  }

  onPressBack = () => {
    if(this.props.onClose) this.props.onClose();
  };

  onPressImage = (image) => {

  };

  render() {
    const albums = this.props.event.gallery || [];
    const rows = [];
    for(var i = 0; i < albums.length; i += 2) {
      if(i + 1 < albums.length) rows.push([albums[i], albums[i + 1]]);
      else rows.push([albums[i]]);
    }

    const coverStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
    const imageStyle = { resizeMode: 'cover', width: 145, height: 145, backgroundColor: '#46d' };

    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{ paddingBottom: 10, paddingRight: 10 }}>
        {rows.map((row, i) => <View key={i} style={{ marginTop: 10, alignItems: 'stretch', flexDirection: 'row' }}>
          {row.map((album, j) => <View key={j} style={{ marginLeft: 10, width: 145, height: 145, overflow: 'hidden' }}>
            <Image source={{uri: album.cover}} style={imageStyle} />
            <View style={[coverStyle, {backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={[StyleSheet.text, {fontWeight: 'bold', fontSize: 18, color: StyleSheet.colors.white, textAlign: 'center'}]}>{album.title}</Text>
              <Text style={[StyleSheet.text, {fontWeight: '400', fontSize: 12, color: StyleSheet.colors.lightGrey, textAlign: 'center' }]}>{album.count}{_('photos')}</Text>
            </View>
          </View>)}
        </View>)}
      </ScrollView>
    );
  }
};
