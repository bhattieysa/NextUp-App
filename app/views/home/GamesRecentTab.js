
import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text,
    SafeAreaView, Image,
    ScrollView, TextInput,
    KeyboardAvoidingView, FlatList, Modal, StatusBar
} from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
    CommonStyles
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';
import { isNotch } from '../../utils/deviceInfo';
import { gameDetailRecentTab } from '../../actions/home';
import CommonVideoComponent from '../Messages/videoView/commonVideoComponent';
import FastImage from 'react-native-fast-image';
import SideBySideBarGraph from '../../components/common/SideBySideBar';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Title } from '../../components/common/titleLabel';
import { color } from 'react-native-reanimated';
import Orientation from 'react-native-orientation-locker';
import VideoPlay from '../../components/common/VideoPlay';
import { UserModel } from '../../constants/constant';


let wide = Layout.width;

class GamesRecentTab extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,
            strSelectedTab: 0,
            isPlayVideo: false,
            videoUrlToPlay: '',
            sideBySideBarData: [],
            videoThumbNail: '',
        };
    }
    componentDidMount() {
        this.setState({ loading: true }, () => {
            //this.props.navigation.state.params.gameId//162529400600804
            this.props.dispatch(gameDetailRecentTab(this.props.navigation.state.params.gameId, (res) => {
                if (res) {
                    const { gameDetailData } = this.props.Home
                    this._filterBarChartData(gameDetailData);
                }
                this.setState({ loading: false })
            }))
        })
    }

    _filterBarChartData = (data) => {
        var arr = [];
        if (data !== undefined && data !== null) {
            // var obj1 = data?.gameSummaryInfo?.gameStats[0]?.kpi;
            // var obj2 = data?.gameSummaryInfo?.gameStats[1]?.kpi;
            // obj1['RPG'] = 9.4
            // obj2['PPG'] = 8.4
            // obj1['JPG'] = 9.4
            // obj2['KPG'] = 8.4
            // obj1['LPG'] = 9.4
            // obj2['MPG'] = 8.4
            // obj1['LPG1'] = 9.4
            // obj2['MPG1'] = 8.4
            // obj1['LPG2'] = 9.4
            // obj2['MPG2'] = 8.4
            // arr.push(obj1)
            // arr.push(obj2)
            arr.push(data?.gameSummaryInfo?.gameStats[0]?.kpi)
            arr.push(data?.gameSummaryInfo?.gameStats[1]?.kpi)
        }
        this.setState({ sideBySideBarData: arr, loading: false })

    }


    _renderHighlights = (item, index) => {
        return (
            <TouchableOpacity style={{

                justifyContent: 'center',
                alignItems: 'center', marginRight: wide * 0.06
            }}
                activeOpacity={1}
                onPress={() => {
                    this.setState({
                        videoUrlToPlay: item.item.videoUrl,
                        videoThumbNail: item.item.thumbnailUrl,
                        isPlayVideo: true
                    })
                }}
            >


                <View style={{
                    backgroundColor: Colors.overlay2,
                    borderRadius: 10, marginTop: wide * 0.04,
                    height: wide * 0.3, width: wide * 0.6
                }}>
                    <FastImage style={{ width: '100%', height: '100%', position: 'absolute', borderRadius: 10 }}
                        source={{
                            uri: item.item.thumbnailUrl,
                            priority: FastImage.priority.high,
                        }}
                    />
                    <Text numberOfLines={2} style={{
                        color: Colors.light,
                        fontSize: 11, lineHeight: 14,
                        fontFamily: Fonts.Regular, textAlign: 'center',
                        alignSelf: 'flex-end', padding: wide * 0.03
                    }}>24 min</Text>
                    <View style={{
                        position: 'absolute', bottom: wide * 0.03, left: wide * 0.04,
                        flexDirection: 'row'
                    }}>

                        <Image style={{ width: 13, height: 13, position: 'absolute', }}
                            resizeMode={'contain'} source={require('../../Images/play_ico_tint.png')} />
                        <Text numberOfLines={2} style={{
                            color: Colors.light,
                            fontSize: 12, lineHeight: 14,
                            fontFamily: Fonts.Regular, marginLeft: wide * 0.032
                        }}> WATCH </Text>



                    </View>


                </View>

            </TouchableOpacity>
        );
    };
    _renderStats = (item) => {
        const { gameDetailData } = this.props.Home
        return (
            <View style={{
                height: wide * 0.08,
                marginVertical: 5,
            }}
            >
                {/* {item.index !== 2 ? */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        color: Colors.light, fontSize: 14,
                        lineHeight: 16, fontFamily: Fonts.Regular, marginHorizontal: 5, textAlign: 'left'
                    }}>{gameDetailData?.gameSummaryInfo?.summaryKpi?.challengerSummaryKpiValue[item.index]}</Text>
                    <Text style={{
                        color: Colors.overlayWhite, fontSize: 14,
                        lineHeight: 16, fontFamily: Fonts.Bold, marginHorizontal: 5, textAlign: 'center'
                    }}>{item.item}</Text>
                    <Text style={{
                        color: Colors.light, fontSize: 14,
                        lineHeight: 16, fontFamily: Fonts.Regular, marginHorizontal: 5, textAlign: 'right'
                    }}>{gameDetailData?.gameSummaryInfo?.summaryKpi?.defenderSummaryKpiValue[item.index]}</Text>
                </View>
                {/* //     :
                //     <View style={{ height: 1, backgroundColor: Colors.seperator, width: '100%' }} />
                // } */}





            </View>
        );
    };

    _renderPlayerStats = (item) => {
        const { gameDetailData } = this.props.Home
        return (
            <View style={{
                height: wide * 0.08,
                marginVertical: 5,
            }}
            >
                {/* {item.index !== 2 ? */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        color: Colors.light, fontSize: 14,
                        lineHeight: 16, fontFamily: Fonts.Regular, marginHorizontal: 5, textAlign: 'left'
                    }}>{gameDetailData?.gameSummaryInfo?.playerKpis?.challengerPlayingKpiValue[item.index]}</Text>
                    <Text style={{
                        color: Colors.overlayWhite, fontSize: 14,
                        lineHeight: 16, fontFamily: Fonts.Bold, marginHorizontal: 5, textAlign: 'center'
                    }}>{item.item}</Text>
                    <Text style={{
                        color: Colors.light, fontSize: 14,
                        lineHeight: 16, fontFamily: Fonts.Regular, marginHorizontal: 5, textAlign: 'right'
                    }}>{gameDetailData?.gameSummaryInfo?.playerKpis?.defenderPlayingKpiValue[item.index]}</Text>
                </View>
                {/* //     :
                //     <View style={{ height: 1, backgroundColor: Colors.seperator, width: '100%' }} />
                // } */}





            </View>
        );
    };
    _renderTeam = (item) => {
        // console.log('itmm', item)
        const { gameDetailData } = this.props.Home
        let content = [];
        return (
            <View style={{
                height: wide * 0.09,
                marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#2F3138',
                // backgroundColor: 'red'
            }}
            >

                <View style={{ paddingRight: 8, paddingLeft: 5, flex: 1 }}>
                    <Text style={{
                        color: Colors.light, fontSize: 14,
                        lineHeight: 16, fontFamily: Fonts.Regular, textAlign: 'left'
                    }}>{item.item.playerName}</Text>


                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>

                    {gameDetailData?.gameSummaryInfo?.kpiValue?.forEach(val => {
                        if (item.item.playerKpi.hasOwnProperty(val)) {
                            // console.log('jjj', item.item.playerKpi[val])
                            content.push(
                                < Text style={{
                                    color: Colors.light, fontSize: 14,
                                    lineHeight: 20, fontFamily: Fonts.Regular, marginRight: 8,
                                    width: 26,
                                    height: 20,
                                    textAlign: 'center',
                                    // backgroundColor: 'green'
                                }}>{item.item.playerKpi[val]}</Text>
                            )
                        } else {
                            content.push(
                                < Text style={{
                                    color: Colors.light, fontSize: 14,
                                    lineHeight: 20, fontFamily: Fonts.Regular, marginRight: 8,
                                    width: 26,
                                    height: 20,
                                    textAlign: 'center',
                                    // backgroundColor: 'green'
                                }}>10.5</Text>
                            )
                        }
                    })
                    }

                    {content}


                    {/* {item.item.playerKpi !== null ?
                        Object.keys(item.item.playerKpi).forEach(key => {
                            console.log('kshd', item.item.playerKpi[key]);
                            <Text style={{
                                color: Colors.light, fontSize: 14,
                                lineHeight: 16, fontFamily: Fonts.Regular,
                                marginHorizontal: 5, textAlign: 'center'

                            }}>{key}</Text>

                        })

                        // for (let key in item.item.playerKpi) {

                        // }
                        // item.item.playerKpi.map((val) => <Text style={{
                        //     color: Colors.light, fontSize: 14,
                        //     lineHeight: 16, fontFamily: Fonts.Regular, marginHorizontal: 5, width: wide * 0.06, textAlign: 'center'
                        // }}>{val}</Text>)
                        : null
                    } */}
                </View>

            </View >
        );
    };

    _renderNotablePlayer = (item, index) => {
        console.log('itmm--->>', item);
        return (
            <TouchableOpacity style={{
                width: wide * 0.6,
                height: wide * 0.4,
                flexDirection: 'row',
                // backgroundColor: 'red',
                marginRight: wide * 0.06,
                marginTop: wide * 0.02,
                flex: 1,
                marginHorizontal: 10
            }}
                activeOpacity={1}
            // onPress={() => {
            //     if (UserModel.selectedUserType.toUpperCase() === 'COACH') {
            //         Navigation.navigate('PlayerProfile', { playerId: item.item.playerId })

            //     }
            // }}
            >
                <View style={{
                    width: '40%', alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    <FastImage style={{
                        width: wide * 0.2, height: wide * 0.2,
                        borderRadius: wide * 0.2 / 2, borderWidth: 2,
                        borderColor: Colors.newGrayFontColor
                    }} source={{
                        uri: item.item.playerProfilePictureUrl,
                        priority: FastImage.priority.high,
                    }}
                    />
                    <FastImage
                        source={{ uri: item.item.teamLogoUrl, priority: FastImage.priority.high, }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: wide * 0.12,
                            height: wide * 0.12,

                        }}
                    />
                    {/* <TouchableOpacity style={{
                        width: wide * 0.3, height: wide * 0.2,
                        bottom: 0, position: 'absolute', alignItems: 'center'
                    }}>
                        <Image style={{
                            width: '96%', height: '96%',
                        }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
                        <View style={{ marginTop: -wide * 0.03 }}>
                            <Text
                                style={{ bottom: 10, color: Colors.light, fontFamily: Fonts.Bold, fontSize: 12 }} >
                                {item.item.position !== undefined ?
                                    item.item.position : ''}
                                {' | #'}
                                {item.item.rank !== undefined ? item.item.rank : ''}
                            </Text>
                        </View>
                    </TouchableOpacity> */}

                </View>

                <View style={{
                    marginHorizontal: wide * 0.01,
                    flex: 1,
                    justifyContent: 'space-around'
                }}>
                    {/* <View > */}
                    <View style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-evenly',
                        // width: '100%',
                    }}>
                        <View >
                            <Text style={{

                                color: Colors.light, fontSize: 20,
                                fontFamily: Fonts.Regular, lineHeight: 36,
                            }}>
                                {item.item.playerName}

                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: Colors.newGrayFontColor, fontFamily: Fonts.Bold, fontSize: 10,
                                    lineHeight: 12
                                }} >
                                Rank #
                                {item.item.rank !== undefined ? item.item.rank : ''}
                                {' | '}
                                {item.item.position !== undefined ?
                                    item.item.position : ''}


                            </Text>
                        </View>



                    </View>


                    {item.item.pgs !== undefined && item.item.pgs !== null ?
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: wide * 0.04,
                            justifyContent: 'space-between',
                            // backgroundColor: 'red',

                        }}>

                            <View >
                                <Text style={{
                                    color: Colors.newGrayFontColor, fontSize: 12, lineHeight: 12, fontFamily: Fonts.Regular,

                                }}>{Object.keys(item.item.pgs)[0].toUpperCase()}</Text>
                                <Text style={{
                                    color: Colors.light, fontSize: 18, lineHeight: 18, fontFamily: Fonts.Bold,
                                    marginTop: 6,
                                }}>
                                    {Object.values(item.item.pgs)[0]}
                                </Text>
                            </View>
                            <View >
                                <Text style={{
                                    color: Colors.newGrayFontColor, fontSize: 12, lineHeight: 12, fontFamily: Fonts.Regular,

                                }}>{Object.keys(item.item.pgs)[1].toUpperCase()}</Text>
                                <Text style={{
                                    color: Colors.light, fontSize: 18, lineHeight: 18, fontFamily: Fonts.Bold,
                                    marginTop: 6,
                                }}>
                                    {Object.values(item.item.pgs)[1]}
                                </Text>
                            </View>
                            <View >
                                <Text style={{
                                    color: Colors.newGrayFontColor, fontSize: 12, lineHeight: 12, fontFamily: Fonts.Regular,

                                }}>{Object.keys(item.item.pgs)[2].toUpperCase()}</Text>
                                <Text style={{
                                    color: Colors.light, fontSize: 18, lineHeight: 18, fontFamily: Fonts.Bold,
                                    marginTop: 6,
                                }}>
                                    {Object.values(item.item.pgs)[2]}
                                </Text>
                            </View>
                        </View>
                        : null
                    }

                    {/* </View> */}
                </View>
            </TouchableOpacity>


        )
    }

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
        const { strSelectedTab, isPlayVideo, videoUrlToPlay, videoThumbNail } = this.state;
        const { gameDetailData } = this.props.Home
        console.log("------->>>......", gameDetailData)
        // console.log(''gameDetailData?.gameSummaryInfo?.notablePlayers)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <View style={[CommonStyles.headerBottomLine]}>
                    <ScreenHeader
                        title={'Game Stats'}
                        backButtonAction={() => Navigation.back()}
                    />
                    {/* <TouchableOpacity onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.1, height: wide * 0.1,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1,
                            borderColor: Colors.borderColor, marginHorizontal: 10
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity> */}
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{
                            // marginHorizontal: 15,
                            // flex: 1,
                            marginTop: 20,
                            // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, 
                            paddingBottom: 20
                        }}>

                        <View style={{
                            // flex: 1,
                            backgroundColor: Colors.base,
                            // marginHorizontal: 15,
                            paddingBottom: wide * 0.15,
                        }} >
                            <TouchableOpacity style={{
                                backgroundColor: Colors.overlay2,
                                borderRadius: 10,
                                marginTop: wide * 0.01,
                                height: 180,
                                width: wide * 0.9,
                                marginHorizontal: 24,
                            }}
                                onPress={() => this.setState({
                                    videoUrlToPlay: gameDetailData?.fullMatchVideo?.videoUrl,
                                    videoThumbNail: gameDetailData?.fullMatchVideo?.videoUrl.thumbnailUrl,
                                    isPlayVideo: true
                                })}
                            >
                                <FastImage style={{ width: '100%', height: '100%', position: 'absolute', borderRadius: 10 }}
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{
                                        uri: gameDetailData?.fullMatchVideo?.thumbnailUrl,
                                        priority: FastImage.priority.high,
                                    }}
                                />
                                <Image style={{ width: '100%', height: '100%', position: 'absolute', }}
                                    resizeMode={'cover'} source={require('../../Images/Rect_dummy.png')} />
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
                                    }}> WATCH NOW</Text>



                                </View>
                                <View style={{
                                    marginTop: wide * 0.08,
                                    left: wide * 0.04, flexDirection: 'row', alignItems: 'flex-end'
                                }}>
                                    <Text style={{
                                        color: Colors.light,
                                        fontSize: 12,
                                        fontFamily: Fonts.SemiBold,
                                    }}>{gameDetailData?.challengerTeamInfo?.name}</Text>
                                    <Text style={{

                                        color: Colors.light,
                                        fontSize: 25,
                                        fontFamily: Fonts.SemiBold, paddingHorizontal: 5
                                    }}>{gameDetailData?.gameSummaryInfo?.score}</Text>
                                    <Text style={{
                                        color: Colors.light,
                                        fontSize: 12,
                                        fontFamily: Fonts.SemiBold,
                                    }}>{gameDetailData?.defenderTeamInfo?.name}</Text>
                                </View>
                                <Text style={{

                                    left: wide * 0.04,
                                    color: Colors.light,
                                    fontSize: 12,
                                    fontFamily: Fonts.Regular, width: wide * 0.6, marginTop: wide * 0.035
                                }}>{gameDetailData?.basicSummary}</Text>
                            </TouchableOpacity>
                            {gameDetailData?.highlightVideos !== null && gameDetailData?.highlightVideos !== undefined ?
                                <View style={{ marginTop: wide * 0.09 }}>

                                    <Title data={'Highlights'} />
                                    {/* <Text style={{
                                        color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
                                    }}>
                                        Highlights

                                    </Text> */}
                                    <FlatList
                                        style={{ marginHorizontal: 24 }}
                                        data={gameDetailData?.highlightVideos}
                                        renderItem={(item, index) => this._renderHighlights(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                    />
                                </View>
                                : null
                            }
                            {gameDetailData?.gameSummaryInfo?.notablePlayers !== null && gameDetailData?.gameSummaryInfo?.notablePlayers !== undefined ?
                                <View style={{ marginTop: wide * 0.09 }}>
                                    <Title data={'Notable Players'} />

                                    {/* <Text style={{
                                        color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
                                    }}>
                                        Player of the match

                                    </Text> */}


                                    <FlatList
                                        contentContainerStyle={{ marginBottom: 10 }}
                                        style={{
                                            width: '90%',
                                            marginHorizontal: 15,
                                        }}
                                        data={gameDetailData?.gameSummaryInfo?.notablePlayers}
                                        renderItem={(item, index) => this._renderNotablePlayer(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                    />

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ alignSelf: 'center', zIndex: 1 }}>

                                                <FastImage style={{
                                                    width: wide * 0.3, height: wide * 0.42,
                                                    borderRadius: wide * 0.03, borderWidth: 4,
                                                    borderColor: Colors.borderColor
                                                }} source={{ uri: gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.playerProfilePictureUrl }} />
                                                <TouchableOpacity style={{
                                                    width: wide * 0.3, height: wide * 0.2,
                                                    bottom: 0, position: 'absolute', alignItems: 'center'
                                                }}>
                                                    <Image style={{
                                                        width: '96%', height: '96%',
                                                    }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
                                                    <View style={{ marginTop: -wide * 0.03 }}>
                                                        <Text
                                                            style={{ bottom: 10, color: Colors.light, fontFamily: Fonts.Bold, fontSize: 12 }} >
                                                            {gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.position !== undefined ?
                                                                gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.position : ''}
                                                            {' | #'}
                                                            {gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.rank !== undefined ? gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.rank : ''}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>

                                            </View>



                                            <View style={{
                                                marginHorizontal: wide * 0.05,
                                                flex: 1
                                            }}>
                                                <View >
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        width: '100%'
                                                    }}>


                                                        <View>
                                                            <Text style={{

                                                                color: Colors.light, fontSize: 32,
                                                                fontFamily: Fonts.Regular, lineHeight: 40, width: wide * 0.2
                                                            }}>
                                                                {gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.playerName}

                                                            </Text>

                                                        </View>
                                                        <View style={{ flex: 1 }} />
                                                        <FastImage
                                                            source={{ uri: gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.teamLogoUrl }}
                                                            resizeMode="contain"
                                                            style={{
                                                                width: wide * 0.12,
                                                                height: wide * 0.12,

                                                            }}
                                                        />

                                                    </View>


                                                    {gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.pgs !== undefined && gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.pgs !== null ?
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            width: '100%', marginTop: wide * 0.06,
                                                            justifyContent: 'space-between'
                                                        }}>

                                                            <View >
                                                                <Text style={{
                                                                    color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

                                                                }}>{Object.keys(gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.pgs)[0].toUpperCase()}</Text>
                                                                <Text style={{
                                                                    color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
                                                                    marginTop: 6,
                                                                }}>
                                                                    {Object.values(gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.pgs)[0]}
                                                                </Text>
                                                            </View>
                                                            <View >
                                                                <Text style={{
                                                                    color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

                                                                }}>{Object.keys(gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.pgs)[1].toUpperCase()}</Text>
                                                                <Text style={{
                                                                    color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
                                                                    marginTop: 6,
                                                                }}>
                                                                    {Object.values(gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.pgs)[1]}
                                                                </Text>
                                                            </View>
                                                            <View >
                                                                <Text style={{
                                                                    color: Colors.fontColorGray, fontSize: 13,
                                                                    fontFamily: Fonts.Bold,

                                                                }}>{Object.keys(gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.pgs)[2].toUpperCase()}</Text>
                                                                <Text style={{
                                                                    color: Colors.light, fontSize: 22,
                                                                    fontFamily: Fonts.Bold,
                                                                    marginTop: 6,
                                                                }}>
                                                                    {Object.values(gameDetailData?.gameSummaryInfo?.notablePlayers[0]?.pgs)[2]}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        : null
                                                    }

                                                </View>
                                            </View>


                                        </View> */}
                                    {/* </View> */}
                                </View>
                                : null
                            }

                            {/* Game stat need to add in graph                     */}

                            {gameDetailData?.gameSummaryInfo !== null && gameDetailData?.gameSummaryInfo !== undefined ?
                                <View style={{ marginTop: 30 }}>
                                    <Title data={'Summary'} />

                                    {/* <Text style={{
                                        color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
                                    }}>
                                        Summary

                                    </Text> */}

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        marginTop: wide * 0.02,
                                        // backgroundColor: 'red',
                                        alignItems: 'center'
                                    }}
                                    >

                                        <FastImage
                                            source={{
                                                uri: gameDetailData?.challengerTeamInfo?.logoUrl,
                                                priority: FastImage.priority.high,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{
                                                width: wide * 0.1,
                                                height: wide * 0.09,

                                            }}
                                        />

                                        <Text style={{
                                            color: Colors.light, fontSize: 14,
                                            lineHeight: 20, fontFamily: Fonts.Regular,
                                            width: wide * 0.2, textAlign: 'center'
                                        }}>Team Stats</Text>
                                        <FastImage
                                            source={{
                                                uri: gameDetailData?.defenderTeamInfo?.logoUrl,
                                                priority: FastImage.priority.high,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{
                                                width: wide * 0.1,
                                                height: wide * 0.09,

                                            }}
                                        />
                                    </View>
                                    <View style={{
                                        // height: this.state.sideBySideBarData[0] !== undefined ? (
                                        //     Object.keys(this.state.sideBySideBarData[0]).length < 8 ? wide * 0.54
                                        //         : wide * 0.65)
                                        //     : 0,
                                        width: '95%',
                                        marginTop: 10,
                                        marginHorizontal: 15,
                                        // backgroundColor: 'green',
                                        // overflow: 'hidden',
                                        justifyContent: this.state.sideBySideBarData[0] !== undefined ? (
                                            Object.keys(this.state.sideBySideBarData[0]).length > 8 ? 'center'
                                                : null)
                                            : null,
                                        // flex: 1,

                                    }}>
                                        {this.state.sideBySideBarData !== undefined && this.state.sideBySideBarData.length > 0 ?
                                            <SideBySideBarGraph pgsData={this.state.sideBySideBarData} />
                                            : null
                                        }
                                    </View>

                                    <View style={{
                                        // backgroundColor: Colors.overlay2,
                                        borderRadius: wide * 0.06,
                                        marginTop: wide * 0.04,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            // width: wide * 0.4,
                                            padding: wide * 0.04,
                                            // backgroundColor: 'green',
                                            // marginHorizontal: wide / 4,
                                            alignItems: 'center'
                                        }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    onPress={() => this.setState({ strSelectedTab: 0 })}
                                                    style={{
                                                        borderBottomColor: Colors.light,
                                                        borderBottomWidth: strSelectedTab === 0 ? 2 : 0
                                                    }}
                                                >
                                                    <Text style={{
                                                        color: strSelectedTab === 0 ? Colors.light : Colors.overlayWhite
                                                        , fontSize: 16, lineHeight: 24, fontFamily: Fonts.Bold,

                                                    }}>
                                                        {gameDetailData?.challengerTeamInfo?.name}

                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    onPress={() => this.setState({ strSelectedTab: 1 })}
                                                    style={{
                                                        marginLeft: 15,
                                                        borderBottomColor: Colors.light,
                                                        borderBottomWidth: strSelectedTab === 1 ? 2 : 0
                                                    }}
                                                >
                                                    <Text style={{
                                                        color: strSelectedTab === 1 ? Colors.light : Colors.overlayWhite,
                                                        fontSize: 16, lineHeight: 24, fontFamily: Fonts.SemiBold,
                                                    }}>
                                                        {/* Goldan Figma */}
                                                        {gameDetailData?.defenderTeamInfo?.name}

                                                    </Text>
                                                </TouchableOpacity>
                                                {/* <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ strSelectedTab: 2 })}>
                                                    <Text style={{
                                                        color: strSelectedTab === 2 ? Colors.light : Colors.overlayWhite
                                                        , fontSize: 18, fontFamily: Fonts.Bold,
                                                    }}>
                                                        Stats

                                                    </Text>
                                                </TouchableOpacity> */}
                                            </View>


                                        </View>
                                        <ScrollView
                                            horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                                            bounces={false}
                                        >

                                            {
                                                strSelectedTab === 0 || strSelectedTab === 1 ?
                                                    <FlatList
                                                        bounces={false}
                                                        style={{ flex: 1, paddingHorizontal: wide * 0.05 }}
                                                        // data={strSelectedTab === 0 ? gameDetailData?.gameSummaryInfo?.scoreCardKpi?.challengerScoreCardValue
                                                        //     : gameDetailData?.gameSummaryInfo?.scoreCardKpi?.defenderScoreCardValue}
                                                        data={strSelectedTab === 0 ? gameDetailData?.gameSummaryInfo?.challengerTeamKpi
                                                            : gameDetailData?.gameSummaryInfo?.defenderTeamKpi}
                                                        renderItem={(item, index) => this._renderTeam(item, index)}
                                                        stickyHeaderIndices={[0]}
                                                        ListHeaderComponent={() => <View style={{
                                                            height: wide * 0.08,
                                                            paddingVertical: 5, flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            // backgroundColor: 'green'
                                                        }}
                                                        >

                                                            <View style={{ paddingHorizontal: 10, flex: 1, }}>
                                                                <Text style={{
                                                                    color: Colors.overlayWhite, fontSize: 14,
                                                                    lineHeight: 16, fontFamily: Fonts.Bold
                                                                }}>Player</Text>



                                                            </View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                                {
                                                                    gameDetailData?.gameSummaryInfo?.kpiValue?.map((val) => <Text style={{
                                                                        color: Colors.overlayWhite, fontSize: 14,
                                                                        lineHeight: 20, fontFamily: Fonts.Regular, marginRight: 8,
                                                                        width: 26, height: 20, textAlign: 'center',
                                                                    }}>{val}</Text>)

                                                                }
                                                            </View>

                                                        </View>}
                                                        showsHorizontalScrollIndicator={false}
                                                    />
                                                    : strSelectedTab === 2 ?
                                                        <>
                                                            <FlatList
                                                                style={{ flex: 1, paddingHorizontal: wide * 0.06 }}
                                                                // data={gameDetailData?.gameSummaryInfo?.summaryKpi?.name}
                                                                data={gameDetailData?.gameSummaryInfo?.kpiValue}
                                                                renderItem={(item, index) => this._renderStats(item, index)}
                                                                stickyHeaderIndices={[0]}
                                                                // ListHeaderComponent={() => <View style={{

                                                                //     paddingBottom: 20, flexDirection: 'row',
                                                                //     justifyContent: 'space-between'
                                                                // }}
                                                                // >

                                                                //     <FastImage
                                                                //         source={{ uri: gameDetailData?.challengerTeamInfo?.logoUrl }}
                                                                //         resizeMode="contain"
                                                                //         style={{
                                                                //             width: wide * 0.12,
                                                                //             height: wide * 0.08,

                                                                //         }}
                                                                //     />

                                                                //     <Text style={{
                                                                //         color: Colors.light, fontSize: 14,
                                                                //         lineHeight: 30, fontFamily: Fonts.Regular, marginHorizontal: 5, width: wide * 0.2, textAlign: 'center'
                                                                //     }}>Team Stats</Text>
                                                                //     <FastImage
                                                                //         source={{ uri: gameDetailData?.defenderTeamInfo?.logoUrl }}
                                                                //         resizeMode="contain"
                                                                //         style={{
                                                                //             width: wide * 0.12,
                                                                //             height: wide * 0.08,

                                                                //         }}
                                                                //     />



                                                                // </View>}
                                                                showsHorizontalScrollIndicator={false}
                                                            />
                                                            <FlatList
                                                                style={{ flex: 1, paddingHorizontal: wide * 0.06 }}
                                                                // data={gameDetailData?.gameSummaryInfo?.playerKpis?.name}
                                                                data={gameDetailData?.gameSummaryInfo?.kpiValue}
                                                                renderItem={(item, index) => this._renderPlayerStats(item, index)}
                                                                stickyHeaderIndices={[0]}
                                                                ListHeaderComponent={() => <View style={{

                                                                    paddingBottom: 20, flexDirection: 'row',
                                                                    justifyContent: 'space-between'
                                                                }}
                                                                >

                                                                    <View style={{ height: 1, backgroundColor: Colors.seperator, width: '100%' }} />



                                                                </View>}
                                                                showsHorizontalScrollIndicator={false}
                                                            />
                                                        </>
                                                        :
                                                        null
                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                                : null
                            }
                        </View>

                    </ScrollView>
                    {isPlayVideo ?

                        <Modal visible={this.state.isPlayVideo} animationType="slide"
                            supportedOrientations={['portrait', 'landscape']}
                        >
                            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                                {/* <TouchableOpacity
                                    onPress={() => this.handleChallengeModelClose()}

                                    style={{
                                        // flexDirection: 'row',
                                        // marginTop: Platform.OS == 'ios' ? wide * 0.07 : wide * 0.02,
                                        top: Platform.OS == 'ios' ? isNotch ? 50 : 8 : 10,
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
                                    source={{ uri: videoUrlToPlay }}
                                    thumbnailUrl={videoThumbNail}
                                    onBackPress={() => this.handleChallengeModelClose()}
                                />

                            </SafeAreaView>
                        </Modal>


                        // <CommonVideoComponent
                        //     videoUrl={videoUrlToPlay}
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
        User: entities.user,
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(GamesRecentTab);
