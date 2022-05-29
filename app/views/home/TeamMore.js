
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

import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { color } from 'react-native-reanimated';
import { getObject } from '../../middleware';
import { getTeamMoreNew } from '../../actions/home';
import FastImage from 'react-native-fast-image';

let wide = Layout.width;
let pageNum = 0;

// const playrData = [
//     {
//         "teamId": null,
//         "userId": 163188828525507,
//         "position": "Center",
//         "rank": 20,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": null,
//         "teamLogoUrl": null,
//         "userName": "lebron james",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "F"
//     },
//     {
//         "teamId": 163774030859802,
//         "userId": 163188828525517,
//         "position": "Center",
//         "rank": 1,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": "Golden figma",
//         "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
//         "userName": "lebron james",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "C"
//     },
//     {
//         "teamId": 163774354906804,
//         "userId": 163188828525527,
//         "position": "Center",
//         "rank": 1,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": "Golden slack",
//         "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
//         "userName": "lebron james",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "C"
//     },
//     {
//         "teamId": null,
//         "userId": 163188828525537,
//         "position": "Center",
//         "rank": 1,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": null,
//         "teamLogoUrl": null,
//         "userName": "lebron james",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "C"
//     },
//     {
//         "teamId": 163774067791005,
//         "userId": 163188828525547,
//         "position": "Center",
//         "rank": 1,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": "Golden figma",
//         "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
//         "userName": "lebron james",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "C"
//     },
//     {
//         "teamId": 163338618530605,
//         "userId": 1632112239690909,
//         "position": "Center",
//         "rank": 1,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": "WP Tigers ",
//         "teamLogoUrl": "https://firebasestorage.googleapis.com/v0/b/nextup-ccc80.appspot.com/o/c5486083-46a9-4fa0-8d5a-d8dae3dc87f5.jpg?alt=media",
//         "userName": "lebron james",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "C"
//     },

//     {
//         "teamId": null,
//         "userId": 163188828525507,
//         "position": "Center",
//         "rank": 12,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": null,
//         "teamLogoUrl": null,
//         "userName": "Mike larryy jamison",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "A"
//     },
//     {
//         "teamId": 163774030859802,
//         "userId": 163188828525517,
//         "position": "Center",
//         "rank": 8,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": "Golden figma",
//         "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
//         "userName": "lebron",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "U"
//     },
//     {
//         "teamId": 163774354906804,
//         "userId": 163188828525527,
//         "position": "Center",
//         "rank": 3,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": "Golden slack",
//         "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
//         "userName": "Jim garry",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "B"
//     },
//     {
//         "teamId": null,
//         "userId": 163188828525537,
//         "position": "Center",
//         "rank": 5,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": null,
//         "teamLogoUrl": null,
//         "userName": "Mike Tison",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "A"
//     },
//     {
//         "teamId": 163774067791005,
//         "userId": 163188828525547,
//         "position": "Center",
//         "rank": 0,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": "Golden figma",
//         "teamLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png",
//         "userName": "Sam Jamison",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "N"
//     },
//     {
//         "teamId": 163338618530605,
//         "userId": 1632112239690909,
//         "position": "Center",
//         "rank": 14,
//         "pgs": null,
//         "kpiValue": null,
//         "playerName": null,
//         "teamName": "WP Tigers ",
//         "teamLogoUrl": "https://firebasestorage.googleapis.com/v0/b/nextup-ccc80.appspot.com/o/c5486083-46a9-4fa0-8d5a-d8dae3dc87f5.jpg?alt=media",
//         "userName": "Carl patison",
//         "userProfilePic": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "positionInChars": "C"
//     }
// ]

class TeamMore extends Component {
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

            selectedSort: 'rank',
            sortOrder: 'desc'
        };
    }
    componentDidMount() {
        pageNum = 0;
        this.onScreenFoucs();

    }

    onScreenFoucs = () => {
        const { selectedSort, sortOrder } = this.state;
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(getTeamMoreNew(obj, pageNum, selectedSort, sortOrder, (res, resData) => {
                    debugger
                    if (res) {
                        console.log('TeammmmmDattta---', resData);
                        var topPlayer = [];
                        if (resData.length > 0) {
                            let resLength = resData.length;
                            for (let i = 0; i < resLength; i++) {
                                topPlayer.push(resData.shift());
                                if (i == 2) {
                                    break
                                }
                            }
                        }
                        // topPlayer.push(resData.shift());
                        // var topPlayer1 = resData.shift();
                        // var topPlayer2 = resData.shift();
                        this.setState({
                            loading: false,
                            // initialDataList: resData,
                            topRankerData: topPlayer,
                            dataList: resData,

                        })
                        if (resData.length == 0) {
                            this.setState({ selectedSort: '', sortOrder: '', loading: false, })
                        }
                        // this.setState({ loading: false, })
                    } else {
                        this.setState({ loading: false, dataList: [] })
                    }
                    // this.setInitialOffSet();
                }))
            })

        })
    }

    apiCall = (strTxt) => {
        getObject('UserId').then((obj) => {

            this.props.dispatch(getPlayerMoreSearch(obj, strTxt, (res, resData) => {

                // debugger
                // this.setState({ topRankerData: resData.shift() })
                this.setState({ loading: false, dataList: resData })


            }))
        })


    }


    //new team player render method by Keshav
    _renderNewTeam = ({ item }) => {
        console.log("----->>  ", item)
        return (
            <View style={{
                width: '100%', flexDirection: 'row',
                justifyContent: 'space-between',
                height: wide * 0.1, marginTop: 10,
            }}>

                <View style={{
                    width: '15%',
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
                        {item.name}
                    </Text>
                </View>


                <View style={{ width: '25%', alignItems: 'center', }}>
                    <Text style={{
                        color: Colors.light, fontSize: 13,
                        lineHeight: 15, fontFamily: Fonts.Regular,
                    }}>{item.wins}</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center', }}>
                    <Text style={{
                        color: Colors.light, fontSize: 13,
                        lineHeight: 15, fontFamily: Fonts.Regular,
                    }}>
                        {item.loss}
                    </Text>
                </View>

            </View>
        );
    };

    _renderLeadingTeam = (item, index) => {
        return (
            <View style={{
                flexDirection: 'row',
                // alignItems: 'center',
                // backgroundColor: 'green',
                width: wide * 0.36,
                marginLeft: wide * 0.01,
                // padding: 10,
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
                    marginLeft: wide * 0.03,
                    justifyContent: 'center'
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
                        {item.item.logoUrl != null ?
                            <FastImage style={{ width: '94%', height: '94%', borderRadius: wide * 0.16 / 2, }}
                                // resizeMode={'contain'}
                                source={{
                                    uri: item.item.logoUrl,
                                    priority: FastImage.priority.high
                                }}
                            />
                            :
                            null
                        }
                    </View>


                    <View style={{ marginTop: wide * 0.01 }}>
                        <Text numberOfLines={2} style={{
                            color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
                            lineHeight: 18
                        }}>{item.item.name}</Text>

                    </View>
                </View>

            </View>
        )
    }

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
                <FastImage style={{
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
        // console.log(dataList);
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
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
                                }} source={require('../../Images/back_ico.png')} />
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



                    </View>

                </View>
                {topRankerData.length === 0 ?
                    <View style={{ flex: 1, backgroundColor: Colors.base }}>
                        <AppLoader visible={this.state.loading} />
                    </View>
                    :
                    <>

                        <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                            {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                                // marginHorizontal: 15,
                                // backgroundColor: 'red',
                                minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10
                            }}> */}

                            <View style={{ backgroundColor: Colors.base, alignItems: 'center', paddingBottom: wide * 0.01 }} >

                                <View style={{ marginTop: wide * 0.05, width: '90%' }}>
                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        style={{ overflow: 'visible', width: '100%', }}
                                        data={topRankerData}
                                        renderItem={(item, index) => this._renderLeadingTeam(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal

                                    />

                                </View>

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
                                            }}>TEAM NAME</Text>
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
                                                    this.setState({ selectedSort: 'wins', sortOrder: sortOrder == 'asc' ? 'desc' : 'asc' }, () => {
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
                                            }}>WINS</Text>
                                            {selectedSort == 'wins' ?
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
                                                    this.setState({ selectedSort: 'loss', sortOrder: sortOrder == 'asc' ? 'desc' : 'asc' }, () => {
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
                                            }}>LOSS</Text>
                                            {selectedSort == 'loss' ?
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

                                    </View>

                                </View>

                                <FlatList
                                    bounces={false}
                                    style={{
                                        width: '90%',
                                        marginTop: wide * 0.01,
                                        marginBottom: wide * 0.02,
                                        height: '60%'
                                    }}
                                    data={dataList}
                                    // data={playrData}
                                    renderItem={(item, index) => this._renderNewTeam(item)}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}

                                />
                                {/* {dataList.length > 0 && pageNum == 0 ? */}
                                <View style={{
                                    width: '90%', height: 50,
                                    marginTop: wide * 0.01,
                                    flexDirection: 'row',
                                    alignSelf: 'center', justifyContent: 'space-between'

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
                                        borderColor: Colors.newGrayFontColor,
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
                                {/* : null
                                } */}


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

export default connect(mapStateToProps)(TeamMore);
