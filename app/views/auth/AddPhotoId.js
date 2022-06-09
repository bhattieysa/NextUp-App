import React, { Component } from 'react';
import {
    View, Keyboard, TouchableOpacity, Text, SafeAreaView, Image, KeyboardAvoidingView,
    ImageBackground, Alert, Platform
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
class AddPhotoId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            avatar: UserModel.photoIdUrl !== undefined ? UserModel.photoIdUrl : ''
        };
    }

    pickSingle(cropit, circular = false, mediaType) {
        Alert.alert(
            'PHOTO ID',
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

        if (UserModel.photoIdUrl !== avatar) {
            this.uploadImage()
        } else {
            if (UserModel.selectedUserType === 'player') {
                Navigation.navigate('Home')
                // Navigation.navigate('RoadToPro', { type: 'Player' })

            } else {
                Navigation.navigate('TrainerHome')
                // Navigation.navigate('RoadToPro', { type: 'Trainer' })
            }
        }

    }
    uploadImage = () => {
        const { avatar } = this.state;
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(uploadPhoto(avatar, obj, UserModel.selectedUserType, 'ID_PROOF', (res, uploadedUrl) => {
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
                            profileUrl: UserModel.profileUrl,
                            photoIdUrl: uploadedUrl,
                            isVerfied: UserModel.isVerfied,
                            coachCertiUrl: UserModel.coachCertiUrl,
                            fid: UserModel.fid,
                            isSocialLogin: UserModel.isSocialLogin,
                            isProfileUploaded: UserModel.isProfileUploaded
                        }
                        UserModel.photoIdUrl = uploadedUrl
                        setObject('authData', onBoardData).then(() => {

                            this.setState({ loading: false })
                            if (UserModel.selectedUserType === 'player') {
                                setTimeout(() => {
                                    Navigation.navigate('Home')
                                }, 500);

                            } else {
                                setTimeout(() => {
                                    Navigation.navigate('TrainerHome')
                                }, 500);

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
                            One last step
                        </Text>
                    </View>



                    <Progress.Bar
                        progress={0.8}
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
                        One last
                    </Text>
                    <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold }}>
                        Step
                    </Text> */}
                    <Text style={{
                        marginTop: 40,
                        color: Colors.light, fontSize: 12,
                        fontFamily: Fonts.Regular, lineHeight: 16
                    }}>
                        To get your profile verified, upload photo ID
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.pickSingle(true, false)}>
                            {
                                avatar === ''
                                    ?

                                    <Image source={require('../../Images/Placeholder_PhotoId.png')} resizeMode='cover' />

                                    :

                                    <View style={{

                                        justifyContent: 'center',
                                        alignItems: 'center', paddingVertical: 10
                                    }}>
                                        <Image style={{
                                            height: wide * 0.3, width: wide * 0.46,
                                            borderRadius: 5
                                        }} source={{ uri: avatar }} resizeMode='cover' />

                                        <Image source={require('../../Images/placeHolder_photoid_border.png')}
                                            style={{ position: 'absolute' }} />
                                    </View>

                            }

                        </TouchableOpacity>
                        <Text style={{
                            marginTop: 16,
                            color: Colors.newGrayFontColor, fontSize: 12,
                            fontFamily: Fonts.Regular, lineHeight: 16, width: wide * 0.5, textAlign: 'center'
                        }}>
                            For profile verification, try not to skip the process
                        </Text>
                    </View>




                </View>
                <TouchableOpacity
                    key={avatar}
                    style={{
                        width: wide * 0.8, height: 48,
                        backgroundColor: Colors.btnBg,
                        alignSelf: 'center', borderRadius: 24, opacity: avatar === '' ? 0.3 : 1.0,
                        justifyContent: 'center',
                    }} onPress={() => {
                        if (avatar !== '') {
                            this.actionContinue()
                            //Navigation.navigate('TellUsMore')
                        }
                    }}>
                    <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (UserModel.selectedUserType === 'player') {
                        Navigation.navigate('Home')
                    } else {
                        Navigation.navigate('TrainerHome')
                    }
                }}>
                    <Text style={{
                        marginTop: 12,
                        color: Colors.light, fontSize: 12,
                        fontFamily: Fonts.Medium, lineHeight: 16, alignSelf: 'center', marginBottom: 20
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

export default connect(mapStateToProps)(AddPhotoId);
