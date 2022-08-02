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
      isHighSchool: false,
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
          coachTeam: this.props.navigation.state.params.team,
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
        this.setState({ cityList: city_dt, cityDt: city_dt, }, () => {
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

        console.log("res0 ", obj);

        this.props.dispatch(uploadPhoto(avatar, obj, 'team', 'TEAM_LOGO', (res, uploadedUrl) => {
          debugger

          console.log("res1 ", res);

          if (res) {
            let coaching_typ = '';
            if (this.state.isHighSchool == false) {
              coaching_typ = coachingType
            } else {
              coaching_typ = 'TRAVEL_TEAM'
            }
            debugger
            console.log("creating new team");
            this.props.dispatch(createNewTeam({
              "name": teamName,
              "coachId": obj,
              "teamLogo": uploadedUrl,
              // "seasonType": "2020-21",
              "recentSeasonType": "2020-21",
              "ownerId": obj,
              "typeOfTeam": "League",
              "coachingType": {
                "typeOfCoaching": coachingType,
                "schoolName": coachTeam.name,
                "ageGroup": ageGroup,
                "state": selected_state,
                "city": city
              }
            }, (res) => {

              console.log("res2 ", res);

              if (res) {
                debugger
                this.setState({ loading: false }, () => {
                  setTimeout(() => {
                    Navigation.back();
                  }, 200);
                })

                // Alert.alert(
                //     '',
                //     'Team added successfully',
                //     [
                //         {
                //             text: 'OK', onPress: () => this.setState({ loading: false }, Navigation.back())
                //         },
                //     ],
                // )
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
      if (isHighSchool == true) {
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
      openStateModal } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
          <AppLoader visible={this.state.loading} />
          <KeyBoardDismissHandler st>
            <View style={[CommonStyles.headerBottomLine]}>
              <ScreenHeader
                title={'Add Team'}
                backButtonAction={() => Navigation.back()}
              />
            </View>
            <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
              <View >
                <View style={{
                  marginTop: 50,
                  flexDirection: 'row', alignItems: 'center',
                  marginHorizontal: wide * 0.02,
                  justifyContent: 'center'
                }}>

                  {/* <View style={{  }}> */}
                  <TouchableOpacity onPress={() => this.pickSingle(true, false, 'ava')}
                    style={{
                      width: 160, height: 160,
                      borderRadius: wide * 0.01, borderWidth: 2,
                      borderColor: Colors.newGrayFontColor,
                      justifyContent: 'center', alignItems: 'center',
                    }}>
                    {
                      avatar !== ''
                        ?
                        <FastImage
                          source={{ uri: avatar }}
                          style={{ width: '95%', height: '95%', borderRadius: 5 }}
                        />
                        :
                        <>
                          <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../../Images/AddTeamIcon.png')}
                          />

                          <Text numberOfLines={1} style={{
                            color: Colors.newGrayFontColor, fontSize: 16,
                            lineHeight: 24,
                            fontFamily: Fonts.Bold,
                            marginTop: 14,
                          }}>Add Logo</Text>
                        </>

                    }

                  </TouchableOpacity>

                  {/* </View> */}
                </View>

                <View style={{
                  flexDirection: 'row', marginTop: wide * 0.08, alignItems: 'center',
                  justifyContent: 'center',

                }}>
                  <Text style={{
                    color: Colors.light, alignSelf: 'center',
                    fontFamily: Fonts.Medium, fontSize: 16,
                    lineHeight: 24,
                  }}>High School</Text>
                  <SwitchToggle
                    switchOn={isHighSchool}
                    onPress={() => this.setState({ isHighSchool: !isHighSchool, selected_state: '', city: '' }, () => {
                      this.handleBtnEnable()
                    })}
                    circleColorOff={Colors.togelCircleColor}
                    circleColorOn={Colors.togelCircleColor}
                    backgroundColorOn={Colors.togelBackground}
                    backgroundColorOff={Colors.togelBackground}
                    containerStyle={{
                      width: 60,
                      height: 30,
                      borderRadius: 20,
                      padding: 5,
                      marginHorizontal: wide * 0.07
                    }}
                    circleStyle={{
                      width: 22,
                      height: 22,
                      borderRadius: 12,
                    }}
                  />
                  <Text style={{
                    color: Colors.light, alignSelf: 'center',
                    fontFamily: Fonts.Medium,
                    fontSize: 16,
                    lineHeight: 24,
                  }}>Travel Team</Text>
                </View>


                {/* <View style={{
                  // backgroundColor: 'green',
                  marginHorizontal: 35,
                  marginTop: 50,

                  marginBottom: wide * 0.03,
                }}>
                  <AnimatedInput
                    placeholder="TEAM NAME"
                    onChangeText={(e) => this.setState({ teamName: e }, () => {
                      this.handleBtnEnable();
                    })}
                    value={teamName}
                    styleInput={{
                      fontFamily: Fonts.Bold,
                      color: Colors.light,
                      fontSize: 16, lineHeight: 18
                    }}
                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                    styleBodyContent={{
                      borderBottomWidth: 1.5,
                      borderBottomColor: Colors.borderColor,
                      width: wide * 0.8
                    }}
                  // multiline
                  />

                </View> */}

              </View>



              {
                isHighSchool == false ?
                  <View style={{
                    marginTop: wide * 0.1,
                    width: '85%',
                    alignSelf: 'center',
                    // justifyContent: '',
                    // backgroundColor: 'red',
                    alignItems: 'flex-start',
                    // flexDirection: 'row'
                  }}>

                    <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10 }}
                      onPress={() => this.onClickCoaching()}
                    >
                      <AnimatedInput
                        placeholder="SELECT COACHING"
                        // onChangeText={(e) => this.setState({coachingType: e})}
                        value={selected_coachingType}
                        onFocus={() => this.onClickCoaching()}
                        showSoftInputOnFocus={false}
                        disabled={selected_coachingType !== "" && selected_coachingType != undefined ? true : false}
                        sufix={
                          <Image
                            style={{
                              width: 7,
                              height: 7,
                              position: 'absolute',
                              top:
                                Platform.OS === "android"
                                  ? 5
                                  : selected_coachingType != ""
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

                    <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10, marginTop: wide * 0.06 }}
                      onPress={() => Navigation.navigate("CoachTeamList")}>
                      <AnimatedInput
                        placeholder="SELECT TEAM"
                        onChangeText={(e) => this.setTextofFields('team', e)}
                        value={coachTeam.name}
                        onFocus={() => Navigation.navigate("CoachTeamList")}
                        disabled={coachTeam !== "" && coachTeam != undefined ? true : false}
                        showSoftInputOnFocus={false}
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

                  </View>
                  :
                  <View style={{
                    marginTop: wide * 0.1,
                    width: '85%',
                    alignSelf: 'center',
                    // alignItems: 'flex-start'
                  }}>
                    <View style={{
                      flexDirection: 'row', justifyContent: 'space-between',
                      alignItems: 'center',
                      // marginTop: wide * 0.08,
                      width: '100%',
                    }}>
                      <AnimatedInput
                        placeholder="TEAM NAME"
                        onChangeText={(e) => this.setState({ coachTeam: { "name": e }, teamName: e }, () => {
                          this.handleBtnEnable()
                        })}
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
                          width: wide * 0.4
                        }}
                      />

                      <TouchableOpacity onPress={() => this.setState({ openStateModal: true })} activeOpacity={1}>
                        <AnimatedInput
                          placeholder="STATE"
                          onChangeText={(e) => this.setTextofFields('school', e)}
                          value={selected_state}
                          disabled={selected_state !== "" && selected_state != undefined ? true : false}
                          onFocus={() => this.setState({ openStateModal: true })}
                          showSoftInputOnFocus={false}
                          sufix={
                            <Image
                              style={{
                                width: 7,
                                height: 7,
                                position: 'absolute',
                                top:
                                  Platform.OS === "android"
                                    ? 5
                                    : selected_state != ""
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

                    </View>

                    <View style={{
                      flexDirection: 'row',
                      marginTop: wide * 0.08,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      // alignSelf: 'center',
                      // backgroundColor: "red"
                    }}>


                      <TouchableOpacity onPress={() => this.setState({ openCityModal: true })}
                        activeOpacity={1}>
                        <AnimatedInput
                          placeholder="CITY"
                          onChangeText={(e) => this.setTextofFields('city', e)}
                          value={city}
                          showSoftInputOnFocus={false}
                          disabled={city !== "" && city != undefined ? true : false}
                          onFocus={() => this.setState({ openCityModal: true })}

                          sufix={
                            <Image
                              style={{
                                width: 7,
                                height: 7,
                                position: 'absolute',
                                top:
                                  Platform.OS === "android"
                                    ? 5
                                    : city != ""
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

                      <TouchableOpacity style={{ alignItems: 'center', }}
                        onPress={() => this.onClickAgeGroup()}
                      >
                        <AnimatedInput
                          placeholder="SELECT AGE"
                          editable={false}
                          onChangeText={(e) => this.setTextofFields('team', e)}
                          value={ageGroup}
                          onFocus={() => this.onClickAgeGroup()}
                          // disabled
                          disabled={ageGroup !== "" && ageGroup != undefined ? true : false}
                          showSoftInputOnFocus={false}
                          sufix={
                            <Image
                              style={{
                                width: 7,
                                height: 7,
                                position: 'absolute',
                                top:
                                  Platform.OS === "android"
                                    ? 5
                                    : ageGroup != ""
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
                            width: wide * 0.4
                          }}
                        // isAutoFocus={true}
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