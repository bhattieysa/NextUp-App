import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const CoachManageStack = createStackNavigator(
    {
        Manage: {
            getScreen: () => require('../views/Coach/Manage').default,
        },
        CoachAssignedTrainner: {
            getScreen: () => require('../views/Coach/CoachAssignedTrainner').default,
        },
        CoachAssignTask: {
            getScreen: () => require('../views/Coach/CoachAssignTask').default,
        },

    },
    {
        initialRouteName: 'Manage',
        defaultNavigationOptions,
        headerMode: null
    },
);

CoachManageStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "CoachAssignTask") {
            tabBarVisible = false;
        } else {
            defaultNavigationOptions
        }
    }

    return {
        tabBarVisible
    };
};

export default CoachManageStack;