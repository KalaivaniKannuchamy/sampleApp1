import { Dimensions, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { AsyncStorage, WSCall } from '../components/common';
import strings from '../lib/AppStrings';
import AsyncStorageKeys from "../lib/AsyncStorageKeys";
const appVersion = DeviceInfo.getVersion();
const deviceToken = DeviceInfo.getDeviceToken();
const deviceType = DeviceInfo.getDeviceType();
const deviceOs = DeviceInfo.getSystemVersion();
const deviceUniqueId = DeviceInfo.getUniqueId();

function camelize(str) {
  return str
    .replace(/\s(.)/g, function ($1) { return $1.toLowerCase(); })
    .replace(/^(.)/, function ($1) { return $1.toUpperCase(); });
}
function Captialize(str) {
  if(str != undefined){
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
  }
  return str != undefined ? splitStr.join(' ') : ''; 
}

function DynamicFontSize(size) {
 // based on iphone 5s's scale
  //  const scale = Dimensions.get('screen').width / 375;
  //  const newSize = size * scale
  // if (Platform.OS === 'ios') {
  //   return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3
  // } else {
  //   return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4
  // }
  // if(fromGlobal){
  //   return 24
  // }else{
    return size
  // }
  
}


export { camelize,Captialize, DynamicFontSize, appVersion, deviceToken, deviceType, deviceOs, deviceUniqueId };