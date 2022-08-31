import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, KeyboardAvoidingView,
  Alert, Platform, Modal, StyleSheet, ScrollView
} from 'react-native';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';


import ImagePicker from 'react-native-image-crop-picker';
import { getObject } from '../../middleware';
import { createNewTeam, getCities, getStates } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import AnimatedInput from '../../Helpers/react-native-animated-input';
import { uploadPhoto } from '../../actions/auth';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { Title } from '../../components/common/titleLabel';
import { showErrorAlert, showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';
import { TextInput } from 'react-native-gesture-handler';
import SwitchToggle from 'react-native-switch-toggle';
import { ActionSheet } from 'react-native-cross-actionsheet';
import { RadioButton } from '../../components/common/radioButton';
import { DropDownSelect } from '../../components/common/customDropDown';

let wide = Layout.width;


class CoachAddTeam extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      avatar: "",
      teamName: '',
      removeLoading: false,
      isbtnEnable: false,
      selected_state: '',
      city: '',
      openStateModal: false,
      openCityModal: false,
      stateList: null,
      stateDt: null,
      cityList: null,
      cityDt: null,
      state_srch: '',
      city_srch: '',
      coachTeam: '',
      coachingType: '',
      selected_coachingType: '',
      ageGroup: '',
      isHighSchool: true,
      textFieldTopMargin: wide * 0.1,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener('didFocus', this.onScreenFocus)
    // this.onScreenFocus();
  }

  componentDidUpdate(prevProps) {
    console.log("Did focus called");
    if (prevProps !== this.props) {
      if (this.props?.navigation?.state?.params?.team) {
        debugger
        this.setState({
          coachTeam: this.props.navigation.state.params.team.name,
          teamName: this.props.navigation.state.params.team.name,
          selected_state: this.props.navigation.state.params.selected_state,
          city: this.props.navigation.state.params.city,
        }, () => {
          this.handleBtnEnable()
        })
      }

    }
  }

  onScreenFocus = () => {
    // this.getInitialData(false)
    this.getStateData()
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
        this.setState({ cityList: city_dt, cityDt: city_dt, city: city_dt[0] }, () => {
          this.handleBtnEnable();
        })
      }
    }))
  }

  getInitialData = (isfromAdd) => {
    getObject('UserId').then((obj) => {
      this.setState({ loading: true, selectedKpi: [] }, () => {
        this.props.dispatch(getNewCoachTeam(obj, (res) => {
          const { coachTeam } = this.props.Home
          debugger
          if (coachTeam?.teamTabInfoDtoList === null || coachTeam?.teamTabInfoDtoList.length == 0) {
            this.setState({
              loading: false,
              removeLoading: false,
              isAddTeam: true
            })
          } else {
            debugger;
            // this.state.selectedKpi.push(coachTeam?.teamTabInfoDtoList[0].kpi[0]);
            this.setState({
              loading: false,
              removeLoading: false,
              defaultKpi: coachTeam?.teamTabInfoDtoList[0].kpi[0],
              dropDownSelectedVal: coachTeam?.seasonList[0],
            }, () => {
              if (isfromAdd) {
                this.setState({
                  teamName: '', avatar: '',
                  selectedIndex: coachTeam?.length - 1, isAddTeam: false
                }, () => {
                  // setTimeout(() => {
                  //     alert('Team Added Successfully.')

                  // }, 1000)
                })

              }
              this._filterTeamSeasonWise();
              // this.filterBarChartData(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamStatsTabDto);
              // this._callPlayerTabApi(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId);

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
      let resultCity = cityDt.filter(i => i.includes(input));
      this.setState({ cityList: resultCity });
    }
    else {
      this.setState({ cityList: cityDt });
    }
  }

  actionAddTeam = () => {
    const { teamName, avatar, coachingType, coachTeam, ageGroup, selected_state, city } = this.state;
    debugger
    if (teamName.length == 0 || avatar.length == 0) {
      alert('Please enter name/logo to add the team.')
      return
    }
    debugger
    this.setState({ loading: true }, () => {
      getObject('UserId').then((obj) => {
        this.props.dispatch(uploadPhoto(avatar, obj, 'team', 'TEAM_LOGO', (res, uploadedUrl) => {
          debugger
          if (res) {
            let coaching_typ = '';
            if (this.state.isHighSchool == true) {
              coaching_typ = coachingType
            } else {
              coaching_typ = 'TRAVEL_TEAM'
            }
            debugger
            console.log("creating new team");
            let params = {
              "name": teamName,
              "coachId": obj,
              "teamLogo": uploadedUrl,
              // "seasonType": "2020-21",
              "recentSeasonType": "2020-21",
              "ownerId": obj,
              "typeOfTeam": "League",
              "coachingType": {
                "typeOfCoaching": coaching_typ,
                "schoolName": coachTeam,
                "ageGroup": ageGroup,
                "state": selected_state,
                "city": city
              }
            }
            this.props.dispatch(createNewTeam(params, (res) => {
              // console.log("res2 ", res);
              if (res) {
                debugger
                this.setState({ loading: false }, () => {
                  setTimeout(() => {
                    Navigation.back();
                  }, 200);
                })
              }
            }))
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


  pickSingle(cropit, circular = false, isFrom) {
    const { teamName, avatar } = this.state;
    Alert.alert(
      "Image",
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

                  this.setState({ avatar: image.path }, () => {
                    this.handleBtnEnable();
                  })

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

                this.setState({ avatar: image.path }, () => {
                  this.handleBtnEnable();
                })

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

  handleBtnEnable = () => {
    const { avatar, teamName, isHighSchool, coachTeam, coachingType, ageGroup, selected_state, city } = this.state
    if (avatar.length !== 0 && teamName.length !== 0) {
      if (isHighSchool == false) {
        if (coachTeam !== '' && selected_state != '' && city != '' && ageGroup != '') {
          this.setState({ isbtnEnable: true })
        } else {
          this.setState({ isbtnEnable: false })
        }
      } else {
        if (coachTeam != '' && coachingType != '') {
          this.setState({ isbtnEnable: true })

        } else {
          this.setState({ isbtnEnable: false })

        }
      }
      // this.setState({ isbtnEnable: true })
    } else {
      this.setState({ isbtnEnable: false })
    }
  }

  onClickCoaching = () => {

    ActionSheet.options({
      message: 'Select an option',
      options: [
        {
          text: 'Jr Varsity', onPress: () => this.setState({ coachingType: 'JV', selected_coachingType: 'Jr Varsity' }, () => {
            this.handleBtnEnable()
          })
        },
        {
          text: 'Varsity', onPress: () => this.setState({ coachingType: 'VARSITY', selected_coachingType: 'Varsity' }, () => {
            this.handleBtnEnable()
          })
        },
        {
          text: 'Both', onPress: () => this.setState({ coachingType: 'BOTH', selected_coachingType: 'Both' }, () => {
            this.handleBtnEnable()
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
            this.handleBtnEnable()
          })
        },
        {
          text: '15 & Under', onPress: () => this.setState({ ageGroup: '15 & Under' }, () => {
            this.handleBtnEnable()
          })
        },
        {
          text: '18 & Under', onPress: () => this.setState({ ageGroup: '18 & Under' }, () => {
            this.handleBtnEnable()
          })
        },
      ],
      tintColor: '#008888'
    })
  }

  render() {
    const { teamName, avatar, isbtnEnable, coachTeam,
      isHighSchool,
      coachingType,
      selected_coachingType,
      ageGroup,
      selected_state,
      city,
      openCityModal,
      openStateModal, textFieldTopMargin } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
          <AppLoader visible={this.state.loading} />
          <KeyBoardDismissHandler >
            <View>
              <ScreenHeader
                title={'Add New Team'}
                backButtonAction={() => Navigation.back()}
              />
            </View>
            <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }}
              behavior={Platform.OS === 'ios' ? "padding" : null}>
              <View>
                <View style={{
                  width: '90%',
                  alignSelf: 'center',
                  // flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: "center",
                  marginTop: wide * 0.1
                }}>
                  <TouchableOpacity
                    style={{
                      width: wide * 0.25, height: wide * 0.25,
                      borderRadius: wide * 0.25 / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: avatar == '' ? Colors.newGrayFontColor : null,
                      borderWidth: avatar == '' ? 1.5 : 0,
                    }}
                    onPress={() => this.pickSingle(true, false, 'ava')}
                  >
                    {avatar !== '' ?
                      <FastImage style={{
                        width: wide * 0.24, height: wide * 0.24,
                        borderRadius: wide * 0.24 / 2,
                      }}

                        source={{ uri: avatar }}
                        resizeMode={'cover'}
                      />
                      :
                      <></>
                    }
                    <View style={{
                      width: wide * 0.23, height: wide * 0.2,
                      bottom: 0, position: 'absolute', alignItems: 'center'
                    }}>

                      <Image source={require('../../Images/camera_icon2.png')}
                        resizeMode={'contain'}
                        style={{
                          position: 'absolute',
                          bottom: 8, width: 25, height: 25,
                          tintColor: Colors.shade
                        }} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: wide * 0.095,
                  justifyContent: 'center',

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
                        isHighSchool: true, coachTeam: '', coachingType: '',
                        selected_coachingType: '', selected_state: '', city: '', ageGroup: ''
                      }, () => this.handleBtnEnable())}
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
                          isHighSchool: true, coachTeam: '', coachingType: '',
                          selected_coachingType: '', selected_state: '', city: '', ageGroup: ''
                        }, () => this.handleBtnEnable())}
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
                        isHighSchool: false, coachTeam: '', coachingType: '',
                        selected_coachingType: '', selected_state: '', city: '', ageGroup: ''
                      }, () => this.handleBtnEnable())}
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
                          isHighSchool: false, coachTeam: '', coachingType: '',
                          selected_coachingType: '', selected_state: '', city: '', ageGroup: ''
                        }, () => this.handleBtnEnable())}

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

              </View>

              {
                isHighSchool == true ?
                  <View style={{
                    marginTop: wide * 0.1,
                    width: '90%',
                    alignSelf: 'center',
                    alignItems: 'flex-start',
                  }}>

                    <TouchableOpacity style={{
                      alignItems: 'center',
                      marginTop: wide * 0.02
                    }}
                      onPress={() => Navigation.navigate("CoachTeamList")}>

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
                        onPress={() => Navigation.navigate("CoachTeamList")}
                      />




                    </TouchableOpacity>

                    <TouchableOpacity style={{
                      alignItems: 'center',
                      marginTop: wide * 0.1
                    }}
                      onPress={() => this.onClickCoaching()}
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
                    width: '90%',
                    alignSelf: 'center',
                    // alignItems: 'flex-start'
                  }}>
                    <View style={{ marginTop: wide * 0.03 }}>
                      <AnimatedInput
                        placeholder="NAME"
                        onChangeText={(e) => this.setState({ coachTeam: e, teamName: e }, () => {
                          this.handleBtnEnable()
                        })}

                        value={coachTeam}
                        styleInput={{
                          fontFamily: Fonts.Bold,
                          color: Colors.light,
                          fontSize: 16, lineHeight: 18,

                        }}
                        styleLabel={{
                          fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder,
                          fontSize: 12,
                        }}
                        styleBodyContent={{
                          borderBottomWidth: 1.5,
                          borderBottomColor: Colors.borderColor,
                          width: wide * 0.8,

                        }}
                      />
                    </View>

                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: wide * 0.07,
                      width: '100%',
                    }}>
                      <TouchableOpacity onPress={() => this.setState({ openStateModal: true })}
                        activeOpacity={1}>
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
                        // onPress={() => setOpenStatModal(true)}
                        />

                      </TouchableOpacity>


                      <TouchableOpacity
                        onPress={() => this.setState({ openCityModal: true })}
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

                    <View style={{
                      marginTop: wide * 0.1,
                      width: '100%',
                      alignSelf: 'center',
                      // backgroundColor: "red"
                    }}>

                      <TouchableOpacity
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
                  </View>
              }

              {/* <AppLoader visible={this.state.removeLoading} /> */}
            </KeyboardAvoidingView>

          </KeyBoardDismissHandler>
          <TouchableOpacity
            key={isbtnEnable}
            activeOpacity={0.3}
            style={{
              width: wide * 0.8, height: 48,
              backgroundColor: Colors.btnBg,
              alignSelf: 'center', borderRadius: 24,
              justifyContent: 'center',
              opacity: isbtnEnable === false ? 0.3 : 1.0,
              // marginBottom: 50,
              // marginTop: 20,
            }} onPress={() => {
              if (isbtnEnable) {
                this.actionAddTeam()
              }
            }}>
            <Text style={{
              alignSelf: 'center', color: Colors.light,
              fontFamily: Fonts.Bold,
            }}>Done</Text>
          </TouchableOpacity>

          <Modal
            visible={openStateModal}
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
                          this.setState({ city: el, openCityModal: false }, () => {
                            this.handleBtnEnable();
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

        </SafeAreaView >
      </View>

    );
  }
}

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.homePlayer
  };
}

const pickerSelectStyles = StyleSheet.create({

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

export default connect(mapStateToProps)(CoachAddTeam);