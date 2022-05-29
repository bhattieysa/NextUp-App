import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const NOTCH_DEVICES = [
  'iPhone X',
  'iPhone XS',
  'iPhone XS Max',
  'iPhone XR',
  'iPhone 11',
];
export const STATUSBAR_HEIGHT = () => getStatusBarHeight();
export const isNotch = NOTCH_DEVICES.includes(DeviceInfo.getModel());
export const isIOS = Platform.OS === 'ios';
export const isAndroid = !isIOS;
export const getReadableVersion = DeviceInfo.getReadableVersion();
export const getBundleId = DeviceInfo.getBundleId();
export const getDeviceModel = DeviceInfo.getModel();

// Theme is supported by system on iOS 13+ or Android 10+
export const supportSystemTheme = () => {
  const systemVersion = parseInt(DeviceInfo.getSystemVersion(), 10);
  return systemVersion >= (isIOS ? 13 : 10);
};

let _width = null;
export const setWidth = (width) => (_width = width);
