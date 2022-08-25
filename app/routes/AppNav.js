import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Navigation from '../lib/Navigation';
import {
  HomeStack, CalenderStack, ExploreStack, MyStandingStack, ProStack, MessageStack,
  AccountStack
} from './index';
import { Colors, Layout, CommonStyles } from '../constants';
import PlayerMyTeamStack from './PlayerMyTeamStack';
import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';

let home = require('../Images/newBottomDashboard_icon.png');
// let Explore = require('../Images/explore_tab_icon.png');
let Explore = require('../Images/newBottomCalender_icon.png');
// let Calender = require('../Images/Calender.png');
// let MyStanding = require('../Images/Standing.png');
let myTeam = require('../Images/newBottomMyTeam_icon.png');
// let Pro = require('../Images/Pro_tab.png');
// let message = require('../Images/tab_message_icon.png');
let message = require('../Images/newBottomMessage_icon.png');
let account = require('../Images/bottomAccount_icon.png');

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
            top: 2,
            height: wide * 0.06,
            width: wide * 0.06,
            tintColor: Colors.fontColorGray
          },
          focused && { tintColor: Colors.light },
        ]}
      />
    </View>
  );
}


const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: HomeStack,
    Calendar: ExploreStack,
    // Calender: CalenderStack,
    MyTeam: MyStandingStack,
    Inbox: MessageStack,
    // MyStanding: MyStandingStack,
    // Pro: ProStack,
    Account: AccountStack,
    // MyTeam: PlayerMyTeamStack
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Dashboard':
            icon = renderTabBarIcon(focused, home);
            break;
          case 'Calendar':
            icon = renderTabBarIcon(focused, Explore);
            break;
          // case 'Calender':
          //   icon = renderTabBarIcon(focused, Calender);
          //   break;
          case 'Inbox':
            icon = renderTabBarIcon(focused, message);
            break;
          // case 'MyStanding':
          //   icon = renderTabBarIcon(focused, MyStanding);
          //   break;
          case 'MyTeam':
            icon = renderTabBarIcon(focused, myTeam);
            break;

          // case 'Pro':
          //   icon = renderTabBarIcon(focused, Pro);
          //   break;

          case 'Account':
            icon = renderTabBarIcon(focused, account);
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
        height: 60
        // borderTopWidth: 0
      },
      labelStyle: {
        // top: 0
      }
    },
    // tabBarComponent: (props) => <AppTabBar {...props} />,
  },
);

export default TabNavigator;
