
import Color from 'color';
import props from './props.json';
for(let v in props.colors) {
  const w = 'highlight' + v.replace(/^./, (m) => m.toUpperCase());
  if(!props.colors[w]) props.colors[w] = Color(props.colors[v]).lighten(0.25).hexString();
}

import _icons from './icons';
import _images from './images';

export const icons = _icons;
export const images = _images;
export const fonts = props.fonts;
export const colors = props.colors;
