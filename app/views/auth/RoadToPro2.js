import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, ScrollView, TextInput, Platform } from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { onBoardAPI } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';

import { characterLimit, UserModel } from '../../constants/constant';

import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { getObject, setObject } from '../../middleware';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown';

const years = ["2019", "2020", "2021", "2022"]

let wide = Layout.width;
class TellUsMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fname: UserModel.fname !== undefined ? UserModel.fname : '',
            lname: UserModel.lname !== undefined ? UserModel.lname : '',
            email: UserModel.email !== undefined ? UserModel.email : '',
            city: UserModel.city !== undefined ? UserModel.city : '',
            state: UserModel.state !== undefined ? UserModel.state : '',
            school: UserModel.school !== undefined ? UserModel.school : '',
            classof: UserModel.classof !== undefined ? UserModel.classof : '',
            dob: UserModel.dob !== undefined ? UserModel.dob : 'SELECT DATE',
            aboutMe: UserModel.aboutMe !== undefined ? UserModel.aboutMe : '',
            isbtnEnable: UserModel.fname !== undefined && UserModel.lname !== undefined &&
                UserModel.dob !== undefined && UserModel.aboutMe !== undefined ? true : true,
            strSelectedMode: UserModel.selectedUserType !== undefined ? UserModel.selectedUserType : 'player',
            strSelectedPosition: UserModel.selectedSportPosition !== undefined ? UserModel.selectedSportPosition : 'defender',
            isDatePickerVisible: false
        };
        this.inputs = {};
    }
    componentDidMount() {
        // getObject('UserId').then((obj) => {
        //     console.log(obj)
        // })
    }
    checkForButtonEnable = (key) => {
        const { fname,
            lname,
            dob,
            email,
            aboutMe, strSelectedMode, strSelectedPosition, city, state, school, classof } = this.state;


        if (strSelectedMode === 'coach') {
            if (key === 'aboutMe') {
                if (aboutMe.length < 60) {
                    this.setState({ isbtnEnable: false })
                    return
                }

                if (aboutMe.trim() !== '' && fname.trim() !== '' && lname.trim() !== '') {
                    this.setState({ isbtnEnable: true });
                    return
                }
                else {
                    this.setState({ isbtnEnable: false });
                    return
                }
            }
        }

        if (strSelectedMode === 'player') {
            if (fname.trim() !== '' && lname.trim() !== '' && email.trim() !== '' && city.trim() !== '' && state.trim() !== '' && school.trim() !== '' && classof.trim() !== '') {
                this.setState({ isbtnEnable: true });
                return;
            }
            else {
                this.setState({ isbtnEnable: false });
                return
            }
        }


        // if (strSelectedMode === 'coach' && aboutMe.trim() === '') {
        //     this.setState({ isbtnEnable: false })
        //     return
        // }

        // if (fname.trim() && lname.trim()) {
        //     if (strSelectedMode === 'player') {
        //         if (dob !== 'SELECT DATE') {
        //             this.setState({ isbtnEnable: true })
        //         } else {
        //             this.setState({ isbtnEnable: false })
        //         }
        //     } else {
        //         this.setState({ isbtnEnable: true })
        //     }
        //     //this.setState({ isbtnEnable: true })
        // } else {
        //     this.setState({ isbtnEnable: false })
        // }
    }
    setTextofFields = (frm, txt) => {



        switch (frm) {
            case 'fname':
                this.setState({ fname: txt }, () => {
                    this.checkForButtonEnable(frm)
                })
                break;
            case 'lname':
                this.setState({ lname: txt }, () => {
                    this.checkForButtonEnable(frm)
                })
                break;

            case 'email':
                this.setState({ email: txt }, () => {
                    this.checkForButtonEnable(frm)
                })
                break;

            case 'city':
                this.setState({ city: txt }, () => {
                    this.checkForButtonEnable(frm)
                })
                break;

            case 'state':
                this.setState({ state: txt }, () => {
                    this.checkForButtonEnable(frm)
                })
                break;

            case 'school':
                this.setState({ school: txt }, () => {
                    this.checkForButtonEnable(frm)
                })
                break;


            case 'dob':
                this.setState({ isDatePickerVisible: false, dob: txt }, () => {
                    this.checkForButtonEnable(frm)
                })
                break;
            case 'aboutMe':
                this.setState({ aboutMe: txt }, () => {
                    this.checkForButtonEnable(frm)
                })
                break;
            default:
                break;
        }
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
    actionContinue = () => {
        const { fname,
            lname,
            dob,
            email,
            city,
            state,
            school,
            strSelectedPosition,
            classof,
            aboutMe, strSelectedMode, isbtnEnable } = this.state;
        if (isbtnEnable) {

            if (
                UserModel.fname !== fname ||
                UserModel.lname !== lname ||
                // UserModel.dob !== dob ||
                UserModel.aboutMe !== aboutMe ||
                UserModel.selectedUserType !== strSelectedMode ||
                UserModel.email !== email ||
                UserModel.city !== city ||
                UserModel.state !== state ||
                UserModel.school !== school ||
                UserModel.selectedSportPosition !== strSelectedPosition ||
                UserModel.classof !== classof
            ) {
                this.onBoardInfo()
            } else {
                Navigation.navigate('UploadPhoto')
            }
        }
    }
    onBoardInfo = () => {
        const { fname,
            lname,
            email,
            city,
            state,
            school,
            classof,
            strSelectedPosition,
            // dob,
            aboutMe,
            strSelectedMode } = this.state;
        getObject('UserId').then((obj) => {

            let params = {
                "typeOfUser": strSelectedMode.toUpperCase(),
                "firstName": fname,
                "lastName": lname,
                "aboutMe": aboutMe,
                "email": email,
                "city": city,
                "state": state,
                "school": school,
                "classOf": classof,
                "sportPosition": strSelectedPosition,
                // "dateOfBirth": moment(dob).format('DD/MM/YY').toString(),
                "roleList": [
                    `ROLE_${strSelectedMode.toUpperCase()}`
                ],
                "parentApprovalRequired": !UserModel.isAdult
            }

            this.setState({ loading: true }, () => {
                this.props.dispatch(onBoardAPI(obj, params, (res, resData) => {
                    debugger

                    if (res) {
                        let onBoardData = {
                            selectedUserType: strSelectedMode,
                            isAdult: UserModel.isAdult,
                            parentNameOrNum: UserModel.parentNameOrNum,
                            email: UserModel.email,
                            password: UserModel.password,
                            fname: fname,
                            lname: lname,
                            city: city,
                            state: state,
                            school: school,
                            classof: classof,
                            selectedSportPosition: strSelectedPosition,
                            // dob: dob,
                            aboutMe: aboutMe,
                            profileUrl: UserModel.profileUrl,
                            photoIdUrl: UserModel.photoIdUrl,
                            isVerfied: UserModel.isVerfied,
                            coachCertiUrl: UserModel.coachCertiUrl,
                            fid: UserModel.fid,
                            isSocialLogin: UserModel.isSocialLogin,
                            isProfileUploaded: UserModel.isProfileUploaded
                        }
                        UserModel.fname = fname
                        UserModel.lname = lname
                        // UserModel.dob = dob
                        UserModel.email = email
                        UserModel.city = city
                        UserModel.state = state
                        UserModel.school = school
                        UserModel.classof = classof
                        UserModel.selectedSportPosition = strSelectedPosition
                        UserModel.aboutMe = aboutMe
                        UserModel.selectedUserType = strSelectedMode

                        setObject('authData', onBoardData).then(() => {
                            this.setState({ loading: false })
                            Navigation.navigate('UploadPhoto')
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
        const { isbtnEnable, strSelectedMode, strSelectedPosition, fname,
            lname,
            classof,
            dob,
            state,
            city,
            school,
            email,
            aboutMe, isDatePickerVisible } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
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
                            Road To Pro
                        </Text>
                    </View>
                </View>
                {/* <KeyboardAvoidingView 
                // keyboardVerticalOffset={10}
                    style={{ flex: 1, marginTop: 16, }}
                    // behavior={Platform.OS === 'ios' ? "padding" : null}
                    // enabled
                > */}

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    // automaticallyAdjustContentInsets={true}
                    style={{ marginTop: wide * 0.03, marginBottom: wide * 0.01 }}
                    bounces={false}
                // keyboardShouldPersistTaps='always'
                // scrollEventThrottle={10}
                // extraHeight={120}
                // resetScrollToCoords={{ x: 0, y: 0 }}
                // scrollEnabled={Platform.OS == 'ios' ? false : true}
                // scrollToOverflowEnabled={true}
                // style={{ backgroundColor: 'red' }}

                >


                    <View style={{
                        flexDirection: "column"
                    }}>

                        <View style={{
                            // backgroundColor: "blue",
                            alignItems: "center",
                            borderBottomColor: Colors.grey,
                            borderBottomWidth: 1.5
                        }}>
                            <Image
                                source={require("../../Images/RoadToProVideo.png")}
                                resizeMode="contain"
                                style={{
                                    width: "100%",
                                    height: undefined,
                                    aspectRatio: 1
                                }}
                            />
                        </View>

                        <View
                            style={{
                                paddingHorizontal: 30
                            }}
                        >
                            <Text style={{
                                color: Colors.lightshade,
                                textAlign: "justify",
                                marginTop: 20
                            }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Text>


                            <TouchableOpacity
                                key={true}
                                style={{
                                    width: wide * 0.8, height: 48,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable === false ? 0.3 : 1.0,
                                    justifyContent: 'center', marginTop: 20,
                                }} onPress={() => {
                                    // this.actionContinue()
                                }}>
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.Bold,
                                }}>View Plans</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: Colors.light,
                                    textAlign: "center"
                                }}>
                                    Skip
                                </Text>
                            </TouchableOpacity>

                        </View>

                        {/* <Image
                            source={require('../../Images/RoadToProVideo.png')}
                        /> */}
                    </View>



                    {/* </ScrollView> */}

                </KeyboardAwareScrollView>
                {/* </KeyboardAvoidingView> */}




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


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontFamily: Fonts.Bold,
        borderRadius: 4,
        color: Colors.light,
        paddingRight: 0, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 0,
        fontFamily: Fonts.Bold,
        borderRadius: 8,
        color: Colors.light,
        paddingRight: 0, // to ensure the text is never behind the icon
    },
});


export default connect(mapStateToProps)(TellUsMore);

