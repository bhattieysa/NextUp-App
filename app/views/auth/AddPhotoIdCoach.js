import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity, Text, SafeAreaView,
  Image, KeyboardAvoidingView, ImageBackground, Alert, Platform
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login, uploadPhoto } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert, showAppPermissionAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';
import { NoInternet } from '../../utils/info';
import { characterLimit, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import ImagePicker from 'react-native-image-crop-picker';
import { getObject, setObject } from '../../middleware';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';

let wide = Layout.width;
class AddPhotoIdCoach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      avatar: UserModel.photoIdUrl !== undefined ? UserModel.photoIdUrl : '',
      avatarCerti: UserModel.coachCertiUrl !== undefined ? UserModel.coachCertiUrl : ''
    };
  }
  pickSingle(cropit, circular = false, isFrom) {
    Alert.alert(
      isFrom === 'ava' ? 'PHOTO ID' : 'COACHING CERTIFICATE',
      'Pick from',
      [
        {
          text: 'Gallery',
          onPress: async () => {
            const res = await Permission.checkPermission(PERMISSION_TYPE.gallery);
            if (res) {
              ImagePicker.openPicker({
                width: 500,
                height: 500,
                cropping: cropit,
                cropperCircleOverlay: circular,
                sortOrder: 'none',
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
                compressImageQuality: 1,
                compressVideoPreset: 'MediumQuality',
                includeExif: true,
                cropperStatusBarColor: 'white',
                cropperToolbarColor: 'white',
                cropperActiveWidgetColor: 'white',
                cropperToolbarWidgetColor: '#3498DB',
                mediaType: 'photo'
              })
                .then((image) => {
                  // console.log('received image', image);
                  if (isFrom === 'ava') {
                    this.setState({ avatar: image.path })
                  } else {
                    this.setState({ avatarCerti: image.path })
                  }
                  // 

                })
                .catch((e) => {
                  console.log(e);
                  // Alert.alert(e.message ? e.message : e);
                });
            } else {
              if (Platform.OS == 'ios') {
                showAppPermissionAlert("Alert", "You have not granted permission for photo library.")
              }
            }
          }
        },
        {
          text: 'Camera',
          onPress: async () => {
            const res = await Permission.checkPermission(PERMISSION_TYPE.camera);
            if (res) {
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                mediaType: 'photo'
              }).then(image => {
                if (isFrom === 'ava') {
                  this.setState({ avatar: image.path })
                } else {
                  this.setState({ avatarCerti: image.path })
                }
              });
            } else {
              if (Platform.OS == 'ios') {
                showAppPermissionAlert("Alert", "You have not granted permission for camera.")
              }
            }
          }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );

  }
  actionContinue = () => {
    debugger
    const { avatar, avatarCerti } = this.state;

    if (UserModel.photoIdUrl !== avatar && avatar !== '') {
      this.uploadImage(avatar, 'ID_PROOF')
    }
    if (UserModel.coachCertiUrl !== avatarCerti && avatarCerti !== '') {
      this.uploadImage(avatarCerti, 'CERTIFICATE_URL')
    }

    let onBoardData = {
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
      fid: UserModel.fid,
      isSocialLogin: UserModel.isSocialLogin,
      isProfileUploaded: UserModel.isProfileUploaded
    }
    setObject('authData', onBoardData).then(() => {
      this.setState({ loading: false })
      Navigation.navigate('CoachHome')
    })
    // Navigation.navigate('CoachHome')

  }
  uploadImage = (ava, strType) => {
    debugger
    // const { avatarCerti } = this.state;
    getObject('UserId').then((obj) => {
      this.setState({ loading: true }, () => {
        this.props.dispatch(uploadPhoto(ava, obj, UserModel.selectedUserType, strType, (res, uploadedUrl) => {
          debugger
          if (res) {
            if (strType === 'ID_PROOF') {
              UserModel.photoIdUrl = uploadedUrl
            } else if (strType === 'CERTIFICATE_URL') {
              UserModel.coachCertiUrl = uploadedUrl
            }
            // if (avatarCerti !== '') {
            //     this.uploadImage(avatarCerti, 'CERTIFICATE_URL')
            // } else {
            //     let onBoardData = {
            //         selectedUserType: UserModel.selectedUserType,
            //         isAdult: UserModel.isAdult,
            //         parentNameOrNum: UserModel.parentNameOrNum,
            //         email: UserModel.email,
            //         password: UserModel.password,
            //         fname: UserModel.fname,
            //         lname: UserModel.lname,
            //         dob: UserModel.dob,
            //         aboutMe: UserModel.aboutMe,
            //         profileUrl: UserModel.profileUrl,
            //         photoIdUrl: UserModel.photoIdUrl,
            //         isVerfied: UserModel.isVerfied,
            //         coachCertiUrl: uploadedUrl,
            //         fid: UserModel.fid,
            //         isSocialLogin: UserModel.isSocialLogin,
            //         isProfileUploaded: UserModel.isProfileUploaded
            //     }

            //     UserModel.coachCertiUrl = uploadedUrl
            //     setObject('authData', onBoardData).then(() => {

            //         this.setState({ loading: false })
            //         Navigation.navigate('CoachHome')
            //     })
            // }
          }
          else {
            this.setState({ loading: false }, () => {
              setTimeout(() => {
                showErrorAlert('Something went wrong!')
              }, 500);
            })

          }
        }))
      })

    })
  }
  render() {
    const { avatar, avatarCerti } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>

          <View style={{ flex: 1, marginHorizontal: 32 }} >

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
                One last step
              </Text>
            </View>



            <Progress.Bar
              progress={0.8}
              width={wide * 0.8}
              borderColor={Colors.base}
              unfilledColor={Colors.borderColor}
              style={{ marginTop: 16, }}
            />

            {/* <Text style={{
                        marginTop: 16,
                        color: Colors.light, fontSize: 32,
                        fontFamily: Fonts.Thin, lineHeight: 36, marginHorizontal: 32,
                    }}>
                        One last
                    </Text>
                    <Text style={{ color: Colors.light, fontSize: 32, marginHorizontal: 32, lineHeight: 36, fontFamily: Fonts.Bold }}>
                        Step
                    </Text> */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
              minHeight: isNotch ? Layout.height - wide * 0.9 : Layout.height - wide * 0.7, paddingBottom: isNotch ? 0 : 10,
              marginTop: 10
            }}>
              <View style={{ flex: 1, alignItems: 'center', marginVertical: wide * 0.1, justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => this.pickSingle(true, false, 'ava')}>
                  {
                    avatar === ''
                      ?

                      <Image source={require('../../Images/Placeholder_PhotoId.png')} resizeMode='cover'
                        style={{ tintColor: Colors.photIdRactangle }} />

                      :

                      <View style={{

                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10
                      }}>
                        <Image style={{
                          height: wide * 0.3, width: wide * 0.46,
                          borderRadius: 5
                        }} source={{ uri: avatar }} resizeMode='cover' />

                        <Image source={require('../../Images/placeHolder_photoid_border.png')}
                          style={{ position: 'absolute', tintColor: Colors.photIdRactangle }} />
                      </View>

                  }
                  {avatar == '' ?
                    <Text style={{
                      paddingTop: 10,
                      color: Colors.photIdRactangle, fontSize: 12,
                      fontFamily: Fonts.Regular, lineHeight: 16, width: wide * 0.5,
                      textAlign: 'center', alignSelf: 'center', marginTop: wide * 0.015,
                    }}>
                      For profile verification, try not to skip the process

                    </Text>
                    :
                    <View style={{
                      flexDirection: 'row', alignItems: 'center',
                      justifyContent: 'center', marginTop: wide * 0.015,
                    }}>
                      <Image source={require('../../Images/info_icon.png')}
                        style={{
                          width: 15, height: 15,
                          tintColor: Colors.photIdRactangle
                        }} />
                      <Text style={{
                        marginTop: 16,
                        color: Colors.photIdRactangle, fontSize: 12,
                        fontFamily: Fonts.Regular, lineHeight: 16, width: wide * 0.5,
                        textAlign: 'center', marginHorizontal: wide * 0.01
                      }}>
                        Your document is under verification, We will notify once verified.
                      </Text>

                    </View>
                  }

                </TouchableOpacity>
                <View style={{ position: 'absolute', top: wide * 0.18, bottom: wide * 0.18, left: wide * 0.04, alignItems: 'center', justifyContent: 'center' }}>

                  <Image style={{
                    width: 40, height: 40,

                  }} source={avatar === '' ? require('../../Images/new_uncheck_icon.png') : require('../../Images/tick_selected.png')} />
                  <Image style={{
                    flex: 1,
                    tintColor: Colors.photIdRactangle
                  }} source={require('../../Images/seperator_dash.png')} resizeMode='stretch' />
                  <Image style={{
                    width: 40, height: 40,

                  }} source={avatarCerti === '' ? require('../../Images/new_uncheck_icon.png') : require('../../Images/tick_selected.png')} />
                </View>
                <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.pickSingle(true, false, 'certi')}>
                  {
                    avatarCerti === ''
                      ?

                      <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Image source={require('../../Images/CochingCerti.png')} resizeMode='cover'
                          style={{ tintColor: Colors.photIdRactangle }} />
                        <View style={{ position: 'absolute', alignItems: 'center', paddingVertical: 10 }}>
                          <Text style={{
                            color: Colors.photIdRactangle, fontSize: 14,
                            fontFamily: Fonts.Bold, lineHeight: 18
                          }}>COACHING</Text>
                          <Text style={{
                            color: Colors.photIdRactangle, fontSize: 14,
                            fontFamily: Fonts.Bold, lineHeight: 18
                          }}>CERTIFICATE</Text>
                        </View>
                      </View>

                      :

                      <View style={{

                        justifyContent: 'center',
                        alignItems: 'center', paddingVertical: 10
                      }}>
                        <Image style={{
                          height: wide * 0.3, width: wide * 0.46,
                          borderRadius: 5
                        }} source={{ uri: avatarCerti }} resizeMode='cover' />

                        <Image source={require('../../Images/placeHolder_photoid_border.png')}
                          style={{ position: 'absolute', tintColor: Colors.photIdRactangle }} />
                      </View>

                  }

                  {this.state.avatarCerti == '' || this.state.avatarCerti == undefined ?
                    <></>
                    :

                    <View style={{
                      flexDirection: 'row', alignItems: 'center',
                      justifyContent: 'center', marginTop: wide * 0.015,
                    }}>
                      <Image source={require('../../Images/info_icon.png')}
                        style={{
                          width: 15, height: 15,
                          tintColor: Colors.photIdRactangle
                        }} />

                      <Text style={{
                        marginTop: 16,
                        color: Colors.photIdRactangle, fontSize: 12,
                        fontFamily: Fonts.Regular, lineHeight: 16, width: wide * 0.5,
                        textAlign: 'center', marginHorizontal: wide * 0.01
                      }}>
                        Your document is under verification, We will notify once verified.
                      </Text>
                    </View>
                  }

                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            key={avatar + avatarCerti}
            style={{
              width: wide * 0.8, height: 48,
              backgroundColor: Colors.btnBg,
              alignSelf: 'center', borderRadius: 24, opacity: avatar !== '' || avatarCerti !== '' ? 1.0 : 0.3,
              justifyContent: 'center',
            }} onPress={() => {
              if (avatar !== '' || avatarCerti !== '') {
                this.actionContinue()
              }
            }}>
            <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Navigation.navigate('CoachHome')}>
            <Text style={{
              marginTop: 12,
              color: Colors.light, fontSize: 12,
              fontFamily: Fonts.Regular, lineHeight: 16, alignSelf: 'center', marginBottom: 20
            }}>
              Skip
            </Text>
          </TouchableOpacity>

          <AppLoader visible={this.state.loading} />
        </SafeAreaView >
      </View>
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

export default connect(mapStateToProps)(AddPhotoIdCoach);
