import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text,
    SafeAreaView, Image,
    ScrollView, TextInput,
    KeyboardAvoidingView, FlatList, Button, Linking, Platform, StatusBar
} from 'react-native';
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
import { AirbnbRating } from 'react-native-ratings';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { leaderBoardFeed, gamesFeed } from '../../actions/home';
import { getObject, setObject, remove } from '../../middleware';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import CommonVideoComponent from '../Messages/videoView/commonVideoComponent';
import FastImage from 'react-native-fast-image';
import { Title } from '../../components/common/titleLabel';
import { UserModel } from '../../constants/constant';
import { showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';
import Orientation from 'react-native-orientation-locker';
import VideoPlay from '../../components/common/VideoPlay';

let wide = Layout.width;

class Explore extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,
            isGamesOpen: true,
            arrayPlayers: [],
            arrayTeams: [],
            lastLong: 0,
            lastLat: 0,
            cityName: '',
            isPlayVideo: false,
            videoUrlToPlay: '',
            videoThumbnail: '',
        };
    }
    componentDidMount() {

        // getObject('userLoc').then((res) => {

        //     if (res) {
        //         this.setState({ cityName: res.name, lastLat: res.lat, lastLong: res.lng }, () => {
        //             if (this.state.isGamesOpen) {
        //                 this.callGamesApi()
        //             } else { this.callLeaderBoardApi() }

        //         })

        //     } else {
        //         this.getUserCurrentLocation()
        //     }
        // })

        this.props.navigation.addListener('didFocus', this.onScreenFocus)


    }
    getUserCurrentLocation = () => {
        try {
            // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            debugger
            this.watchID = Geolocation.getCurrentPosition((position) => {
                debugger
                this.setState({
                    lastLat: position.coords.latitude,
                    lastLong: position.coords.longitude
                }, () => {
                    debugger
                    this.fetchAddressForLocation(position.coords.latitude, position.coords.longitude)
                    // if (this.state.isGamesOpen) {
                    // this.callGamesApi()
                    // this.callLeaderBoardApi()
                    // } else {

                    // }
                })
                // setObject('userLoc', {
                //     name: this.state.cityName,
                //     lat: position.coords.latitude,
                //     lng: position.coords.longitude
                // })
                // this.callLeaderBoardApi()

            }, (error) => {
                debugger
                console.log(error)
                this.callLeaderBoardApi()

            }, {

            });
        }
        catch (err) {
            debugger
            console.warn(err)
        }
    }
    fetchAddressForLocation = (latitude, longitude) => {
        axios
            .get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAYnkQNoZabfHpyl1rY3iC2SdivPQUtZ0Q&latlng=${latitude},${longitude}&result_type=administrative_area_level_2`, {

            })
            .then(({ data }) => {
                debugger
                this.setState({ loading: false });
                let { results } = data;
                debugger
                if (results.length > 0) {
                    debugger
                    let { address_components } = results[0];
                    if (address_components.length > 0) {
                        debugger
                        this.setState({ cityName: address_components[0].long_name }, () => {
                            setObject('userLoc', {
                                name: address_components[0].long_name,
                                lat: this.state.lastLat,
                                lng: this.state.lastLong
                            })
                            this.callLeaderBoardApi();
                        });
                    }
                }
            });
    };


    onScreenFocus = async () => {
        debugger
        const res = await Permission.checkPermission(PERMISSION_TYPE.location);
        const res1 = await Permission.checkPermission(PERMISSION_TYPE.locationWhenInUse);
        if (res) {
            debugger
            getObject('userLoc').then((res) => {
                if (res) {
                    debugger
                    this.setState({ cityName: res.name, lastLat: res.lat, lastLong: res.lng }, () => {
                        // if (this.state.isGamesOpen) {
                        // this.callGamesApi()
                        // } else {
                        this.callLeaderBoardApi()
                        // }
                    })

                } else {
                    debugger
                    this.getUserCurrentLocation()
                }
            })
        } else {
            if (res1) {
                getObject('userLoc').then((res) => {
                    if (res) {
                        debugger
                        this.setState({ cityName: res.name, lastLat: res.lat, lastLong: res.lng }, () => {
                            // if (this.state.isGamesOpen) {
                            // this.callGamesApi()
                            // } else {
                            this.callLeaderBoardApi()
                            // }
                        })

                    } else {
                        debugger
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
    callGamesApi() {
        const { cityName
            , lastLat
            , lastLong } = this.state;
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(gamesFeed(obj, {
                    "name": cityName,
                    "loc": {
                        "type": "Point",
                        "coordinates": [
                            lastLong,
                            lastLat
                        ]
                    }
                }, (res) => {
                    this.setState({ loading: false })
                    // const { gameInfoTabData } = this.props.Home
                    // console.log(gameInfoTabData)
                }))
            })
        })
    }
    // callLeaderBoardApi() {
    //     debugger
    //     const { cityName
    //         , lastLat
    //         , lastLong } = this.state;
    //     getObject('UserId').then((obj) => {
    //         this.setState({ loading: true }, () => {
    //             this.props.dispatch(leaderBoardFeed(obj, {
    //                 "name": cityName,
    //                 "loc": {
    //                     "type": "Point",
    //                     "coordinates": [
    //                         lastLong,
    //                         lastLat
    //                     ]
    //                 }
    //             }, (res) => {
    //                 this.setState({ loading: false })
    //                 const { leaderBoardData } = this.props.Home

    //                 var arr = [...leaderBoardData.leaderBoardPlayerInfoList]
    //                 var arr2 = [...leaderBoardData.leaderBoardTeamInfoList]

    //                 if (arr?.length > 0) {
    //                     arr.shift()

    //                     this.setState({ arrayPlayers: arr }, () => {

    //                     })
    //                 }
    //                 if (arr2?.length > 0) {
    //                     arr2.shift()
    //                     this.setState({
    //                         arrayTeams: arr2
    //                     })
    //                 }


    //             }))
    //         })

    //     })
    // }

    callLeaderBoardApi() {
        debugger
        const { cityName
            , lastLat
            , lastLong } = this.state;
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(leaderBoardFeed(obj, {
                    "name": cityName,
                    "loc": {
                        "type": "Point",
                        "coordinates": [
                            lastLong,
                            lastLat
                        ]
                    }
                }, (res) => {
                    this.setState({ loading: false })
                    debugger
                    // const { leaderBoardData } = this.props.Home
                    // console.log('explore_data?: ', leaderBoardData);
                    // var arr = [...leaderBoardData.leaderBoardPlayerInfoList]
                    // var arr2 = [...leaderBoardData.leaderBoardTeamInfoList]

                    // if (arr?.length > 0) {
                    //     arr.shift()

                    //     this.setState({ arrayPlayers: arr }, () => {

                    //     })
                    // }
                    // if (arr2?.length > 0) {
                    //     arr2.shift()
                    //     this.setState({
                    //         arrayTeams: arr2
                    //     })
                    // }


                }))
            })

        })
    }


    // _renderTeam = (item) => {
    //     // console.log(item.item.userId)
    //     return (
    //         <TouchableOpacity onPress={() => Navigation.navigate('PlayerProfile', { playerId: item.item.userId })}
    //             style={{
    //                 height: wide * 0.092,
    //                 marginVertical: 2, flexDirection: 'row',
    //                 justifyContent: 'space-between', alignItems: 'center',
    //             }}
    //         >
    //             {/* <View style={{
    //                 height: wide * 0.092, 
    //                 marginVertical: 2, flexDirection: 'row',
    //                 justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'red'
    //             }}
    //             > */}
    //             <Text style={{
    //                 color: Colors.light, fontSize: 14,
    //                 fontFamily: Fonts.SemiBold
    //             }}>{item.item.rank}</Text>
    //             {/* edit by keshav */}
    //             {item.item.userProfilePic != null ?
    //                 <FastImage
    //                     source={{ uri: item.item?.userProfilePic }}
    //                     resizeMode="cover"
    //                     style={{
    //                         width: wide * 0.06, height: wide * 0.06, borderRadius: (wide * 0.08) / 2,
    //                         marginLeft: 4
    //                     }}
    //                 /> :
    //                 <Image style={{ width: '80%', height: '90%', }}
    //                     resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />
    //             }
    //             <View style={{ paddingHorizontal: 6, flex: 1 }}>
    //                 <Text style={{
    //                     color: Colors.light, fontSize: 12,
    //                     fontFamily: Fonts.Bold
    //                 }} numberOfLines={1}>{item.item.userName}</Text>
    //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                     <Text style={{
    //                         color: Colors.light, fontSize: 8,
    //                         fontFamily: Fonts.Regular, width: wide * 0.1, top: 2
    //                     }}>{item.item.position}</Text>
    //                     {/* <Image
    //                         source={require("../../Images/upArrow.png")}
    //                         // resizeMode="contain"
    //                         style={{ width: wide * 0.02, height: wide * 0.02 }}
    //                     ></Image> */}
    //                 </View>
    //                 {/* <Text style={{
    //                     color: Colors.light, fontSize: 8,
    //                     fontFamily: Fonts.SemiBold
    //                 }}>25</Text> */}
    //             </View>


    //             {/* <Image
    //                 source={{ uri: item.item.teamLogoUrl }}
    //                 // resizeMode="contain"
    //                 style={{ width: 20, height: 20, borderRadius: 10, marginHorizontal: 5 }}
    //             ></Image> */}

    //             {/* </View> */}
    //         </TouchableOpacity>
    //     );
    // };

    // _renderTeam2 = (item) => {
    //     let nm = item.item.name;
    //     var array = nm.split(' ');
    //     var a = '', b = '';
    //     for (let i = 0; i < array.length; i++) {
    //         if (i == 0) {
    //             a = array[0];
    //         } else {
    //             b = b.concat(array[i], ' ');
    //         }
    //     }
    //     // a = array[0], b = array[1];
    //     console.log("-----------> ", a);
    //     return (
    //         <View style={{
    //             height: wide * 0.092,
    //             marginVertical: 1.6,
    //             marginLeft: 5,
    //             flexDirection: 'row', alignItems: 'center', flex: 1,
    //         }}
    //         >
    //             <Text style={{
    //                 color: Colors.light, fontSize: 14,
    //                 fontFamily: Fonts.SemiBold, paddingLeft: 5
    //             }}>{item.item.rank}</Text>
    //             {/* edit by keshav */}
    //             {item.item.logoUrl != null ?
    //                 <FastImage
    //                     source={{
    //                         uri: item.item.logoUrl === '500 Error' ?
    //                             "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1280px-Los_Angeles_Lakers_logo.svg.png"
    //                             : item.item.logoUrl
    //                     }}
    //                     // resizeMode="contain"
    //                     style={{
    //                         width: wide * 0.06, height: wide * 0.06, borderRadius: (wide * 0.08) / 2,
    //                         paddingLeft: 5, marginHorizontal: 5
    //                     }}
    //                 />
    //                 : null}
    //             <View style={{ paddingHorizontal: 4 }}>
    //                 <Text style={{
    //                     color: Colors.light, fontSize: 10,
    //                     fontFamily: Fonts.Bold
    //                 }} numberOfLines={1}>{a}</Text>
    //                 {b.length > 0 ?
    //                     <Text style={{
    //                         color: Colors.light, fontSize: 8, fontFamily: Fonts.SemiBold,
    //                     }} numberOfLines={1}>{b}</Text>
    //                     : null
    //                 }
    //                 {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                     <Text style={{
    //                         color: Colors.light, fontSize: 8,
    //                         fontFamily: Fonts.Regular
    //                     }}>13 C-F / MIA</Text>
    //                     <Image
    //                         source={require("../../Images/upArrow.png")}
    //                         // resizeMode="contain"
    //                         style={{ width: wide * 0.02, height: wide * 0.02 }}
    //                     ></Image>
    //                 </View>
    //                 <Text style={{
    //                     color: Colors.light, fontSize: 8,
    //                     fontFamily: Fonts.SemiBold
    //                 }}>25</Text> */}
    //             </View>


    //             {/* <Image
    //                 source={require("../../Images/avatar.png")}
    //                 // resizeMode="contain"
    //                 style={{ width: 20, height: 20, borderRadius: 10, marginHorizontal: 5 }}
    //             ></Image> */}

    //         </View>
    //     );
    // };

    _renderLeadingPlayer = (item, index) => {
        // console.log('leadingPlayer---', item);

        return (
            <TouchableOpacity
                style={{
                    // backgroundColor: 'blue',
                    marginLeft: wide * 0.015,
                    // marginRight: wide * 0.02,
                    paddingHorizontal: wide * 0.028,
                    justifyContent: 'center',
                    alignItems: 'center'
                    // width: wide * 0.6
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
                                    borderRadius: 15,
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
            <View style={{
                flexDirection: 'row',
                // alignItems: 'center',
                // backgroundColor: 'green',
                width: wide * 0.36,
                marginLeft: wide * 0.015,
                // justifyContent: 'center'
            }}>
                <View style={{}}>
                    <Text style={{
                        color: Colors.light, fontSize: 54,
                        fontFamily: Fonts.Bold,
                        lineHeight: 60,

                        marginLeft: wide * 0.01,
                        marginTop: wide * 0.01
                    }}>{item.item.rank}</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    // marginTop: wide * 0.01,
                    marginLeft: wide * 0.02,
                }}>
                    <View style={{
                        width: wide * 0.16, height: wide * 0.16,
                        // marginTop: 8,
                        // marginLeft: wide * 0.01,
                        justifyContent: 'center', alignItems: 'center',
                        borderRadius: wide * 0.16 / 2,
                        borderWidth: 3,
                        borderColor: Colors.newGrayFontColor,

                    }}>
                        {/* edit by keshav */}
                        {item.item.logoUrl != null ?
                            <FastImage style={{ width: '94%', height: '94%', borderRadius: wide * 0.16 / 2, }}
                                // resizeMode={'cover'}
                                source={{ uri: item.item.logoUrl }} />
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
        )
    }

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
                    fontSize: 14, lineHeight: 22,
                    fontFamily: Fonts.Bold, textAlign: 'center'
                }}>PTS</Text>
                <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View>

            </TouchableOpacity>
        );
    };
    _renderTeam1 = (item, index) => {
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
                    fontSize: 14, lineHeight: 22,
                    fontFamily: Fonts.Bold, textAlign: 'center'
                }}>PPG</Text>
                <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View>



            </TouchableOpacity>
        );
    };
    _renderTrendingShots = (item, index) => {
        return (
            <TouchableOpacity style={{

                justifyContent: 'center',
                alignItems: 'center', paddingRight: wide * 0.05
            }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedIndex: item.index })}
            >


                <View style={{
                    width: wide * 0.32, height: wide * 0.32,
                    marginTop: 24, borderRadius: wide * 0.3, borderWidth: 3,
                    borderColor: Colors.borderColor,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image style={{ width: '80%', height: '80%', }} resizeMode={'contain'} source={require('../../Images/Los_Angeles_Lakers_logo.png')} />
                    <View style={{
                        position: 'absolute', top: 0, bottom: 0, left: 0,
                        right: 0, backgroundColor: Colors.overlay, borderRadius: wide * 0.3
                    }} />

                    <Image style={{ width: '20%', height: '20%', position: 'absolute', }}
                        resizeMode={'contain'} source={require('../../Images/play_ico_tint.png')} />
                </View>

                <Text style={{
                    color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                    lineHeight: 20, marginTop: 10
                }}>Vaibhav Chibbar</Text>
                <Text style={{
                    color: Colors.light, fontSize: 16, fontFamily: Fonts.Regular,
                    lineHeight: 18, marginTop: 5
                }}>Team - SOP</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                    <Image
                        source={require("../../Images/like_ico.png")}
                        // resizeMode="contain"
                        style={{ width: wide * 0.025, height: wide * 0.025 }}
                    ></Image>
                    <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, marginLeft: 5 }}>23k Likes</Text>
                </View>

            </TouchableOpacity>
        );
    };
    _renderHotPlayers = (item, index) => {
        debugger;
        console.log("Trendingggg", item);
        return (
            <TouchableOpacity style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: wide * 0.05,
                marginLeft: wide * 0.008
                // backgroundColor: 'green'
            }}
                activeOpacity={1}
            // onPress={() => {
            //     if (UserModel.selectedUserType.toUpperCase() === 'COACH') {
            //         Navigation.navigate('PlayerProfile', { playerId: item.item.playerId })

            //     }
            // }}
            // onPress={() => this.setState({ selectedIndex: item.index })}
            >


                <View style={{
                    width: wide * 0.18, height: wide * 0.18,
                    marginTop: wide * 0.05,
                    borderRadius: wide * 0.18 / 2,
                    borderWidth: 3,
                    borderColor: Colors.newGrayFontColor,
                    justifyContent: 'center', alignItems: 'center',
                    // backgroundColor: 'red'
                }}>
                    {/* edit by keshav */}
                    {item.item.imageUrl === null || item.item.imageUrl === '500 Error' ?
                        null
                        :
                        <FastImage style={{
                            width: wide * 0.16, height: wide * 0.16,
                            borderRadius: wide * 0.16 / 2,
                        }}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: item.item.imageUrl }}
                        />
                    }

                </View>


                <Text style={{
                    color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
                    lineHeight: 18, marginTop: wide * 0.012
                }}>{item.item.name}</Text>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                    <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, marginLeft: 5 }}>Rank 1</Text>
                    <Image
                        source={item.item.improved ? require("../../Images/upArrow.png") : require("../../Images/downArrow.png")}
                        // resizeMode="contain"
                        style={{ width: wide * 0.02, height: wide * 0.02, marginLeft: 5 }}
                    ></Image>
                </View> */}
                {/* <Text style={{
                    color: Colors.light, fontSize: 16, fontFamily: Fonts.Regular,
                    lineHeight: 18, marginTop: 5
                }}>{item.item.teamName}</Text> */}

            </TouchableOpacity>
        );
    };
    _renderHotTeams = (item, index) => {
        debugger;
        return (
            <TouchableOpacity style={{

                justifyContent: 'center',
                alignItems: 'center', paddingRight: wide * 0.05
            }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedIndex: item.index })}
            >


                <View style={{
                    width: wide * 0.32, height: wide * 0.32,
                    marginTop: wide * 0.05, borderRadius: wide * 0.3, borderWidth: 3,
                    borderColor: Colors.borderColor,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    {/* edit by keshav */}
                    {item.item.imageUrl === null || item.item.imageUrl === '500 Error' ?
                        null
                        :
                        <FastImage style={{ width: '70%', height: '70%', }}
                            resizeMode={'contain'} source={{ uri: item.item.imageUrl }} />
                    }

                </View>

                <Text style={{
                    color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                    lineHeight: 20, marginTop: 10
                }}>{item.item.name}</Text>
                <Text style={{
                    color: Colors.light, fontSize: 16, fontFamily: Fonts.Regular,
                    lineHeight: 18, marginTop: 5
                }}>Last 10</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>

                    <Text style={{
                        color: Colors.light, fontFamily: Fonts.Medium,
                        fontSize: 12, marginLeft: 5
                    }}>{item.item.last10}</Text>
                </View>

            </TouchableOpacity>
        );
    };
    _renderHotTrainers = (item, index) => {
        // console.log(item)
        return (
            <TouchableOpacity style={{

                justifyContent: 'center',
                alignItems: 'center', paddingRight: wide * 0.05
            }}
                activeOpacity={1}
                onPress={() => Navigation.navigate('TrainerProfilePreview')}
            >


                <View style={{
                    width: wide * 0.32, height: wide * 0.4,
                    marginTop: wide * 0.05, borderRadius: 10, borderWidth: 3,
                    borderColor: Colors.borderColor,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    {/* <Image style={{ width: '80%', height: '80%', }}
                        resizeMode={'contain'}
                        source={{ uri: item.item.imageUrl }} /> */}
                    {/* edit by keshav */}
                    {item.item.imageUrl !== null || item.item.imageUrl !== '500 Error' ?
                        <Image style={{ width: '95%', height: '95%', borderRadius: 5 }}
                            resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />
                        :
                        <FastImage style={{ width: '95%', height: '95%', borderRadius: 5 }}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: item.item.imageUrl }}
                        />
                    }
                </View>

                <Text style={{
                    color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                    lineHeight: 20, marginTop: 10
                }}>{item.item.name}</Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: wide * 0.23, marginTop: 6
                }}>
                    <AirbnbRating
                        ratingColor={Colors.btnBg}
                        isDisabled={true}
                        size={12}
                        showRating={false}
                        selectedColor={Colors.btnBg}

                        defaultRating={item.item.ratings}


                    />
                </View>

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
    _renderNearByMatches = (item, index) => {
        const d = new Date(item.item.scheduledAt);
        return (
            <TouchableOpacity style={{

                justifyContent: 'center',
                alignItems: 'center', width: wide - 60
            }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedIndex: item.index })}
            >


                <View style={{

                    marginTop: 24,

                    flexDirection: 'row', alignItems: 'center'
                }}>
                    <Image source={require('../../Images/Rectangle_sort.png')} style={{
                        position: 'absolute', top: -15, left: -15,
                        right: -15, bottom: -wide * 0.2, width: wide * 0.5, borderRadius: 10
                    }} />
                    {/* edit by keshav */}
                    <FastImage style={{ width: wide * 0.15, height: wide * 0.15, }} resizeMode={'contain'}
                        source={{ uri: item.item.challengerLogoUrl }} />
                    <Text style={{
                        color: Colors.light, fontSize: 22, fontFamily: Fonts.BoldItalic,
                        lineHeight: 24, paddingHorizontal: 10

                    }}>VS</Text>
                    <FastImage style={{ width: wide * 0.15, height: wide * 0.15, }}
                        resizeMode={'contain'}
                        source={{ uri: item.item.defenderLogoUrl }} />
                </View>

                <Text style={{
                    color: Colors.light, fontSize: 11, fontFamily: Fonts.Bold,
                    lineHeight: 16,
                }}>
                    {moment(d).format('DD MMM YYYY / hh:mm a')}
                    {/* 11 Dec 2020 / 11:00 AM EST */}
                </Text>


                <TouchableOpacity style={{
                    backgroundColor: Colors.btnBg,
                    borderRadius: wide * 0.2, flexDirection: 'row',
                    justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.02
                }}
                    onPress={() => {
                        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                        var url = scheme + `${item.item.geoLocation?.loc?.coordinates[1]},${item.item.geoLocation?.loc?.coordinates[0]}`;
                        Linking.openURL(url);
                    }}
                >
                    <Image source={require('../../Images/get_direction.png')} style={{
                        width: 15, height: 15, marginLeft: 15
                    }} />
                    <Text style={{
                        color: Colors.light, fontSize: 11, fontFamily: Fonts.Bold,
                        lineHeight: 12, paddingTop: 8, paddingRight: 15,
                        paddingBottom: 8, paddingLeft: 5
                    }} >Get Direction</Text>
                </TouchableOpacity>

            </TouchableOpacity>
        );
    };

    handleChallengeModelClose = () => {
        Orientation.getOrientation((res) => {
            if (res == 'PORTRAIT') {
                this.setState({ isPlayVideo: false })
            } else if (res == 'LANDSCAPE-LEFT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            } else if (res == 'LANDSCAPE-RIGHT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            }
        })
    }

    // render() {
    //     const { arrayPlayers,
    //         arrayTeams, cityName, lastLat, lastLong } = this.state
    //     const { leaderBoardData, gameInfoTabData } = this.props.Home
    //     console.log(gameInfoTabData, leaderBoardData);
    //     var len = leaderBoardData.length;
    //     console.log("--------------> ", len);
    //     let b = false;
    //     if (len === 0) {
    //         b = true;
    //     }
    //     console.log("------->>>>> ", b);
    //     debugger;

    //     return (
    //         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

    //             <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
    //                 <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
    //                     marginHorizontal: 15,
    //                     minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10
    //                 }}>

    //                     <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.08, marginHorizontal: 8 }}>
    //                         {/* <Text style={{
    //                             color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold
    //                         }}>
    //                             Explore

    //                         </Text> */}

    //                         {/* Location view open text field */}
    //                         {/* <TouchableOpacity style={{ marginTop: wide * 0.02, }} onPress={() => Navigation.navigate('ExploreMap')}>


    //                             <TextInput style={{
    //                                 borderWidth: 3, borderColor: Colors.borderColor,
    //                                 fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.2,
    //                                 borderRadius: 5, color: Colors.light, fontSize: 16,
    //                             }}
    //                                 onTouchStart={() => Navigation.navigate('ExploreMap')}
    //                                 editable={false}
    //                                 placeholder={"SEARCH"}
    //                                 placeholderTextColor={Colors.borderColor}
    //                                 value={cityName}
    //                             />
    //                             <Text style={{
    //                                 position: 'absolute', fontFamily: Fonts.SemiBold, color: Colors.light, fontSize: 12,
    //                                 right: wide * 0.05, top: wide * 0.06
    //                             }} >Change</Text>
    //                             {/* <Image style={{
    //                                 position: 'absolute',
    //                                 width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
    //                             }} source={require('../../Images/search_ico.png')} /> */}
    //                         {/* </TouchableOpacity> */}

    //                         {/* new search screen test field */}
    //                         <TouchableOpacity style={{ marginTop: wide * 0.02, }} onPress={() => Navigation.navigate('ExploreSearch')}>

    //                             <TextInput style={{
    //                                 borderWidth: 3, borderColor: Colors.borderColor,
    //                                 fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.2,
    //                                 borderRadius: 5, color: Colors.light, fontSize: 16,
    //                             }}
    //                                 onTouchStart={() => Navigation.navigate('ExploreSearch')}
    //                                 editable={false}
    //                                 // placeholder={"SEARCH"}
    //                                 placeholderTextColor={Colors.borderColor}
    //                             // value={cityName}
    //                             />
    //                             {/* <Text style={{
    //                                 position: 'absolute', fontFamily: Fonts.SemiBold, color: Colors.light, fontSize: 12,
    //                                 right: wide * 0.05, top: wide * 0.06
    //                             }} >Change</Text> */}
    //                             <Image style={{
    //                                 position: 'absolute',
    //                                 width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
    //                             }} source={require('../../Images/search_ico.png')}
    //                             />
    //                         </TouchableOpacity>
    //                         <View style={{

    //                             backgroundColor: Colors.base,
    //                             marginTop: wide * 0.06, flexDirection: 'row', justifyContent: 'space-around'
    //                         }}>
    //                             <TouchableOpacity onPress={() => this.setState({ isGamesOpen: true }, () => {
    //                                 this.callGamesApi()

    //                             })}>
    //                                 <Text style={{
    //                                     color: this.state.isGamesOpen ? Colors.light : Colors.borderColor
    //                                     , fontSize: 30, lineHeight: 36, fontFamily: Fonts.Bold,
    //                                 }}>
    //                                     Games

    //                                 </Text>
    //                             </TouchableOpacity>
    //                             <TouchableOpacity onPress={() => this.setState({ isGamesOpen: false }, () => {
    //                                 this.callLeaderBoardApi()
    //                             })}>
    //                                 <Text style={{
    //                                     color: !this.state.isGamesOpen ? Colors.light : Colors.borderColor, fontSize: 30, lineHeight: 36, fontFamily: Fonts.Bold, marginLeft: 13,
    //                                 }}>
    //                                     Leaderboard

    //                                 </Text>
    //                             </TouchableOpacity>
    //                         </View>
    //                     </View>

    //                     {leaderBoardData.length === 0 && !this.state.isGamesOpen || gameInfoTabData.length === 0 && this.state.isGamesOpen ?
    //                         <View style={{ flex: 1, backgroundColor: Colors.base }}>
    //                             <AppLoader visible={this.state.loading} />
    //                         </View>
    //                         :
    //                         !this.state.isGamesOpen ?
    //                             <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >

    //                                 {leaderBoardData?.leaderBoardPlayerInfoList?.length > 0 ?
    //                                     <>
    //                                         <View style={{ marginTop: wide * 0.1 }}>
    //                                             <Text style={{
    //                                                 color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold,
    //                                             }}>
    //                                                 Player Leaders

    //                                             </Text>
    //                                             {/* <FlatList
    //                                     style={{ overflow: 'visible' }}
    //                                     data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11]}
    //                                     renderItem={(item, index) => this._renderPlan(item, index)}
    //                                     showsHorizontalScrollIndicator={false}
    //                                     horizontal
    //                                 /> */}
    //                                         </View>

    //                                         <View style={{ height: wide * 0.5, marginTop: wide * 0.05, }}>
    //                                             <Image style={{
    //                                                 position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '80%',
    //                                             }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
    //                                             <TouchableOpacity onPress={() => Navigation.navigate('PlayerProfile',
    //                                                 { playerId: leaderBoardData?.leaderBoardPlayerInfoList[0]?.userId })}>
    //                                                 <View style={{ flexDirection: 'row', alignItems: 'center', }}>
    //                                                     <View style={{
    //                                                         width: wide * 0.23, height: wide * 0.32,
    //                                                         marginTop: 8, borderRadius: wide * 0.02, borderWidth: 3,
    //                                                         borderColor: Colors.borderColor, marginLeft: wide * 0.025,
    //                                                         justifyContent: 'center', alignItems: 'center',
    //                                                     }}>
    //                                                         {leaderBoardData?.leaderBoardPlayerInfoList[0]?.userProfilePic != null ?
    //                                                             < FastImage style={{ width: '95%', height: '95%', borderRadius: 5 }}
    //                                                                 resizeMode={'cover'}
    //                                                                 source={{ uri: leaderBoardData?.leaderBoardPlayerInfoList[0]?.userProfilePic }} />
    //                                                             :
    //                                                             <Image style={{ width: '80%', height: '90%', }}
    //                                                                 resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />}
    //                                                         {/* <Image style={{ width: '80%', height: '80%', }}
    //                                                         resizeMode={'contain'}
    //                                                         source={require('../../Images/Los_Angeles_Lakers_logo.png')} /> */}
    //                                                     </View>
    //                                                     <View>
    //                                                         {/* edit by keshav */}
    //                                                         {leaderBoardData?.leaderBoardPlayerInfoList[0]?.teamLogoUrl != null ?
    //                                                             <FastImage style={{ width: '80%', height: '20%', marginLeft: 5 }}
    //                                                                 resizeMode='contain'
    //                                                                 source={{ uri: leaderBoardData?.leaderBoardPlayerInfoList[0]?.teamLogoUrl }} />
    //                                                             : null}
    //                                                         <Text style={{
    //                                                             color: Colors.light, fontSize: 30, fontFamily: Fonts.SemiBold,
    //                                                             marginLeft: 5, paddingBottom: wide * 0.02
    //                                                         }}>{leaderBoardData?.leaderBoardPlayerInfoList[0]?.rank}</Text>
    //                                                     </View>

    //                                                     <View style={{ marginTop: wide * 0.06, }}>
    //                                                         <Text style={{
    //                                                             color: Colors.light, fontSize: 14, fontFamily: Fonts.SemiBold,
    //                                                             marginLeft: 5, width: wide * 0.16, lineHeight: 16
    //                                                         }}>{leaderBoardData?.leaderBoardPlayerInfoList[0]?.userName}</Text>
    //                                                         <Text style={{
    //                                                             color: Colors.light, fontSize: 8, fontFamily: Fonts.SemiBold,
    //                                                             marginLeft: 5, width: wide * 0.15, marginTop: 6,
    //                                                         }}>
    //                                                             {leaderBoardData?.leaderBoardPlayerInfoList[0]?.position}
    //                                                         </Text>
    //                                                         {/* <View style={{ flexDirection: 'row' }}> */}
    //                                                         {/* <Text style={{
    //                                                             color: Colors.light, fontSize: 16, fontFamily: Fonts.SemiBold,
    //                                                             marginLeft: 5, lineHeight: 34,
    //                                                         }}>28</Text> */}

    //                                                         {/* </View> */}

    //                                                     </View>
    //                                                     <View style={{
    //                                                         marginLeft: wide * 0.06,
    //                                                         flex: 1,
    //                                                         justifyContent: 'center',
    //                                                     }}>
    //                                                         <FlatList
    //                                                             style={{
    //                                                                 marginTop: wide * 0.03,
    //                                                                 height: wide * 0.32,
    //                                                             }}
    //                                                             nestedScrollEnabled
    //                                                             showsVerticalScrollIndicator={false}
    //                                                             data={arrayPlayers}
    //                                                             renderItem={(item, index) => this._renderTeam(item, index)}
    //                                                             showsHorizontalScrollIndicator={false}
    //                                                         />
    //                                                     </View>

    //                                                 </View>
    //                                             </TouchableOpacity>
    //                                             <TouchableOpacity style={{
    //                                                 backgroundColor: Colors.btnBg, alignItems: 'center',
    //                                                 width: wide * 0.12, borderRadius: wide * 0.05, marginTop: wide * 0.03,
    //                                                 alignSelf: 'flex-end'
    //                                             }}
    //                                                 onPress={() => Navigation.navigate('PlayerMore')}>
    //                                                 <Text style={{
    //                                                     color: Colors.light, fontSize: 10, fontFamily: Fonts.SemiBold,
    //                                                     padding: 5, lineHeight: 14
    //                                                 }}>More</Text>
    //                                             </TouchableOpacity>
    //                                         </View>
    //                                     </>
    //                                     : null
    //                                 }
    //                                 {
    //                                     leaderBoardData?.leaderBoardTeamInfoList?.length > 0 ?
    //                                         <>
    //                                             <View >
    //                                                 <Text style={{
    //                                                     color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
    //                                                 }}>
    //                                                     Teams

    //                                                 </Text>

    //                                             </View>

    //                                             <View style={{ height: wide * 0.5, marginTop: wide * 0.05, }}>
    //                                                 <Image style={{
    //                                                     position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '80%'
    //                                                 }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
    //                                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                                                     <View style={{
    //                                                         width: wide * 0.23, height: wide * 0.32,
    //                                                         marginTop: 8, borderRadius: wide * 0.02, borderWidth: 3,
    //                                                         borderColor: Colors.borderColor, marginLeft: wide * 0.025,
    //                                                         justifyContent: 'center', alignItems: 'center'
    //                                                     }}>
    //                                                         {/* edit by keshav */}
    //                                                         {leaderBoardData?.leaderBoardTeamInfoList[0]?.logoUrl != null ?
    //                                                             <FastImage style={{ width: '90%', height: '90%', }}
    //                                                                 resizeMode={'contain'}
    //                                                                 source={{ uri: leaderBoardData?.leaderBoardTeamInfoList[0]?.logoUrl }} />
    //                                                             : null}
    //                                                     </View>
    //                                                     <View>
    //                                                         <Text style={{
    //                                                             color: Colors.light, fontSize: 30, fontFamily: Fonts.SemiBold,
    //                                                             marginLeft: 5, marginTop: wide * 0.06
    //                                                         }}>{leaderBoardData?.leaderBoardTeamInfoList[0]?.rank}</Text>
    //                                                     </View>

    //                                                     <View style={{ marginTop: wide * 0.06, flex: 0.85 }}>
    //                                                         <Text numberOfLines={2} style={{
    //                                                             color: Colors.light, fontSize: 14, fontFamily: Fonts.SemiBold,
    //                                                             marginLeft: 5, width: wide * 0.13, lineHeight: 15
    //                                                         }}>{leaderBoardData?.leaderBoardTeamInfoList[0]?.name}</Text>

    //                                                         {/* <View style={{ flexDirection: 'row' }}>
    //                                                         <Text style={{
    //                                                             color: Colors.light, fontSize: 12, fontFamily: Fonts.SemiBold,
    //                                                             marginLeft: 5, lineHeight: 20,
    //                                                         }}>117.0</Text>

    //                                                     </View> */}

    //                                                     </View>
    //                                                     <View style={{
    //                                                         marginHorizontal: wide * 0.2,
    //                                                         justifyContent: 'center',

    //                                                     }}>
    //                                                         <FlatList
    //                                                             style={{ marginTop: wide * 0.035, height: wide * 0.32, marginHorizontal: 2 }}
    //                                                             data={arrayTeams}
    //                                                             nestedScrollEnabled
    //                                                             renderItem={(item, index) => this._renderTeam2(item, index)}
    //                                                             showsHorizontalScrollIndicator={false}
    //                                                             showsVerticalScrollIndicator={false}
    //                                                         />
    //                                                     </View>

    //                                                 </View>
    //                                                 {/* <TouchableOpacity style={{
    //                                                     backgroundColor: Colors.btnBg, alignItems: 'center',
    //                                                     width: wide * 0.12, borderRadius: wide * 0.05, marginTop: wide * 0.03, alignSelf: 'flex-end'
    //                                                 }}>
    //                                                     <Text style={{
    //                                                         color: Colors.light, fontSize: 10, fontFamily: Fonts.SemiBold,
    //                                                         padding: 5, lineHeight: 14
    //                                                     }}>More</Text>
    //                                                 </TouchableOpacity> */}
    //                                             </View>
    //                                         </>
    //                                         : null
    //                                 }
    //                                 {
    //                                     leaderBoardData?.leaderBoardTrendingShotsList != null ?
    //                                         <View style={{ marginTop: wide * 0.12 }}>
    //                                             <Text style={{
    //                                                 color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
    //                                             }}>
    //                                                 Trending Shots

    //                                             </Text>
    //                                             <FlatList
    //                                                 style={{ overflow: 'visible' }}
    //                                                 data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11]}
    //                                                 renderItem={(item, index) => this._renderTrendingShots(item, index)}
    //                                                 showsHorizontalScrollIndicator={false}
    //                                                 horizontal
    //                                             />
    //                                         </View>
    //                                         :
    //                                         null
    //                                 }
    //                                 {
    //                                     leaderBoardData?.leaderBoardHotPlayersList != null ?

    //                                         <View>
    //                                             <Text style={{
    //                                                 color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
    //                                             }}>
    //                                                 Hot Players

    //                                             </Text>
    //                                             <FlatList
    //                                                 style={{ overflow: 'visible' }}
    //                                                 data={leaderBoardData?.leaderBoardHotPlayersList}
    //                                                 renderItem={(item, index) => this._renderHotPlayers(item, index)}
    //                                                 showsHorizontalScrollIndicator={false}
    //                                                 horizontal
    //                                             />
    //                                         </View>
    //                                         : null
    //                                 }
    //                                 {
    //                                     leaderBoardData?.leaderBoardHotTeamsList.length != 0 ?
    //                                         <View style={{ marginTop: wide * 0.08 }}>
    //                                             <Text style={{
    //                                                 color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
    //                                             }}>
    //                                                 Hot Teams

    //                                             </Text>
    //                                             <FlatList
    //                                                 style={{ overflow: 'visible' }}
    //                                                 data={leaderBoardData?.leaderBoardHotTeamsList}
    //                                                 renderItem={(item, index) => this._renderHotTeams(item, index)}
    //                                                 showsHorizontalScrollIndicator={false}
    //                                                 horizontal
    //                                             />
    //                                         </View>
    //                                         : null
    //                                 }
    //                                 {/* {
    //                                     // leaderBoardData?.leaderBoardHotTrainersList != null ?
    //                                     leaderBoardData?.leaderBoardHotTrainersList.length != 0 ?
    //                                         <View style={{ marginTop: wide * 0.08 }}>
    //                                             <View style={{ flexDirection: 'row' }}>
    //                                                 <Text style={{
    //                                                     color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
    //                                                 }}>
    //                                                     Hot Trainers

    //                                                 </Text>
    //                                                 <View style={{ flex: 1 }} />
    //                                                 <Text onPress={() => Navigation.navigate('TrainerSeeMore')} style={{
    //                                                     color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold
    //                                                 }}>
    //                                                     See All

    //                                                 </Text>
    //                                             </View>
    //                                             <FlatList
    //                                                 style={{ paddingBottom: wide * 0.1, overflow: 'visible' }}
    //                                                 data={leaderBoardData?.leaderBoardHotTrainersList}
    //                                                 renderItem={(item, index) => this._renderHotTrainers(item, index)}
    //                                                 showsHorizontalScrollIndicator={false}
    //                                                 horizontal
    //                                             />
    //                                         </View>
    //                                         : null
    //                                 } */}
    //                             </View>
    //                             :
    //                             <View style={{
    //                                 flex: 1, backgroundColor: Colors.base, marginHorizontal: 15,
    //                                 paddingBottom: wide * 0.15
    //                             }} >
    //                                 {
    //                                     gameInfoTabData?.liveGameInfo?.liveVideoUrl.videoUrl !== null
    //                                         ?
    //                                         <TouchableOpacity style={{
    //                                             backgroundColor: Colors.overlay2,
    //                                             borderRadius: 10, marginTop: wide * 0.04,
    //                                             height: wide * 0.45
    //                                         }}
    //                                             onPress={() => {

    //                                                 if (gameInfoTabData?.liveGameInfo?.liveVideoUrl.videoUrl !== null) {

    //                                                     this.setState({ videoUrlToPlay: gameInfoTabData?.liveGameInfo?.liveVideoUrl.videoUrl, isPlayVideo: true })
    //                                                 }
    //                                             }}
    //                                         >
    //                                             <Image style={{ width: '100%', height: '100%', position: 'absolute', }}
    //                                                 resizeMode={'cover'} source={{ uri: gameInfoTabData?.liveVideoUrl?.thumbnailUrl }} />
    //                                             {/* <Text numberOfLines={2} style={{
    //                                             color: Colors.light,
    //                                             fontSize: 14, lineHeight: 16,
    //                                             fontFamily: Fonts.SemiBold, textAlign: 'center', alignSelf: 'flex-end', padding: wide * 0.05
    //                                         }}>24 min</Text> */}
    //                                             <View style={{
    //                                                 position: 'absolute', bottom: wide * 0.03, left: wide * 0.04,
    //                                                 flexDirection: 'row'
    //                                             }}>
    //                                                 <Image style={{ width: 16, height: 16, position: 'absolute', }}
    //                                                     resizeMode={'contain'} source={require('../../Images/play_ico_tint.png')} />
    //                                                 <Text numberOfLines={2} style={{
    //                                                     color: Colors.light,
    //                                                     fontSize: 14, lineHeight: 16,
    //                                                     fontFamily: Fonts.SemiBold, marginLeft: wide * 0.04
    //                                                 }}> WATCH LIVE</Text>



    //                                             </View>
    //                                             <Text numberOfLines={2} style={{
    //                                                 color: Colors.light,
    //                                                 fontSize: 35,
    //                                                 fontFamily: Fonts.SemiBold, alignSelf: 'flex-end', position: 'absolute', bottom: wide * 0.03, right: wide * 0.04
    //                                             }}>{gameInfoTabData?.liveGameInfo?.finalScore}</Text>
    //                                         </TouchableOpacity>
    //                                         :
    //                                         null
    //                                 }
    //                                 {
    //                                     gameInfoTabData?.recentGames !== null && gameInfoTabData?.recentGames?.length > 0 ?
    //                                         <View style={{ marginTop: wide * 0.1 }}>
    //                                             <Text style={{
    //                                                 color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
    //                                             }}>
    //                                                 Recent

    //                                             </Text>
    //                                             <FlatList
    //                                                 style={{ overflow: 'visible' }}
    //                                                 //style={{marginTop:wide*0.01}}    
    //                                                 data={gameInfoTabData?.recentGames}
    //                                                 renderItem={(item, index) => this._renderRecents(item, index)}
    //                                                 showsHorizontalScrollIndicator={false}
    //                                                 horizontal
    //                                             />
    //                                         </View>
    //                                         :
    //                                         null
    //                                 }

    //                                 <View style={{ marginTop: wide * 0.1 }}>
    //                                     <Text style={{
    //                                         color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
    //                                     }}>
    //                                         Near By Matches

    //                                     </Text>

    //                                 </View>
    //                                 <View style={{ height: wide + wide * 0.2, marginVertical: wide * 0.05, borderRadius: 20, overflow: 'hidden' }}>
    //                                     <MapView
    //                                         showsUserLocation={true}
    //                                         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    //                                         style={{ height: '100%' }}
    //                                         region={{
    //                                             latitude: lastLat,
    //                                             longitude: lastLong,
    //                                             latitudeDelta: 0.015,
    //                                             longitudeDelta: 0.0121,
    //                                         }}

    //                                     >
    //                                         {gameInfoTabData?.upcomingGames?.map((info) => {

    //                                             return (
    //                                                 <Marker coordinate={{
    //                                                     latitude: info.geoLocation?.loc?.coordinates[1],
    //                                                     longitude: info.geoLocation?.loc?.coordinates[0]
    //                                                 }}
    //                                                     pinColor={Colors.base} // any color
    //                                                 />

    //                                             )
    //                                         })
    //                                         }

    //                                     </MapView>
    //                                     {
    //                                         gameInfoTabData?.upcomingGames?.length > 0 ?
    //                                             <Image source={require('../../Images/map_bottom_shadow.png')} style={{
    //                                                 position: 'absolute', left: 0,
    //                                                 right: 0, bottom: 0,
    //                                             }} />
    //                                             :
    //                                             null
    //                                     }

    //                                 </View>
    //                                 <FlatList

    //                                     style={{ marginTop: -wide * 0.18, overflow: 'visible' }}
    //                                     data={gameInfoTabData?.upcomingGames}
    //                                     renderItem={(item, index) => this._renderNearByMatches(item, index)}
    //                                     showsHorizontalScrollIndicator={false}
    //                                     horizontal
    //                                     pagingEnabled
    //                                 />

    //                             </View>
    //                     }
    //                 </ScrollView>
    //                 {
    //                     this.state.isPlayVideo ?
    //                         <CommonVideoComponent
    //                             videoUrl={this.state.videoUrlToPlay}
    //                             closeVideoView={() => this.setState({ isPlayVideo: false })}
    //                         />
    //                         :
    //                         null
    //                 }
    //                 {/* <AppLoader visible={this.state.loading} /> */}
    //             </KeyboardAvoidingView>

    //         </SafeAreaView >
    //     );
    // }

    render() {
        const { arrayPlayers,
            arrayTeams, cityName, lastLat, lastLong } = this.state
        const { leaderBoardData, gameInfoTabData } = this.props.Home
        console.log('Dataaaa', leaderBoardData);
        // var len = leaderBoardData.length;
        // console.log("--------------> ", len);
        // let b = false;
        // if (len === 0) {
        //     b = true;
        // }
        // console.log("------->>>>> ", b);
        // debugger;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{
                            width: '90%',
                            flexDirection: 'row',
                            // backgroundColor: 'green',
                            // marginHorizontal: wide * 0.06,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: wide * 0.02,
                            marginBottom: wide * 0.03,

                        }}>
                            <Text style={{
                                fontFamily: Fonts.Bold, color: Colors.light, fontSize: 24,
                                lineHeight: 40,
                            }}>Explore</Text>
                            <TouchableOpacity
                                style={{
                                    width: '70%',
                                }}
                                onPress={() => Navigation.navigate('ExploreSearch')}>

                                <TextInput style={{
                                    borderWidth: 3, borderColor: Colors.borderColor,
                                    fontFamily: Fonts.Bold, height: 50,
                                    paddingLeft: 10,
                                    paddingRight: wide * 0.2,
                                    borderRadius: 5, color: Colors.light, fontSize: 16,
                                }}
                                    onTouchStart={() => Navigation.navigate('ExploreSearch')}
                                    editable={false}
                                    // placeholder={"SEARCH"}
                                    placeholderTextColor={Colors.borderColor}
                                // value={cityName}
                                />

                                <Image style={{
                                    position: 'absolute',
                                    width: 20, height: 20, right: wide * 0.04, top: wide * 0.04
                                }} source={require('../../Images/search_ico.png')}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>


                    <ScrollView showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{
                            // marginHorizontal: 15,
                            // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                            paddingBottom: 20,

                        }}>

                        {leaderBoardData === null ?
                            <View style={{ flex: 1, backgroundColor: Colors.base }}>
                                <AppLoader visible={this.state.loading} />
                            </View>
                            :


                            <View style={{
                                flex: 1,
                                // backgroundColor: 'green',
                                // backgroundColor: Colors.base,
                                // paddingBottom: wide * 0.1,
                                // alignItems: 'center',
                            }} >
                                {/* {gameInfoTabData?.liveGameInfo?.liveVideoUrl.videoUrl !== null ? */}
                                {leaderBoardData?.liveGameInfo?.liveVideoUrl.videoUrl !== null && leaderBoardData?.liveGameInfo?.liveVideoUrl.videoUrl != undefined ?
                                    <TouchableOpacity style={{
                                        backgroundColor: Colors.overlay2,
                                        borderRadius: 10,
                                        marginTop: wide * 0.045,
                                        height: wide * 0.45,
                                        width: '90%',
                                        marginLeft: wide * 0.05,
                                    }}
                                        onPress={() => {

                                            if (leaderBoardData?.liveGameInfo?.liveVideoUrl.videoUrl !== null) {

                                                this.setState({
                                                    videoUrlToPlay: leaderBoardData?.liveGameInfo?.liveVideoUrl.videoUrl,
                                                    videoThumbnail: leaderBoardData?.liveGameInfo?.liveVideoUrl.thumbnailUrl,
                                                    isPlayVideo: true,
                                                })
                                            }
                                        }}
                                    >
                                        <Image style={{ width: '100%', height: '100%', position: 'absolute', }}
                                            resizeMode={'cover'}
                                            source={{ uri: leaderBoardData?.liveGameInfo?.liveVideoUrl?.thumbnailUrl }} />
                                        <Text numberOfLines={2} style={{
                                            color: Colors.light,
                                            fontSize: 14, lineHeight: 16,
                                            fontFamily: Fonts.SemiBold, textAlign: 'center', alignSelf: 'flex-end', padding: wide * 0.05
                                        }}>24 min</Text>
                                        <View style={{
                                            position: 'absolute', bottom: wide * 0.03, left: wide * 0.04,
                                            flexDirection: 'row'
                                        }}>
                                            <Image style={{ width: 16, height: 16, position: 'absolute', }}
                                                resizeMode={'contain'} source={require('../../Images/play_ico_tint.png')} />
                                            <Text numberOfLines={2} style={{
                                                color: Colors.light,
                                                fontSize: 14, lineHeight: 16,
                                                fontFamily: Fonts.SemiBold, marginLeft: wide * 0.04
                                            }}> WATCH LIVE</Text>



                                        </View>
                                        <Text numberOfLines={2} style={{
                                            color: Colors.light,
                                            fontSize: 35,
                                            fontFamily: Fonts.SemiBold, alignSelf: 'flex-end',
                                            position: 'absolute', bottom: wide * 0.03, right: wide * 0.04
                                        }}>{leaderBoardData?.liveGameInfo?.finalScore}</Text>
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                                {/* {gameInfoTabData?.recentGames !== null && gameInfoTabData?.recentGames?.length > 0 ? */}
                                {leaderBoardData?.recentGames !== null && leaderBoardData?.recentGames?.length > 0 ?

                                    <View style={{
                                        marginTop: wide * 0.08,
                                        alignItems: 'center'
                                    }}>
                                        <Title data={'Recent Games'} />

                                        <View style={{
                                            width: '90%',
                                            // marginHorizontal: wide * 0.055,
                                        }}>

                                            <FlatList
                                                style={{ overflow: 'visible' }}
                                                //style={{marginTop:wide*0.01}}    
                                                data={leaderBoardData?.recentGames}
                                                renderItem={(item, index) => this._renderRecents(item, index)}
                                                showsHorizontalScrollIndicator={false}
                                                horizontal
                                            />
                                        </View>
                                    </View>
                                    :
                                    null
                                }

                                {/* leaderBoardData */}

                                {leaderBoardData?.leadingPlayerInfoList?.length > 0 ?
                                    <>
                                        <View style={{
                                            marginTop: wide * 0.08,
                                            // backgroundColor: 'red'
                                        }}>
                                            <Title data={'Leading Players'} />
                                            {/* <Text style={{
                                                    color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold,
                                                }}>
                                                    Player Leaders
                                                </Text> */}
                                        </View>
                                        <View style={{
                                            marginTop: wide * 0.04,
                                            // backgroundColor: 'red',
                                            alignItems: 'center',
                                        }}>
                                            <FlatList
                                                keyExtractor={(item, index) => index.toString()}
                                                style={{ overflow: 'visible', width: '93%', }}
                                                data={leaderBoardData?.leadingPlayerInfoList}
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
                                {
                                    leaderBoardData?.leadingTeamInfoList?.length > 0 ?
                                        <>
                                            <View style={{ marginTop: wide * 0.08 }}>
                                                <Title data={'Leading Teams'} />
                                                {/* <Text style={{
                                                        color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
                                                    }}>
                                                        Teams

                                                    </Text> */}

                                            </View>

                                            <View style={{
                                                marginTop: wide * 0.04,
                                                alignItems: 'center',
                                            }}>
                                                <FlatList
                                                    keyExtractor={(item, index) => index.toString()}
                                                    style={{ overflow: 'visible', width: '90%', marginLeft: -10, }}
                                                    // contentContainerStyle={{ justifyContent: 'space-between', flex: 1 }}
                                                    data={leaderBoardData?.leadingTeamInfoList}
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
                                                    onPress={() => Navigation.navigate('TeamMore')}>
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
                                {/* {
                                    leaderBoardData?.trendingPlayers?.length > 0 ?
                                        <View style={{ marginTop: wide * 0.12 }}>
                                            <Text style={{
                                                color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
                                            }}>
                                                Trending Shots

                                            </Text>
                                            <FlatList
                                                style={{ overflow: 'visible' }}
                                                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11]}
                                                renderItem={(item, index) => this._renderTrendingShots(item, index)}
                                                showsHorizontalScrollIndicator={false}
                                                horizontal
                                            />
                                        </View>
                                        :
                                        null
                                } */}
                                {leaderBoardData?.trendingPlayers?.length > 0 ?
                                    <>
                                        <View style={{ marginTop: wide * 0.08, alignItems: 'center' }}>
                                            <Title data={'Trending Players'} />
                                        </View>


                                        {/* <Text style={{
                                                    color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
                                                }}>
                                                    Hot Players

                                                </Text> */}
                                        <View style={{ width: '90%', alignSelf: 'center' }}>
                                            <FlatList
                                                keyExtractor={(item, index) => index.toString()}
                                                style={{ overflow: 'visible', marginBottom: 5 }}
                                                data={leaderBoardData?.trendingPlayers}
                                                renderItem={(item, index) => this._renderHotPlayers(item, index)}
                                                showsHorizontalScrollIndicator={false}
                                                horizontal
                                            />
                                        </View>

                                        {/* </View> */}
                                    </>
                                    : null
                                }
                                {/* {
                                        leaderBoardData?.leaderBoardHotTeamsList.length != 0 ?
                                            <View style={{ marginTop: wide * 0.08 }}>
                                                <Text style={{
                                                    color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold
                                                }}>
                                                    Hot Teams

                                                </Text>
                                                <FlatList
                                                    style={{ overflow: 'visible' }}
                                                    data={leaderBoardData?.leaderBoardHotTeamsList}
                                                    renderItem={(item, index) => this._renderHotTeams(item, index)}
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal
                                                />
                                            </View>
                                            : null
                                    } */}



                                {/* <>  
                                        <View style={{ marginTop: wide * 0.1 }}>
                                            <Text style={{
                                                color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
                                            }}>
                                                Near By Matches

                                            </Text>

                                        </View>
                                        <View style={{ height: wide + wide * 0.2, marginVertical: wide * 0.05, borderRadius: 20, overflow: 'hidden' }}>
                                            <MapView
                                                showsUserLocation={true}
                                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                                style={{ height: '100%' }}
                                                region={{
                                                    latitude: lastLat,
                                                    longitude: lastLong,
                                                    latitudeDelta: 0.015,
                                                    longitudeDelta: 0.0121,
                                                }}

                                            >
                                                {gameInfoTabData?.upcomingGames?.map((info) => {

                                                    return (
                                                        <Marker coordinate={{
                                                            latitude: info.geoLocation?.loc?.coordinates[1],
                                                            longitude: info.geoLocation?.loc?.coordinates[0]
                                                        }}
                                                            pinColor={Colors.base} // any color
                                                        />

                                                    )
                                                })
                                                }

                                            </MapView>
                                            {
                                                gameInfoTabData?.upcomingGames?.length > 0 ?
                                                    <Image source={require('../../Images/map_bottom_shadow.png')} style={{
                                                        position: 'absolute', left: 0,
                                                        right: 0, bottom: 0,
                                                    }} />
                                                    :
                                                    null
                                            }

                                        </View>
                                        <FlatList

                                            style={{ marginTop: -wide * 0.18, overflow: 'visible' }}
                                            data={gameInfoTabData?.upcomingGames}
                                            renderItem={(item, index) => this._renderNearByMatches(item, index)}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal
                                            pagingEnabled
                                        />
                                    </> */}

                            </View>
                        }
                    </ScrollView>
                    {this.state.isPlayVideo ?

                        <Modal visible={this.state.isPlayVideo} animationType="slide"
                            supportedOrientations={['portrait', 'landscape']}
                        >
                            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                                {/* <TouchableOpacity
                                    onPress={() => this.handleChallengeModelClose()}

                                    style={{
                                        // flexDirection: 'row',
                                        // marginTop: Platform.OS == 'ios' ? wide * 0.07 : wide * 0.02,
                                        top: Platform.OS == 'ios' ? 50 : 10,
                                        zIndex: 1, position: 'absolute',

                                        width: wide * 0.12, height: wide * 0.1,
                                        marginLeft: 10,
                                        alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <Image style={{
                                        width: wide * 0.09, height: wide * 0.09,
                                        borderRadius: wide * 0.03, borderWidth: 1,
                                        borderColor: Colors.borderColor,
                                        backgroundColor: Colors.base,

                                    }}
                                        source={require('../../Images/back_ico.png')}
                                    />
                                </TouchableOpacity> */}
                                <VideoPlay
                                    source={{ uri: this.state.videoUrlToPlay }}
                                    thumbnailUrl={this.state.videoThumbnail}
                                    onBackPress={() => this.handleChallengeModelClose()}
                                />
                            </SafeAreaView>
                        </Modal>
                        // <CommonVideoComponent
                        //     videoUrl={this.state.videoUrlToPlay}
                        //     closeVideoView={() => this.setState({ isPlayVideo: false })}
                        // />
                        :
                        null
                    }
                    {/* <AppLoader visible={this.state.loading} /> */}
                </KeyboardAvoidingView>

            </SafeAreaView >
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

export default connect(mapStateToProps)(Explore);
