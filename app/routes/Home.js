import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const HomeStack = createStackNavigator(
  {
    Home: {
      getScreen: () => require('../views/home/home').default,
    },
    Chat: {
      getScreen: () => require('../views/home/ChatModule/Chat').default,
    },
    MyTeam: {
      getScreen: () => require('../views/home/MyTeam').default,
    },
    TrainerPlan: {
      getScreen: () => require('../views/home/TrainerPlan').default,

    },
    TrainerSeeMore: {
      getScreen: () => require('../views/home/TrainerSeeMore').default,
    },
    MessageList: {
      getScreen: () => require('../views/home/MessageList').default,
    },
    PlayerMore: {
      getScreen: () => require('../views/home/PlayerMore').default,
    },
    RoadToPro_1: {
      getScreen: () => require('../views/home/RoadToPro_1').default,
    },
    RoadToPro_3: {
      getScreen: () => require('../views/home/RoadToPro_3').default,
    },
    PlayerSidePlan: {
      getScreen: () => require('../views/home/PlayerSidePlan').default,

    },
    // MyStanding: {
    //   getScreen: () => require('../views/home/MyStanding').default,

    // },
    Explore: {
      getScreen: () => require('../views/home/Explore').default,
    },
    ExploreMap: {
      getScreen: () => require('../views/home/ExploreMap').default,
    },
    TrainerProfilePreview: {
      getScreen: () => require('../views/home/TrainerProfilePreview').default,
    },
    GamesRecentTab: {
      getScreen: () => require('../views/home/GamesRecentTab').default,
    },
    CoachProfile: {
      getScreen: () => require('../views/Coach/CoachProfile').default,

    }, PostView: {
      getScreen: () => require('../views/home/PostView').default,
    },
    Calender: {
      getScreen: () => require('../views/home/Calender').default,
    },
    CoachAssignedTrainner: {
      getScreen: () => require('../views/Coach/CoachAssignedTrainner').default,

    },
    Compare: {
      getScreen: () => require('../views/Coach/Compare').default,

    },
    // Manage: {
    //   getScreen: () => require('../views/Coach/Manage').default,
    // },
    EditProfile: {
      getScreen: () => require('../views/home/EditProfile').default,
    },
    CoachAssignTask: {
      getScreen: () => require('../views/Coach/CoachAssignTask').default,
    },
    UploadVideoOfChallenge: {
      getScreen: () => require('../views/home/UploadVideoOfChallenge').default,
    },
    CoachChallengeAction: {
      getScreen: () => require('../views/Coach/CoachChallengesAction').default,
    },
    ShareScreen: {
      getScreen: () => require('../views/home/ShareScreen').default,
    },
    AppReload: {
      getScreen: () => require('../views/loadingView/index').default,
    },
  },
  {
    defaultNavigationOptions,
    headerMode: null
  },
);
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName == "TrainerPlan" ||
      navigation.state.routes[i].routeName == "TrainerSeeMore" ||
      navigation.state.routes[i].routeName == "MessageList" ||
      navigation.state.routes[i].routeName == "PlayerMore" ||
      navigation.state.routes[i].routeName == "ExploreMap" ||
      navigation.state.routes[i].routeName == "PlayerSidePlan" ||
      navigation.state.routes[i].routeName == "TrainerProfilePreview" ||
      navigation.state.routes[i].routeName == "GamesRecentTab" ||
      navigation.state.routes[i].routeName == "PostView" ||
      navigation.state.routes[i].routeName == "CoachAssignedTrainner" ||
      navigation.state.routes[i].routeName == "Compare" ||
      navigation.state.routes[i].routeName == "EditProfile" ||
      navigation.state.routes[i].routeName == "Calender" ||
      navigation.state.routes[i].routeName == "UploadVideoOfChallenge" ||
      navigation.state.routes[i].routeName == "Chat" ||
      navigation.state.routes[i].routeName == "ShareScreen" ||
      navigation.state.routes[i].routeName == "AppReload") {
      tabBarVisible = false;
    } else {
      defaultNavigationOptions
    }
  }

  return {
    tabBarVisible
  };
};
export default HomeStack;
