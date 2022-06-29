import React, { Component } from 'react';
import {
    View, TouchableOpacity, Alert, Text, SafeAreaView,
    Image, key, KeyboardAvoidingView, Keyboard, Platform
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
import { getSubscriptionInfoById, getUserInfo, updateUserInfo } from '../../actions/home';
import { Logout } from '../../actions/auth';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadPhoto } from '../../actions/auth';
import FastImage from 'react-native-fast-image';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import backend from '../../config/backend';
import { showErrorAlert, showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            updateLoading: false
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
                            })
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
                                userRole: 'ROLE_PLAYER',
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
            cPass, idProofUrl, certificateIdUrl, userRole, isOldPassCorrect } = this.state;
        console.log("DOBBBB", dob); //dobbbbb 03/23/1995
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

                        var obje = {
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
                                "password": password,
                                "roles": [
                                    userRole
                                ],
                                // "confirmPassword": nPass
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

                var obje = {
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
                        "password": UserModel.password,
                        "roles": [
                            userRole
                        ],
                        // "confirmPassword": nPass
                    }
                }
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

    render() {
        const { isbtnEnable, fname,
            lname,
            dob,
            isDatePickerVisible, avatar, password, nPass,
            cPass, loading, isResetPassword, selectedTabIndex, isOldPassCorrect } = this.state;
        // console.log("dobbbbb", moment(dob, 'MM/DD/YYYY').format("DD/MM/YYYY"));
        console.log("dobbbbb", dob);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
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
                        <TouchableOpacity style={{
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
                        </TouchableOpacity>

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
                            borderBottomWidth: selectedTabIndex == 1 ? 1 : null,
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
                            borderBottomWidth: selectedTabIndex == 2 ? 1 : null,
                            marginLeft: wide * 0.06
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
                    </View>

                    {/* <TouchableOpacity style={{ width: wide * 0.1 }} onPress={() => Navigation.back()}>
                                <Image style={{
                                    width: wide * 0.1, height: wide * 0.1,
                                    marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                                }} source={require('../../Images/back_ico.png')} />
                            </TouchableOpacity> */}

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
                                    width: '90%', alignSelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: wide * 0.05
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            width: wide * 0.25, height: wide * 0.36,
                                            borderRadius: wide * 0.03,
                                            borderWidth: 3,
                                            borderColor: Colors.newGrayFontColor,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => this.pickSingle(true, true)}
                                    >
                                        {avatar !== '' ?
                                            <FastImage style={{
                                                width: wide * 0.23, height: wide * 0.34,
                                                borderRadius: wide * 0.025,
                                            }}

                                                source={{ uri: avatar }}
                                            // resizeMode={'contain'}
                                            />
                                            :
                                            <></>

                                            // <Image style={{
                                            //     width: wide * 0.23, height: wide * 0.34,
                                            //     borderRadius: wide * 0.03,
                                            // }} resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />
                                        }
                                        <View style={{
                                            width: wide * 0.23, height: wide * 0.19,
                                            bottom: 0, position: 'absolute', alignItems: 'center'
                                        }}>
                                            <Image style={{
                                                width: '100%', height: '100%',
                                            }} resizeMode={'stretch'}
                                                source={require('../../Images/edit_profile_gradiant.png')}
                                            />
                                            <Image source={require('../../Images/camera_icon2.png')}
                                                resizeMode={'contain'}
                                                style={{ position: 'absolute', bottom: 10, width: 25, height: 25, tintColor: Colors.shade }} />
                                        </View>

                                    </TouchableOpacity>
                                    <View style={{
                                        justifyContent: 'space-between',
                                        marginRight: wide * 0.02,
                                        marginTop: wide * 0.04,
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
                                                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                                                    styleBodyContent={{
                                                        borderBottomWidth: 1.5,
                                                        borderBottomColor: Colors.newGrayFontColor,
                                                        width: wide * 0.55
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
                                                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                                                    styleBodyContent={{
                                                        borderBottomWidth: 1.5,
                                                        borderBottomColor: Colors.newGrayFontColor,
                                                        width: wide * 0.55
                                                    }}
                                                />
                                            }

                                        </View>
                                        <View style={{ marginTop: wide * 0.05 }}>
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
                                                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                                                    styleBodyContent={{
                                                        borderBottomWidth: 1.5,
                                                        borderBottomColor: Colors.newGrayFontColor,
                                                        width: wide * 0.55,
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
                                                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                                                    styleBodyContent={{
                                                        borderBottomWidth: 1.5,
                                                        borderBottomColor: Colors.newGrayFontColor,
                                                        width: wide * 0.55,
                                                    }}

                                                // multiline
                                                />
                                            }

                                        </View>

                                    </View>
                                </View>

                                {/* <Text style={{
                                        color: Colors.light, fontSize: 24, lineHeight: 26,
                                        fontFamily: Fonts.Bold, marginTop: wide * 0.08
                                    }}>
                                        Account
                                    </Text> */}


                                <View style={{
                                    marginTop: wide * 0.06, width: '90%',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
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
                                            styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                                            styleBodyContent={{
                                                borderBottomWidth: 1.5,
                                                borderBottomColor: Colors.newGrayFontColor,
                                                // width: wide * 0.8
                                            }}
                                            secureTextEntry={true}
                                        />
                                        {/* :
                                                    <AnimatedInput
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
                                                        value={password}
                                                        styleInput={{ fontFamily: Fonts.Bold, color: Colors.light, fontSize: 14, lineHeight: 18 }}
                                                        styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor }}
                                                        styleBodyContent={{
                                                            borderBottomWidth: 1.5,
                                                            borderBottomColor: Colors.newGrayFontColor,
                                                            // width: wide * 0.8
                                                        }}
                                                        secureTextEntry={true}
                                                    />
                                                } */}
                                        {/* <TouchableOpacity style={{
                                            // height: 20,
                                            position: 'absolute',
                                            right: 5, top: 10
                                        }}
                                            activeOpacity={1}
                                            onPress={() => this.setState({ isResetPassword: !isResetPassword })}
                                        >
                                            <Text style={{
                                                color: Colors.btnBg, fontSize: 12, lineHeight: 16,
                                                fontFamily: Fonts.Bold,
                                            }}>
                                                CREATE NEW
                                            </Text>
                                        </TouchableOpacity> */}
                                    </View>
                                    : null
                                }
                                {isOldPassCorrect ?
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', marginTop: wide * 0.1,
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
                                                width: wide * 0.4
                                            }}
                                            secureTextEntry={true}

                                        />
                                        {/* :
                                                    <AnimatedInput

                                                        placeholder="NEW PASSWORD"
                                                        onChangeText={(e) => this.setState({ nPass: e })}
                                                        value={nPass}
                                                        styleInput={{
                                                            fontFamily: Fonts.Bold,
                                                            color: Colors.light,
                                                            fontSize: 14, lineHeight: 18
                                                        }}
                                                        styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                                                        styleBodyContent={{
                                                            borderBottomWidth: 1.5,
                                                            borderBottomColor: Colors.borderColor,
                                                            width: wide * 0.4
                                                        }}
                                                        secureTextEntry={true}

                                                    />

                                                } */}
                                        {/* {cPass !== null && cPass.length > 0 ? */}
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
                                                width: wide * 0.4
                                            }}
                                            secureTextEntry={true}

                                        // multiline
                                        />
                                        {/* :
                                                    <AnimatedInput
                                                        placeholder="CONFIRM PASSWORD"
                                                        onChangeText={(e) => this.setState({ cPass: e })}
                                                        value={cPass}
                                                        styleInput={{
                                                            fontFamily: Fonts.Bold,
                                                            color: Colors.light,
                                                            fontSize: 14, lineHeight: 18
                                                        }}
                                                        styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                                                        styleBodyContent={{
                                                            borderBottomWidth: 1.5,
                                                            borderBottomColor: Colors.borderColor,
                                                            width: wide * 0.4
                                                        }}
                                                        secureTextEntry={true}

                                                    // multiline
                                                    />
                                                } */}
                                    </View>
                                    : null
                                }


                            </ScrollView>
                            :
                            <View style={{
                                alignItems: 'center', marginTop: wide * 0.1,
                            }}>
                                <TouchableOpacity onPress={() => this.pickIdSingle(true, false, 'ava')}>
                                    {
                                        this.state.idProofUrl == '' || this.state.idProofUrl == null
                                            ?

                                            <Image source={require('../../Images/Placeholder_PhotoId.png')} resizeMode='cover' />

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
                                                    style={{ position: 'absolute' }} />
                                            </View>

                                    }
                                    <Text style={{
                                        paddingTop: 10,
                                        color: Colors.newGrayFontColor, fontSize: 12,
                                        fontFamily: Fonts.Regular, lineHeight: 16, width: wide * 0.5,
                                        textAlign: 'center', alignSelf: 'center'
                                    }}>
                                        For profile verification, try not to skip the process

                                    </Text>
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: wide * 0.18, bottom: wide * 0.18, left: wide * 0.04, alignItems: 'center', justifyContent: 'center' }}>

                                    <Image style={{
                                        width: 40, height: 40

                                    }} source={this.state.idProofUrl === '' || this.state.idProofUrl === null ?
                                        require('../../Images/tick_unselected.png') : require('../../Images/tick_selected.png')}
                                    />

                                    {this.state.userData?.typeOfUser == 'COACH' ?
                                        <Image style={{
                                            flex: 1

                                        }} source={require('../../Images/seperator_dash.png')}
                                            resizeMode='stretch'
                                        />
                                        : null
                                    }
                                    {this.state.userData?.typeOfUser == 'COACH' ?
                                        <Image style={{
                                            width: 40, height: 40

                                        }}
                                            source={this.state.certificateIdUrl === '' || this.state.certificateIdUrl === null
                                                ? require('../../Images/tick_unselected.png') : require('../../Images/tick_selected.png')}
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
                                                    <Image source={require('../../Images/CochingCerti.png')} resizeMode='cover' />
                                                    <View style={{ position: 'absolute', alignItems: 'center', paddingVertical: 10 }}>
                                                        <Text style={{
                                                            color: Colors.borderColor, fontSize: 14,
                                                            fontFamily: Fonts.Bold, lineHeight: 18
                                                        }}>COACHING</Text>
                                                        <Text style={{
                                                            color: Colors.borderColor, fontSize: 14,
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
                                                        style={{ position: 'absolute' }} />
                                                </View>

                                        }

                                    </TouchableOpacity>
                                    : null
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
