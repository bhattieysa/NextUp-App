
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
// import { isNotch } from '../../utils/deviceInfo';
import moment from 'moment'
import FastImage from 'react-native-fast-image';
import { getSeacrhData } from '../../actions/home';
import { getObject } from '../../middleware';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { UserModel } from '../../constants/constant';

let wide = Layout.width;
var pageNum = 1;

// function formatAMPM(date) {
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     var strTime = hours + ':' + minutes + ' ' + ampm;
//     return strTime;
// }
// var userId = null;
class ExploreSearch extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedPlanIndex: 0,
      selectedCat_nm: 'Players',
      selectedIndex: 0,
      curr_userId: null,
      srchTxt: '',
      category: [
        { id: 1, cat_nm: 'Players' },
        { id: 2, cat_nm: 'Coaches' },
        { id: 3, cat_nm: 'Teams' },
        { id: 4, cat_nm: 'Games' }
      ],
      searchData: null,
      playersArr: [],
      coachArr: [],
      teamArr: [],
      gameArr: [],
    };
  }
  componentDidMount() {
    pageNum = 1
    // this.props.navigation.addListener('didFocus', this.getChatUserListHistory)
  }
  searchDataForTxt = () => {
    debugger;
    const { srchTxt } = this.state;
    if (srchTxt != '') {
      // this.setState({ loading: true }, () => {
      this.props.dispatch(getSeacrhData(this.state.srchTxt, (res, data) => {
        // setTimeout(() => {
        if (res) {
          this.setState({
            searchData: data,
            playersArr: data.players,
            coachArr: data.coaches,
            teamArr: data.teams,
            gameArr: data.gamesResponseDtos.liveMatches,
            // loading: false,
          })
        }
        // }, 500);
      }))
      // })
    }
  }


  _renderTab = (item, index) => {
    return (
      <TouchableOpacity style={{
        height: wide * 0.15,
        justifyContent: 'center',
        alignItems: 'center', marginHorizontal: 8,
        width: wide * 0.2

      }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedIndex: item.index, selectedCat_nm: item.item.cat_nm })}
      >

        <View style={{ flexDirection: 'row', height: '70%', alignItems: 'center' }}>
          <Text numberOfLines={2} style={{
            color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray,
            fontSize: 18, lineHeight: 20,
            fontFamily: Fonts.SemiBold, textAlign: 'center'
          }}>
            {item.item.cat_nm}
          </Text>
        </View>
        {/* <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View> */}

      </TouchableOpacity>
    );
  };

  _renderCoachData = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          width: wide * 0.89,
          height: wide * 0.25,
          marginVertical: 8,
          // justifyContent: "center",
        }}
        activeOpacity={1}
      >
        {/* <Image style={{
                    position: 'absolute', width: '100%', height: '100%', left: 0,
                }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} /> */}

        <View style={{
          flexDirection: 'row', alignItems: 'center',
          marginVertical: 10, justifyContent: 'space-between'
        }}>
          <View
            style={{
              justifyContent: 'center', alignItems: 'center',
              flexDirection: 'row', marginLeft: wide * 0.03
            }}
          >
            <View style={{ alignItems: 'center', }}>
              <View style={{
                width: wide * 0.18, height: wide * 0.18,
                borderRadius: wide * 0.18 / 2, borderWidth: 2,
                borderColor: Colors.newGrayFontColor,
                justifyContent: 'center', alignItems: 'center',
              }}>
                {item.item.logoUrl === null || item.item.logoUrl === '500 Error' ?
                  null
                  // <Image
                  //     style={{
                  //         width: '95%', height: '95%',
                  //         borderRadius: wide * 0.15 / 2,
                  //     }}
                  //     resizeMode={'contain'} source={require('../../Images/placeHolderProf.png')}
                  // />
                  :
                  <FastImage style={{
                    width: '95%', height: '95%',
                    borderRadius: wide * 0.18 / 2,
                  }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{
                      uri: item.item.logoUrl,
                      priority: FastImage.priority.high,
                    }} />
                }


              </View>
              <View style={{ marginTop: wide * 0.015, }}>
                {/* <Text style={{
                                    color: Colors.light, fontSize: 10, fontFamily: Fonts.Bold,
                                    lineHeight: 12
                                }}>
                                    #{item.item.ranking} | {item.item.position}
                                </Text> */}

              </View>
            </View>
            <View style={{ marginLeft: wide * 0.04 }}>
              {item.item.title !== null ?
                <Text style={{
                  color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                  lineHeight: 20,

                }}>{item.item.title}</Text>
                : null
              }
              <View style={{ marginTop: wide * 0.01 }} />
              {item.item.subTitle.map(element => {
                return (
                  // <View style={{ flexDirection: 'row', }}>
                  <Text style={{
                    color: Colors.fontColorGray, fontSize: 16, fontFamily: Fonts.Bold,
                    lineHeight: 18,
                    marginVertical: 2,
                  }}>
                    {element}
                  </Text>
                  // </View>

                )
              })}


            </View>
          </View>

          <View style={{
            width: wide * 0.12, height: wide * 0.12,
            marginRight: wide * 0.09,
            // borderRadius: wide * 0.15 / 2, 
            // borderWidth: 3,
            // borderColor: Colors.borderColor,
            justifyContent: 'center', alignItems: 'center',
            flexDirection: 'row'
          }}>
            {item.item.teamLogoUrl === null ?
              null
              // <Image
              //     style={{
              //         width: '95%', height: '95%',
              //         borderRadius: wide * 0.15 / 2,
              //     }}
              //     resizeMode={'contain'} source={require('../../Images/placeHolderProf.png')}
              // />
              :
              item.item.teamLogoUrl.map((element, index) => {
                var leftMargin = index * 15;
                return (
                  <FastImage style={{
                    width: '90%', height: '90%',
                    borderRadius: wide * 0.12 / 2,
                    position: 'absolute',
                    left: leftMargin
                  }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{
                      uri: element,
                      priority: FastImage.priority.high,
                    }}
                  />
                )


              })

            }

          </View>
        </View>

      </TouchableOpacity>
    )
  }
  _renderPlayerData = (item, index) => {
    console.log('Playeritem--->', item)
    return (
      <TouchableOpacity
        style={{

          width: wide * 0.89,
          height: wide * 0.25,
          marginVertical: 8,
          // justifyContent: "center",
        }}
        activeOpacity={1}
        onPress={() => {
          if (UserModel.selectedUserType.toUpperCase() === 'COACH') {
            Navigation.navigate('PlayerProfile', { playerId: item.item.entityId })
          }
        }}

      >
        {/* <Image style={{
                    position: 'absolute', width: '100%', height: '100%', left: 0,
                }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} /> */}

        <View style={{
          flexDirection: 'row', alignItems: 'center', marginVertical: 10,
          justifyContent: 'space-between',
        }}>

          <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: wide * 0.03 }}>
            <View style={{ alignItems: 'center', }}>
              <View style={{
                width: wide * 0.18, height: wide * 0.18,
                borderRadius: wide * 0.18 / 2, borderWidth: 2,
                borderColor: Colors.newGrayFontColor,
                alignItems: 'center', justifyContent: 'center'
              }}>
                {item.item.logoUrl === null || item.item.logoUrl === '500 Error' ?
                  null

                  // <View
                  //     style={{
                  //         width: '95%', height: '95%',
                  //         borderRadius: wide * 0.15 / 2,
                  //     }}
                  // // resizeMode={'contain'} source={require('../../Images/placeHolderProf.png')}
                  // />
                  :
                  <FastImage style={{
                    width: '95%', height: '95%',
                    borderRadius: wide * 0.18 / 2,
                  }}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: item.item.logoUrl,
                      priority: FastImage.priority.high,
                    }} />
                }


              </View>
              <View style={{ marginTop: wide * 0.015 }}>
                <Text style={{
                  color: Colors.light, fontSize: 10,
                  lineHeight: 12,
                  fontFamily: Fonts.Bold,
                }}>
                  {/* #{item.item.ranking} |  */}
                  {item.item.position}
                </Text>

              </View>

            </View>

            <View style={{ marginLeft: wide * 0.05, marginTop: -10 }}>
              {item.item.title !== null ?
                <Text style={{
                  color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                  lineHeight: 20,

                }}>{item.item.title}</Text>
                : null
              }
              {item.item.subTitle !== null ?
                <Text style={{
                  color: Colors.fontColorGray, fontSize: 16, fontFamily: Fonts.BoldItalic,
                  marginVertical: 6, lineHeight: 18,
                }}>
                  {item.item.subTitle[0]}
                </Text>
                : null
              }

            </View>
          </View>

          <View style={{
            width: wide * 0.12, height: wide * 0.12,
            marginRight: wide * 0.04,
            // borderRadius: wide * 0.15 / 2, 
            // borderWidth: 3,
            // borderColor: Colors.borderColor,
            justifyContent: 'center', alignItems: 'center',
          }}>
            {item.item.teamLogoUrl === null || item.item.teamLogoUrl === '500 Error' ?
              null
              // <Image
              //     style={{
              //         width: '95%', height: '95%',
              //         borderRadius: wide * 0.15 / 2,
              //     }}
              //     resizeMode={'contain'} source={require('../../Images/placeHolderProf.png')}
              // />
              :
              <FastImage style={{
                width: '95%', height: '95%',
                borderRadius: wide * 0.12 / 2,
              }}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: item.item.teamLogoUrl[0],
                  priority: FastImage.priority.high,
                }} />
            }

          </View>
        </View>

      </TouchableOpacity>
    )
  }

  _renderTeamData = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          width: wide * 0.86,
          height: wide * 0.25,
          marginVertical: 10,
          justifyContent: "center",
        }}
        activeOpacity={1}
      >
        {/* <Image style={{
                    position: 'absolute', width: '100%', height: '100%', left: 0,
                }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} /> */}

        <View style={{ flexDirection: 'row', marginVertical: 10, }}>

          <View
            style={{
              justifyContent: 'center', alignItems: 'center',
              flexDirection: 'row', marginHorizontal: wide * 0.03
            }}
          >
            <View style={{
              width: wide * 0.15, height: wide * 0.15,
              borderRadius: wide * 0.15 / 2, borderWidth: 3,
              borderColor: Colors.borderColor,
              justifyContent: 'center', alignItems: 'center',
            }}>
              {item.item.logoUrl === null ? null
                // <Image
                //     style={{
                //         width: '95%', height: '95%',
                //         borderRadius: wide * 0.15 / 2,
                //     }}
                //     resizeMode={'contain'} source={require('../../Images/placeHolderProf.png')}
                // />
                :
                <FastImage style={{
                  width: '95%', height: '95%',
                  borderRadius: wide * 0.15 / 2,
                }}
                  resizeMode={FastImage.resizeMode.contain}
                  source={{
                    uri: item.item.logoUrl,
                    priority: FastImage.priority.high,
                  }} />
              }

            </View>
            <View style={{ marginLeft: wide * 0.05, }}>
              <Text style={{
                color: Colors.light, fontSize: 20, fontFamily: Fonts.Bold,
                lineHeight: 24,

              }}>{item.item.title}</Text>

            </View>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
  _renderGameData = (item, index) => {
    console.log('Game--->', item)
    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.overlay2,
          borderRadius: 10, marginTop: wide * 0.04,
          height: wide * 0.45, borderRadius: wide * 0.03
        }}
        activeOpacity={1}
        onPress={() => {
          // if (item.item.gameId !== null) {
          Navigation.navigate('GamesRecentTab', { 'gameId': item.item.gameId })
          // }
        }}

      >
        <FastImage style={{ width: '100%', height: '100%', position: 'absolute', borderRadius: wide * 0.03 }}
          resizeMode={FastImage.resizeMode.cover}
          // source={require('../../Images/dummy1.png')}
          source={{
            uri: item.item?.liveVideoUrl?.thumbnailUrl,
            priority: FastImage.priority.high,
          }}
        />
        <View style={{ height: '95%', justifyContent: 'space-around', }}>
          <Text style={{
            color: Colors.light,
            fontSize: 14, lineHeight: 16,
            fontFamily: Fonts.SemiBold, textAlign: 'center',
            alignSelf: 'flex-end', padding: wide * 0.05,
          }}>24 min</Text>
          <View style={{ flex: 1 }} />
          <View style={{
            width: '95%', marginHorizontal: wide * 0.03,
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Image style={{ width: 16, height: 16, position: 'absolute', }}
              resizeMode={'contain'} source={require('../../Images/play_ico_tint.png')} />
            <Text numberOfLines={2} style={{
              color: Colors.light,
              fontSize: 14, lineHeight: 16,
              fontFamily: Fonts.SemiBold, marginLeft: wide * 0.04
            }}> WATCH LIVE</Text>
            <Text numberOfLines={2} style={{
              color: Colors.light,
              fontSize: 35,
              fontFamily: Fonts.SemiBold, alignSelf: 'flex-end',

            }}>
              {item.item?.finalScore}
            </Text>
          </View>

        </View>


      </TouchableOpacity>





      // <TouchableOpacity
      //     style={{
      //         width: wide * 0.86,
      //         height: wide * 0.25,
      //         marginVertical: 10,
      //         justifyContent: "center",
      //     }}
      // >
      //     <Image style={{
      //         position: 'absolute', width: '100%', height: '100%', left: 0,
      //     }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

      //     <View style={{ flexDirection: 'row', marginVertical: 10, }}>

      //         <View
      //             style={{
      //                 justifyContent: 'center', alignItems: 'center',
      //                 flexDirection: 'row', marginHorizontal: wide * 0.06
      //             }}
      //         >
      //             <View style={{
      //                 width: wide * 0.15, height: wide * 0.15,
      //                 borderRadius: wide * 0.15 / 2, borderWidth: 3,
      //                 borderColor: Colors.borderColor,
      //                 justifyContent: 'center', alignItems: 'center',
      //             }}>
      //                 {item.profilePictureUrl === null || item.profilePictureUrl === '500 Error' ?
      //                     <Image
      //                         style={{
      //                             width: '95%', height: '95%',
      //                             borderRadius: wide * 0.15 / 2,
      //                         }}
      //                         resizeMode={'contain'} source={require('../../Images/placeHolderProf.png')}
      //                     />
      //                     :
      //                     <FastImage style={{
      //                         width: '95%', height: '95%',
      //                         borderRadius: wide * 0.15 / 2,
      //                     }}
      //                         resizeMode={'contain'}
      //                         source={{ uri: item.profilePictureUrl }} />
      //                 }

      //             </View>
      //             <View style={{ paddingLeft: 15, }}>
      //                 <Text style={{
      //                     color: Colors.light, fontSize: 20, fontFamily: Fonts.Bold,
      //                     lineHeight: 24,

      //                 }}>La lekers</Text>

      //             </View>
      //         </View>
      //     </View>

      // </TouchableOpacity>
    )
  }

  render() {
    const { selectedCat_nm, searchData, playersArr, coachArr, teamArr, gameArr } = this.state;
    console.log('--<<', searchData)
    // let players = null;
    // let coaches = null;
    // let teams = null;
    // let games = null;
    // debugger;
    // for (let i = 0; i < chatUsersList.length; i++) {   // need to change with chatUsersList
    //     const element = chatUsersList[i];
    //     if (element.userType === "PLAYER") {
    //         players = element.messagesList;
    //     } else if (element.userType === "COACH") {
    //         coaches = element.messagesList;
    //     } else if (element.userType === "TRAINER") {
    //         let teams = null;
    //         teams = element.messagesList;
    //     } else if (element.userType === "OTHER") {
    //         games = element.messagesList;
    //     }
    // }
    return (
      <>
        {this.state.loading === true ?
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
            <AppLoader visible={this.state.loading} />
          </SafeAreaView>
          :
          <KeyBoardDismissHandler>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <View style={{
                  backgroundColor: Colors.base,
                  flexDirection: 'row',
                  width: '90%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: wide * 0.02,
                  marginBottom: wide * 0.03,
                }}>

                  <TouchableOpacity
                    style={{ marginLeft: wide * 0.01 }}
                    onPress={() => Navigation.back()}>
                    <Image style={{
                      width: wide * 0.08, height: wide * 0.08,
                      borderRadius: wide * 0.02,
                      borderWidth: 1, borderColor: Colors.borderColor
                    }} source={require('../../Images/back_ico.png')} />
                  </TouchableOpacity>
                  <View style={{ width: '80%', marginRight: wide * 0.02 }}>
                    <TextInput style={{
                      borderWidth: 3, borderColor: Colors.borderColor,
                      fontFamily: Fonts.Bold, height: 50,
                      paddingLeft: 10, paddingRight: wide * 0.1,
                      borderRadius: 5, color: Colors.light, fontSize: 16
                    }}
                      value={this.state.srchTxt}
                      autoCorrect={false}
                      autoCapitalize='none'
                      placeholder={"SEARCH"}
                      returnKeyType='search'
                      placeholderTextColor={Colors.borderColor}
                      onChangeText={(e) => {
                        this.setState({ srchTxt: e },
                          () => {
                            if (e.length >= 3) {
                              this.searchDataForTxt()

                            }
                          });
                      }}
                      onSubmitEditing={() => {
                        this.searchDataForTxt()
                      }
                      }


                    />
                    {this.state.srchTxt.length == '' ?
                      <TouchableOpacity style={{
                        position: 'absolute',
                        width: 20, height: 20, right: wide * 0.04, top: wide * 0.04,
                        justifyContent: 'center', alignItems: 'center'
                      }}
                        activeOpacity={1}
                      >
                        <Image
                          style={{
                            // position: 'absolute',
                            width: 20, height: 20, //right: wide * 0.05, //top: wide * 0.05
                          }}
                          source={require('../../Images/search_ico.png')}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={{
                        position: 'absolute',
                        width: 20, height: 20, right: wide * 0.04, top: wide * 0.04,
                        justifyContent: 'center', alignItems: 'center'
                      }}
                        activeOpacity={1}
                        onPress={() => this.setState({
                          srchTxt: ''
                        })}
                      >
                        <Text style={{
                          fontSize: 16,
                          lineHeight: 24, fontFamily: Fonts.Bold,
                          color: Colors.light
                        }}>X</Text>
                      </TouchableOpacity>
                    }

                  </View>
                </View>
              </View>

              <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                <View style={{
                  // backgroundColor: 'green',
                  alignItems: 'center',
                }} >

                  <View style={{
                    width: '95%',
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-around',
                    // backgroundColor: 'blue',
                    height: wide * 0.1
                  }}>
                    <TouchableOpacity style={{
                      // width: '20%',
                      borderBottomColor: this.state.selectedCat_nm == 'Players' ? Colors.light : null,
                      borderBottomWidth: this.state.selectedCat_nm == 'Players' ? 1 : 0,
                    }}
                      onPress={() => this.setState({ selectedCat_nm: 'Players' })}
                      activeOpacity={1}
                    >
                      <Text numberOfLines={2} style={{
                        color: this.state.selectedCat_nm === 'Players' ? Colors.light : Colors.fontColorGray,
                        fontSize: 16, lineHeight: 24,
                        fontFamily: Fonts.Bold, textAlign: 'center'
                      }}>
                        Players
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // width: '20%',
                      borderBottomColor: this.state.selectedCat_nm == 'Coaches' ? Colors.light : null,
                      borderBottomWidth: this.state.selectedCat_nm == 'Coaches' ? 1 : 0
                    }}
                      onPress={() => this.setState({ selectedCat_nm: 'Coaches' })}
                      activeOpacity={1}
                    >
                      <Text numberOfLines={2} style={{
                        color: this.state.selectedCat_nm == 'Coaches' ? Colors.light : Colors.fontColorGray,
                        fontSize: 16, lineHeight: 24,
                        fontFamily: Fonts.Bold, textAlign: 'center'
                      }}>
                        Coaches
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // width: '20%',
                      borderBottomColor: this.state.selectedCat_nm == 'Teams' ? Colors.light : null,
                      borderBottomWidth: this.state.selectedCat_nm == 'Teams' ? 1 : 0
                    }}
                      onPress={() => this.setState({ selectedCat_nm: 'Teams' })}
                      activeOpacity={1}
                    >
                      <Text numberOfLines={2} style={{
                        color: this.state.selectedCat_nm === 'Teams' ? Colors.light : Colors.fontColorGray,
                        fontSize: 16, lineHeight: 24,
                        fontFamily: Fonts.Bold, textAlign: 'center'
                      }}>
                        Teams
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // width: '20%',
                      borderBottomColor: this.state.selectedCat_nm == 'Games' ? Colors.light : null,
                      borderBottomWidth: this.state.selectedCat_nm == 'Games' ? 1 : 0
                    }}
                      onPress={() => this.setState({ selectedCat_nm: 'Games' })}
                      activeOpacity={1}
                    >
                      <Text numberOfLines={2} style={{
                        color: this.state.selectedCat_nm === 'Games' ? Colors.light : Colors.fontColorGray,
                        fontSize: 16, lineHeight: 24,
                        fontFamily: Fonts.Bold, textAlign: 'center'
                      }}>
                        Games
                      </Text>
                    </TouchableOpacity>
                    {/* <FlatList
                                        style={{ overflow: 'visible' }}
                                        data={this.state.category}
                                        contentContainerStyle={{ justifyContent: 'space-evenly' }}
                                        renderItem={(item, index) => this._renderTab(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                    /> */}
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    {selectedCat_nm === 'Players' ?
                      <View style={{ width: '90%', height: Platform.OS == 'ios' ? '100%' : '96%', }}>
                        {playersArr !== null && playersArr.length > 0 ?
                          <FlatList
                            style={{ marginBottom: wide * 0.03, }}
                            contentContainerStyle={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              // flexGrow: 1

                            }}
                            // data={[1, 2, 3, 4, 5]}
                            data={playersArr}
                            renderItem={(item, index) => this._renderPlayerData(item, index)}
                            showsVerticalScrollIndicator={false}
                          />
                          :
                          <View style={{ width: '100%', height: '75%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                              style={{
                                color: Colors.fontColorGray,
                                fontSize: 20, lineHeight: 20,
                                fontFamily: Fonts.SemiBold, textAlign: 'center'
                              }}>No match found</Text>
                          </View>

                        }
                      </View>
                      : selectedCat_nm === 'Coaches' ?
                        <View style={{ width: '90%', height: '100%', }}>
                          {coachArr !== null && coachArr.length > 0 ?
                            <FlatList
                              // style={{ backgroundColor: 'green', }}
                              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                              data={coachArr}
                              renderItem={(item, index) => this._renderCoachData(item, index)}
                              showsVerticalScrollIndicator={false}
                            />
                            :
                            <View style={{ width: '100%', height: '75%', justifyContent: 'center', alignItems: 'center' }}>
                              <Text
                                style={{
                                  color: Colors.fontColorGray,
                                  fontSize: 20, lineHeight: 20,
                                  fontFamily: Fonts.SemiBold, textAlign: 'center'
                                }}>No match found</Text>
                            </View>
                          }
                        </View>
                        : selectedCat_nm === 'Teams' ?
                          <View style={{ width: '90%', height: '100%', }}>
                            {teamArr !== null && teamArr.length > 0 ?
                              <FlatList
                                // style={{ marginHorizontal: 15 }}
                                // contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                data={teamArr}
                                renderItem={(item, index) => this._renderTeamData(item, index)}
                                showsVerticalScrollIndicator={false}
                              />
                              :
                              <View style={{ width: '100%', height: '75%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text
                                  style={{
                                    color: Colors.fontColorGray,
                                    fontSize: 20, lineHeight: 20,
                                    fontFamily: Fonts.SemiBold, textAlign: 'center'
                                  }}>No match found</Text>
                              </View>
                            }
                          </View>
                          : selectedCat_nm === 'Games' ?
                            <View style={{ width: '90%', height: '100%', }}>
                              {gameArr !== null && gameArr.length > 0 ?
                                <FlatList
                                  // style={{ marginHorizontal: 15 }}
                                  // contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                  data={gameArr}
                                  renderItem={(item, index) => this._renderGameData(item, index)}
                                  showsVerticalScrollIndicator={false}
                                />
                                :
                                <View style={{ width: '100%', height: '75%', justifyContent: 'center', alignItems: 'center' }}>
                                  <Text
                                    style={{
                                      color: Colors.fontColorGray,
                                      fontSize: 20, lineHeight: 20,
                                      fontFamily: Fonts.SemiBold, textAlign: 'center'
                                    }}>No match found</Text>
                                </View>
                              }
                            </View>
                            : <Text
                              style={{
                                color: Colors.fontColorGray,
                                fontSize: 20, lineHeight: 20,
                                fontFamily: Fonts.SemiBold, textAlign: 'center'
                              }}>No match found</Text>

                    }

                  </View>
                  {/* <View  >
                                    <FlatList
                                        style={{ marginHorizontal: 15 }}
                                        // data={selectedCat_nm === 'Player' ? messageList.Palyer
                                        //     : selectedCat_nm === 'Coach' ? messageList.Coach
                                        //         : selectedCat_nm === 'Trainer' ? messageList.Trainer : messageList.Others
                                        // }
                                        data={selectedCat_nm === 'Player' ? player
                                            : selectedCat_nm === 'Coach' ? coach
                                                : selectedCat_nm === 'Trainer' ? trainer : others
                                        }
                                        renderItem={(item, index) => this._renderList(item.item, index)}
                                        showsHorizontalScrollIndicator={false}

                                    />
                                </View> */}

                </View>

              </KeyboardAvoidingView>


            </SafeAreaView >
          </KeyBoardDismissHandler>
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.home
  };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         callSearchApi: (val, cb) => {
//             dispatch(getSeacrhData(val, cb));
//         }
//     }
// }


export default connect(mapStateToProps)(ExploreSearch);
// export default ExploreSearch;
