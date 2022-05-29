import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const CoachChallengeStack = createStackNavigator(
    {
        CoachChallenge: {
            getScreen: () => require('../views/Coach/CoachChallenge').default,
        },
        // Manage: {
        //     getScreen: () => require('../views/Coach/Manage').default,
        // },
        // CoachAssignedTrainner: {
        //     getScreen: () => require('../views/Coach/CoachAssignedTrainner').default,
        // },
        CoachAssignTask: {
            getScreen: () => require('../views/Coach/CoachAssignTask').default,
        },
        CoachChallengeAction: {
            getScreen: () => require('../views/Coach/CoachChallengesAction').default,
        },
        CoachChallenegesPlayerList: {
            getScreen: () => require('../views/Coach/CoachChallenegesPlayerList').default,
        },

    },
    {
        initialRouteName: 'CoachChallenge',
        defaultNavigationOptions,
        headerMode: null
    },
);

CoachChallengeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "CoachAssignTask" ||
            navigation.state.routes[i].routeName == "CoachChallenegesPlayerList" ||
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

export default CoachChallengeStack;