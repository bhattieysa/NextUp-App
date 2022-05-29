import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Navigation from '../lib/Navigation';
import {
  TrainerManageStack,
  TrainerHomeStack,
  TrainerCalenderStack
} from './index';
import { Colors, Layout, CommonStyles } from '../constants';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';
let home = require('../Images/home.png');
let Explore = require('../Images/Search_tab.png');
let Calender = require('../Images/Calender.png');
let manage = require('../Images/tab_Manage.png');
let myTeam = require('../Images/Standing.png');

let wide = Layout.width;
// const AppTabBar = (props) => (
//   <BottomTabBar
//     {...props}
//     onTabPress={({ route }) => {

//       // props.screenProps.Action();

//     }}
//   />
// );



function renderTabBarIcon(focused, iconSource) {
  return (
    <View style={CommonStyles.tabBarItemContainer}>
      <Image
        source={iconSource}
        resizeMode={'contain'}
        style={[
          {
            top: 5,
            height: wide * 0.06,
            width: wide * 0.06,
          },
          focused && { tintColor: Colors.light },
        ]}
      />
    </View>
  );
}


const TabNavigatorTrainer = createBottomTabNavigator(
  {
    Home: TrainerHomeStack,
    Manage: TrainerManageStack,
    Calender: TrainerCalenderStack
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Home':
            icon = renderTabBarIcon(focused, home);
            break;

          case 'Calender':
            icon = renderTabBarIcon(focused, Calender);
            break;
          case 'Manage':
            icon = renderTabBarIcon(focused, manage);
            break;


          default:
            console.log("re")
          // icon = renderTabBarIcon(focused, user);
        }
        return icon;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.light,
      inactiveTintColor: Colors.fontGray,
      showLabel: true,
      style: {
        backgroundColor: Colors.base,
        // borderTopWidth: 0
      },
      labelStyle: {
        top: 5
      }
    },
    // tabBarComponent: (props) => <AppTabBar {...props} />,
  },
);

export default TabNavigatorTrainer;
