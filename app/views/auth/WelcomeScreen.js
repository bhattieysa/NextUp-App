import React, { Component } from 'react'
import { Text, View, Image, SafeAreaView, ScrollView, StatusBar, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppStatusBar from '../../components/common/statusBar'
import { Colors, Fonts, Layout } from '../../constants'
import Navigation from '../../lib/Navigation'
import { Pages } from '../../Helpers/react-native-pages';
import { isNotch, STATUSBAR_HEIGHT } from '../../utils/deviceInfo'
import backend from '../../config/backend'
import { remove, setObject, getObject, get } from '../../middleware'
import { UserModel, userToken } from '../../constants/constant'
import { Register } from '../../actions/auth'
import AppLoader from '../../utils/Apploader'
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotifService from '../../utils/notificationService/service';
import messaging from '@react-native-firebase/messaging';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';
import Geolocation from '@react-native-community/geolocation'

var wide = Layout.width



class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotification.bind(this),
    );
    this.regesterNotiIOS()
    this.state = {
      loading: false,
      registerToken: "",
    };

  }

  // checkLocationPermission = async () => {
  //     const res = await Permission.checkPermission(PERMISSION_TYPE.location);
  // }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    debugger

    Geolocation.getCurrentPosition(
      position => {
        console.log("LOCCCCC", position);
        // const initialPosition = JSON.stringify(position);
        // this.setState({ initialPosition: position.coords.latitude });
        // this.setState({ lastPosition: position.coords.longitude, initialPosition: position.coords.latitude });
      },
      error => console.log(error),
    );

    // this.watchID = Geolocation.watchPosition(position => {
    //     debugger
    //     // this.setState({ initialPosition: position.coords.latitude });
    //     // this.setState({ lastPosition: position.coords.longitude });
    // });
  }

  onRegister = (token) => {
    debugger
    console.log("FCM_TKN---", token);
    if (Platform.OS == 'ios') {
      this.requestIosPermission();
    } else {
      debugger
      userToken.DEVICE_TOKEN = token.token
      setObject('DEVICE_TOKEN', token.token)
      this.setState({ registerToken: token.token });
    }
    // this.checkLocationPermission();
  }

  async requestIosPermission() {
    const authStatus = await messaging().requestPermission();
    const enable = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enable) {
      console.log("Permision enable", authStatus);
      this.getIosDeviceToken();
    }
  }

  getIosDeviceToken = async () => {
    try {
      const fcm_ios_tkn = await messaging().getToken();
      userToken.DEVICE_TOKEN = fcm_ios_tkn
      setObject('DEVICE_TOKEN', fcm_ios_tkn)
      this.setState({ registerToken: fcm_ios_tkn });
      console.log("ios device tkn--", fcm_ios_tkn);

    } catch (error) {
      console.log("error to get token")
    }
  }

  onNotification(notif) {
    debugger
    console.log("notification", notif);
    // if (Platform.OS == 'ios') {
    //     PushNotificationIOS.addEventListener('notification', this.onRemoteNotification);
    //     PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification,);
    // dudQMcwQZURwrTNieDk9rJ:APA91bEmMNwO1D0vtwC9pyRlmfxky_kQ4loehMua9ZdrvBrxj24yj-ZGn5ju98WtOXoEUi-VEjiJSdj-3h1uihJnDPsPlrQt4dvTYiiADDfceV62PHvVP9j5Ynm_FHfbmXOpImLZP5B-
    // 
    //     // PushNotificationIOS.requestPermissions().then(
    //     //     (data) => {
    //     //         console.log('PushNotificationIOS.requestPermissions', data);
    //     //     },

    //     //     // (data) => {
    //     //     //     console.log('PushNotificationIOS.requestPermissions failed', data);
    //     //     // },
    //     // );
    // }
  }

  regesterNotiIOS = () => {
    console.log("Notif_IOSSS");
    if (Platform.OS == 'ios') {
      PushNotificationIOS.addEventListener('notification', this.onRemoteNotification);
      PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification,);

      PushNotificationIOS.requestPermissions().then(
        // (data) => {
        //     console.log('PushNotificationIOS.requestPermissions', data);
        // },

        // (data) => {
        //     console.log('PushNotificationIOS.requestPermissions failed', data);
        // },
      );
    }
  }
  onRemoteNotification = (e) => {
    console.log("Notification IOSSS_REMOTE", e);
  }
  onLocalNotification = (e) => {
    console.log("IOS_LOCALLLL", e);
    // Navigation.navigate("OrderHistory")
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('notification');
    PushNotificationIOS.removeEventListener('localNotification');
  }

  handleLogin = (id) => {
    debugger
    this.setState({ loading: false }, () => {
      backend.handleImperativeLogin(id, (data) => {
        debugger
        //  console.log(data);
        this.setData(data, id)
      })
    })
  }
  setData(data, id) {
    if (id === 2 || id === 0) {
      UserModel.fname = id === 2 ? data.additionalUserInfo.profile.given_name : data.additionalUserInfo.profile.first_name
      UserModel.lname = id === 2 ? data.additionalUserInfo.profile.family_name : data.additionalUserInfo.profile.last_name
      UserModel.profileUrl = data.user._user.photoURL
    }
    UserModel.email = data.user._user.email
    UserModel.fid = data.user._user.uid
    UserModel.isSocialLogin = true
    debugger;
    var onBoardData = {
      selectedUserType: UserModel.selectedUserType,
      isAdult: UserModel.isAdult,
      parentNameOrNum: UserModel.parentNameOrNum,
      email: UserModel.email,
      password: UserModel.password,
      fname: UserModel.fname,
      lname: UserModel.lname,
      dob: UserModel.dob,
      aboutMe: UserModel.aboutMe,
      profileUrl: UserModel.profileUrl,
      photoIdUrl: UserModel.photoIdUrl,
      isVerfied: UserModel.isVerfied,
      coachCertiUrl: UserModel.coachCertiUrl,
      fid: data.user._user.uid,
      isSocialLogin: true,
      isProfileUploaded: UserModel.isProfileUploaded
    }
    let params = {
      "name": UserModel.fname + ' ' + UserModel.lname,
      "firstName": UserModel.fname,
      "lastName": UserModel.lname,
      "email": UserModel.email,
      "firebaseAuthTokenId": data.user._user.uid,
      "loginWith": id === 2 ? "GOOGLE" : id === 1 ? "APPLE" : "FACEBOOK",
      "firebaseNotificationId": userToken.DEVICE_TOKEN,
      "roles": [
        "ROLE_COACH", "ROLE_PLAYER"
      ]
    }
    debugger


    // console.log(UserModel.fid)
    this.setState({ loading: true }, () => {
      this.props.dispatch(Register(params, (res, resData) => {
        if (res) {
          debugger
          this.setState({ loading: false });
          if (resData.typeOfUser == null || resData.onBoardingDone == false) {
            debugger
            Navigation.navigate('TellUsMoreIntro', {
              state: "",
              year: ""
            })
            // Navigation.navigate('TellUsMore')
          } else {
            debugger
            if (resData.parentApprovalRequired === false) {
              onBoardData.selectedUserType = resData.typeOfUser.toLowerCase()
              onBoardData.isAdult = !resData.parentApprovalRequired
              onBoardData.isVerfied = resData.parentApprovalDone
              onBoardData.fname = resData.personalInfo.name
              onBoardData.profileUrl = resData.personalInfo.profilePictureURL
              onBoardData.email = resData.personalInfo.email
              UserModel.fname = resData.personalInfo.name
              UserModel.profileUrl = resData.personalInfo.profilePictureURL
              UserModel.email = resData.personalInfo.email
              UserModel.selectedUserType = resData.typeOfUser.toLowerCase()
              UserModel.isAdult = !resData.parentApprovalRequired
              UserModel.isVerfied = resData.parentApprovalDone
              setObject('authData', onBoardData).then(() => {
                this.navigateUserToItsHome(resData.typeOfUser)
              })
            } else {
              debugger
              if (resData.parentApprovalDone === false) {
                // Navigation.navigate('TellUsMore')
                Navigation.navigate('ParentEmail')
              } else {
                debugger
                onBoardData.selectedUserType = resData.typeOfUser.toLowerCase()
                onBoardData.isAdult = !resData.parentApprovalRequired
                onBoardData.isVerfied = resData.parentApprovalDone
                onBoardData.fname = resData.personalInfo.name
                onBoardData.profileUrl = resData.personalInfo.profilePictureURL
                onBoardData.email = resData.personalInfo.email
                UserModel.fname = resData.personalInfo.name
                UserModel.profileUrl = resData.personalInfo.profilePictureURL
                UserModel.email = resData.personalInfo.email
                UserModel.selectedUserType = resData.typeOfUser.toLowerCase()
                UserModel.isAdult = !resData.parentApprovalRequired
                UserModel.isVerfied = resData.parentApprovalDone
                setObject('authData', onBoardData).then(() => {
                  this.navigateUserToItsHome(resData.typeOfUser)
                })
              }
            }
          }
        }
        else {
          debugger

          this.setState({ loading: false }, () => {
            setTimeout(() => {
              showErrorAlert(msg)
            }, 500);
          })
        }
      }))
    })

  }
  navigateUserToItsHome = (typeOfUser) => {
    debugger

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
        {/* <AppStatusBar color={Colors.base} barStyle='light-content' /> */}
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

          {/* CoachHome
TrainerHome */}
          <View style={{ backgroundColor: Colors.base, marginTop: 30, flex: 1 }}>
            <Image style={{ width: wide, flex: 1 }}
              resizeMode={'stretch'}
              source={require('../../Images/loginImage.png')} />
            <View style={{ flex: isNotch ? 1 : 1.4, width: wide * 0.8, alignSelf: 'center', marginTop: 50 }}>
              <Pages

                containerStyle={{ justifyContent: 'flex-start' }}
                indicatorColor={Colors.btnBg}
                indicatorPosition='bottom'
                horizontal={true}
              >
                <Text

                  //  onPress={() => Navigation.navigate('CoachHome')}
                  numberOfLines={3}
                  adjustsFontSizeToFit
                  style={{
                    color: Colors.light, fontSize: 40,
                    fontFamily: Fonts.Bold, lineHeight: 48
                  }}>Players, Coaches and Fans. </Text>
                <Text
                  // onPress={() => Navigation.navigate('TrainerHome')}
                  numberOfLines={3}
                  adjustsFontSizeToFit style={{
                    color: Colors.light, fontSize: 40,
                    fontFamily: Fonts.Bold, lineHeight: 48

                  }}>Players, Coaches and Fans. </Text>
                <Text numberOfLines={3}
                  adjustsFontSizeToFit style={{
                    color: Colors.light, fontSize: 40,
                    fontFamily: Fonts.Bold, lineHeight: 48

                  }}>Players, Coaches and Fans. </Text>
              </Pages>
            </View>
            <TouchableOpacity style={{
              width: wide * 0.8, height: 48,
              backgroundColor: Colors.btnBg,
              alignSelf: 'center', borderRadius: 24,
              justifyContent: 'center', marginTop: 50
            }} onPress={() => {
              Navigation.navigate('Login')

            }}>
              {/* <Text style={{
                alignSelf: 'center', color: Colors.light,
                fontFamily: Fonts.Bold,
              }}>Sign in with Email </Text> */}
              <Text style={{
                alignSelf: 'center', color: Colors.light,
                fontFamily: Fonts.Bold,
                fontSize: 14, lineHeight: 16, fontWeight: '700',
              }}>Continue with Email </Text>
            </TouchableOpacity>
            <View style={{
              width: Platform.OS === 'ios' ? wide * 0.8 : wide * 0.55,
              alignSelf: 'center',
              height: wide * 0.15,
              marginTop: 16,
              justifyContent: 'space-between',
              flexDirection: 'row',
              // backgroundColor: '#ccc',
              alignItems: 'center'
            }}>
              <TouchableOpacity onPress={() => this.handleLogin(0)} style={{
                width: wide * 0.25, height: wide * 0.15,
                // marginHorizontal: 5
              }}>
                <Image style={{

                  width: wide * 0.25, height: wide * 0.13,
                }} source={require('../../Images/facebook.png')} />
              </TouchableOpacity>
              {
                Platform.OS === 'ios'
                  ?
                  <TouchableOpacity onPress={() => this.handleLogin(1)} style={{
                    width: wide * 0.25, height: wide * 0.15,
                    //  marginHorizontal: 5
                  }}>
                    <Image style={{
                      width: wide * 0.25, height: wide * 0.13,

                    }} source={require('../../Images/apple.png')} />
                  </TouchableOpacity>
                  :
                  null
              }
              <TouchableOpacity onPress={() => this.handleLogin(2)} style={{
                width: wide * 0.25, height: wide * 0.15,
                //  marginHorizontal: 5
              }}>
                <Image style={{
                  width: wide * 0.25, height: wide * 0.13,

                }} source={require('../../Images/google.png')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              //  onPress={() => Navigation.navigate('Home')}
              style={{
                alignSelf: 'center',
                marginTop: 32, width: wide * 0.9, justifyContent: 'center',
                alignItems: 'center', paddingBottom: 20

              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  color: Colors.greyTxtColor,
                  fontSize: 13, lineHeight: 16,
                  fontWeight: '500', fontFamily: Fonts.Medium
                }}>By continuing you agree Next Up</Text>
                <Text style={{
                  color: Colors.btnBg, fontSize: 12,
                  lineHeight: 16, textDecorationLine: 'underline',
                  fontWeight: '500', fontFamily: Fonts.Medium
                }}>  Terms of
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                  color: Colors.btnBg,
                  fontSize: 12, lineHeight: 16, textDecorationLine: 'underline',
                  fontWeight: '500', fontFamily: Fonts.Medium
                }}>Services </Text>
                <Text style={{
                  color: Colors.greyTxtColor,
                  fontSize: 12, lineHeight: 16,
                  fontWeight: '500', fontFamily: Fonts.Medium
                }}> & </Text>
                <Text style={{
                  color: Colors.btnBg, fontSize: 12,
                  lineHeight: 16, textDecorationLine: 'underline',
                  fontWeight: '500', fontFamily: Fonts.Medium
                }}> Privacy Policy</Text>
              </View>
            </TouchableOpacity>

          </View>
          <AppLoader visible={this.state.loading} />
        </SafeAreaView>
      </>
    )
  }
}

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    User: entities.user,
    Home: entities.home
  };
}

export default connect(mapStateToProps)(WelcomeScreen);