import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const AccountStack = createStackNavigator(
  {
    UserAccount: {
      getScreen: () => require('../views/account/account').default,
    },
    EditProfile: {
      getScreen: () => require('../views/home/EditProfile').default,
    },
    AppReload: {
      getScreen: () => require('../views/loadingView/index').default,
    },
    School: {
      getScreen: () => require('../views/home/EditHelperComponent/SchoolList').default,
    },
    Year: {
      getScreen: () => require('../views/home/EditHelperComponent/Year').default,
    },
    TeamList: {
      getScreen: () => require('../views/home/EditHelperComponent/SelectTeam').default,
    },

    MyProfile: {
      getScreen: () => require('../views/home/PlayerProfile').default,
    },

  },
  {
    initialRouteName: 'UserAccount',
    defaultNavigationOptions,
    headerMode: null
  },
);

AccountStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName == "EditProfile" ||
      navigation.state.routes[i].routeName == "AppReload" ||
      navigation.state.routes[i].routeName == "School" ||
      navigation.state.routes[i].routeName == "Year" ||
      navigation.state.routes[i].routeName == "TeamList") {
      tabBarVisible = false;
    } else {
      defaultNavigationOptions
    }
  }

  return {
    tabBarVisible
  };
};

export default AccountStack;