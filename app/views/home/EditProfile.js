import React, { Component, useState, useEffect } from 'react';
import {
  View, TouchableOpacity, Alert, Text, SafeAreaView,
  Image, key, KeyboardAvoidingView, Keyboard, Platform, Modal, StyleSheet,
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
  CommonStyles,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';


import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import AnimatedInput from "../../Helpers/react-native-animated-input";
import EditAnimatedInput from '../../Helpers/react-native-animated-input/src/AnimatedInput/EditInput';
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { invalid, lang } from 'moment'
import { getObject, setObject, removeAllLocalData, getUserToken } from '../../middleware';
import { getCities, getStates, getSubscriptionInfoById, getUserInfo, updateUserInfo } from '../../actions/home';
import { Logout } from '../../actions/auth';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadPhoto } from '../../actions/auth';
import FastImage from 'react-native-fast-image';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import backend from '../../config/backend';
import { showErrorAlert, showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { DropDownSelect } from '../../components/common/customDropDown';
import { ActionSheet } from 'react-native-cross-actionsheet';
import { RadioButton } from '../../components/common/radioButton';
import { CoachOtherInfo } from './EditHelperComponent/CoachOtherInfo';
import { PlayerOtherInfo } from './EditHelperComponent/PlayerOtherInfo';

let wide = Layout.width;
class EditProfile extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: null,
      fname: '',
      lname: '',
      dob: 'SELECT DATE',
      isbtnEnable: true,
      isDatePickerVisible: false,
      email: '',
      num: '',
      password: '',
      avatar: '',
      firebaseAuthTokenId: '',
      loginWith: '',
      nPass: '',
      cPass: '',
      selectedTabIndex: 1,
      isResetPassword: false,
      userData: null,
      certificateIdUrl: null,
      idProofUrl: '',
      isOldPassCorrect: false,
      userRole: '',
      updateLoading: false,
      playerGender: '',
      isHighSchool: '',
      isGirl: '',
      isIdApproved: null,
      isCoachCertiApproved: null,
      isPlayerIdApproved: null,

      classof: '',
      school: '',
      coachTeam: '',
      coachingType: '',
      selected_coachingType: '',
      ageGroup: '',
      // strSelectedMode: UserModel.selectedUserType !== undefined ? UserModel.selectedUserType : 'player',
      selected_state: '',
      city: '',
      openStateModal: false,
      openCityModal: false,
      stateList: null,
      stateDt: null,
      cityList: null,
      cityDt: null,
      state_srch: '',
      city_srch: '',
      selected_height: '',
      weight: '',
      playerCategory: ''
    };
    this.inputs = {};
  }
  componentDidMount() {
    getObject('UserId').then((obj) => {
      this.setState({ loading: true }, () => {
        this.props.dispatch(getUserInfo(obj, (res, resData) => {
          debugger
          console.log(resData)
          if (res) {
            debugger
            console.log("ressss", resData);
            if (resData?.typeOfUser == 'COACH') {
              this.setState({
                fname: resData.personalInfo?.firstName,
                lname: resData.personalInfo?.lastName,
                dob: resData.personalInfo?.dateOfBirth != null && resData.personalInfo?.dateOfBirth !== 'Invalid date' ?
                  resData.personalInfo?.dateOfBirth : 'SELECT DATE',
                email: resData.personalInfo?.email,
                num: resData.personalInfo?.contactNumber != null ? resData.personalInfo?.contactNumber : '',
                avatar: resData.personalInfo?.profilePictureURL,
                firebaseAuthTokenId: resData.personalInfo?.firebaseAuthTokenId,
                loginWith: resData.personalInfo?.loginWith,
                userData: resData,
                certificateIdUrl: resData.coachInfo?.certificateUrl,
                idProofUrl: resData.coachInfo?.idProofUrl,
                userRole: 'ROLE_COACH',
                isHighSchool: resData?.coachInfo?.coachingType?.typeOfCoaching == 'TRAVEL_TEAM' ? false : true,
                coachTeam: resData?.coachInfo?.coachingType?.schoolName,
                coachingType: resData?.coachInfo?.coachingType?.typeOfCoaching,
                selected_coachingType: resData?.coachInfo?.coachingType?.typeOfCoaching == "JV" ? 'Jr Varsity'
                  : resData?.coachInfo?.coachingType?.typeOfCoaching == "VARSITY" ? 'Varsity' : resData?.coachInfo?.coachingType?.typeOfCoaching == "BOTH" ? 'Both' : '',
                ageGroup: resData?.coachInfo?.coachingType?.ageGroup,
                selected_state: resData?.coachInfo?.coachingType?.state,
                city: resData?.coachInfo?.coachingType?.city,
                // isIdApproved: resData.coachInfo?
                // isCoachCertiApproved: resData.coachInfo?

              }, () => this.getStateData())
            } else {
              this.setState({
                fname: resData.personalInfo?.firstName,
                lname: resData.personalInfo?.lastName,
                dob: resData.personalInfo?.dateOfBirth != null && resData.personalInfo?.dateOfBirth !== 'Invalid date' ?
                  resData.personalInfo?.dateOfBirth : 'SELECT DATE',
                email: resData.personalInfo?.email,
                num: resData.personalInfo?.contactNumber != null ? resData.personalInfo?.contactNumber : '',
                avatar: resData.personalInfo?.profilePictureURL,
                firebaseAuthTokenId: resData.personalInfo?.firebaseAuthTokenId,
                loginWith: resData.personalInfo?.loginWith,
                userData: resData,
                idProofUrl: resData.playerInfo?.idProofUrl,
                playerGender: resData.personalInfo?.gender,
                userRole: 'ROLE_PLAYER',
                isGirl: resData?.personalInfo?.gender == 'MALE' ? false : true,
                classof: resData?.personalInfo?.schoolInfo?.classOff,
                school: resData?.personalInfo?.schoolInfo?.name,
                selected_state: resData?.personalInfo?.schoolInfo?.state,
                city: resData?.personalInfo?.schoolInfo?.city,
                // selected_height: resData?.personalInfo?.schoolInfo?.height,
                // selected_height: resData?.personalInfo?.schoolInfo?.weight,
                playerCategory: resData?.personalInfo?.schoolInfo?.typeOfPlayer,
                isIdApproved: resData?.playerInfo?.idProofApproved
              })
            }
            console.log("SocialLogin", UserModel.isSocialLogin);

            this.checkForButtonEnable()

          }
          this.setState({
            loading: false
          })

        }))
      })

    })
  }

  componentDidUpdate(prevProps) {
    console.log("Did focus called");
    if (prevProps !== this.props) {
      debugger
      // if (this.props?.navigation?.state?.params?.state) {
      console.log("Did focus called state found, ", this.props.navigation?.state?.params?.state);

      //     this.setTextofFields('state', this.props.navigation?.state?.params?.state);

      // }
      if (this.props?.navigation?.state?.params?.fromRoute == "year") {
        if (this.props?.navigation?.state?.params?.year) {
          console.log("Did focus called year found");
          this.setState({
            classof: this.props.navigation.state.params.year
          })
        }
      }
      else if (this.props?.navigation?.state?.params?.fromRoute == "school") {
        if (this.props?.navigation?.state?.params?.school) {
          this.setState({
            school: this.props.navigation.state.params.school?.name,
            selected_state: this.props.navigation.state.params.selected_state,
            city: this.props.navigation.state.params.city,
          })
        }
      }
      else if (this.props?.navigation?.state?.params?.fromRoute == "teamList") {
        if (this.props?.navigation?.state?.params?.team) {
          debugger
          this.setState({
            coachTeam: this.props.navigation.state.params.team?.name,
            selected_state: this.props.navigation.state.params.selected_state,
            city: this.props.navigation.state.params.city,
          })
        }
      }

    }
  }

  getStateData = () => {
    debugger
    this.props.dispatch(getStates((st, data) => {
      if (st) {
        debugger
        this.setState({ stateList: data, stateDt: data }, () => {
          this.getCityData(data[0]);
        })
      }
    }));
  }

  getCityData = (st) => {
    debugger
    this.props.dispatch(getCities(st, (res, city_dt) => {
      if (res) {
        this.setState({ cityList: city_dt, cityDt: city_dt, city: city_dt[0] })
      }
    }))
  }

  checkForButtonEnable = () => {
    const { fname,
      lname,
      dob, num, userData } = this.state;
    if (fname == null || lname == null || num == null) {
      this.setState({ isbtnEnable: false })
    } else if (fname.trim() != '' && lname.trim() != '' && num.trim() != '') {
      if (userData?.typeOfUser === 'PLAYER') {
        if (dob !== 'SELECT DATE') {
          this.setState({ isbtnEnable: true })
        } else {
          this.setState({ isbtnEnable: false })
        }
      } else {
        this.setState({ isbtnEnable: true })
      }
    } else {
      this.setState({ isbtnEnable: false })
    }

  }
  setTextofFields = (frm, txt) => {

    switch (frm) {
      case 'fname':
        this.setState({ fname: txt }, () => {
          this.checkForButtonEnable()

        })
        break;
      case 'lname':
        this.setState({ lname: txt }, () => {
          this.checkForButtonEnable()

        })
        break;
      case 'dob':
        this.setState({ isDatePickerVisible: false, dob: moment(txt).format("MM/DD/YYYY") }, () => {
          this.checkForButtonEnable()
        })
        break;

      case 'num':
        this.validateContactNumber(txt);

        break;
      default:
        break;
    }
  }

  validateContactNumber = (val) => {
    if (val.length > 10) {
      alert("Enter a valid phone number.");
      return
    }

    // console.log(typeof val);
    this.setState({ num: val }, () => {
      this.checkForButtonEnable()
    })
  }

  calculate_age = (date) => {
    var today = new Date();
    var birthDate = new Date(date);
    console.log("get bod-->", birthDate) // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log('my age', age_now);
    return age_now;
  }

  pickSingle(cropit, circular = false, mediaType) {
    Alert.alert(
      'PHOTO',
      'Please select option',
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
                compressImageQuality: 0.8,
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
                  this.setState({ avatar: image.path })

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
            // CheckGalleryPermission((res) => {
            //     console.log(res);
            // });
            // 
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
                this.setState({ avatar: image.path })
              });
            } else {
              if (Platform.OS == 'ios') {
                showAppPermissionAlert("Alert", "You have not granted permission for camera.")
              }
            }
            // })

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

  pickIdSingle(cropit, circular = false, isFrom) {
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
                    this.setState({ idProofUrl: image.path })
                  } else {
                    this.setState({ certificateIdUrl: image.path })
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
                  this.setState({ idProofUrl: image.path })
                } else {
                  this.setState({ certificateIdUrl: image.path })
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

  editProfileData = () => {
    // debugger
    const { avatar, idProofUrl, certificateIdUrl } = this.state;
    if (idProofUrl != null) {
      if (!idProofUrl.includes('http')) {
        this.uploadIdImage(idProofUrl, 'ID_PROOF')
      }
    }
    if (certificateIdUrl != null) {
      if (!certificateIdUrl.includes('http')) {
        this.uploadIdImage(certificateIdUrl, 'CERTIFICATE_URL')
      }
    }
    if (avatar != null) {
      if (!avatar.includes('http')) {
        this.uploadImage()
      } else {
        this.setProfileData();
      }
    } else {
      this.setProfileData()
    }

    // if (avatar.includes('http')) {
    //     this.setProfileData()
    // } else {
    //     this.uploadImage()
    // }
  }

  uploadImage = () => {
    const { avatar } = this.state;
    getObject('UserId').then((obj) => {
      this.setState({ updateLoading: false }, () => {
        this.props.dispatch(uploadPhoto(avatar, obj, UserModel.selectedUserType, 'PROFILE_PICTURE', (res, uploadedUrl) => {
          debugger
          if (res) {
            this.setState({ avatar: uploadedUrl }, () => {
              this.setProfileData()
            })
            // let onBoardData = {
            //     selectedUserType: UserModel.selectedUserType,
            //     isAdult: UserModel.isAdult,
            //     parentNameOrNum: UserModel.parentNameOrNum,
            //     email: UserModel.email,
            //     password: UserModel.password,
            //     fname: UserModel.fname,
            //     lname: UserModel.lname,
            //     dob: UserModel.dob,
            //     aboutMe: UserModel.aboutMe,
            //     profileUrl: uploadedUrl,
            //     photoIdUrl: UserModel.photoIdUrl,
            //     isVerfied: UserModel.isVerfied,
            //     coachCertiUrl: UserModel.coachCertiUrl,
            //     fid: UserModel.fid,
            //     isSocialLogin: UserModel.isSocialLogin,
            //     isProfileUploaded: true
            // }
            // UserModel.profileUrl = uploadedUrl
            // UserModel.isProfileUploaded = true
            // setObject('authData', onBoardData).then(() => {
            //     this.setState({ avatar: uploadedUrl }, () => {
            //         this.setProfileData()
            //     })
            // })
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

  uploadIdImage = (ava, strType) => {
    // const { avatarCerti } = this.state;
    getObject('UserId').then((obj) => {
      this.setState({ updateLoading: false }, () => {
        this.props.dispatch(uploadPhoto(ava, obj, UserModel.selectedUserType, strType, (res, uploadedUrl) => {
          debugger
          if (res) {
            if (strType === 'ID_PROOF') {
              UserModel.photoIdUrl = uploadedUrl
              this.setState({ idProofUrl: uploadedUrl })
            } else if (strType === 'CERTIFICATE_URL') {
              UserModel.coachCertiUrl = uploadedUrl
              this.setState({ certificateIdUrl: uploadedUrl })
            }

          }
          else {
            this.setState({ loading: false, updateLoading: false }, () => {
              setTimeout(() => {
                showErrorAlert('Something went wrong!')
              }, 500);
            })
          }
        }))
      })

    })
  }

  setProfileData = () => {
    debugger
    const { fname,
      lname,
      dob, email, num, firebaseAuthTokenId,
      loginWith, avatar, password,
      nPass,
      cPass, idProofUrl, certificateIdUrl, userRole, isOldPassCorrect,
      coachingType, selected_state, city, coachTeam, classof, isHighSchool, ageGroup, school,
      selected_height, weight, playerCategory, isGirl } = this.state;
    console.log("DOBBBB", dob); //dobbbbb 03/23/1995
    let gender = '';
    if (nPass !== '') {
      debugger
      if (password.trim() == '') {
        alert("Please enter old password.")
        return
      }
      if (!isOldPassCorrect) {
        alert("Please enter correct old password.")
        return
      }
      if (nPass !== cPass) {
        alert("New Password and Confirm Password not matched.")
        return
      }
      debugger
      backend.updateUserPassword(password, nPass, (res) => {
        if (res) {
          debugger
          UserModel.password = nPass;
          console.log('Password updated')
          let onBoardData = {
            selectedUserType: UserModel.selectedUserType,
            isAdult: UserModel.isAdult,
            parentNameOrNum: UserModel.parentNameOrNum,
            email: UserModel.email,
            password: nPass !== '' ? nPass : UserModel.password,
            fname: fname,
            lname: lname,
            dob: dob,
            aboutMe: UserModel.aboutMe,
            profileUrl: avatar,
            photoIdUrl: idProofUrl,
            isVerfied: UserModel.isVerfied,
            coachCertiUrl: certificateIdUrl,
            fid: UserModel.fid,
            isSocialLogin: UserModel.isSocialLogin,
            isProfileUploaded: true

          }
          UserModel.profileUrl = avatar
          UserModel.isProfileUploaded = true
          setObject('authData', onBoardData).then(() => {
            var obje = {};
            if (UserModel.selectedUserType == 'coach') {
              obje = {
                "idProofUrl": idProofUrl,
                "certificateUrl": certificateIdUrl != '' ? certificateIdUrl : null,
                "coachingType": {
                  typeOfCoaching: coachingType,
                  schoolName: coachTeam,
                  ageGroup: ageGroup,
                  state: selected_state,
                  city: city,
                  isHighSchool: isHighSchool,
                },
                "personalInfo": {
                  "firstName": fname,
                  "lastName": lname,
                  "dateOfBirth": dob != "SELECT DATE" ? dob : null,
                  "email": email,
                  "profilePictureURL": avatar,
                  "contactNumber": num,
                  "firebaseAuthTokenId": firebaseAuthTokenId,
                  "loginWith": loginWith,
                  "pushNotificationEnabled": false,
                  "password": password,
                  "roles": [
                    userRole
                  ],
                  // "confirmPassword": nPass
                }
              }
            } else {
              if (isGirl == false) {
                gender = 'MALE'
              } else {
                gender = 'FEMALE'
              }
              obje = {
                "idProofUrl": idProofUrl,
                "certificateUrl": certificateIdUrl != '' ? certificateIdUrl : null,
                "personalInfo": {
                  "firstName": fname,
                  "lastName": lname,
                  "dateOfBirth": dob != "SELECT DATE" ? dob : null,
                  "email": email,
                  "profilePictureURL": avatar,
                  "contactNumber": num,
                  "firebaseAuthTokenId": firebaseAuthTokenId,
                  "loginWith": loginWith,
                  "pushNotificationEnabled": false,
                  "height": selected_height,
                  "weight": weight,
                  "gender": gender,
                  "schoolInfo": {
                    city: city,
                    state: selected_state,
                    name: school,
                    classOff: classof,
                    typeOfPlayer: playerCategory,
                  },
                  "password": password,
                  "roles": [
                    userRole
                  ],
                  // "confirmPassword": nPass
                }
              }
            }
            debugger
            this.setState({ loading: true, updateLoading: true, }, () => {
              getObject('UserId').then((obj) => {
                this.props.dispatch(updateUserInfo(obj, obje, (res, msg) => {
                  debugger
                  // this.setState({ loading: false }, () => {
                  if (res) {
                    this.setState({ updateLoading: false, loading: false }, () => {
                      setTimeout(() => {
                        Navigation.back();

                      }, 200);
                    })
                    // setTimeout(() => {
                    //     Alert.alert(
                    //         'Alert',
                    //         'Profile updated successfully!',
                    //         [

                    //             {
                    //                 text: 'OK', onPress: () => {
                    //                     Navigation.back()
                    //                 }
                    //             }
                    //         ],
                    //         { cancelable: false }
                    //     );
                    // }, 1000)

                  } else {
                    setTimeout(() => {
                      alert(msg)
                    }, 1000)

                  }
                }))
              })
            })
          })
        }

      })
    } else {
      let onBoardData = {
        selectedUserType: UserModel.selectedUserType,
        isAdult: UserModel.isAdult,
        parentNameOrNum: UserModel.parentNameOrNum,
        email: UserModel.email,
        password: nPass !== '' ? nPass : UserModel.password,
        fname: fname,
        lname: lname,
        dob: dob,
        aboutMe: UserModel.aboutMe,
        profileUrl: avatar,
        photoIdUrl: idProofUrl,
        isVerfied: UserModel.isVerfied,
        coachCertiUrl: certificateIdUrl,
        fid: UserModel.fid,
        isSocialLogin: UserModel.isSocialLogin,
        isProfileUploaded: true
      }
      UserModel.profileUrl = avatar
      UserModel.isProfileUploaded = true
      setObject('authData', onBoardData).then(() => {

        var obje = {}
        if (UserModel.selectedUserType == 'coach') {
          debugger
          obje = {
            "idProofUrl": idProofUrl,
            "certificateUrl": certificateIdUrl != '' ? certificateIdUrl : null,
            "coachingType": {
              typeOfCoaching: coachingType,
              schoolName: coachTeam,
              ageGroup: ageGroup,
              state: selected_state,
              city: city,
              isHighSchool: isHighSchool,
            },
            "personalInfo": {
              "firstName": fname,
              "lastName": lname,
              "dateOfBirth": dob != "SELECT DATE" ? dob : null,
              "email": email,
              "profilePictureURL": avatar,
              "contactNumber": num,
              "firebaseAuthTokenId": firebaseAuthTokenId,
              "loginWith": loginWith,
              "pushNotificationEnabled": false,
              "password": password,
              "roles": [
                userRole
              ],
              // "confirmPassword": nPass
            }
          }
        } else {
          obje = {
            "idProofUrl": idProofUrl,
            "certificateUrl": certificateIdUrl != '' ? certificateIdUrl : null,
            "personalInfo": {
              "firstName": fname,
              "lastName": lname,
              "dateOfBirth": dob != "SELECT DATE" ? dob : null,
              "email": email,
              "profilePictureURL": avatar,
              "contactNumber": num,
              "firebaseAuthTokenId": firebaseAuthTokenId,
              "loginWith": loginWith,
              "pushNotificationEnabled": false,
              "height": selected_height,
              "weight": weight,
              "gender": gender,
              "schoolInfo": {
                city: city,
                state: selected_state,
                name: school,
                classOff: classof,
                typeOfPlayer: playerCategory,
              },
              "password": password,
              "roles": [
                userRole
              ],
              // "confirmPassword": nPass
            }
          }
        }

        // var obje = {
        //   "idProofUrl": idProofUrl,
        //   "certificateUrl": certificateIdUrl != '' ? certificateIdUrl : null,
        //   "personalInfo": {
        //     "firstName": fname,
        //     "lastName": lname,
        //     "dateOfBirth": dob != "SELECT DATE" ? dob : null,
        //     "email": email,
        //     "profilePictureURL": avatar,
        //     "contactNumber": num,
        //     "firebaseAuthTokenId": firebaseAuthTokenId,
        //     "loginWith": loginWith,
        //     "pushNotificationEnabled": false,
        //     "password": UserModel.password,
        //     "roles": [
        //       userRole
        //     ],
        //     // "confirmPassword": nPass
        //   }
        // }
        console.log("Edit Obj--", obje);
        debugger
        this.setState({ loading: true, updateLoading: true, }, () => {
          getObject('UserId').then((obj) => {
            this.props.dispatch(updateUserInfo(obj, obje, (res, msg) => {
              debugger
              // this.setState({ loading: false }, () => {
              if (res) {
                this.setState({ updateLoading: false, loading: false }, () => {
                  setTimeout(() => {
                    Navigation.back();
                  }, 200);
                })
                // setTimeout(() => {
                //     Alert.alert(
                //         'Alert',
                //         'Profile updated successfully!',
                //         [

                //             {
                //                 text: 'OK', onPress: () => {
                //                     Navigation.back()
                //                 }
                //             }
                //         ],
                //         { cancelable: false }
                //     );
                // }, 1000)

              } else {
                setTimeout(() => {
                  alert(msg)
                }, 1000)

              }
              // })


            }))
          })
        })
      })
    }
  }

  _handleLogOut = () => {
    debugger
    console.log("Logout call");
    let deviceTkn = '';

    getObject('DEVICE_TOKEN').then((tkn) => {

      console.log("Token is ", tkn);

      if (!tkn) {
        console.log("Not have token removing local data");
        setTimeout(() => {
          removeAllLocalData().then((res) => {
            if (res) {
              // getUserToken().then((res) => {
              debugger
              console.log(res);
              Navigation.navigate('AppReload');
              // this.props.navigation.navigate("AuthLoading", { transition: 'vertical' });

              // })
              // Navigation.navigate('AuthLoading');
            }
          })
        }, 200);
      }

      deviceTkn = tkn;

      getObject('UserId').then((obj) => {
        this.setState({ loading: true }, () => {
          this.props.dispatch(Logout(obj, tkn, (res, resData) => {
            if (res) {
              debugger
              this.setState({ loading: false }, () => {
                setTimeout(() => {
                  removeAllLocalData().then((res) => {
                    if (res) {
                      // getUserToken().then((res) => {
                      debugger
                      console.log(res);
                      Navigation.navigate('AppReload');
                      // this.props.navigation.navigate("AuthLoading", { transition: 'vertical' });

                      // })
                      // Navigation.navigate('AuthLoading');
                    }
                  })
                }, 200);
              })
            }
          }))
        })
      })

    })
  }


  handleStateSrch = (txt) => {
    const { stateDt } = this.state;
    if (txt !== '' && txt !== null) {
      let input = txt.toUpperCase();
      let resultStates = stateDt.filter(i => i.includes(input));
      this.setState({ stateList: resultStates });
    }
    else {
      this.setState({ stateList: stateDt })
    }
  }

  handleCitySrch = (txt) => {
    const { cityDt } = this.state;
    if (txt !== '' && txt !== null) {
      let input = txt.toUpperCase();
      let resultCity = cityDt.filter(i => i.toUpperCase().startsWith(input));
      this.setState({ cityList: resultCity });
    }
    else {
      this.setState({ cityList: cityDt });
    }
  }


  render() {
    const { isbtnEnable, fname,
      lname,
      dob,
      isDatePickerVisible, avatar, password, nPass,
      cPass, loading, isResetPassword, selectedTabIndex, isOldPassCorrect,
      coachingTypInfo } = this.state;
    // console.log("dobbbbb", moment(dob, 'MM/DD/YYYY').format("DD/MM/YYYY"));
    console.log("dobbbbb", dob);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          {/* {loading == true ?
                    <View style={{ flex: 1, backgroundColor: Colors.base }}>
                        
                    </View>
                    : */}
          <>
            {/* <AppLoader visible={this.state.updateLoading} /> */}
            <AppLoader visible={this.state.loading} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between'
            }}>
              <ScreenHeader
                title={'Edit Profile'}
                backButtonAction={() => Navigation.back()}
              />
              {/* <TouchableOpacity style={{
                flexDirection: 'row',
                marginRight: wide * 0.06,
                alignItems: 'center',
                marginTop: -5,
                // borderColor: Colors.light,
                // borderWidth: 2,
                // borderRadius: 5,
              }}
                activeOpacity={1}
                onPress={() => this._handleLogOut()}

              >

                <Image
                  style={{
                    width: 20, height: 20,
                    tintColor: Colors.btnBg
                  }}
                  source={require('../../Images/logout.png')}
                />
                <Text style={{
                  color: Colors.light,
                  fontSize: 18, lineHeight: 24,
                  fontFamily: Fonts.Bold,
                  marginLeft: wide * 0.03,

                }}>Log Out</Text>
              </TouchableOpacity> */}

            </View>

            <View style={{
              width: '90%', alignSelf: 'center',
              flexDirection: 'row',
              marginTop: wide * 0.03,
              marginBottom: wide * 0.02,
            }}>
              <TouchableOpacity style={{
                alignItems: 'center',
                borderBottomColor: selectedTabIndex == 1 ? Colors.light : null,
                borderBottomWidth: selectedTabIndex == 1 ? 1.2 : null,
              }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedTabIndex: 1, })}
              >
                <Text style={{
                  color: selectedTabIndex == 1 ? Colors.light : Colors.newGrayFontColor,
                  fontSize: 16, lineHeight: 24,
                  fontFamily: Fonts.Bold,

                }}>
                  Account Details
                </Text>

              </TouchableOpacity>

              <TouchableOpacity style={{
                alignItems: 'center',
                borderBottomColor: selectedTabIndex == 2 ? Colors.light : null,
                borderBottomWidth: selectedTabIndex == 2 ? 1.2 : null,
                marginLeft: wide * 0.08
              }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedTabIndex: 2, })}
              >
                <Text style={{
                  color: selectedTabIndex == 2 ? Colors.light : Colors.newGrayFontColor,
                  fontSize: 16, lineHeight: 24,
                  fontFamily: Fonts.Bold,

                }}>
                  Verification
                </Text>

              </TouchableOpacity>

              <TouchableOpacity style={{
                alignItems: 'center',
                borderBottomColor: selectedTabIndex == 3 ? Colors.light : null,
                borderBottomWidth: selectedTabIndex == 3 ? 1.2 : null,
                marginLeft: wide * 0.08
              }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedTabIndex: 3, })}
              >
                <Text style={{
                  color: selectedTabIndex == 3 ? Colors.light : Colors.newGrayFontColor,
                  fontSize: 16, lineHeight: 24,
                  fontFamily: Fonts.Bold,

                }}>
                  Other Details
                </Text>

              </TouchableOpacity>
            </View>

            <KeyboardAvoidingView keyboardVerticalOffset={45}
              style={{ flex: 1, }}
              behavior={Platform.OS === 'ios' ? "padding" : null}>

              {selectedTabIndex == 1 ?
                <ScrollView showsVerticalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{
                    // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                    paddingBottom: isNotch ? 0 : 10
                  }}>
                  <View style={{
                    width: '90%',
                    alignSelf: 'center',
                    // flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: wide * 0.06
                  }}>
                    <TouchableOpacity
                      style={{
                        width: wide * 0.25, height: wide * 0.25,
                        borderRadius: wide * 0.25 / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: Colors.light,
                        borderWidth: 2
                      }}
                      onPress={() => this.pickSingle(true, true)}
                    >
                      {avatar !== '' ?
                        <FastImage style={{
                          width: wide * 0.24, height: wide * 0.24,
                          borderRadius: wide * 0.24 / 2,
                        }}

                          source={{ uri: avatar }}
                          // source={require('../../Images/male_onboard_Icon.png')}
                          resizeMode={'cover'}
                        />
                        :
                        <></>
                      }
                      <View style={{
                        width: wide * 0.23, height: wide * 0.2,
                        bottom: 0, position: 'absolute', alignItems: 'center'
                      }}>
                        {/* <Image style={{
                          width: '100%', height: '100%',
                          borderRadius: wide * 0.24 / 2,
                        }} resizeMode={'contain'}
                          source={require('../../Images/edit_profile_gradiant.png')}
                        /> */}
                        <Image source={require('../../Images/camera_icon2.png')}
                          resizeMode={'contain'}
                          style={{
                            position: 'absolute',
                            bottom: 8, width: 25, height: 25,
                            tintColor: Colors.shade
                          }} />
                      </View>

                    </TouchableOpacity>

                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: '90%',
                    // marginRight: wide * 0.02,
                    marginTop: wide * 0.15,
                  }}>
                    <View>
                      {fname !== null || fname.length != 0 ?
                        <EditAnimatedInput
                          placeholder="FIRST NAME"
                          onChangeText={(e) => this.setTextofFields('fname', e)}
                          value={fname}
                          styleInput={{
                            fontFamily: Fonts.Bold,
                            color: Colors.light,
                            fontSize: 16, lineHeight: 18,
                          }}
                          styleLabel={{ fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder }}
                          styleBodyContent={{
                            borderBottomWidth: 1.5,
                            borderBottomColor: Colors.newGrayFontColor,
                            width: wide * 0.4
                          }}
                        />
                        :
                        <AnimatedInput
                          placeholder="FIRST NAME"
                          onChangeText={(e) => this.setTextofFields('fname', e)}
                          value={fname}
                          styleInput={{
                            fontFamily: Fonts.Bold,
                            color: Colors.light,
                            fontSize: 16, lineHeight: 18,
                          }}
                          styleLabel={{ fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder }}
                          styleBodyContent={{
                            borderBottomWidth: 1.5,
                            borderBottomColor: Colors.newGrayFontColor,
                            width: wide * 0.4
                          }}
                        />
                      }

                    </View>
                    <View >
                      {lname !== null || lname.length != 0 ?
                        <EditAnimatedInput
                          placeholder="LAST NAME"
                          onChangeText={(e) => {
                            this.setTextofFields('lname', e)

                          }
                          }
                          value={lname}
                          styleInput={{
                            fontFamily: Fonts.Bold,
                            color: Colors.light,
                            fontSize: 16, lineHeight: 18,

                          }}
                          styleLabel={{ fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder }}
                          styleBodyContent={{
                            borderBottomWidth: 1.5,
                            borderBottomColor: Colors.newGrayFontColor,
                            width: wide * 0.4,
                          }}

                        // multiline
                        />
                        :
                        <AnimatedInput
                          placeholder="LAST NAME"
                          onChangeText={(e) => {
                            this.setTextofFields('lname', e)
                          }
                          }
                          // onChangeText={(e) => this.setTextofFields('lname', e)}
                          value={lname}
                          styleInput={{
                            fontFamily: Fonts.Bold,
                            color: Colors.light,
                            fontSize: 16, lineHeight: 18,

                          }}
                          styleLabel={{ fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder }}
                          styleBodyContent={{
                            borderBottomWidth: 1.5,
                            borderBottomColor: Colors.newGrayFontColor,
                            width: wide * 0.4,
                          }}

                        // multiline
                        />
                      }

                    </View>

                  </View>




                  <View style={{
                    marginTop: wide * 0.06, width: '90%',
                    alignSelf: 'center'
                  }}>
                    <Text style={{
                      fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder,
                      fontSize: 12
                    }}>DATE OF BIRTH</Text>
                    <TouchableOpacity style={{
                      // marginTop: 15, 
                      borderBottomWidth: 1.5,
                      borderBottomColor: Colors.newGrayFontColor,
                    }} onPress={() => {
                      this.setState({ isDatePickerVisible: true })
                    }}>
                      <Text style={{
                        fontFamily: Fonts.Bold,
                        paddingVertical: 10, color: dob === 'SELECT DATE' ? Colors.borderColor : Colors.light, fontSize: 16
                      }}>{dob === 'SELECT DATE' ? dob : moment(dob, 'MM/DD/YYYY').format("DD/MM/YYYY")}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: wide * 0.1, width: '90%', alignSelf: 'center', }}>
                    {/* {this.state.num !== null && this.state.num.length > 0 ? */}
                    <EditAnimatedInput
                      placeholder="PHONE NUMBER"
                      //valid={() => isValidEmail(email)}
                      // errorText="Error"
                      onChangeText={(e) => this.setTextofFields('num', e)}
                      value={this.state.num}
                      styleInput={{
                        fontFamily: Fonts.Bold, color: Colors.light,
                        fontSize: 14, lineHeight: 18
                      }}
                      isAutoFocus={this.state.num !== null && this.state.num.length > 0 ? false : true}
                      styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                      styleBodyContent={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: Colors.newGrayFontColor,
                      }}
                      keyboardType={'number-pad'}
                    />
                    {/* :
                                                <AnimatedInput
                                                    placeholder="PHONE NUMBER"
                                                    //valid={() => isValidEmail(email)}
                                                    // errorText="Error"
                                                    onChangeText={(e) => this.setTextofFields('num', e)}
                                                    value={this.state.num}
                                                    styleInput={{
                                                        fontFamily: Fonts.Bold, color: Colors.light,
                                                        fontSize: 14, lineHeight: 18
                                                    }}
                                                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                                                    styleBodyContent={{
                                                        borderBottomWidth: 1.5,
                                                        borderBottomColor: Colors.newGrayFontColor,
                                                    }}
                                                    keyboardType={'number-pad'}
                                                />
                                            } */}
                  </View>
                  <View style={{
                    marginTop: wide * 0.1, width: '90%', alignSelf: 'center',
                  }}>
                    <AnimatedInput
                      disabled
                      placeholder="EMAIL ID"
                      //valid={() => isValidEmail(email)}
                      // errorText="Error"
                      // onChangeText={(e) => this.setTextofEmailAndPass('email', e)}
                      value={this.state.email}
                      styleInput={{
                        fontFamily: Fonts.Bold, color: Colors.light,
                        fontSize: 16, lineHeight: 18
                      }}
                      styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                      styleBodyContent={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: Colors.newGrayFontColor,
                        // width: wide * 0.8
                      }}
                      keyboardType={'email-address'}

                    />
                  </View>

                  {/* <Text style={{
                                        color: Colors.light, fontSize: 24, lineHeight: 26,
                                        fontFamily: Fonts.Bold, marginTop: wide * 0.06
                                    }}>
                                        Password
                                    </Text> */}
                  {!UserModel.isSocialLogin ?
                    <>
                      {!isResetPassword ?
                        <View style={{
                          width: '90%', height: 20,
                          alignSelf: 'center',
                          marginTop: wide * 0.04,
                        }}>
                          <TouchableOpacity style={{
                            width: '40%', height: 20,
                          }}
                            activeOpacity={1}
                            onPress={() => this.setState({ isResetPassword: !isResetPassword })}
                          >
                            <Text style={{
                              color: Colors.btnBg, fontSize: 12, lineHeight: 16,
                              fontFamily: Fonts.Bold,
                            }}>
                              RESET PASSWORD
                            </Text>
                          </TouchableOpacity>

                        </View>
                        : null
                      }
                    </>
                    : null
                  }
                  {isResetPassword ?
                    <View style={{ marginTop: wide * 0.1, width: '90%', alignSelf: 'center', }}>
                      {/* {password !== null && password.length > 0 ? */}
                      <EditAnimatedInput
                        placeholder="OLD PASSWORD"
                        //valid={() => isValidEmail(email)}
                        // errorText="Error"
                        onChangeText={(e) =>
                          this.setState({ password: e }, () => {
                            if (UserModel.password == e) {
                              this.setState({ isOldPassCorrect: true })
                            } else {
                              this.setState({ isOldPassCorrect: false })
                            }
                          })
                        }
                        isAutoFocus={password !== null && password.length > 0 ? false : true}
                        value={password}
                        styleInput={{ fontFamily: Fonts.Bold, color: Colors.light, fontSize: 14, lineHeight: 18 }}
                        styleLabel={{ fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder }}
                        styleBodyContent={{
                          borderBottomWidth: 1.5,
                          borderBottomColor: Colors.newGrayFontColor,
                          // width: wide * 0.8
                        }}
                        secureTextEntry={true}
                      />

                    </View>
                    : null
                  }
                  {isOldPassCorrect ?
                    <View style={{
                      // flexDirection: 'row', 
                      justifyContent: 'space-between', marginTop: wide * 0.1,
                      width: '90%', alignSelf: 'center'
                    }}>
                      {/* {nPass !== null && nPass.length > 0 ? */}
                      <EditAnimatedInput

                        placeholder="NEW PASSWORD"
                        onChangeText={(e) => this.setState({ nPass: e })}
                        value={nPass}
                        styleInput={{
                          fontFamily: Fonts.Bold,
                          color: Colors.light,
                          fontSize: 14, lineHeight: 18
                        }}
                        isAutoFocus={nPass !== null && nPass.length > 0 ? false : true}
                        styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                        styleBodyContent={{
                          borderBottomWidth: 1.5,
                          borderBottomColor: Colors.borderColor,
                          // width: wide * 0.4
                        }}
                        secureTextEntry={true}

                      />

                      {/* {cPass !== null && cPass.length > 0 ? */}
                      <View style={{ marginTop: wide * 0.1 }}>
                        <EditAnimatedInput
                          placeholder="CONFIRM PASSWORD"
                          onChangeText={(e) => this.setState({ cPass: e })}
                          value={cPass}
                          styleInput={{
                            fontFamily: Fonts.Bold,
                            color: Colors.light,
                            fontSize: 14, lineHeight: 18
                          }}
                          isAutoFocus={cPass !== null && cPass.length > 0 ? false : true}
                          styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                          styleBodyContent={{
                            borderBottomWidth: 1.5,
                            borderBottomColor: Colors.borderColor,
                            // width: wide * 0.4
                          }}
                          secureTextEntry={true}

                        // multiline
                        />
                      </View>

                    </View>
                    : null
                  }


                </ScrollView>
                : selectedTabIndex == 2 ?
                  <View style={{
                    alignItems: 'center',
                    marginTop: wide * 0.1,
                    // backgroundColor: 'red',
                  }}>
                    <View style={{ width: '90%', alignItems: 'center', alignSelf: 'center' }}>

                      <TouchableOpacity onPress={() => this.pickIdSingle(true, false, 'ava')}>
                        {
                          this.state.idProofUrl == '' || this.state.idProofUrl == null
                            ?

                            <Image source={require('../../Images/Placeholder_PhotoId.png')}
                              resizeMode='cover'
                              style={{ tintColor: Colors.photIdRactangle }}
                            />

                            :

                            <View style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingVertical: 10
                            }}>
                              <FastImage style={{
                                height: wide * 0.3, width: wide * 0.46,
                                borderRadius: 5
                              }}
                                source={{ uri: this.state.idProofUrl }}
                                resizeMode='cover'
                              />

                              <Image source={require('../../Images/placeHolder_photoid_border.png')}
                                style={{ position: 'absolute', tintColor: Colors.photIdRactangle }} />
                            </View>

                        }
                        {this.state.idProofUrl == '' || this.state.idProofUrl == null ?
                          <Text style={{
                            paddingTop: 10,
                            color: Colors.greyTxtColor, fontSize: 12,
                            fontFamily: Fonts.Regular, lineHeight: 16, width: wide * 0.5,
                            textAlign: 'center', alignSelf: 'center',
                          }}>
                            For profile verification, try not to skip the process

                          </Text>
                          :

                          <View style={{
                            flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center', marginTop: wide * 0.015,
                          }}>
                            {this.state.isIdApproved == null ?
                              <Image source={require('../../Images/info_icon.png')}
                                style={{
                                  width: 15, height: 15,
                                  tintColor: Colors.photIdRactangle
                                }} />
                              : <></>
                            }
                            {this.state.isIdApproved == null ?

                              <Text style={{
                                marginTop: 16,
                                color: Colors.photIdRactangle, fontSize: 12,
                                fontFamily: Fonts.Regular, lineHeight: 16, width: wide * 0.5,
                                textAlign: 'center', marginHorizontal: wide * 0.01
                              }}>
                                Your document is under verification, We will notify once verified.
                              </Text>
                              :
                              this.state.isIdApproved == false ?
                                <View>
                                  <Text style={{
                                    marginTop: 16,
                                    color: Colors.photIdRactangle, fontSize: 12,
                                    fontFamily: Fonts.Regular, lineHeight: 14,
                                    width: wide * 0.52,
                                    textAlign: 'center', marginHorizontal: wide * 0.01
                                  }}>
                                    Your document is rejeted. Please upload right documents.
                                  </Text>
                                  <TouchableOpacity activeOpacity={1}
                                    onPress={() => this.pickIdSingle(true, false, 'ava')}>
                                    <Text style={{
                                      color: Colors.btnBg, fontSize: 12,
                                      fontFamily: Fonts.Regular, lineHeight: 16,
                                      width: wide * 0.52,
                                      textAlign: 'center',
                                    }}> Upload New Documents</Text>
                                  </TouchableOpacity>
                                </View>
                                :
                                <></>
                            }

                          </View>




                        }
                      </TouchableOpacity>
                      <View style={{ position: 'absolute', top: wide * 0.18, bottom: wide * 0.18, left: wide * 0.04, alignItems: 'center', justifyContent: 'center' }}>

                        {this.state.idProofUrl === '' || this.state.idProofUrl === null ?
                          <Image style={{
                            width: 40, height: 40

                          }}
                            source={require('../../Images/new_uncheck_icon.png')}
                          />
                          :
                          this.state.isIdApproved == null ?
                            <Image style={{
                              width: 40, height: 40

                            }} source={require('../../Images/tick_selected.png')}
                            />
                            :
                            this.state.isIdApproved == true ?
                              <Image style={{
                                width: 40, height: 40

                              }} source={require('../../Images/tick_selected.png')}
                              />
                              :
                              <Image style={{
                                width: 40, height: 40

                              }} source={require('../../Images/doc_reject_icon.png')}
                              />
                        }


                        {this.state.userData?.typeOfUser == 'COACH' ?
                          <Image style={{
                            flex: 1,
                            tintColor: Colors.photIdRactangle

                          }} source={require('../../Images/seperator_dash.png')}
                            resizeMode='stretch'
                          />
                          : null
                        }
                        {this.state.userData?.typeOfUser == 'COACH' ?
                          this.state.certificateIdUrl === '' || this.state.certificateIdUrl === null ?
                            <Image style={{
                              width: 40, height: 40

                            }}
                              source={require('../../Images/new_uncheck_icon.png')}
                            />
                            :
                            this.state.isCoachCertiApproved == null ?
                              <Image style={{
                                width: 40, height: 40

                              }}
                                source={require('../../Images/tick_selected.png')}
                              />
                              :
                              this.state.isCoachCertiApproved == true ?

                                <Image style={{
                                  width: 40, height: 40

                                }}
                                  source={require('../../Images/tick_selected.png')}
                                />
                                :
                                <Image style={{
                                  width: 40, height: 40
                                }}
                                  source={require('../../Images/doc_reject_icon.png')}
                                />

                          : null
                        }
                      </View>
                      {this.state.userData?.typeOfUser == 'COACH' ?
                        <TouchableOpacity style={{ marginTop: wide * 0.1 }} onPress={() => this.pickIdSingle(true, false, 'certi')}>
                          {
                            this.state.certificateIdUrl == '' || this.state.certificateIdUrl == null
                              ?

                              <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Image source={require('../../Images/CochingCerti.png')}
                                  resizeMode='cover'
                                  style={{ tintColor: Colors.photIdRactangle }}
                                />
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
                                <FastImage style={{
                                  height: wide * 0.3, width: wide * 0.46,
                                  borderRadius: 5
                                }}
                                  source={{ uri: this.state.certificateIdUrl }}
                                  resizeMode='cover'
                                />

                                <Image source={require('../../Images/placeHolder_photoid_border.png')}
                                  style={{ position: 'absolute', tintColor: Colors.photIdRactangle }} />
                              </View>

                          }
                          {this.state.certificateIdUrl == '' || this.state.certificateIdUrl == undefined ?
                            <></>
                            :

                            <View style={{
                              flexDirection: 'row', alignItems: 'center',
                              justifyContent: 'center', marginTop: wide * 0.015,
                            }}>
                              {this.state.isCoachCertiApproved == null ?
                                <Image source={require('../../Images/info_icon.png')}
                                  style={{
                                    width: 15, height: 15,
                                    tintColor: Colors.photIdRactangle
                                  }} />
                                : <></>
                              }
                              {this.state.isCoachCertiApproved == null ?
                                <Text style={{
                                  marginTop: 16,
                                  color: Colors.photIdRactangle, fontSize: 12,
                                  fontFamily: Fonts.Regular, lineHeight: 16, width: wide * 0.5,
                                  textAlign: 'center', marginHorizontal: wide * 0.01
                                }}>
                                  Your document is under verification, We will notify once verified.
                                </Text>
                                :
                                this.state.isPlayerIdApproved == false ?
                                  <View>
                                    <Text style={{
                                      marginTop: 16,
                                      color: Colors.photIdRactangle, fontSize: 12,
                                      fontFamily: Fonts.Regular, lineHeight: 14,
                                      width: wide * 0.52,
                                      textAlign: 'center', marginHorizontal: wide * 0.01
                                    }}>
                                      Your document is rejeted. Please upload right documents.
                                    </Text>
                                    <TouchableOpacity activeOpacity={1}
                                      onPress={() => this.pickIdSingle(true, false, 'certi')}
                                    >
                                      <Text style={{
                                        color: Colors.btnBg, fontSize: 12,
                                        fontFamily: Fonts.Regular, lineHeight: 16,
                                        width: wide * 0.52,
                                        textAlign: 'center',
                                      }}> Upload New Documents</Text>
                                    </TouchableOpacity>
                                  </View>
                                  :
                                  <></>
                              }

                            </View>

                          }

                        </TouchableOpacity>
                        : null
                      }
                    </View>

                  </View>
                  :
                  <View style={{
                    alignItems: 'center',
                    marginTop: wide * 0.1,
                  }}>

                    {UserModel?.selectedUserType == "coach" ?
                      <View style={{ width: '90%' }}>
                        <CoachOtherInfo
                          isHighSchool={this.state.isHighSchool}
                          selected_coachingType={this.state.selected_coachingType}
                          ageGroup={this.state.ageGroup}
                          coachTeam={this.state.coachTeam}
                          city={this.state.city}
                          selected_state={this.state.selected_state}
                          stateList={this.state.stateList}
                          cityList={this.state.cityList}
                          onStateSearch={(txt) => this.handleStateSrch(txt)}
                          onCitySearch={(txt) => this.handleCitySrch(txt)}
                          onRadaioButtonPress={(val) => this.setState({
                            isHighSchool: val,
                            coachTeam: "", coachingType: '', selected_state: '',
                            city: '', ageGroup: '', selected_coachingType: '',
                            coachingType: ''
                          })}
                          onAgeGroupSelect={(ag) => this.setState({ ageGroup: ag })}
                          onCoachingTypeSelect={(coachingTyp, selected_typ) => this.setState({
                            coachingType: coachingTyp,
                            selected_coachingType: selected_typ
                          })}
                          onStateSelect={(st) => this.setState({
                            selected_state: st,
                          }, () => this.getCityData(st))}
                          onCitySelect={(ct) => this.setState({
                            city: ct,
                          })}
                          onCoachTeamTextChange={(txt) => this.setState({ coachTeam: txt })}

                        />



                      </View>
                      :
                      <ScrollView showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{
                          paddingBottom: isNotch ? 0 : 10,
                          alignItems: 'center'
                        }}
                        style={{ width: '100%' }}
                      >
                        <View style={{ width: '90%' }}>
                          <PlayerOtherInfo
                            isGirl={this.state.isGirl}
                            classof={this.state.classof}
                            school={this.state.school}
                            city={this.state.city}
                            selected_state={this.state.selected_state}
                            selected_height={this.state.selected_height}
                            weight={this.state.weight}
                            onRadaioButtonPress={(val) => this.setState({
                              isGirl: val,
                              classof: "", school: '', selected_state: '', city: '',
                            })}
                            onHeightChange={(txt) => this.setState({
                              selected_height: txt,
                            })}
                            onWeightChange={(txt) => this.setState({
                              weight: txt,
                            })}
                          />
                        </View>
                      </ScrollView>
                    }

                  </View>
              }


            </KeyboardAvoidingView>
            <TouchableOpacity
              key={isbtnEnable}
              style={{
                width: wide * 0.8, height: 48,
                backgroundColor: Colors.btnBg,
                alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable === false ? 0.3 : 1.0,
                justifyContent: 'center', marginTop: wide * 0.04, marginBottom: wide * 0.05
              }} onPress={() => {
                if (isbtnEnable) {
                  this.editProfileData()
                }
              }}
              activeOpacity={1}
            >
              <Text style={{
                alignSelf: 'center', color: Colors.light,
                fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
              }}>Save</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              // date={moment(dob, "DD/MM/YY").toDate()}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                if (this.calculate_age(moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")) <= 16) {
                  UserModel.isAdult = false

                } else {
                  UserModel.isAdult = true
                }
                this.setTextofFields('dob', date.toString())
              }}
              onCancel={() => this.setState({ isDatePickerVisible: false })}
              maximumDate={moment.now()}
            />
          </>
          {/* } */}
        </SafeAreaView>
      </View>
    );
  }
}


function mapStateToProps(state) {
  const { entities } = state;
  return {
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(EditProfile);
