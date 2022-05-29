import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Keyboard } from 'react-native';
import { Layout, Colors, Fonts, } from '../../constants';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { SHOW_SHARE_SCREEN, SenderRecevrModel } from '../../constants/constant';
import { getPlayerForShare, getUserInfo } from '../../actions/home';
import { sendBulkMessage } from '../../actions/chat';
import { getObject } from '../../middleware';


let wide = Layout.width;

// let playerCategories = [
//     "PURE_SHOOTER",
//     "SLASHER",
//     "PURE_PLAYMAKER",
//     "VERSATILE_BIG",
//     "SHOT_BLOCKING_FINISHER",
//     "POINT_FORWARD",
//     "KNOCKDOWN_FACILIATOTR",
//     "ALL_AROUND_GAME"
// ]

// let playerData = [
//     {
//         "name": "lebron",
//         "profilePicUrl": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "playerId": 163188828525507,
//         "rank": 1,
//         "playingPosition": "Center",
//         "playerCategory": "PURE_SHOOTER"
//     },
//     {
//         "name": "lebron james",
//         "profilePicUrl": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "playerId": 163188828525508,
//         "rank": 1,
//         "playingPosition": "Center",
//         "playerCategory": "PURE_SHOOTER"
//     },
//     {
//         "name": "lebron1",
//         "profilePicUrl": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "playerId": 163188828525529,
//         "rank": 1,
//         "playingPosition": "Center",
//         "playerCategory": "SLASHER"
//     },
//     {
//         "name": "lebron james2",
//         "profilePicUrl": "https://media.gettyimages.com/photos/profile-of-lebron-james-of-the-cleveland-cavaliers-during-a-break-in-picture-id456706452?s=2048x2048",
//         "playerId": 163188828525528,
//         "rank": 1,
//         "playingPosition": "Center",
//         "playerCategory": "SLASHER"
//     }
// ]

class ShareScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sharedData: props.navigation.state.params.shareData,
            sharedMimeType: props.navigation.state.params.shareMimeType,
            sharedExtraData: null,
            selectedPlayerCategory: 'PURE_SHOOTER',
            showModal: false,
            selectedCat: [],
            selectedPlayer: [],
            selectedPlayerId: [],
            playerCategories: [],
            playerData: [],
            textMsg: '',
            msgCount: 0,
            isSendBtnEnable: false,
            srchTxt: '',
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus)
    }

    onScreenFocus = () => {
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                debugger;
                this.props.dispatch(getPlayerForShare(obj, (res, data) => {
                    if (res) {
                        debugger;
                        console.log("Share Ressss--", data);
                        this.setState({ playerData: data.playerBasicInfoForShares, playerCategories: data.playerCategories, loading: false })
                    }
                }))

                this.props.dispatch(getUserInfo(obj, (res, data) => {
                    debugger
                    setTimeout(() => {
                        if (res) {
                            SenderRecevrModel.senderId = data.id;
                            SenderRecevrModel.senderName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
                            SenderRecevrModel.senderProfilePic = data.personalInfo.profilePictureURL;
                            SenderRecevrModel.senderType = data.typeOfUser;
                        }

                    }, 500);
                }));
            })

        })
    }

    handleShareData = () => {
        const { selectedPlayer, textMsg, sharedData } = this.state;
        const curr_time = Date.now();
        this.setState({ loading: true });
        if (selectedPlayer.length > 0 && selectedPlayer !== null) {
            var msgArr = [];
            selectedPlayer.forEach(obj => {
                let msgObj = {
                    "createdAt": curr_time,
                    "message": textMsg.length === 0 ? null : textMsg,
                    "urlContent": sharedData,
                    "receiverId": obj.playerId,
                    "receiverName": obj.name,
                    "receiverProfilePictureUrl": obj.profilePicUrl,
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
                    this.setState({ showModal: false, textMsg: '', msgCount: 0, loading: false })
                    SHOW_SHARE_SCREEN.show = false;
                    Navigation.back();
                }
            }));

        } else {
            alert('Please select players to share.')
        }
    }

    // setSenderDetails = () => {
    //     getObject('UserId').then((obj) => {
    //         this.props.dispatch(getUserInfo(obj, (res, data) => {
    //             debugger
    //             if (res) {
    //                 SenderRecevrModel.senderId = data.id;
    //                 SenderRecevrModel.senderName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
    //                 SenderRecevrModel.senderProfilePic = data.personalInfo.profilePictureURL;
    //                 SenderRecevrModel.senderType = data.typeOfUser;
    //             }
    //         }));
    //     })

    // }

    _renderPlayerData = (playerObj, compare_cat) => {

        debugger
        if (playerObj?.playerCategory === compare_cat) {
            debugger
            console.log('Playeritem--->', playerObj, '----> ', compare_cat)
            return (
                <TouchableOpacity
                    style={{
                        width: wide * 0.9,
                        height: wide * 0.26,
                        marginVertical: wide * 0.02,
                        marginHorizontal: wide * 0.012,
                        justifyContent: "center",
                    }}
                >
                    <Image style={{
                        position: 'absolute', width: '100%', height: '100%', left: 0,
                    }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent: 'space-between' }}>

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
                                {playerObj.profilePicUrl === null ?
                                    null
                                    :
                                    <FastImage style={{
                                        width: '95%', height: '95%',
                                        borderRadius: wide * 0.15 / 2,
                                    }}
                                        resizeMode={'cover'}
                                        source={{ uri: playerObj.profilePicUrl }} />
                                }
                                <View style={{ top: wide * 0.15, position: 'absolute' }}>
                                    <Text style={{
                                        color: Colors.light, fontSize: 12, fontFamily: Fonts.Bold,
                                    }}>
                                        #{playerObj.rank}
                                    </Text>

                                </View>

                            </View>
                            <View style={{ paddingLeft: 10, paddingTop: 10 }}>
                                {playerObj.name !== null ?
                                    <Text style={{
                                        color: Colors.fontColorGray, fontSize: 14, fontFamily: Fonts.Bold,
                                        lineHeight: 14,

                                    }}>{playerObj.name}</Text>
                                    : null
                                }
                                {playerObj.playingPosition !== null ?
                                    <Text style={{
                                        color: Colors.light, fontSize: 12, fontFamily: Fonts.Bold,
                                        marginVertical: 6, lineHeight: 14,
                                    }}>
                                        {playerObj.playingPosition}
                                    </Text>
                                    : null
                                }

                            </View>
                        </View>

                        {this.state.selectedPlayerId.includes(playerObj.playerId) ?
                            <TouchableOpacity style={{
                                width: wide * 0.08, height: wide * 0.08, borderRadius: (wide * 0.08) / 2,
                                // backgroundColor: 'red',
                                backgroundColor: Colors.btnBg,
                                justifyContent: 'center', alignItems: 'center', right: 20,
                            }}
                                activeOpacity={1}
                                onPress={() => this._handleSinglePlayerSelection(playerObj)}
                            >
                                <Image
                                    source={require("../../Images/check_Icon.png")}
                                    style={{ width: wide * 0.06, height: wide * 0.06, tintColor: Colors.light }}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{
                                width: wide * 0.08, height: wide * 0.08, borderRadius: (wide * 0.08) / 2,
                                // backgroundColor: 'red',
                                backgroundColor: Colors.teamTabSelectedCheckBg,
                                justifyContent: 'center', alignItems: 'center', right: 20,
                            }}
                                activeOpacity={1}
                                onPress={() => this._handleSinglePlayerSelection(playerObj)}
                            >
                                <Image
                                    source={require("../../Images/check_Icon.png")}
                                    style={{ width: wide * 0.06, height: wide * 0.06, tintColor: Colors.teamTabPlayerCardBorder, }}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                        }

                        {/* <View style={{
                            width: wide * 0.15, height: wide * 0.15,
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
                                    borderRadius: wide * 0.15 / 2,
                                }}
                                    resizeMode={'contain'}
                                    source={{ uri: item.item.teamLogoUrl[0] }} />
                            }

                        </View> */}
                    </View>

                </TouchableOpacity>
            )

        }

    }

    _handleSinglePlayerSelection = (playerObj) => {
        debugger
        const { selectedCat, selectedPlayer, selectedPlayerId } = this.state;
        console.log('---player', playerObj);
        // this.setState({ loading: true })
        var arr = [];
        var arr1 = [];
        var cat_arr = [];
        debugger
        if (selectedPlayerId.includes(playerObj.playerId)) {

            arr = selectedPlayer.filter(obj => {
                return obj.playerId !== playerObj.playerId;
            })

            arr1 = selectedPlayerId.filter(obj => {
                return obj !== playerObj.playerId;
            })
            cat_arr = selectedCat.filter(obj => {
                return obj !== playerObj.playerCategory;
            })
            debugger
            if (arr1.length == 0) {
                this.setState({ isSendBtnEnable: false })
            } else {
                this.setState({ isSendBtnEnable: true })
            }
            this.setState({ selectedPlayer: arr, selectedPlayerId: arr1, selectedCat: cat_arr })
        } else {
            if (this.state.selectedPlayer.length > 0) {
                arr = [...this.state.selectedPlayer];
                arr1 = [...this.state.selectedPlayerId];
            }

            arr.push(playerObj);
            arr1.push(playerObj.playerId);
            debugger
            this.setState({ selectedPlayer: arr, selectedPlayerId: arr1, isSendBtnEnable: true })
        }

    }

    _handleCategorySelect = (obj) => {
        debugger
        const { selectedCat, selectedPlayer, selectedPlayerId, playerData } = this.state;
        var arr = [...selectedCat];
        var arr1 = [...selectedPlayer];
        var arr2 = [...selectedPlayerId];
        debugger
        if (selectedCat.includes(obj)) {
            arr2 = [];
            arr = arr.filter((catObj) => {
                return catObj !== obj;
            })

            arr1 = arr1.filter((playObj) => {
                return playObj.playerCategory !== obj;
            })

            arr1.forEach((playerObj) => {
                arr2.push(playerObj.playerId);
            })
            // selectedCat.forEach(catObj => {
            //     if (catObj === obj) {
            //         arr.pop(catObj);
            //     }
            //     // return catObj !== obj;
            // });
            // selectedPlayer.forEach(playObj => {
            //     if (playObj.playerCategory === obj) {
            //         arr1.pop(playObj);
            //         arr2.pop(playObj.playerId);
            //     }
            //     // playObj.playerCategory !== obj;
            // });
            debugger
            if (arr2.length == 0) {
                this.setState({ isSendBtnEnable: false })
            } else {
                this.setState({ isSendBtnEnable: true })

            }
            debugger
            this.setState({ selectedCat: arr, selectedPlayer: arr1, selectedPlayerId: arr2, })
        } else {
            // arr = [...selectedCat];
            // arr1 = [...selectedPlayer];
            // arr2 = [...selectedPlayerId]
            debugger
            arr.push(obj);
            playerData.forEach(itm => {
                if (itm.playerCategory === obj) {
                    arr1.push(itm);
                    arr2.push(itm.playerId)
                }
            })
            debugger
            this.setState({ selectedCat: arr, selectedPlayer: arr1, selectedPlayerId: arr2, isSendBtnEnable: true })
        }
    }

    _handleBackPress = () => {
        SHOW_SHARE_SCREEN.show = false;
        Navigation.back()
    }

    render() {
        const { sharedMimeType, sharedData, sharedExtraData,
            selectedPlayerCategory, playerCategories, playerData, isSendBtnEnable } = this.state
        // console.log("Share Data", sharedMimeType, "...", sharedData, '..Extra', sharedExtraData);
        console.log('datttaa-- ', playerData);
        return (
            <>
                {/* {this.state.loading === true ?
                    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                        <AppLoader visible={this.state.loading} />
                    </SafeAreaView>
                    : */}
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base, }}>
                    <AppLoader visible={this.state.loading} />
                    <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, flexDirection: 'row', opacity: this.state.showModal === true ? 0.1 : 1 }}>
                        <TouchableOpacity onPress={this._handleBackPress}>
                            <Image style={{
                                width: wide * 0.1, height: wide * 0.1,
                                marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                            }} source={require('../../Images/back_ico.png')} />
                        </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, opacity: this.state.showModal === true ? 0.1 : 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                        <View style={{ backgroundColor: Colors.base, }} >
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                alignItems: 'center', width: '90%', marginHorizontal: 15,
                                height: wide * 0.08, marginTop: wide * 0.03
                            }}>
                                {/* <TouchableOpacity onPress={() => this.setState({ showModal: true })}> */}
                                <Text style={{
                                    color: Colors.light, fontSize: 18,
                                    lineHeight: 18,
                                    fontFamily: Fonts.Bold,
                                }}>All Players</Text>
                                {/* </TouchableOpacity> */}
                                {/* <TouchableOpacity>
                                        <Text style={{
                                            color: Colors.btnBg, fontSize: 12,
                                            lineHeight: 12,
                                        }}>Select All</Text>
                                    </TouchableOpacity> */}
                            </View>
                            <View style={{ marginTop: wide * 0.04, marginHorizontal: 15 }}>
                                <TextInput style={{
                                    borderWidth: 3, borderColor: Colors.borderColor,
                                    fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.1,
                                    borderRadius: 5, color: Colors.light, fontSize: 16
                                }}
                                    autoCorrect={false}
                                    value={this.state.srchTxt}
                                    autoCapitalize='none'
                                    placeholder={"SEARCH"}
                                    placeholderTextColor={Colors.borderColor}
                                    onChangeText={(e) => {
                                        if (e.length == 0) {
                                            Keyboard.dismiss();
                                        }
                                        this.setState({ srchTxt: e });
                                    }}
                                />
                                {this.state.srchTxt == '' ?
                                    <TouchableOpacity style={{
                                        position: 'absolute',
                                        width: wide * 0.08, height: wide * 0.08, right: wide * 0.05, top: wide * 0.035,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}
                                        activeOpacity={1}
                                    // onPress={this.searchDataForTxt}
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
                                                // this.getPlayers('')
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
                            <View style={{ width: '100%', height: wide * 1.45 }}>
                                <ScrollView style={{ width: '92%', height: '100%', marginHorizontal: 15, }}
                                    showsVerticalScrollIndicator={false}
                                // contentContainerStyle={{ flexGrow: 1 }}
                                >

                                    <View style={{ width: '100%', flex: 1 }}>
                                        {playerCategories !== null ?
                                            // <View style={{ backgroundColor: 'yellow' }}>

                                            playerCategories.map(obj => {
                                                return (
                                                    <>
                                                        <View style={{
                                                            flexDirection: 'row', justifyContent: 'space-between',
                                                            width: '100%', marginHorizontal: 6,
                                                            height: wide * 0.08, marginTop: wide * 0.05, alignItems: 'center',
                                                        }}>
                                                            <Text style={{
                                                                color: Colors.light, fontSize: 18,
                                                                lineHeight: 18,
                                                                fontFamily: Fonts.Bold,
                                                            }}>{obj}</Text>
                                                            {this.state.selectedCat.includes(obj) ?

                                                                <TouchableOpacity style={{
                                                                    width: wide * 0.08, height: wide * 0.08, borderRadius: (wide * 0.08) / 2,
                                                                    backgroundColor: Colors.btnBg,
                                                                    justifyContent: 'center', alignItems: 'center', right: 10
                                                                }}
                                                                    activeOpacity={1}
                                                                    onPress={() => this._handleCategorySelect(obj)}
                                                                >
                                                                    <Image
                                                                        source={require("../../Images/check_Icon.png")}
                                                                        style={{ width: wide * 0.06, height: wide * 0.06, tintColor: Colors.light }}
                                                                        resizeMode={'contain'}
                                                                    />
                                                                </TouchableOpacity>
                                                                :
                                                                <TouchableOpacity style={{
                                                                    width: wide * 0.08, height: wide * 0.08, borderRadius: (wide * 0.08) / 2,
                                                                    backgroundColor: Colors.teamTabSelectedCheckBg,
                                                                    justifyContent: 'center', alignItems: 'center', right: 10
                                                                }}
                                                                    activeOpacity={1}
                                                                    onPress={() => this._handleCategorySelect(obj)}
                                                                >
                                                                    <Image
                                                                        source={require("../../Images/check_Icon.png")}
                                                                        style={{ width: wide * 0.06, height: wide * 0.06, tintColor: Colors.teamTabPlayerCardBorder }}
                                                                        resizeMode={'contain'}
                                                                    />
                                                                </TouchableOpacity>
                                                            }
                                                        </View>
                                                        <View style={{ marginTop: wide * 0.02 }}>
                                                            {playerData.map(playerObj => {
                                                                return (
                                                                    <>
                                                                        {this._renderPlayerData(playerObj, obj)}
                                                                    </>
                                                                )
                                                            })}

                                                        </View>

                                                        {/* <View>

                                                        </View> */}
                                                    </>
                                                )
                                            })

                                            // </View>
                                            : null
                                        }

                                        {/* <FlatList /> */}
                                    </View>

                                </ScrollView>
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: wide * 0.14 }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: Colors.btnBg,
                                        width: wide * 0.44, height: wide * 0.09, borderRadius: 5,
                                        justifyContent: 'center', alignItems: 'center',

                                    }}
                                        activeOpacity={1}
                                        onPress={() => this.setState({ showModal: true })}
                                    >
                                        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 14, }}>Share</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>


                            {/* <View style={{ marginHorizontal: 15, marginTop: wide * 0.02, width: '94%' }}> */}
                            {/* <FlatList
                                        style={{ overflow: 'visible' }}
                                        data={this.state.category}
                                        contentContainerStyle={{ justifyContent: 'space-evenly' }}
                                        renderItem={(item, index) => this._renderTab(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                    /> */}
                            {/* </View> */}
                            {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}> */}
                            {/* {selectedCat_nm === 'Players' ?
                                        <View style={{ width: '90%', height: '100%', }}>
                                            {playersArr !== null && playersArr.length > 0 ?
                                                <FlatList
                                                    style={{ marginHorizontal: 15 }}
                                                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
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
                                                        style={{ marginHorizontal: 15 }}
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
                                                            style={{ marginHorizontal: 15 }}
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
                                                                style={{ marginHorizontal: 15 }}
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

                                    } */}

                            {/* </View> */}
                        </View>

                    </KeyboardAvoidingView>
                    {this.state.showModal === true ?
                        <View style={{
                            width: '80%', height: wide * 1, bottom: wide * 0.7, left: wide * 0.1,
                            borderRadius: 20,
                            backgroundColor: Colors.ractangelCardColor,
                            alignItems: 'center', justifyContent: 'space-between',
                            opacity: 1, position: 'absolute'
                        }}>
                            <View style={{ flexDirection: 'row', top: 40, justifyContent: 'space-between', width: '90%' }}>
                                <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, left: 10 }} >Type your message here (Optional)</Text>
                                <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, right: 10 }}>{this.state.msgCount} / 260</Text>
                            </View>

                            <TextInput style={{
                                width: '85%', height: wide * 0.6,
                                borderWidth: 3, borderColor: Colors.borderColor,
                                fontFamily: Fonts.Regular,
                                borderRadius: 5, color: Colors.light, fontSize: 14, bottom: 5, textAlign: 'auto'
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
                                    this.setState({ textMsg: e, msgCount: e.length });
                                }}
                            />
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', bottom: 45 }}>
                                <TouchableOpacity style={{
                                    // backgroundColor: Colors.btnBg,
                                    width: '40%', height: wide * 0.09, borderRadius: 5,
                                    borderColor: Colors.light, borderWidth: 1,
                                    justifyContent: 'center', alignItems: 'center',

                                }}
                                    activeOpacity={1}
                                    onPress={() => this.setState({ showModal: false })}
                                >
                                    <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 14, }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    key={isSendBtnEnable}
                                    style={{
                                        backgroundColor: Colors.btnBg,
                                        width: '40%', height: wide * 0.09, borderRadius: 5,
                                        justifyContent: 'center', alignItems: 'center',
                                        opacity: isSendBtnEnable === false ? 0.3 : 1.0,

                                    }}
                                    activeOpacity={1}
                                    onPress={() => {
                                        if (isSendBtnEnable) {
                                            this.handleShareData()

                                        }
                                    }}
                                >
                                    <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 14, }}>Send</Text>
                                </TouchableOpacity>

                            </View>



                        </View>

                        : null

                    }

                </SafeAreaView >
                {/* } */}
            </>
        );
    };
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 200,
    },
});

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        // Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(ShareScreen);
// export default ShareScreen;