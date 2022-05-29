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
                UserModel.dob !== undefined && UserModel.aboutMe !== undefined ? true : false,
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
                // "city": city,
                // "state": state,
                // "school": school,
                // "classOf": classof,
                // "sportPosition": strSelectedPosition,

                "schoolInfo": {
                    city: city,
                    state: state,
                    name: school,
                    classOff: classof,
                    typeOfPlayer: strSelectedPosition
                },

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
                            Tell us more
                        </Text>
                    </View>
                    <Progress.Bar
                        progress={0.3}
                        width={wide * 0.8}
                        borderColor={Colors.base}
                        unfilledColor={Colors.borderColor}
                        style={{ marginTop: 16 }}
                    />
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


                    {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                        paddingBottom: isNotch ? 0 : 10
                    }}> */}
                    <View style={{
                        backgroundColor: Colors.base,
                        marginHorizontal: 32,
                        marginTop: wide * 0.01
                    }} >


                        {/* <Text style={{
                            marginTop: 16,
                            color: Colors.light, fontSize: 32,
                            fontFamily: Fonts.Thin, lineHeight: 36
                        }}>
                            Tell us
                        </Text>
                        <Text style={{
                            color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold
                        }}>
                            more
                        </Text> */}
                        <View style={{
                            width: wide * 0.8,
                            height: wide * 0.4,
                            marginTop: wide * 0.04,
                            flexDirection: 'row',

                        }}>
                            <TouchableOpacity activeOpacity={1} style={{
                                width: wide * 0.24,
                                borderWidth: 3, borderRadius: 10,
                                borderColor: strSelectedMode === 'player' ? Colors.light : Colors.newGrayFontColor
                            }}
                                onPress={() => {

                                    this.setState({ strSelectedMode: 'player' }, () => {
                                        this.checkForButtonEnable()
                                    })

                                }
                                }
                            >
                                <Image resizeMode={'contain'} style={{
                                    alignSelf: 'center',
                                    marginTop: wide * 0.1,
                                    height: wide * 0.15, width: wide * 0.15,
                                    tintColor: strSelectedMode === 'player' ?
                                        Colors.light : Colors.newGrayFontColor
                                }} source={require('../../Images/player.png')} />
                                <Text style={{
                                    color: strSelectedMode === 'player' ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
                                    fontFamily: Fonts.Bold, fontSize: 16, marginTop: wide * 0.04
                                }}>PLAYER</Text>
                                {
                                    strSelectedMode === 'player' ?
                                        <Image style={{
                                            position: 'absolute',
                                            right: wide * 0.02,
                                            top: wide * 0.02,
                                            width: 20,
                                            height: 20

                                        }} source={require('../../Images/tick.png')} />
                                        :
                                        null
                                }

                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={{
                                width: wide * 0.24, borderWidth: 3, borderRadius: 10,
                                marginHorizontal: 15,
                                borderColor: strSelectedMode === 'coach' ? Colors.light : Colors.newGrayFontColor,
                            }}
                                onPress={() => {
                                    this.setState({ strSelectedMode: 'coach' }, () => {
                                        this.checkForButtonEnable()
                                    })

                                }
                                }
                            >
                                <Image resizeMode={'contain'} style={{
                                    alignSelf: 'center',
                                    marginTop: wide * 0.1, height: wide * 0.15, width: wide * 0.15,
                                    tintColor: strSelectedMode === 'coach' ? Colors.light : Colors.newGrayFontColor
                                }} source={require('../../Images/coach.png')} />
                                <Text style={{
                                    color: strSelectedMode === 'coach' ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
                                    fontFamily: Fonts.Bold, fontSize: 16, marginTop: wide * 0.04
                                }}>COACH</Text>
                                {
                                    strSelectedMode === 'coach' ?
                                        <Image style={{
                                            position: 'absolute',
                                            right: wide * 0.02,
                                            top: wide * 0.02,
                                            width: 20,
                                            height: 20

                                        }} source={require('../../Images/tick.png')} />
                                        :
                                        null
                                }
                            </TouchableOpacity>

                            {/* <TouchableOpacity activeOpacity={1} style={{
                                width: wide * 0.24,
                                borderWidth: 3, borderRadius: 10,
                                borderColor: strSelectedMode === 'trainer' ? Colors.light : Colors.borderColor
                            }}
                                onPress={() => {
                                    this.setState({ strSelectedMode: 'trainer' }, () => {
                                        this.checkForButtonEnable()
                                    })

                                }
                                }
                            >
                                <Image resizeMode={'contain'} style={{
                                    alignSelf: 'center',
                                    marginTop: wide * 0.1, height: wide * 0.15, width: wide * 0.15,
                                    tintColor: strSelectedMode === 'trainer' ? Colors.light : Colors.borderColor

                                }} source={require('../../Images/trainer.png')} />
                                <Text style={{
                                    color: strSelectedMode === 'trainer' ? Colors.light : Colors.borderColor, alignSelf: 'center',
                                    fontFamily: Fonts.Bold, fontSize: 15, marginTop: wide * 0.04
                                }}>TRAINER</Text>
                                {
                                    strSelectedMode === 'trainer' ?
                                        <Image style={{
                                            position: 'absolute',
                                            right: wide * 0.02,
                                            top: wide * 0.02,
                                            width: 20,
                                            height: 20

                                        }} source={require('../../Images/tick.png')} />
                                        :
                                        null
                                }
                            </TouchableOpacity> */}
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>

                            <AnimatedInput
                                placeholder="FIRST NAME"
                                onChangeText={(e) => this.setTextofFields('fname', e)}
                                value={fname}
                                styleInput={{
                                    fontFamily: Fonts.Bold,
                                    color: Colors.light,
                                    fontSize: 16, lineHeight: 18
                                }}
                                styleLabel={{
                                    fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                                    fontSize: 12,
                                }}
                                styleBodyContent={{
                                    borderBottomWidth: 1.5,
                                    borderBottomColor: Colors.borderColor,
                                    width: wide * 0.4
                                }}
                            />

                            <AnimatedInput

                                placeholder="LAST NAME"
                                onChangeText={(e) => this.setTextofFields('lname', e)}
                                value={lname}
                                styleInput={{
                                    fontFamily: Fonts.Bold,
                                    color: Colors.light,
                                    fontSize: 16, lineHeight: 18
                                }}
                                styleLabel={{
                                    fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                                    fontSize: 12,
                                }}
                                styleBodyContent={{
                                    borderBottomWidth: 1.5,
                                    borderBottomColor: Colors.borderColor,
                                    width: wide * 0.4
                                }}
                            />
                        </View>

                        {/* Email ID */}

                        {strSelectedMode === 'player' ? <View style={{ marginTop: 30 }}>
                            <AnimatedInput

                                placeholder="EMAIL ID"
                                onChangeText={(e) => this.setTextofFields('email', e)}
                                value={email}
                                styleInput={{
                                    fontFamily: Fonts.Bold,
                                    color: Colors.light,
                                    fontSize: 16, lineHeight: 18
                                }}
                                styleLabel={{
                                    fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                                    fontSize: 12,
                                }}
                                styleBodyContent={{
                                    borderBottomWidth: 1.5,
                                    borderBottomColor: Colors.borderColor,
                                    // width: wide * 0.4
                                }}
                            // isAutoFocus={true}
                            // multiline
                            />
                        </View>
                            :
                            null
                        }



                        {/* End Email ID */}


                        {/* City & State Field */}

                        {
                            strSelectedMode === 'player' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                <AnimatedInput
                                    placeholder="CITY"
                                    onChangeText={(e) => this.setTextofFields('city', e)}
                                    value={city}
                                    styleInput={{
                                        fontFamily: Fonts.Bold,
                                        color: Colors.light,
                                        fontSize: 16, lineHeight: 18
                                    }}
                                    styleLabel={{
                                        fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                                        fontSize: 12,
                                    }}
                                    styleBodyContent={{
                                        borderBottomWidth: 1.5,
                                        borderBottomColor: Colors.borderColor,
                                        width: wide * 0.4
                                    }}
                                // isAutoFocus={true}
                                />

                                <AnimatedInput

                                    placeholder="STATE"
                                    onChangeText={(e) => this.setTextofFields('state', e)}
                                    value={state}
                                    styleInput={{
                                        fontFamily: Fonts.Bold,
                                        color: Colors.light,
                                        fontSize: 16, lineHeight: 18
                                    }}
                                    styleLabel={{
                                        fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                                        fontSize: 12,
                                    }}
                                    styleBodyContent={{
                                        borderBottomWidth: 1.5,
                                        borderBottomColor: Colors.borderColor,
                                        width: wide * 0.4
                                    }}
                                // isAutoFocus={true}
                                // multiline
                                />
                            </View>
                                :
                                null
                        }

                        {/* End City & State Field */}


                        {/* School & Class of */}



                        {
                            strSelectedMode === 'player' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

                                <View>
                                    <AnimatedInput
                                        placeholder="SCHOOL"
                                        onChangeText={(e) => this.setTextofFields('school', e)}
                                        value={school}
                                        styleInput={{
                                            fontFamily: Fonts.Bold,
                                            color: Colors.light,
                                            fontSize: 16, lineHeight: 18
                                        }}
                                        styleLabel={{
                                            fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                                            fontSize: 12,
                                        }}
                                        styleBodyContent={{
                                            borderBottomWidth: 1.5,
                                            borderBottomColor: Colors.borderColor,
                                            width: wide * 0.4
                                        }}
                                    // isAutoFocus={true}
                                    />
                                </View>

                                {/* Add picker here */}

                                <View>

                                    {
                                        classof !== "" ? <Text style={{
                                            fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                                            fontSize: 12,
                                            position: "relative",
                                            top: -20
                                        }}>CLASS OF</Text> : null
                                    }




                                    <SelectDropdown
                                        data={years}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                            this.setState({
                                                classof: selectedItem
                                            }, () => {
                                                this.checkForButtonEnable('classof');
                                            })
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}

                                        buttonStyle={{
                                            backgroundColor: "transparent",
                                            borderBottomWidth: 1.5,
                                            borderBottomColor: Colors.borderColor,
                                            position: "relative",
                                            top: classof !== "" ? -23 : -7,
                                            width: wide * 0.4
                                        }}


                                        buttonTextStyle={
                                            classof !== "" ? {
                                                fontFamily: Fonts.Bold,
                                                color: Colors.light,
                                                fontSize: 16, lineHeight: 18,
                                                textAlign: "left",
                                                position: "relative",
                                                left: 15
                                            }
                                                :
                                                {
                                                    color: Colors.grey,
                                                    fontSize: 16,
                                                    textAlign: "left",
                                                    position: "relative",
                                                    left: 15
                                                }}
                                        defaultButtonText="CLASS OF"



                                    />
                                </View>


                            </View>
                                :
                                null
                        }






                        {
                            strSelectedMode === 'coach' ? <View style={{ marginTop: 27 }}>
                                <Text style={{
                                    fontFamily: Fonts.Bold,
                                    color: Colors.newGrayFontColor, fontSize: 12, position: 'absolute', left: 0,
                                }}>ABOUT ME</Text>
                                <Text style={{
                                    fontFamily: Fonts.Bold,
                                    color: Colors.light, fontSize: 12, position: 'absolute', right: 0
                                }}>{aboutMe.trim().length}/266</Text>

                                <TextInput
                                    //valid={() => isValidEmail(email)}
                                    // errorText="Error"
                                    onChangeText={(e) => this.setTextofFields('aboutMe', e)}
                                    value={aboutMe}
                                    style={{
                                        marginTop: 25,
                                        fontFamily: Fonts.Bold, color: Colors.light, fontSize: 16,
                                        lineHeight: 18, height: wide * 0.29,
                                        borderWidth: 1.5,
                                        borderColor: Colors.aboutTxtBorder,
                                        padding: 10,
                                        textAlignVertical: 'top',
                                    }}

                                    placeholder={'Minimum 60 character are required.'}
                                    placeholderTextColor={Colors.borderColor}
                                    multiline
                                    maxLength={266}
                                />
                            </View>
                                :
                                null
                        }


                        {/* End About me section  */}
                        {/* </KeyboardAvoidingView> */}



                        {/* Sport Position */}
                        {
                            strSelectedMode === 'player' ? <View style={{
                                width: wide * 0.8,
                                height: wide * 0.4,
                                marginTop: wide * 0.04,
                                flexDirection: 'row',
                            }}>

                                <ScrollView
                                    horizontal={true}
                                >
                                    <TouchableOpacity activeOpacity={1} style={{
                                        width: wide * 0.24,
                                        borderWidth: 3, borderRadius: 10,
                                        marginHorizontal: 10,
                                        borderColor: strSelectedPosition === 'defender' ? Colors.light : Colors.newGrayFontColor
                                    }}
                                        onPress={() => {

                                            this.setState({ strSelectedPosition: 'defender' }, () => {
                                                this.checkForButtonEnable()
                                            })

                                        }
                                        }
                                    >
                                        <Image resizeMode={'contain'} style={{
                                            alignSelf: 'center',
                                            marginTop: wide * 0.1,
                                            height: wide * 0.15, width: wide * 0.15,
                                            tintColor: strSelectedPosition === 'defender' ?
                                                Colors.light : Colors.newGrayFontColor
                                        }} source={require('../../Images/basketball.png')} />
                                        <Text style={{
                                            color: strSelectedPosition === 'defender' ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
                                            fontFamily: Fonts.Bold, fontSize: 16, marginTop: wide * 0.04
                                        }}>DEFENDER</Text>
                                        {
                                            strSelectedPosition === 'defender' ?
                                                <Image style={{
                                                    position: 'absolute',
                                                    right: wide * 0.02,
                                                    top: wide * 0.02,
                                                    width: 20,
                                                    height: 20

                                                }} source={require('../../Images/tick.png')} />
                                                :
                                                null
                                        }

                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={1} style={{
                                        width: wide * 0.24,
                                        borderWidth: 3, borderRadius: 10,
                                        marginHorizontal: 10,
                                        borderColor: strSelectedPosition === 'shooter' ? Colors.light : Colors.newGrayFontColor
                                    }}
                                        onPress={() => {

                                            this.setState({ strSelectedPosition: 'shooter' }, () => {
                                                this.checkForButtonEnable()
                                            })

                                        }
                                        }
                                    >
                                        <Image resizeMode={'contain'} style={{
                                            alignSelf: 'center',
                                            marginTop: wide * 0.1,
                                            height: wide * 0.15, width: wide * 0.15,
                                            tintColor: strSelectedPosition === 'shooter' ?
                                                Colors.light : Colors.newGrayFontColor
                                        }} source={require('../../Images/basketball.png')} />
                                        <Text style={{
                                            color: strSelectedPosition === 'shooter' ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
                                            fontFamily: Fonts.Bold, fontSize: 16, marginTop: wide * 0.04
                                        }}>SHOOTER</Text>
                                        {
                                            strSelectedPosition === 'shooter' ?
                                                <Image style={{
                                                    position: 'absolute',
                                                    right: wide * 0.02,
                                                    top: wide * 0.02,
                                                    width: 20,
                                                    height: 20

                                                }} source={require('../../Images/tick.png')} />
                                                :
                                                null
                                        }

                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={1} style={{
                                        width: wide * 0.24,
                                        borderWidth: 3, borderRadius: 10,
                                        marginHorizontal: 10,
                                        borderColor: strSelectedPosition === 'forward' ? Colors.light : Colors.newGrayFontColor
                                    }}
                                        onPress={() => {

                                            this.setState({ strSelectedPosition: 'forward' }, () => {
                                                this.checkForButtonEnable()
                                            })

                                        }
                                        }
                                    >
                                        <Image resizeMode={'contain'} style={{
                                            alignSelf: 'center',
                                            marginTop: wide * 0.1,
                                            height: wide * 0.15, width: wide * 0.15,
                                            tintColor: strSelectedPosition === 'forward' ?
                                                Colors.light : Colors.newGrayFontColor
                                        }} source={require('../../Images/basketball.png')} />
                                        <Text style={{
                                            color: strSelectedPosition === 'forward' ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
                                            fontFamily: Fonts.Bold, fontSize: 16, marginTop: wide * 0.04
                                        }}>FORWARD</Text>
                                        {
                                            strSelectedPosition === 'forward' ?
                                                <Image style={{
                                                    position: 'absolute',
                                                    right: wide * 0.02,
                                                    top: wide * 0.02,
                                                    width: 20,
                                                    height: 20

                                                }} source={require('../../Images/tick.png')} />
                                                :
                                                null
                                        }

                                    </TouchableOpacity>


                                    <TouchableOpacity activeOpacity={1} style={{
                                        width: wide * 0.24,
                                        borderWidth: 3, borderRadius: 10,
                                        marginHorizontal: 10,
                                        borderColor: strSelectedPosition === 'center' ? Colors.light : Colors.newGrayFontColor
                                    }}
                                        onPress={() => {

                                            this.setState({ strSelectedPosition: 'center' }, () => {
                                                this.checkForButtonEnable()
                                            })

                                        }
                                        }
                                    >
                                        <Image resizeMode={'contain'} style={{
                                            alignSelf: 'center',
                                            marginTop: wide * 0.1,
                                            height: wide * 0.15, width: wide * 0.15,
                                            tintColor: strSelectedPosition === 'center' ?
                                                Colors.light : Colors.newGrayFontColor
                                        }} source={require('../../Images/basketball.png')} />
                                        <Text style={{
                                            color: strSelectedPosition === 'center' ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
                                            fontFamily: Fonts.Bold, fontSize: 16, marginTop: wide * 0.04
                                        }}>CENTER</Text>
                                        {
                                            strSelectedPosition === 'center' ?
                                                <Image style={{
                                                    position: 'absolute',
                                                    right: wide * 0.02,
                                                    top: wide * 0.02,
                                                    width: 20,
                                                    height: 20

                                                }} source={require('../../Images/tick.png')} />
                                                :
                                                null
                                        }

                                    </TouchableOpacity>


                                </ScrollView>




                            </View>
                                :
                                null
                        }

                        {/* End Sport Position */}


                        <TouchableOpacity
                            key={isbtnEnable}
                            style={{
                                width: wide * 0.8, height: 48,
                                backgroundColor: Colors.btnBg,
                                alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable === false ? 0.3 : 1.0,
                                justifyContent: 'center', marginTop: 20,
                            }} onPress={() => {
                                this.actionContinue()
                            }}>
                            <Text style={{
                                alignSelf: 'center', color: Colors.light,
                                fontFamily: Fonts.Bold,
                            }}>Continue</Text>
                        </TouchableOpacity>

                    </View>
                    <AppLoader visible={this.state.loading} />
                    {/* </ScrollView> */}

                </KeyboardAwareScrollView>
                {/* </KeyboardAvoidingView> */}



                <DateTimePickerModal
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

