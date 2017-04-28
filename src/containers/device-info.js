import React, {Component} from 'react'
import {connect} from 'react-redux'
import RNDeviceInfo from 'react-native-device-info'

import {navigationActions} from '../actions'
import {DeviceInfo as _DeviceInfo} from '../windows'

const HARDWARE_DATA = [
  {title: 'Device Manufacturer', info: RNDeviceInfo.getManufacturer()},
  {title: 'Device Name', info: RNDeviceInfo.getDeviceName()},
  {title: 'Device Model', info: RNDeviceInfo.getModel()},
  {title: 'Device Unique ID', info: RNDeviceInfo.getUniqueID()},
  {title: 'Device Locale', info: RNDeviceInfo.getDeviceLocale()},
  {title: 'Device Country', info: RNDeviceInfo.getDeviceCountry()},
  {title: 'User Agent', info: RNDeviceInfo.getUserAgent()},
]

const OS_DATA = [
  {title: 'Device System Name', info: RNDeviceInfo.getSystemName()},
  {title: 'Device ID', info: RNDeviceInfo.getDeviceId()},
  {title: 'Device Version', info: RNDeviceInfo.getSystemVersion()}
]

const APP_DATA = [
  {title: 'Bundle Id', info: RNDeviceInfo.getBundleId()},
  {title: 'Build Number', info: RNDeviceInfo.getBuildNumber()},
  {title: 'App Version', info: RNDeviceInfo.getVersion()},
  {title: 'App Version (Readable)', info: RNDeviceInfo.getReadableVersion()}
]

class DeviceInfo extends Component {

  render() {
    return (
      <_DeviceInfo
        hardwareData={HARDWARE_DATA}
        osData={OS_DATA}
        appData={APP_DATA}
        onNavigateBack={this.props.onNavigateBack}
      />
    )
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    onNavigate: (key, props, subTab, direction) => dispatch(navigationActions.push({key, props}, subTab, direction)),
    onNavigateBack: () => dispatch(navigationActions.pop()),
  }),
)(DeviceInfo)
