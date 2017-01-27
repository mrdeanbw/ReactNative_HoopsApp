import {StyleSheet as _StyleSheet, Dimensions} from 'react-native'

import * as resources from './resources'
import sheets, {base} from './stylesheets'

const EscapeTable = new WeakMap()
let StyleSheet = new class {
  get hairlineWidth() {
    return _StyleSheet.hairlineWidth
  }
  get dimensions() {
    return Dimensions.get('window')
  }

  escape(props) {
    EscapeTable.set(props, true)
    return props
  }

  extend(props = {}) {
    const out = Object.create(this)

    for(var v in props) {
      if(typeof v !== 'object' || EscapeTable.has(v)) {
        out[v] = props[v]
        delete props[v]
      }
    }

    const styleSheet = _StyleSheet.create(props)

    for(var v in styleSheet) {
      out[v] = styleSheet[v]
    }

    return this.escape(out)
  }

}()

EscapeTable.set(StyleSheet, true)
const globalStyleSheet = base(StyleSheet)
for(let v in resources) {globalStyleSheet[v] = resources[v]}
for(let v in sheets) {globalStyleSheet[v] = sheets[v](StyleSheet)}
export default globalStyleSheet


