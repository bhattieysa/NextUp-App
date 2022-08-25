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
import StatesListModal from './StatesListModal';
import YearSelectionModal from './YearSelection'
import { DropDownSelect } from '../../components/common/customDropDown';
import { ActionSheet } from 'react-native-cross-actionsheet';
// import DatePicker from 'react-native-modern-datepicker';

// const years = ["2019", "2020", "2021", "2022"]

const heightArr = [];

let wide = Layout.width;
class TellUsMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fname: UserModel.fname !== undefined ? UserModel.fname : '',
      lname: UserModel.lname !== undefined ? UserModel.lname : '',
      dob: UserModel.dob !== undefined ? UserModel.dob : 'SELECT DATE',
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
      strSelectedPosition: UserModel.selectedSportPosition !== undefined ? UserModel.selectedSportPosition : 0,
      isDatePickerVisible: false,
      openStatesModal: false,
      positions: [],
      pickerDate: new Date(),
      years: [],
      showYearPicker: false,
      selected_height: UserModel.selected_height !== undefined ? UserModel.selected_height : '',
      weight: UserModel.weight !== undefined ? UserModel.weight : '',
    };
    this.inputs = {};
  }
  componentDidMount() {
    for (let index = 100; index < 500; index++) {
      heightArr.push(index.toString());
    }
    this.props.dispatch(onBoardPlayerPositionAPI(data => this.setState({ ...this.state, positions: data[0].values })));
    console.log("Did mount called ");
    this.checkForButtonEnable()

    // this.props.navigation.addListener('didFocus', this.setTheState);

  }

  componentDidUpdate(prevProps) {
    console.log("Did focus called");

    if (prevProps !== this.props) {
      if (this.props?.navigation?.state?.params?.state) {
        console.log("Did focus called state found, ", this.props.navigation?.state?.params?.state);

        this.setTextofFields('state', this.props.navigation?.state?.params?.state);
        // this.setState({
        //   state: this.props.navigation?.state?.params?.state
        // }, () => {
        //   return false;
        // })
      }

      if (this.props?.navigation?.state?.params?.year) {
        console.log("Did focus called year found");
        // this.setTextofFields('classof', this.props.navigation.state.params.year);
        this.setState({
          classof: this.props.navigation.state.params.year
        })
      }

    }
  }


  checkForButtonEnable = (key) => {
    const {
      fname,
      lname,
      email,
      aboutMe,
      strSelectedMode,
      selected_height,
      weight
    } = this.state;


    if (strSelectedMode.toLowerCase() === 'coach') {
      debugger
      // if (key === 'aboutMe') {
      // if (aboutMe.length > 60) {
      //   debugger
      //   this.setState({ isbtnEnable: false })
      //   return
      // } else {
      //   debugger
      //   this.setState({ isbtnEnable: true });
      //   return
      // }
      // } 
      // else {
      // if (aboutMe.trim() !== '' && fname.trim() !== '' && lname.trim() !== '') {
      if (fname.trim() !== '' && lname.trim() !== '') {
        debugger
        // if (aboutMe.length < 60) {
        //   this.setState({ isbtnEnable: false })
        //   return
        // } else {
        debugger
        this.setState({ isbtnEnable: true });
        //   return
        // }
      } else {
        this.setState({ isbtnEnable: false });
        return
      }
      // }
    }

    if (strSelectedMode === 'player') {
      if (fname.trim() !== '' && lname.trim() !== '' && email.trim() !== '' && selected_height.trim() != '' && weight.trim() !== '') {
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
        this.setState({ city: txt })
        break;

      case 'state':
        this.setState({ state: txt })
        break;

      case 'school':
        this.setState({ school: txt })
        break;

      case 'dob':
        debugger
        this.setState({ isDatePickerVisible: false, dob: txt }, () => {
          this.checkForButtonEnable(frm)
        })
        break;
      case 'height':
        this.setState({ selected_height: txt }, () => {
          this.checkForButtonEnable(frm)
        })
        break;
      case 'weight':
        this.setState({ weight: txt }, () => {
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
      strSelectedPosition,
      aboutMe, strSelectedMode, isbtnEnable, positions, city, state, classof, school,
      selected_height, weight } = this.state;
    if (isbtnEnable) {
      debugger
      if (
        UserModel.fname !== fname ||
        UserModel.lname !== lname ||
        // UserModel.dob !== dob ||
        UserModel.aboutMe !== aboutMe ||
        UserModel.selectedUserType !== strSelectedMode ||
        UserModel.email !== email ||
        UserModel.selectedSportPosition == undefined
      ) {
        if (strSelectedMode.toLowerCase() == 'player') {
          debugger
          UserModel.fname = fname
          UserModel.lname = lname
          UserModel.email = email
          UserModel.city = city
          UserModel.state = state
          UserModel.school = school
          UserModel.classof = classof
          // UserModel.selectedSportPosition = positions[strSelectedPosition]
          UserModel.aboutMe = aboutMe
          UserModel.selectedUserType = strSelectedMode
          UserModel.dob = dob
          UserModel.selected_height = selected_height
          UserModel.weight = weight
          Navigation.navigate('SelectPlayerCategory')
        } else {
          debugger
          this.onBoardInfo()
        }
      } else {
        Navigation.navigate('UploadPhoto')
      }
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
      dob
    } = this.state;
    getObject('UserId').then((obj) => {
      let coaching_typ;
      if (UserModel.coachingType != '' && UserModel.coachingType != undefined) {
        coaching_typ = UserModel.coachingType
      } else {
        coaching_typ = 'TRAVEL_TEAM'
      }
      debugger
      let params = {
        "typeOfUser": strSelectedMode.toUpperCase(),
        "firstName": fname,
        "lastName": lname,
        "aboutMe": aboutMe,
        "email": email,
        "dob": dob,
        "onBoardingTeamName": UserModel.coachTeam,
        //when coach selected
        // "schoolInfo": {
        //   city: city,
        //   state: state,
        //   name: school,
        //   classOff: classof,
        //   // typeOfPlayer: positions[strSelectedPosition]
        // },
        "coachingType": {
          typeOfCoaching: coaching_typ,
          schoolName: UserModel.coachTeam,
          ageGroup: UserModel.ageGroup,
          state: state,
          city: city,
          // isHighSchool: UserModel.isHighSchool,
        },
        "roleList": [
          `ROLE_${strSelectedMode.toUpperCase()}`
        ],
        // "parentApprovalRequired": !UserModel.isAdult
      }

      debugger
      console.log("onBoardDataCoach", params);

      debugger
      this.setState({ loading: true }, () => {
        this.props.dispatch(onBoardAPI(obj, params, (res, resData) => {
          if (res) {
            debugger
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
              // selectedSportPosition: positions[strSelectedPosition],
              aboutMe: aboutMe,
              profileUrl: UserModel.profileUrl,
              photoIdUrl: UserModel.photoIdUrl,
              isVerfied: UserModel.isVerfied,
              coachCertiUrl: UserModel.coachCertiUrl,
              fid: UserModel.fid,
              isSocialLogin: UserModel.isSocialLogin,
              isProfileUploaded: UserModel.isProfileUploaded,
              dob: dob
            }
            UserModel.fname = fname
            UserModel.lname = lname
            UserModel.email = email
            UserModel.city = city
            UserModel.state = state
            UserModel.school = school
            UserModel.classof = pickerDate
            // UserModel.selectedSportPosition = positions[strSelectedPosition]
            UserModel.aboutMe = aboutMe
            UserModel.selectedUserType = strSelectedMode
            UserModel.dob = dob

            debugger

            setObject('authData', onBoardData).then(() => {
              debugger
              this.setState({ loading: false })
              Navigation.navigate('UploadPhoto')
            })
          }
          else {
            debugger
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
  openModal = () => {
    this.setState({
      ...this.state,
      openStatesModal: true
    });
  }

  onStateChoose = state => {
    this.setState({
      ...this.state,
      state,
      openStatesModal: false,
    });
  }

  onClose = () => {
    this.setState({
      ...this.state,
      openStatesModal: false
    });
  }

  onYearChoose = year => {
    this.setState({
      ...this.state,
      classof: year.toString(),
      showYearPicker: false,
    });
  }

  onYearClose = () => {
    this.setState({
      ...this.state,
      showYearPicker: false
    });
  }

  onValueChange = (date) => {
    const splitDate = date.split(' ')[0]
    this.setState({
      ...this.state,
      classof: splitDate,
    }, () => {
      this.checkForButtonEnable('classof');
    })
  }

  showPicker = () => {
    this.setState({
      ...this.state,
      showYearPicker: true
    })
  }

  rowItem = (item, index) => {
    const { strSelectedPosition } = this.state;
    return (
      <TouchableOpacity activeOpacity={1} style={{
        width: wide * 0.24,
        borderWidth: 3, borderRadius: 10,
        marginRight: 12,
        borderColor: strSelectedPosition === index ? Colors.light : Colors.newGrayFontColor
      }}
        onPress={() => {
          this.setState({ strSelectedPosition: index }, () => {
            this.checkForButtonEnable()
          })

        }
        }
      >
        <Image resizeMode={'contain'} style={{
          alignSelf: 'center',
          marginTop: wide * 0.1,
          height: wide * 0.15, width: wide * 0.15,
          tintColor: strSelectedPosition === index ?
            Colors.light : Colors.newGrayFontColor
        }} source={require('../../Images/basketball.png')} />
        <Text style={{
          color: strSelectedPosition === index ? Colors.light : Colors.newGrayFontColor, alignSelf: 'center',
          fontFamily: Fonts.Bold, fontSize: 16, marginTop: wide * 0.04
        }}>{item}</Text>
        {
          strSelectedPosition === index ?
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
    );
  }









  render() {
    const {
      isbtnEnable,
      strSelectedMode,
      fname,
      lname,
      classof,
      state,
      city,
      school,
      email,
      aboutMe,
      isDatePickerVisible,
      openStatesModal,
      positions,
      showYearPicker,
      dob,
      selected_height,
      weight
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
                {`Enter ${strSelectedMode} details`}
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


          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            style={{
              marginTop: wide * 0.03, paddingBottom: wide * 0.02,
            }}
            bounces={false}

          >

            <View style={{
              backgroundColor: Colors.base,
              marginHorizontal: 32,
            }} >

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wide * 0.14
              }}>

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

              {
                strSelectedMode === 'player' ?
                  <View style={{ marginTop: wide * 0.09 }}>
                    <Text style={{ fontFamily: Fonts.Bold, color: Colors.newGrayFontColor, fontSize: 12 }}>DATE OF BIRTH</Text>
                    <TouchableOpacity style={{
                      marginTop: 15, borderBottomWidth: 1.5,
                      borderBottomColor: Colors.borderColor,
                    }} onPress={() => {
                      this.setState({ isDatePickerVisible: true })
                    }}>
                      <Text style={{
                        fontFamily: Fonts.Bold,
                        paddingVertical: 10,
                        color: dob === 'SELECT DATE' ? Colors.borderColor : Colors.light, fontSize: 16
                      }}>{dob === 'SELECT DATE' ? dob : moment(dob).format('MM/DD/YYYY')}</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  null
              }

              <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                marginTop: wide * 0.12
              }}>
                <DropDownSelect
                  containerStyle={{
                    width: wide * 0.4,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.borderColor,
                    alignItems: "center",
                    justifyContent: 'center',

                  }}
                  placeHolderContainerStyl={{
                    flexDirection: 'row', width: '98%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: state == '' || state == undefined ? wide * 0.025 : wide * 0.008


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
                  selectedValue={state}
                />

                <DropDownSelect
                  containerStyle={{
                    width: wide * 0.4,
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
                />

              </View>

              {strSelectedMode == 'player' ?
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: wide * 0.15
                }}>
                  <AnimatedInput
                    placeholder="HEIGHT (IN CM)"
                    onChangeText={(e) => this.setTextofFields('height', e)}
                    value={selected_height}
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
                      width: wide * 0.4,
                    }}
                    keyboardType={'decimal-pad'}
                    maxLength={3}
                  />

                  <AnimatedInput
                    placeholder="WEIGHT (IN LBS)"
                    onChangeText={(e) => this.setTextofFields('weight', e)}
                    value={weight}
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
                      width: wide * 0.4,
                    }}
                    keyboardType={'decimal-pad'}
                    maxLength={3}
                  />

                </View>

                : <></>}


              <StatesListModal
                openModal={openStatesModal}
                onStateChoose={(e) => this.onStateChoose(e)}
                onClose={() => this.onClose()}
              />


              <YearSelectionModal
                openModal={showYearPicker}
                onYearChoose={(e) => this.onYearChoose(e)}
                onClose={() => this.onYearClose()}
              />





            </View>
            <AppLoader visible={this.state.loading} />



          </KeyboardAwareScrollView>
          <TouchableOpacity
            key={isbtnEnable}
            style={{
              width: wide * 0.8, height: 48,
              backgroundColor: Colors.btnBg,
              alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable === false ? 0.3 : 1.0,
              justifyContent: 'center',
              position: "absolute", bottom: wide * 0.1,

            }} onPress={() => {
              this.actionContinue()
            }}>
            <Text style={{
              alignSelf: 'center', color: Colors.light,
              fontFamily: Fonts.Bold,
            }}>Continue</Text>
          </TouchableOpacity>



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


export default connect(mapStateToProps)(TellUsMore);

