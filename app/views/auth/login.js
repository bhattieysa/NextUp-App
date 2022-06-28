import React, { Component } from 'react';
import { View, Keyboard, TouchableOpacity, Text, SafeAreaView, Image, KeyboardAvoidingView, PlatformColor, Platform } from 'react-native';
import {
  Container,
  SafeContainer,
  Layout,
  CommonStyles,
  Colors,
  Fonts,
} from '../../constants';
import { SubmitButtons } from '../../components/common/button';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login, Register } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';
import { NoInternet } from '../../utils/info';
import { characterLimit, UserModel, userToken } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import backend from '../../config/backend';
import { setObject } from '../../middleware';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';


let wide = Layout.width;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isConfirmPass: false,
      cpassword: '',
      email: UserModel.email !== undefined ? UserModel.email : '',
      password: UserModel.password !== undefined ? UserModel.password : '',
      isbtnEnable: UserModel.email !== undefined && UserModel.password !== undefined ? true : false

    };
    this.inputs = {};
  }

  checkLocationPermission

  componentDidMount() {

  }
  checkEmailExist = () => {

    const { email } = this.state;
    let valid = isValidEmail(email);
    if (valid) {
      backend.isEmailExist(email, (status, e) => {

        console.log("Email status is ", status);

        debugger
        if (status) {
          this.setState({ isConfirmPass: false }, () => {
            this.setTextofEmailAndPass('email', email)
          })
        } else {
          this.setState({ isConfirmPass: true }, () => {
            this.setTextofEmailAndPass('email', email)
          })

        }
      })
    }
  }

  loginUser = () => {
    const { email, password } = this.state;
    this.setState({ loading: true }, () => {
      backend.handleLoginWithEmailAndPass(email, password, (status, userInfo) => {
        console.log("UserInfo---FCB", userInfo)
        console.log("User Status is ", status);
        if (status) {
          let onBoardData = {
            selectedUserType: UserModel.selectedUserType,
            isAdult: UserModel.isAdult,
            parentNameOrNum: UserModel.parentNameOrNum,
            email: email,
            password: password,
            fname: UserModel.fname,
            lname: UserModel.lname,
            dob: UserModel.dob,
            aboutMe: UserModel.aboutMe,
            profileUrl: UserModel.profileUrl,
            photoIdUrl: UserModel.photoIdUrl,
            isVerfied: UserModel.isVerfied,
            coachCertiUrl: UserModel.coachCertiUrl,
            fid: userInfo.user._user.uid,
            isSocialLogin: false,
            isProfileUploaded: UserModel.isProfileUploaded
          }
          debugger
          UserModel.isSocialLogin = false
          UserModel.email = email
          UserModel.password = password
          UserModel.fid = userInfo.user._user.uid
          let params = {
            // "name": UserModel.fname + ' ' + UserModel.lname,
            // "firstName": UserModel.fname,
            // "lastName": UserModel.lname,
            "email": UserModel.email,
            "firebaseAuthTokenId": userInfo.user._user.uid,
            "loginWith": "EMAIL",
            "firebaseNotificationId": userToken.DEVICE_TOKEN,
            "roles": [
              "ROLE_COACH", "ROLE_PLAYER"
            ]
          }
          debugger
          // console.log("params")

          this.setState({ loading: true }, () => {
            this.props.dispatch(Register(params, (res, resData) => {
              console.log("Login RESPP--", resData);
              debugger
              if (res) {
                this.setState({ loading: false })
                if (resData.typeOfUser === null) {
                  console.log("First if matched");
                  // Navigation.navigate('TellUsMore', {
                  //   state: "",
                  //   year: ""
                  // })

                  Navigation.navigate('TellUsMoreIntro', {
                    state: "",
                    year: ""
                  })
                }
                if (resData.onBoardingDone === false) {
                  console.log("Second if matched");
                  // Navigation.navigate('TellUsMore', {
                  //   state: "",
                  //   year: ""
                  // })
                  Navigation.navigate('TellUsMoreIntro', {
                    state: "",
                    year: ""
                  })
                } else {
                  debugger
                  console.log("Else part");
                  if (resData.parentApprovalRequired === false) {
                    onBoardData.selectedUserType = resData.typeOfUser.toLowerCase()
                    onBoardData.isAdult = !resData.parentApprovalRequired
                    onBoardData.isVerfied = resData.parentApprovalDone
                    onBoardData.fname = resData.personalInfo.firstName
                    onBoardData.lname = resData.personalInfo.lastName
                    onBoardData.profileUrl = resData.personalInfo.profilePictureURL
                    onBoardData.email = resData.personalInfo.email
                    UserModel.fname = resData.personalInfo.firstName
                    UserModel.lname = resData.personalInfo.lastName
                    UserModel.profileUrl = resData.personalInfo.profilePictureURL
                    UserModel.email = resData.personalInfo.email
                    UserModel.selectedUserType = resData.typeOfUser.toLowerCase()
                    UserModel.isAdult = !resData.parentApprovalRequired
                    UserModel.isVerfied = resData.parentApprovalDone
                    setObject('authData', onBoardData).then(() => {
                      this.navigateUserToItsHome(resData.typeOfUser)
                    })
                  } else {
                    if (resData.parentApprovalDone === false) {
                      // Navigation.navigate('TellUsMore')
                      Navigation.navigate('ParentEmail')
                    } else {
                      onBoardData.selectedUserType = resData.typeOfUser.toLowerCase()
                      onBoardData.isAdult = !resData.parentApprovalRequired
                      onBoardData.isVerfied = resData.parentApprovalDone
                      onBoardData.fname = resData.personalInfo.firstName
                      onBoardData.lname = resData.personalInfo.lastName
                      onBoardData.profileUrl = resData.personalInfo.profilePictureURL
                      onBoardData.email = resData.personalInfo.email
                      UserModel.fname = resData.personalInfo.firstName
                      UserModel.lname = resData.personalInfo.lastName
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
                this.setState({ loading: false }, () => {
                  setTimeout(() => {
                    showErrorAlert(msg)
                  }, 500);
                })

              }
            }))
          })


        } else {
          this.setState({ loading: false }, () => {
            setTimeout(() => {
              console.log("FirebaseAlerttt--", userInfo);
              debugger
              alert(userInfo)
            }, 500)
          })
        }
      })
    })
  };
  navigateUserToItsHome = (typeOfUser) => {
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
  setTextofEmailAndPass = (frm, txt) => {

    const { email, password, isConfirmPass, cpassword } = this.state;
    if (frm === 'email') {
      let valid = isValidEmail(txt);
      if (valid && password.length > characterLimit.password - 1) {
        if (isConfirmPass) {
          if (password === cpassword) {
            this.setState({ isbtnEnable: true, email: txt.trim() })
          } else {
            this.setState({ isbtnEnable: false, email: txt.trim() })
          }
        } else {
          this.setState({ isbtnEnable: true, email: txt.trim() })
        }
      } else {
        this.setState({ isbtnEnable: false, email: txt.trim() })
      }

    } else if (frm === 'cpass') {
      let valid = isValidEmail(email);
      if (txt.trim().length > characterLimit.password - 1 && valid) {
        if (password === txt) {
          this.setState({ isbtnEnable: true, cpassword: txt.trim() })
        } else {
          this.setState({ isbtnEnable: false, cpassword: txt.trim() })
        }
      } else {
        this.setState({ isbtnEnable: false, cpassword: txt.trim() })
      }
    } else {
      let valid = isValidEmail(email);
      if (txt.trim().length > characterLimit.password - 1 && valid) {
        if (isConfirmPass) {
          if (txt === cpassword) {
            this.setState({ isbtnEnable: true, password: txt.trim() })
          } else {
            this.setState({ isbtnEnable: false, password: txt.trim() })
          }
        } else {
          this.setState({ isbtnEnable: true, password: txt.trim() })
        }
      } else {
        this.setState({ isbtnEnable: false, password: txt.trim() })
      }

    }
  }
  render() {
    const { isbtnEnable, loading, isConfirmPass } = this.state;
    debugger;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
        <KeyBoardDismissHandler>
          <View style={{ marginHorizontal: 32, backgroundColor: Colors.base, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
              <TouchableOpacity style={{ width: wide * 0.1, }} onPress={() => Navigation.back()}>
                <Image style={{
                  width: wide * 0.08, height: wide * 0.08,
                  // marginTop: 20, 
                  borderRadius: wide * 0.02, borderWidth: 1, borderColor: Colors.borderColor
                }} source={require('../../Images/back_ico.png')} />
              </TouchableOpacity>
              <Text style={{
                // marginTop: 16,
                color: Colors.light, fontSize: 16,
                fontFamily: Fonts.Bold, lineHeight: 24,
                marginHorizontal: 10
              }}>
                Sign in with Email
              </Text>
            </View>

            <Progress.Bar
              progress={0.1}
              width={wide * 0.8}
              borderColor={Colors.base}
              unfilledColor={Colors.borderColor}
              style={{ marginTop: 16 }}
            />
          </View>
          <KeyboardAvoidingView keyboardVerticalOffset={0} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
            {/* <KeyboardAwareScrollView contentContainerStyle={{ minHeight: isNotch ? Layout.height - 170 : Layout.height - 100 }}> */}
            {/* <KeyboardAwareScrollView contentContainerStyle={{ minHeight: isNotch ? Layout.height - 170 : Layout.height - 100 }}
            showsVerticalScrollIndicator={false} enableOnAndroid={true}> */}
            <View style={{ flex: 1, marginHorizontal: 32, marginTop: 40 }} >
              {/* <Text style={{
                marginTop: 16,
                color: Colors.light, fontSize: 32,
                fontFamily: Fonts.B, lineHeight: 36
              }}>
                Sign in
              </Text>
              <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold }}>
                with Email
              </Text> */}

              <View style={{ marginTop: wide * 0.1 }}>
                <AnimatedInput
                  onEndEditing={() => this.checkEmailExist()}
                  placeholder="YOUR EMAIL"
                  //valid={() => isValidEmail(email)}
                  // errorText="Error"
                  onChangeText={(e) => this.setTextofEmailAndPass('email', e)}
                  value={this.state.email}
                  styleInput={{
                    fontFamily: Fonts.Bold, color: Colors.light,
                    fontSize: 16, lineHeight: 18
                  }}
                  // isAutoFoucs={true}
                  styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                  styleBodyContent={{ borderBottomWidth: 1.5, borderBottomColor: Colors.borderColor, width: wide * 0.8 }}
                  keyboardType={'email-address'}
                />
              </View>
              <View style={{ marginTop: wide * 0.15 }}>
                <AnimatedInput
                  placeholder="PASSWORD"
                  //valid={() => isValidEmail(email)}
                  // errorText="Error"
                  onChangeText={(e) => this.setTextofEmailAndPass('pass', e)}
                  value={this.state.password}
                  // isAutoFoucs={true}
                  styleInput={{ fontFamily: Fonts.Bold, color: Colors.light, fontSize: 16, lineHeight: 18 }}
                  styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                  styleBodyContent={{ borderBottomWidth: 1.5, borderBottomColor: Colors.borderColor, width: wide * 0.8 }}
                  secureTextEntry={true}

                />
                {
                  isConfirmPass ?

                    <View style={{ marginTop: wide * 0.1 }}>
                      <AnimatedInput

                        placeholder="CONFIRM PASSWORD"
                        //valid={() => isValidEmail(email)}
                        // errorText="Error"
                        onChangeText={(e) => this.setTextofEmailAndPass('cpass', e)}
                        value={this.state.cpassword}
                        styleInput={{
                          fontFamily: Fonts.Bold, color: Colors.light, fontSize: 16,
                          lineHeight: 18
                        }}
                        // isAutoFoucs={true}
                        styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                        styleBodyContent={{ borderBottomWidth: 1.5, borderBottomColor: Colors.borderColor, width: wide * 0.8 }}
                        secureTextEntry={true}

                      />
                    </View>
                    :
                    null
                }
              </View>



            </View>
            <AppLoader visible={loading} />
            {/* </KeyboardAwareScrollView> */}
          </KeyboardAvoidingView>

        </KeyBoardDismissHandler>
        <TouchableOpacity
          key={isbtnEnable}
          style={{
            width: wide * 0.8, height: 48,
            backgroundColor: Colors.btnBg,
            alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable === false ? 0.3 : 1.0,
            justifyContent: 'center', bottom: Platform.OS == 'android' ? 50 : 60, position: 'absolute'
          }} onPress={() => {
            if (isbtnEnable) {
              this.loginUser()
            }
          }}>
          <Text style={{
            alignSelf: 'center', color: Colors.light,
            fontFamily: Fonts.Bold,
          }}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
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

export default connect(mapStateToProps)(Login);
