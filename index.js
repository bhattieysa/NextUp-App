/**
 * @format
 */

import { AppRegistry, TextInput } from 'react-native';
import App from './app/index';
// import App from './App';
import { name as appName } from './app.json';
//TextInput.defaultProps.selectionColor = 'white'
console.disableYellowBox = true;
// console.error = (error) => 

AppRegistry.registerComponent(appName, () => App);
