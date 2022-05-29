import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const TrainerHomeStack = createStackNavigator(
    {
        TrainerProfile: {
            getScreen: () => require('../views/Trainer/TrainerProfile').default,
        }, Chat: {
            getScreen: () => require('../views/home/ChatModule/Chat').default,
        },
        EditProfile: {
            getScreen: () => require('../views/home/EditProfile').default,
        }, MessageList: {
            getScreen: () => require('../views/home/MessageList').default,
        },

    },
    {
        defaultNavigationOptions,
        headerMode: null
    },
);
TrainerHomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "MessageList") {
            tabBarVisible = false;
        } else {
            defaultNavigationOptions
        }
    }

    return {
        tabBarVisible
    };
};
export default TrainerHomeStack;