
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, StyleSheet, StatusBar } from 'react-native';
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

import { UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { color } from 'react-native-reanimated';
import { getObject } from '../../middleware';
import { getPlayerMore, getPlayerMoreSearch, getPlayerMoreNew } from '../../actions/home';
import FastImage from 'react-native-fast-image';


let wide = Layout.width;
let pageNum = 0;
const playrData = [
  {
    "teamId": null,
    "userId": 163188828525507,
    "position": "Center",
    "rank": 20,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": null,
    "teamLogoUrl": null,
    "userName": "lebron james",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "F"
  },
  {
    "teamId": 163774030859802,
    "userId": 163188828525517,
    "position": "Center",
    "rank": 1,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": "Golden figma",
    "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
    "userName": "lebron james",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "C"
  },
  {
    "teamId": 163774354906804,
    "userId": 163188828525527,
    "position": "Center",
    "rank": 1,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": "Golden slack",
    "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
    "userName": "lebron james",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "C"
  },
  {
    "teamId": null,
    "userId": 163188828525537,
    "position": "Center",
    "rank": 1,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": null,
    "teamLogoUrl": null,
    "userName": "lebron james",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "C"
  },
  {
    "teamId": 163774067791005,
    "userId": 163188828525547,
    "position": "Center",
    "rank": 1,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": "Golden figma",
    "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
    "userName": "lebron james",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "C"
  },
  {
    "teamId": 163338618530605,
    "userId": 1632112239690909,
    "position": "Center",
    "rank": 1,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": "WP Tigers ",
    "teamLogoUrl": "https://firebasestorage.googleapis.com/v0/b/nextup-ccc80.appspot.com/o/c5486083-46a9-4fa0-8d5a-d8dae3dc87f5.jpg?alt=media",
    "userName": "lebron james",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "C"
  },

  {
    "teamId": null,
    "userId": 163188828525507,
    "position": "Center",
    "rank": 12,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": null,
    "teamLogoUrl": null,
    "userName": "Mike larryy jamison",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "A"
  },
  {
    "teamId": 163774030859802,
    "userId": 163188828525517,
    "position": "Center",
    "rank": 8,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": "Golden figma",
    "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
    "userName": "lebron",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "U"
  },
  {
    "teamId": 163774354906804,
    "userId": 163188828525527,
    "position": "Center",
    "rank": 3,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": "Golden slack",
    "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
    "userName": "Jim garry",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "B"
  },
  {
    "teamId": null,
    "userId": 163188828525537,
    "position": "Center",
    "rank": 5,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": null,
    "teamLogoUrl": null,
    "userName": "Mike Tison",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "A"
  },
  {
    "teamId": 163774067791005,
    "userId": 163188828525547,
    "position": "Center",
    "rank": 0,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": "Golden figma",
    "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
    "userName": "Sam Jamison",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "N"
  },
  {
    "teamId": 163338618530605,
    "userId": 1632112239690909,
    "position": "Center",
    "rank": 14,
    "pgs": null,
    "kpiValue": null,
    "playerName": null,
    "teamName": "WP Tigers ",
    "teamLogoUrl": "https://firebasestorage.googleapis.com/v0/b/nextup-ccc80.appspot.com/o/c5486083-46a9-4fa0-8d5a-d8dae3dc87f5.jpg?alt=media",
    "userName": "Carl patison",
    "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
    "positionInChars": "C"
  }
]
class PlayerMore extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedIndex: 0,
      isOpenSortOption: false,
      initialDataList: [],
      dataList: [],
      strText: '',
      topRankerData: [],

      // itemOffSet: 0,
      // currentPage: null,
      // pageCount: 0,
      selectedSort: 'rank',
      sortOrder: 'desc'
      // topRankerData2: {}
    };
  }
  componentDidMount() {
    pageNum = 0;
    this.onScreenFoucs();
    // getObject('UserId').then((obj) => {
    //     this.setState({ loading: true }, () => {
    //         this.props.dispatch(getPlayerMore(obj, this.state.strText, (res, resData) => {
    //             debugger
    //             if (res) {
    //                 var topPlayer1 = resData.shift();
    //                 var topPlayer2 = resData.shift();
    //                 this.setState({ loading: false, initialDataList: resData, dataList: resData, topRankerData: topPlayer1, topRankerData2: topPlayer2 })
    //                 // this.setState({ loading: false, })
    //             } else {
    //                 this.setState({ loading: false, dataList: [] })
    //             }
    //         }))
    //     })

    // })
  }

  onScreenFoucs = () => {
    debugger
    const { selectedSort, sortOrder } = this.state;
    getObject('UserId').then((obj) => {
      this.setState({ loading: true }, () => {
        this.props.dispatch(getPlayerMoreNew(obj, pageNum, selectedSort, sortOrder, (res, resData) => {
          debugger
          if (res) {
            debugger
            var topPlayer = [];
            if (resData.length > 0) {
              var topPlayer = [];
              // if (resData.length > 0) {
              let resLength = resData.length;
              for (let i = 0; i < resLength; i++) {
                topPlayer.push(resData.shift());
                if (i == 2) {
                  break
                }
              }
              // }
              // var topPlayer1 = resData.shift();
              // var topPlayer2 = resData.shift();
              this.setState({
                loading: false,
                // initialDataList: resData,
                dataList: resData,
                topRankerData: topPlayer
              })
              if (resData.length == 0) {
                this.setState({ selectedSort: '', sortOrder: '', loading: false, })
              }
            } else {
              this.setState({
                loading: false,
                dataList: resData,
                topRankerData: topPlayer,
                selectedSort: '', sortOrder: ''
              })
            }

            // this.setState({ loading: false, })
          } else {
            this.setState({ loading: false, dataList: [] })
          }
        }))
      })

    })
  }

  // apiCall = (strTxt) => {
  //     getObject('UserId').then((obj) => {

  //         this.props.dispatch(getPlayerMoreSearch(obj, strTxt, (res, resData) => {

  //             // debugger
  //             // this.setState({ topRankerData: resData.shift() })
  //             this.setState({ loading: false, dataList: resData })


  //         }))
  //     })
  // }

  _renderTeam = ({ item }) => {
    // console.log("----->>  ", item.teamLogoUrl)
    return (
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{
          height: wide * 0.1,
          width: '80%',
          marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between',

        }}
        >
          <Text style={{
            color: Colors.light, fontSize: 12,
            lineHeight: 16, fontFamily: Fonts.SemiBold, paddingHorizontal: 5, width: '10%',
          }}>{item.rank}</Text>
          {/* edit by keshav width: wide * 0.15*/}
          {/* <View style={{ marginLeft: -20, width: wide * 0.06 }}> */}

          {/* </View> style={{ marginLeft: item.profilePicUrl !== null ? -wide * 0.1 : 0 }} */}
          <View style={{ width: '30%', flexDirection: 'row', }}>
            {item.profilePicUrl === null || item.profilePicUrl === undefined ? null :
              <FastImage
                source={{
                  uri: item.profilePicUrl,
                  priority: FastImage.priority.high,
                }}
                // resizeMode="contain"
                style={{ width: 20, height: 20, borderRadius: (wide * 0.06) / 2, }}
              />}
            <View>
              <Text style={{
                color: Colors.light, fontSize: 10,
                fontFamily: Fonts.Bold
              }}>{item.firstName} {item.lastName}</Text>
              {/* <Text style={{
                        color: Colors.light, fontSize: 10,
                        fontFamily: Fonts.Bold
                    }}></Text> */}
              <Text style={{
                color: Colors.light, fontSize: 11,
                lineHeight: 14, fontFamily: Fonts.Regular,
              }}>{item.position} </Text>
            </View>
            {/* <Image
                            source={require("../../Images/upArrow.png")}
                            // resizeMode="contain"
                            style={{ width: wide * 0.02, height: wide * 0.02 }}
                        ></Image> */}
          </View>
          {/* <View> */}
          <Text style={{
            color: Colors.light, fontSize: 12,
            lineHeight: 16, fontFamily: Fonts.SemiBold, width: '25%', textAlign: 'center',
          }}>{item.teamName}</Text>

          {/* </View> */}
          {/* <View> */}
          <Text style={{
            color: Colors.light, fontSize: 12,
            lineHeight: 12, fontFamily: Fonts.SemiBold, width: '15%', textAlign: 'center',
            // marginLeft: item.teamName === null ? wide * 0.22 : 0,
          }}>{item.points}</Text>
          {/* </View> */}
          {/* edit by keshav */}


        </View>
        <View style={{ width: '10%', }}>
          {item.teamLogoUrl !== null || item.teamLogoUrl !== undefined ?
            <FastImage
              source={{
                uri: item.teamLogoUrl,
                priority: FastImage.priority.high
              }}
              resizeMode="contain"
              style={{ width: 25, height: 25, borderRadius: 15, }}
            />
            : null
          }

        </View>
      </View>
    );
  };

  //new team player render method by Keshav
  _renderNewTeam = ({ item }) => {
    // console.log("----->>  ", item.teamLogoUrl)
    return (
      <View style={{
        width: '100%', flexDirection: 'row',
        justifyContent: 'space-between',
        height: wide * 0.1, marginTop: 10,
      }}>
        {/* <View style={{
                    height: wide * 0.1,
                    width: '100%',
                     flexDirection: 'row', justifyContent: 'space-between',

                }}
                > */}
        <View style={{
          width: '15%',
          // alignItems: 'center',
          // backgroundColor: 'green',
        }}>
          <Text style={{
            color: Colors.light, fontSize: 13,
            lineHeight: 15, fontFamily: Fonts.Regular,
            marginLeft: wide * 0.01
          }}>{item.rank}</Text>

        </View>



        <View style={{ width: '30%', }}>
          <Text style={{
            color: Colors.light, fontSize: 13, lineHeight: 15,
            fontFamily: Fonts.Regular
          }}>
            {item.userName}
            {/* {item.firstName} {item.lastName} */}
          </Text>
        </View>

        {/* <Text style={{
                                color: Colors.light, fontSize: 11,
                                lineHeight: 14, fontFamily: Fonts.Regular,
                            }}>{item.position} </Text> */}
        <View style={{ width: '25%', alignItems: 'center', }}>
          <Text style={{
            color: Colors.light, fontSize: 13,
            lineHeight: 15, fontFamily: Fonts.Regular,
          }}>{item.teamName}</Text>
        </View>
        <View style={{ width: '20%', alignItems: 'center', }}>
          <Text style={{
            color: Colors.light, fontSize: 13,
            lineHeight: 15, fontFamily: Fonts.Regular,
          }}>
            {item.positionInChars}
          </Text>
        </View>


        {/* </View> */}
        {/* <View style={{ width: '10%', }}>
                    {item.teamLogoUrl !== null || item.teamLogoUrl !== undefined ?
                        <FastImage
                            source={{ uri: item.teamLogoUrl }}
                            resizeMode="contain"
                            style={{ width: 25, height: 25, borderRadius: 15, }}
                        />
                        : null
                    }

                </View> */}
      </View>
    );
  };

  _renderLeadingPlayer = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          marginLeft: wide * 0.015,
          paddingHorizontal: wide * 0.025,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        activeOpacity={1}
        onPress={() => {
          if (UserModel.selectedUserType.toUpperCase() === 'COACH') {
            Navigation.navigate('PlayerProfile', { playerId: item.item.userId })

          }
        }}
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
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: item.item.userProfilePic,
                    priority: FastImage.priority.high,
                  }} />
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
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: item.item.teamLogoUrl,
                    priority: FastImage.priority.high,
                  }}
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


  _renderPlan = (item, index) => {
    return (
      <TouchableOpacity style={{
        height: wide * 0.15,
        justifyContent: 'center',
        alignItems: 'center', paddingRight: wide * 0.135
      }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedIndex: item.index })}
      >


        <Text numberOfLines={2} style={{
          color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray,
          fontSize: 16, lineHeight: 22,
          fontFamily: Fonts.SemiBold, textAlign: 'center'
        }}>PTS</Text>
        <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View>



      </TouchableOpacity>
    );
  };
  _renderSortOption = (item, index) => {
    return (
      <TouchableOpacity style={{
        height: wide * 0.3,
        justifyContent: 'center',
        alignItems: 'center', paddingRight: wide * 0.05
      }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedIndex: item.index })}
      >
        <Image style={{
          width: 60, height: 60,
          marginVertical: 10
        }} source={this.state.selectedIndex === item.index ?
          require('../../Images/sort_tick_selected.png') : require('../../Images/sort_tick_unselected.png')} />

        <Text numberOfLines={2} style={{
          color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray,
          fontSize: 14, lineHeight: 16,
          fontFamily: Fonts.SemiBold, textAlign: 'center', width: wide * 0.15
        }}>Point
          Gaurd</Text>




      </TouchableOpacity>
    );
  };

  render() {

    const { dataList, topRankerData, initialDataList, strText, selectedSort, sortOrder } = this.state;
    // console.log(dataList, topRankerData);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          <View style={{
            alignItems: 'center',
            // borderBottomWidth: 0.5,
            // borderBottomColor: Colors.newGrayFontColor,
            // backgroundColor: 'green'
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
                  Back to Explore
                </Text>

              </View>

              {/* <TouchableOpacity
                            onPress={() => {
                                this.setState({ isOpenSortOption: true })
                            }} style={{ width: '10%', }}>
                            <Image source={require('../../Images/sort.png')} style={{
                                width: 20, height: 20,
                            }} />
                        </TouchableOpacity> */}
              {/* <View>
                            <TextInput style={{
                                borderWidth: 3, borderColor: Colors.borderColor,
                                fontFamily: Fonts.Bold, height: 50,
                                paddingLeft: 10,
                                paddingRight: wide * 0.1,
                                borderRadius: 5, color: Colors.light, fontSize: 16
                            }}
                                placeholder={"SEARCH"}
                                placeholderTextColor={Colors.borderColor}
                                value={strText}
                                onChangeText={(txt) => {
                                    this.apiCall(txt)
                                    this.setState({ strText: txt })
                                }}
                                autoCorrect={false}
                                autoCapitalize='none'

                            />
                            <Image style={{
                                position: 'absolute',
                                width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
                            }} source={require('../../Images/search_ico.png')} />
                        </View> */}

            </View>

          </View>
          {topRankerData.length === 0 ?
            <View style={{ flex: 1, backgroundColor: Colors.base }}>
              <AppLoader visible={this.state.loading} />
            </View>
            :
            <>

              <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                                // marginHorizontal: 15,
                                // backgroundColor: 'red',
                                minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10
                            }}> */}

                <View style={{ backgroundColor: Colors.base, alignItems: 'center', paddingBottom: wide * 0.01 }} >
                  {/* <View style={{ marginTop: wide * 0.05 }}>


                                        <TextInput style={{
                                            borderWidth: 3, borderColor: Colors.borderColor,
                                            fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.1,
                                            borderRadius: 5, color: Colors.light, fontSize: 16
                                        }}
                                            placeholder={"SEARCH"}
                                            placeholderTextColor={Colors.borderColor}
                                            value={strText}
                                            onChangeText={(txt) => {
                                                this.apiCall(txt)
                                                this.setState({ strText: txt })
                                            }}

                                        />
                                        <Image style={{
                                            position: 'absolute',
                                            width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
                                        }} source={require('../../Images/search_ico.png')} />
                                    </View> */}

                  {/* <View style={{ marginTop: wide * 0.05 }}>
                                    <FlatList
                                        style={{ overflow: 'visible' }}
                                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11]}
                                        renderItem={(item, index) => this._renderPlan(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                    />
                                </View> */}

                  <View style={{ marginTop: wide * 0.05, alignItems: 'center', width: '93%' }}>
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      style={{ overflow: 'visible', width: '100%' }}
                      data={topRankerData}
                      renderItem={(item, index) => this._renderLeadingPlayer(item, index)}
                      showsHorizontalScrollIndicator={false}
                      horizontal

                    />

                  </View>

                  {/* List Header */}
                  <View style={{
                    alignItems: 'center', marginTop: wide * 0.1,
                    borderBottomColor: Colors.fontColorGray, borderBottomWidth: 1,
                    width: '100%'
                  }}>
                    <View style={{
                      height: wide * 0.09,
                      paddingVertical: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '90%',
                    }}
                    >
                      <TouchableOpacity style={{
                        width: '16%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                        activeOpacity={1}
                        onPress={() => {
                          if (dataList.length > 0) {
                            this.setState({ selectedSort: 'rank', sortOrder: sortOrder == 'asc' ? 'desc' : 'asc' }, () => {
                              this.onScreenFoucs();
                            })
                          }
                        }}
                      >
                        <Text style={{
                          color: Colors.fontGray, fontSize: 12,
                          lineHeight: 12, fontFamily: Fonts.Bold,
                          // paddingHorizontal: wide * 0.01,
                          paddingTop: wide * 0.01
                        }}>RANK</Text>
                        {selectedSort == 'rank' ?
                          <FastImage
                            style={{
                              width: 10, height: 10,
                              marginLeft: wide * 0.015,
                              transform: [{ rotate: sortOrder == 'desc' ? '180deg' : '0deg' }]
                            }
                            }
                            source={require('../../Images/dropDownIconNew.png')}
                          />
                          : null
                        }
                      </TouchableOpacity>

                      {/* <View style={{ paddingHorizontal: 5, flex: 1 }}> */}
                      <TouchableOpacity style={{
                        width: '30%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                        activeOpacity={1}
                        onPress={() => {
                          if (dataList.length > 0) {
                            this.setState({ selectedSort: 'name', sortOrder: sortOrder == 'asc' ? 'desc' : 'asc' }, () => {
                              this.onScreenFoucs();
                            })
                          }
                        }}
                      >
                        <Text style={{
                          color: Colors.fontGray, fontSize: 12,
                          lineHeight: 12, fontFamily: Fonts.Bold,
                          paddingHorizontal: wide * 0.01,
                          paddingTop: wide * 0.01
                        }}>PLAYERS</Text>
                        {selectedSort == 'name' ?
                          <FastImage
                            style={{
                              width: 10, height: 10,
                              marginLeft: wide * 0.015,
                              transform: [{ rotate: sortOrder == 'desc' ? '180deg' : '0deg' }]
                            }
                            }
                            source={require('../../Images/dropDownIconNew.png')}
                          />
                          : null
                        }
                      </TouchableOpacity>
                      {/* </View> */}
                      <TouchableOpacity style={{
                        width: '25%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: 'green',
                        justifyContent: 'center'
                      }}
                        activeOpacity={1}
                        onPress={() => {
                          if (dataList.length > 0) {
                            this.setState({ selectedSort: 'team', sortOrder: sortOrder == 'asc' ? 'desc' : 'asc' }, () => {
                              this.onScreenFoucs();
                            })
                          }
                        }}
                      >

                        <Text style={{
                          color: Colors.fontGray, fontSize: 12,
                          lineHeight: 12, fontFamily: Fonts.Bold,
                          // textAlign: 'center',
                          paddingHorizontal: wide * 0.01,
                          paddingTop: wide * 0.01
                        }}>TEAM</Text>
                        {selectedSort == 'team' ?
                          <FastImage
                            style={{
                              width: 10, height: 10,
                              marginLeft: wide * 0.015,
                              transform: [{ rotate: sortOrder == 'desc' ? '180deg' : '0deg' }]
                            }
                            }
                            source={require('../../Images/dropDownIconNew.png')}
                          />
                          : null
                        }

                      </TouchableOpacity>
                      <TouchableOpacity style={{
                        width: '25%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: 'blue',
                        justifyContent: 'center'
                      }}
                        activeOpacity={1}
                        onPress={() => {
                          if (dataList.length > 0) {
                            this.setState({ selectedSort: 'position', sortOrder: sortOrder == 'asc' ? 'desc' : 'asc' }, () => {
                              this.onScreenFoucs();
                            })
                          }
                        }}
                      >
                        <Text style={{
                          color: Colors.fontGray, fontSize: 12,
                          lineHeight: 12, fontFamily: Fonts.Bold,
                          // textAlign: 'center',
                          paddingHorizontal: wide * 0.01,
                          paddingTop: wide * 0.01
                        }}>POSITION</Text>
                        {selectedSort == 'position' ?
                          <FastImage
                            style={{
                              width: 10, height: 10,
                              marginLeft: wide * 0.015,
                              transform: [{ rotate: sortOrder == 'desc' ? '180deg' : '0deg' }]
                            }
                            }
                            source={require('../../Images/dropDownIconNew.png')}
                          />
                          : null
                        }
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={() => {
                                                this.setState({ isOpenSortOption: true })
                                            }} style={{ width: '10%', }}>
                                                <Image source={require('../../Images/sort.png')} style={{
                                                    width: 20, height: 20,
                                                }} />
                                            </TouchableOpacity> */}


                    </View>

                  </View>



                  <FlatList
                    bounces={false}
                    style={{
                      width: '90%',
                      marginTop: wide * 0.01,
                      marginBottom: wide * 0.02,
                      height: '60%',
                      // backgroundColor: 'green'
                    }}
                    data={dataList}
                    // data={playrData}
                    // renderItem={(item, index) => this._renderTeam(item)}
                    renderItem={(item, index) => this._renderNewTeam(item)}
                    // stickyHeaderIndices={[0]}
                    // ListHeaderComponent={() => }
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  // onEndReached={() => {
                  //     pageNum = pageNum + 1;
                  //     this.onScreenFoucs();
                  // }}
                  />
                  {/* {dataList.length > 0 && pageNum==0 ?  */}
                  <View style={{
                    width: '90%', height: 50,
                    marginTop: wide * 0.01,
                    flexDirection: 'row',
                    alignSelf: 'center', justifyContent: 'space-between',
                    marginBottom: wide * 0.044,
                    // backgroundColor: 'red'

                  }}>
                    <TouchableOpacity style={{
                      width: '40%',
                      flexDirection: 'row', alignItems: 'center',
                      borderColor: pageNum == 0 ? Colors.newGrayFontColor : Colors.light,
                      borderRadius: wide * 0.02, borderWidth: 1,
                      justifyContent: 'center'
                    }}
                      activeOpacity={1}
                    // onPress={() => {
                    //     if (pageNum !== 0) {
                    //         pageNum = pageNum - 1;
                    //         this.onScreenFoucs();
                    //     }
                    // }}
                    >
                      <FastImage
                        style={{
                          width: wide * 0.035, height: wide * 0.035,
                          tintColor: pageNum == 0 ? Colors.newGrayFontColor : Colors.light,
                          // marginLeft: wide * 0.015,
                          transform: [{ rotate: '90deg' }],

                        }}
                        source={require('../../Images/dropDownIconNew.png')}
                      />
                      <Text style={{
                        color: pageNum == 0 ? Colors.newGrayFontColor : Colors.light,
                        fontSize: 18, lineHeight: 24,
                        fontFamily: Fonts.Bold, marginLeft: wide * 0.03
                      }}>Previous</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      width: '40%',
                      flexDirection: 'row', alignItems: 'center',
                      // borderColor: Colors.newGrayFontColor,
                      borderRadius: wide * 0.02, borderWidth: 1,
                      backgroundColor: dataList.length !== 0 ? Colors.btnBg : Colors.base,
                      justifyContent: 'center'
                    }}
                      activeOpacity={1}
                    // onPress={() => {
                    //     if (dataList.length > 0) {
                    //         pageNum = pageNum + 1;
                    //         this.onScreenFoucs();
                    //     }
                    // }}
                    >

                      <Text style={{
                        color: dataList.length !== 0 ? Colors.light : Colors.newGrayFontColor,
                        fontSize: 18, lineHeight: 24,
                        fontFamily: Fonts.Bold,
                      }}>Next</Text>
                      <FastImage
                        style={{
                          width: wide * 0.035, height: wide * 0.035,
                          marginLeft: wide * 0.03,
                          tintColor: dataList.length !== 0 ? Colors.light : Colors.newGrayFontColor,
                          transform: [{ rotate: '270deg' }]
                        }}
                        source={require('../../Images/dropDownIconNew.png')}
                      />

                    </TouchableOpacity>
                  </View>



                </View>

                {/* </ScrollView> */}
              </KeyboardAvoidingView>
              {/* {
                        this.state.isOpenSortOption
                            ?
                            <View style={{
                                position: 'absolute',
                                top: 0, left: 0,
                                right: 0, bottom: 0,
                                backgroundColor: Colors.overlay, justifyContent: 'flex-end'
                            }}>
                                <View style={{ height: wide * 0.8 }}>
                                    <Image source={require('../../Images/Rectangle_sort.png')} style={{
                                        position: 'absolute', top: 0, left: 0,
                                        right: 0, bottom: 0,
                                    }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', height: wide * 0.2 }}>

                                        <TouchableOpacity style={{ marginLeft: wide * 0.05 }} onPress={() => {
                                            this.setState({ isOpenSortOption: false })
                                        }}>
                                            <Image source={require('../../Images/close_sort.png')}
                                                resizeMode='contain' style={{
                                                    width: 30, height: 30
                                                }} />
                                        </TouchableOpacity>
                                        <Text style={{
                                            color: Colors.light, fontSize: 30, fontFamily: Fonts.Bold,
                                            marginLeft: 15, marginTop: 5
                                        }}>Sort</Text>
                                        <View style={{ flex: 1 }}></View>
                                        <Text style={{
                                            color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
                                            marginHorizontal: 15, marginTop: 5
                                        }}>CLEAR ALL</Text>
                                    </View>
                                    <Image source={require('../../Images/dot_line_horizontal.png')}
                                        resizeMode='contain' style={{
                                            width: '100%'
                                        }} />
                                    <View style={{ marginTop: wide * 0.02, marginHorizontal: 15 }}>
                                        <FlatList
                                            style={{ overflow: 'visible' }}
                                            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                            renderItem={(item, index) => this._renderSortOption(item, index)}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal
                                        />
                                    </View>
                                    <TouchableOpacity

                                        style={{
                                            width: '90%', height: 56,
                                            backgroundColor: Colors.btnBg,
                                            alignSelf: 'center', borderRadius: 28,
                                            justifyContent: 'center', marginTop: 20, paddingHorizontal: 15
                                        }} onPress={() => {

                                        }}>
                                        <Text style={{
                                            alignSelf: 'center', color: Colors.light,
                                            fontFamily: Fonts.Bold, fontSize: 16
                                        }}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            null
                    } */}
            </>
          }
        </SafeAreaView >
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

export default connect(mapStateToProps)(PlayerMore);
