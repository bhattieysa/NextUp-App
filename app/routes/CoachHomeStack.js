import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const CoachHomeStack = createStackNavigator(
    {
        CoachProfile: {
            getScreen: () => require('../views/Coach/CoachProfile').default,
        },
        Chat: {
            getScreen: () => require('../views/home/ChatModule/Chat').default,
        },
        EditProfile: {
            getScreen: () => require('../views/home/EditProfile').default,
        },
        MessageList: {
            getScreen: () => require('../views/home/MessageList').default,
        },
        // PlayerProfile: {
        //     getScreen: () => require('../views/home/home').default,
        // },
        PlayerProfile: {
            getScreen: () => require('../views/Coach/CoachPlayerProfileView').default,
        },
        CoachChallengeAction: {
            getScreen: () => require('../views/Coach/CoachChallengesAction').default,
        },
        CoachAssignTask: {
            getScreen: () => require('../views/Coach/CoachAssignTask').default,
        },
        Calender: {
            getScreen: () => require('../views/home/Calender').default,
        },
        GamesRecentTab: {
            getScreen: () => require('../views/home/GamesRecentTab').default,
        },
        ShareScreen: {
            getScreen: () => require('../views/home/ShareScreen').default,
        },
        Compare: {
            getScreen: () => require('../views/Coach/Compare').default,

        },
        AppReload: {
            getScreen: () => require('../views/loadingView/index').default,
        },

        // notification nav
        // MyTeam: {
        //     getScreen: () => require('../views/Coach/CoachMyTeams').default,
        // },

    },
    {
        defaultNavigationOptions,
        headerMode: null
    },
);
CoachHomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "MessageList"
            || navigation.state.routes[i].routeName == "PlayerProfile"
            || navigation.state.routes[i].routeName == "EditProfile"
            || navigation.state.routes[i].routeName == "Chat"
            || navigation.state.routes[i].routeName == "CoachChallengeAction"
            || navigation.state.routes[i].routeName == "Calender"
            || navigation.state.routes[i].routeName == "GamesRecentTab"
            || navigation.state.routes[i].routeName == "ShareScreen"
            || navigation.state.routes[i].routeName == "Compare"
            || navigation.state.routes[i].routeName == "AppReload") {
            tabBarVisible = false;
        } else {
            defaultNavigationOptions
        }
    }

    return {
        tabBarVisible
    };
};
export default CoachHomeStack;