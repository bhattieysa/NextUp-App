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
      navigation.state.routes[i].routeName == "CoachChallengeAction") {
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