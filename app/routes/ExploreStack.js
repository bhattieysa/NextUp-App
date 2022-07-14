import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const ExploreStack = createStackNavigator(
    {
        Explore: {
            getScreen: () => require('../views/home/Explore').default,
        },
        Chat: {
            getScreen: () => require('../views/home/ChatModule/Chat').default,
        },
        MyTeam: {
            getScreen: () => require('../views/home/MyTeam').default,
        },
        // TrainerPlan: {
        //     getScreen: () => require('../views/home/TrainerPlan').default,
        // },
        // TrainerSeeMore: {
        //     getScreen: () => require('../views/home/TrainerSeeMore').default,
        // },
        MessageList: {
            getScreen: () => require('../views/home/MessageList').default,
        },
        PlayerMore: {
            getScreen: () => require('../views/home/PlayerMore').default,
        },
        TeamMore: {
            getScreen: () => require('../views/home/TeamMore').default,
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
        MyStanding: {
            getScreen: () => require('../views/home/MyStanding').default,

        },
        // Explore: {
        //     getScreen: () => require('../views/home/Explore').default,
        // },
        ExploreMap: {
            getScreen: () => require('../views/home/ExploreMap').default,
        },
        // TrainerProfilePreview: {
        //     getScreen: () => require('../views/home/TrainerProfilePreview').default,
        // },
        GamesRecentTab: {
            getScreen: () => require('../views/home/GamesRecentTab').default,
        },
        CoachProfile: {
            getScreen: () => require('../views/Coach/CoachProfile').default,

        },
        PostView: {
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
        //     getScreen: () => require('../views/Coach/Manage').default,
        // },
        // MessageList: {
        //     getScreen: () => require('../views/Messages/listView/index').default,
        // },
        // PlayerProfile: {
        //     getScreen: () => require('../views/home/home').default,
        // },
        PlayerProfile: {
            getScreen: () => require('../views/Coach/CoachPlayerProfileView').default,
        },
        ExploreSearch: {
            getScreen: () => require('../views/home/ExploreSearch').default,
        },
        CoachChallengeAction: {
            getScreen: () => require('../views/Coach/CoachChallengesAction').default,
        },
        CoachAssignTask: {
            getScreen: () => require('../views/Coach/CoachAssignTask').default,
        },
        ViewFullScreenBoxScore: {
            getScreen: () => require('../views/home/ViewFullScreenBoxScore').default,

        },

    },
    {
        defaultNavigationOptions,
    },
);
ExploreStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (
            // navigation.state.routes[i].routeName == "TrainerPlan" ||
            // navigation.state.routes[i].routeName == "TrainerSeeMore" ||
            navigation.state.routes[i].routeName == "MessageList" ||
            navigation.state.routes[i].routeName == "PlayerMore" ||
            navigation.state.routes[i].routeName == "ExploreMap" ||
            navigation.state.routes[i].routeName == "PlayerSidePlan" ||
            // navigation.state.routes[i].routeName == "TrainerProfilePreview" ||
            navigation.state.routes[i].routeName == "GamesRecentTab" ||
            navigation.state.routes[i].routeName == "PostView" ||
            navigation.state.routes[i].routeName == "CoachAssignedTrainner" ||
            navigation.state.routes[i].routeName == "Compare" ||
            navigation.state.routes[i].routeName == "PlayerProfile" ||
            navigation.state.routes[i].routeName == "ExploreSearch" ||
            navigation.state.routes[i].routeName == "TeamMore" ||
            navigation.state.routes[i].routeName == "CoachChallengeAction" ||
            navigation.state.routes[i].routeName == "CoachAssignTask" ||
            navigation.state.routes[i].routeName == "ViewFullScreenBoxScore") {
            tabBarVisible = false;
        } else {
            defaultNavigationOptions
        }
    }

    return {
        tabBarVisible
    };
};
export default ExploreStack;
