
// New coach profile design    By Keshav
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Platform, StyleSheet, Modal } from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';

import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { AirbnbRating } from 'react-native-ratings';
import { getObject } from '../../middleware';
import { getCoachDashboard, getPlayersForCoachProfile } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import { VictoryPie, VictoryChart, VictoryAxis } from 'victory-native'
import { DropDown } from '../../components/common/dropDown'
// import ShareMenu from 'react-native-share-menu';
import { SHOW_SHARE_SCREEN } from '../../constants/constant';
import { Title } from '../../components/common/titleLabel'
import { BlurView } from "@react-native-community/blur";

let wide = Layout.width;
let high = Layout.height;
var pageNum = 1
var showShareWindow = false;

class CoachNewProfile extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      arrPlayers: [],
      dropDownSelectedVal: null,
      teamDropDownSelectedVal: null,
      pieChartData: [],
      totalMatches: null,
      teamDropDownData: [],
      sharedData: '',
      sharedMimeType: '',
      sharedExtraData: null,
      showSessionModal: false,

    };
  }

  handleShare = (item) => {
    debugger
    if (!item) {
      return;
    }
    debugger
    const { mimeType, data, extraData } = item;
    this.setState({ sharedData: data, sharedMimeType: mimeType, sharedExtraData: extraData });
    SHOW_SHARE_SCREEN.show = true;
  }

  componentDidMount() {
    pageNum = 1
    debugger

    // ShareMenu.getInitialShare(this.handleShare);
    // const listener = ShareMenu.addNewShareListener(this.handleShare);
    // this.props.navigation.addListener('didFocus', this.onScreenFocus)
    // return () => {
    //     listener.remove();
    // };
  }


  onScreenFocus = () => {
    // this.getPlayers()
    debugger;

    getObject('UserId').then((obj) => {
      this.setState({ loading: true }, () => {
        debugger;
        this.props.dispatch(getCoachDashboard(obj, (res) => {
          if (res) {
            const { coachDash } = this.props.Home;
            console.log('oooana', coachDash.seasonList[0])
            if (coachDash.teamDetailInfo !== null) {
              this.setState({ dropDownSelectedVal: coachDash.seasonList[0] }, () => {
                this._filterPieChartData(coachDash.teamDetailInfo);
              })
            }

          }
          // this.setState({

          // })
        }))
      })

    })

  }
  getPlayers = () => {
    // if (!this.state.isDataAllFetched) {
    getObject('UserId').then((obj) => {
      // this.setState({ loading: true }, () => {
      this.props.dispatch(getPlayersForCoachProfile(obj, pageNum, (res, resData) => {
        console.log(resData);
        // if (resData.length === 0) {
        //   this.setState({ isDataAllFetched: true })
        // }
        if (this.state.arrPlayers.length > 0) {
          debugger
          this.setState({ loading: false, arrPlayers: [...this.state.arrPlayers, ...resData] })
        } else {
          debugger
          this.setState({ loading: false, arrPlayers: resData })
        }
      }))
    })

    // })
    //}
  }

  _filterPieChartData = (data) => {
    const { dropDownSelectedVal } = this.state;
    console.log("--drrr", dropDownSelectedVal);
    var arr = [];
    var teamArr = [];
    var tot = 0;
    data.forEach(obj => {
      if (obj.season === dropDownSelectedVal) {
        if (obj.stats !== null) {
          if (obj.stats.hasOwnProperty('wins')) {
            arr.push(obj.stats.wins);
            tot = tot + obj.stats.wins;
          }
          if (obj.stats.hasOwnProperty('loss')) {
            arr.push(obj.stats.loss);
            tot = tot + obj.stats.loss;
          }
          if (obj.stats.hasOwnProperty('draw')) {
            arr.push(obj.stats.draw);
            tot = tot + obj.stats.draw;
          }
        }
        teamArr.push(obj.teamName)
      }
    });
    this.setState({ pieChartData: arr, totalMatches: tot, teamDropDownData: teamArr, showSessionModal: false, loading: false })

  }


  _renderHotPlayers = ({ item, index }) => {
    debugger;
    if (item !== null) {
      return (

        <TouchableOpacity style={{
          marginLeft: 15,
          justifyContent: 'center',
          alignItems: 'center', //paddingRight: wide * 0.05
        }}
          activeOpacity={1}
          onPress={() => Navigation.navigate('PlayerProfile', { playerId: item.id })}
        >


          <View style={{
            width: wide * 0.32, height: wide * 0.4,
            marginTop: wide * 0.04, borderRadius: 10, borderWidth: 3,
            borderColor: Colors.borderColor,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <FastImage style={{ width: '95%', height: '95%', borderRadius: 5 }} resizeMode={'cover'}
              source={{ uri: item.imageUrl }} />

          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>

            <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 9, marginLeft: 5 }}>Rank {item.rank}</Text>
            {
              item.improved === true ?
                <Image
                  source={require("../../Images/upArrow.png")}
                  // resizeMode="contain"
                  style={{ width: wide * 0.02, height: wide * 0.02, marginLeft: 5 }}
                ></Image>
                :
                <Image
                  source={require("../../Images/downArrow.png")}
                  // resizeMode="contain"
                  style={{ width: wide * 0.02, height: wide * 0.02, marginLeft: 5 }}
                ></Image>
            }

          </View>

        </TouchableOpacity>
      );
    }
  };
  _renderPhotos = ({ item }) => {
    return (
      <TouchableOpacity style={{
        width: wide * 0.32, height: wide * 0.4,
        justifyContent: 'center', alignItems: 'center',
      }}
      // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
      >
        <View style={{
          // borderWidth: 1,
          margin: 5,
          flex: 1,
          // borderColor: Colors.lightGray,
          justifyContent: 'center', alignItems: 'center',
          //  backgroundColor: Colors.btnBg,

          shadowColor: Colors.lightGray,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1.0, width: '90%',
        }}>

          {
            <Image
              source={require("../../Images/avatar.png")}
              //resizeMode="stretch"
              style={{ width: '100%', height: '100%' }}
            ></Image>
          }

        </View>


      </TouchableOpacity>
    );
  };
  _renderHighlights = ({ item }) => {
    debugger;
    return (
      <TouchableOpacity style={{
        width: wide * 0.25, height: wide * 0.25,
        justifyContent: 'center', alignItems: 'center',
      }}
      // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
      >
        <View style={{
          // borderWidth: 1,
          margin: 5,
          flex: 1,
          // borderColor: Colors.lightGray,
          justifyContent: 'center', alignItems: 'center',
          // backgroundColor: Colors.btnBg,
          borderRadius: (wide * 0.22) / 2,
          shadowColor: Colors.lightGray,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1.0, width: '80%', height: '80%'
        }}>

          {
            <FastImage
              source={{ uri: item.imageUrl }}
              // resizeMode="contain"
              style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
            ></FastImage>
          }

        </View>
        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // recent player
  _renderRecentPlayer = ({ item }) => {
    debugger;
    return (
      <TouchableOpacity style={{
        width: wide * 0.25, height: wide * 0.25,
        alignItems: 'center', justifyContent: 'center',
      }}
      // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
      >
        <View style={{
          borderWidth: 2,
          margin: 5,
          flex: 1,
          borderColor: Colors.gameTabCardBg,
          justifyContent: 'center', alignItems: 'center',
          // backgroundColor: Colors.btnBg,
          borderRadius: (wide * 0.22) / 2,
          shadowColor: Colors.lightGray,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1.0, width: '80%', height: '80%'
        }}>

          {
            <FastImage
              source={{ uri: item.playerProfilePictureUrl }}
              style={{ width: '95%', height: '95%', borderRadius: (wide * 0.22) / 2, }}
            ></FastImage>
          }

        </View>
        <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 10, lineHeight: 12 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // Upcoming match
  _renderListOfUpcomingMatches = ({ item }) => {
    const d = new Date(item.scheduledAt);
    console.log(moment((new Date(item.scheduledAt))).format('DD'));
    return (
      <>
        <TouchableOpacity style={{
          backgroundColor: Colors.gameTabCardBg,
          justifyContent: 'center',
          alignItems: 'center', marginRight: wide * 0.05, borderRadius: 10, paddingHorizontal: 15,
          marginTop: wide * 0.03, width: wide * 0.6
        }}
          activeOpacity={1}
          onPress={() => Navigation.navigate('GamesRecentTab', { 'gameId': item.id })}
        >
          <View style={{
            marginTop: 24,
            flexDirection: 'row', alignItems: 'center'
          }}>
            {/* edit by keshav */}
            <View style={{
              width: wide * 0.2, height: wide * 0.2,
              backgroundColor: Colors.light, borderRadius: wide * 0.2 / 2,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <FastImage style={{ width: wide * 0.14, height: wide * 0.13, }} resizeMode={'contain'}
                resizeMode={'contain'} source={{ uri: item.challengerTeamInfo.logoUrl }} />

            </View>
            <Text style={{
              color: Colors.light, fontSize: 22, fontFamily: Fonts.BoldItalic,
              lineHeight: 24, paddingHorizontal: 10

            }}>VS</Text>
            <View style={{
              width: wide * 0.2, height: wide * 0.2,
              backgroundColor: Colors.light, borderRadius: wide * 0.2 / 2,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <FastImage style={{ width: wide * 0.14, height: wide * 0.13, }}
                resizeMode={'contain'} source={{ uri: item.defenderTeamInfo.logoUrl }} />
            </View>

          </View>

          <Text style={{
            color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
            lineHeight: 24, paddingBottom: 10, marginTop: 5
          }}>{moment((new Date(item.scheduledAt))).format('DD')}  {moment((new Date(item.scheduledAt))).format('MMM')}</Text>
        </TouchableOpacity>
      </>
    );
  };

  _renderSessionList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          height: 50, marginTop: 10, borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
        }}
        onPress={() => this.setState({ dropDownSelectedVal: item.item.session }, () => {
          const { coachDash } = this.props.Home;
          this._filterPieChartData(coachDash.teamDetailInfo);
        })}
      >
        <Text style={{
          color: Colors.light, fontSize: 13, lineHeight: 14,
          fontFamily: Fonts.Bold,
        }}>{item.item.session}</Text>

      </TouchableOpacity>
    )
  }

  render() {
    debugger
    const { coachDash } = this.props.Home
    const { arrPlayers, pieChartData, teamDropDownData, sharedData, sharedMimeType, dropDownSelectedVal } = this.state
    // console.log(coachDash);
    // console.log(coachDash.profilePictureUrl)
    console.log('show----> ', pieChartData);

    let android_Profile = <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
      minHeight: isNotch ? Layout.height - 100 : Layout.height - 80,
      paddingBottom: isNotch ? 30 : 40,
    }}>
      <View style={{ flex: 1, }}>
        <View style={{ marginHorizontal: 15, }} >


          <View style={{
            flexDirection: 'row',
            marginTop: wide * 0.06,
            // backgroundColor: 'red'

          }}>
            <View>
              <Text style={{
                color: Colors.light, fontSize: 30,
                lineHeight: 36, fontFamily: Fonts.Bold,
              }}>
                {coachDash.firstName} {coachDash.lastName}
              </Text>

            </View>

            <View style={{ flex: 1 }} />

            <View style={{
              width: wide * 0.12,
              justifyContent: 'space-between', alignItems: 'center'
            }}>
              <TouchableOpacity
                // onPress={() => { Navigation.navigate('MessageList') }} 
                onPress={() => { Navigation.navigate('Calender') }}
              >
                <Image style={{
                  width: 20, height: 20,
                  tintColor: Colors.light
                }} source={require('../../Images/newCalenderIcon.png')} />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }}>
                                <Image style={{
                                    width: 20, height: 20,
                                    tintColor: Colors.light
                                }} source={require('../../Images/edit.png')} />
                            </TouchableOpacity> */}
            </View>
          </View>
          <View style={{ flexDirection: 'row', }}>
            {coachDash.verified === true ? <Image style={{
              // position: 'absolute',
              // right: -6,
              width: 20, height: 20, //zIndex: 1
            }} source={require('../../Images/sort_tick_selected.png')} />
              : null
            }
            <Text style={{
              color: Colors.overlayWhite,
              fontSize: 14, lineHeight: 16,
              fontFamily: Fonts.Regular,
              marginTop: 5, fontStyle: 'italic', marginHorizontal: wide * 0.03
            }}>
              {coachDash.certificateName}
            </Text>
          </View>

          <View style={{
            width: wide * 0.32, height: wide * 0.32,
            borderRadius: wide * 0.32 / 2, borderWidth: 4,
            borderColor: Colors.borderColor,
            alignSelf: 'center', zIndex: 1,
            justifyContent: 'center', alignItems: 'center'
          }}>
            {coachDash.profilePictureUrl !== null ?
              <FastImage style={{
                width: wide * 0.28, height: wide * 0.28,

                borderRadius: wide * 0.28 / 2,
                //  borderWidth: 4,
                // borderColor: Colors.borderColor
              }}
                resizeMode='contain'
                source={{ uri: coachDash.profilePictureUrl }}
              />
              : null
            }

            {/* <TouchableOpacity style={{
                            width: wide * 0.3, height: wide * 0.2,
                            bottom: 0, position: 'absolute', alignItems: 'center'
                        }}>
                            <Image style={{
                                width: '96%', height: '96%',
                            }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
                            <View style={{ marginTop: -wide * 0.06 }}>
                                <AirbnbRating
                                    ratingColor={Colors.stars}
                                    isDisabled={true}
                                    size={12}
                                    showRating={false}
                                    selectedColor={Colors.stars}

                                    defaultRating={coachDash.ratings}

                                />
                            </View>
                        </TouchableOpacity> */}

          </View>

          <View style={{ marginTop: -wide * 0.09 }}>
            <Image style={{
              position: 'absolute', top: -wide * 0.07, left: 0, right: 0, width: '100%',
              height: 250,

            }} resizeMode={'contain'} source={require('../../Images/Rectangle_Copy.png')} />
            <View style={{
              marginTop: wide * 0.095,
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              width: '90%', marginHorizontal: wide * 0.045,
              height: wide * 0.1
            }}>
              <View>
                <AirbnbRating
                  ratingColor={Colors.stars}
                  isDisabled={true}
                  size={12}
                  showRating={false}
                  selectedColor={Colors.stars}

                  defaultRating={coachDash.ratings}

                />
              </View>
              <Text style={{
                color: Colors.light,
                fontFamily: Fonts.Bold, fontSize: 20, lineHeight: 15,
                opacity: 0.4, width: wide * 0.025,

              }}>.</Text>
              <Text style={{
                color: Colors.light,
                fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 20,
                alignSelf: 'center', textAlign: 'center',
                opacity: 0.4
              }}>
                Exp - 7 years
                {/* {coachDash.title} */}
              </Text>
              <Text style={{
                color: Colors.light,
                fontFamily: Fonts.Bold, fontSize: 20, lineHeight: 15,
                opacity: 0.4, width: wide * 0.025,
              }}>.</Text>
              <Text style={{
                color: Colors.light,
                fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 20,
                alignSelf: 'center', textAlign: 'center',
                opacity: 0.4
              }}>
                500+ connects
                {/* {coachDash.title} */}
              </Text>
            </View>

            <View style={{ width: '90%', marginHorizontal: wide * 0.045, }}>
              <Text style={{
                color: Colors.light,
                fontFamily: Fonts.Regular, fontSize: 12, lineHeight: 14,
                alignSelf: 'center',
                textAlign: 'center', marginTop: wide * 0.01, opacity: 0.4
              }}>{coachDash.aboutMe}</Text>

            </View>

            {coachDash.teamDetailInfo !== null ?
              <View style={{ top: 20, width: '90%', left: 20, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={coachDash.teamDetailInfo}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={(item, index) =>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around', alignItems: "center",
                      width: wide * 0.3, marginHorizontal: 15
                    }}>
                      <FastImage
                        style={{ height: wide * 0.07, width: wide * 0.07 }}
                        source={{ uri: item.item.teamLogoUrl }}
                      />
                      <Text style={{
                        color: '#8B8D94',
                        fontFamily: Fonts.Regular, fontSize: 15, lineHeight: 20,

                      }}>
                        La Lakers
                      </Text>
                    </View>

                  }



                />
              </View>
              : null
            }




          </View>
        </View>
        {coachDash?.teamDetailInfo !== null && coachDash?.teamDetailInfo?.length > 0 ?
          <View style={{
            flexDirection: 'row', marginTop: wide * 0.18, height: wide * 0.15,
            width: '90%', alignItems: 'center', marginHorizontal: wide * 0.06,
            // backgroundColor: 'red'
          }}>
            <View style={{ justifyContent: 'space-evenly', width: '40%', }}>
              <Text style={{
                color: Colors.light,
                fontFamily: Fonts.Bold, fontSize: 10, lineHeight: 12
              }}>Team:</Text>

              <TouchableOpacity
                style={{
                  marginTop: 10, flexDirection: 'row', height: '50%',
                  alignItems: 'center', width: '80%',
                }}
                activeOpacity={1}
              >
                <Text style={{
                  color: Colors.light,
                  fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16
                }}>LA Lakers</Text>
                <Image
                  style={{
                    width: wide * 0.035, height: wide * 0.025, marginHorizontal: wide * 0.04
                  }} source={require('../../Images/dropDownIconNew.png')} />
              </TouchableOpacity>

              {/* <DropDown
                            dropData={coachDash.seasonList}
                            onSelectionChange={(val) =>
                                this.setState({ dropDownSelectedVal: val }, () => {
                                    this._filterPieChartData(coachDash.teamDetailInfo);
                                })
                            }
                        /> */}
            </View>
            <View style={{ justifyContent: 'space-evenly', width: '40%', marginHorizontal: wide * 0.1 }}>
              <Text style={{
                color: Colors.light,
                fontFamily: Fonts.Bold, fontSize: 10, lineHeight: 12
              }}>Session:</Text>

              <TouchableOpacity
                style={{
                  marginTop: 10, flexDirection: 'row', height: '50%',
                  alignItems: 'center', width: '80%',
                }}
                activeOpacity={1}
                onPress={() => this.setState({ showSessionModal: true })}
              >
                <Text style={{
                  color: Colors.light,
                  fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16
                }}>{dropDownSelectedVal}</Text>
                <Image
                  style={{
                    width: wide * 0.035, height: wide * 0.025, marginHorizontal: wide * 0.04
                  }} source={require('../../Images/dropDownIconNew.png')} />
              </TouchableOpacity>

              {/* <DropDown
                            dropData={coachDash.seasonList}
                            onSelectionChange={(val) =>
                                this.setState({ dropDownSelectedVal: val }, () => {
                                    this._filterPieChartData(coachDash.teamDetailInfo);
                                })
                            }
                        /> */}
            </View>
          </View>
          : null
        }
        {coachDash?.teamDetailInfo !== null && coachDash?.teamDetailInfo?.length > 0 ?
          <View style={{
            width: '90%', height: wide * 0.65,
            marginTop: wide * 0.1, marginHorizontal: wide * 0.05,
            flexDirection: 'row', justifyContent: "space-between",
            // backgroundColor: 'red'
          }}>
            {this.state.totalMatches !== null && this.state.totalMatches > 0 ?
              <View style={{
                position: 'absolute', top: wide * 0.18, left: wide * 0.15,
                alignItems: 'center', justifyContent: 'center', width: wide * 0.25, height: wide * 0.15,
              }}>
                <Text style={{
                  color: Colors.light,
                  fontFamily: Fonts.Bold, fontSize: 20, lineHeight: 24,

                }}>{this.state.totalMatches}</Text>
                <Text style={{
                  color: Colors.light,
                  fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 14
                }}>Total Games</Text>
              </View>
              : null
            }
            {pieChartData !== null && pieChartData !== undefined ?
              <View style={{ width: '60%', right: wide * 0.09, bottom: wide * 0.08 }}>


                <VictoryChart
                  width={300}
                  height={280}
                >
                  <VictoryPie
                    colorScale={["#246BFD", "#CE1141", "#FDB927",]}
                    standalone={false}
                    width={200} height={200}
                    innerRadius={60}
                    data={pieChartData}
                    style={{
                      labels: { display: "none" }
                    }}
                  />
                  <VictoryAxis style={{
                    axis: { stroke: "transparent" },
                    ticks: { stroke: "transparent" },
                    tickLabels: { fill: "transparent" }
                  }} />
                  <VictoryAxis dependentAxis style={{
                    axis: { stroke: "transparent" },
                    ticks: { stroke: "transparent" },
                    tickLabels: { fill: "transparent" }
                  }} />
                </VictoryChart>

              </View>
              : null
            }
            <View style={{ width: '30%', justifyContent: 'space-around', marginRight: wide * 0.03 }}>
              {/* <View style={{ marginTop: 10, height: '20%', justifyContent: 'space-evenly' }}>
                                <Text style={{
                                    color: Colors.light,
                                    fontFamily: Fonts.Bold, fontSize: 10, lineHeight: 12
                                }}>Session:</Text>
                                <DropDown
                                    dropData={coachDash.seasonList}
                                    onSelectionChange={(val) =>
                                        this.setState({ dropDownSelectedVal: val }, () => {
                                            this._filterPieChartData(coachDash.teamDetailInfo);
                                        })
                                    }
                                />
                            </View>
                            <View style={{ height: '20%', justifyContent: 'space-evenly' }}>
                                <Text style={{
                                    color: Colors.light,
                                    fontFamily: Fonts.Bold, fontSize: 10, lineHeight: 12
                                }}>Team:</Text>
                                <DropDown
                                    dropData={["Golden Figma", "Golden Slack"]}
                                    onSelectionChange={(val) =>
                                        this.setState({ teamDropDownSelectedVal: val }, () => {
                                            this._filterPieChartData(coachDash.teamDetailInfo);
                                        })
                                    }
                                />
                            </View> */}

              <View style={{ justifyContent: 'space-between', alignItems: 'center', height: '25%', }}>
                {pieChartData !== undefined && pieChartData.length > 0 ?
                  <>
                    <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', }}>
                      <>
                        <View style={{ width: 28, height: 2, backgroundColor: '#246BFD' }}></View>
                        <Text style={{
                          color: '#246BFD', fontSize: 12, lineHeight: 12,
                          fontFamily: Fonts.Bold, marginHorizontal: 10
                        }}>{pieChartData[0]} Wins</Text>
                      </>

                    </View>
                    <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', }}>
                      <>
                        <View style={{ width: 28, height: 2, backgroundColor: '#CE1141' }}></View>
                        <Text style={{
                          color: '#CE1141', fontSize: 12, lineHeight: 12,
                          fontFamily: Fonts.Bold, marginHorizontal: 10
                        }}>{pieChartData[1]} Losses</Text>
                      </>

                    </View>

                    <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', }}>
                      {pieChartData.length > 2 ?
                        <>
                          <View style={{ width: 28, height: 2, backgroundColor: '#FDB927' }}></View>
                          <Text style={{
                            color: '#FDB927', fontSize: 12, lineHeight: 12,
                            fontFamily: Fonts.Bold, marginHorizontal: 10
                          }}>{pieChartData[2]} Draw</Text>
                        </>
                        : null
                      }

                    </View>
                  </>
                  : null
                }


              </View>



            </View>


          </View>
          : null
        }
        {coachDash.recentGames !== null && coachDash?.recentGames?.length > 0 ?
          <>
            <Title data={'Upcoming Gamess'} />
            <View style={{
              backgroundColor: Colors.base, marginLeft: 15, marginTop: coachDash.teamDetailInfo !== null &&
                coachDash?.teamDetailInfo?.length > 0 ? wide * 0.08 : wide * 0.18,
            }}>
              {/* <Text style={{
                            color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24,
                        }}>Upcoming Games</Text> */}

              <View style={{ flexDirection: 'row', marginTop: wide * 0.01 }}>

                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  style={{ overflow: 'visible' }}
                  // data={upcomingGame}
                  data={coachDash.recentGames}
                  renderItem={(item, index) => this._renderListOfUpcomingMatches(item, index)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>


            </View>
          </>
          : null
        }



        {coachDash?.teamPlayersInfo !== null && coachDash?.teamPlayersInfo !== undefined && coachDash?.teamPlayersInfo?.length !== 0 ?
          <View style={{
            backgroundColor: Colors.base, marginLeft: 15, marginTop: coachDash.recentGames !== null && coachDash.recentGames.length > 0 ? wide * 0.08 :
              coachDash.teamDetailInfo !== null && coachDash.teamDetailInfo.length > 0 ? wide * 0.18 : wide * 0.28,
          }}>

            <Text style={{
              color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24
            }}>Recent Players</Text>

            <View style={{ marginTop: wide * 0.02, }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                style={{ overflow: 'scroll', marginLeft: -10 }}
                data={coachDash.teamPlayersInfo}
                renderItem={(item, index) => this._renderRecentPlayer(item, index)}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            {/* // : null} */}

          </View>
          : null
        }

      </View>

    </ScrollView >




    return (
      coachDash.length === 0 ?
        <View style={{ flex: 1, backgroundColor: Colors.base }}>
          {/* <AppLoader visible={this.state.loading} /> */}
        </View>
        :
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
          <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>

            {SHOW_SHARE_SCREEN.show === true ?
              Navigation.navigate('ShareScreen', { shareData: sharedData, shareMimeType: sharedMimeType })
              :

              android_Profile
            }
          </KeyboardAvoidingView>
          {this.state.showSessionModal === true ?
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.showSessionModal}
            >
              <TouchableOpacity
                onPress={() => this.setState({ showSessionModal: false })}
              >


                <BlurView style={{
                  width: wide,
                  height: high - 80,
                  justifyContent: 'center', alignItems: 'center'
                  // backgroundColor: '#272930',
                }}
                  // blurType="light"
                  blurAmount={1}
                >
                  <View style={{
                    width: '60%', height: wide * 0.5, backgroundColor: Colors.ractangelCardColor,
                    marginTop: 20, borderRadius: 20, alignItems: 'center'
                  }}>
                    {/* <View style={{
                                        width: '90%', height: '10%', marginTop: 10,
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            color: Colors.light, fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                                        }}>Select</Text>
                                    </View> */}

                    <View style={{ width: '80%', height: '80%' }}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{ overflow: 'visible', flex: 1 }}
                        data={[{ session: '2020-21' }, { session: '2019-20' }]}
                        // data={coachDash.recentGames}
                        renderItem={(item, index) => this._renderSessionList(item, index)}
                      />
                    </View>


                  </View>

                </BlurView>
              </TouchableOpacity>
            </Modal>
            : null
          }

        </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(CoachNewProfile);








