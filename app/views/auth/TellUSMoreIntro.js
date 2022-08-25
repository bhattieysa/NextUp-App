import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, ScrollView, TextInput, Platform, FlatList, ImageBackground, Modal } from 'react-native';
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
import { ActionSheet } from 'react-native-cross-actionsheet';
import { getCities, getStates } from '../../actions/home';
import { RadioButton } from '../../components/common/radioButton';
import { DropDownSelect } from '../../components/common/customDropDown';
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
      coachingType: UserModel.coachingType !== undefined ? UserModel.coachingType : '',
      selected_coachingType: UserModel.selected_coachingTyp !== undefined ? UserModel.selected_coachingTyp : '',
      ageGroup: UserModel.ageGroup !== undefined ? UserModel.ageGroup : '',
      isGirl: UserModel.isGirl !== undefined ? UserModel.isGirl : false,
      isHighSchool: UserModel.isHighSchool !== undefined ? UserModel.isHighSchool : true,
      isbtnEnable: true,
      strSelectedMode: UserModel.selectedUserType !== undefined ? UserModel.selectedUserType : 'player',
      selected_state: UserModel.state !== undefined ? UserModel.state : '',
      city: UserModel.city !== undefined ? UserModel.city : '',
      openStateModal: false,
      openCityModal: false,
      stateList: null,
      stateDt: null,
      cityList: null,
      cityDt: null,
      state_srch: '',
      city_srch: '',

    };
    this.inputs = {};
  }
  componentDidMount() {
    // this.props.dispatch(onBoardPlayerPositionAPI(data => this.setState({ ...this.state, positions: data[0].values })));
    console.log("Did mount called ");

    this.props.navigation.addListener('didFocus', this.getStateData);

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
          }, () => {
            this.checkForButtonEnable()
          })
        }
      }
      else if (this.props?.navigation?.state?.params?.fromRoute == "school") {
        if (this.props?.navigation?.state?.params?.school) {
          this.setState({
            school: this.props.navigation.state.params.school.name,
            selected_state: this.props.navigation.state.params.selected_state,
            city: this.props.navigation.state.params.city,
          }, () => {
            this.checkForButtonEnable()
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
          }, () => {
            this.checkForButtonEnable()
          })
        }
      }

    }
  }


  checkForButtonEnable = (key) => {
    const {
      isBoy,
      isGirl,
      strSelectedMode,
      isHighSchool,
      school,
      selected_coachingType,
      coachTeam,
      selected_state, city,
      ageGroup, classof

    } = this.state;

    debugger
    if (strSelectedMode === 'coach') {
      debugger
      // if (key === 'coachSelected') {
      // if (isHighSchool != '') {
      if (isHighSchool == true) {
        debugger
        if (coachTeam != '' && selected_coachingType != '') {
          this.setState({ isbtnEnable: true })
          return
        } else {
          this.setState({ isbtnEnable: false })
          return
        }
      } else {
        debugger
        if (coachTeam != '' && selected_state != '' && city != '' && ageGroup != '') {
          this.setState({ isbtnEnable: true })
          return
        } else {
          this.setState({ isbtnEnable: false })
          return
        }
      }
      // } else {
      //   this.setState({ isbtnEnable: false });
      //   return
      // }

      // } else {
      //   this.setState({ isbtnEnable: false });
      //   return
      // }
    }

    if (strSelectedMode === 'player') {
      if (isGirl !== '') {
        if (school != '' && classof != '') {
          this.setState({ isbtnEnable: true });
          return;
        } else {
          this.setState({ isbtnEnable: false });
          return;

        }

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
    const { strSelectedMode, isGirl, classof, school, isbtnEnable,
      city, selected_state, coachTeam,
      isHighSchool, coachingType, ageGroup, selected_coachingType } = this.state;
    if (isbtnEnable) {
      // if (
      UserModel.selectedUserType = strSelectedMode
      UserModel.isGirl = isGirl
      UserModel.classof = classof
      UserModel.school = school
      UserModel.city = city
      UserModel.state = selected_state
      UserModel.coachTeam = coachTeam
      UserModel.isHighSchool = isHighSchool
      UserModel.ageGroup = ageGroup
      UserModel.coachingType = coachingType
      UserModel.selected_coachingTyp = selected_coachingType

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
      pickerDate,
      ageGroup,
      isHighSchool,
      coachingType,
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
    const { strSelectedMode, isGirl } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: strSelectedMode == item.toLowerCase() ? wide * 0.4 : wide * 0.38,
          height: strSelectedMode == item.toLowerCase() ? wide * 0.54 : wide * 0.5,
          borderWidth: 2,
          borderRadius: wide * 0.05,
          marginRight: 15,
          borderColor: strSelectedMode === item.toLowerCase() ? Colors.light : Colors.newGrayFontColor
        }}
        onPress={() => {
          debugger
          this.setState({
            strSelectedMode: item.toLowerCase(),
            school: '', coachTeam: '', classof: '',
            isHighSchool: true, isGirl: false,
            selected_state: '', city: '', ageGroup: '',
            coachingType: '', selected_coachingType: ''
          }, () => {
            this.checkForButtonEnable(item)
          })
        }
        }
      >
        {item == 'PLAYER' ?
          isGirl == true ?
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: wide * 0.06,
                opacity: strSelectedMode === 'coach' ? 0.5 : 1,
              }} source={require('../../Images/female_onboard_Icon.png')}
              resizeMode={'cover'}
            />

            :
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: wide * 0.06,
                opacity: strSelectedMode === 'coach' ? 0.5 : 1,
              }} source={require('../../Images/male_onboard_Icon.png')}
              resizeMode={'cover'}
            />
          :
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: wide * 0.06,
              opacity: strSelectedMode === 'player' ? 0.5 : 1,
            }} source={require('../../Images/coach_onboard_icon.png')}
            resizeMode={'cover'}
          />
        }


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
            color: strSelectedMode === item.toLowerCase() ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
            fontFamily: Fonts.Bold, fontSize: 16,
          }}>{item}</Text>

          {strSelectedMode == item.toLowerCase() ?
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



  onClickCoaching = () => {

    ActionSheet.options({
      message: 'Select an option',
      options: [
        {
          text: 'Jr Varsity', onPress: () => this.setState({ coachingType: 'JV', selected_coachingType: 'Jr Varsity' }, () => {
            this.checkForButtonEnable()
          })
        },
        {
          text: 'Varsity', onPress: () => this.setState({ coachingType: 'VARSITY', selected_coachingType: 'Varsity' }, () => {
            this.checkForButtonEnable()
          })
        },
        {
          text: 'Both', onPress: () => this.setState({ coachingType: 'BOTH', selected_coachingType: 'Both' }, () => {
            this.checkForButtonEnable()
          })
        },
      ],
      tintColor: '#008888'
    })
  }

  onClickAgeGroup = () => {
    ActionSheet.options({
      message: 'Select an option',
      options: [
        {
          text: '14 & Under', onPress: () => this.setState({ ageGroup: '14 & Under' }, () => {
            this.checkForButtonEnable()
          })
        },
        {
          text: '15 & Under', onPress: () => this.setState({ ageGroup: '15 & Under' }, () => {
            this.checkForButtonEnable()
          })
        },
        {
          text: '18 & Under', onPress: () => this.setState({ ageGroup: '18 & Under' }, () => {
            this.checkForButtonEnable()
          })
        },
      ],
      tintColor: '#008888'
    })
  }



  render() {
    const {
      isbtnEnable,
      strSelectedMode,
      classof,
      school,
      isGirl,
      coachTeam,
      isHighSchool,
      coachingType,
      selected_coachingType,
      ageGroup,
      selected_state,
      city,
      openCityModal,
      openStateModal

    } = this.state;

    const navParams = this.props.navigation.state.params;

    // if (navParams && navParams.state) {
    // console.log("navparams working", strSelectedMode);
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
                }} source={require('../../Images/back_ico.png')}
                />
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
            style={{ marginTop: wide * 0.03, paddingBottom: wide * 0.03 }}
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
                  // showPagination
                  paginationStyleItem={{ marginTop: wide * 0.09 }}
                  contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
                  paginationActiveColor={Colors.btnBg}
                  paginationDefaultColor={Colors.fontGray}
                  data={["PLAYER", "COACH"]}
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
                  marginTop: wide * 0.08,

                }}>
                  <Text style={{
                    color: Colors.txtFieldPlaceHolder,
                    fontFamily: Fonts.Bold, fontSize: 14,
                    lineHeight: 22, fontWeight: '700'
                  }}>GENDER</Text>
                  <View style={{
                    flexDirection: 'row',
                    marginTop: wide * 0.025,
                  }}>
                    <TouchableOpacity style={{
                      flexDirection: 'row', justifyContent: 'center',
                      alignItems: 'center',
                    }}
                      activeOpacity={1}
                      onPress={() => this.setState({ isGirl: false, school: '', classof: '' })}
                    >
                      <RadioButton
                        containerStyle={{
                          width: wide * 0.07, height: wide * 0.07,
                          borderRadius: wide * 0.07 / 2,
                          borderColor: isGirl == false ? Colors.btnBg : Colors.radioBtnBorder,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: wide * 0.006,
                        }}
                        centerStyle={{
                          width: '50%', height: '50%',
                          borderRadius: wide * 0.07 / 4,
                          backgroundColor: Colors.btnBg
                        }}
                        isSelected={isGirl == false ? true : false}
                        onPress={() => this.setState({ isGirl: false, school: '', classof: '' })}
                      />
                      <Text style={{
                        color: isGirl == false ? Colors.light : Colors.txtFieldPlaceHolder, alignSelf: 'center',
                        fontFamily: Fonts.SemiBold, fontSize: 16,
                        lineHeight: 18, marginHorizontal: wide * 0.025,
                        fontWeight: '600'
                      }}>Male</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: wide * 0.07,
                    }}
                      activeOpacity={1}
                      onPress={() => this.setState({ isGirl: true, school: '', classof: '' })}
                    >

                      <RadioButton
                        containerStyle={{
                          width: wide * 0.07, height: wide * 0.07,
                          borderRadius: wide * 0.07 / 2,
                          borderColor: isGirl == true ? Colors.btnBg : Colors.radioBtnBorder,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: wide * 0.006,
                        }}
                        centerStyle={{
                          width: '50%', height: '50%',
                          borderRadius: wide * 0.07 / 4,
                          backgroundColor: Colors.btnBg
                        }}
                        isSelected={isGirl == true ? true : false}
                        onPress={() => this.setState({ isGirl: true, school: '', classof: '' })}

                      />
                      <Text style={{
                        color: isGirl == true ? Colors.light : Colors.txtFieldPlaceHolder,
                        alignSelf: 'center',
                        fontFamily: Fonts.SemiBold, fontSize: 16,
                        lineHeight: 18, marginHorizontal: wide * 0.025,
                        fontWeight: '600'
                      }}>Female</Text>
                    </TouchableOpacity>

                  </View>

                </View>
                :
                <View style={{
                  marginTop: wide * 0.08,

                }}>
                  <Text style={{
                    color: Colors.txtFieldPlaceHolder,
                    fontFamily: Fonts.Bold, fontSize: 14,
                    lineHeight: 22, fontWeight: '700'
                  }}>OPTION</Text>
                  <View style={{
                    flexDirection: 'row',
                    marginTop: wide * 0.025,
                  }}>
                    <TouchableOpacity style={{
                      flexDirection: 'row', justifyContent: 'center',
                      alignItems: 'center',
                    }}
                      activeOpacity={1}
                      onPress={() => this.setState({
                        isHighSchool: true, coachTeam: '',
                        classof: '', selected_state: '', city: '', ageGroup: '',
                        coachingType: '', selected_coachingType: ''
                      })}
                    >
                      <RadioButton
                        containerStyle={{
                          width: wide * 0.07, height: wide * 0.07,
                          borderRadius: wide * 0.07 / 2,
                          borderColor: isHighSchool == true ? Colors.btnBg : Colors.radioBtnBorder,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: wide * 0.006,
                        }}
                        centerStyle={{
                          width: '50%', height: '50%',
                          borderRadius: wide * 0.07 / 4,
                          backgroundColor: Colors.btnBg
                        }}
                        isSelected={isHighSchool == true ? true : false}
                        onPress={() => this.setState({
                          isHighSchool: true,
                          coachTeam: '',
                          classof: '', selected_state: '', city: '', ageGroup: '',
                          coachingType: '', selected_coachingType: ''
                        })}
                      />
                      <Text style={{
                        color: isHighSchool == true ? Colors.light : Colors.txtFieldPlaceHolder, alignSelf: 'center',
                        fontFamily: Fonts.SemiBold, fontSize: 16,
                        lineHeight: 18, marginHorizontal: wide * 0.025,
                        fontWeight: '600'
                      }}>High School</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: wide * 0.07,
                    }}
                      activeOpacity={1}
                      onPress={() => this.setState({
                        isHighSchool: false, coachTeam: '',
                        classof: '', selected_state: '', city: '', ageGroup: '',
                        coachingType: '', selected_coachingType: ''
                      })}
                    >

                      <RadioButton
                        containerStyle={{
                          width: wide * 0.07, height: wide * 0.07,
                          borderRadius: wide * 0.07 / 2,
                          borderColor: isHighSchool == false ? Colors.btnBg : Colors.radioBtnBorder,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: wide * 0.006,
                        }}
                        centerStyle={{
                          width: '50%', height: '50%',
                          borderRadius: wide * 0.07 / 4,
                          backgroundColor: Colors.btnBg
                        }}
                        isSelected={isHighSchool == false ? true : false}
                        onPress={() => this.setState({
                          isHighSchool: false, coachTeam: '',
                          classof: '', selected_state: '', city: '', ageGroup: '',
                          coachingType: '', selected_coachingType: ''
                        })}

                      />
                      <Text style={{
                        color: isHighSchool == false ? Colors.light : Colors.txtFieldPlaceHolder,
                        alignSelf: 'center',
                        fontFamily: Fonts.SemiBold, fontSize: 16,
                        lineHeight: 18, marginHorizontal: wide * 0.025,
                        fontWeight: '600',
                      }}>Travel Team</Text>
                    </TouchableOpacity>

                  </View>

                </View>
              }

              {
                strSelectedMode == 'player' ?
                  <View style={{
                    justifyContent: 'space-between',
                    marginTop: wide * 0.05,
                  }}>
                    <TouchableOpacity
                      onPress={() => Navigation.navigate("School")}
                      style={{ marginTop: wide * 0.05, }}
                    >
                      <DropDownSelect
                        isIcon
                        containerStyle={{
                          width: wide * 0.8,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.borderColor,
                          alignItems: "center",
                          justifyContent: 'center',

                        }}
                        placeHolderContainerStyl={{
                          flexDirection: 'row', width: '98%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: school == '' || school == undefined ? wide * 0.025 : wide * 0.008
                        }}
                        placeHolderLabelStyl={{
                          fontFamily: Fonts.Bold,
                          color: Colors.txtFieldPlaceHolder,
                          fontSize: 16,
                          lineHeight: 18,
                        }}
                        iconStyl={{
                          width: 8,
                          height: 8,
                        }}
                        textStyle={{
                          width: '98%',
                          fontFamily: Fonts.Bold,
                          color: Colors.light,
                          fontSize: 16, lineHeight: 18,
                          fontWeight: '600',
                          marginTop: wide * 0.02,
                          marginBottom: wide * 0.03,
                          alignSelf: 'center',

                        }}
                        placeHolder={'SCHOOL'}
                        selectedValue={school}
                        onPress={() => Navigation.navigate("School")}
                      />

                    </TouchableOpacity>

                    {/* Add picker here */}

                    <TouchableOpacity onPress={() => Navigation.navigate("Year")}
                      style={{ marginTop: wide * 0.09, }}
                    >
                      <DropDownSelect
                        isIcon
                        containerStyle={{
                          width: wide * 0.44,
                          // height: 60,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.borderColor,
                          alignItems: "center",
                          justifyContent: 'center',

                        }}
                        placeHolderContainerStyl={{
                          flexDirection: 'row', width: '98%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: classof == '' || classof == undefined ? wide * 0.025 : wide * 0.008


                        }}
                        placeHolderLabelStyl={{
                          fontFamily: Fonts.Bold,
                          color: Colors.txtFieldPlaceHolder,
                          fontSize: 16,
                          lineHeight: 18,
                          fontWeight: '700'
                        }}
                        iconStyl={{
                          width: 8,
                          height: 8,
                        }}
                        textStyle={{
                          width: '98%',
                          fontFamily: Fonts.Bold,
                          color: Colors.light,
                          fontSize: 16,
                          lineHeight: 18,
                          fontWeight: '600',
                          marginTop: wide * 0.02,
                          marginBottom: wide * 0.03,
                          alignSelf: 'center'
                        }}
                        placeHolder={'CLASS OF'}
                        selectedValue={classof}
                        onPress={() => Navigation.navigate("Year")}
                      />

                    </TouchableOpacity>
                  </View>
                  :
                  isHighSchool == true ?
                    <View style={{
                      marginTop: wide * 0.04,
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                      // backgroundColor: 'green'
                      // flexDirection: 'row'
                    }}>


                      <TouchableOpacity
                        onPress={() => Navigation.navigate("TeamList")}
                        style={{ marginTop: wide * 0.06 }}
                      >

                        <DropDownSelect
                          isIcon
                          containerStyle={{
                            width: wide * 0.8,
                            // height: 60,
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                            // backgroundColor: 'red',
                            alignItems: "center",
                            justifyContent: 'center'
                          }}
                          placeHolderContainerStyl={{
                            flexDirection: 'row', width: '98%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // marginTop: wide * 0.015,
                            marginBottom: coachTeam == '' || coachTeam == undefined ? wide * 0.025 : wide * 0.008

                          }}
                          placeHolderLabelStyl={{
                            fontFamily: Fonts.Bold,
                            color: Colors.txtFieldPlaceHolder,
                            fontSize: 16, lineHeight: 18,
                            fontWeight: '700'
                          }}
                          iconStyl={{
                            width: 8,
                            height: 8,
                          }}
                          textStyle={{
                            width: '98%',
                            fontFamily: Fonts.Bold,
                            color: Colors.light,
                            fontSize: 16, lineHeight: 18, fontWeight: '600',
                            // marginTop: wide * 0.03,
                            // marginBottom: wide * 0.015,
                            marginTop: wide * 0.02,
                            marginBottom: wide * 0.03,
                            alignSelf: 'center'
                          }}
                          placeHolder={'SELECT TEAM'}
                          selectedValue={coachTeam}
                          onPress={() => Navigation.navigate("TeamList")}
                        />

                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => this.onClickCoaching()}
                        style={{ marginTop: wide * 0.1, }}

                      >
                        <DropDownSelect
                          isIcon
                          containerStyle={{
                            width: wide * 0.44,
                            // height: 60,
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                            alignItems: "center",
                            justifyContent: 'center',

                          }}
                          placeHolderContainerStyl={{
                            flexDirection: 'row', width: '98%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: selected_coachingType == '' || selected_coachingType == undefined ? wide * 0.025 : wide * 0.008

                          }}
                          placeHolderLabelStyl={{
                            fontFamily: Fonts.Bold,
                            color: Colors.txtFieldPlaceHolder,
                            fontSize: 16, lineHeight: 18,
                            fontWeight: '700'
                          }}
                          iconStyl={{
                            width: 8,
                            height: 8,
                          }}
                          textStyle={{
                            width: '98%',
                            fontFamily: Fonts.Bold,
                            color: Colors.light,
                            fontSize: 16, lineHeight: 18,
                            fontWeight: '600',
                            marginTop: wide * 0.02,
                            marginBottom: wide * 0.03,
                            alignSelf: 'center'
                          }}
                          placeHolder={'SELECT'}
                          selectedValue={selected_coachingType}
                          onPress={() => this.onClickCoaching()}
                        />
                      </TouchableOpacity>

                    </View>
                    :
                    <View style={{
                      marginTop: wide * 0.1,
                      alignItems: 'flex-start'
                    }}>

                      <AnimatedInput
                        placeholder="NAME"
                        onChangeText={(e) => this.setState({ coachTeam: e })}
                        value={coachTeam}
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
                          width: wide * 0.5
                        }}
                      />
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: wide * 0.07,
                        width: '100%',
                        // alignSelf: 'center',
                      }}>
                        <TouchableOpacity onPress={() => this.setState({ openStateModal: true })}
                          activeOpacity={1}
                        >
                          <DropDownSelect
                            isIcon
                            containerStyle={{
                              width: wide * 0.4,
                              // height: 60,
                              borderBottomWidth: 1,
                              borderBottomColor: Colors.borderColor,
                              alignItems: "center",
                              justifyContent: 'center',

                            }}
                            placeHolderContainerStyl={{
                              flexDirection: 'row', width: '98%',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              // marginTop: wide * 0.015,
                              marginBottom: selected_state == '' || selected_state == undefined ? wide * 0.025 : wide * 0.008

                            }}
                            placeHolderLabelStyl={{
                              fontFamily: Fonts.Bold,
                              color: Colors.txtFieldPlaceHolder,
                              fontSize: 16, lineHeight: 18,
                              fontWeight: '700'
                            }}
                            iconStyl={{
                              width: 8,
                              height: 8,
                            }}
                            textStyle={{
                              width: '98%',
                              fontFamily: Fonts.Bold,
                              color: Colors.light,
                              fontSize: 16, lineHeight: 18,
                              fontWeight: '600',
                              marginTop: wide * 0.02,
                              marginBottom: wide * 0.03,
                              alignSelf: 'center'
                            }}
                            placeHolder={'STATE'}
                            selectedValue={selected_state}
                            onPress={() => this.setState({ openStateModal: true })}
                          />


                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.setState({ openCityModal: true })}
                          activeOpacity={1}
                        >
                          <DropDownSelect
                            isIcon
                            containerStyle={{
                              width: wide * 0.4,
                              // height: 60,
                              borderBottomWidth: 1,
                              borderBottomColor: Colors.borderColor,
                              alignItems: "center",
                              justifyContent: 'center',

                            }}
                            placeHolderContainerStyl={{
                              flexDirection: 'row', width: '98%',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: city == '' || city == undefined ? wide * 0.025 : wide * 0.008

                            }}
                            placeHolderLabelStyl={{
                              fontFamily: Fonts.Bold,
                              color: Colors.txtFieldPlaceHolder,
                              fontSize: 16, lineHeight: 18,
                              fontWeight: '700'
                            }}
                            iconStyl={{
                              width: 8,
                              height: 8,
                            }}
                            textStyle={{
                              width: '98%',
                              fontFamily: Fonts.Bold,
                              color: Colors.light,
                              fontSize: 16, lineHeight: 18,
                              fontWeight: '600',
                              marginTop: wide * 0.02,
                              marginBottom: wide * 0.03,
                              alignSelf: 'center'
                            }}
                            placeHolder={'CITY'}
                            selectedValue={city}
                            onPress={() => this.setState({ openCityModal: true })}
                          />
                        </TouchableOpacity>
                      </View>


                      <TouchableOpacity style={{ alignItems: 'center', marginTop: wide * 0.1, }}
                        onPress={() => this.onClickAgeGroup()}
                      >

                        <DropDownSelect
                          isIcon
                          containerStyle={{
                            width: wide * 0.4,
                            // height: 60,
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                            alignItems: "center",
                            justifyContent: 'center',

                          }}
                          placeHolderContainerStyl={{
                            flexDirection: 'row', width: '98%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // marginTop: wide * 0.015,
                            marginBottom: ageGroup == '' || ageGroup == undefined ? wide * 0.025 : wide * 0.008

                          }}
                          placeHolderLabelStyl={{
                            fontFamily: Fonts.Bold,
                            color: Colors.txtFieldPlaceHolder,
                            fontSize: 16, lineHeight: 18,
                            fontWeight: '700'
                          }}
                          iconStyl={{
                            width: 8,
                            height: 8,
                          }}
                          textStyle={{
                            width: '98%',
                            fontFamily: Fonts.Bold,
                            color: Colors.light,
                            fontSize: 16, lineHeight: 18,
                            fontWeight: '600',
                            marginTop: wide * 0.02,
                            marginBottom: wide * 0.03,
                            alignSelf: 'center'
                          }}
                          placeHolder={'AGE'}
                          selectedValue={ageGroup}
                          onPress={() => this.onClickAgeGroup()}
                        />

                      </TouchableOpacity>

                    </View>

              }

              <TouchableOpacity
                key={isbtnEnable}
                style={{
                  width: wide * 0.8, height: 48,
                  backgroundColor: Colors.btnBg,
                  alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable === false ? 0.3 : 1.0,
                  justifyContent: 'center', marginTop: wide * 0.1,
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

          <Modal
            visible={this.state.openStateModal}
            animationType={'slide'}
          >
            <SafeAreaView style={{ backgroundColor: Colors.base }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}
              >
                <Text style={{ color: Colors.white_08, fontSize: 20 }}>Choose States</Text>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 10
                  }}
                  onPress={() => this.setState({ openStateModal: false })}
                >
                  <View>
                    <Text
                      style={{
                        color: Colors.white_08,
                        fontSize: 20,
                        fontWeight: '600'
                      }}
                    >X</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{
                marginHorizontal: 15,
                alignItems: 'center',
                marginTop: wide * 0.05,
                marginBottom: wide * 0.02
              }}>
                <TextInput
                  style={[pickerSelectStyles.input, { width: '90%', }]}
                  onChangeText={(text) => this.setState({ state_srch: text }, () => {
                    this.handleStateSrch(text);
                  })}
                  value={this.state.state_srch}
                  placeholder="Search State"
                  placeholderTextColor={Colors.newGrayFontColor}
                />
              </View>
              <View
                style={{
                  height: '98%',
                  width: '100%',
                }}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{ marginBottom: wide * 0.05 }}
                >
                  <View
                    style={{
                      width: '100%',
                      padding: 20,
                    }}
                  >
                    {this.state.stateList !== null ?
                      this.state.stateList.map(el => (
                        <TouchableOpacity onPress={() => {
                          this.setState({ selected_state: el, city: '', openStateModal: false }, () => {
                            this.getCityData(el)
                          })
                        }}>
                          <View
                            style={{
                              padding: 10,
                              width: '95%',
                              alignSelf: 'center'
                              // borderBottomWidth: 0.5,
                              // borderBottomColor: Colors.white_08
                            }}
                          >
                            <Text
                              style={{
                                color: Colors.lightshade,
                                fontSize: 14,
                              }}
                            >{el}</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                      :
                      <></>
                    }
                  </View>
                </ScrollView>
              </View>
            </SafeAreaView>
          </Modal>

          <Modal
            visible={openCityModal}
            animationType={'slide'}
          >
            <SafeAreaView style={{ backgroundColor: Colors.base }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}
              >
                <Text style={{ color: Colors.white_08, fontSize: 20 }}>Choose City</Text>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 10
                  }}
                  onPress={() => this.setState({ openCityModal: false })}
                >
                  <View>
                    <Text
                      style={{
                        color: Colors.white_08,
                        fontSize: 20,
                        fontWeight: '600'
                      }}
                    >X</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{
                marginHorizontal: 15,
                alignItems: 'center',
                marginTop: wide * 0.05,
                marginBottom: wide * 0.02
              }}>
                <TextInput
                  style={[pickerSelectStyles.input, { width: '90%', }]}
                  onChangeText={(text) => this.setState({ city_srch: text }, () => {
                    this.handleCitySrch(text);
                  })}
                  value={this.state.city_srch}
                  placeholder="Search City"
                  placeholderTextColor={Colors.newGrayFontColor}
                />
              </View>
              <View
                style={{
                  height: '98%',
                  width: '100%',
                }}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{ marginBottom: wide * 0.05 }}
                >
                  <View
                    style={{
                      width: '100%',
                      padding: 20,
                    }}
                  >
                    {this.state.cityList !== null ?
                      this.state.cityList.map(el => (
                        <TouchableOpacity onPress={() => {
                          this.setState({ city: el, openCityModal: false })
                        }}>
                          <View
                            style={{
                              padding: 10,
                              width: '95%',
                              alignSelf: 'center'
                              // borderBottomWidth: 0.5,
                              // borderBottomColor: Colors.white_08
                            }}
                          >
                            <Text
                              style={{
                                color: Colors.lightshade,
                                fontSize: 14,
                              }}
                            >{el}</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                      :
                      <></>
                    }
                  </View>
                </ScrollView>
              </View>
            </SafeAreaView>
          </Modal>

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
  input: {
    // height: 45,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    // borderColor: Colors.lightshade,
    // color: Colors.lightshade,

    borderWidth: 2,
    borderColor: Colors.newGrayFontColor,
    fontFamily: Fonts.Bold, height: 45,
    // width: '90%',
    paddingLeft: 10, paddingRight: wide * 0.1,
    borderRadius: 5, color: Colors.light, fontSize: 16

  },
});


export default connect(mapStateToProps)(TellUsMoreIntro);

