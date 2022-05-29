import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const LoginStack = createStackNavigator(
    {
        WelcomeScreen: {
            getScreen: () => require('../views/auth/WelcomeScreen').default,
            // getScreen: () => require('../views/auth/WelcomeScreen').default,
            // getScreen: () => require('../views/auth/TellUsMore').default,
            // getScreen: () => require('../views/auth/RoadToPro').default,
            // getScreen: () => require('../views/auth/RoadToProPlan').default,
            // getScreen: () => require('../views/Coach/CoachInviteNew').default,


        },
        Login: {
            getScreen: () => require('../views/auth/login').default,
        },
        TellUsMore: {
            getScreen: () => require('../views/auth/TellUsMore').default,
        },
        UploadPhoto: {
            getScreen: () => require('../views/auth/UploadPhoto').default,
        },
        AddPhotoId: {
            getScreen: () => require('../views/auth/AddPhotoId').default,
        },
        AddPhotoIdCoach: {
            getScreen: () => require('../views/auth/AddPhotoIdCoach').default,
        },
        ParentEmail: {
            getScreen: () => require('../views/auth/ParentEmail').default,
        },
        OTPValidate: {
            getScreen: () => require('../views/auth/OTPValidate').default,
        },
        EditProfile: {
            getScreen: () => require('../views/home/EditProfile').default,
        },
    },
    {
        defaultNavigationOptions,
        headerMode: null
    },
);

export default LoginStack;