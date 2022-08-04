
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, key,
  KeyboardAvoidingView, FlatList, StyleSheet, StatusBar, Button, Modal, ScrollView
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';

import { UserModel } from '../../constants/constant';
import { isNotch } from '../../utils/deviceInfo';
import moment from 'moment'
import { getObject } from '../../middleware';
import { getAdvanceStats } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import TeamStats from './Components/TeamStats';
import TeamVsCard from '../../components/common/TeamVsCard'
import TeamTable from '../../components/common/TeamTable';
import { BlurView } from '@react-native-community/blur';
import PlayGroundBox from "./Components/cort/PlayGroundBox";
import HeadingWithLine, { PlayerStatHeadingWithLine } from '../../components/common/HeadingWithLine'
import QuickBoxScoreTable from "./Components/QuickBoxScoreTable"
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel } from 'victory-native';


let wide = Layout.width;
let high = Layout.height;
let pageNum = 0;
const playGroundWidth = wide * 0.9;
const background = '#363A47';
const foreground = '#fff';
const shapeDefaultBG = '#85ADFF';


const redColor = '#FF5E5E';
const blueColor = '#85ADFF';
const yellow1Color = '#E0BD90';
const yellow2Color = '#FFD884';
const yellow3Color = '#FDB927';

class CoachGameStat extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      gameStatData: null,
      players: null,
      turnOverChartData: null,
      playerTurnOverChartData: null,
      teamDropdown: false,
      playerDropdown: false,
      selectedTeam: 'All Teams',
      selectedTeamId: 0,
      selectedPlayerName: 'All Players',
      selectedPlayer: null,
      selectedPlayerId: null,
      challengerKpiWithEachQuarter: null,
      defenderKpiWithEachQuarter: null,
      allKpiWithEachQuarter: null,
      allBoxScoreKpiList: null,
      defBoxScoreKpiList: null,
      challengerBoxScoreKpiList: null,
      playerBarChartData: null,

    };
  }
  componentDidMount() {
    this.onScreenFoucs();
  }

  onScreenFoucs = () => {
    // getObject('UserId').then((obj) => {
    // for data use teamp game id :-  165584356686406   165587356686406
    this.setState({ loading: true }, () => {
      this.props.dispatch(getAdvanceStats(165584356686406, (res, resData) => {
        if (res) {
          var arr = []
          var arr1 = []
          var arr2 = []
          if (resData != null) {
            debugger
            var challengerKpi = resData?.challengerKpiWithEachQuarter;
            var defenderKpi = resData?.defenderKpiWithEachQuarter;
            var allKpi = resData?.kpiWithEachQuarter;
            var challKpi = {}
            var defKpi = {}
            var allTeamKpi = {}
            challengerKpi.forEach((item, index) => {
              if (index == 0) {
                challKpi = item;
              }
              arr.push({ ...item, id: "#" + index })
            })
            defenderKpi.forEach((item, index) => {
              if (index == 0) {
                defKpi = item;
              }
              arr1.push({ ...item, id: "#" + index })
            })
            allKpi.forEach((item, index) => {
              if (index == 0) {
                allTeamKpi = item;
              }
              arr2.push({ ...item, id: "#" + index })
            })
            debugger

            var challKpiArr = []
            var defKpiArr = []
            var allKpiArr = []
            Object.keys(challKpi).map((key) => {
              let label = key;
              challKpiArr.push(label.toString())
            })
            Object.keys(defKpi).map((key) => {
              let label = key;
              defKpiArr.push(label.toString())
            })
            Object.keys(allTeamKpi).map((key) => {
              let label = key;
              allKpiArr.push(label.toString())
            })

          }
          debugger
          this.setState({
            loading: false,
            gameStatData: resData,
            turnOverChartData: resData?.turnoverChart,
            challengerKpiWithEachQuarter: arr,
            defenderKpiWithEachQuarter: arr1,
            allKpiWithEachQuarter: arr2,
            allBoxScoreKpiList: allKpiArr,
            defBoxScoreKpiList: defKpiArr,
            challengerBoxScoreKpiList: challKpiArr,
            // selectedTeam: resData?.recentGamesInfo?.challengerName,
            // players: resData?.challengerPlayerInfo
          })

        } else {
          this.setState({
            loading: false,
          })
        }
      }))
    })
    // })
  }

  renderRecentGames = (item, index) => {
    console.log("Itemm,", item);
    return (
      <TeamStats key={`game-${index}`} data={item.item} />
    )
  }

  teamChange = (value) => {
    const { gameStatData } = this.state;
    if (value == 0) {
      this.setState({
        // selectedTeam: value,
        selectedTeamId: value,
        players: null,
        selectedPlayer: 'All Players',
        selectedPlayerName: 'All Players'
      })
    } else if (value == 1) {
      this.setState({
        // selectedTeam: value,
        selectedTeamId: value,
        players: gameStatData?.challengerPlayerInfo,
        selectedPlayer: 'All Players',
        selectedPlayerName: 'All Players'
      })
    } else {
      this.setState({
        // selectedTeam: value,
        selectedTeamId: value,
        players: gameStatData?.defenderPlayerInfo,
        selectedPlayer: 'All Players',
        selectedPlayerName: 'All Players'
      })
    }
  }

  playerChange = (value) => {
    debugger
    console.log("valll", value)
    if (value != 'All Players') {
      var arr = []
      debugger
      if (Object.keys(value).length !== 0) {
        const statObj = value?.averageKpi;
        debugger
        for (const key in statObj) {
          arr.push({
            x: key,
            y: parseFloat(statObj[key])
          })
        }
      }
      debugger
      this.setState({
        playerBarChartData: arr,
        selectedPlayer: value,
        selectedPlayerName: value.playerName,
        selectedPlayerId: value.playerId,
        playerTurnOverChartData: value?.turnOverChartsValue
      })
    } else {
      this.setState({
        selectedPlayer: value, selectedPlayerName: value, selectedPlayerId: value,
        playerBarChartData: null, playerTurnOverChartData: null
      })
    }
  }

  render() {

    const { loading, gameStatData, turnOverChartData, teamDropdown, playerDropdown,
      selectedTeam, selectedPlayer, players, selectedPlayerName, selectedTeamId,
      challengerKpiWithEachQuarter, defenderKpiWithEachQuarter, allKpiWithEachQuarter,
      playerTurnOverChartData, challengerBoxScoreKpiList, defBoxScoreKpiList, allBoxScoreKpiList } = this.state;
    console.log("PlayerSelected...", selectedPlayer);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          <View style={{
            alignItems: 'center',
          }}>
            <View style={{
              width: '90%', flexDirection: 'row', alignItems: 'center',
              justifyContent: 'space-between', height: 50,
              marginBottom: 8,
              // backgroundColor: 'green'
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity style={{
                  width: wide * 0.1,
                  // marginHorizontal: 15
                }} onPress={() => Navigation.back()}>
                  <FastImage style={{
                    width: wide * 0.08, height: wide * 0.08,
                    borderRadius: wide * 0.02,
                    borderWidth: 1, borderColor: Colors.borderColor
                  }}
                    source={require('../../Images/back_ico.png')}
                  />
                </TouchableOpacity>
                <Text style={{
                  // marginTop: 16,
                  color: Colors.light, fontSize: 24,
                  fontFamily: Fonts.Bold, lineHeight: 40,
                  marginHorizontal: 10
                }}>
                  Game Statistics
                </Text>

              </View>
            </View>

          </View>
          {loading == true ?
            <View style={{ flex: 1, backgroundColor: Colors.base }}>
              <AppLoader visible={this.state.loading} />
            </View>
            :
            <>
              <ScrollView bounces={false} style={{ marginBottom: wide * 0.02 }}>
                {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}> */}
                <View style={{
                  flex: 1,
                  backgroundColor: Colors.base, alignItems: 'center',
                  // paddingBottom: wide * 0.01,
                }} >
                  <View style={{ marginTop: wide * 0.01, width: '90%' }}>
                    <TeamVsCard
                      leftTeamCaptain={gameStatData?.recentGamesInfo?.challengerName}
                      // leftTeamClubName={'Copper Kings'}
                      rightTeamCaptain={gameStatData?.recentGamesInfo?.defenderName}
                    // rightTeamClubName="Falcons"
                    />
                    <TeamTable response={gameStatData?.recentGamesInfo} />

                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                      <View style={{ width: '10%', height: 20 }} />
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '30%',
                          height: 25,
                          backgroundColor: Colors.lightBlue,
                          borderRadius: 5
                        }}
                        onPress={() => this.setState({ teamDropdown: true })}
                      >
                        <Text style={{
                          color: Colors.dark, fontSize: 12,
                          fontFamily: Fonts.Bold, lineHeight: 18,
                        }}>
                          {selectedTeam}
                        </Text>
                        <Image
                          style={{
                            width: wide * 0.03, height: wide * 0.02,
                            marginHorizontal: wide * 0.025,
                          }} source={require('../../Images/dropDownIconNew.png')}
                        />
                      </TouchableOpacity>
                      {/* <Button style={{ width: '10%' }} title={splayerselectedValue} /> */}
                      <View style={{ width: '20%', height: 20 }} />
                      {selectedTeam != null ?
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '30%',
                            height: 25,
                            backgroundColor: Colors.lightBlue,
                            borderRadius: 5
                          }}
                          onPress={() => {
                            if (selectedTeam != 'All Teams') {
                              this.setState({ playerDropdown: true })

                            }
                          }
                          }
                        >
                          <Text style={{
                            color: Colors.dark, fontSize: 12,
                            fontFamily: Fonts.Bold, lineHeight: 18,
                          }}>
                            {selectedPlayerName}
                          </Text>
                          <Image
                            style={{
                              width: wide * 0.03, height: wide * 0.02,
                              marginHorizontal: wide * 0.025,
                            }} source={require('../../Images/dropDownIconNew.png')}
                          />
                        </TouchableOpacity>
                        // <Button style={{ width: '10%' }} onPress={() => this.setState({ plDropWown: true })} title={splselectedValue} />
                        : null}



                      {teamDropdown === true ?
                        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={teamDropdown}
                        >
                          <TouchableOpacity
                            onPress={() => this.setState({ teamDropdown: false })}
                            style={{
                              width: wide,
                              height: high,
                              justifyContent: 'center', alignItems: 'center'
                            }}
                          >
                            <BlurView style={{
                              width: wide,
                              height: high,
                              position: 'absolute'
                              // justifyContent: 'center', alignItems: 'center'
                            }}
                              blurAmount={10}
                              blurRadius={10}
                            />
                            <View style={{
                              width: '80%', backgroundColor: Colors.ractangelCardColor,
                              marginTop: 20, borderRadius: 20, alignItems: 'center'
                            }}>
                              <View style={{
                                width: '100%', height: '15%', marginTop: 10,
                                alignItems: 'center', justifyContent: 'center',
                                // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                              }}>
                                <Text style={{
                                  color: Colors.light, fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                                }}>Select</Text>
                              </View>

                              <View style={{
                                justifyContent: 'space-between',
                                width: '80%', alignItems: 'center'
                              }}>
                                <TouchableOpacity style={{
                                  height: 20, alignItems: 'center',
                                  // backgroundColor: 'green',
                                  marginTop: 15
                                }}
                                  activeOpacity={1}
                                  onPress={() => {
                                    this.setState({
                                      selectedTeam: 'All Teams',
                                      teamDropdown: false
                                    }, () => {
                                      this.teamChange(0)
                                    })
                                  }}
                                >
                                  <Text style={{
                                    color: selectedTeam === 'All Teams' ? Colors.btnBg : Colors.light,
                                    fontFamily: Fonts.Bold,
                                    fontSize: 14, lineHeight: 16,

                                  }}>All Teams</Text>
                                </TouchableOpacity>

                              </View>

                              <View style={{
                                justifyContent: 'space-between',
                                width: '80%', alignItems: 'center'
                              }}>
                                <TouchableOpacity style={{
                                  height: 20, alignItems: 'center',
                                  // backgroundColor: 'green',
                                  marginTop: 15
                                }}
                                  activeOpacity={1}
                                  onPress={() => {
                                    this.setState({
                                      selectedTeam: gameStatData?.recentGamesInfo?.challengerName,
                                      teamDropdown: false
                                    }, () => {
                                      this.teamChange(1)
                                    })
                                  }}
                                >
                                  <Text style={{
                                    color: selectedTeam == gameStatData?.recentGamesInfo?.challengerName ? Colors.btnBg : Colors.light,
                                    fontFamily: Fonts.Bold,
                                    fontSize: 14, lineHeight: 16,

                                  }}>{gameStatData?.recentGamesInfo?.challengerName}</Text>
                                </TouchableOpacity>

                              </View>
                              <View style={{
                                justifyContent: 'space-between',
                                width: '80%', alignItems: 'center'
                              }}>
                                <TouchableOpacity style={{
                                  height: 20, alignItems: 'center',
                                  // backgroundColor: 'green',
                                  marginTop: 15
                                }}
                                  activeOpacity={1}
                                  onPress={() => {
                                    this.setState({
                                      selectedTeam: gameStatData?.recentGamesInfo?.defenderName,
                                      teamDropdown: false
                                    }, () => {
                                      this.teamChange(2)
                                    })

                                  }}
                                >
                                  <Text style={{
                                    color: selectedTeam === gameStatData?.recentGamesInfo?.defenderName ? Colors.btnBg : Colors.light,
                                    fontFamily: Fonts.Bold,
                                    fontSize: 14, lineHeight: 16,

                                  }}>{gameStatData?.recentGamesInfo?.defenderName}</Text>
                                </TouchableOpacity>

                              </View>

                            </View>

                            {/* </BlurView> */}
                          </TouchableOpacity>
                        </Modal>
                        : null
                      }

                      {playerDropdown === true ?
                        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={playerDropdown}
                        >
                          <TouchableOpacity
                            onPress={() => this.setState({ playerDropdown: false })}
                            style={{
                              width: wide,
                              height: high,
                              justifyContent: 'center', alignItems: 'center'
                            }}
                          >
                            <BlurView style={{
                              width: wide,
                              height: high,
                              position: 'absolute'
                              // justifyContent: 'center', alignItems: 'center'
                            }}
                              blurAmount={10}
                              blurRadius={10}
                            />

                            <View style={{
                              width: '80%', height: '70%',
                              backgroundColor: Colors.ractangelCardColor,
                              marginTop: 20, borderRadius: 20, alignItems: 'center',
                            }}>
                              <View style={{
                                width: '100%', height: '15%', marginTop: 10,
                                alignItems: 'center', justifyContent: 'center',
                                // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                              }}>
                                <Text style={{
                                  color: Colors.light, fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                                }}>Select</Text>
                              </View>

                              <ScrollView bounces={false}
                                showsVerticalScrollIndicator={false}
                                style={{ paddingBottom: 20, marginBottom: 15, width: '60%' }}
                                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                              >
                                <View style={{
                                  justifyContent: 'space-between',
                                  width: '80%', alignItems: 'center'
                                }}>
                                  <TouchableOpacity style={{
                                    height: 20, alignItems: 'center',
                                    width: '90%',
                                    marginTop: 10
                                  }}
                                    activeOpacity={1}
                                    onPress={() => {
                                      this.setState({
                                        selectedPlayer: 'All Players',
                                        playerDropdown: false
                                      }, () => {
                                        this.playerChange("All Players");
                                      })
                                    }}
                                  >
                                    <Text style={{
                                      color: selectedPlayer === "All Players" ? Colors.btnBg : Colors.light,
                                      fontFamily: Fonts.Bold,
                                      fontSize: 14, lineHeight: 16,

                                    }}>All Players</Text>
                                  </TouchableOpacity>

                                </View>

                                {players?.map(element =>
                                  <View style={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginVertical: 2,
                                    width: '90%',
                                  }}>
                                    <TouchableOpacity style={{
                                      height: 20, alignItems: 'center',
                                      // backgroundColor: 'green',
                                      marginTop: 15
                                    }}
                                      activeOpacity={1}
                                      onPress={() => {
                                        this.setState({
                                          selectedPlayer: element?.playerName,
                                          playerDropdown: false
                                        }, () => {
                                          this.playerChange(element);
                                        })
                                      }}
                                    >
                                      <Text style={{
                                        color: selectedPlayerName === element?.playerName ? Colors.btnBg : Colors.light,
                                        fontFamily: Fonts.Bold,
                                        fontSize: 14, lineHeight: 16,

                                      }}>{element.playerName}</Text>
                                    </TouchableOpacity>

                                  </View>
                                )}
                              </ScrollView>
                            </View>

                            {/* </BlurView> */}
                          </TouchableOpacity>
                        </Modal>
                        : null
                      }

                    </View>

                  </View>

                  {selectedPlayer != 'All Players' && selectedPlayer != null ?
                    <>
                      <View style={{ marginTop: 10, }}>
                        <PlayerStatHeadingWithLine heading={selectedPlayerName} />
                      </View>
                      <View style={{
                        width: '90%', alignItems: 'center', justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: wide * 0.04,
                        // backgroundColor: 'red'
                      }}>
                        <View style={{
                          width: wide * 0.28, height: wide * 0.28,
                          borderRadius: wide * 0.28 / 2,
                          borderWidth: 2,
                          borderColor: Colors.newGrayFontColor,
                          alignSelf: 'center',
                          // zIndex: 1,
                          justifyContent: 'center', alignItems: 'center',
                          backgroundColor: selectedPlayer.playerProfilePictureUrl == null ? '#272930' : null,
                          marginTop: wide * 0.02,
                        }}>
                          {selectedPlayer?.playerProfilePictureUrl != null ?
                            <FastImage
                              // key={this.state.randNum}
                              style={{
                                width: wide * 0.25, height: wide * 0.25,
                                borderRadius: wide * 0.25 / 2,
                              }}
                              source={{
                                uri: selectedPlayer?.playerProfilePictureUrl,
                                priority: FastImage.priority.high,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            :
                            <></>
                          }
                        </View>
                        <Text style={{
                          color: Colors.light,
                          fontFamily: Fonts.SemiBold,
                          fontSize: 18, lineHeight: 24,
                          // fontWeight: '400',
                          marginTop: wide * 0.02,

                        }}>{selectedPlayer?.playerName}</Text>

                        {this.state.playerBarChartData != null ?
                          <View style={{
                            // marginTop: wide * 0.06,
                            // backgroundColor: 'green',
                            width: '90%'
                            // marginHorizontal: 24,s
                          }}>
                            <PlayerStats barData1={this.state.playerBarChartData} />
                          </View>
                          : <></>
                        }
                      </View>
                    </>
                    :
                    gameStatData != null ?
                      <>
                        <View style={{ marginTop: 10, }}>
                          <HeadingWithLine heading={selectedTeam} teamId={selectedTeamId} />
                        </View>
                        <View style={{ width: '90%', alignItems: 'center', marginTop: wide * 0.04 }}>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false}
                          // bounces={false}
                          >

                            <QuickBoxScoreTable
                              teamId={selectedTeamId}
                              response={gameStatData}
                              heading={selectedTeamId == 0 ? "All teams" : selectedTeamId == 1 ? gameStatData?.recentGamesInfo?.challengerName : gameStatData?.recentGamesInfo?.defenderName}
                              data={selectedTeamId == 0 ? allKpiWithEachQuarter : selectedTeamId == 1 ? challengerKpiWithEachQuarter : defenderKpiWithEachQuarter}
                              kpiList={selectedTeamId == 0 ? allBoxScoreKpiList : selectedTeamId == 1 ? challengerBoxScoreKpiList : defBoxScoreKpiList}
                            />
                          </ScrollView>
                        </View>
                      </>
                      : <></>

                  }
                  <View style={{
                    marginBottom: wide * 0.04,
                    marginTop: selectedPlayer == "All Players" ? wide * 0.02 : 0,
                  }}>
                    {turnOverChartData ?
                      <HeadingWithLine heading={'Turnover Chart'}
                        containerStyle={{ marginTop: selectedPlayer !== "All Players" && selectedPlayer != null ? 5 : 24, }} />
                      : <></>
                    }
                  </View>
                  <View style={{ marginTop: wide * 0.04, }}>
                    {selectedPlayer == 'All Players' || selectedPlayer == null ?
                      turnOverChartData ? renderPlayground(turnOverChartData) : null
                      :
                      playerTurnOverChartData ? renderPlayground(playerTurnOverChartData) : null
                    }
                  </View>




                </View>

                {/* </KeyboardAvoidingView> */}
              </ScrollView>

            </>
          }
        </SafeAreaView >
      </View>

    );

    function renderPlayground(values) {
      return <PlayGroundBox

        // configs
        width={playGroundWidth}
        background={background}
        forground={foreground}
        shapeBG={shapeDefaultBG}

        // text
        // shapeTwoText={values?.COURT_1}
        shapeTwoText={values?.COURT_7}
        // shapeFourText={values?.COURT_2}
        shapeFourText={values?.COURT_13}
        // shapeLeftCurveText={values?.COURT_3}
        shapeLeftCurveText={values?.COURT_2}
        // shapeRightCurveText={values?.COURT_4}
        shapeRightCurveText={values?.COURT_5}
        // shapeLeftCurve2Text={values?.COURT_5}
        shapeLeftCurve2Text={values?.COURT_8}
        // shapeRightCurve2Text={values?.COURT_6}
        shapeRightCurve2Text={values?.COURT_11}
        // shapeCenterCircleHolderText={values?.COURT_7}
        shapeCenterCircleHolderText={values?.COURT_9}
        // shapeCenterCircleText={values?.COURT_8}
        shapeCenterCircleText={values?.COURT_10}
        shapeHolderLeftText={values?.COURT_3}
        shapeHolderRightText={values?.COURT_4}
        // shapeZeroText={values?.COURT_11}
        shapeZeroText={values?.COURT_1}
        shapeRightHTopText={values?.COURT_12}
        // shapeRightVTopText={values?.COURT_13}
        shapeRightVTopText={values?.COURT_6}

        // text color
        shapeTwoTextColor={foreground}
        shapeFourTextColor={foreground}
        shapeLeftCurveTextColor={foreground}
        shapeRightCurveTextColor={foreground}
        shapeLeftCurve2TextColor={foreground}
        shapeRightCurve2TextColor={foreground}
        shapeCenterCircleHolderTextColor={foreground}
        shapeCenterCircleTextColor={foreground}
        shapeHolderLeftTextColor={foreground}
        shapeHolderRightTextColor={foreground}
        shapeZeroTextColor={foreground}
        shapeRightHTopTextColor={foreground}
        shapeRightVTopTextColor={foreground}

        // background color
        shapeTwoBGColor={yellow3Color}
        shapeFourBGColor={blueColor}
        shapeLeftCurveBGColor={redColor}
        shapeRightCurveBGColor={blueColor}
        shapeLeftCurve2BGColor={yellow2Color}
        shapeRightCurve2BGColor={blueColor}
        shapeCenterCircleHolderBGColor={redColor}
        shapeCenterCircleBGColor={redColor}
        shapeHolderLeftBGColor={redColor}
        shapeHolderRightBGColor={redColor}
        shapeZeroBGColor={redColor}
        shapeRightHTopBGColor={blueColor}
        shapeRightVTopBGColor={yellow1Color}

      />
    }
  }
}


const PlayerStats = ({ barData1 }) => {
  // console.log("----sjsjks", barData1)
  return (
    <View>
      <VictoryChart
        width={300}
        height={barData1.length <= 2 ? 100 : barData1.length <= 3 ? 150 : barData1.length <= 5 ? 220 :
          barData1.length <= 8 ? 300 :
            barData1.length <= 10 ? 400 : barData1.length <= 15 ? 570 : barData1.length <= 18 ? 650 : 750}

        padding={{ left: 50, right: 20, bottom: 50, top: 20 }}
        domainPadding={{ x: 20, y: 0, }}
      // minDomain={{ x: 10, y: 10 }}
      >
        <VictoryGroup
          // offset={5}
          colorScale={'qualitative'}
        >
          <VictoryBar
            horizontal
            // padding={{ top: 10, left: 5 }}
            data={barData1}
            // animate={{
            //     duration: 2000,
            //     onLoad: { duration: 1000 },
            // }}
            labels={({ datum }) => `${datum.y.toString()}`}
            labelComponent={<VictoryLabel dy={0} dx={5} style={{ fill: '#D8A433', }} />}
            style={{
              data: {
                fill: '#D8A433',
              },

            }}
            barWidth={12}

          />

        </VictoryGroup>
        <VictoryAxis
          offsetX={40}
          style={{
            tickLabels: {
              fill: Colors.light, fontSize: 12, lineHeight: 16,
              // padding: 15, 
              fontFamily: Fonts.Bold
            },
            axis: { stroke: Colors.base, }
          }}

        />
      </VictoryChart>
    </View>

  )
}

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    User: entities.user,
    Home: entities.home
  };
}

const styles = StyleSheet.create({
  BackIcon: {
    width: wide * 0.09, height: wide * 0.09,
    marginTop: 20, borderRadius: wide * 0.03, borderWidth: 1,
    borderColor: Colors.borderColor, marginHorizontal: 10
  },
  headerText: {

    color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold

  },
  mediumHeaderText: {

    color: Colors.light, fontSize: 25, lineHeight: 26, fontFamily: Fonts.SemiBold

  },
  textPoint: {
    color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold,
    marginTop: 6,
  },
  textPointHeading: {
    color: Colors.fontColorGray, fontSize: 17, fontFamily: Fonts.SemiBold,
  },
  textPointCenter: {
    color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
    marginTop: 6, textAlign: 'center'
  },
});

export default connect(mapStateToProps)(CoachGameStat);
