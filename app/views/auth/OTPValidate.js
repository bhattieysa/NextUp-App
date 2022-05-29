
import React, { Component, } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Image, Platform } from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login, requestOTPAPI, verifyOtpAPI } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';
import { NoInternet } from '../../utils/info';
import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import ImagePicker from 'react-native-image-crop-picker';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { getObject, setObject } from '../../middleware';


let wide = Layout.width;




class OTPValidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email_num: '',
            isbtnEnable: false,
            isResendEnable: false,
            seconds: 30
            , otpValue: ''
        };

    }
    componentDidMount() {
        this.startTimer()
    }
    startTimer = () => {
        const { seconds } = this.state;
        if (seconds > 0) {
            setTimeout(() => {
                this.setSeconds(seconds - 1)
                this.startTimer()
            }, 1000);
        } else {
            this.setSeconds('');
            this.setState({ isResendEnable: true })
        }
    }
    setSeconds = (sec) => {
        this.setState({ seconds: sec })
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
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(verifyOtpAPI(obj, this.state.otpValue, (res, resData) => {
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
                            photoIdUrl: UserModel.photoIdUrl,
                            isVerfied: true,
                            coachCertiUrl: UserModel.coachCertiUrl,
                            fid: UserModel.fid,
                            isSocialLogin: UserModel.isSocialLogin,
                            isProfileUploaded: UserModel.isProfileUploaded
                        }
                        UserModel.isVerfied = true

                        setObject('authData', onBoardData).then(() => {
                            this.setState({ loading: false })
                            Navigation.navigate('AddPhotoId')

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
    requestOtp = () => {
        const { email_num } = this.state;
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(requestOTPAPI(obj, { "sourceInfo": email_num }, (res, resData) => {
                    debugger
                    if (res) {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                alert(resData)
                            }, 500);
                        })

                        this.requestOTP()
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
        const { isbtnEnable, isResendEnable, seconds } = this.state;

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
                                Verify otp
                            </Text>
                        </View>

                        <Progress.Bar
                            progress={0.7}
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
                        Verify

                    </Text>
                    <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold }}>
                        OTP
                    </Text> */}
                        <Text style={{
                            marginTop: 40,
                            color: Colors.newGrayFontColor, fontSize: 12,
                            fontFamily: Fonts.Bold, lineHeight: 16
                        }}>We have sent a 4 digit OTP to</Text>
                        <TouchableOpacity style={{
                            marginTop: 7,
                            flexDirection: 'row'
                        }} onPress={() => Navigation.back()}>
                            <Text style={{
                                color: Colors.light, fontSize: 16,
                                fontFamily: Fonts.Bold, lineHeight: 18
                            }}>{UserModel.parentNameOrNum}</Text>
                            <View>
                                <Image style={{

                                    width: wide * 0.04, height: wide * 0.04,
                                    left: 10
                                }} source={require('../../Images/edit.png')} />
                            </View>
                        </TouchableOpacity>

                        <OTPInputView
                            style={{ width: wide * 0.82, height: 120, alignSelf: 'center', marginTop: 58 }}
                            selectionColor={Colors.light}
                            pinCount={4}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            onCodeChanged={code => code.length > 3 ?
                                this.setState({ isbtnEnable: true, otpValue: code }) : this.setState({ isbtnEnable: false, otpValue: code })}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => {
                                //console.log(`Code is ${code}, you are good to go!`)
                                //this.setState({ isbtnEnable:true})
                            })}

                        />
                        <View style={{ marginHorizontal: 5, flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{


                                color: Colors.newGrayFontColor, fontSize: 10,
                                fontFamily: Fonts.Bold, lineHeight: 12
                            }}>Didn’t Receive OTP?</Text>
                            <View style={{ flex: 1 }}></View>
                            <Text style={{
                                color: Colors.light, fontSize: 10,
                                fontFamily: Fonts.Bold, lineHeight: 12
                            }}>
                                {seconds !== '' ? '00:' + ("0" + seconds).slice(-2) : ''}
                            </Text>
                            <Text
                                onPress={() => {
                                    if (isResendEnable) {
                                        this.setState({ seconds: 30, isResendEnable: false }, () => {
                                            this.startTimer()
                                            this.requestOtp()
                                        })
                                    }
                                }}
                                key={isResendEnable}
                                style={{
                                    left: 2,
                                    color: isResendEnable ? Colors.light : Colors.newGrayFontColor, fontSize: 10,
                                    fontFamily: Fonts.Bold, lineHeight: 12
                                }}>RESEND</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        key={isbtnEnable}
                        style={{
                            width: wide * 0.8, height: 48,
                            backgroundColor: Colors.btnBg,
                            alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable == false ? 0.3 : 1.0,
                            justifyContent: 'center', bottom: 50
                        }} onPress={() => {

                            if (isbtnEnable) {
                                this.actionContinue()
                            }

                        }}>
                        <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Continue</Text>
                    </TouchableOpacity>

                    <AppLoader visible={this.state.loading} />
                </KeyBoardDismissHandler>
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

export default connect(mapStateToProps)(OTPValidate);

const styles = StyleSheet.create({
    borderStyleBase: {
        // width: 69,
        // height: 70,

    },

    borderStyleHighLighted: {
        borderColor: Colors.light,

    },

    underlineStyleBase: {
        width: 69,
        height: Platform.OS === 'ios' ? 70 : 100,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
        fontFamily: Fonts.Bold,
        fontSize: 64,
        justifyContent: 'center',
        alignItems: 'center'
    },

    underlineStyleHighLighted: {
        borderColor: Colors.light,

    },
});