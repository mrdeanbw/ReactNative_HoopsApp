import {Platform} from 'react-native'

const font = {
  'Source Sans Pro': {
    weights: {
      Bold: '700',
      SemiBold: '600',
      Normal: '400'
    },
    styles: {
    }
  },
}

const fontMaker = (options = {}) => {
  let {weight, style, family} = Object.assign({
    weight: null,
    style: null,
    family: 'Source Sans Pro'
  }, options)

  const {weights, styles} = font[family]

  if (Platform.OS === 'android') {
    weight = weights[weight] ? weight : ''
    style = styles[style] ? style : ''

    const suffix = weight + style

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : '')
    }
  } else {
    weight = weights[weight] || weights.Normal
    style = styles[style] || 'normal'

    return {
      fontFamily: family,
      fontWeight: weight,
      fontStyle: style
    }
  }
}

export default fontMaker
