import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Navigation from '../lib/Navigation';
import {
  CalenderStack, ExploreStack,
  CoachHomeStack, CoachManageStack, CoachMyTeamStack, MessageStack, CoachChallengeStack
} from './index';
import { Colors, Layout, CommonStyles } from '../constants';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';

let home = require('../Images/homeNew.png');
// let Explore = require('../Images/Search_tab.png');
let Explore = require('../Images/explore_tab_icon.png');
// let Calender = require('../Images/Calender.png');
let manage = require('../Images/tab_Manage.png');
let myTeam = require('../Images/Standing.png');
let message = require('../Images/tab_message_icon.png');
let challenge = require('../Images/tabChallenege_icon.png');

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
    Home: CoachHomeStack,
    Explore: ExploreStack,
    // Manage: CoachManageStack,
    Challenge: CoachChallengeStack,
    // Calender: CalenderStack,
    Message: MessageStack,
    MyTeam: CoachMyTeamStack
  },

  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Home':
            icon = renderTabBarIcon(focused, home);
            break;
          case 'Explore':
            icon = renderTabBarIcon(focused, Explore);
            break;
          case 'Message':
            icon = renderTabBarIcon(focused, message);
            break;
          case 'Challenge':
            icon = renderTabBarIcon(focused, challenge);
            break;
          case 'MyTeam':
            icon = renderTabBarIcon(focused, myTeam);
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
