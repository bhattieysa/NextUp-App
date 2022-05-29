import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const TrainerManageStack = createStackNavigator(
    {
        TrainerManage: {
            getScreen: () => require('../views/Trainer/TrainerManage').default,

        }, TrainerChallenges: {
            getScreen: () => require('../views/Trainer/TrainerChallenges').default,
        },
        TrainerCreatePlan: {
            getScreen: () => require('../views/Trainer/TrainerCreatePlan').default,
        },
        TrainerCreatePlanNext: {
            getScreen: () => require('../views/Trainer/TrainerCreatePlanNext').default,
        }


    },
    {
        defaultNavigationOptions,
        headerMode: null
    },
);
TrainerManageStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "TrainerChallenges" ||
            navigation.state.routes[i].routeName == "TrainerCreatePlan" ||
            navigation.state.routes[i].routeName == "TrainerCreatePlanNext") {
            tabBarVisible = false;
        } else {
            defaultNavigationOptions
        }
    }

    return {
        tabBarVisible
    };
};
export default TrainerManageStack;