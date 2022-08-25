import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const CoachMyTeamStack = createStackNavigator(
  {
    MyTeam: {
      // getScreen: () => require('../views/Coach/CoachMyTeams').default,
      getScreen: () => require('../views/Coach/CoachMyTeamsNew').default,
      // getScreen: () => require('../views/auth/RoadToPro').default,
    },
    CoachAddPlayer: {
      getScreen: () => require('../views/Coach/CoachAddPlayer').default,

    },

    CoachRoadToPro: {
      getScreen: () => require('../views/home/RoadToPro').default,

    },

    CoachRoadToProPlan: {
      getScreen: () => require('../views/home/RoadToProPlan').default,

    },


    CoachInviteNew: {
      getScreen: () => require('../views/Coach/CoachInviteNew').default,
    },

    Compare: {
      getScreen: () => require('../views/Coach/Compare').default,

    },
    // PlayerProfile: {
    //     getScreen: () => require('../views/home/home').default,
    // },
    PlayerProfile: {
      getScreen: () => require('../views/Coach/CoachPlayerProfileView').default,
    },
    CoachAssignTask: {
      getScreen: () => require('../views/Coach/CoachAssignTask').default,
    },
    CoachAddTeam: {
      getScreen: () => require('../views/Coach/CoachAddTeam').default,
    },
    CoachChallengeAction: {
      getScreen: () => require('../views/Coach/CoachChallengesAction').default,
    },
    GamesRecentTab: {
      getScreen: () => require('../views/home/GamesRecentTab').default,
    },
    InvitePlayerToTeam: {
      getScreen: () => require('../views/Coach/InvitePlayerToTeam').default,
    },
    ViewFullScreenBoxScore: {
      getScreen: () => require('../views/home/ViewFullScreenBoxScore').default,

    },
    CoachTeamList: {
      getScreen: () => require('../views/Coach/CoachTeamList').default,
    },
    MyTeamRecentGamesDetails: {
      getScreen: () => require('../views/Coach/CoachMyTeamGameStats').default,
    },
    MyTeamAdvanceStats: {
      getScreen: () => require('../views/Coach/TeamAdvanceStatics').default,
    },
  },
  {
    defaultNavigationOptions,
    headerMode: null
  },
);
CoachMyTeamStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName == "CoachAddPlayer"
      || navigation.state.routes[i].routeName == "Compare"
      || navigation.state.routes[i].routeName == "PlayerProfile"
      || navigation.state.routes[i].routeName == "CoachAddTeam"
      || navigation.state.routes[i].routeName == "CoachAssignTask"
      || navigation.state.routes[i].routeName == "CoachChallengeAction"
      || navigation.state.routes[i].routeName == "CoachInviteNew"
      || navigation.state.routes[i].routeName == "GamesRecentTab"
      || navigation.state.routes[i].routeName == "CoachRoadToPro"
      || navigation.state.routes[i].routeName == "CoachRoadToProPlan"
      || navigation.state.routes[i].routeName == "ViewFullScreenBoxScore"
      || navigation.state.routes[i].routeName == "MyTeamRecentGamesDetails"
      || navigation.state.routes[i].routeName == "MyTeamAdvanceStats"

    ) {
      console.log("Tab bar invisible here");
      tabBarVisible = false;
    } else {
      defaultNavigationOptions
    }
  }

  return {
    tabBarVisible
  };
};
export default CoachMyTeamStack;