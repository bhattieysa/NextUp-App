import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const PlayerMyTeamStack = createStackNavigator(
    {
        MyTeam: {
            getScreen: () => require('../views/home/PlayerMyTeams').default,
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
    },
    {
        defaultNavigationOptions,
        headerMode: null
    },
);
PlayerMyTeamStack.navigationOptions = ({ navigation }) => {
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
export default PlayerMyTeamStack;