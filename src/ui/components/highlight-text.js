

import React from 'react';
import { Text } from 'react-native';


export default class HighlightText extends React.Component {
  render() {
    var re = new RegExp(this.props.highlight, 'igm'), s = this.props.text;
    let m, n = 0, c = [];

    while ((m = re.exec(s)) != null) {
      c.push(s.substring(n, m.index));
      c.push(<Text style={this.props.highlightStyle}>{m[0]}</Text>);
      n = m.index + m[0].length;
    }

    c.push(s.substring(n));

    return (
      <Text style={this.props.style} children={c} />
    );
  }
};
