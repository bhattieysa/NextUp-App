import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList,
  StyleSheet, Alert, Platform, Modal, Touchable, ImageBackground, Dimensions,
} from 'react-native';

// import { TouchableOpacity as TouchableOp } from 'react-native-gesture-handler';

import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';

import { ScrollView, TextInput } from 'react-native-gesture-handler';

import ImagePicker from 'react-native-image-crop-picker';
import { getObject } from '../../middleware';
import {
  getCoachTeam, createNewTeam, removePlayerToTeam,
  getNewCoachTeam, getPlayerListForTeam, getGameListForTeam, getUserInfo,
  removeMultiplePlayerToTeam,
  getCoachRoles,
  getCoachTeamRoles,
  checkSubscription,
  removeCoachRole,
  getNewTeamStats
} from '../../actions/home';
import FastImage from 'react-native-fast-image';
import AnimatedInput from '../../Helpers/react-native-animated-input';
import { uploadPhoto } from '../../actions/auth';
import {
  VictoryTheme, VictoryLabel, VictoryContainer, VictoryPolarAxis, VictoryChart,
  VictoryGroup, VictoryArea, VictoryBar, VictoryAxis,
  VictoryPie,
} from 'victory-native';
import moment, { isDuration } from 'moment'
import SelectDropdown from 'react-native-select-dropdown';
import { SenderRecevrModel } from '../../constants/constant';
import { sendBulkMessage } from '../../actions/chat';
import { BlurView } from "@react-native-community/blur";
import { Title } from '../../components/common/titleLabel';
import { showErrorAlert } from '../../utils/info';
import { EmptyPieChart, EmptyBarChart } from './Components/EmptyPieChart';

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import StatisticalOverview from './Components/StatisticalOverview';
import GamePlanCard from './Components/GamePlanCard';
import TeamStats from './Components/TeamStats';
import EditAccessRole from './Components/EditAccessRole';
import StatPlanCard from './Components/StatPlanCard';
import RoleMenuModal from './Components/RoleMenuModal';


let wide = Layout.width;
let high = Layout.height;
let isSelectShow = false;

let playerStatData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class MyTeams extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      showRoleMenuModal: false,
      role_id: "",
      openUserRoleEdit: "",
      loading: false,
      selectedIndex: 0,
      isAddTeam: false,
      avatar: "",
      teamName: '',
      removeLoading: false,
      tabs: [{ id: 1, tab_nm: 'Players' }, { id: 2, tab_nm: 'Games' },
      { id: 3, tab_nm: 'Stats' }, { id: 4, tab_nm: 'Roles' }, { id: 5, tab_nm: 'Line Up' },
      { id: 6, tab_nm: 'Schedule' }, { id: 7, tab_nm: 'Challenges' }],
      selectedTab: "Schedule",
      selectedTabIndex: 0,
      selectedPlayer: [],
      selectedPlayerIndex: [],
      // selectedPlayerInnerIndex: [],
      selectedPlayerArr: [],
      showSessionDropDown: false,
      // playerList: {},
      showStatModal: false,
      selectedKpi: [],
      defaultKpi: '',
      bar1_Data: [],
      bar2_Data: [],
      gameTabData: {},
      recentMatches: null,
      dropDownSelectedVal: null,
      teamDetailsArr: [],
      showMsgModal: false,
      txtMsg: '',
      msgCount: 0,
      showPlayerCatDropDown: false,
      playerCatSelectedVal: 'All Players',
      isSelectAll: false,
      selectedTeamStats: {},
      isDeSelect: false,
      pieChartData: [],
      pieChartGameData: [],
      totalGameMatches: 0,
      totalMatches: 0,
      gameStatBarData: [],
      isMsgSendEnable: false,
      isSessionDropShow: false,
      isPlayerStatShow: false,
      // isTeamNull: false,
      showRoleEdit: false,
      coachTeamStats: null,
      isGamePremiumCardneedtoShow: true,
      lineUpData: null


    };
  }

  // for roles
  showRoleMenuModal(id) {
    console.log("coach id is ", id);
    this.setState({
      role_id: id,
      showRoleMenuModal: true
    })
  }

  hideRoleMenuModal() {
    this.setState({
      role_id: "",
      showRoleMenuModal: false
    })
  }

  removeCoachFromRole(coachId) {
    //need to confirm from the api.

    const { coachTeam } = this.props.Home;

    const teamId = coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId;

    console.log("Coach id is ", coachId, " and team id is ", teamId);

    if (!teamId) {
      Alert.alert("Error", "Team Id not found!");
      return false;
    }

    this.props.dispatch(removeCoachRole(teamId, coachId, (res) => {
      if (res) {
        console.log("Coach removed successfully!");
        Alert.alert("Success", "Coach Removed Successfully!");
      }
    }))


  }

  //end roles

  onHideRoleEdit() {
    this.setState({
      showRoleEdit: false
    })
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', this.onScreenFocus)
    // this.onScreenFocus();
  }
  onScreenFocus = () => {
    this.getInitialData(false)

    console.log("getting coach roles");
    // this.props.dispatch(getCoachRoles());
  }
  componentWillUnmount() {
    this.setState({ isAddTeam: false })
  }

  getInitialData = (isfromAdd) => {
    debugger
    getObject('UserId').then((obj) => {
      this.setState({ loading: true, selectedKpi: [] }, () => {
        this.props.dispatch(getNewCoachTeam(obj, (res) => {
          if (res) {
            const { coachTeam } = this.props.Home
            console.log("TeammmRespp", coachTeam);
            debugger
            if (coachTeam?.teamTabInfoDtoList == null || coachTeam?.teamTabInfoDtoList.length == 0) {
              console.log("In team if part");
              this.setState({
                loading: false,
                removeLoading: false,
                // isTeamNull: true
                isAddTeam: true
              })
              // Navigation.navigate('CoachAddTeam');
            } else {
              debugger;
              console.log("In team else part is ", coachTeam);
              // this.state.selectedKpi.push(coachTeam?.teamTabInfoDtoList[0].kpi[0]);
              this.setState({
                // loading: false,
                isAddTeam: false,
                teamDetailsArr: coachTeam?.teamTabInfoDtoList,
                // removeLoading: false,
                // defaultKpi: coachTeam?.teamTabInfoDtoList[0].kpi[0],
                dropDownSelectedVal: coachTeam?.seasonLists[0],
              }
                , () => {
                  if (isfromAdd) {
                    console.log("In team isAddfrom")
                    this.setState({
                      teamName: '', avatar: '',
                      selectedIndex: coachTeam?.length - 1,
                      // isAddTeam: false
                    }, () => {
                      // setTimeout(() => {
                      //     alert('Team Added Successfully.')

                      // }, 1000)
                    })
                  }

                  console.log("End else team");
                  debugger

                  //Old
                  // this._filterTeamSeasonWise();
                  // this.filterBarChartData(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamStatsTabDto);

                  // this._filterGameStatBarData();
                  this._handleTabPress(this.state.selectedTabIndex, this.state.selectedTab,
                    coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId)
                  // this._callPlayerTabApi(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId);

                })
            }

          } else {
            this.setState({ loading: false })
          }
        }))
      })

    })
  }

  _callStatsApi = (teamID) => {
    this.setState({ loading: true }, () => {
      getObject('UserId').then((obj) => {
        this.props.dispatch(getNewTeamStats(teamID, obj, '2020-21', (res, data) => {
          if (res) {
            this.setState({ coachTeamStats: data }, () => {
              this._filterTeamSeasonWise();
            });
          } else {
            this.setState({ loading: false });
          }
        }))
      })
    })

  }

  _filterTeamSeasonWise = () => {
    debugger
    const { dropDownSelectedVal, selectedIndex, coachTeamStats } = this.state;
    const { coachTeam } = this.props.Home
    // const teamStats = coachTeam?.teamTabInfoDtoList[selectedIndex].statsWithSeasonsList;
    const teamStats = coachTeamStats?.statsWithSeasonsList;
    var isSesDropShow = false;
    var statsObj = {};
    // console.log("Selected Team is ", JSON.stringify(coachTeam?.teamTabInfoDtoList[selectedIndex]));
    if (teamStats !== null && teamStats !== undefined) {
      teamStats.map(obj => {
        if (obj.seasonList == dropDownSelectedVal) {
          statsObj = obj
        }
      })
      isSesDropShow = true;
    }
    debugger
    console.log('arrr11111111', isSesDropShow);
    var selectedKpiArr = [];
    var defKpi = null
    // old code
    // selectedKpiArr.push(coachTeam?.teamTabInfoDtoList[selectedIndex]?.kpi[0])
    // this.state.selectedKpi.push(coachTeam?.teamTabInfoDtoList[selectedIndex]?.kpi[0]);
    if (coachTeamStats?.kpi !== null) {
      selectedKpiArr.push(coachTeamStats?.kpi)
      defKpi = coachTeamStats?.kpi[0];

    }
    debugger
    this.setState({
      // teamDetailsArr: coachTeam?.teamTabInfoDtoList,
      showSessionDropDown: false,
      selectedTeamStats: statsObj,
      // defaultKpi: coachTeam?.teamTabInfoDtoList[selectedIndex]?.kpi[0],
      defaultKpi: defKpi,
      selectedKpi: selectedKpiArr,
      isSessionDropShow: isSesDropShow
    }, () => {
      this.filterBarChartData(coachTeamStats?.teamStatsTabDto);
      // this._callPlayerTabApi(coachTeam?.teamTabInfoDtoList[selectedIndex].teamId);
    });

  }

  _filterPieChartData = () => {
    const { selectedTeamStats, teamDetailsArr } = this.state;
    debugger
    var arr = [];
    var teamArr = [];
    var tot = 0;
    if (selectedTeamStats.hasOwnProperty('stats') && selectedTeamStats?.stats !== null) {
      if (selectedTeamStats?.stats.hasOwnProperty('wins')) {
        arr.push(selectedTeamStats.stats.wins);
        tot = tot + selectedTeamStats.stats.wins;
      }
      if (selectedTeamStats?.stats.hasOwnProperty('loss')) {
        arr.push(selectedTeamStats.stats.loss);
        tot = tot + selectedTeamStats.stats.loss;
      }
      if (selectedTeamStats?.stats.hasOwnProperty('draw')) {
        arr.push(selectedTeamStats.stats.draw);
        tot = tot + selectedTeamStats.stats.draw;
      }
    }
    this.setState({ pieChartData: arr, totalMatches: tot, })
    // this.filterBarChartData(teamDetailsArr[this.state.selectedIndex].teamStatsTabDto);
    this.filterBarChartData();
  }

  _filterPieChartGamesData = () => {
    const { gameTabData } = this.state;
    debugger
    var arr = [];
    var teamArr = [];
    var tot = 0;
    if (gameTabData.hasOwnProperty('leaderBoardTeamInfo') && gameTabData?.leaderBoardTeamInfo !== null) {
      if (gameTabData?.leaderBoardTeamInfo.hasOwnProperty('wins')) {
        arr.push(gameTabData.leaderBoardTeamInfo.wins);
        tot = tot + gameTabData.leaderBoardTeamInfo.wins;
      }
      if (gameTabData?.leaderBoardTeamInfo.hasOwnProperty('loss')) {
        arr.push(gameTabData.leaderBoardTeamInfo.loss);
        tot = tot + gameTabData.leaderBoardTeamInfo.loss;
      }
      if (gameTabData?.leaderBoardTeamInfo.hasOwnProperty('draw')) {
        arr.push(gameTabData.leaderBoardTeamInfo.draw);
        tot = tot + gameTabData.leaderBoardTeamInfo.draw;
      }
    }
    this.setState({ pieChartGameData: arr, totalGameMatches: tot, })
    // this.filterBarChartData(teamDetailsArr[this.state.selectedIndex].teamStatsTabDto);
    // this.filterBarChartData();
  }

  filterBarChartData = () => {
    debugger
    const { selectedKpi, defaultKpi } = this.state;
    const { coachTeamPlayer } = this.props.Home
    var isPlayerStat = false;
    var playerData = coachTeamPlayer?.teamPlayersInfoList;
    console.log('plaaaaaaaa', selectedKpi[0])
    this.setState({ bar1_Data: [], bar2_Data: [] }, () => {
      if (playerData != null && playerData != undefined) {
        var arr = [];
        var valueKey = selectedKpi[0];
        var nm = 1
        playerData.forEach(element => {
          if (element.userBarGraphComparisonDto?.userKpi !== null) {
            debugger
            isPlayerStat = true;
            if (element.userBarGraphComparisonDto?.userKpi.hasOwnProperty(valueKey)) {
              arr.push({
                x: `${element.firstName} ${element.lastName}` + nm,
                y: parseFloat(element.userBarGraphComparisonDto?.userKpi[valueKey]),
              });
              nm = nm + 1;
            }
          }

        });
        console.log('Bar1', arr);
        debugger;
        this.setState({ bar1_Data: arr, isPlayerStatShow: isPlayerStat });
        if (this.state.selectedKpi.length == 2) {
          var arr1 = [];
          var valueKey1 = selectedKpi[1];
          var nm = 1
          playerData.forEach(element => {
            if (element.userBarGraphComparisonDto?.userKpi !== null) {
              debugger
              isPlayerStat = true;
              if (element.userBarGraphComparisonDto?.userKpi.hasOwnProperty(valueKey1)) {
                arr1.push({
                  x: `${element.firstName} ${element.lastName}` + nm,
                  y: parseFloat(element.userBarGraphComparisonDto?.userKpi[valueKey1]),
                });
                nm = nm + 1;
              }
            }
          });
          console.log('Bar2', arr1);
          debugger;
          this.setState({ bar2_Data: arr1, isPlayerStatShow: isPlayerStat });
        }
      }
    });
    debugger
    this._filterGameStatBarData();
    this.setState({ loading: false });
  }

  // coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamStatsTabDto

  _filterGameStatBarData = () => {
    // const { coachTeam } = this.state;
    debugger
    // old code 
    // const { coachTeam } = this.props.Home
    const { coachTeamStats } = this.state
    var arr = []
    if (Object.keys(coachTeamStats).length !== 0) {
      debugger
      const statObj = coachTeamStats?.teamStats;
      console.log("Filter game tab data working new ", statObj);
      for (const key in statObj) {
        debugger
        arr.push({
          x: key,
          y: parseFloat(statObj[key])
        })
      }
    }
    debugger
    console.log("Filter game tab data working new arr ", arr);
    this.setState({ gameStatBarData: arr, loading: false, removeLoading: false })
  }


  _filterGameStatBarDataOld = () => {
    const { gameTabData } = this.state;
    console.log("Filter game tab data working ", gameTabData);
    var arr = []
    if (Object.keys(gameTabData).length !== 0) {
      const statObj = gameTabData?.teamStats;
      for (const key in statObj) {
        arr.push({
          x: key,
          y: parseFloat(statObj[key])
        })
      }
    }
    this.setState({ gameStatBarData: arr, loading: false, removeLoading: false })
  }

  actionAddTeam = () => {
    const { teamName, avatar } = this.state;
    if (teamName === '' && avatar === '') {
      alert('Please enter name/logo to add the team.')
      return
    }
    this.setState({ loading: true }, () => {
      getObject('UserId').then((obj) => {

        this.props.dispatch(uploadPhoto(avatar, obj, 'team', 'TEAM_LOGO', (res, uploadedUrl) => {
          debugger
          if (res) {
            this.props.dispatch(createNewTeam({
              "name": teamName,
              "coachId": obj,
              "teamLogo": uploadedUrl
            }, (res) => {

              this.getInitialData(true)
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

  // player tab api
  _callPlayerTabApi = (teamId) => {
    const { dropDownSelectedVal, isSessionDropShow } = this.state;
    console.log("Player call", isSessionDropShow)
    // var season = dropDownSelectedVal;
    debugger
    if (isSessionDropShow == true) {
      debugger
      this.setState({ loading: true }, () => {
        this.props.dispatch(getPlayerListForTeam(teamId, dropDownSelectedVal, (res) => {
          // setTimeout(() => {
          if (res) {
            debugger
            const { coachTeamPlayer } = this.props.Home
            console.log("--->>>", coachTeamPlayer);
            this.setState({ loading: false })
            // this._callGameTabApi(teamId);
            // this._callRoleTabApi(teamId);
            // this._checkForSubscription();
          }
          // }, );

        }))
      })

    } else {
      debugger
      this.setState({ loading: true }, () => {
        this.props.dispatch(getPlayerListForTeam(teamId, "2020-21", (res) => {
          // setTimeout(() => {
          if (res) {
            debugger
            const { coachTeamPlayer } = this.props.Home
            console.log("--->>>", coachTeamPlayer);
            this.setState({ loading: false }, () => {
              this._checkForSubscription();
            })
            // this._callGameTabApi(teamId);
            // this._callRoleTabApi(teamId);
          }
          // }, );

        }))

      })

    }
    // this.setState({ loading: true }, () => {

    // })
  }


  _checkForSubscription = () => {
    getObject('UserId').then(obj => {
      this.props.dispatch(checkSubscription(obj, (res) => {
        if (res) {
          console.log("Subscription info is ", res);
        }
        else {
          console.log(res);
        }
      }))

    }).catch(error => {
      console.log("Userid error ", error);
    })
  }

  //role tab api
  _callRoleTabApi = (teamId) => {
    debugger
    this.setState({ loading: true }, () => {
      getObject('UserId').then(obj => {
        this.props.dispatch(getCoachTeamRoles(teamId, obj, (res) => {
          if (res) {
            debugger
            const { teamRoles } = this.props.Home
            console.log("team roles --->>>", teamRoles);
            this.setState({ loading: false })
            // this._callGameTabApi(teamId);
          }
        }))

      }).catch(error => {
        Alert.alert("Error", error.message);
      })

    })
  }


  // Game tab api
  _callGameTabApi = (teamId) => {
    console.log("Game call")
    const { dropDownSelectedVal, isSessionDropShow } = this.state;

    // Alert.alert("Dropdown selected", `Value is ${dropDownSelectedVal}`)
    debugger
    this.setState({ loading: true }, () => {
      getObject('UserId').then((obj) => {
        this.props.dispatch(getGameListForTeam(teamId, obj, dropDownSelectedVal, (res, resData) => {
          // setTimeout(() => {
          if (res) {
            debugger
            console.log("---resssssgame", resData);
            this.setState({
              gameTabData: resData,
              loading: false
            }, () => {
              this._filterPieChartGamesData();
              // this._filterGameStatBarData();
            })
          }

          // }, 500);

        }))
      })
    })

  }

  //old method not in use now
  _handleSelectPlayer = (item, index) => {
    debugger;
    console.log("item--->>", item, index);
    // this.setState({ loading: true });
    if (this.state.selectedPlayerIndex.length > 0) {
      var indxArr = this.state.selectedPlayerIndex;
      var plyrArr = this.state.selectedPlayer;
      var playrItmArr = this.state.selectedPlayerArr;
      if (indxArr.includes(index)) {
        indxArr = indxArr.filter((obj) => {
          return obj !== index;
        });
        plyrArr = plyrArr.filter((obj) => {
          return obj !== item.playerId;
        });
        playrItmArr = playrItmArr.filter((obj) => {
          return obj.playerId !== item.playerId;
        })
      } else {
        indxArr.push(index);
        plyrArr.push(item.playerId)
        playrItmArr.push(item);
      }
      if (indxArr.length == 0) {
        this.setState({ isDeSelect: false })
      }
      this.setState({
        selectedPlayer: plyrArr, selectedPlayerIndex: indxArr,
        selectedPlayerArr: playrItmArr, loading: false
      });
    } else {
      this.state.selectedPlayerIndex.push(index);
      this.state.selectedPlayer.push(item.playerId);
      this.state.selectedPlayerArr.push(item);
      this.setState({ loading: false });
    }

  }

  _handleNewSelectPlayer = (item, index, innerIndx) => {
    debugger;
    console.log("item--->>", item, index);
    // this.setState({ loading: true });
    if (this.state.selectedPlayerIndex.length > 0) {
      debugger
      var indxArr = this.state.selectedPlayerIndex;
      var plyrArr = this.state.selectedPlayer;
      var playrItmArr = this.state.selectedPlayerArr;
      debugger
      if (indxArr.includes(`${index}_${innerIndx}`)) {
        debugger
        indxArr = indxArr.filter((obj) => {
          return obj !== `${index}_${innerIndx}`;
        });
        plyrArr = plyrArr.filter((obj) => {
          return obj !== item.playerId;
        });
        playrItmArr = playrItmArr.filter((obj) => {
          return obj.playerId !== item.playerId;
        })
      } else {
        debugger
        indxArr.push(`${index}_${innerIndx}`);
        plyrArr.push(item.playerId)
        playrItmArr.push(item);
      }
      if (indxArr.length == 0) {
        this.setState({ isDeSelect: false })
      }
      this.setState({
        selectedPlayer: plyrArr, selectedPlayerIndex: indxArr,
        selectedPlayerArr: playrItmArr, loading: false
      });
    } else {
      debugger
      var indxStr = `${index}_${innerIndx}`
      this.state.selectedPlayerIndex.push(indxStr);
      this.state.selectedPlayer.push(item.playerId);
      this.state.selectedPlayerArr.push(item);
      this.setState({ loading: false });
    }


  }

  _handleSelectAllPlayer = (data) => {
    const { playerCatSelectedVal } = this.state;
    if (data !== null && data !== undefined) {
      this.setState({ loading: true }, () => {
        data.map((obj, index) => {
          if (obj.playerId !== null) {
            if (playerCatSelectedVal === 'All Players') {
              this.state.selectedPlayerIndex.push(index);
              this.state.selectedPlayer.push(obj.playerId);
              this.state.selectedPlayerArr.push(obj);
            } else {
              if (playerCatSelectedVal === obj.playerCategory) {
                this.state.selectedPlayerIndex.push(index);
                this.state.selectedPlayer.push(obj.playerId);
                this.state.selectedPlayerArr.push(obj);
              }
            }
          }
        })
        this.setState({ loading: false, isDeSelect: true })

      })

    }
  }

  _handleUnSelectAllPlayer = (data) => {
    this.setState({ selectedPlayerIndex: [], selectedPlayer: [], selectedPlayerArr: [] })

  }

  _renderMessageUserCat = ({ item, index }) => {
    console.log(item, "ll");
    const { coachTeam } = this.props.Home
    return (
      <TouchableOpacity style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
        marginHorizontal: wide * 0.01,
        paddingRight: wide * 0.04,
      }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedIndex: index }, () => {
          this._handleTabPress(this.state.selectedTabIndex, this.state.selectedTab,
            coachTeam?.teamTabInfoDtoList[index]?.teamId)
          // this._filterTeamSeasonWise();
        })}
      >

        <View style={{
          width: wide * 0.15,
          height: wide * 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: wide * 0.15 / 2,
          borderWidth: item.teamLogoUrl == null ? 1.5 : this.state.selectedIndex == index ? 1.5 : 0,
          borderColor: item.teamLogoUrl == null ? Colors.newGrayFontColor : this.state.selectedIndex == index ? Colors.light : null,

        }}>

          <FastImage
            style={{
              width: '92%', height: '92%',
              borderRadius: wide * 0.14 / 2,
              // opacity: this.state.selectedIndex == index ? 1 : 0.4,
            }}
            source={{ uri: item.teamLogoUrl }}
            resizeMode={'contain'}
          />
        </View>
        <Text
          numberOfLines={1}
          style={{
            color: this.state.isAddTeam == true ? Colors.fontColorGray : this.state.selectedIndex == index ? Colors.light : Colors.newGrayFontColor,
            fontSize: 14,
            lineHeight: 18,
            fontFamily: Fonts.SemiBold,
            marginTop: wide * 0.015,
          }}>{item.name}</Text>
      </TouchableOpacity >

    );
  };
  removePlayerFromPosition = (item) => {
    //removeLoading
    ///team/remove/team/members/163040178673005/3
    const { coachTeam } = this.props.Home
    const { selectedIndex } = this.state;

    Alert.alert(
      'Alert',
      'Are you sure want to remove this player?', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'OK', onPress: () => {
            this.setState({ removeLoading: true }, () => {
              this.props.dispatch(removePlayerToTeam(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId, item, (res) => {
                if (res) {
                  this.setState({
                    selectedPlayer: [],
                    selectedPlayerIndex: [],
                    selectedPlayerArr: []
                  }, () => {
                    this.getInitialData(false)
                  })

                }


              }))
            })
          }
        },
        {
          text: 'Cancel', onPress: () => {

          }
        }
      ],
      { cancelable: false },
    );
  }

  removeMultiPlayerFromPosition = (playerArr) => {
    //removeLoading
    ///team/remove/team/members/163040178673005/3
    const { coachTeam } = this.props.Home
    const { selectedIndex } = this.state;
    debugger

    Alert.alert(
      'Alert',
      'Are you sure want to remove players?', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'OK', onPress: () => {
            this.setState({ removeLoading: true }, () => {
              this.props.dispatch(removeMultiplePlayerToTeam(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId,
                coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.seasonType,
                playerArr, (res, data) => {
                  if (res) {
                    this.setState({
                      selectedPlayer: [],
                      selectedPlayerIndex: [],
                      selectedPlayerArr: []
                    }, () => {
                      this.getInitialData(false)
                    })

                  }
                }))
            })
          }
        },
        {
          text: 'Cancel', onPress: () => {

          }
        }
      ],
      { cancelable: false },
    );
  }

  _renderNewTeam = ({ item, index }) => {
    debugger
    const { coachTeam } = this.props.Home
    const { selectedIndex, selectedPlayerIndex, selectedPlayer,
      playerCatSelectedVal, selectedPlayerInnerIndex } = this.state;


    return (
      <>
        <View style={{
          flexDirection: 'row',
          height: wide * 0.1,
          width: '100%',
          borderRadius: wide * 0.025,
          backgroundColor: Colors.playerCategoryBg,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: wide * 0.05,

        }}>
          <Text style={{
            color: Colors.light, fontSize: 16, lineHeight: 24,
            fontFamily: Fonts.SemiBold,
            marginHorizontal: wide * 0.04,
            marginTop: wide * 0.004
          }}> {item.name}</Text>
          <TouchableOpacity onPress={() =>
            Navigation.navigate('CoachAddPlayer',
              {
                playerDetails: item,
                teamDetails: coachTeam?.teamTabInfoDtoList[selectedIndex],
                selectedSeason: this.state.dropDownSelectedVal
              })}
            style={{
              width: '25%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: wide * 0.02,
            }}
            activeOpacity={1}
          >

            <TouchableOpacity style={{
              width: wide * 0.06, height: wide * 0.06,
              borderColor: Colors.btnBg, borderWidth: 1.5,
              borderRadius: wide * 0.06 / 2, alignItems: 'center',
              justifyContent: 'center', marginHorizontal: wide * 0.015
            }}
              onPress={() =>
                Navigation.navigate('CoachAddPlayer',
                  {
                    playerDetails: item,
                    teamDetails: coachTeam?.teamTabInfoDtoList[selectedIndex],
                    selectedSeason: this.state.dropDownSelectedVal
                  })}
              activeOpacity={1}
            >
              <Image
                style={{ width: '60%', height: '60%', }}
                source={require('../../Images/newAddTeamIcon.png')}
                resizeMode={'cover'}
              />

            </TouchableOpacity>
            <Text style={{
              color: Colors.btnBg, fontSize: 16, lineHeight: 22,
              fontFamily: Fonts.Medium, marginHorizontal: wide * 0.006
            }}>Add</Text>

          </TouchableOpacity>
        </View>
        {/* <View style={{ flexDirection: "row" }}>
          {content}
        </View> */}

        <FlatList
          data={item?.teamPlayersInfoList}
          numColumns={4}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => (<View>
            {item.item.playerId !== null ?
              // itm.accepted == true ?
              <>
                <View style={{
                  marginBottom: wide * 0.03,
                  marginTop: wide * 0.05,
                  marginRight: wide * 0.04,
                }}>
                  <View style={{
                    alignItems: 'center', justifyContent: 'center',
                    // marginTop: wide * 0.04,
                  }}>
                    <TouchableOpacity style={{
                      borderWidth: item.item.profilePictureUrl == null ? 1.5 : 0,
                      borderColor: item.item.profilePictureUrl == null ? Colors.newGrayFontColor : null,
                      width: wide * 0.14,
                      height: wide * 0.14,
                      borderRadius: wide * 0.14 / 2,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                      onPress={() => Navigation.navigate('PlayerProfile', { playerId: item.item.playerId })}
                    >
                      <FastImage style={{
                        width: '98%', height: '98%', borderRadius: wide * 0.14 / 2,
                        alignSelf: 'center'
                      }}
                        // resizeMode={'contain'}
                        source={{ uri: item.item.profilePictureUrl }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: wide * 0.18 }}
                      onPress={() => Navigation.navigate('PlayerProfile', { playerId: item.item.playerId })}
                      activeOpacity={1}
                    >
                      <Text style={{
                        color: Colors.light, fontSize: 12,
                        lineHeight: 11,
                        fontFamily: Fonts.SemiBold,
                        fontWeight: '600',
                        marginTop: wide * 0.015,
                        textAlign: 'center',
                      }}>{item.item.firstName} {item.item.lastName}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>

              : <></>
            }
          </View>)
          }
        />
      </>
    )
  };

  _renderUserRole = ({ item, index }) => {
    return (
      <View style={{
        marginBottom: wide * 0.03,
        width: '94%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wide * 0.04
      }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center',

        }}>
          <View style={{
            borderWidth: item.profilePictureUrl == null ? 1.5 : 0,
            borderColor: item.profilePictureUrl == null ? Colors.newGrayFontColor : null,
            width: wide * 0.15, height: wide * 0.15,
            borderRadius: (wide * 0.2) / 2,
            justifyContent: 'center', alignItems: 'center',

          }} onPress={() => console.log("navigate player 1")}>
            <FastImage style={{
              width: '96%', height: '96%',
              borderRadius: (wide * 0.15) / 2,
              alignSelf: 'center'
            }}
              // resizeMode={'contain'}
              source={{ uri: item.profilePictureUrl }} />
          </View>

          <View style={{
            marginHorizontal: wide * 0.04,
            flex: 1,
          }}
          >
            <View style={{
              flexDirection: 'column',
              width: '90%'
            }}>
              {item.name != null ?
                <Text style={{
                  color: Colors.light, fontSize: 16,
                  lineHeight: 22, fontFamily: Fonts.SemiBold,
                  fontWeight: '600'
                }}>{item.name}</Text>
                :
                <></>
              }

              <Text style={{
                color: Colors.light,
                fontSize: 12,
                lineHeight: 16,
                fontFamily: Fonts.Regular,
                marginBottom: 2,
                fontWeight: "400",
              }}>{item.email}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => this.showRoleMenuModal(item.coachId)}>
            <Image
              source={require("../../Images/ellipses-v.png")}
              style={{
                // marginTop: 10,
                marginRight: wide * 0.01
              }}

              resizeMode={'contain'}
            />
          </TouchableOpacity>



        </View>



      </View>
    );
  };

  //Recent Matches
  _renderListOfRecentMatches = ({ item }) => {
    const d = new Date(item.scheduledAt);
    // console.log(item)
    return (

      <>
        <TouchableOpacity style={{
          backgroundColor: '#23262F',//Colors.gameTabCardBg,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: wide * 0.05,
          borderRadius: 10,
          // paddingHorizontal: 15,
          marginTop: 10,
          width: wide * 0.64,
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
              width: wide * 0.17, height: wide * 0.17,
              backgroundColor: Colors.light, borderRadius: wide * 0.17 / 2,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <FastImage style={{ width: wide * 0.12, height: wide * 0.12, }}
                resizeMode={'contain'}
                source={{ uri: item.challengerTeamInfo.logoUrl }} />

            </View>
            <Text style={{
              color: Colors.light, fontSize: 24, fontFamily: Fonts.Regular,
              lineHeight: 30, paddingHorizontal: 10

            }}>VS</Text>
            <View style={{
              width: wide * 0.17, height: wide * 0.17,
              backgroundColor: Colors.light, borderRadius: wide * 0.17 / 2,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <FastImage style={{ width: wide * 0.12, height: wide * 0.12, }}
                resizeMode={'contain'} source={{ uri: item.defenderTeamInfo.logoUrl }} />
            </View>

          </View>

          <Text style={{
            color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
            lineHeight: 20, paddingBottom: 10, marginTop: 5
          }}>{moment((new Date(item.scheduledAt))).format('DD')}  {moment((new Date(item.scheduledAt))).format('MMM')}</Text>
        </TouchableOpacity>
      </>
    );
  };


  _renderAddPendingPlayers = (item) => {
    return (
      <View style={{ marginTop: wide * 0.01 }}>
        <Image style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
        }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View style={{
            width: wide * 0.25, height: wide * 0.25,
            borderRadius: (wide * 0.25) / 2, marginLeft: wide * 0.05, marginTop: 15,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Image style={{ width: '100%', height: '100%', borderRadius: (wide * 0.2) / 2 }}
              // resizeMode={'contain'}
              source={require('../../Images/AvatarImage.png')} />
          </View>

          <View style={{
            marginHorizontal: wide * 0.04,
            flex: 1, marginTop: 0
          }}>
            <View >
              <View style={{
                flexDirection: 'column',

                width: '90%'
              }}>


                <Text style={{
                  color: Colors.fontColorGray, fontSize: 22,
                  lineHeight: 24, fontFamily: Fonts.Bold, marginTop: 24,
                }}>Player Name</Text>

                <Text style={{
                  color: Colors.grey, fontSize: 12,
                  lineHeight: 20, fontFamily: Fonts.Medium, fontStyle: 'italic'
                }}>Position - Center </Text>
                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                  <TouchableOpacity style={{
                    width: wide * 0.04, height: wide * 0.04,
                    borderRadius: (wide * 0.05) / 2,
                    backgroundColor: Colors.btnBg, justifyContent: 'center'
                  }}>
                    <Text style={{
                      color: Colors.light, fontSize: 15, fontFamily: Fonts.Medium, textAlign: 'center'

                    }}>+</Text>

                  </TouchableOpacity>
                  <Text style={{
                    color: Colors.btnBg, fontSize: 15, fontFamily: Fonts.SemiBold, textAlign: 'center', marginLeft: 5, marginTop: 2

                  }}>Add Players</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
      </View>

    );
  };

  _renderPendingPlayes = (item) => {
    return (

      <View style={{ marginTop: wide * 0.01, }}>
        <Image style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
        }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View style={{
            borderWidth: 3,
            borderColor: Colors.borderColor,
            width: wide * 0.25, height: wide * 0.25,
            borderRadius: (wide * 0.32) / 2, marginLeft: wide * 0.05, marginTop: 15,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Image style={{ width: '100%', height: '100%', borderRadius: (wide * 0.32) / 2 }}
              // resizeMode={'contain'}
              source={require('../../Images/avatar.png')} />
          </View>

          <View style={{
            marginHorizontal: wide * 0.04,
            flex: 1, marginTop: 0
          }}>
            <View >
              <View style={{
                flexDirection: 'column',

                width: '90%'
              }}>

                <TouchableOpacity style={{
                  backgroundColor: '#C33131',
                  borderRadius: wide * 0.01, width: wide * 0.3,
                  justifyContent: 'center', alignItems: 'center', marginTop: 20
                }}>
                  {/* <Image source={require('../../Images/get_direction.png')} style={{
                                        width: 15, height: 15, marginLeft: 15
                                    }} /> */}
                  <Text style={{
                    color: Colors.light, fontSize: 10, fontFamily: Fonts.SemiBoldItalic,
                    lineHeight: 12, paddingTop: 3, paddingRight: 3,
                    paddingBottom: 3, paddingLeft: 3,
                  }} >Pending Invitation</Text>
                </TouchableOpacity>
                <Text style={{
                  color: Colors.light, fontSize: 22,
                  lineHeight: 26, fontFamily: Fonts.Bold, marginTop: 5,
                }}>Vaibhav Chibbar</Text>

                <Text style={{
                  color: Colors.grey, fontSize: 15,
                  lineHeight: 20, fontFamily: Fonts.Medium, fontStyle: "italic"
                }}>#31/C </Text>
                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                  <TouchableOpacity style={{
                    width: wide * 0.04, height: wide * 0.04,
                    borderRadius: (wide * 0.05) / 2,
                    backgroundColor: '#C33131', justifyContent: 'center'
                  }}>
                    <Text style={{
                      color: Colors.light, fontSize: 15, fontFamily: Fonts.Medium, textAlign: 'center'

                    }}>-</Text>

                  </TouchableOpacity>
                  <Text style={{
                    color: '#C33131', fontSize: 15, fontFamily: Fonts.Medium, textAlign: 'center', marginLeft: 5, marginTop: 2

                  }}>Remove</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
      </View>

    );
  };

  pickSingle(cropit, circular = false, isFrom) {
    Alert.alert(
      "Image",
      'Pick from',
      [
        {
          text: 'Gallery',
          onPress: () => {
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

                this.setState({ avatar: image.path })

                // 

              })
              .catch((e) => {
                console.log(e);
                // Alert.alert(e.message ? e.message : e);
              });
          }
        },
        {
          text: 'Camera', onPress: () => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
              mediaType: 'photo'
            }).then(image => {

              this.setState({ avatar: image.path })

            });
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

  _renderAddTeam = (item) => {
    return (
      <View style={{ marginTop: wide * 0.01, paddingBottom: 20 }}>
        <Image style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
        }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
        <View style={{ paddingBottom: wide * 0.05 }}>
          <View style={{ flexDirection: 'row', marginleft: 20, marginTop: 20, left: 20 }}>
            <Text style={{
              color: Colors.fontGray, fontSize: 15, fontFamily: Fonts.Regular,

            }}>Postion-</Text>
            <Text style={{
              color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,

            }}> CENTER</Text>
          </View>
          <View style={{ alignItems: 'center', }}>

            <TouchableOpacity onPress={() => Navigation.navigate('CoachAddPlayer')}
              style={{
                width: wide * 0.12, height: wide * 0.12,
                borderRadius: (wide * 0.12) / 2, borderWidth: 3,
                borderColor: Colors.btnBg, marginTop: 5,
                justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.btnBg
              }}>
              <Text style={{
                color: Colors.light, fontSize: 25, fontFamily: Fonts.Medium,

              }}>+</Text>
              {/* <Image style={{ width: '100%', height: '100%', borderRadius: (wide * 0.2) / 2 }}
                            // resizeMode={'contain'}
                            source={require('../../Images/avatar.png')} /> */}
            </TouchableOpacity>
          </View>
          <Text style={{
            color: Colors.light, fontSize: 12, fontFamily: Fonts.SemiBold, textAlign: 'center', marginTop: 5,

          }}>Add Player</Text>

        </View>
      </View >

    );
  };

  _handleTabPress = (tabIndx, tabNm, teamId) => {
    console.log(`Tab Index: ${tabIndx}, Tab Name: ${tabNm}, Team ID: ${teamId}`);
    this.setState({ selectedTabIndex: tabIndx, selectedTab: tabNm, selectedPlayerIndex: [], selectedPlayer: [] }, () => {
      console.log("Current tab is ", tabNm);
      if (tabNm === 'Games') {
        this._callGameTabApi(teamId);
      }
      if (tabNm === 'Stats') {
        // this.getInitialData(false);
        this._callStatsApi(teamId);
        // this.filterBarChartData();
        // this._filterGameStatBarData();
      }
      if (tabNm === 'Roles') {
        this._callRoleTabApi(teamId);
      }
      if (tabNm === "Players") {
        this._callPlayerTabApi(teamId);
      }

    })
  }

  _renderTabs = (item, index) => {
    const { coachTeam } = this.props.Home
    return (
      <TouchableOpacity style={{
        height: wide * 0.1,
        width: wide * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green'
      }}
        activeOpacity={1}
        onPress={() => this._handleTabPress(item.index, item.item.tab_nm, coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId)}

      >

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this._handleTabPress(item.index, item.item.tab_nm, coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId)}
          style={{
            //  height: '70%',
            alignItems: 'center',
            borderBottomColor: this.state.selectedTabIndex === item.index ? Colors.light : null,
            borderBottomWidth: this.state.selectedTabIndex === item.index ? 1 : null,
          }}>
          <Text style={{
            color: this.state.selectedTabIndex === item.index ? Colors.light : Colors.fontColorGray,
            fontSize: 14, lineHeight: 22,
            fontFamily: Fonts.Bold,

          }}>
            {item.item.tab_nm}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

    );
  };

  _renderSeasonList = (item, index) => {
    console.log("itm,", item)
    return (
      <TouchableOpacity
        style={{
          width: wide * 0.38,
          height: wide * 0.08,
          alignItems: 'center', justifyContent: 'space-around'
        }}
      >
        <Text style={{
          color: Colors.light, fontSize: 13, lineHeight: 12,
          fontFamily: Fonts.Bold,
        }}>Season</Text>
      </TouchableOpacity>
    )
  }

  _handleKpiSelect = (val) => {
    debugger
    this.setState({ loading: true })
    if (this.state.selectedKpi.length > 0 && this.state.selectedKpi.length < 2) {
      var indxArr = this.state.selectedKpi;
      if (indxArr.includes(val)) {
        indxArr = indxArr.filter((obj) => {
          return obj !== val;
        });
      } else {
        indxArr.push(val);
      }
      debugger
      this.setState({ selectedKpi: indxArr, showStatModal: false, loading: false });
    } else {
      if (this.state.selectedKpi.length < 2) {
        this.state.selectedKpi.push(val);
        this.setState({ showStatModal: false, loading: false });

      } else if (this.state.selectedKpi.length == 2) {
        var indxArr = this.state.selectedKpi;
        if (indxArr.includes(val)) {
          indxArr = indxArr.filter((obj) => {
            return obj !== val;
          });
        }
        debugger
        this.setState({ selectedKpi: indxArr, loading: false });
      }
    }
    const { coachTeam } = this.props.Home
    this.filterBarChartData(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamStatsTabDto);

  }

  _handleModelShow = () => {
    this.setState({ showStatModal: true })
  }
  _handleClearStatShort = () => {
    debugger
    console.log('.abjsla')
    this.setState({ loading: true });
    var statArr = this.state.selectedKpi;
    console.log("Beffore remove", statArr);
    var removeVal = statArr[0];
    statArr.pop(removeVal);
    console.log("After remove", statArr);

    // statArr.filter((obj) => {
    //     return obj === removeVal;
    // });
    debugger
    this.setState({ selectedKpi: statArr, })
    const { coachTeam } = this.props.Home
    this.filterBarChartData(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamStatsTabDto);

  }

  _handleAssignChallenge = () => {
    const { selectedPlayer, selectedPlayerArr } = this.state;
    console.log('play----', selectedPlayerArr);
    if (this.state.selectedPlayerIndex.length > 0) {
      debugger
      var playerIdArr = [];
      selectedPlayerArr.forEach(obj => {
        if (obj.accepted === true) {
          playerIdArr.push(obj.playerId);
        }
      });
      console.log('challe----', playerIdArr);
      Navigation.navigate('CoachAssignTask', { playerId: playerIdArr })
    } else {
      alert('Please select players to asign challenge.')
    }
  }

  _handleMsgModalShow = () => {
    if (this.state.selectedPlayerIndex.length > 0) {
      getObject('UserId').then((obj) => {
        this.props.dispatch(getUserInfo(obj, (res, data) => {
          debugger
          if (res) {
            SenderRecevrModel.senderId = data.id;
            SenderRecevrModel.senderName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
            SenderRecevrModel.senderProfilePic = data.personalInfo.profilePictureURL;
            SenderRecevrModel.senderType = data.typeOfUser;
            this.setState({ showMsgModal: true });
          }

        }));
      })
    } else {
      alert('Please select players to send message.')
    }

  }

  _handleMessageSend = () => {
    const curr_time = Date.now();
    const { txtMsg, selectedPlayerArr } = this.state;
    console.log('selectDplayr---', selectedPlayerArr);

    if (txtMsg.length > 0) {
      this.setState({ loading: false });
      var msgArr = [];
      var msgArr = [];
      selectedPlayerArr.forEach(obj => {
        let msgObj = {
          "createdAt": curr_time,
          "message": txtMsg,
          "receiverId": obj.playerId,
          "receiverName": obj.firstName + " " + obj.lastName,
          "receiverProfilePictureUrl": obj.profilePictureUrl,
          "receiverType": "PLAYER",
          "senderId": SenderRecevrModel.senderId,
          "senderName": SenderRecevrModel.senderName,
          "senderProfilePictureUrl": SenderRecevrModel.senderProfilePic,
          "senderType": SenderRecevrModel.senderType,
        }
        msgArr.push(msgObj);
      })
      console.log('msgObj----', msgArr);
      this.props.dispatch(sendBulkMessage(msgArr, (res) => {
        if (res) {
          this.setState({ showMsgModal: false, txtMsg: '', msgCount: 0, loading: false })
          // SHOW_SHARE_SCREEN.show = false;
          // Navigation.back();
        }
      }));
    } else {
      alert('Please type a message to send.')
    }
  }
  _handleRemovePlayer = () => {
    const { selectedPlayerArr, selectedPlayerIndex } = this.state;
    const removeIndxArr = [];
    debugger
    selectedPlayerIndex.forEach((item, index) => {
      var str = item.split('_');
      var obj = {
        "positionIndex": str[0],
        "playerIndex": str[1]
      }
      removeIndxArr.push(obj);
    })

    // selectedPlayerArr.forEach((item, index) => {
    //   removeIndxArr.push(item.index);
    // })
    debugger
    console.log('challe----', removeIndxArr);
    // this.removePlayerFromPosition(indx)   single player move
    this.removeMultiPlayerFromPosition(removeIndxArr);


  }

  _renderSessionList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          height: 50, marginTop: 10,
          // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
        }}
        onPress={() => this.setState({ dropDownSelectedVal: item.item, }, () => {

          this._filterTeamSeasonWise();
          // const { coachDash } = this.props.Home;
          // this._filterPieChartData(coachDash.teamDetailInfo);
        })}
      >
        <Text style={{
          color: Colors.light, fontSize: 15, lineHeight: 16,
          fontFamily: Fonts.Bold,
        }}>{item.item}</Text>

      </TouchableOpacity>
    )
  }

  _renderPlayerStat = ({ item, index }) => {
    var isEnd = false;
    if (index == (playerStatData.length - 1)) {
      isEnd = true;
    }
    debugger

    return (
      <View style={{
        width: '100%', flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: index == 0 ? Colors.playerStatRowSecondClr : index == 1 ? Colors.playerStatRowFirstClr :
          (index % 2) == 0 ? Colors.playerStatRowSecondClr : Colors.playerStatRowFirstClr,
        height: wide * 0.075,
        borderBottomLeftRadius: isEnd == true ? wide * 0.025 : 0,
        borderBottomRightRadius: isEnd == true ? wide * 0.025 : 0,
      }}>
        <View style={{
          width: '30%', alignSelf: 'center',

        }}>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.Regular, fontSize: 12,
            lineHeight: 16,
            fontWeight: '400',
            marginLeft: wide * 0.03
          }}>D.Green</Text>
        </View>

        <View style={{
          width: '70%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignSelf: "center",

        }}>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.SemiBold,
            fontSize: 12,
            lineHeight: 14,
            fontWeight: '600',
            width: '15%',

          }}>42</Text>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.SemiBold, fontSize: 12,
            lineHeight: 14,
            fontWeight: '600',
            width: '15%',

          }}>5-10</Text>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.SemiBold, fontSize: 12,
            lineHeight: 14,
            fontWeight: '600',
            width: '15%',

          }}>2-5</Text>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.SemiBold, fontSize: 12,
            lineHeight: 14,
            fontWeight: '600',
            width: '15%',

          }}>8</Text>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.SemiBold, fontSize: 12,
            lineHeight: 14,
            fontWeight: '600',
            width: '15%',

          }}>1</Text>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.SemiBold, fontSize: 12,
            lineHeight: 14,
            fontWeight: '600',
            width: '15%',

          }}>12</Text>
        </View>
      </View>

    )
  }

  renderCoachLineUp = (item, index) => {
    return (
      <TouchableOpacity style={{
        flex: 1, backgroundColor: Colors.playerCategoryBg,
        borderRadius: wide * 0.03, marginTop: wide * 0.035,
      }}
        onPress={() => Navigation.navigate('ViewCoachLineUp')}
        activeOpacity={1}
      >
        <View style={{
          width: '90%', flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          marginTop: wide * 0.05,
          marginBottom: wide * 0.05
        }}>
          <View>
            <Text style={{
              color: Colors.light,
              fontFamily: Fonts.SemiBold, fontSize: 18,
              lineHeight: 18,
              fontWeight: '600'
            }}>ABC School</Text>
            <View style={{
              flexDirection: 'row',
              marginTop: wide * 0.025,
            }}>
              {
                [1, 2, 3, 4, 5].map((obj, ind) => {
                  return (
                    <View style={{
                      width: wide * 0.08, height: wide * 0.08,
                      borderRadius: wide * 0.08 / 2,
                      position: 'absolute',
                      marginHorizontal: ind * (wide * 0.058),
                    }}>
                      <FastImage
                        source={require('../../Images/male_onboard_Icon.png')}
                        style={{
                          width: '95%', height: '95%',
                          borderRadius: wide * 0.08 / 2
                        }}
                        resizeMode={'cover'}
                      />
                      {ind == 4 ?
                        <View style={{
                          position: "absolute", alignSelf: 'center',
                          width: '95%', height: '95%', backgroundColor: Colors.overlay,
                          borderRadius: wide * 0.08 / 2,
                          alignItems: 'center',
                          justifyContent: 'center'

                        }}>
                          <Text style={{
                            color: Colors.light,
                            fontFamily: Fonts.SemiBold, fontSize: 14,
                            lineHeight: 14,
                            fontWeight: '600'
                          }}>
                            +5
                          </Text>
                        </View>
                        : <></>}

                    </View>
                  )
                })
              }
            </View>
          </View>

          <View>
            <View style={{
              width: wide * 0.07, height: wide * 0.07,
              flexDirection: 'row',
              alignSelf: 'flex-end'
            }}>
              <Image
                source={require('../../Images/lineUpPremiumCheck.png')}
                style={{ width: '95%', height: '95%' }}
                resizeMode={'cover'}
              />
            </View>
            <TouchableOpacity
              onPress={() => Navigation.navigate('ViewCoachLineUp')}
              activeOpacity={1}
              style={{ marginTop: wide * 0.04 }}
            >
              <Text style={{
                color: Colors.btnBg,
                fontFamily: Fonts.SemiBold, fontSize: 16, lineHeight: 22,
                fontWeight: '700'
              }}>View</Text>
            </TouchableOpacity>
          </View>

        </View>

      </TouchableOpacity>
    )
  }

  renderAILineUp = (item, index) => {
    return (
      <TouchableOpacity style={{
        flex: 1, backgroundColor: Colors.btnBg,
        borderRadius: wide * 0.03, marginTop: wide * 0.035,

      }}>
        <View style={{
          width: '90%', flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          marginTop: wide * 0.05,
          marginBottom: wide * 0.05
        }}>
          <View>
            <Text style={{
              color: Colors.light,
              fontFamily: Fonts.SemiBold, fontSize: 18,
              lineHeight: 18,
              fontWeight: '600'
            }}>ABC School</Text>
            <View style={{
              flexDirection: 'row',
              marginTop: wide * 0.025,
            }}>
              {
                [1, 2, 3, 4, 5].map((obj, ind) => {
                  return (
                    <View style={{
                      width: wide * 0.08, height: wide * 0.08,
                      borderRadius: wide * 0.08 / 2,
                      position: 'absolute',
                      marginHorizontal: ind * (wide * 0.058),
                    }}>
                      <FastImage
                        source={require('../../Images/male_onboard_Icon.png')}
                        style={{
                          width: '95%', height: '95%',
                          borderRadius: wide * 0.08 / 2
                        }}
                        resizeMode={'cover'}
                      />
                      {ind == 4 ?
                        <View style={{
                          position: "absolute", alignSelf: 'center',
                          width: '95%', height: '95%', backgroundColor: Colors.overlay,
                          borderRadius: wide * 0.08 / 2,
                          alignItems: 'center',
                          justifyContent: 'center'

                        }}>
                          <Text style={{
                            color: Colors.light,
                            fontFamily: Fonts.SemiBold, fontSize: 14,
                            lineHeight: 14,
                            fontWeight: '600'
                          }}>
                            +5
                          </Text>
                        </View>
                        : <></>}

                    </View>
                  )
                })
              }
            </View>
          </View>

          <View>
            <View style={{
              width: wide * 0.07, height: wide * 0.07,
              flexDirection: 'row',
              alignSelf: 'flex-end'
            }}>
              <Image
                source={require('../../Images/crown.png')}
                style={{ width: '95%', height: '95%' }}
                resizeMode={'cover'}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={{ marginTop: wide * 0.04 }}
            >
              <Text style={{
                color: Colors.light,
                fontFamily: Fonts.SemiBold, fontSize: 16, lineHeight: 22,
                fontWeight: '700'
              }}>View</Text>
            </TouchableOpacity>
          </View>

        </View>

      </TouchableOpacity>
    )
  }

  _renderUpcommingGame = (item, index) => {
    return (
      <>
        <TouchableOpacity style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: wide * 0.05,
          borderRadius: 10,
          width: wide * 0.64,
          height: wide * 0.3
        }}
          activeOpacity={1}
        // onPress={() => Navigation.navigate('GamesRecentTab', { 'gameId': item.id })}
        >
          <Image
            source={require('../../Images/upcomming_gameCard.png')}
            style={{
              width: "100%",
              height: '100%',

              borderRadius: 10,
              position: 'absolute'
            }}
          />

          <View style={{
            marginTop: wide * 0.14,
            flexDirection: 'row', alignItems: 'center',
            // backgroundColor: "green",
            width: '80%',
            // justifyContent: 'space-between',

          }}>
            {/* edit by keshav */}
            <View style={{
              width: wide * 0.18, height: wide * 0.18,
              backgroundColor: Colors.light,
              borderRadius: wide * 0.18 / 2,
              justifyContent: 'center', alignItems: 'center',
              borderWidth: 6,
              borderColor: '#565B68',
              marginLeft: wide * 0.006,

            }}>
              <FastImage style={{ width: wide * 0.13, height: wide * 0.13, }}
                resizeMode={'contain'}
                source={require('../../Images/dummy1.png')} />

            </View>

            <View style={{
              width: wide * 0.18, height: wide * 0.18,
              backgroundColor: Colors.light, borderRadius: wide * 0.18 / 2,
              justifyContent: 'center', alignItems: 'center',
              marginHorizontal: wide * 0.139,
              borderWidth: 6,
              borderColor: '#565B68'
            }}>
              <FastImage style={{ width: wide * 0.13, height: wide * 0.13, }}
                resizeMode={'contain'}
                source={require('../../Images/dummy1.png')}
              />
            </View>

          </View>

          <Text style={{
            color: Colors.light, fontSize: 12,
            fontFamily: Fonts.Medium, fontWeight: '500',
            lineHeight: 16,
            marginBottom: wide * 0.08,


          }}>
            12:39
            {/* {moment((new Date(item.scheduledAt))).format('DD')}  {moment((new Date(item.scheduledAt))).format('MMM')} */}
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  render() {

    const { coachTeam, coachTeamPlayer, teamRoles } = this.props.Home
    const { selectedIndex, teamName, avatar, playerList,
      gameTabData, teamDetailsArr, dropDownSelectedVal, playerCatSelectedVal, pieChartData,
      loading, isAddTeam, isMsgSendEnable, isSessionDropShow, coachTeamStats } = this.state;

    console.log("Coach team", teamDetailsArr);
    debugger
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base }}>
        <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 20 : 0, backgroundColor: Colors.base }}>
          {/* <AppLoader visible={loading} /> */}
          {isAddTeam == true ?
            <View style={{
              flex: 1, alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'green',
            }}>

              <TouchableOpacity
                style={{
                  width: wide * 0.8, height: 48,
                  backgroundColor: Colors.btnBg,
                  alignSelf: 'center', borderRadius: 24,
                  justifyContent: 'center',
                  marginBottom: 50,
                  marginTop: 20,
                }} onPress={() => {
                  Navigation.navigate('CoachAddTeam');
                }}>
                <Text style={{
                  alignSelf: 'center', color: Colors.light,
                  fontFamily: Fonts.Bold,
                }}>Create Your Team</Text>
              </TouchableOpacity>
            </View>
            :
            <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 24,
                marginBottom: 5,
                height: 40,
                marginTop: Platform.OS == 'android' ? 10 : 0,
              }}>

                <View style={{ width: '60%', }}>
                  {coachTeam?.teamTabInfoDtoList != undefined && coachTeam?.teamTabInfoDtoList !== null ?
                    <Text style={{
                      color: Colors.light, fontSize: 20,
                      fontFamily: Fonts.Bold, lineHeight: 28,
                    }}>
                      {coachTeam?.teamTabInfoDtoList[selectedIndex]?.name}
                    </Text>
                    : null
                  }
                </View>

                <View style={{
                  flexDirection: 'row',
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center', width: '80%',
                      height: 25,
                      justifyContent: 'flex-end'
                    }}
                    activeOpacity={1}
                    onPress={() => this.setState({ showSessionDropDown: true })}
                  >
                    <Text style={{
                      color: Colors.light,
                      fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16, marginRight: 5
                    }}>{dropDownSelectedVal}</Text>
                    <Image
                      style={{
                        width: wide * 0.035, height: wide * 0.025, marginHorizontal: wide * 0.02, top: -1
                      }} source={require('../../Images/dropDownIconNew.png')}
                    />
                  </TouchableOpacity>


                </View>


              </View>

              {/* <ScrollView contentContainerStyle={{
                paddingBottom: 15,
              }}
                onScrollBeginDrag={() => this.setState({ isGamePremiumCardneedtoShow: false })}
                onScrollEndDrag={() => this.setState({ isGamePremiumCardneedtoShow: true })}

                bounces={false}
                scrollEnabled={false}
              > */}
              {/* <View> */}
              <View style={{
                marginTop: wide * 0.04,
                flexDirection: 'row',
                alignSelf: "center",
                alignItems: 'center',
                width: '90%',
              }}>
                {this.state.isAddTeam === false && this.state.teamDetailsArr.length > 0 ?
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{
                      width: wide * 0.15,
                      height: wide * 0.15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: wide * 0.15 / 2,
                      borderWidth: 1.5, borderColor: Colors.btnBg,
                    }}
                      onPress={() => Navigation.navigate('CoachAddTeam')}
                    >
                      <View style={{
                        width: wide * 0.07, height: wide * 0.07,
                        borderRadius: wide * 0.02, borderWidth: 1.5, borderColor: Colors.btnBg,
                        alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Image
                          style={{ width: '50%', height: '50%' }}
                          source={require('../../Images/newAddTeamIcon.png')}
                          resizeMode={'contain'}
                        />
                      </View>

                    </TouchableOpacity >
                    <Text numberOfLines={1}
                      style={{
                        color: Colors.btnBg, fontSize: 14,
                        lineHeight: 18,
                        fontFamily: Fonts.SemiBold,
                        marginTop: wide * 0.015,
                      }}>Add</Text>
                  </View>
                  : null
                }
                <View style={{
                  width: this.state.teamDetailsArr.length > 3 ? '90%' : null,
                  marginHorizontal: wide * 0.05,
                  // backgroundColor: 'green'
                }} >
                  {this.state.teamDetailsArr !== null ?
                    <FlatList
                      // style={{ overflow: '' }}
                      data={this.state.teamDetailsArr}
                      renderItem={(item, index) => this._renderMessageUserCat(item, index)}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                    />
                    : null
                  }
                </View>

              </View>

              {
                this.state.isAddTeam == false ?
                  coachTeam.length === 0 ?
                    <View style={{ flex: 1, backgroundColor: Colors.base }}>
                    </View>
                    :
                    <>
                      <View style={{
                        alignItems: 'center',
                        marginTop: wide * 0.06,
                        marginBottom: wide * 0.01
                        // backgroundColor: 'red'
                      }}>
                        <FlatList
                          // style={{ overflow: 'scroll', }}
                          // contentContainerStyle={{ flex: 1, justifyContent: 'space-around', }}
                          data={this.state.tabs}
                          renderItem={(item, index) => this._renderTabs(item, index)}
                          showsHorizontalScrollIndicator={false}
                          horizontal
                        />
                      </View>

                      <ScrollView contentContainerStyle={{
                        paddingBottom: 15,
                      }}
                        onScrollBeginDrag={() => this.setState({ isGamePremiumCardneedtoShow: false })}
                        onScrollEndDrag={() => this.setState({ isGamePremiumCardneedtoShow: true })}

                        bounces={false}
                      >

                        {this.state.selectedTab === 'Stats' ?

                          <View style={{ flex: 1 }}>
                            <View style={{
                              marginTop: wide * 0.045,
                              width: '90%',
                              alignSelf: 'center',
                            }}>
                              <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.SemiBold, fontSize: 22,
                                lineHeight: 28,
                                fontWeight: '600'
                              }}
                              >
                                Player stats
                              </Text>

                              <View style={{
                                marginTop: wide * 0.04, flexDirection: 'row',
                                alignItems: 'center'
                              }}>
                                <View style={{
                                  width: wide * 0.12, height: wide * 0.12, borderRadius: wide * 0.12 / 2,
                                  justifyContent: 'center', alignItems: "center"
                                }}>
                                  <Image
                                    source={require('../../Images/avatar.png')}
                                    style={{
                                      width: wide * 0.1, height: wide * 0.1,
                                      borderRadius: wide * 0.11 / 2
                                    }}
                                    resizeMode={'cover'}
                                  />

                                </View>
                                <Text style={{
                                  color: Colors.light,
                                  fontFamily: Fonts.SemiBold, fontSize: 14,
                                  lineHeight: 18,
                                  fontWeight: '600',
                                  marginLeft: wide * 0.03
                                }}
                                >
                                  Chicago Bulls
                                </Text>
                              </View>

                              <View style={{ marginTop: wide * 0.06, }}>
                                <View style={{
                                  width: '100%', flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  backgroundColor: Colors.playerStatRowFirstClr,
                                  height: wide * 0.075,
                                  borderTopLeftRadius: wide * 0.025,
                                  borderTopRightRadius: wide * 0.025,
                                }}>
                                  <View style={{
                                    width: '30%', alignSelf: 'center',

                                  }}>
                                    <Text style={{
                                      color: Colors.btnBg,
                                      fontFamily: Fonts.SemiBold, fontSize: 14,
                                      lineHeight: 18,
                                      fontWeight: '600',
                                      marginLeft: wide * 0.03
                                    }}>Starters</Text>
                                  </View>

                                  <View style={{
                                    width: '70%',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    alignSelf: "center",
                                  }}>
                                    <Text style={{
                                      color: Colors.light,
                                      fontFamily: Fonts.Regular, fontSize: 14,
                                      lineHeight: 18,
                                      fontWeight: '400',
                                      width: '15%'
                                    }}>Min</Text>
                                    <Text style={{
                                      color: Colors.light,
                                      fontFamily: Fonts.Regular, fontSize: 14,
                                      lineHeight: 18,
                                      fontWeight: '400',
                                      width: '15%'

                                    }}>FG</Text>
                                    <Text style={{
                                      color: Colors.light,
                                      fontFamily: Fonts.Regular, fontSize: 14,
                                      lineHeight: 18,
                                      fontWeight: '400',
                                      width: '15%'
                                    }}>3PT</Text>
                                    <Text style={{
                                      color: Colors.light,
                                      fontFamily: Fonts.Regular, fontSize: 14,
                                      lineHeight: 18,
                                      fontWeight: '400',
                                      width: '15%'
                                    }}>AST</Text>
                                    <Text style={{
                                      color: Colors.light,
                                      fontFamily: Fonts.Regular, fontSize: 14,
                                      lineHeight: 18,
                                      fontWeight: '400',
                                      width: '15%'
                                    }}>PF</Text>
                                    <Text style={{
                                      color: Colors.light,
                                      fontFamily: Fonts.Regular, fontSize: 14,
                                      lineHeight: 18,
                                      fontWeight: '400',
                                      width: '15%',

                                    }}>PTS</Text>
                                  </View>
                                </View>
                                <FlatList
                                  keyExtractor={(item, index) => index.toString()}
                                  style={{ flex: 1 }}
                                  data={playerStatData}
                                  renderItem={(item, index) => this._renderPlayerStat(item, index)}
                                  scrollEnabled={false}
                                />

                              </View>
                              <View style={{
                                width: '90%', alignSelf: 'center',
                                alignItems: "center",
                                marginTop: wide * 0.09
                              }}>
                                <TouchableOpacity style={{
                                  width: '32%',
                                  height: 25,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-evenly',
                                }}
                                // onPress={() => Navigation.navigate('PlayerMore')}
                                >
                                  <TouchableOpacity style={{
                                    borderBottomColor: Colors.greyTxtColor,
                                    borderBottomWidth: 1.5,
                                  }}>
                                    <Text style={{
                                      color: Colors.light, fontSize: 14, fontFamily: Fonts.Regular,
                                      lineHeight: 16, opacity: 0.7,

                                    }}>View More</Text>
                                  </TouchableOpacity>
                                  <Image
                                    style={{
                                      width: wide * 0.025, height: wide * 0.02,
                                      marginHorizontal: wide * 0.01, opacity: 0.7
                                    }} source={require('../../Images/dropDownIconNew.png')} />
                                </TouchableOpacity>


                              </View>

                            </View>
                          </View>

                          : null
                        }

                        {this.state.selectedTab == 'Players' && coachTeamPlayer?.teamPlayersInfoList !== undefined ?


                          <View style={{ flex: 1, }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // marginTop: wide * 0.04,
                              width: '90%',
                              alignSelf: 'center',
                            }}>
                              <FlatList
                                style={{
                                  flex: 1
                                }}
                                data={coachTeamPlayer?.teamPlayerInfoWithCategoryList}
                                renderItem={(item, index) => this._renderNewTeam(item, index)}
                                scrollEnabled={false}
                              // bounces={false}
                              />
                            </View>
                          </View>



                          : null
                        }


                        {/* Roles tab content*/}

                        {this.state.selectedTab === 'Roles' ?
                          <View style={{ flex: 1, }}>

                            <RoleMenuModal show={this.state.showRoleMenuModal} hideModal={() => this.hideRoleMenuModal()} id={this.state.role_id} removeCoach={(id) => this.removeCoachFromRole(id)} />

                            <EditAccessRole showModalProps={this.state.showRoleEdit} onHideModalProps={() => this.onHideRoleEdit()} />


                            <View style={{ width: '95%', alignSelf: 'center' }}>
                              <View style={{
                                flexDirection: 'row',
                                height: wide * 0.1,
                                width: '98%',
                                alignSelf: 'center',
                                borderRadius: wide * 0.025,
                                backgroundColor: Colors.playerCategoryBg,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: wide * 0.05,

                              }}>
                                <Text style={{
                                  color: Colors.light, fontSize: 16, lineHeight: 24,
                                  fontFamily: Fonts.Medium,
                                  marginHorizontal: wide * 0.04,
                                  marginTop: wide * 0.004
                                }}>Admin</Text>
                                <TouchableOpacity
                                  style={{
                                    width: '25%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: wide * 0.02,
                                  }}
                                  onPress={() => {
                                    Navigation.navigate("CoachInviteNew", { ownerId: "1", isAdmin: true, teamId: coachTeam && coachTeam.teamTabInfoDtoList ? coachTeam.teamTabInfoDtoList[0].teamId : "" })
                                  }}
                                  activeOpacity={1}
                                >

                                  <TouchableOpacity style={{
                                    width: wide * 0.06, height: wide * 0.06,
                                    borderColor: Colors.btnBg, borderWidth: 1.5,
                                    borderRadius: wide * 0.06 / 2, alignItems: 'center',
                                    justifyContent: 'center', marginHorizontal: wide * 0.015
                                  }}
                                    onPress={() => {
                                      Navigation.navigate("CoachInviteNew", { ownerId: "1", isAdmin: true, teamId: coachTeam && coachTeam.teamTabInfoDtoList ? coachTeam.teamTabInfoDtoList[0].teamId : "" })
                                    }}
                                    activeOpacity={1}
                                  >
                                    <Image
                                      style={{ width: '60%', height: '60%', }}
                                      source={require('../../Images/newAddTeamIcon.png')}
                                      resizeMode={'cover'}
                                    />

                                  </TouchableOpacity>
                                  <Text style={{
                                    color: Colors.btnBg, fontSize: 16, lineHeight: 22,
                                    fontFamily: Fonts.Medium, marginHorizontal: wide * 0.006
                                  }}>Add</Text>

                                </TouchableOpacity>
                              </View>

                              {teamRoles?.adminRoleList != null && teamRoles?.adminRoleList.length > 0 ?

                                <FlatList
                                  style={{
                                    marginTop: wide * 0.02,
                                    flex: 1
                                  }}
                                  data={teamRoles.adminRoleList}
                                  renderItem={(item, index) => this._renderUserRole(item, index)}
                                />
                                :
                                <></>
                              }
                            </View>

                            {/* For the game support */}

                            <View style={{ width: '95%', alignSelf: 'center' }}>


                              <View style={{
                                flexDirection: 'row',
                                height: wide * 0.1,
                                width: '98%',
                                alignSelf: 'center',
                                borderRadius: wide * 0.025,
                                backgroundColor: Colors.playerCategoryBg,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: wide * 0.05,

                              }}>
                                <Text style={{
                                  color: Colors.light, fontSize: 16, lineHeight: 24,
                                  fontFamily: Fonts.Medium,
                                  marginHorizontal: wide * 0.04,
                                  marginTop: wide * 0.004
                                }}>Game Support</Text>
                                <TouchableOpacity
                                  style={{
                                    width: '25%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: wide * 0.02,
                                  }}
                                  activeOpacity={1}
                                  onPress={() => {
                                    Navigation.navigate("CoachInviteNew", { ownerId: "1", isAdmin: false, teamId: coachTeam && coachTeam.teamTabInfoDtoList ? coachTeam.teamTabInfoDtoList[0].teamId : "" })
                                  }}
                                >

                                  <TouchableOpacity style={{
                                    width: wide * 0.06, height: wide * 0.06,
                                    borderColor: Colors.btnBg, borderWidth: 1.5,
                                    borderRadius: wide * 0.06 / 2, alignItems: 'center',
                                    justifyContent: 'center', marginHorizontal: wide * 0.015
                                  }}
                                    onPress={() => {
                                      Navigation.navigate("CoachInviteNew", { ownerId: "1", isAdmin: false, teamId: coachTeam && coachTeam.teamTabInfoDtoList ? coachTeam.teamTabInfoDtoList[0].teamId : "" })
                                    }}

                                    activeOpacity={1}
                                  >
                                    <Image
                                      style={{ width: '60%', height: '60%', }}
                                      source={require('../../Images/newAddTeamIcon.png')}
                                      resizeMode={'cover'}
                                    />

                                  </TouchableOpacity>
                                  <Text style={{
                                    color: Colors.btnBg, fontSize: 16, lineHeight: 22,
                                    fontFamily: Fonts.Medium, marginHorizontal: wide * 0.006
                                  }}>Add</Text>

                                </TouchableOpacity>
                              </View>
                              {teamRoles?.stackLoggers != null && teamRoles?.stackLoggers.length > 0 ?
                                <FlatList
                                  style={{
                                    marginTop: wide * 0.02,
                                    flex: 1
                                  }}
                                  data={teamRoles.stackLoggers}
                                  renderItem={(item, index) => this._renderUserRole(item, index)}
                                />
                                :
                                <></>
                              }
                            </View>

                          </View>


                          : null
                        }


                        {/* End Roles tab conent */}


                        {this.state.selectedTab === 'Games' ?
                          this.state.gameTabData === undefined ?
                            <></>

                            :
                            <View style={{ flex: 1 }}>
                              {/* Statistical Overview */}
                              <View style={{
                                width: "90%", alignSelf: 'center',
                                marginTop: wide * 0.09
                              }}>
                                <Text style={{
                                  color: Colors.light,
                                  fontFamily: Fonts.SemiBold, fontSize: 20,
                                  lineHeight: 22, fontWeight: '600'
                                }}
                                >
                                  Statistical Overview
                                </Text>
                              </View>

                              <StatisticalOverview
                                homeRecord={this.state.gameTabData && this.state.gameTabData.gameStatisticalView && this.state.gameTabData.gameStatisticalView.homeRecord}
                                awayRecord={this.state.gameTabData && this.state.gameTabData.gameStatisticalView && this.state.gameTabData.gameStatisticalView.awayRecord}
                              />

                              {this.state.pieChartGameData !== null && this.state.pieChartGameData.length > 0 ?
                                <View style={{
                                  width: '90%', height: wide * 0.7,
                                  marginTop: wide * 0.01,
                                  marginHorizontal: wide * 0.05,
                                  // flexDirection: 'row', 
                                  justifyContent: "space-between",
                                  alignItems: 'center',
                                  // backgroundColor: 'green'


                                }}>
                                  <>
                                    {this.state.totalGameMatches !== null && this.state.totalGameMatches > 0 ?
                                      <View style={{
                                        position: 'absolute', top: 80,
                                        alignItems: 'center', justifyContent: 'center',
                                        width: wide * 0.18, height: wide * 0.15,
                                      }}>
                                        <Text style={{
                                          color: Colors.light,
                                          fontFamily: Fonts.Light, fontSize: 24, lineHeight: 24,
                                          fontWeight: '400',
                                          textAlign: 'center',

                                        }}>{this.state.totalGameMatches}</Text>
                                        <Text style={{
                                          color: Colors.light,
                                          fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 14,
                                          fontWeight: '700',
                                          textAlign: 'center',
                                        }}>Total Games</Text>
                                      </View>
                                      : null
                                    }
                                    {this.state.pieChartGameData !== null ?
                                      <View style={{ height: '70%', bottom: 30 }}>
                                        <VictoryChart
                                          width={300}
                                          height={280}
                                        >
                                          <VictoryPie
                                            colorScale={["#246BFD", "#CE1141", "#FDB927",]}
                                            standalone={false}
                                            width={200} height={200}
                                            innerRadius={60}
                                            data={this.state.pieChartGameData}
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
                                  </>

                                  <View style={{
                                    justifyContent: 'space-between',
                                    width: '100%', height: '25%', flexDirection: 'row',
                                    // backgroundColor: 'blue',
                                    bottom: 10
                                  }}>
                                    <View style={{
                                      flexDirection: 'row',
                                      //backgroundColor: 'green',
                                      width: '55%',
                                      justifyContent: 'space-around',
                                      alignItems: 'center'
                                    }}>
                                      <View style={{
                                        height: '60%',
                                        alignItems: "center", justifyContent: 'space-between'
                                      }}>
                                        <Text style={{
                                          color: Colors.compareRankColor, fontSize: 12, lineHeight: 16,
                                          fontWeight: '700',
                                          fontFamily: Fonts.Bold,
                                        }}>W/L Streak </Text>
                                        <Text style={{
                                          color: Colors.light, fontSize: 16, lineHeight: 18,
                                          fontFamily: Fonts.Bold,
                                        }}>{this.state.gameTabData.leaderBoardTeamInfo.streak}</Text>
                                      </View>
                                      <View style={{
                                        height: '60%',
                                        alignItems: "center", justifyContent: 'space-between'
                                      }}>
                                        <Text style={{
                                          color: Colors.compareRankColor, fontSize: 12, lineHeight: 16,
                                          fontWeight: '700',
                                          fontFamily: Fonts.Bold,
                                        }}>Last 10</Text>
                                        <Text style={{
                                          color: Colors.light, fontSize: 16, lineHeight: 18,
                                          fontFamily: Fonts.Bold,
                                        }}>{this.state.gameTabData.leaderBoardTeamInfo.last10}</Text>
                                      </View>
                                    </View>
                                    <View style={{ width: '40%', justifyContent: 'center' }}>
                                      {this.state.pieChartGameData !== undefined && this.state.pieChartGameData.length > 0 ?
                                        <>
                                          <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', }}>
                                            <>
                                              <View style={{ width: 28, height: 2, backgroundColor: '#246BFD' }}></View>
                                              <Text style={{
                                                color: '#246BFD', fontSize: 16, lineHeight: 16,
                                                fontFamily: Fonts.Bold, marginHorizontal: 10
                                              }}>{this.state.pieChartGameData[0]} Wins</Text>
                                            </>

                                          </View>
                                          <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                            <>
                                              <View style={{ width: 28, height: 2, backgroundColor: '#CE1141' }}></View>
                                              <Text style={{
                                                color: '#CE1141', fontSize: 16, lineHeight: 16,
                                                fontFamily: Fonts.Bold, marginHorizontal: 10
                                              }}>{this.state.pieChartGameData[1]} Losses</Text>
                                            </>

                                          </View>

                                        </>
                                        : null
                                      }
                                    </View>
                                  </View>

                                </View>
                                :
                                <EmptyPieChart />
                              }

                              {/* End show piechart data */}

                              {
                                this.state.gameTabData && this.state.gameTabData.recentGamesInfoList && this.state.gameTabData.recentGamesInfoList.map((game, index) => (
                                  <TeamStats
                                    key={`game-${index}`} data={game}
                                    onPress={() => Navigation.navigate('MyTeamRecentGamesDetails')}
                                    premium={this.state.gameTabData && this.state.gameTabData.premiumPurchased}
                                  />
                                ))
                              }






                              {this.state.gameTabData !== undefined && this.state.gameTabData?.recentMatches?.length > 0 ?
                                <View style={{ marginTop: 25, }}>
                                  <Title data={'Recent Games'} />
                                  <View style={{ marginHorizontal: 20 }}>

                                    <FlatList
                                      style={{ flex: 1, overflow: 'visible' }}
                                      data={this.state.gameTabData?.recentMatches}
                                      renderItem={(item, index) => this._renderListOfRecentMatches(item, index)}
                                      horizontal
                                      showsHorizontalScrollIndicator={false}
                                    // stickyHeaderIndices={[0]}
                                    />
                                  </View>
                                </View>

                                : null
                              }
                              {this.state.gameTabData !== undefined && this.state.gameTabData?.upcomingMatches?.length > 0 ?
                                <View style={{ marginTop: 25, }}>
                                  <Title data={'Upcoming Games'} />
                                  <View style={{ marginHorizontal: 20 }}>
                                    <FlatList
                                      style={{ flex: 1, overflow: 'visible' }}
                                      data={this.state.gameTabData?.upcomingMatches}
                                      renderItem={(item, index) => this._renderListOfRecentMatches(item, index)}
                                      horizontal
                                      showsHorizontalScrollIndicator={false}
                                    />
                                  </View>
                                </View>

                                : null
                              }



                            </View>


                          : null
                        }

                        {this.state.selectedTab == 'Line Up' ?
                          // this.state.lineUpData == null  ?
                          // <></>
                          // :
                          <>
                            {/* Coach LineUp */}
                            <View style={{
                              width: "90%", alignSelf: 'center',
                              marginTop: wide * 0.08,
                            }}>
                              <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.SemiBold, fontSize: 22,
                                lineHeight: 22, fontWeight: '600'
                              }}
                              >
                                Coach Lineup
                              </Text>
                            </View>

                            <View style={{
                              width: '90%', alignSelf: 'center',
                            }}>
                              <FlatList
                                style={{ flex: 1, overflow: 'visible' }}
                                data={[1, 2]}
                                renderItem={(item, index) => this.renderCoachLineUp(item, index)}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                              />
                            </View>

                            {/* AI Based lineup */}

                            <View style={{
                              width: "90%", alignSelf: 'center',
                              marginTop: wide * 0.09,
                            }}>
                              <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.SemiBold, fontSize: 22,
                                lineHeight: 22, fontWeight: '600'
                              }}
                              >
                                AI Base Lineup
                              </Text>
                            </View>

                            <View style={{
                              width: '90%', alignSelf: 'center',
                            }}>
                              <FlatList
                                style={{ flex: 1, overflow: 'visible' }}
                                data={[1]}
                                renderItem={(item, index) => this.renderAILineUp(item, index)}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                              />
                            </View>

                            <View style={{ width: '90%', alignSelf: 'center', }}>
                              <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                  width: wide * 0.8,
                                  height: 48,
                                  backgroundColor: Colors.btnBg,
                                  alignSelf: 'center', borderRadius: 24,
                                  justifyContent: 'center',
                                  marginTop: wide * 0.08,

                                }}
                                onPress={() => Navigation.navigate('CreateLineUp')}
                              >
                                <Text style={{
                                  alignSelf: 'center', color: Colors.light,
                                  fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                                  fontWeight: '700',
                                }}>Create Lineup</Text>
                              </TouchableOpacity>
                            </View>
                          </>

                          : null
                        }

                        {this.state.selectedTab == 'Schedule' ?

                          <>
                            {/* Upcomming Game */}
                            <View style={{
                              width: "90%", alignSelf: 'center',
                              marginTop: wide * 0.08,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: "center"
                            }}>
                              <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.SemiBold, fontSize: 22,
                                lineHeight: 22, fontWeight: '600'
                              }}
                              >
                                Upcoming Games
                              </Text>
                              <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: wide * 0.01

                              }}>
                                <Text style={{
                                  color: Colors.btnBg,
                                  fontFamily: Fonts.Medium, fontSize: 14,
                                  lineHeight: 16, fontWeight: '500'
                                }}
                                >
                                  See All
                                </Text>
                                <Image
                                  source={require('../../Images/seeAll_Icon.png')}
                                  style={{ width: 14, height: 14 }}
                                />
                              </TouchableOpacity>
                            </View>

                            <View style={{
                              width: '90%', alignSelf: 'center',
                              marginTop: wide * 0.035
                            }}>
                              <FlatList
                                style={{ flex: 1, overflow: 'visible' }}
                                data={[1, 2]}
                                renderItem={(item, index) => this._renderUpcommingGame(item, index)}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                              />
                            </View>

                            {/* Practice Schedule */}

                            <View style={{
                              width: "90%", alignSelf: 'center',
                              marginTop: wide * 0.09,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: "center"
                            }}>
                              <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.SemiBold, fontSize: 22,
                                lineHeight: 22, fontWeight: '600'
                              }}
                              >
                                Practice Schedule
                              </Text>
                              <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: wide * 0.01

                              }}>
                                <Text style={{
                                  color: Colors.btnBg,
                                  fontFamily: Fonts.Medium, fontSize: 14,
                                  lineHeight: 16, fontWeight: '500'
                                }}
                                >
                                  See All
                                </Text>
                                <Image
                                  source={require('../../Images/seeAll_Icon.png')}
                                  style={{ width: 14, height: 14 }}
                                />
                              </TouchableOpacity>
                            </View>

                            <View style={{
                              width: '90%', alignSelf: 'center',
                              alignItems: "center",
                              marginTop: wide * 0.03

                            }}>
                              <View style={{
                                width: '100%', backgroundColor: Colors.playerCategoryBg,
                                height: wide * 0.45,
                                borderRadius: wide * 0.03,
                              }}>
                                <Image style={{
                                  width: '95%', height: wide * 0.25,
                                  borderRadius: 12,
                                  marginTop: wide * 0.025,
                                  alignSelf: 'center'
                                }}
                                  source={require('../../Images/schedule_ground.png')}
                                />
                                <View style={{
                                  width: '92%', alignSelf: 'center',
                                  marginTop: wide * 0.05
                                }}>
                                  <Text style={{
                                    color: Colors.light,
                                    fontFamily: Fonts.SemiBold, fontSize: 16,
                                    lineHeight: 18, fontWeight: '600'
                                  }}
                                  >
                                    21 August 2022, 13:13
                                  </Text>
                                  <Text style={{
                                    color: Colors.light,
                                    fontFamily: Fonts.Medium, fontSize: 13,
                                    lineHeight: 16, fontWeight: '500',
                                    opacity: 0.5,
                                    marginTop: wide * 0.01
                                  }}
                                  >
                                    #practice #mupractice #basketballpractice
                                  </Text>
                                </View>

                              </View>
                            </View>

                            <View style={{ width: '90%', alignSelf: 'center', }}>
                              <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                  width: wide * 0.8,
                                  height: 48,
                                  backgroundColor: Colors.btnBg,
                                  alignSelf: 'center', borderRadius: 24,
                                  justifyContent: 'center',
                                  marginTop: wide * 0.2,

                                }}
                                onPress={() => Navigation.navigate('CreatePractice')}
                              >
                                <Text style={{
                                  alignSelf: 'center', color: Colors.light,
                                  fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                                  fontWeight: '700',
                                }}>Create Practice</Text>
                              </TouchableOpacity>
                            </View>
                          </>

                          : null
                        }




                        {/* </View> */}

                      </ScrollView>
                    </>
                  :
                  <View style={{
                    flex: 1, alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'green',
                    marginTop: wide / 2
                  }}>
                    {/* <Text style={{
                                                color: Colors.light,
                                                fontSize: 16, lineHeight: 24,
                                                fontFamily: Fonts.Bold,
                                                marginBottom: 10
                                            }}>No Team Found...</Text>
                                            <TouchableOpacity
                                                style={{
                                                    width: wide * 0.8, height: 48,
                                                    backgroundColor: Colors.btnBg,
                                                    alignSelf: 'center', borderRadius: 24,
                                                    justifyContent: 'center',
                                                    marginBottom: 50,
                                                    marginTop: 20,
                                                }} onPress={() => {
                                                    Navigation.navigate('CoachAddTeam');
                                                }}>
                                                <Text style={{
                                                    alignSelf: 'center', color: Colors.light,
                                                    fontFamily: Fonts.Bold,
                                                }}>Create Your Team</Text> */}
                    {/* </TouchableOpacity> */}

                  </View>

              }


              {/* </View> */}
              {/* <AppLoader visible={this.state.removeLoading} /> */}
              {/* </ScrollView> */}

              {this.state.selectedTab === 'Players' &&
                this.state.showMsgModal === false && this.state.selectedPlayer.length > 0 ?
                <View style={{
                  height: wide * 0.18, width: '90%', backgroundColor: Colors.base,
                  justifyContent: 'center', marginHorizontal: wide * 0.06,

                }}>
                  {this.state.selectedPlayerIndex.length > 0 ?
                    <Text style={{
                      color: Colors.light,
                      fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 16,
                      marginHorizontal: wide * 0.04, marginBottom: 5
                    }}>{this.state.selectedPlayerIndex.length} Player selected</Text>
                    : null
                  }
                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-around',
                    width: '95%', marginHorizontal: wide * 0.02,
                  }}>
                    <TouchableOpacity style={{
                      backgroundColor: Colors.btnBg,
                      height: wide * 0.06, width: '40%',
                      alignItems: 'center', justifyContent: 'center',
                      borderRadius: wide * 0.01
                    }}
                      onPress={() => this._handleAssignChallenge()}
                    >
                      <Text style={{
                        color: Colors.light,
                        fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                      }}>Assign Challenge</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      height: wide * 0.06, width: '25%',
                      alignItems: 'center', justifyContent: 'center',
                      borderRadius: wide * 0.01, borderWidth: 1, borderColor: Colors.light
                    }}
                      onPress={() => this._handleMsgModalShow()}
                    >
                      <Text style={{
                        color: Colors.light,
                        fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                      }}>Message</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      backgroundColor: Colors.pendingInviteTxtColor,
                      height: wide * 0.06, width: '25%',
                      alignItems: 'center', justifyContent: 'center',
                      borderRadius: wide * 0.01,
                    }}
                      onPress={() => this._handleRemovePlayer()}
                    >
                      <Text style={{
                        color: Colors.light,
                        fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                      }}>Remove</Text>

                    </TouchableOpacity>
                  </View>


                </View>
                : null
              }
              {this.state.showMsgModal === true ?

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.showMsgModal}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ showMsgModal: false, txtMsg: '', msgCount: 0 })}
                    style={{
                      width: wide,
                      height: high,
                      justifyContent: 'center', alignItems: 'center'
                    }}
                  >
                    <BlurView style={{
                      width: wide,
                      height: high,
                      position: 'absolute',
                      // justifyContent: 'center', alignItems: 'center'
                    }}
                      blurAmount={10}
                      blurRadius={10}
                    />
                    <View style={{
                      width: '80%',
                      // height: wide,
                      backgroundColor: Colors.ractangelCardColor,
                      // marginTop: -wide * 0.12,
                      bottom: 100,
                      borderRadius: 20,
                      alignItems: 'center',

                      // justifyContent: 'space-between',
                    }}>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between', width: '90%', marginTop: 10
                      }}>
                        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, left: 10 }} >Type your message here (Optional)</Text>
                        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, right: 10 }}>{this.state.msgCount} / 260</Text>
                      </View>

                      <TextInput style={{
                        width: '85%',
                        height: wide * 0.6,
                        borderWidth: 3,
                        borderColor: Colors.borderColor,
                        fontFamily: Fonts.Regular,
                        borderRadius: 5,
                        color: Colors.light,
                        fontSize: 16, textAlign: 'auto',
                        marginTop: 15,
                        padding: 10,
                      }}
                        textAlignVertical='top'
                        // numberOfLines={5}
                        autoCorrect={false}
                        autoCapitalize='none'
                        // placeholder='Type Here...'
                        // placeholderTextColor={Colors.borderColor}
                        multiline
                        maxLength={260}
                        onChangeText={(e) => {
                          if (e.length > 0) {
                            this.setState({ isMsgSendEnable: true });
                          } else {
                            this.setState({ isMsgSendEnable: false });
                          }
                          this.setState({ txtMsg: e, msgCount: e.length });
                        }}
                      />
                      <View style={{
                        width: '90%',
                        height: wide * 0.09,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 30,
                        marginBottom: 15,
                      }}>
                        <TouchableOpacity style={{
                          // backgroundColor: Colors.btnBg,
                          width: '40%', borderRadius: 5,
                          borderColor: Colors.light, borderWidth: 1,
                          justifyContent: 'center', alignItems: 'center',

                        }}
                          activeOpacity={1}
                          onPress={() => this.setState({ showMsgModal: false, txtMsg: '', msgCount: 0 })}
                        >
                          <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 14, }}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          key={isMsgSendEnable}
                          style={{
                            backgroundColor: Colors.btnBg,
                            width: '40%', height: wide * 0.09, borderRadius: 5,
                            justifyContent: 'center', alignItems: 'center',
                            opacity: isMsgSendEnable === false ? 0.3 : 1.0,

                          }}
                          activeOpacity={1}
                          onPress={() => {
                            if (isMsgSendEnable) {
                              this._handleMessageSend()
                            }

                          }}
                        >
                          <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 14, }}>Send</Text>
                        </TouchableOpacity>

                      </View>

                    </View>

                    {/* </BlurView> */}
                  </TouchableOpacity>
                </Modal>

                : null

              }
            </KeyboardAvoidingView>
          }

          {this.state.showSessionDropDown === true ?
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.showSessionDropDown}
            >
              <TouchableOpacity
                onPress={() => this.setState({ showSessionDropDown: false })}
                style={{
                  width: wide,
                  height: high,
                  justifyContent: 'center', alignItems: 'center'
                }}
              >


                <BlurView style={{
                  width: wide,
                  height: high,
                  position: 'absolute',
                  // justifyContent: 'center', alignItems: 'center'
                }}
                  blurAmount={10}
                  blurRadius={10}
                />
                <View style={{
                  width: '60%', height: wide * 0.5, backgroundColor: Colors.ractangelCardColor,
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


                  <View style={{ width: '60%', height: '80%', }}>
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      style={{ flex: 1 }}
                      data={coachTeam?.seasonLists}
                      renderItem={(item, index) => this._renderSessionList(item, index)}
                    />
                  </View>


                </View>

                {/* </BlurView> */}
              </TouchableOpacity>
            </Modal>
            : null
          }
          {this.state.showPlayerCatDropDown === true ?
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.showPlayerCatDropDown}
            >
              <TouchableOpacity
                onPress={() => this.setState({ showPlayerCatDropDown: false })}
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
                  {coachTeamPlayer?.playerCategories !== null && coachTeamPlayer?.playerCategories.length > 0 ?
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
                        onPress={() => this.setState({ playerCatSelectedVal: 'All Players', showPlayerCatDropDown: false }, () => {
                          // this._filterTeamSeasonWise();
                        })}
                      >
                        <Text style={{
                          color: this.state.playerCatSelectedVal === 'All Players' ? Colors.btnBg : Colors.light,
                          fontFamily: Fonts.Bold,
                          fontSize: 14, lineHeight: 16,

                        }}>All Players</Text>
                      </TouchableOpacity>
                      {coachTeamPlayer?.playerCategories.map(obj => {
                        return (
                          <TouchableOpacity style={{
                            height: 20, alignItems: 'center',
                            // backgroundColor: 'green',
                            marginTop: 15
                          }}
                            activeOpacity={1}
                            onPress={() => this.setState({ playerCatSelectedVal: obj, showPlayerCatDropDown: false }, () => {
                              // this._filterTeamSeasonWise();
                            })}
                          >
                            <Text style={{
                              color: this.state.playerCatSelectedVal === obj ? Colors.btnBg : Colors.light,
                              fontFamily: Fonts.Bold,
                              fontSize: 14, lineHeight: 16,

                            }}>{obj}</Text>
                          </TouchableOpacity>

                        )
                      })}
                    </View>
                    : null
                  }


                </View>

                {/* </BlurView> */}
              </TouchableOpacity>
            </Modal>
            : null
          }
          {this.state.showStatModal === true ?
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.showStatModal}
            >
              <TouchableOpacity
                onPress={() => this.setState({ showStatModal: false })}
                style={{
                  width: wide,
                  height: high,
                  justifyContent: 'center',
                  alignItems: 'center'
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
                  width: '70%',
                  borderRadius: 20,
                  backgroundColor: Colors.ractangelCardColor,
                  // alignItems: 'center',

                }}>
                  <View style={{
                    height: '15%', width: '100%',
                    alignItems: 'center', justifyContent: 'center',
                    // backgroundColor: 'blue',
                  }}>
                    <Text style={{
                      color: Colors.light,
                      fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                    }}>Select</Text>
                  </View>
                  <View style={{
                    width: '100%', flexDirection: 'row',
                    // alignItems: 'center', 
                    justifyContent: 'space-around',
                    // backgroundColor: 'green'
                  }}>
                    <View style={{
                      width: '40%',
                      alignItems: 'center', justifyContent: 'space-evenly',
                      // backgroundColor: 'red'
                    }}>
                      {coachTeam?.teamTabInfoDtoList[0].kpi.map((val, index) => {
                        if (index % 2 == 0) {
                          return (
                            <TouchableOpacity
                              style={{
                                marginTop: 15,
                                width: 60, height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: this.state.selectedKpi.includes(val) ? Colors.btnBg : Colors.light, borderRadius: 5,
                                backgroundColor: this.state.selectedKpi.includes(val) ? Colors.btnBg : null,
                                // backgroundColor: this.state.selectedKpi.includes(val) ? Colors.btnBg : this.state.selectedKpi.includes(this.state.defaultKpi) ? Colors.btnBg : null,
                              }}
                              onPress={() => this._handleKpiSelect(val)}
                            >
                              <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                              }}>{val}</Text>
                            </TouchableOpacity>

                          )
                        }

                      })}

                    </View>
                    <View style={{
                      borderWidth: 1,
                      borderColor: Colors.teamTabPlayerCardBorder,
                      marginTop: 15
                    }}></View>
                    <View style={{
                      width: '40%',
                      alignItems: 'center',
                      // justifyContent: 'space-around',
                      // backgroundColor: 'red'
                    }}>
                      {coachTeam?.teamTabInfoDtoList[0].kpi.map((val, index) => {
                        if (index % 2 !== 0) {
                          return (
                            <TouchableOpacity
                              style={{
                                marginTop: 15,
                                width: 60, height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: this.state.selectedKpi.includes(val) ? Colors.btnBg : Colors.light, borderRadius: 5,
                                // marginTop: wide * 0.05,
                                // backgroundColor: this.state.selectedKpi.includes(val) ? Colors.btnBg : this.state.selectedKpi.includes(this.state.defaultKpi) ? Colors.btnBg : null,
                                backgroundColor: this.state.selectedKpi.includes(val) ? Colors.btnBg : null,
                              }}
                              onPress={() => this._handleKpiSelect(val)}
                            >
                              <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                              }}>{val}</Text>
                            </TouchableOpacity>

                          )
                        }

                      })}

                    </View>
                  </View>
                  {/* <View style={{
                                        position: 'absolute', marginTop: wide * 0.16, borderWidth: 1,
                                        borderColor: Colors.teamTabPlayerCardBorder, height: '70%'
                                    }}></View> */}

                </View>



                {/* </BlurView> */}
              </TouchableOpacity>
            </Modal>
            : null
          }


          {/* </TouchableOpacity > */}
          {this.state.isGamePremiumCardneedtoShow == true ?
            this.state.selectedTab == 'Games' &&
              this.state.gameTabData?.premiumPurchased != undefined ?
              <View style={{
                position: "absolute", width: '100%',
                bottom: 0
              }}>
                {/* <GamePlanCard premium={this.state.gameTabData && this.state.gameTabData.premiumPurchased}
                  bannerInfo={this.state.gameTabData && this.state.gameTabData.bannerInfo}
                  onPurchasePress={() => Navigation.navigate('CoachPremiumCard')}
                /> */}
              </View>
              :
              <></>
            : <></>
          }


        </SafeAreaView>
      </View>
    );
  }
}

export const MyTeamTabStats = ({ barData1, barData2, selectedKpiLength }) => {
  console.log("----sjsjks", barData1, "kk", barData2)
  var heightToBe = barData1;
  var isBothArr = false;
  if (barData1.length <= 0) {
    heightToBe = barData2;
  }
  if (barData1.length > 0 && barData2.length > 0) {
    isBothArr = true;
  }

  return (
    <>
      {/* <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                // display: 'flex'
            }}> */}
      <VictoryChart
        width={360}
        height={isBothArr ? (heightToBe.length <= 2 ? 90
          : heightToBe.length <= 3 ? 160
            : heightToBe.length <= 5 ? 230
              : heightToBe.length <= 8 ? 380
                : heightToBe.length <= 10 ? 450
                  : heightToBe.length <= 13 ? 580
                    : heightToBe.length <= 15 ? 650
                      : heightToBe.length <= 18 ? 750 : 800) :
          (heightToBe.length <= 2 ? 70
            : heightToBe.length <= 3 ? 100
              : heightToBe.length <= 5 ? 160
                : heightToBe.length <= 8 ? 270
                  : heightToBe.length <= 10 ? 320
                    : heightToBe.length <= 13 ? 390
                      : heightToBe.length <= 15 ? 450
                        : heightToBe.length <= 18 ? 550 : 750)}
        // height={barData1.length <= 2 ? 100 : barData1.length <= 3 ? 200 : barData1.length <= 5 ? 300 :
        //     barData1.length <= 10 ? 400 : barData1.length <= 15 ? 550 : barData1.length <= 18 ? 650 : 750}
        // height={barData.bar1.length <= 2 ? 100 : barData.bar1.length <= 3 ? 200 : barData.bar1.length <= 5 ? 300 :
        //     barData.bar1.length <= 10 ? 400 : barData.bar1.length <= 15 ? 550 : barData.bar1.length <= 18 ? 650 : 750}
        // horizontal
        // domainPadding={{ x: 150 }}
        padding={{ left: 90, right: 40, bottom: 10, top: 10 }}
        domainPadding={{ x: 10, y: 15, }}
      >
        <VictoryGroup
          offset={barData1.length <= 2 ? 25 : 15}
          // offset={barData.bar1.length <= 2 ? 20 : 15}
          colorScale={'qualitative'}
        >
          {/* {barData1 !== null && selectedKpiLength > 1 ? */}
          <VictoryBar
            horizontal
            // padding={{ top: 20, bottom: 60 }}
            data={barData1}
            // data={barData.bar1}
            // animate={{
            //     duration: 2000,
            //     onLoad: { duration: 1000 },
            // }}
            labels={({ datum }) => `${datum.y.toString()}`}
            labelComponent={<VictoryLabel dy={0} dx={5} style={{ fill: '#D8A433', }} />}

            // x="name"
            // y="value"
            // cornerRadius={6}
            style={{
              data: {
                fill: '#D8A433',
                // margin: 10
              },

            }}
            barWidth={10}
          // labelComponent={<VictoryLabel dx={10}
          //     style={{ fill: 'red', padding: 20 }} />
          // }
          />
          {/* : null
                    } */}
          {/* {barData2 !== null && selectedKpiLength > 1 ? */}
          <VictoryBar
            horizontal
            // offsetY={20}
            // padding={{ top: 40, bottom: 60 }}
            // data={[
            //     { x: 1, y: 200 },
            //     { x: 2, y: 150 },
            //     { x: 3, y: 320 },
            //     { x: 4, y: 150 },

            // ]}
            data={barData2}
            // data={barData.bar2}
            labels={({ datum }) => `${datum.y.toString()}`}
            labelComponent={<VictoryLabel dy={0} dx={5} style={{ fill: '#74C896' }} />}
            // animate={{
            //     duration: 2000,
            //     onLoad: { duration: 1000 },
            // }}
            // x="name"
            // y="value"
            // cornerRadius={6}
            style={{
              data: {
                fill: '#74C896',
                // margin: 10
              },
            }}
            barWidth={10}

          // labelComponent={<VictoryLabel dx={10}
          //     style={{ fill: 'red', padding: 20 }} />
          // }
          />
          {/* : null} */}

          {/* <VictoryAxis
                            style={{
                                tickLabels: { fill: Colors.light, },
                            }}
                        /> */}
          {/* <VictoryAxis
                                  dependentAxis={true}
                                  tickValues={['₹0K', '₹10K', '₹20K', '₹30K']}
                                  style={{
                                    tickLabels: { fill: 'white' },
                                    ticks: { stroke: 'black' },
                                  }}
                                /> */}
        </VictoryGroup>
        <VictoryAxis
          // fixLabelOverlap={true}
          // width={100}
          offsetX={85}
          style={{
            tickLabels: {
              fill: Colors.light, fontSize: 12, lineHeight: 16,
              paddingHorizontal: 15,
              fontFamily: Fonts.Bold
            },
            axis: { stroke: Colors.base, }

          }}

        />
      </VictoryChart>
      {/* </View> */}
    </>

  )

}


export const GameStats = ({ barData1 }) => {
  // console.log("----sjsjks", barData1)
  return (
    <View style={{}}>
      <VictoryChart
        width={350}
        height={barData1.length <= 2 ? 100 : barData1.length <= 3 ? 200 : barData1.length <= 5 ? 250 :
          barData1.length <= 10 ? 400 : barData1.length <= 15 ? 550 : barData1.length <= 18 ? 650 : 750}

        // padding={{ left: 50, right: 40, bottom: 30, top: 5 }}
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

const DropDown = ({ dropData, onSelectionChange }) => {
  console.log("----->>>", dropData)
  return (
    <SelectDropdown
      dropdownStyle={{
        width: wide * 0.38,
        backgroundColor: Colors.dropDownBackGround, borderRadius: wide * 0.015,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
      }}
      rowTextStyle={{
        color: Colors.light, fontSize: 13, lineHeight: 12,
        fontFamily: Fonts.Bold,
      }}
      buttonStyle={{
        width: wide * 0.38, height: wide * 0.08,
        backgroundColor: Colors.dropDownBackGround, borderRadius: wide * 0.015,
        justifyContent: 'center'
      }}
      buttonTextStyle={{
        color: Colors.light, fontSize: 13, lineHeight: 12,
        fontFamily: Fonts.Bold,
      }}
      renderDropdownIcon={() =>
        <Image
          style={{
            width: wide * 0.035, height: wide * 0.025, left: 5
          }} source={require('../../Images/dropDownIconNew.png')} />
      }
      dropdownIconPosition={'right'}
      defaultValueByIndex={0}
      data={dropData !== undefined ? dropData : []}
      onSelect={(selectedItem, index) => {
        // console.log(selectedItem, index);
        onSelectionChange(selectedItem);
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
    />
  )
}


function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    User: entities.user,
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(MyTeams);
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
    color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
    marginTop: 6, textAlign: 'center'
  },
  blankTextPoint: {
    color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
    textAlign: 'center'
  },
  textPointHeading: {
    color: Colors.fontColorGray, fontSize: 14, fontFamily: Fonts.SemiBold,
  },
  textPointCenter: {
    color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
    marginTop: 6, textAlign: 'center'
  },
});
