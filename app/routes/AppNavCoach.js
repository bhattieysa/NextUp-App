import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Navigation from '../lib/Navigation';
import {
  CalenderStack, ExploreStack,
  CoachHomeStack, CoachManageStack, CoachMyTeamStack, MessageStack, CoachChallengeStack,
  AccountStack
} from './index';
import { Colors, Layout, CommonStyles } from '../constants';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';

let home = require('../Images/newBottomDashboard_icon.png');
// let Explore = require('../Images/Search_tab.png');
// let Explore = require('../Images/explore_tab_icon.png');
let Explore = require('../Images/newBottomCalender_icon.png');
// let Calender = require('../Images/Calender.png');
let manage = require('../Images/tab_Manage.png');
let myTeam = require('../Images/newBottomMyTeam_icon.png');
let message = require('../Images/newBottomMessage_icon.png');
// let challenge = require('../Images/tabChallenege_icon.png');
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


const TabNavigatorCoach = createBottomTabNavigator(
  {
    Dashboard: CoachHomeStack,
    // Explore: ExploreStack,
    Calendar: ExploreStack,
    MyTeam: CoachMyTeamStack,
    // Manage: CoachManageStack,
    Inbox: MessageStack,
    // Challenge: CoachChallengeStack,
    Account: AccountStack,
    // Calender: CalenderStack,
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
          case 'MyTeam':
            icon = renderTabBarIcon(focused, myTeam);
            break;
          case 'Inbox':
            icon = renderTabBarIcon(focused, message);
            break;
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
        height: 60,
        backgroundColor: Colors.base,
        // borderTopWidth: 0
      },
      labelStyle: {
        // top: 5
      }
    },
    // tabBarComponent: (props) => <AppTabBar {...props} />,
  },
);

export default TabNavigatorCoach;
