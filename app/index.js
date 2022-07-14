import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Navigation from './lib/Navigation';
import { View, Modal, Text, BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider, connect } from 'react-redux';
import {
  onNavigationStateChange,
  getActiveRouteName,
} from './utils/navigation';
import { isIOS } from './utils/deviceInfo';
import {
  Colors,
  Layout,
  Dummy,
  CommonStyles,
  SafeContainer,
} from './constants';
import configureStore from './store/stor-config';
import './middleware/http.Interceptor';
import TabNavigator from './routes/AppNav';
import NetInfo, {
  NetInfoSubscription,
  NetInfoState,
} from '@react-native-community/netinfo';
import { setNetworkdata } from './actions/auth';
import { setCategory } from './actions/home';
import { LoginStack } from './routes';
import AppStatusBar from './components/common/statusBar';
import TabNavigatorTrainer from './routes/AppNavTrainer';
import TabNavigatorCoach from './routes/AppNavCoach';
const AppPrefix = 'NextUp';
// if (isIOS) {
//   const RNScreens = require('react-native-screens');
//   RNScreens.useScreens();
// }
interface State {
  isConnected: boolean | null;
}
class TabbedNavigator extends React.Component<{}, State> {
  static router = TabNavigator.router;
  _subscription: NetInfoSubscription | null = null;

  state = {
    categoryOptions: false,
    isConnected: null,
    filterid: 0,
  };

  componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 2000);
    this._subscription = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    this._subscription && this._subscription();
  }

  handleCategory = () => {
    this.setState({ categoryOptions: true });
  };

  _handleConnectivityChange = (state: NetInfoState) => {
    this.setState(
      {
        isConnected: state.isConnected,
      },
      () => {
        this.props.dispatch(setNetworkdata(state.isConnected));
      },
    );
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { isConnected } = this.state;
  //   let previndex = this.props.navigation.state.index;
  //   const { unreadcount } = this.props.MSG
  //   let neextindex = nextProps.navigation.state.index;
  //   if (this.state.categoryOptions !== nextState.categoryOptions) {
  //     return true;
  //   } else if (previndex !== neextindex) {
  //     return true;
  //   } else if (isConnected !== nextState.isConnected) {
  //     return true;
  //   } else if (unreadcount !== nextProps.unreadcount) {
  //     return true;
  //   } else (
  //     getActiveRouteName(this.props.navigation.state) !==
  //     getActiveRouteName(nextProps.navigation.state)
  //   )
  //   return false;
  // }

  handleFilter = (item) => {
    this.setState({ filterid: item.id });
    this.props.dispatch(setCategory(item));
  };

  render() {

    return (
      <>
        <TabNavigator
          {...this.props}

        // screenProps={{ Action: () => this.handleCategory(), Count: unreadcount }}
        />

      </>
    );
  }
}

function mapStateToProps(state) {
  const { entities, homeReducer } = state;
  return {
    Data: entities.home,
    MSG: entities.messages,
    homeReducer,
  };
}

const MainTabNav = connect(mapStateToProps)(TabbedNavigator);
// const MainTabCoachNav = connect(mapStateToProps)(TabbedCoachNavigator);
// const MainTabTrainerNav = connect(mapStateToProps)(TabbedTrainerNavigator);



export const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: {
        getScreen: () => require('./views/loadingView').default,
      },
      AppHome: MainTabNav,
      CoachHome: TabNavigatorCoach,
      // TrainerHome: TabNavigatorTrainer,
      AppLogin: LoginStack
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default class Root extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    let content = (
      <App
        ref={(navigatorRef) => {
          Navigation.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={onNavigationStateChange}
        uriPrefix={AppPrefix}
      />
    );
    debugger;
    return (
      <Provider store={configureStore()}>

        <AppStatusBar color={Colors.base} barStyle='light-content' />
        {content}
      </Provider>
    );
  }
}
