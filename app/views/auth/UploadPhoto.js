import React, { Component } from 'react';
import {
    View, Keyboard, TouchableOpacity, Text, SafeAreaView, Image, KeyboardAvoidingView, ImageBackground, Alert,
    Platform
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
import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import ImagePicker from 'react-native-image-crop-picker';
import { getObject, setObject } from '../../middleware';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';

let wide = Layout.width;
class UploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            avatar: UserModel.profileUrl ? UserModel.profileUrl : '',
        };
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
                                showAppPermissionAlert("Alert", "You have not granted permission for  photo library.")

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
                                this.setState({ avatar: image.path })
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
        const { avatar } = this.state;

        if (UserModel.isProfileUploaded !== true) {
            this.uploadImage()
        }
        else if (UserModel.profileUrl !== avatar) {

            this.uploadImage()

        } else {

            if (UserModel.selectedUserType.toLowerCase() === 'coach') {
                Navigation.navigate('AddPhotoIdCoach')
            } else if (UserModel.selectedUserType.toLowerCase() === 'player' && UserModel.isAdult == false) {
                Navigation.navigate('ParentEmail')
            } else {
                Navigation.navigate('AddPhotoId')
            }


        }

    }
    uploadImage = () => {
        const { avatar } = this.state;
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(uploadPhoto(avatar, obj, UserModel.selectedUserType, 'PROFILE_PICTURE', (res, uploadedUrl) => {
                    debugger
                    if (res) {

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
                            profileUrl: uploadedUrl,
                            photoIdUrl: UserModel.photoIdUrl,
                            isVerfied: UserModel.isVerfied,
                            coachCertiUrl: UserModel.coachCertiUrl,
                            fid: UserModel.fid,
                            isSocialLogin: UserModel.isSocialLogin,
                            isProfileUploaded: true
                        }
                        UserModel.profileUrl = uploadedUrl
                        UserModel.isProfileUploaded = true
                        setObject('authData', onBoardData).then(() => {

                            this.setState({ loading: false })
                            if (UserModel.selectedUserType === 'coach') {
                                Navigation.navigate('AddPhotoIdCoach')
                            } else if (UserModel.selectedUserType === 'player' && UserModel.isAdult == false) {
                                Navigation.navigate('ParentEmail')
                            } else {
                                Navigation.navigate('AddPhotoId')
                            }
                        })
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
        const { avatar } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 32, }} >
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
                            Upload photo
                        </Text>
                    </View>



                    <Progress.Bar
                        progress={UserModel.selectedUserType === 'player' && UserModel.isAdult == false ? 0.4 : 0.5}
                        width={wide * 0.8}
                        borderColor={Colors.base}
                        unfilledColor={Colors.borderColor}
                        style={{ marginTop: 16 }}
                    />

                    {/* <Text style={{
                        marginTop: 16,
                        color: Colors.light, fontSize: 32,
                        fontFamily: Fonts.Thin, lineHeight: 36
                    }}>
                        Upload
                    </Text>
                    <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold }}>
                        Photo
                    </Text> */}

                    <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.pickSingle(true, true)}>
                            {
                                avatar === ''
                                    ?

                                    <Image source={require('../../Images/placeHolderImage.png')} resizeMode='contain' style={{
                                        width: wide * 0.8
                                    }} />

                                    :

                                    <View style={{
                                        height: wide * 0.6, width: wide * 0.6,
                                        borderRadius: wide * 0.3, justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Image style={{
                                            height: wide * 0.6, width: wide * 0.6,
                                            borderRadius: wide * 0.3
                                        }} source={{ uri: avatar }} resizeMode='cover' />

                                        <Image source={require('../../Images/CameraIcon.png')}
                                            style={{ position: 'absolute', tintColor: Colors.shade }} />
                                    </View>

                            }

                        </TouchableOpacity>
                    </View>




                </View>
                <TouchableOpacity
                    key={avatar}
                    style={{
                        width: wide * 0.8, height: 48,
                        backgroundColor: Colors.btnBg,
                        alignSelf: 'center', borderRadius: 24, opacity: avatar === '' ? 0.3 : 1.0,
                        justifyContent: 'center', bottom: 20
                    }} onPress={() => {
                        if (avatar !== '') {
                            this.actionContinue()
                        }
                    }}>
                    <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (UserModel.selectedUserType.toLowerCase() === 'coach') {
                        Navigation.navigate('AddPhotoIdCoach')
                    } else if (UserModel.selectedUserType.toLowerCase() === 'player' && UserModel.isAdult == false) {
                        Navigation.navigate('ParentEmail')
                    } else {
                        Navigation.navigate('AddPhotoId')
                    }
                }}>
                    <Text style={{

                        color: Colors.light, fontSize: 12,
                        fontFamily: Fonts.Regular, lineHeight: 16, alignSelf: 'center', marginBottom: 30
                    }}>
                        Skip
                    </Text>
                </TouchableOpacity>
                <AppLoader visible={this.state.loading} />
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

export default connect(mapStateToProps)(UploadPhoto);
