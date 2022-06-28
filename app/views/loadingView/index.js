import React, { Component } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import Navigation from '../../lib/Navigation';
import AsyncStorage from '@react-native-community/async-storage';
//import i18n from 'i18n';
import { CommonStyles, Colors } from '../../constants';
import { setUserdata, setUserLanguage } from '../../actions/auth';
import { connect } from 'react-redux';
import AppStatusBar from '../../components/common/statusBar';
import { UserModel } from '../../constants/constant';
import { getObject, remove } from '../../middleware';

class LoadingView extends Component {

  componentDidMount() {
    //this.props.navigation.navigate('AppHome')
    // remove('authData')
    debugger
    AsyncStorage.getItem('User').then((res) => {
      if (res) {
        debugger
        this.props.setUser(JSON.parse(res));
        Navigation.navigate('AppHome');
      } else {
        getObject('authData').then((obj) => {
          debugger
          UserModel.email = obj.email
          UserModel.password = obj.password
          UserModel.selectedUserType = obj.selectedUserType,
            UserModel.isAdult = obj.isAdult,
            UserModel.parentNameOrNum = obj.parentNameOrNum,
            UserModel.fname = obj.fname,
            UserModel.lname = obj.lname,
            UserModel.dob = obj.dob,
            UserModel.aboutMe = obj.aboutMe,
            UserModel.profileUrl = obj.profileUrl,
            UserModel.photoIdUrl = obj.photoIdUrl,
            UserModel.isVerfied = obj.isVerfied,
            UserModel.coachCertiUrl = obj.coachCertiUrl
          UserModel.isSocialLogin = obj.isSocialLogin
          UserModel.fid = obj.fid,
            UserModel.isProfileUploaded = obj.isProfileUploaded
          debugger
          if (obj.selectedUserType !== undefined) {
            if (obj.selectedUserType === 'player') {
              if (UserModel.isAdult === false) {
                if (UserModel.isVerfied) {
                  this.navigateUserToItsHome(obj.selectedUserType.toUpperCase())
                } else {
                  if (obj.isSocialLogin !== undefined) {
                    // Navigation.navigate('TellUsMore');
                    Navigation.navigate('TellUsMoreIntro');
                  } else {
                    Navigation.navigate('AppLogin');
                  }
                }
              } else {
                this.navigateUserToItsHome(obj.selectedUserType.toUpperCase())
              }
            } else {
              this.navigateUserToItsHome(obj.selectedUserType.toUpperCase())
            }
          } else if (obj.isSocialLogin !== undefined && obj.isSocialLogin !== false) {
            // Navigation.navigate('TellUsMore');
            Navigation.navigate('TellUsMoreIntro');
          } else {
            Navigation.navigate('AppLogin');
          }
        })

      }
    });
  }

  navigateUserToItsHome = (typeOfUser) => {
    console.log(typeOfUser)
    switch (typeOfUser) {
      case 'PLAYER':
        Navigation.navigate('Home')
        break;
      case 'TRAINER':
        Navigation.navigate('TrainerHome')
        break;
      case 'COACH':
        Navigation.navigate('CoachHome')
        break;

      default:
        break;
    }
  }
  render() {
    return (
      <>
        <View style={[CommonStyles.overlay, CommonStyles.center, { backgroundColor: Colors.base }]}>
          {/* <ActivityIndicator size={22} color={Colors.light} /> */}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (res) => {
      dispatch(setUserdata(res));
    },
    setLanguage: (res) => {
      dispatch(setUserLanguage(res))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);

