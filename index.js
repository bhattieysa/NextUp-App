/**
 * @format
 */

import { AppRegistry, TextInput, LogBox } from 'react-native';
import App from './app/index';
// import App from './App';
import { name as appName } from './app.json';
//TextInput.defaultProps.selectionColor = 'white'
console.disableYellowBox = true;
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
// console.error = (error) => 

AppRegistry.registerComponent(appName, () => App);
