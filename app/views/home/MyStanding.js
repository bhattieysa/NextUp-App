import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text, SafeAreaView, Image, KeyboardAvoidingView, FlatList, Platform, Modal } from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { isNotch } from '../../utils/deviceInfo';
import { myStandingFeed, updateHealthInfo } from '../../actions/home';
import { getObject } from '../../middleware';

import FastImage from 'react-native-fast-image';
import { Title } from '../../components/common/titleLabel';
// import { GameStats } from '../Coach/CoachMyTeams';
import { UserModel } from '../../constants/constant';
import {
  VictoryLabel, VictoryChart,
  VictoryGroup, VictoryBar, VictoryAxis,
} from 'victory-native';
import TeamStats from './Components/TeamStats';
import QuickBoxScoreTable from '../../components/common/QuickBoxScoreTable';
import { BlurView } from '@react-native-community/blur';
import SideBySideBarGraph from '../../components/common/SideBySideBar';


// const options = {
//     scopes: [
//         Scopes.FITNESS_ACTIVITY_READ,
//         Scopes.FITNESS_ACTIVITY_WRITE,
//         Scopes.FITNESS_BODY_READ,
//         Scopes.FITNESS_BODY_WRITE,
//     ],
// }
let wide = Layout.width;
let high = Layout.height;

const barChartData = [
  { "x": "FG%", "y": 50.0 },
  { "x": "BPG", "y": 20.0 },
  { "x": "2PT%", "y": 8.0 },
  { "x": "STL", "y": 2.0 },
  { "x": "G%", "y": 30.0 },
  { "x": "BG", "y": 20.0 },
  { "x": "PT%", "y": 60.0 },
  { "x": "SL", "y": 2.0 },
  { "x": "ST", "y": 2.0 },
  { "x": "GH%", "y": 9.0 },
  { "x": "BGP", "y": 2.0 },
  { "x": "PST%", "y": 8.0 },
  // { "x": "SLA", "y": 2.0 },

  // { "x": "TS", "y": 2.0 },
  // { "x": "GK%", "y": 9.0 },
  // { "x": "BLP", "y": 2.0 },
  // { "x": "PSW%", "y": 8.0 },
  // { "x": "SQA", "y": 2.0 },


]

class MyStanding extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false, selectedIndex: 0,
      arrLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11],
      userStatBarData: [],
      statTabelData: null,
      sideBySideBarData: null,
      showFirstSeasonDrop: false,
      showSecondSeasonDrop: false,
      firstDropSelectedVal: null,
      secondDropSelectedVal: null,
      seasonList: null
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', this.onScreenFocus)
  }

  onScreenFocus = () => {
    getObject('UserId').then((obj) => {
      this.setState({ loading: true }, () => {
        this.props.dispatch(myStandingFeed(obj, (res) => {
          // this.setState({ loading: false }, () => {
          if (res) {
            const { myStandingData } = this.props.Home

            var arr = []
            var seasonArr = []
            if (myStandingData.standingSeasonInfo !== null) {
              myStandingData.standingSeasonInfo?.statsForSeasonList.forEach((item, index) => {
                var obj = item?.seasonStats;
                seasonArr.push(item.season)
                arr.push({ ...obj, id: "#" + index })
              })
            }
            this.setState({
              statTabelData: arr, seasonList: seasonArr,
              firstDropSelectedVal: seasonArr[0], secondDropSelectedVal: seasonArr[1]
            }, () => {
              this._filterUserStatBarData(myStandingData?.userKpi);
            })
            // console.log('Mystandddd', myStandingData);
            //Health info need to check
            // if (myStandingData?.healthInfo != null || myStandingData?.healthInfo != undefined) {
            //     if (Platform.OS === 'ios') {
            //         this.getDataFromAppleHealth(false)
            //     } else {
            //         this.getDataFromGoogleFit(false)
            //     }
            // }

          }


          // })

        }))
      })

    })
  }

  _filterUserStatBarData = (userStat) => {
    console.log("userStattt", userStat);
    var arr = []
    if (userStat !== null && userStat !== undefined) {
      if (Object.keys(userStat).length !== 0) {
        for (const key in userStat) {
          arr.push({
            x: key,
            y: parseFloat(userStat[key])
          })
        }
      }
    }
    console.log("barStattt", arr);
    this.setState({ userStatBarData: arr, loading: false }, () => {
      this._filterSideBySideChartData();
    })
  }

  _filterSideBySideChartData = () => {
    const { myStandingData } = this.props.Home
    const { firstDropSelectedVal, secondDropSelectedVal } = this.state;
    if (firstDropSelectedVal != null && secondDropSelectedVal != null) {
      var statsArr = myStandingData.standingSeasonInfo?.statsForSeasonList;
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
      this.setState({ sideBySideBarData: filteredArr })
    }
  }

  _renderLevel = (item, index) => {
    return (
      <View style={{ height: wide * 0.44, }}>
        <View style={{
          width: wide * 0.23, height: wide * 0.32,
          marginTop: 5, borderRadius: wide * 0.03, borderWidth: 3,
          borderColor: Colors.borderColor, marginLeft: wide * 0.05,
          justifyContent: 'center', alignItems: 'center'
        }}>
          <Image style={{
            width: '60%', height: '60%', tintColor: item.index === 0 ? Colors.stars :
              item.index === 1 ?
                Colors.light : Colors.overlayWhite
          }} resizeMode={'contain'}
            source={require('../../Images/level_gold.png')} />
          <Text style={{
            color: item.index === 1 || item.index === 0 ? Colors.light : Colors.overlayWhite, fontSize: 12, fontFamily: Fonts.Bold,
            marginLeft: 5, marginTop: wide * 0.03
          }}>
            Level {item.index + 1}
          </Text>

        </View>
        <View style={{
          height: wide * 0.1, width: '100%',
          justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0
        }}>
          <View style={{
            width: '100%', height: wide * 0.02,
            backgroundColor: Colors.borderColor,

            justifyContent: 'center', alignItems: 'center',
            borderTopLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
            borderBottomLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
            left: item.index === 0 ? wide * 0.1 / 2 : 0,
            borderTopRightRadius: this.state.arrLevels.length > 0 ? item.index === this.state.arrLevels.length - 1 ? wide * 0.02 / 2 : 0 : 0,
            borderBottomRightRadius: this.state.arrLevels.length > 0 ? item.index === this.state.arrLevels.length - 1 ? wide * 0.02 / 2 : 0 : 0,
            Right: this.state.arrLevels.length > 0 ? item.index === this.state.arrLevels.length - 1 ? wide * 0.1 / 2 : 0 : 0,
          }}>


          </View>
          <Image style={{
            width: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07, height: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07, position: 'absolute', left: wide * 0.14,
            tintColor: item.index === 0 ? Colors.stars : item.index === 1 ? Colors.shade : null
          }} resizeMode={'contain'}
            source={item.index === 0 || item.index === 1 ? require('../../Images/tick_selected.png') : require('../../Images/lock_circle.png')} />
        </View>
      </View>
    );
  };
  _renderWorkout = (item, index) => {
    const { myStandingData } = this.props.Home
    return (
      <View style={{ height: wide * 0.4, }}>
        <View style={{
          width: wide * 0.25, height: wide * 0.36,
          marginTop: 5, borderRadius: wide * 0.03, borderWidth: 3,
          borderColor: Colors.borderColor, marginLeft: wide * 0.05,
          justifyContent: 'center', alignItems: 'center'
        }}>
          {Object.keys(myStandingData?.healthInfo)[item.index] === 'Height' ?
            <Image style={{
              width: '40%', height: '40%'
            }} resizeMode={'contain'}
              source={require('../../Images/Height.png')} />
            : Object.keys(myStandingData?.healthInfo)[item.index] === 'Weight' ?
              <Image style={{
                width: '40%', height: '40%'
              }} resizeMode={'contain'}
                source={require('../../Images/Weight.png')} />
              : <Image style={{
                width: '40%', height: '40%'
              }} resizeMode={'contain'}
                source={require('../../Images/calorie.png')} />
          }

          <Text style={{
            color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
            marginLeft: 5, marginTop: wide * 0.02
          }}>
            {Object.keys(myStandingData?.healthInfo)[item.index]}
          </Text>
          <Text style={{
            color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
            marginLeft: 5, marginTop: wide * 0.02
          }}>
            {item.item}
          </Text>
          <Text style={{
            color: Colors.light, fontSize: 12, fontFamily: Fonts.Regular,
            marginLeft: 5, marginTop: wide * 0.02
          }}>
            {Object.keys(myStandingData?.healthInfo)[item.index] === 'Height' ?
              'Meters'
              : Object.keys(myStandingData?.healthInfo)[item.index] === 'Weight' ?
                'Pounds'
                : 'Per day'
            }
          </Text>
        </View>

      </View>
    );
  };

  _renderLeadingPlayer = (item, index) => {
    // console.log('leadingPlayer---', item);

    return (
      <TouchableOpacity
        style={{
          // backgroundColor: 'blue',
          marginLeft: wide * 0.015,
          paddingHorizontal: wide * 0.025,
          alignItems: 'center',
          justifyContent: 'center'
          // width: '40%'
        }}
        activeOpacity={1}
      // onPress={() => Navigation.navigate('PlayerProfile',
      //     { playerId: item.item.userId })
      // }
      >
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{
              color: Colors.light, fontSize: 54, fontFamily: Fonts.Bold,
              lineHeight: 60,
              // marginLeft: wide * 0.01,
            }}>{item.item.rank}</Text>
            <View style={{
              width: wide * 0.14, height: wide * 0.21,
              borderRadius: wide * 0.02, borderWidth: 2,
              borderColor: Colors.newGrayFontColor, marginLeft: wide * 0.02,
              justifyContent: 'center', alignItems: 'center',
            }}>
              {item.item.userProfilePic != null ?
                <FastImage style={{ width: '95%', height: '96%', borderRadius: 5 }}
                  resizeMode={'cover'}
                  source={{ uri: item.item.userProfilePic }} />
                :
                <></>
                // <Image style={{ width: '95%', height: '95%', borderRadius: 5 }}
                //     resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />
              }

            </View>

          </View>

          <View style={{ marginLeft: 8, marginTop: wide * 0.01 }}>
            <Text style={{
              color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
              lineHeight: 18,
            }}>
              {item.item.userName}
            </Text>
            <Text style={{
              color: Colors.light, fontSize: 14, lineHeight: 18,
              fontFamily: Fonts.Regular,
            }}>
              {item.item.position}
            </Text>

            <View style={{ marginTop: wide * 0.032, marginBottom: wide * 0.01, }}>
              {item.item.teamLogoUrl != null ?
                <FastImage style={{
                  width: 30, height: 30,
                  borderRadius: 15
                }}
                  resizeMode='contain'
                  source={{ uri: item.item.teamLogoUrl }}
                // source={require('../../Images/Los_Angeles_Lakers_logo.png')}
                />
                :
                null
              }

            </View>

          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderLeadingTeam = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(`Team Id ${item.item.teamId} clicked`);
          Navigation.navigate("PlayerMyTeams", { teamId: item.item.teamId })
        }}
      >
        <View style={{
          flexDirection: 'row',
          // alignItems: 'center',
          width: wide * 0.36,
          marginLeft: wide * 0.015,
          // justifyContent: 'center'

        }}>
          {/* <Text style={{ color: Colors.lightshade }}>{JSON.stringify(item.item.teamId)}</Text> */}
          <View style={{}}>
            <Text style={{
              color: Colors.light, fontSize: 54,
              fontFamily: Fonts.Bold,
              lineHeight: 60,

              marginLeft: wide * 0.01,
              marginTop: wide * 0.01,
            }}>{item.item.rank}</Text>
          </View>
          <View style={{
            alignItems: 'center',
            // marginTop: wide * 0.01,
            marginLeft: wide * 0.03,
          }}>
            <View style={{
              width: wide * 0.16, height: wide * 0.16,
              // marginTop: 8,
              // marginLeft: wide * 0.01,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wide * 0.16 / 2,
              borderWidth: 3,
              borderColor: Colors.newGrayFontColor,
            }}>
              {/* edit by keshav */}
              {item.item.teamLogoUrl != null ?
                <FastImage style={{ width: '94%', height: '94%', borderRadius: wide * 0.16 / 2, }}
                  // resizeMode={'contain'}
                  source={{ uri: item.item.teamLogoUrl }} />
                :
                null
              }
            </View>


            <View style={{ marginTop: wide * 0.012 }}>
              <Text numberOfLines={2} style={{
                color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
                lineHeight: 18
              }}>{item.item.name}</Text>

            </View>

          </View>

        </View>
      </TouchableOpacity>
    )
  }

  _renderRecents = (item, index) => {
    return (
      <TouchableOpacity style={{
        backgroundColor: Colors.recentGameCardColor,
        justifyContent: 'center',
        alignItems: 'center', marginRight: wide * 0.05, borderRadius: 10,
        paddingHorizontal: 15,
        marginTop: wide * 0.03,
        width: wide * 0.64
      }}
        activeOpacity={1}
        onPress={() => Navigation.navigate('GamesRecentTab', { 'gameId': item.item.gameId })}
      >


        <View style={{
          marginTop: 24,
          flexDirection: 'row', alignItems: 'center',
          justifyContent: 'space-around', width: '90%'
        }}>
          {/* edit by keshav */}
          <View style={{
            width: wide * 0.18, height: wide * 0.18,
            backgroundColor: Colors.light, borderRadius: wide * 0.18 / 2,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <FastImage style={{ width: wide * 0.12, height: wide * 0.12, }} resizeMode={'contain'}
              source={{ uri: item.item.challengerLogoUrl }} />
          </View>

          <Text style={{
            color: Colors.light, fontSize: 22, fontFamily: Fonts.BoldItalic,
            lineHeight: 24, paddingHorizontal: 10
          }}>VS</Text>

          <View style={{
            width: wide * 0.18, height: wide * 0.18,
            backgroundColor: Colors.light, borderRadius: wide * 0.18 / 2,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <FastImage style={{ width: wide * 0.12, height: wide * 0.12, }}
              resizeMode={'contain'} source={{ uri: item.item.defenderLogoUrl }} />
          </View>

        </View>

        <Text style={{
          color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
          lineHeight: 24, paddingBottom: 10, marginTop: 5
        }}>{item.item.finalScore}</Text>
      </TouchableOpacity>
    );
  };

  //Old My Standing Screen
  // render() {

  //     const { myStandingData } = this.props.Home
  //     console.log(myStandingData);
  //     return (
  //         myStandingData.length === 0 ?
  //             <View style={{ flex: 1, backgroundColor: Colors.base }}>
  //                 <AppLoader visible={this.state.loading} />
  //             </View>
  //             :
  //             <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

  //                 <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
  //                     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
  //                         minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10, marginHorizontal: 15
  //                     }}>

  //                         <View style={{ flex: 1, backgroundColor: Colors.base }} >

  //                             {/* <View style={{ marginTop: wide * 0.08, marginHorizontal: 15 }}>

  //                             <Text style={{

  //                                 color: Colors.light, fontSize: 32,
  //                                 fontFamily: Fonts.Regular, lineHeight: 44
  //                             }}>
  //                                 My

  //                             </Text>
  //                             <Text style={{
  //                                 color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold
  //                             }}>
  //                                 Standing
  //                             </Text>

  //                         </View> */}


  //                             <View style={{ marginTop: wide * 0.1, marginHorizontal: 15 }}>
  //                                 <Text style={{
  //                                     color: Colors.light, fontSize: 24, lineHeight: 30,
  //                                     fontFamily: Fonts.SemiBold
  //                                 }}>
  //                                     My Position
  //                                 </Text>
  //                                 <View style={{ marginTop: wide * 0.05 }}>
  //                                     <Image style={{
  //                                         position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%',
  //                                         height: '100%'
  //                                     }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
  //                                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //                                         <View style={{
  //                                             width: wide * 0.27, height: wide * 0.36,
  //                                             marginTop: 10, borderRadius: wide * 0.03, borderWidth: 3,
  //                                             borderColor: Colors.borderColor, marginLeft: wide * 0.025,
  //                                             justifyContent: 'center', alignItems: 'center'
  //                                         }}>{myStandingData?.myStats?.userProfilePictureUrl != null ?
  //                                             <FastImage

  //                                                 style={{ width: '95%', height: '95%', borderRadius: 10 }}
  //                                                 source={{ uri: myStandingData?.myStats?.userProfilePictureUrl }}
  //                                             />
  //                                             // < Image style={{ width: '95%', height: '95%', borderRadius: 10 }}
  //                                             //     source={{ uri: myStandingData?.myStats?.userProfilePictureUrl }} />
  //                                             :
  //                                             <Image style={{ width: '90%', height: '90%', borderRadius: 10 }} resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />}
  //                                         </View>
  //                                         <View style={{ marginLeft: wide * 0.02 }}>
  //                                             <Text style={{
  //                                                 color: Colors.fontColorGray, fontSize: 13,
  //                                                 fontFamily: Fonts.BoldItalic,
  //                                                 alignSelf: 'center', marginTop: wide * 0.07
  //                                             }}>#RANK</Text>
  //                                             <Text style={{
  //                                                 color: Colors.light, fontSize: 70, fontFamily: Fonts.SemiBold,
  //                                                 marginLeft: 5,
  //                                             }}>{myStandingData?.myStats?.rank}
  //                                             </Text>
  //                                         </View>

  //                                         <Image
  //                                             source={myStandingData?.myStats?.improved ? require("../../Images/upArrow.png") : require("../../Images/downArrow.png")}
  //                                             resizeMode="contain"
  //                                             style={{
  //                                                 width: wide * 0.03, height: wide * 0.025,
  //                                                 marginTop: wide * 0.22, marginHorizontal: -15
  //                                             }}
  //                                         />

  //                                         <View style={{
  //                                             marginHorizontal: wide * 0.08,
  //                                             flex: 1,
  //                                         }}>
  //                                             {myStandingData?.teamName !== null ?
  //                                                 <View style={{
  //                                                     flexDirection: 'row',
  //                                                     justifyContent: 'space-between',
  //                                                     width: '100%', paddingRight: wide * 0.025
  //                                                 }}>


  //                                                     <Text style={{
  //                                                         color: Colors.light, fontSize: 18,
  //                                                         fontFamily: Fonts.SemiBold,
  //                                                         marginTop: wide * 0.06,
  //                                                     }}>
  //                                                         {myStandingData?.teamName}
  //                                                     </Text>
  //                                                     <FastImage
  //                                                         source={{ uri: myStandingData?.teamLogoUrl }}
  //                                                         resizeMode="contain"
  //                                                         style={{
  //                                                             width: wide * 0.06, height: wide * 0.06,
  //                                                             marginTop: wide * 0.05,
  //                                                         }}
  //                                                     />

  //                                                 </View> : null}
  //                                             <Text style={{
  //                                                 color: Colors.light, fontSize: 16,
  //                                                 fontFamily: Fonts.Bold,
  //                                                 marginTop: wide * 0.02,
  //                                             }}>
  //                                                 {myStandingData?.myStats?.position}
  //                                             </Text>

  //                                             {
  //                                                 myStandingData?.myStats?.pgs !== undefined && myStandingData?.myStats?.pgs !== null ?
  //                                                     <View style={{
  //                                                         flexDirection: 'row',
  //                                                         width: '100%', marginTop: wide * 0.03, justifyContent: 'space-between'
  //                                                     }}>

  //                                                         <View >
  //                                                             <Text style={{
  //                                                                 color: Colors.fontColorGray, fontSize: 14, fontFamily: Fonts.Bold,

  //                                                             }}>{Object.keys(myStandingData?.myStats?.pgs)[0].toUpperCase()}</Text>
  //                                                             <Text style={{
  //                                                                 color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
  //                                                                 marginTop: 6,
  //                                                             }}>
  //                                                                 {Object.values(myStandingData?.myStats?.pgs)[0]}
  //                                                             </Text>
  //                                                         </View>
  //                                                         <View >
  //                                                             <Text style={{
  //                                                                 color: Colors.fontColorGray, fontSize: 14, fontFamily: Fonts.Bold,

  //                                                             }}>{Object.keys(myStandingData?.myStats?.pgs)[1].toUpperCase()}</Text>
  //                                                             <Text style={{
  //                                                                 color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
  //                                                                 marginTop: 6,
  //                                                             }}>
  //                                                                 {Object.values(myStandingData?.myStats?.pgs)[1]}
  //                                                             </Text>
  //                                                         </View>
  //                                                         <View >
  //                                                             <Text style={{
  //                                                                 color: Colors.fontColorGray, fontSize: 14, fontFamily: Fonts.Bold,

  //                                                             }}>{Object.keys(myStandingData?.myStats?.pgs)[2].toUpperCase()}</Text>
  //                                                             <Text style={{
  //                                                                 color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
  //                                                                 marginTop: 6,
  //                                                             }}>
  //                                                                 {Object.values(myStandingData?.myStats?.pgs)[2]}
  //                                                             </Text>
  //                                                         </View>
  //                                                     </View>

  //                                                     : null
  //                                             }

  //                                         </View>

  //                                     </View>
  //                                 </View>
  //                             </View>
  //                             {myStandingData?.teamId != null ?
  //                                 < View style={{ marginTop: wide * 0.12, marginHorizontal: 15 }}>
  //                                     <Text style={{
  //                                         color: Colors.light, fontSize: 24, lineHeight: 30,
  //                                         fontFamily: Fonts.SemiBold
  //                                     }}>
  //                                         My Teams
  //                                     </Text>
  //                                     <TouchableOpacity style={{ marginTop: wide * 0.05 }} onPress={() => Navigation.navigate('MyTeam', { 'teamId': myStandingData?.teamId })}>
  //                                         <Image style={{
  //                                             position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
  //                                         }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
  //                                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //                                             <View style={{
  //                                                 width: wide * 0.27, height: wide * 0.36,
  //                                                 marginTop: 10, borderRadius: wide * 0.03, borderWidth: 3,
  //                                                 borderColor: Colors.borderColor, marginLeft: wide * 0.025,
  //                                                 justifyContent: 'center', alignItems: 'center'
  //                                             }}>
  //                                                 <FastImage

  //                                                     style={{ width: '90%', height: '90%', }}
  //                                                     resizeMode={'contain'} source={{ uri: myStandingData?.teamLogoUrl }}
  //                                                 />
  //                                                 {/* <Image style={{ width: '90%', height: '90%', }}
  //                                                     resizeMode={'contain'} source={{ uri: myStandingData?.teamLogoUrl }} /> */}
  //                                             </View>


  //                                             <View style={{
  //                                                 marginHorizontal: wide * 0.05,
  //                                                 flex: 1
  //                                             }}>
  //                                                 <View >
  //                                                     <View style={{
  //                                                         flexDirection: 'row',
  //                                                         justifyContent: 'space-between',
  //                                                         width: '100%'
  //                                                     }}>
  //                                                         <View >
  //                                                             <Text style={{
  //                                                                 color: Colors.fontColorGray,
  //                                                                 fontSize: 16, fontFamily: Fonts.Regular,

  //                                                             }}>WIN</Text>
  //                                                             <Text style={{
  //                                                                 color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
  //                                                                 marginTop: 6,
  //                                                             }}>
  //                                                                 {myStandingData?.myTeams?.wins}
  //                                                             </Text>
  //                                                         </View>
  //                                                         <View >
  //                                                             <Text style={{
  //                                                                 color: Colors.fontColorGray, fontSize: 16, fontFamily: Fonts.Regular,

  //                                                             }}>LOSS</Text>
  //                                                             <Text style={{
  //                                                                 color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
  //                                                                 marginTop: 6,
  //                                                             }}>
  //                                                                 {myStandingData?.myTeams?.loss}
  //                                                             </Text>
  //                                                         </View>
  //                                                         <View >
  //                                                             <Text style={{
  //                                                                 color: Colors.fontColorGray, fontSize: 16, fontFamily: Fonts.Regular,

  //                                                             }}>WIN%</Text>
  //                                                             <Text style={{
  //                                                                 color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
  //                                                                 marginTop: 6,
  //                                                             }}>
  //                                                                 {myStandingData?.myTeams?.winPercentage}
  //                                                             </Text>
  //                                                         </View>
  //                                                     </View>

  //                                                     <View style={{
  //                                                         flexDirection: 'row',
  //                                                         width: '100%', marginTop: wide * 0.06
  //                                                     }}>

  //                                                         <View >
  //                                                             <Text style={{
  //                                                                 color: Colors.fontColorGray, fontSize: 16, fontFamily: Fonts.Regular,

  //                                                             }}>STEAK</Text>
  //                                                             <Text style={{
  //                                                                 color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
  //                                                                 marginTop: 6,
  //                                                             }}>
  //                                                                 {myStandingData?.myTeams?.streak}
  //                                                             </Text>
  //                                                         </View>
  //                                                         <View style={{ marginLeft: wide * 0.035 }}>
  //                                                             <Text style={{
  //                                                                 color: Colors.fontColorGray, fontSize: 16, fontFamily: Fonts.Regular,

  //                                                             }}>LAST 10</Text>
  //                                                             <Text style={{
  //                                                                 color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
  //                                                                 marginTop: 6,
  //                                                             }}>
  //                                                                 {myStandingData?.myTeams?.lastMatches}
  //                                                             </Text>
  //                                                         </View>
  //                                                     </View>
  //                                                 </View>
  //                                             </View>

  //                                         </View>
  //                                     </TouchableOpacity>
  //                                 </View>
  //                                 :
  //                                 null
  //                             }

  //                             {/* <View style={{ marginTop: wide * 0.12 }}>
  //                             <Text style={{
  //                                 color: Colors.light, fontSize: 28, lineHeight: 30,
  //                                 fontFamily: Fonts.SemiBold, marginHorizontal: 15
  //                             }}>
  //                                 Road To Pro
  //         </Text>
  //                             <View style={{ marginTop: wide * 0.05 }}>
  //                                 <FlatList
  //                                     style={{ overflow: 'visible' }}
  //                                     // style={{ flex: 1 }}
  //                                     data={this.state.arrLevels}
  //                                     renderItem={(item, index) => this._renderLevel(item, index)}
  //                                     showsHorizontalScrollIndicator={false}
  //                                     horizontal
  //                                 />
  //                             </View>
  //                         </View> */}
  //                             <Text style={{
  //                                 color: Colors.light, fontSize: 24, lineHeight: 30,
  //                                 fontFamily: Fonts.SemiBold, marginHorizontal: 15, marginTop: wide * 0.12
  //                             }}>
  //                                 My Workout
  //                             </Text>
  //                             {myStandingData?.healthInfo != null || myStandingData?.healthInfo != undefined ?
  //                                 <View>
  //                                     {/* <Text style={{
  //                                         color: Colors.light, fontSize: 24, lineHeight: 30,
  //                                         fontFamily: Fonts.SemiBold, marginHorizontal: 15
  //                                     }}>
  //                                         My Workout
  //                                     </Text> */}
  //                                     <Text style={{
  //                                         color: Colors.light, fontSize: 16, lineHeight: 30,
  //                                         fontFamily: Fonts.Regular, marginHorizontal: 15,
  //                                         marginTop: wide * 0.02, fontStyle: 'italic'
  //                                     }}>
  //                                         Connected With {Platform.OS === 'ios' ? 'Apple Health' : 'Google Fit'}
  //                                     </Text>
  //                                     <View style={{ marginTop: wide * 0.02 }}>
  //                                         <FlatList
  //                                             //key={this.state.loading}
  //                                             style={{
  //                                                 overflow: 'visible'
  //                                             }}

  //                                             data={myStandingData?.healthInfo != null || myStandingData?.healthInfo != undefined ? Object.values(myStandingData?.healthInfo) : []}
  //                                             renderItem={(item, index) => this._renderWorkout(item, index)}
  //                                             showsHorizontalScrollIndicator={false}
  //                                             horizontal
  //                                         />

  //                                         <Text style={{
  //                                             color: Colors.light, fontSize: 14, fontFamily: Fonts.Regular,
  //                                             paddingBottom: wide * 0.15, alignSelf: 'center', fontStyle: 'italic',
  //                                         }}>*Last Updated Today</Text>

  //                                     </View>
  //                                 </View>
  //                                 : <View style={{ flex: 1, justifyContent: 'flex-end' }}>
  //                                     <View style={{
  //                                         marginTop: wide * 0.12, alignSelf: 'center', borderWidth: 3,
  //                                         borderColor: Colors.light, borderRadius: wide * 0.1
  //                                     }}>

  //                                         <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
  //                                             if (Platform.OS === 'ios') {
  //                                                 this.getDataFromAppleHealth(true)
  //                                             } else {
  //                                                 this.getDataFromGoogleFit(true)
  //                                             }
  //                                         }}>
  //                                             <Text style={{
  //                                                 color: Colors.light, fontSize: 16, lineHeight: 30,
  //                                                 fontFamily: Fonts.SemiBold, marginHorizontal: 15
  //                                             }}>
  //                                                 Connect With {Platform.OS === 'ios' ? 'Apple Health' : 'Google Fit'}
  //                                             </Text>
  //                                         </TouchableOpacity>

  //                                     </View>
  //                                 </View>}

  //                         </View>
  //                         {/* <AppLoader visible={this.state.loading} /> */}
  //                     </ScrollView>
  //                 </KeyboardAvoidingView>

  //             </SafeAreaView >
  //     );
  // }


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
    const { myStandingData } = this.props.Home
    const { loading, firstDropSelectedVal, secondDropSelectedVal, showFirstSeasonDrop, showSecondSeasonDrop, } = this.state;
    console.log("sideBarData", this.state.sideBySideBarData)
    return (
      // myStandingData.length === 0 ?
      //     <View style={{ flex: 1, backgroundColor: Colors.base }}>
      //         <AppLoader visible={this.state.loading} />
      //     </View>
      //     :
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>

        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          {this.state.loading == true ?
            <AppLoader visible={this.state.loading} /> : <></>}
          <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
            <View style={{
              marginTop: wide * 0.03,
              width: '90%',
              // backgroundColor: 'green',
              alignSelf: 'center'
            }}>
              <Text style={{
                color: Colors.light, fontSize: 24,
                fontFamily: Fonts.Bold, lineHeight: 40
              }}>
                My Standing
              </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={{
                // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                paddingBottom: 20,
                marginTop: wide * 0.03
              }}>

              <View style={{ backgroundColor: Colors.base, }} >

                {myStandingData?.leadingPlayerInfoList !== null && myStandingData?.leadingPlayerInfoList?.length > 0 ?
                  <>
                    {/* <View style={{ marginTop: wide * 0.1 }}>
                                            <Title data={'Leading Players'} />
                                           
                                        </View> */}
                    <View style={{
                      marginTop: wide * 0.04,
                      // backgroundColor: 'red',
                      alignItems: 'center',
                    }}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{
                          overflow: 'visible', width: '93%',
                          // backgroundColor: 'red'
                        }}
                        data={myStandingData?.leadingPlayerInfoList}
                        renderItem={(item, index) => this._renderLeadingPlayer(item, index)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                      />

                      <TouchableOpacity style={{
                        // backgroundColor: Colors.btnBg,
                        width: wide * 0.22,
                        height: 20,
                        marginTop: wide * 0.05,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                      }}
                        onPress={() => Navigation.navigate('PlayerMore')}>
                        <Text style={{
                          color: Colors.light, fontSize: 14, fontFamily: Fonts.Bold,
                          lineHeight: 16
                        }}>View More</Text>
                        <Image
                          style={{
                            width: wide * 0.025, height: wide * 0.02, marginHorizontal: wide * 0.01
                          }} source={require('../../Images/dropDownIconNew.png')} />
                      </TouchableOpacity>
                    </View>
                  </>
                  : null
                }
                {/* {myStandingData?.leadingTeamInfoList !== null && myStandingData?.leadingTeamInfoList?.length > 0 ? */}
                {myStandingData?.teamDetailTabInfo !== null && myStandingData?.teamDetailTabInfo?.teamTabInfoDtoList.length > 0 ?
                  <>
                    <View style={{ marginTop: wide * 0.1 }}>
                      <Title data={'My Teams'} />
                    </View>

                    <View style={{
                      marginTop: wide * 0.04,
                      alignItems: 'center',
                    }}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{
                          overflow: 'visible', width: '90%',
                          marginLeft: -10,
                        }}
                        // data={myStandingData?.leadingTeamInfoList}
                        data={myStandingData?.teamDetailTabInfo?.teamTabInfoDtoList}
                        renderItem={(item, index) => this._renderLeadingTeam(item, index)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                      />

                      <TouchableOpacity style={{
                        // backgroundColor: Colors.btnBg,
                        width: wide * 0.22,
                        height: 20,
                        marginTop: wide * 0.06,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                      }}
                        // onPress={() => Navigation.navigate('TeamMore')}

                        onPress={() => Navigation.navigate("PlayerMyTeams",
                          { teamId: myStandingData?.teamDetailTabInfo?.teamTabInfoDtoList[0]?.teamId })}
                      >
                        <Text style={{
                          color: Colors.light, fontSize: 14, fontFamily: Fonts.Bold,
                          lineHeight: 16
                        }}>View More</Text>
                        <Image
                          style={{
                            width: wide * 0.025, height: wide * 0.02, marginHorizontal: wide * 0.01
                          }} source={require('../../Images/dropDownIconNew.png')} />
                      </TouchableOpacity>
                    </View>
                  </>
                  : null
                }
                {myStandingData?.recentGamesInfo !== null && myStandingData?.recentGamesInfo !== undefined ?

                  <View style={{ marginTop: wide * 0.1, alignItems: 'center' }}>
                    {/* <Title data={'Recent Games'} /> */}

                    <View style={{
                      width: '100%',
                      // backgroundColor: 'green'
                      // marginHorizontal: wide * 0.055,
                    }}>

                      <TeamStats key={`game-${0}`} data={myStandingData?.recentGamesInfo} />
                      {/* <FlatList
                      style={{ overflow: 'visible' }}
                      //style={{marginTop:wide*0.01}}    
                      data={myStandingData?.recentGames}
                      renderItem={(item, index) => this._renderRecents(item, index)}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                    /> */}

                    </View>
                    <TouchableOpacity style={{
                      // backgroundColor: Colors.btnBg,
                      width: wide * 0.22,
                      height: 20,
                      marginTop: wide * 0.09,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly'
                    }}
                      // onPress={() => Navigation.navigate('TeamMore')}

                      onPress={() => Navigation.navigate("PlayerMoreRecentGames")}
                    >
                      <Text style={{
                        color: Colors.light, fontSize: 14, fontFamily: Fonts.Bold,
                        lineHeight: 16
                      }}>View More</Text>
                      <Image
                        style={{
                          width: wide * 0.025, height: wide * 0.02, marginHorizontal: wide * 0.01
                        }} source={require('../../Images/dropDownIconNew.png')} />
                    </TouchableOpacity>
                  </View>
                  :
                  null
                }

                {/* {this.state.userStatBarData.length > 0 ?
                <View style={{ marginTop: wide * 0.1, marginBottom: 20 }}>
                 
                  <View style={{
                    // height: wide * 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    marginHorizontal: 24,
                    // backgroundColor: "green"
                    // flex: 1,
                    // display: 'flex'

                  }}>
                    <UserStats
                      barData1={this.state.userStatBarData}
                    // barData1={barChartData}
                    />
                  </View>
                </View>


                : null
              } */}
                <View style={{ marginTop: wide * 0.1, }}>
                  <Title data={'Box Score'} />

                  <View style={{ width: '90%', alignSelf: 'center', alignItems: 'center', }}>
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

              </View>
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

        </SafeAreaView>
      </View>
    );
  }
}

const UserStats = ({ barData1 }) => {
  // console.log("----sjsjks", barData1)
  return (

    <VictoryChart
      width={350}
      height={barData1.length <= 2 ? 60 : barData1.length <= 3 ? 90 : barData1.length <= 5 ? 150 :
        barData1.length <= 8 ? 250 :
          barData1.length <= 10 ? 300 : barData1.length <= 13 ? 380 : barData1.length <= 15 ? 450 : barData1.length <= 18 ? 550 : 750}

      padding={{ top: 10, left: 50, right: 40, bottom: 10 }}
      domainPadding={{ x: 25 }}

    // minDomain={{ x: 10, y: 10 }}
    >
      <VictoryGroup
        // offset={-10}
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
          labelComponent={<VictoryLabel dy={0} dx={10} style={{ fill: '#D8A433', fontSize: 14 }} />}
          style={{
            data: {
              fill: '#D8A433',
            },

          }}
          // barRatio={0.1}
          barWidth={12}

        />

      </VictoryGroup>
      <VictoryAxis
        offsetX={40}
        style={{
          tickLabels: {
            fill: Colors.light, fontSize: 12, lineHeight: 16,
            // padding: 15,
            fontFamily: Fonts.Bold,
          },
          axis: { stroke: Colors.base, }
        }}

      />
    </VictoryChart>
  )

}



function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(MyStanding);
