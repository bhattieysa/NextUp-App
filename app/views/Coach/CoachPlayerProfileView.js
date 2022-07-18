import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, key,
  KeyboardAvoidingView, FlatList, Platform, ScrollView, Modal
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
  CommonStyles,

} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';


import { connect } from 'react-redux';

import { getObject } from '../../middleware';
import { getUserInfo, getPlayerDashBoard } from '../../actions/home';
import CommonVideoComponent from '../Messages/videoView/commonVideoComponent';
import FastImage from 'react-native-fast-image'
import { SenderRecevrModel, UserModel } from '../../constants/constant'
// import { ScrollView } from 'react-native-gesture-handler';
import { isNotch } from '../../utils/deviceInfo';
import {
  VictoryTheme, VictoryLabel, VictoryContainer, VictoryPolarAxis, VictoryChart,
  VictoryGroup, VictoryArea, VictoryBar, VictoryAxis
} from 'victory-native';
import * as Progress from 'react-native-progress';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Card } from '../../components/common/DashBoardCard';
import { Title } from '../../components/common/titleLabel';
import { barData, radarData, radarKpi } from '../../constants/chartData'
import { EmptyBarChart } from './Components/EmptyPieChart'
import QuickBoxScoreTable from '../../components/common/QuickBoxScoreTable';
import SideBySideBarGraph from '../../components/common/SideBySideBar';
import { BlurView } from '@react-native-community/blur';

let wide = Layout.width;
let high = Layout.height;
var pageNum = 1

const characterData = [
  { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
  { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
  { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
];
// const barData = [
//     { month: 1, value: 250 },
//     { month: 2, value: 350 },
//     { month: 3, value: 450 },
//     { month: 4, value: 550 },
//     { month: 5, value: 650 },
//     { month: 6, value: 750 },
// ];

const pgs = {
  "2PT%": "10.5",
  "STL": "10.5",
  "PTS": "10.5"
}

class CoachPlayerProfileView extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      arrReel: [],
      isPlayVideo: false,
      videoUrlToPlay: '',
      isDataAllFetched: false,
      randNum: 0,
      playerId: props.navigation.state.params !== undefined ? props.navigation.state.params.playerId : null,
      tabs: [{ id: 1, tab_nm: 'Stats' }, { id: 2, tab_nm: 'Challenges' }],
      selectedTab: "Stats",
      selectedTabIndex: 0,
      data: [],//this.processData(characterData),
      maxima: [],//this.getMaxima(characterData),
      radarChartData: [],
      bar1_Data: [],
      bar2_Data: [],
      showBar: false,
      dashboardData: [],
      isStatNull: false,
      isRadarLblShow: true,
      isBarLblShow: true,
      statTabelData: null,
      seasonList: null,
      firstDropSelectedVal: null,
      secondDropSelectedVal: null,
      sideBySideBarData: null,
      showFirstSeasonDrop: false,
      showSecondSeasonDrop: false,

    };
  }
  componentDidMount() {
    pageNum = 1
    this.props.navigation.addListener('didFocus', this.onScreenFocus)
  }
  onScreenFocus = () => {
    // this.getVideos()
    if (this.state.playerId != null) {
      this.setState({ loading: true }, () => {
        console.log("HomeFeed call");
        this.props.dispatch(getPlayerDashBoard(this.state.playerId, (res, resData) => {
          if (res) {

            var seasonArr = [];
            var arr = [];
            debugger
            this.setState({ dashboardData: resData }, () => {
              if (resData?.standingSeasonInfo != null) {
                debugger
                resData?.standingSeasonInfo?.statsForSeasonList.forEach((item, index) => {
                  var obj = item?.seasonStats;
                  seasonArr.push(item.season)
                  arr.push({ ...obj, id: "#" + index })
                })
                debugger
                this.setState({
                  firstDropSelectedVal: seasonArr[0], secondDropSelectedVal: seasonArr[1],
                  statTabelData: arr, seasonList: seasonArr,

                }, () => {
                  this.filterBarChartData()
                })
              } else {
                this.filterBarChartData()

              }
              // this._filterSideBySideChartData();
            })
          }
        }))
      })
    }
    // else {
    //     getObject('UserId').then((obj) => {
    //         this.setState({ loading: true }, () => {
    //             this.props.dispatch(homePlayerFeed(obj, (res) => {
    //                 this.setState({ loading: false }, () => {
    //                     this.filterBarChartData();
    //                 })

    //                 // setTimeout(() => {

    //                 // }, 0)

    //             }))
    //         })
    //     })
    // }

  }
  getVideos = () => {
    // if (!this.state.isDataAllFetched) {
    if (this.state.playerId != null) {
      this.props.dispatch(getReels(this.state.playerId, pageNum, false, (res, resData) => {
        console.log("Video call", resData);
        // if (resData.length === 0) {
        //   this.setState({ isDataAllFetched: true })
        // }
        if (this.state.arrReel.length > 0) {
          debugger
          this.setState({ loading: false, arrReel: [...this.state.arrReel, ...resData] })
        } else {
          debugger
          this.setState({ loading: false, arrReel: resData })
        }

      }))
    } else {
      getObject('UserId').then((obj) => {
        // this.setState({ loading: true }, () => {
        this.props.dispatch(getReels(obj, pageNum, false, (res, resData) => {
          console.log(resData);
          // if (resData.length === 0) {
          //   this.setState({ isDataAllFetched: true })
          // }
          if (this.state.arrReel.length > 0) {
            debugger
            this.setState({ loading: false, arrReel: [...this.state.arrReel, ...resData] })
          } else {
            debugger
            this.setState({ loading: false, arrReel: resData })
          }

        }))
      })
    }
    // })
    //}
  }

  filterBarChartData = () => {
    this.setState({ loading: true, bar1_Data: [], bar2_Data: [], showBar: false });
    const { dashboardData } = this.state
    debugger
    if (dashboardData !== null) {
      var bar1 = dashboardData.userBarGraphComparisonDto?.playerAverageKpi;
      var arr1 = [];
      var isBarStat = false;
      debugger
      if (bar1 !== null && bar1 !== undefined) {
        isBarStat = false;
        for (let key in bar1) {
          arr1.push({ x: key, y: parseFloat(bar1[key]) })
        }
      }
      else {
        isBarStat = true;
        // for (let key in barData) {
        //     arr1.push({ x: key, y: barData[key] })
        // }
      }
      debugger
      console.log("----a-a-a", arr1);
      this.setState({ bar1_Data: arr1 });
      var bar2 = dashboardData.userBarGraphComparisonDto.userKpi;
      var arr2 = [];
      if (bar2 !== null && bar2 !== undefined) {
        for (let key in bar2) {
          arr2.push({ x: key, y: parseFloat(bar2[key]) })
        }
        if (isBarStat == true) {
          this.setState({ bar2_Data: arr2, bar1_Data: [], isStatNull: false, isBarLblShow: false, showBar: true, });
        }
        else {
          this.setState({ bar2_Data: arr2, bar1_Data: arr1, isStatNull: isBarStat, isBarLblShow: true, showBar: true, });
        }
      }
      // else {
      //     for (let key in barData) {
      //         arr2.push({ x: key, y: barData[key] })
      //     }
      //     this.setState({ bar2_Data: arr2, isStatNull: isBarStat });
      // }
      debugger
      console.log("----a-a-a", arr2);
      // this.setState({ bar2_Data: arr2, isStatNull: isBarStat });
      this.prepareRadarChartData(dashboardData);
    }
    // this.setState({ loading: false });
  }

  prepareRadarChartData = (data) => {
    var usrRadarVal = data.userBarGraphComparisonDto?.userRadarValues;
    var avgRadarVal = data.userBarGraphComparisonDto?.averageRadarValue;
    var kpiLabel = data.userBarGraphComparisonDto?.radarKpi;
    var dataObj1;
    var dataObj2;
    var arr = [];
    var isBarStat = false;
    debugger
    if (usrRadarVal !== null && usrRadarVal !== undefined) {
      isBarStat = false;
      debugger
      for (let i = 0; i < kpiLabel.length; i++) {
        var lbl = kpiLabel[i];
        dataObj1 = { ...dataObj1, [lbl]: avgRadarVal[i] }
        dataObj2 = { ...dataObj2, [lbl]: usrRadarVal[i] }
      }
      arr.push(dataObj1);
      arr.push(dataObj2);
      console.log("arrraaayyy", arr);
      debugger
      this.setState({
        radarChartData: arr, data: this.processData(arr),
        maxima: this.getMaxima(arr), loading: false, showBar: true,
        isStatNull: isBarStat, isRadarLblShow: true
      })
    }
    debugger
    this._filterSideBySideChartData();
    // else {
    //     isBarStat = true;
    //     for (let i = 0; i < radarData.length; i++) {
    //         // var lbl = kpiLabel[i];    // crash issue
    //         var lbl = radarKpi[i];
    //         dataObj1 = { ...dataObj1, [lbl]: radarData[i] }
    //         dataObj2 = { ...dataObj2, [lbl]: radarData[i] }
    //     }
    //     arr.push(dataObj1);
    //     arr.push(dataObj2);
    //     console.log("arrraaayyy", arr);
    //     debugger
    //     this.setState({
    //         radarChartData: arr, data: this.processData(arr),
    //         maxima: this.getMaxima(arr), loading: false, showBar: true,
    //         isStatNull: isBarStat, isRadarLblShow: false
    //     })


    //     // this.setState({ radarChartData: [], data: [], maxima: [], loading: false, })
    //     // this.setState({
    //     //     radarChartData: radarChartData, data: this.processData(radarChartData),
    //     //     maxima: this.getMaxima(radarChartData), loading: false, showBar: true,
    //     //     isStatNull: isBarStat
    //     // })

    // }


  }


  _filterSideBySideChartData = () => {
    debugger
    const { dashboardData, firstDropSelectedVal, secondDropSelectedVal } = this.state
    debugger
    if (firstDropSelectedVal != null && secondDropSelectedVal != null) {
      var statsArr = dashboardData?.standingSeasonInfo?.statsForSeasonList;
      var filteredArr = [];
      var isFirstSeason = false;
      var isSecondSeason = false;
      statsArr.forEach((item, index) => {
        if (item.season == firstDropSelectedVal) {
          isFirstSeason = true;
          filteredArr.push(item?.seasonStats)
        }
        if (item.season == secondDropSelectedVal) {
          isSecondSeason = true;
          filteredArr.push(item?.seasonStats)
        }
        if (isFirstSeason == true && isSecondSeason == true) {
          return false;
        }
      })
      debugger
      this.setState({ sideBySideBarData: filteredArr }, () => {
        debugger

      })
    }
  }

  _renderPhotos = (item) => {
    return (
      <TouchableOpacity style={{
        width: wide * 0.33, height: wide * 0.33,
        justifyContent: 'center', alignItems: 'center',
      }}
        onPress={() => {
          // if (item.item.videoUrl !== null) {
          //   this.setState({ videoUrlToPlay: item.item.videoUrl, isPlayVideo: true })
          // }
          Navigation.navigate('PostView')
        }}
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

          <FastImage

            style={{ width: '100%', height: '100%' }}
            source={{ uri: item.item.thumbnailUrl }}

            resizeMode={FastImage.resizeMode.cover}
          />


          {item.item.videoUrl !== null ?
            <Image style={{ width: '30%', height: '30%', position: 'absolute', }}
              resizeMode={'contain'} source={require('../../Images/play_ico_tint.png')} />
            :
            null
          }
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
          <Image
            source={require("../../Images/like_ico.png")}
            // resizeMode="contain"
            style={{ width: wide * 0.03, height: wide * 0.03 }}
          ></Image>
          <Text style={{
            color: Colors.light, fontFamily: Fonts.Medium,
            fontSize: 12, marginLeft: 5
          }}>{item.item.numberOfLikes} Likes</Text>
        </View>

      </TouchableOpacity>
    );
  };
  _renderHighlights = (item) => {
    return (
      <TouchableOpacity style={{
        width: wide * 0.2, height: wide * 0.2, borderRadius: (wide * 0.2) / 2,
        justifyContent: 'center', alignItems: 'center',
      }}
        onPress={() => this.setState({ videoUrlToPlay: item.item.videoUrl, isPlayVideo: true })}
      >
        <View style={{
          // borderWidth: 1,
          // margin: 5,
          // borderColor: Colors.lightGray,
          justifyContent: 'center', alignItems: 'center',
          // backgroundColor: Colors.btnBg,

          width: wide * 0.18, height: wide * 0.18, borderRadius: (wide * 0.18) / 2,
        }}>

          {
            <Image
              source={{ uri: item.item.thumbnailUrl }}
              resizeMode="stretch"
              style={{ width: wide * 0.16, height: wide * 0.16, borderRadius: (wide * 0.16) / 2, }}
            ></Image>
          }

        </View>
        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, }}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  setSender = (obj, cb) => {
    const { dashboardData } = this.state;
    SenderRecevrModel.senderId = obj;
    SenderRecevrModel.senderName = UserModel.fname + " " + UserModel.lname;
    SenderRecevrModel.senderProfilePic = UserModel.profileUrl;
    SenderRecevrModel.senderType = UserModel.selectedUserType.toUpperCase();

    SenderRecevrModel.receiverId = dashboardData?.playerId;
    SenderRecevrModel.receiverName = dashboardData?.firstName + " " + dashboardData?.lastName;
    SenderRecevrModel.receiverProfilePic = dashboardData?.profilePictureUrl;
    SenderRecevrModel.receiverType = 'PLAYER';
    cb(true);
    // this.setReceiver();
    // getObject('UserId').then((obj) => {
    //     this.props.dispatch(getUserInfo(obj, (res, data) => {
    //         setTimeout(() => {
    //             console.log("time out call")
    //             if (res) {
    //                 console.log("Sender called")
    //                 // debugger
    //                 SenderRecevrModel.senderId = data.id;
    //                 SenderRecevrModel.senderName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
    //                 SenderRecevrModel.senderProfilePic = data.personalInfo.profilePictureURL;
    //                 SenderRecevrModel.senderType = data.typeOfUser;
    //                 console.log("Sender Set===>> 1", data);
    //                 this.setState({ loading: false }, () => {
    //                     Navigation.navigate('Chat');

    //                 })

    //                 // return res;
    //             }
    //         }, 1000);
    //     }))
    // });
  }

  setReceiver = () => {
    console.log("Receiver call",);
    this.props.dispatch(getUserInfo(this.state.playerId, (res, data) => {
      if (res) {
        SenderRecevrModel.receiverId = data.id;
        SenderRecevrModel.receiverName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
        SenderRecevrModel.receiverProfilePic = data.personalInfo.profilePictureURL;
        SenderRecevrModel.receiverType = data.typeOfUser;
        console.log("Receiver Set===>> 2");
      }
    }));
  }


  handleChatRender = () => {
    debugger;
    console.log("Data set start", Date.now())
    getObject('UserId').then((obj) => {
      this.setSender(obj, (res) => {
        if (res) {
          console.log("Data set end", Date.now())
          Navigation.navigate('Chat');
        }
      })
    })
    // if (UserModel.selectedUserType.toUpperCase() === 'COACH') {
    //     this.setState({ loading: true }, () => {
    //         this.setSender();

    //     })
    // }
  }

  _renderTabs = (item, index) => {
    return (

      <TouchableOpacity style={{
        height: wide * 0.12,
        width: wide * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        // marginHorizontal: 10
      }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedTabIndex: item.index, selectedTab: item.item.tab_nm })}
      >

        <View style={{
          flexDirection: 'row', height: '70%', alignItems: 'center',
          borderBottomColor: Colors.light,
          borderBottomWidth: this.state.selectedTabIndex === item.index ? 2 : 0
        }}>
          <Text style={{
            color: this.state.selectedTabIndex === item.index ? Colors.light : Colors.fontColorGray,
            fontSize: 16, lineHeight: 24,
            fontFamily: Fonts.Bold, textAlign: 'center',

          }}>
            {item.item.tab_nm}
          </Text>

        </View>

      </TouchableOpacity>




    );
  };

  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }

  handleChallengeNavigation = (data) => {
    if (UserModel.selectedUserType.toUpperCase() === 'PLAYER') {
      var data1 = data.item?.subscriptionLevelInfoList[0]?.challengeList[0];
      let isUpload = false;
      console.log("PreviousRes:--", data1.previousResponses)
      if (data1.hasOwnProperty('previousResponses')) {
        data1.previousResponses.forEach(element => {
          if (element.accepted === null || element.accepted == true) {
            isUpload = false;
          }
        });
      }

      Navigation.navigate('UploadVideoOfChallenge', {
        challengeData: data1,
        isUpload: isUpload,
        planId: data.id,
        roadToPro: data.roadToPro,
        levelIndex: data.currentLevelState,
        challengeIndex: data.currentChallengeState
      })
      // if (roadToProData.currentLevelState > this.state.selectedIndex) {
      //   Navigation.navigate('UploadVideoOfChallenge', { challengeData: data.item, isUpload: false })
      // } else if (item.index == roadToProData.currentChallengeState) {
      //   Navigation.navigate('UploadVideoOfChallenge', { challengeData: data.item, isUpload: true })
      // } else if (item.index < roadToProData.currentChallengeState) {
      //   Navigation.navigate('UploadVideoOfChallenge', { challengeData: data.item, isUpload: false })
      // }

    } else {
      Navigation.navigate('CoachChallengeAction', { entityId: data.item.id });

    }
  }



  renderChallenge = (item, index) => {
    // const { roadToProData } = this.props.Home
    console.log('iiiiii', item)
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.handleChallengeNavigation(item);
          //   if (roadToProData.currentLevelState > this.state.selectedIndex) {
          //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: false })
          //   } else if (item.index == roadToProData.currentChallengeState) {
          //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: true })
          //   } else if (item.index < roadToProData.currentChallengeState) {
          //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: false })
          //   }
        }}
        style={[{
          marginTop: wide * 0.03,
          // height: wide * 0.23,
          justifyContent: 'center'
        },
        item.item.active === true ?
          {
            borderWidth: 2, borderColor: Colors.stars, borderRadius: 10
          }
          : {
            borderWidth: 2, borderColor: Colors.statDropColor2, borderRadius: 10
          }
        ]}>
        <Image style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          right: 0, width: '100%', height: '100%', borderBottomRightRadius: 25,
          borderBottomLeftRadius: 8

        }} resizeMode={'stretch'} source={require('../../Images/Rect_dummy.png')} />

        <View style={{ marginLeft: 15, flexDirection: 'row', marginVertical: 25 }}>

          <View style={{ flex: 1, justifyContent: 'center' }} >

            <Text style={{
              color: Colors.light, fontSize: 20, lineHeight: 22,
              fontFamily: Fonts.SemiBold, width: wide * 0.6
            }}>

              {item.item.subscriptionLevelInfoList[0].challengeList[0].name}
            </Text>
          </View>

          <View style={{
            backgroundColor: item.item.active === true ? Colors.stars : Colors.statDropColor2,
            justifyContent: 'center', marginRight: 10, borderRadius: 5
          }}>
            {
              item.item.active !== true ?
                <Text style={{
                  color: Colors.light, fontSize: 12, lineHeight: 14,
                  fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                }}>


                  Completed
                </Text>
                :

                <Text style={{
                  color: Colors.light, fontSize: 12, lineHeight: 14,
                  fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                }}>
                  Active
                </Text>

            }


          </View>

        </View>
      </TouchableOpacity>

    )
  }

  _renderFirstSessionList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          height: 30, marginTop: 10,
          // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
        }}
        activeOpacity={1}
        onPress={() => this.setState({ firstDropSelectedVal: item.item, showFirstSeasonDrop: false })}
      >
        <Text style={{
          color: Colors.light, fontSize: 15, lineHeight: 16,
          fontFamily: Fonts.Bold,
        }}>{item.item}</Text>

      </TouchableOpacity>
    )
  }

  _renderSecondSessionList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          height: 30, marginTop: 10,
          // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
        }}
        activeOpacity={1}
        onPress={() => this.setState({ secondDropSelectedVal: item.item, showSecondSeasonDrop: false }, () => {
          this._filterSideBySideChartData();
        })}
      >
        <Text style={{
          color: Colors.light, fontSize: 15, lineHeight: 16,
          fontFamily: Fonts.Bold,
        }}>{item.item}</Text>

      </TouchableOpacity>
    )
  }

  _handleFullScreenView = () => {
    Navigation.navigate('ViewFullScreenBoxScore', { boxScoreData: this.state.statTabelData })
  }

  render() {

    const { dashboardData, radarChartData, showBar, loading, secondDropSelectedVal, firstDropSelectedVal, showFirstSeasonDrop, showSecondSeasonDrop } = this.state
    // if (this.state.playerId !== null) {
    //   dashboardData['playerId'] = this.state.playerId;
    // }
    console.log("Home Dash New:- ", this.state.sideBySideBarData);
    debugger;
    return (
      dashboardData.length === 0 ?
        <View style={{ flex: 1, backgroundColor: Colors.base }}>
          <AppLoader visible={this.state.loading} />
        </View>
        :

        <View style={{ flex: 1, backgroundColor: Colors.lightGreen }} >
          <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
            {/* {this.state.playerId !== null ? */}
            <View style={[CommonStyles.headerBottomLine, {
              flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between'
            }]}>
              {/* <View style={[CommonStyles.headerBottomLine]}> */}
              <ScreenHeader
                title={`${dashboardData?.firstName} ${dashboardData?.lastName}`}
                backButtonAction={() => Navigation.back()}
              />

              {/* </View> */}
              {UserModel.selectedUserType.toUpperCase() === 'COACH' ?
                <TouchableOpacity style={{
                  marginRight: wide * 0.06,
                  // marginTop: -5,
                }}
                  activeOpacity={1}
                  onPress={this.handleChatRender}
                >
                  <Image style={{
                    width: 30, height: 30, tintColor: Colors.light
                  }} source={require('../../Images/tab_message_icon.png')} />
                </TouchableOpacity>
                : <></>
              }

            </View>


            {/* : null} */}
            <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
              <ScrollView showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{
                  // marginTop: 20,
                  // marginHorizontal: 15,
                  // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, 
                  paddingBottom: 15,
                  // backgroundColor: 'red'
                }}>



                {
                  dashboardData !== null ?
                    <View style={{
                      // flex: 1,
                      // marginHorizontal: 15
                    }} >
                      {/* <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginHorizontal: 24,
                                        }}>
                                            <View style={{ paddingHorizontal: wide * 0.01, }}>
                                                <Text style={{
                                                    color: Colors.light, fontSize: 24,
                                                    fontFamily: Fonts.Bold, lineHeight: 40
                                                }}>
                                                    {dashboardData?.firstName} {dashboardData?.lastName}

                                                </Text>
                                                {dashboardData?.teamLogoUrl !== null ?
                                                    <Image style={{
                                                        width: 40, height: 40
                                                    }} resizeMode={'contain'}
                                                        source={{ uri: dashboardData?.teamLogoUrl }}
                                                    /> : null}
                                            </View>


                                            <View style={{
                                                width: wide * 0.12,
                                                height: wide * 0.16,
                                                justifyContent: 'center', alignItems: 'center',
                                            }}>
                                                {this.state.playerId === null ?

                                                    <TouchableOpacity
                                                        onPress={() => { Navigation.navigate('Calender') }}
                                                    >
                                                        <Image style={{
                                                            width: 20, height: 20,
                                                            tintColor: Colors.light
                                                        }} source={require('../../Images/newCalenderIcon.png')} />
                                                    </TouchableOpacity>
                                                    : null
                                                }



                                            </View>

                                        </View> */}

                      <View style={{
                        width: wide * 0.32, height: wide * 0.32,
                        borderRadius: wide * 0.32 / 2,
                        borderWidth: 4,
                        borderColor: Colors.borderColor,
                        alignSelf: 'center',
                        zIndex: 1,
                        justifyContent: 'center', alignItems: 'center',
                        backgroundColor: dashboardData.profilePictureUrl === null ? '#272930' : null,
                        marginTop: wide * 0.06,
                      }}>
                        {
                          dashboardData?.profilePictureUrl != null ?
                            <FastImage
                              key={this.state.randNum}
                              style={{
                                width: wide * 0.28, height: wide * 0.28,

                                borderRadius: wide * 0.28 / 2,
                              }}
                              source={{
                                uri: dashboardData.profilePictureUrl,
                                // + '&width=200&height=200'
                                priority: FastImage.priority.high,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            :
                            <></>
                          // <Image style={{
                          //     width: wide * 0.28, height: wide * 0.28,
                          //     borderRadius: wide * 0.28 / 2,
                          // }} resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />
                        }


                      </View>

                      <View style={{ marginTop: -wide * 0.1, }}>
                        <Card style={{
                          flex: 1, marginBottom: 10, borderRadius: 25,
                          marginHorizontal: 24,
                          height: dashboardData?.pgs !== null || dashboardData?.playerCategories !== null ? null : 100
                        }}>

                          {this.state.playerId === null ?
                            <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }}
                              style={{
                                height: '15%',
                                width: '90%',
                                marginHorizontal: wide * 0.02,
                                alignItems: 'flex-end',
                                // backgroundColor: 'red',
                                marginTop: 25,
                              }}
                            >
                              <Image style={{
                                width: 20, height: 20,
                                tintColor: Colors.light
                              }} source={require('../../Images/edit.png')} />
                            </TouchableOpacity>
                            : null
                          }

                          {dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ?
                            <View style={{
                              flexDirection: 'row', alignSelf: 'center', alignItems: 'center',
                              marginTop: this.state.playerId !== null ? 60 : 15,
                              marginBottom: dashboardData?.playerCategories === null ? 20 : 0
                            }}>
                              <View style={{
                                width: wide * 0.25, height: 50,
                                justifyContent: 'space-between', alignItems: 'center',
                                borderRightWidth: 1, borderRightColor: Colors.newGrayFontColor,
                              }}>
                                <Text style={{
                                  color: Colors.newGrayFontColor,
                                  fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                                }}>
                                  {Object.keys(dashboardData?.pgs)[0].toUpperCase()}
                                </Text>
                                <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24 }}>
                                  {Object.values(dashboardData?.pgs)[0]}
                                </Text>
                              </View>
                              <View style={{
                                width: wide * 0.25, height: 50, justifyContent: 'space-between', alignItems: 'center',
                                borderRightWidth: 1, borderRightColor: Colors.newGrayFontColor,
                              }}>
                                <Text style={{
                                  color: Colors.newGrayFontColor,
                                  fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                                }}>
                                  {Object.keys(dashboardData?.pgs)[1].toUpperCase()}
                                </Text>
                                <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24 }}>
                                  {Object.values(dashboardData?.pgs)[1]}
                                </Text>
                              </View>
                              <View style={{
                                width: wide * 0.25, height: 50, justifyContent: 'space-between', alignItems: 'center',
                              }}>
                                <Text style={{
                                  color: Colors.newGrayFontColor,
                                  fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                                }}>
                                  {Object.keys(dashboardData?.pgs)[2].toUpperCase()}
                                </Text>
                                <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24 }}>
                                  {Object.values(dashboardData?.pgs)[2]}
                                </Text>
                              </View>
                            </View>
                            :
                            null
                          }
                          {dashboardData?.playerCategories !== null ?
                            <View style={{
                              marginTop: 20,
                              marginBottom: 15,
                              borderTopWidth: 0.3,
                              borderTopColor: Colors.newGrayFontColor,
                              height: wide * 0.14,
                            }}>
                              <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16,
                                width: wide * 0.78, alignSelf: 'center', textAlign: 'center',
                                marginTop: 20,
                              }}>
                                {dashboardData?.playerCategories}
                              </Text>
                            </View>
                            : null
                          }
                        </Card>
                        <View style={{
                          flexDirection: 'row', justifyContent: this.state.playerId !== null ? 'center' : 'space-between', alignItems: 'center',
                          marginTop: wide * 0.04,
                          marginHorizontal: 40,
                        }}>
                          <FlatList
                            data={this.state.tabs}
                            renderItem={(item, index) => this._renderTabs(item, index)}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                          />
                        </View>
                        {this.state.selectedTab === 'Stats' ?
                          <>
                            {this.state.radarChartData !== null && this.state.radarChartData.length == 0 ?
                              <>

                              </>
                              :
                              <>
                                {this.state.radarChartData !== null && this.state.radarChartData.length > 0 ?
                                  <View style={{ marginTop: 30, }}>
                                    <Title data={'Summary'} />

                                  </View>
                                  : null
                                }
                                {this.state.radarChartData !== null && this.state.radarChartData.length > 0 ?
                                  <View style={{
                                    marginTop: wide * 0.03,
                                    justifyContent: "center", alignItems: 'center',
                                    marginHorizontal: 24,

                                  }}>

                                    {this.state.radarChartData !== null && this.state.radarChartData.length > 0 ?
                                      <View style={{
                                        justifyContent: 'center',
                                        width: '100%',
                                        alignItems: 'center',
                                        // backgroundColor: 'green'

                                      }}>
                                        <VictoryChart
                                          polar
                                          theme={VictoryTheme.material}
                                          domain={{ y: [0, 1] }}
                                          height={280}
                                          width={300}
                                        // animate

                                        >
                                          <VictoryGroup colorScale={[Colors.compareBar, Colors.light]}
                                            style={{ data: { fillOpacity: 0.1, strokeWidth: 2 } }}
                                          >
                                            {this.state.data.map((data, i) => {
                                              return <VictoryArea key={i} data={data} />;
                                            })}

                                          </VictoryGroup>

                                          {
                                            Object.keys(this.state.maxima).map((key, i) => {
                                              return (
                                                <VictoryPolarAxis
                                                  key={i} dependentAxis
                                                  labelPlacement="vertical"
                                                  tickFormat={() => ""}
                                                  style={{
                                                    axisLabel: { fontSize: 14, lineHeight: 16, fill: Colors.light, padding: 30 },
                                                    axis: { stroke: "grey", opacity: 0.1, },
                                                    grid: { stroke: "grey", opacity: 0.01 }
                                                  }}
                                                  // tickLabelComponent={
                                                  //   <VictoryLabel labelPlacement="vertical"

                                                  //   />
                                                  // }
                                                  axisValue={i + 1}
                                                  label={key}
                                                />
                                              );

                                            })
                                          }

                                        </VictoryChart>
                                      </View>
                                      : null
                                    }
                                    {this.state.isRadarLblShow ?
                                      <View style={{
                                        width: wide * 0.3,
                                        height: wide * 0.09,
                                        marginTop: 20, flexDirection: 'row',
                                        justifyContent: 'space-between',
                                      }}>
                                        <View style={{
                                          justifyContent: 'space-around',
                                          alignItems: 'center'
                                        }}>
                                          <View style={{ width: 35, backgroundColor: Colors.light, borderBottomWidth: 2, borderBottomColor: Colors.light }}></View>
                                          <View style={{ width: 35, backgroundColor: Colors.compareBar, borderBottomWidth: 2, borderBottomColor: Colors.compareBar }}></View>

                                        </View>
                                        <View style={{
                                          justifyContent: 'space-around',
                                        }}>
                                          <Text style={{
                                            color: Colors.light, fontSize: 10, lineHeight: 12,
                                            fontFamily: Fonts.Bold,
                                          }}>Team Average</Text>

                                          <Text style={{
                                            color: Colors.compareBar, fontSize: 10,
                                            lineHeight: 12,
                                            fontFamily: Fonts.Bold,
                                          }}>Player Stats</Text>
                                        </View>
                                      </View>
                                      : <></>
                                    }
                                  </View>
                                  : null
                                }

                              </>
                            }
                            <>
                              {this.state.bar1_Data.length > 0 || this.state.bar2_Data.length > 0 ?
                                <>
                                  {this.state.showBar === true ?
                                    <View style={{
                                      // width: '95%',
                                      // height: wide * 0.98, top: wide * 0.08, left: wide * 0.02,
                                      // borderRadius: 20,
                                      // backgroundColor: Colors.ractangelCardColor,
                                      justifyContent: "center",
                                      alignItems: 'center',
                                      marginTop: 35,
                                      flex: 1
                                    }}>
                                      <Title data={'Comparison'} />


                                      <View style={{
                                        width: '90%',
                                        justifyContent: 'center',
                                        marginTop: wide * 0.03,
                                        alignItems: 'center',
                                        // backgroundColor: 'green',
                                      }}>
                                        {this.state.showBar === true ?
                                          <MyPlayerStats barData1={this.state.bar1_Data} barData2={this.state.bar2_Data} />
                                          : null
                                        }

                                      </View>


                                      <View style={{
                                        // backgroundColor: 'green',
                                        width: '80%',
                                        alignItems: 'center',
                                        marginHorizontal: 20,
                                        marginTop: 20,
                                        marginBottom: 10,
                                        // backgroundColor: 'red',


                                      }}>
                                        {this.state.isBarLblShow ?
                                          <View style={{
                                            marginTop: 10, flexDirection: 'row', alignItems: 'center',
                                            justifyContent: 'space-between', //backgroundColor: 'red',
                                            height: 18
                                          }}>
                                            <View style={{
                                              // marginTop: 10,
                                              //  width: wide * 0.4,
                                              flexDirection: 'row',

                                              justifyContent: 'space-between', alignItems: 'center'
                                            }}>
                                              <View style={{ width: 28, height: 6, backgroundColor: '#4F5155' }}></View>
                                              <Text style={{
                                                color: Colors.light, fontSize: 12, lineHeight: 12,
                                                fontFamily: Fonts.Bold, marginLeft: 12
                                              }}>Player Excluded</Text>
                                            </View>
                                            <View style={{
                                              // marginTop: 30,
                                              // width: wide * 0.4,
                                              flexDirection: 'row',
                                              justifyContent: 'space-around', alignItems: 'center', marginLeft: 20
                                            }}>
                                              <View style={{ width: 28, height: 6, backgroundColor: Colors.compareBar }}></View>
                                              <Text style={{
                                                color: Colors.compareBar, fontSize: 12, lineHeight: 12,
                                                fontFamily: Fonts.Bold, marginLeft: 12
                                              }}>Player Included</Text>
                                            </View>
                                          </View>
                                          : <></>
                                        }
                                        {this.state.isBarLblShow ?
                                          <View style={{ marginTop: 15, height: 12, }}>
                                            <Text style={{
                                              color: Colors.compareBar, fontSize: 14, lineHeight: 16,
                                              fontFamily: Fonts.Bold, //marginLeft: 12
                                            }}>
                                              {dashboardData?.userBarGraphComparisonDto?.comparisonRemark}
                                            </Text>
                                          </View>
                                          :
                                          <></>
                                        }
                                        {this.state.playerId !== null && this.state.isStatNull == false ?
                                          <TouchableOpacity style={{
                                            backgroundColor: Colors.btnBg,
                                            width: 140, height: 30, borderRadius: 5,
                                            justifyContent: 'center', alignItems: 'center',
                                            marginTop: 18,
                                            marginBottom: wide * 0.04,
                                          }}
                                            onPress={() => Navigation.navigate('Compare', dashboardData)}
                                          >
                                            <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16, }}>Add to Compare</Text>
                                          </TouchableOpacity>
                                          : null}

                                      </View>


                                    </View>
                                    :
                                    <></>
                                  }
                                </>
                                :
                                <View style={{ width: '90%', alignSelf: 'center' }}>

                                  <EmptyBarChart kpi={dashboardData?.userBarGraphComparisonDto?.kpi != null ? dashboardData?.userBarGraphComparisonDto?.kpi : []} />
                                </View>
                              }
                            </>

                            {/* Box Score table */}

                            {this.state.statTabelData != null ?
                              <>
                                <View style={{
                                  // width: '95%',
                                  // height: wide * 0.98, top: wide * 0.08, left: wide * 0.02,
                                  // borderRadius: 20,
                                  // backgroundColor: Colors.lightGreen,
                                  justifyContent: "center",
                                  alignItems: 'center',
                                  marginTop: 20,
                                  // flex: 1
                                }}>
                                  <Title data={'Box Score'} />


                                  <View style={{
                                    width: '90%',
                                    justifyContent: 'center',
                                    marginTop: wide * 0.03,
                                    alignItems: 'center',
                                    // backgroundColor: 'green',
                                  }}>

                                    <View style={{
                                      width: '100%', flexDirection: 'row', justifyContent: 'flex-end',
                                      marginTop: wide * 0.01
                                    }}>
                                      <TouchableOpacity style={{
                                        width: 30, height: 30,
                                        alignItems: 'center', justifyContent: 'center',
                                        marginRight: wide * 0.01
                                      }}
                                        onPress={() => this._handleFullScreenView()}
                                      >
                                        <Image
                                          style={{ width: '80%', height: '80%', }}
                                          source={require('../../Images/full_screen_icon.png')}
                                          resizeMode={'contain'}
                                        />
                                      </TouchableOpacity>
                                    </View>

                                    {this.state.statTabelData != null ?
                                      <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                        style={{ marginBottom: wide * 0.02 }}
                                      // bounces={false}
                                      >
                                        <QuickBoxScoreTable
                                          // teamId={teamId} 
                                          data={this.state.statTabelData}
                                          heading={"Table stat"} />
                                      </ScrollView>
                                      : <></>}

                                  </View>

                                </View>

                              </>
                              : <></>
                            }

                            {/* Side by side chart  */}
                            {this.state.sideBySideBarData != null ?
                              <View style={{ marginTop: wide * 0.1, marginBottom: 20 }}>
                                <Title data={'My Stats'} />

                                <View style={{
                                  width: '90%',
                                  alignSelf: 'center',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginTop: wide * 0.03,
                                  flexDirection: 'row',
                                  height: wide * 0.15,

                                }}>
                                  <View style={{
                                    justifyContent: 'space-evenly', width: '40%', marginLeft: wide * 0.02
                                  }}>
                                    <Text style={{
                                      color: Colors.light,
                                      fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 12
                                    }}>Session:</Text>

                                    <TouchableOpacity
                                      style={{
                                        marginTop: 10, flexDirection: 'row', height: '50%',
                                        alignItems: 'center', width: '80%',
                                      }}
                                      activeOpacity={1}
                                      onPress={() => this.setState({ showFirstSeasonDrop: true })}
                                    >
                                      <Text style={{
                                        color: Colors.light,
                                        fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16
                                      }}>{firstDropSelectedVal}</Text>
                                      <Image
                                        style={{
                                          width: wide * 0.035, height: wide * 0.025, marginHorizontal: wide * 0.04
                                        }} source={require('../../Images/dropDownIconNew.png')} />
                                    </TouchableOpacity>
                                  </View>

                                  <View style={{
                                    justifyContent: 'space-evenly', width: '40%',
                                  }}>
                                    <Text style={{
                                      color: Colors.light,
                                      fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 12
                                    }}>Session:</Text>

                                    <TouchableOpacity
                                      style={{
                                        marginTop: 10, flexDirection: 'row', height: '50%',
                                        alignItems: 'center', width: '80%',
                                      }}
                                      activeOpacity={1}
                                      onPress={() => this.setState({ showSecondSeasonDrop: true })}
                                    >
                                      <Text style={{
                                        color: Colors.light,
                                        fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16
                                      }}>{secondDropSelectedVal}</Text>
                                      <Image
                                        style={{
                                          width: wide * 0.035, height: wide * 0.025, marginHorizontal: wide * 0.04
                                        }} source={require('../../Images/dropDownIconNew.png')} />
                                    </TouchableOpacity>
                                  </View>

                                </View>

                                <View style={{
                                  marginTop: wide * 0.04, marginBottom: 10,
                                  width: '90%', alignSelf: 'center'
                                }}>
                                  {this.state.sideBySideBarData != null ?
                                    <SideBySideBarGraph pgsData={this.state.sideBySideBarData} />
                                    : <></>
                                  }
                                </View>
                              </View>
                              : <></>
                            }

                          </>
                          : null
                        }
                        {this.state.selectedTab === 'Challenges' ?
                          <View style={{ flex: 1, alignItems: 'center', }}>

                            {
                              dashboardData.subscriptionsList.length !== undefined ?

                                <View style={{ marginTop: 20, width: wide * 0.9, }}>
                                  <Progress.Bar
                                    // progress={dashboardData.subscriptionsList[0].completedChallengePercentage / 100}
                                    width={wide * 0.9}
                                    borderColor={Colors.base}
                                    unfilledColor={Colors.borderColor}
                                    color={Colors.stars}
                                    style={{ marginTop: wide * 0.02 }}
                                  />
                                  <View style={{}}>
                                    {/* <Text style={{
                                                                        fontSize: 12, fontFamily: Fonts.BoldItalic,
                                                                        marginTop: wide * 0.02, color: Colors.light, lineHeight: 14
                                                                    }}>1 / 3 Completed</Text> */}
                                  </View>
                                </View>
                                : null
                            }

                            <FlatList
                              bounces={false}
                              showsVerticalScrollIndicator={false}
                              style={{
                                width: '90%',
                                marginTop: 10,
                                marginBottom: wide * 0.04,


                              }}
                              // nestedScrollEnabled
                              data={dashboardData.subscriptionsList}
                              // ListEmptyComponent={() => <View style={{
                              //     width: '100%', height: 100,
                              //     justifyContent: 'center', alignItems: 'center',
                              //     // backgroundColor: 'green',
                              //     marginTop: wide * 0.2
                              // }}>
                              //     <Text
                              //         style={{
                              //             color: Colors.fontColorGray,
                              //             fontSize: 20, lineHeight: 20,
                              //             fontFamily: Fonts.SemiBold, textAlign: 'center'
                              //         }}>Nothing to display...</Text>
                              // </View>}
                              renderItem={(item, index) => this.renderChallenge(item, index)}

                            />
                            {this.state.playerId !== null ?
                              <TouchableOpacity style={{
                                backgroundColor: Colors.btnBg,
                                width: 140, height: 30, borderRadius: 5,
                                justifyContent: 'center', alignItems: 'center',
                                marginTop: 30, marginBottom: 10,

                              }}
                                onPress={() => Navigation.navigate('CoachAssignTask', { playerId: [dashboardData.playerId] })}
                              >
                                <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 12 }}>Assign Challenge</Text>
                              </TouchableOpacity>
                              : null}

                          </View>
                          : null
                        }

                      </View>
                    </View>
                    : null
                }





              </ScrollView>
            </KeyboardAvoidingView>
            {showFirstSeasonDrop === true ?
              <Modal
                animationType="fade"
                transparent={true}
                visible={showFirstSeasonDrop}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ showFirstSeasonDrop: false })}
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
                  }}
                    blurAmount={10}
                    blurRadius={10}
                  />
                  <View style={{
                    width: '60%', height: wide * 0.5, backgroundColor: Colors.ractangelCardColor,
                    marginTop: 20, borderRadius: 20, alignItems: 'center',
                    position: 'absolute',

                  }}>
                    <View style={{
                      width: '100%', height: '15%', marginTop: 10,
                      alignItems: 'center', justifyContent: 'center',
                      // borderBottomColor: Colors.newGrayFontColor, 
                      // borderBottomWidth: 1
                    }}>
                      <Text style={{
                        color: Colors.light, fontFamily: Fonts.Bold,
                        fontSize: 14, lineHeight: 16
                      }}>Select</Text>
                    </View>


                    <View style={{ width: '60%', height: '80%', }}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{ marginBottom: 10 }}
                        // data={[{ session: '2020-21' }, { session: '2019-20' }]}
                        data={this.state.seasonList}
                        renderItem={(item, index) => this._renderFirstSessionList(item, index)}
                      />
                    </View>
                  </View>
                  {/* </BlurView> */}
                </TouchableOpacity>
              </Modal>
              : null
            }

            {showSecondSeasonDrop === true ?
              <Modal
                animationType="fade"
                transparent={true}
                visible={showSecondSeasonDrop}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ showSecondSeasonDrop: false })}
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
                  }}
                    blurAmount={10}
                    blurRadius={10}
                  />
                  <View style={{
                    width: '60%', height: wide * 0.5, backgroundColor: Colors.ractangelCardColor,
                    marginTop: 20, borderRadius: 20, alignItems: 'center',
                    position: 'absolute',

                  }}>
                    <View style={{
                      width: '100%', height: '15%', marginTop: 10,
                      alignItems: 'center', justifyContent: 'center',
                      // borderBottomColor: Colors.newGrayFontColor, 
                      // borderBottomWidth: 1
                    }}>
                      <Text style={{
                        color: Colors.light, fontFamily: Fonts.Bold,
                        fontSize: 14, lineHeight: 16
                      }}>Select</Text>
                    </View>


                    <View style={{ width: '60%', height: '80%', }}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{ marginBottom: 10 }}
                        // data={[{ session: '2020-21' }, { session: '2019-20' }]}
                        data={this.state.seasonList}
                        renderItem={(item, index) => this._renderSecondSessionList(item, index)}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  </View>
                  {/* </BlurView> */}
                </TouchableOpacity>
              </Modal>
              : null
            }

          </SafeAreaView >
        </View>

    );
  }
}

export const MyPlayerStats = ({ barData1, barData2, }) => {
  console.log('---dttt', barData1, barData2)
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
      <View style={{
        justifyContent: 'center', marginTop: -wide * 0.05,
        width: '90%', alignItems: 'center',
      }}>
        <VictoryChart
          width={340}
          // height={250}
          height={isBothArr ? (heightToBe.length <= 2 ? 80
            : heightToBe.length <= 3 ? 140
              : heightToBe.length <= 5 ? 200
                : heightToBe.length <= 8 ? 350
                  : heightToBe.length <= 10 ? 400
                    : heightToBe.length <= 13 ? 480
                      : heightToBe.length <= 15 ? 550
                        : heightToBe.length <= 18 ? 650 : 750) :
            (heightToBe.length <= 2 ? 70
              : heightToBe.length <= 3 ? 100
                : heightToBe.length <= 5 ? 160
                  : heightToBe.length <= 8 ? 240
                    : heightToBe.length <= 10 ? 320
                      : heightToBe.length <= 13 ? 390
                        : heightToBe.length <= 15 ? 450
                          : heightToBe.length <= 18 ? 550 : 750)}
          horizontal
          // padding={{ left: 50, right: 40, }}
          padding={{ left: 60, top: 20, right: 10, }}
          domainPadding={{ x: 20, }}

        >
          <VictoryGroup colorScale={'qualitative'}>
            {barData2.length > 0 ?

              <VictoryBar

                data={barData2}
                // animate={{
                //     duration: 2000,
                //     onLoad: { duration: 1000 },
                // }}
                // x="name"
                // y="value"
                // cornerRadius={6}
                labels={({ datum }) => `${datum.y}`}
                style={{
                  data: {
                    fill: '#4F5155',
                  },
                  labels: {
                    fill: '#D8A433'
                  }
                }}
                barWidth={12}

              // labelComponent={<VictoryLabel dx={10}
              //     style={{ fill: 'red', padding: 20 }} />
              // }
              />
              : null
            }
            {barData1.length > 0 ?
              <VictoryBar

                data={barData1}
                labels={({ datum }) => `${datum.y}`}
                // animate={{
                //     duration: 2000,
                //     onLoad: { duration: 1000 },
                // }}

                // x="name"
                // y="value"
                // cornerRadius={6}
                style={{
                  data: {
                    fill: '#D8A433',
                    // marginRight: 40
                  },
                  labels: {
                    fill: '#D8A433'
                  }

                }}
                barWidth={12}

              /> : null}


          </VictoryGroup>
          <VictoryAxis
            // width={100}
            offsetX={45}
            style={{
              tickLabels: {
                fill: Colors.light, fontSize: 14,
                // padding: 30
              },
              axis: { stroke: Colors.base, }

            }}

          />
        </VictoryChart>
      </View>
    </>

  )

}

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(CoachPlayerProfileView);








