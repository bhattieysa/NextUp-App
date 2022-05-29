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
import { showErrorAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';
import { NoInternet } from '../../utils/info';
import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import ImagePicker from 'react-native-image-crop-picker';
import { getObject, setObject } from '../../middleware';
import { requestOTPAPI } from '../../actions/auth';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';

let wide = Layout.width;
class ParentEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email_num: UserModel.parentNameOrNum !== undefined ? UserModel.parentNameOrNum : '',
            isbtnEnable: UserModel.parentNameOrNum !== undefined ? true : false
        };
    }
    setTextofEmailORMobNum = (txt) => {
        let valid = isValidEmail(txt);
        if (valid) {
            this.setState({ isbtnEnable: true, email_num: txt })
            return
        } else {
            let num = txt.replace(".", '');
            if (isNaN(num)) {

            } else {
                if (num.length > 9) {
                    this.setState({ isbtnEnable: true, email_num: txt })
                    return
                }

            }
        }
        this.setState({ isbtnEnable: false, email_num: txt.trim() })
    }
    actionContinue = () => {
        const { email_num } = this.state;
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(requestOTPAPI(obj, { "sourceInfo": email_num }, (res, resData) => {
                    debugger
                    if (res) {
                        // this.setState({ loading: false }, () => {
                        // setTimeout(() => {

                        Alert.alert(
                            "Alert",
                            resData,
                            [
                                {
                                    text: 'Ok', onPress: () => this.setState({ loading: false }, () => {
                                        this.requestOTP()
                                    })

                                },
                            ],
                            { cancelable: false }
                        );
                        // alert(resData)
                        // }, 500);
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
    requestOTP = () => {
        const { email_num } = this.state;

        if (UserModel.parentNameOrNum !== email_num) {
            let onBoardData = {
                selectedUserType: UserModel.selectedUserType,
                isAdult: UserModel.isAdult,
                parentNameOrNum: email_num,
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
            UserModel.parentNameOrNum = email_num

            setObject('authData', onBoardData).then(() => {


                Navigation.navigate('OTPValidate')



            })
        } else {


            Navigation.navigate('OTPValidate')



        }
    }
    render() {
        const { email_num, isbtnEnable } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <KeyBoardDismissHandler>
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
                            progress={0.5}
                            width={wide * 0.8}
                            borderColor={Colors.base}
                            unfilledColor={Colors.borderColor}
                            style={{ marginTop: 16 }}
                        />

                        {/* <Text style={{
                        marginTop: 16,
                        color: Colors.light, fontSize: 32,
                        fontFamily: Fonts., lineHeight: 36
                    }}>
                        One last
                    </Text>
                    <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold }}>
                        Step
                    </Text> */}
                        <View style={{ marginTop: wide * 0.15 }}>

                            <AnimatedInput

                                placeholder="PARENT’S EMAIL OR PHONE NUMBER"
                                //valid={() => isValidEmail(email)}
                                // errorText="Error"
                                onChangeText={(e) => this.setTextofEmailORMobNum(e)}
                                value={email_num}
                                styleInput={{
                                    fontFamily: Fonts.Bold, color: Colors.light,
                                    fontSize: Platform.OS === 'ios' ? 16 : 14, lineHeight: 18
                                }}
                                styleLabel={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor, }}
                                styleBodyContent={{
                                    borderBottomWidth: 1.5,
                                    borderBottomColor: Colors.borderColor, width: wide * 0.8
                                }}
                                keyboardType={'email-address'}
                            />
                        </View>

                    </View>
                    <TouchableOpacity
                        key={isbtnEnable}
                        style={{
                            width: wide * 0.8, height: 48,
                            backgroundColor: Colors.btnBg,
                            alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable == false ? 0.3 : 1.0,
                            justifyContent: 'center', bottom: 40
                        }} onPress={() => {

                            if (isbtnEnable) {
                                this.actionContinue()
                            }

                        }}>
                        <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Continue</Text>
                    </TouchableOpacity>

                    <AppLoader visible={this.state.loading} />
                </KeyBoardDismissHandler>
            </SafeAreaView >
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

export default connect(mapStateToProps)(ParentEmail);
