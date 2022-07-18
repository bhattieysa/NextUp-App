import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, ScrollView, TextInput, Platform, FlatList, ImageBackground } from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { onBoardAPI, onBoardPlayerPositionAPI } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
// import isValidEmail from '../../utils/isValidEmail';

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
// import SelectDropdown from 'react-native-select-dropdown';
import StatesListModal from './StatesListModal';
// import YearSelectionModal from './YearSelection'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import SwitchToggle from "react-native-switch-toggle";
// import DatePicker from 'react-native-modern-datepicker';

// const years = ["2019", "2020", "2021", "2022"]

let wide = Layout.width;
class TellUsMoreIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      classof: UserModel.classof !== undefined ? UserModel.classof : '',
      school: UserModel.school !== undefined ? UserModel.school : '',
      coachTeam: UserModel.coachTeam !== undefined ? UserModel.coachTeam : '',
      isGirl: UserModel.isGirl !== undefined ? UserModel.isGirl : false,
      isbtnEnable: true,
      strSelectedMode: UserModel.selectedUserType !== undefined ? UserModel.selectedUserType : 'player',
      selected_state: UserModel.state !== undefined ? UserModel.state : '',
      city: UserModel.city !== undefined ? UserModel.city : '',
    };
    this.inputs = {};
  }
  componentDidMount() {
    // this.props.dispatch(onBoardPlayerPositionAPI(data => this.setState({ ...this.state, positions: data[0].values })));
    console.log("Did mount called ");

    // this.props.navigation.addListener('didFocus', this.setTheState);

  }

  componentDidUpdate(prevProps) {
    console.log("Did focus called");
    if (prevProps !== this.props) {
      // if (this.props?.navigation?.state?.params?.state) {
      //     console.log("Did focus called state found, ", this.props.navigation?.state?.params?.state);

      //     this.setTextofFields('state', this.props.navigation?.state?.params?.state);

      // }

      if (this.props?.navigation?.state?.params?.year) {
        console.log("Did focus called year found");
        this.setState({
          classof: this.props.navigation.state.params.year
        })
      }

      if (this.props?.navigation?.state?.params?.school) {
        this.setState({
          school: this.props.navigation.state.params.school,
          selected_state: this.props.navigation.state.params.selected_state,
          city: this.props.navigation.state.params.city,
        })
      }

      if (this.props?.navigation?.state?.params?.team) {
        debugger
        this.setState({
          coachTeam: this.props.navigation.state.params.team,
          selected_state: this.props.navigation.state.params.selected_state,
          city: this.props.navigation.state.params.city,
        })
      }

    }
  }


  checkForButtonEnable = (key) => {
    const {
      isBoy,
      isGirl,
      strSelectedMode
    } = this.state;


    if (strSelectedMode === 'coach') {
      if (key === 'coachSelected') {
        this.setState({ isbtnEnable: true })
        return
      } else {
        this.setState({ isbtnEnable: false });
        return
      }
    }

    if (strSelectedMode === 'player') {
      if (isGirl !== '') {
        this.setState({ isbtnEnable: true });
        return;
      }
      else {
        this.setState({ isbtnEnable: false });
        return
      }
    }
  }

  setTextofFields = (frm, txt) => {
    switch (frm) {

      case 'school':
        this.setState({ school: txt })
        break;

      case 'class':
        this.setState({ classof: txt })
        break;

      default:
        break;
    }
  }

  actionContinue = () => {
    const { strSelectedMode, isGirl, classof, school, isbtnEnable, city, selected_state, coachTeam } = this.state;
    if (isbtnEnable) {
      // if (
      UserModel.selectedUserType = strSelectedMode
      UserModel.isGirl = isGirl
      UserModel.classof = classof
      UserModel.school = school.name
      UserModel.city = city
      UserModel.state = selected_state
      UserModel.coachTeam = coachTeam.name

      // ) {
      //   this.onBoardInfo()
      // } else {
      // let introData = {
      //   "isGirl": isGirl == true ? true : false,
      //   "classof": classof,
      //   "school": school,
      //   "selectedType": strSelectedMode
      // }
      Navigation.navigate('TellUsMore')
      // }
    }
  }

  onBoardInfo = () => {
    const {
      fname,
      lname,
      email,
      city,
      state,
      school,
      classof,
      strSelectedPosition,
      aboutMe,
      strSelectedMode,
      positions,
      pickerDate
    } = this.state;
    getObject('UserId').then((obj) => {

      let params = {
        "typeOfUser": strSelectedMode.toUpperCase(),
        "firstName": fname,
        "lastName": lname,
        "aboutMe": aboutMe,
        "email": email,
        "schoolInfo": {
          city: city,
          state: state,
          name: school,
          classOff: classof,
          typeOfPlayer: positions[strSelectedPosition]
        },
        "roleList": [
          `ROLE_${strSelectedMode.toUpperCase()}`
        ],
        "parentApprovalRequired": !UserModel.isAdult
      }

      console.log(params);

      this.setState({ loading: true }, () => {
        this.props.dispatch(onBoardAPI(obj, params, (res, resData) => {

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
              selectedSportPosition: positions[strSelectedPosition],
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
            UserModel.email = email
            UserModel.city = city
            UserModel.state = state
            UserModel.school = school
            UserModel.classof = pickerDate
            UserModel.selectedSportPosition = positions[strSelectedPosition]
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

  // openModal = () => {
  //   this.setState({
  //     ...this.state,
  //     openStatesModal: true
  //   });
  // }

  // onStateChoose = state => {
  //   this.setState({
  //     ...this.state,
  //     state,
  //     openStatesModal: false,
  //   });
  // }

  // onClose = () => {
  //   this.setState({
  //     ...this.state,
  //     openStatesModal: false
  //   });
  // }

  // onYearChoose = year => {
  //   this.setState({
  //     ...this.state,
  //     classof: year.toString(),
  //     showYearPicker: false,
  //   });
  // }

  // onYearClose = () => {
  //   this.setState({
  //     ...this.state,
  //     showYearPicker: false
  //   });
  // }

  // onValueChange = (date) => {
  //   const splitDate = date.split(' ')[0]
  //   this.setState({
  //     ...this.state,
  //     classof: splitDate,
  //   }, () => {
  //     this.checkForButtonEnable('classof');
  //   })
  // }

  // showPicker = () => {
  //   this.setState({
  //     ...this.state,
  //     showYearPicker: true
  //   })
  // }

  renderTopImage = (item, index) => {
    const { strSelectedMode } = this.state;
    return (
      <TouchableOpacity activeOpacity={1}
        style={{
          width: wide * 0.7,
          height: wide * 0.85,
          borderWidth: 2,
          borderRadius: wide * 0.06,
          marginRight: 12,
          borderColor: strSelectedMode === item ? Colors.light : Colors.newGrayFontColor
        }}
        onPress={() => {
          this.setState({ strSelectedMode: item }, () => {
            this.checkForButtonEnable(item)
          })
        }
        }
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: wide * 0.06,
          }} source={require('../../Images/onBoardPlayerImg.png')}
          resizeMode={'cover'}
        />

        <View style={{
          position: 'absolute',
          // right: wide * 0.02,
          top: wide * 0.03,
          width: '90%',
          alignSelf: 'center',
          height: 40,
          flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{
            color: strSelectedMode === item ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
            fontFamily: Fonts.Bold, fontSize: 16,
          }}>{item}</Text>

          {strSelectedMode == item ?
            <Image style={{
              right: wide * 0.03,
              width: 20,
              height: 20

            }} source={require('../../Images/tick.png')} />
            :
            <></>
          }
        </View>
      </TouchableOpacity>
    );
  }


  render() {
    const {
      isbtnEnable,
      strSelectedMode,
      classof,
      school,
      isGirl,
      coachTeam
    } = this.state;

    const navParams = this.props.navigation.state.params;

    // if (navParams && navParams.state) {
    //   console.log("navparams working");
    //   this.setTextofFields('state', navParams.state);
    // }

    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>

        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
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
            style={{ marginTop: wide * 0.03, marginBottom: wide * 0.01 }}
            bounces={false}

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

              <View style={{
                width: wide * 0.85,
                marginTop: wide * 0.04,
              }}>
                <SwiperFlatList
                  showPagination
                  paginationStyleItem={{ marginTop: wide * 0.09 }}
                  paginationActiveColor={Colors.btnBg}
                  paginationDefaultColor={Colors.fontGray}
                  data={["player", "Coach"]}
                  renderItem={({ item, index }) => this.renderTopImage(item, index)}
                />
              </View>

              {/*             
            <StatesListModal
              openModal={openStatesModal}
              onStateChoose={(e) => this.onStateChoose(e)}
              onClose={() => this.onClose()}
            /> */}
              {strSelectedMode === 'player' ?
                <View style={{
                  flexDirection: 'row', marginTop: wide * 0.18, alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    color: Colors.light, alignSelf: 'center',
                    fontFamily: Fonts.Medium, fontSize: 16,
                    lineHeight: 24,
                  }}>Boy</Text>
                  <SwitchToggle
                    switchOn={isGirl}
                    onPress={() => this.setState({ isGirl: !isGirl })}
                    circleColorOff={Colors.togelCircleColor}
                    circleColorOn={Colors.togelCircleColor}
                    backgroundColorOn={Colors.togelBackground}
                    backgroundColorOff={Colors.togelBackground}
                    containerStyle={{
                      width: 60,
                      height: 30,
                      borderRadius: 20,
                      padding: 5,
                      marginHorizontal: wide * 0.09
                    }}
                    circleStyle={{
                      width: 22,
                      height: 22,
                      borderRadius: 12,
                    }}
                  />
                  <Text style={{
                    color: Colors.light, alignSelf: 'center',
                    fontFamily: Fonts.Medium, fontSize: 16,
                    lineHeight: 24,
                  }}>Girl</Text>
                </View>
                : <></>
              }




              {
                strSelectedMode === 'player' ?
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: strSelectedMode === 'player' ? wide * 0.12 : wide * 0.16 }}>
                    <TouchableOpacity onPress={() => Navigation.navigate("School")}>
                      <AnimatedInput
                        placeholder="SCHOOL"
                        onChangeText={(e) => this.setTextofFields('school', e)}
                        value={school.name}
                        onFocus={() => Navigation.navigate("School")}
                        disabled={school !== "" && school != undefined ? true : false}
                        sufix={
                          <Image
                            style={{
                              width: 7,
                              height: 7,
                              position: 'absolute',
                              top:
                                Platform.OS === "android"
                                  ? 5
                                  : school != ""
                                    ? 30
                                    : 5,
                              right: 7
                            }}
                            source={require('../../Images/dropDownIconNew.png')}
                          />
                        }
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
                    </TouchableOpacity>

                    {/* Add picker here */}

                    <TouchableOpacity onPress={() => Navigation.navigate("Year")}>
                      <AnimatedInput
                        disabled={classof !== "" && classof != undefined ? true : false}
                        placeholder="CLASS OF"
                        value={classof}
                        onFocus={() => Navigation.navigate("Year")}
                        sufix={
                          <Image
                            style={{
                              width: 7,
                              height: 7,
                              position: 'absolute',
                              top:
                                Platform.OS === "android"
                                  ? 5
                                  : classof != ""
                                    ? 30
                                    : 5,
                              right: 7
                            }}
                            source={require('../../Images/dropDownIconNew.png')}
                          />
                        }
                        styleInput={{
                          fontFamily: Fonts.Bold,
                          color: Colors.light,
                          fontSize: 16,
                          lineHeight: 18,
                          position: 'relative'
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
                    </TouchableOpacity>
                  </View>
                  :
                  <TouchableOpacity style={{ alignItems: 'center', marginTop: wide * 0.2 }}
                    onPress={() => Navigation.navigate("TeamList")}>
                    <AnimatedInput
                      placeholder="SELECT TEAM"
                      onChangeText={(e) => this.setTextofFields('team', e)}
                      value={coachTeam.name}
                      onFocus={() => Navigation.navigate("TeamList")}
                      disabled={coachTeam !== "" && coachTeam != undefined ? true : false}
                      sufix={
                        <Image
                          style={{
                            width: 7,
                            height: 7,
                            position: 'absolute',
                            top:
                              Platform.OS === "android"
                                ? 5
                                : coachTeam != ""
                                  ? 30
                                  : 5,
                            right: 7
                          }}
                          source={require('../../Images/dropDownIconNew.png')}
                        />
                      }
                      styleInput={{
                        fontFamily: Fonts.Bold,
                        color: Colors.light,
                        fontSize: 16, lineHeight: 18,
                      }}
                      styleLabel={{
                        fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                        fontSize: 12,
                      }}
                      styleBodyContent={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: Colors.borderColor,
                        width: wide * 0.6
                      }}
                    // isAutoFocus={true}
                    />
                  </TouchableOpacity>
              }
              {/* <YearSelectionModal
              openModal={showYearPicker}
              onYearChoose={(e) => this.onYearChoose(e)}
              onClose={() => this.onYearClose()}
            /> */}
              {/* {
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
            } */}





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
        </SafeAreaView>
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


export default connect(mapStateToProps)(TellUsMoreIntro);

