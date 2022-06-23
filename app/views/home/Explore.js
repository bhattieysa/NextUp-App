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
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
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
        this.props.navigation.addListener('didFocus', this.onScreenFocus)
    }

    onScreenFocus = async () => {
        debugger
        this.callLeaderBoardApi()
    }

    callLeaderBoardApi() {
        debugger
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(leaderBoardFeed(obj, {
                    "name": "Loc",
                    "loc": {
                        "type": "Point",
                        "coordinates": [
                            6565656.89,
                            8989898.9
                        ]
                    }
                }, (res) => {
                    this.setState({ loading: false })
                    debugger
                }))
            })

        })
    }

    _renderLeadingPlayer = (item, index) => {
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


    render() {
        const { arrayPlayers,
            arrayTeams, cityName, lastLat, lastLong } = this.state
        const { leaderBoardData, gameInfoTabData } = this.props.Home
        console.log('Dataaaa', leaderBoardData);

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
