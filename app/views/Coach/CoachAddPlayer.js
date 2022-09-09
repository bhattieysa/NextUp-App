
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, key,
  Alert, KeyboardAvoidingView, FlatList, TextInput, StyleSheet, Keyboard, Platform
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';

import { addPlayerToTeam, getPlayerss, getInitialPlayerss } from '../../actions/home';
import { getObject, setObject, remove } from '../../middleware';
import FastImage from 'react-native-fast-image';
import { showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';

let wide = Layout.width;
var pageNum = 1

class CoachAddPlayer extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      arrPlayers: null,
      selectedIndex: 0,
      starCount: 3.5,
      lastLat: 0,
      lastLong: 0,
      srchTxt: '',
      showInviteButton: false,
      selectedPlyerIds: [],
      selectedPlayerList: [],
    };
  }
  componentDidMount() {
    pageNum = 1
    this.onScreenFocus();

  }

  onScreenFocus = async () => {
    const res = await Permission.checkPermission(PERMISSION_TYPE.location);
    const res1 = await Permission.checkPermission(PERMISSION_TYPE.locationWhenInUse);
    if (res) {
      debugger
      getObject('userLoc').then((res) => {
        if (res) {
          this.setState({ cityName: res.name, lastLat: res.lat, lastLong: res.lng }, () => {
            this.getPlayers('')
          })

        } else {
          this.getUserCurrentLocation()
        }
      })
    } else {
      if (res1) {
        getObject('userLoc').then((res) => {
          if (res) {
            this.setState({ cityName: res.name, lastLat: res.lat, lastLong: res.lng }, () => {
              this.getPlayers('')
            })

          } else {
            this.getUserCurrentLocation()
          }
        })

      } else {
        debugger
        remove('userLoc');
        if (Platform.OS == 'ios') {
          showAppPermissionAlert("Alert", "You have not granted location permission.")
        }
      }

    }
  }

  getUserCurrentLocation = () => {
    try {
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      this.watchID = Geolocation.getCurrentPosition((position) => {
        this.setState({
          lastLat: position.coords.latitude, lastLong: position.coords.longitude
        }, () => {
          this.getPlayers('')
        })
        setObject('userLoc', {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })

      }, (error) => {
        console.log(error)
        debugger
      }, {

      });
    }
    catch (err) {
      debugger
      // console.warn(err)
    }
  }
  // edited by keshav (initialplayer)
  getPlayers = (strSearch) => {
    const {
      lastLat
      , lastLong } = this.state;
    debugger;
    // if (!this.state.isDataAllFetched) {

    getObject('UserId').then((obj) => {
      // this.setState({ loading: true }, () => {
      if (strSearch === '' || strSearch === null || strSearch === undefined) {
        this.setState({ loading: true }, () => {
          this.props.dispatch(getInitialPlayerss(obj, pageNum, {
            "name": "Loc",
            "loc": {
              "type": "Point",
              "coordinates": [
                lastLong,
                lastLat
              ]
            }
          }, (res, resData) => {
            //console.log(resData);
            if (res) {
              //   this.setState({ isDataAllFetched: true })
              // }
              if (resData.length > 0) {
                this.setState({ loading: false, arrPlayers: resData, showInviteButton: false })
              } else {
                this.setState({ loading: false, showInviteButton: true })
              }
            }
          }))
        })

      } else {
        this.props.dispatch(getPlayerss(obj, strSearch, {
          "name": "Loc",
          "loc": {
            "type": "Point",
            "coordinates": [
              lastLong,
              lastLat
            ]
          }
        }, (res, resData) => {
          //console.log(resData);
          if (res) {
            //   this.setState({ isDataAllFetched: true })
            // }
            if (resData.length > 0) {
              this.setState({ loading: false, arrPlayers: resData, showInviteButton: false })

            } else {
              this.setState({ loading: false, arrPlayers: resData, showInviteButton: true })

            }
          }
        }))
      }
      // })

    })
    // })
    //}
  }

  addPlayerToPosition = () => {
    // console.log(item);
    const { selectedPlyerIds, selectedPlayerList } = this.state;
    var playetToAddList = []
    selectedPlayerList.forEach((obj, index) => {
      var objec = {
        "playerId": obj.playerId,
        "playerName": obj.firstName + ' ' + obj.lastName,
        "playingPosition": this.props.navigation.state.params.playerDetails.name,
        "index": this.props.navigation.state.params.playerDetails.teamPlayersInfoList.length,
        "acceptedAt": Date.now()
      }
      playetToAddList.push(objec);
    })
    // console.log(this.props.navigation.state.params.playerDetails);
    console.log("PlayerTobve adddddd", playetToAddList);
    // var objec = {
    //   "playerId": item.playerId,
    //   "playerName": item.firstName + ' ' + item.lastName,
    //   "playingPosition": this.props.navigation.state.params.playerDetails.name,
    //   "index": this.props.navigation.state.params.playerDetails.teamPlayersInfoList.length,
    //   "acceptedAt": Date.now()
    // }
    var outerIndex = this.props.navigation.state.params.playerDetails?.teamPlayersInfoList[0]?.index;
    var teamId = this.props.navigation.state.params.teamDetails?.teamId;
    var season = this.props.navigation.state.params.teamDetails?.seasonType;
    console.log("Seasonn", season);
    console.log("teamId", teamId);
    console.log("oyuterIndx", outerIndex);

    this.setState({ loading: true }, () => {
      this.props.dispatch(addPlayerToTeam(teamId, playetToAddList, outerIndex, "2020-21", (res, resData) => {
        if (res) {
          this.setState({ loading: false }, () => {
            setTimeout(() => {
              Navigation.back();
            }, 200);

          })

        } else {
          Alert.alert(
            'Alert',
            'Something went wrong. Please try again!',
            [
              {
                text: 'OK', onPress: () => this.setState({ loading: false }, () => {
                  Navigation.back();

                })
              },
            ],
            { cancelable: false },
          );
        }

      }))
    })

  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  _renderPlan = (item, index) => {
    return (
      <TouchableOpacity style={{
        height: wide * 0.15,
        justifyContent: 'center',
        alignItems: 'center', paddingRight: 5
      }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedIndex: item.index })}
      >


        <Text numberOfLines={2} style={{
          color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray, fontSize: 18, lineHeight: 22,
          fontFamily: Fonts.SemiBold, width: wide * 0.15, textAlign: 'center'
        }}>SF</Text>
        <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View>



      </TouchableOpacity>
    );
  };

  handlePlayerSelection = (item) => {
    const { selectedPlyerIds, selectedPlayerList } = this.state;
    if (selectedPlyerIds.length > 0) {
      if (selectedPlyerIds.includes(item.playerId)) {
        var id_arr = selectedPlyerIds.filter((obj, index) => {
          return obj != item.playerId
        })

        var playerList_arr = selectedPlayerList.filter((play_obj, index) => {
          return play_obj.playerId != item.playerId
        })

        this.setState({ selectedPlyerIds: id_arr, selectedPlayerList: playerList_arr })
      } else {
        var id_arr = selectedPlyerIds;
        id_arr.push(item.playerId)

        var playerList_arr = selectedPlayerList
        playerList_arr.push(item)

        this.setState({ selectedPlyerIds: id_arr, selectedPlayerList: playerList_arr })
      }
    } else {
      var id_arr = []
      var playerList_arr = []
      id_arr.push(item?.playerId)
      playerList_arr.push(item)
      this.setState({ selectedPlyerIds: id_arr, selectedPlayerList: playerList_arr })

    }
  }

  _renderTrainer = ({ item }) => {
    return (
      <TouchableOpacity style={{
        marginTop: wide * 0.03,
        backgroundColor: Colors.lightDark,
        borderRadius: wide * 0.025,
        height: wide * 0.24,
        alignItems: 'center',
        justifyContent: 'center',
      }}
        activeOpacity={1}
      // onPress={() =>
      //   this.addPlayerToPosition(item)
      // }
      >
        <View style={{
          marginTop: wide * 0.02,
          // marginHorizontal: 8,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '90%',
          // backgroundColor: "green"
        }}>
          <View style={{ flexDirection: 'row', }}>
            <View style={{
              width: wide * 0.14, height: wide * 0.14,
              borderRadius: wide * 0.14 / 2,
              borderWidth: item.profilePictureUrl == null ? 1.5 : 0,
              borderColor: item.profilePictureUrl == null ? Colors.newGrayFontColor : null,


            }}>
              {item.profilePictureUrl !== null ?
                <FastImage style={{
                  width: '98%', height: '98%',
                  borderRadius: wide * 0.14 / 2,
                }}
                  resizeMode={'cover'}
                  source={{ uri: item.profilePictureUrl }}
                />
                :
                <></>
              }
            </View>

            <View style={{
              marginHorizontal: wide * 0.05,
            }}>
              <View >
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // width: '100%'
                }}>

                  <View>
                    <Text style={{

                      color: Colors.light, fontSize: 20,
                      fontFamily: Fonts.Regular,
                    }}>
                      {item.firstName} {item.lastName}

                    </Text>

                  </View>


                </View>
                {/* kpiValues key changes to pgs */}
                {item.pgs !== null ?
                  <View style={{
                    flexDirection: 'row',
                    // width: '6-%',
                    marginTop: wide * 0.03,
                    // justifyContent: 'space-between',
                  }}>
                    <View >
                      <Text style={styles.textPointHeading}>{Object.keys(item.pgs)[0]?.toUpperCase()}</Text>
                      <Text style={styles.textPoint}>
                        {Object.values(item.pgs)[0]}
                      </Text>
                    </View>
                    <View >
                      <Text style={styles.textPointHeading}>{Object.keys(item.pgs)[1]?.toUpperCase()}</Text>
                      <Text style={styles.textPoint}>
                        {Object.values(item.pgs)[1]}
                      </Text>
                    </View>
                    <View >
                      <Text style={styles.textPointHeading}>{Object.keys(item.pgs)[2]?.toUpperCase()}</Text>
                      <Text style={styles.textPoint}>
                        {Object.values(item.pgs)[2]}
                      </Text>
                    </View>
                  </View>
                  :
                  <View style={{
                    flexDirection: 'row',
                    // width: '100%', 
                    marginTop: wide * 0.02,
                    // justifyContent: 'space-between'
                  }}>
                    <View>
                      <Text style={styles.textPointHeading}>PPG</Text>
                      <Text style={{
                        color: Colors.light, fontSize: 18,
                        lineHeight: 22,
                        fontFamily: Fonts.Bold,
                        // marginTop: 4,
                        marginHorizontal: 8,
                      }}>
                        -
                      </Text>
                    </View>
                    <View style={{ marginLeft: wide * 0.1 }}>
                      <Text style={styles.textPointHeading}>RPG</Text>
                      <Text style={{
                        color: Colors.light, fontSize: 18,
                        lineHeight: 22,
                        fontFamily: Fonts.Bold,
                        // marginTop: 4,
                        marginHorizontal: 8,
                      }}>
                        -
                      </Text>
                    </View>
                    <View style={{ marginLeft: wide * 0.1 }}>
                      <Text style={styles.textPointHeading}>APG</Text>
                      <Text style={{
                        color: Colors.light, fontSize: 18,
                        lineHeight: 22,
                        fontFamily: Fonts.Bold,
                        // marginTop: 4,
                        marginHorizontal: 8,
                      }}>
                        -
                      </Text>
                    </View>
                  </View>
                }


              </View>
            </View>
          </View>
          <TouchableOpacity style={{
            width: wide * 0.06, height: wide * 0.06,
            borderRadius: wide * 0.015,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.state.selectedPlyerIds.includes(item.playerId) ? Colors.btnBg : null,
            borderWidth: this.state.selectedPlyerIds.includes(item.playerId) ? 0 : 1.5,
            borderColor: this.state.selectedPlyerIds.includes(item.playerId) ? null : Colors.newGrayFontColor,

          }}
            onPress={() => this.handlePlayerSelection(item)}
          // activeOpacity={1}
          >
            {this.state.selectedPlyerIds.includes(item.playerId) ?
              <Image
                style={{ width: 12, height: 12 }}
                source={require('../../Images/check_Icon.png')}
                resizeMode={'contain'}
              />
              : <></>
            }
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  handleSendInvitation = () => {
    const { selectedPlyerIds } = this.state;
    if (selectedPlyerIds.length > 0) {
      this.addPlayerToPosition();

    } else {
      Navigation.navigate('InvitePlayerToTeam', {
        playerDetails: this.props.navigation.state.params.playerDetails,
        teamDetails: this.props.navigation.state.params.teamDetails,
        selectedSeason: this.props.navigation.state.params.selectedSeason
      })

    }
  }


  render() {
    const { arrPlayers } = this.state
    console.log("Dattaaaa", this.props.navigation.state.params);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          <View style={{
            width: '90%',
            alignSelf: 'center',

          }}>
            <TouchableOpacity style={{ width: wide * 0.08, }}
              onPress={() => Navigation.back()}>
              <Image style={{
                width: wide * 0.08, height: wide * 0.08,
                marginTop: wide * 0.01,
                borderRadius: wide * 0.02,
                borderWidth: 1, borderColor: Colors.borderColor
              }} source={require('../../Images/back_ico.png')} />
            </TouchableOpacity>
            {/* <Text numberOfLines={1} style={{
              color: Colors.light, fontSize: 18,
              lineHeight: 28,
              fontFamily: Fonts.Bold, textAlign: 'left', position: 'absolute', alignSelf: 'center', marginTop: wide * 0.08,
            }}>{this.props.navigation.state.params.playerDetails.playingPosition}</Text> */}
          </View>
          <KeyboardAvoidingView keyboardVerticalOffset={25}
            style={{ flex: 1, }}
            behavior={Platform.OS === 'ios' ? "padding" : null}>

            <View style={{
              flex: 1, backgroundColor: Colors.base,
              width: '88%', alignSelf: 'center'
            }} >

              <View style={{
                marginTop: wide * 0.05,
                flexDirection: 'row'
              }}>
                <TextInput style={{
                  borderWidth: 1.5,
                  borderColor: Colors.borderColor,
                  fontFamily: Fonts.Bold, height: 50,
                  paddingHorizontal: 10,
                  borderRadius: 5, color: Colors.light,
                  fontSize: 12,
                  lineHeight: 16, fontWeight: '600',
                  width: '100%'
                }}
                  value={this.state.srchTxt}
                  autoCorrect={false}
                  autoCapitalize='none'
                  placeholder={"Search"}

                  placeholderTextColor={Colors.newGrayFontColor}

                  onChangeText={(e) => {
                    this.setState({ srchTxt: e }, () => {
                      if (e.length == 0) {
                        Keyboard.dismiss();
                      }
                      this.getPlayers(e)
                    })
                  }}
                />
                {this.state.srchTxt == '' ?
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
                    justifyContent: 'center', alignItems: 'center',
                    // backgroundColor: 'green'
                  }}
                    activeOpacity={1}
                    onPress={() => {
                      this.setState({
                        srchTxt: ''
                      }, () => {
                        Keyboard.dismiss();
                        this.getPlayers('')
                      })
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      lineHeight: 24, fontFamily: Fonts.Bold,
                      color: Colors.light
                    }}>X</Text>
                  </TouchableOpacity>
                }
              </View>

              {arrPlayers != null && arrPlayers.length > 0 ?
                <View style={{ flex: 1, }}>
                  <FlatList
                    data={arrPlayers}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={20}
                    // onEndReachedThreshold={0.1}
                    // onEndReached={() => {
                    //     pageNum = pageNum + 1
                    //     this.getPlayers()
                    // }}


                    style={{
                      marginTop: wide * 0.02,
                      marginBottom: wide * 0.02,
                    }}
                    bounces={false}
                    renderItem={(item, index) => this._renderTrainer(item, index)}
                  />
                </View>
                :

                <View style={{
                  width: '90%', alignSelf: 'center',
                  justifyContent: 'center', alignItems: 'center',
                  height: wide * 0.2,
                }}>
                  {arrPlayers != null ?
                    <Text style={{
                      alignSelf: 'center', color: Colors.noDataLabelColor,
                      fontFamily: Fonts.Medium, fontSize: 13, lineHeight: 16,
                      fontWeight: '500',
                    }}>No data found</Text>
                    : <></>
                  }

                </View>
              }
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: wide * 0.8,
                  height: 48,
                  backgroundColor: Colors.btnBg,
                  alignSelf: 'center', borderRadius: 24,
                  justifyContent: 'center',
                  // marginTop: wide * 0.01,
                  position: 'absolute',
                  bottom: arrPlayers != null && arrPlayers.length > 0 ? wide * 0.06 : wide * 1.3,

                }} onPress={() => this.handleSendInvitation()}
              >
                <Text style={{
                  alignSelf: 'center', color: Colors.light,
                  fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                  fontWeight: '700',
                }}>Invite</Text>
              </TouchableOpacity>
            </View>

            {/* <AppLoader visible={this.state.loading} /> */}
          </KeyboardAvoidingView>


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

export default connect(mapStateToProps)(CoachAddPlayer);

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
    color: Colors.light,
    fontSize: 14, lineHeight: 18,
    fontFamily: Fonts.Medium,
    marginTop: 6,
  },
  textPointHeading: {
    color: Colors.light, opacity: 0.6,
    fontSize: 12, lineHeight: 16, fontWeight: '400',
    fontFamily: Fonts.Regular,
  },
  textPointCenter: {
    color: Colors.light, fontSize: 18,
    fontFamily: Fonts.Bold,
    marginTop: 6, textAlign: 'center'
  },
});